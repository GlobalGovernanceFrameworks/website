#!/usr/bin/env python3
"""
ITP Whitepaper Simulation Suite
================================
Implements three experiments for the Immanent Trust Protocol whitepaper:
  1. TIM Sybil Collapse — validates Theorem 1 (effective weight vs ring size)
  2. TIM Computational Cost — measures performance scaling
  3. Bootstrap Velocity Limit — simulates trust accumulation over time

Usage:
    python itp_simulation.py              # Run all experiments
    python itp_simulation.py --exp 1      # Run experiment 1 only
    python itp_simulation.py --exp 2      # Run experiment 2 only
    python itp_simulation.py --exp 3      # Run experiment 3 only
    python itp_simulation.py --quick      # Quick mode (fewer reps, smaller graphs)
    python itp_simulation.py --full       # Full mode (expect hours)

Outputs CSV files and PNG plots to ./results/
"""

import argparse
import os
import time
import itertools
from dataclasses import dataclass, field
from typing import Optional

import numpy as np
import pandas as pd
import networkx as nx
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import seaborn as sns

# ─────────────────────────────────────────────────────────────────────────────
# Configuration
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class SimConfig:
    """Global simulation parameters matching the whitepaper."""
    # Graph parameters
    n_honest: int = 1000          # Honest nodes (scale up for final runs)
    avg_degree: int = 20          # Average degree for honest graph

    # Sybil ring sizes to test
    sybil_sizes: list = field(default_factory=lambda: [10, 30, 100, 300, 1000])

    # Overlap parameters (θ): fraction of Sybil neighborhoods that overlap
    overlap_params: list = field(default_factory=lambda: [0.0, 0.3, 0.5, 0.7, 1.0])

    # TIM parameters (from Section 4.2)
    alpha: float = 0.7            # Weight for topology vs signal correlation
    d_max: int = 100              # Max neighborhood size cap

    # Bootstrap parameters (from Section 6)
    delta_max: float = 0.05       # Max trust gain per day from low-stakes
    tau_high: float = 0.8         # High-stakes trust threshold
    c_low: float = 0.001          # Cost per low-stakes interaction (USD)
    r_max: int = 100              # Max interactions per day

    # Repetitions
    n_reps: int = 30              # Random seeds per configuration

    # Graph models to test
    graph_models: list = field(default_factory=lambda: ["erdos_renyi", "barabasi_albert", "watts_strogatz"])

    # Sampling for large endorser sets
    sample_size: int = 50         # k' for sampling-based TIM

    output_dir: str = "results"


def quick_config() -> SimConfig:
    """Reduced config for fast iteration."""
    return SimConfig(
        n_honest=500,
        sybil_sizes=[10, 50, 200],
        overlap_params=[0.0, 0.5, 1.0],
        n_reps=5,
        graph_models=["erdos_renyi", "barabasi_albert"],
    )

def full_scale_config() -> SimConfig:
    """Full-scale config for final whitepaper results."""
    return SimConfig(
        n_honest=10000,
        avg_degree=20,
        sybil_sizes=[10, 30, 100, 300, 1000, 3000, 10000],
        overlap_params=[0.0, 0.1, 0.3, 0.5, 0.7, 0.9, 1.0],
        n_reps=30,
        graph_models=["erdos_renyi", "barabasi_albert", "watts_strogatz"],
        sample_size=50,
        output_dir="results_full",
    )

# ─────────────────────────────────────────────────────────────────────────────
# Graph Generation
# ─────────────────────────────────────────────────────────────────────────────

def generate_honest_graph(model: str, n: int, avg_degree: int, seed: int) -> nx.Graph:
    """Generate an honest node graph using the specified model."""
    rng = np.random.default_rng(seed)
    nx_seed = int(rng.integers(0, 2**31))

    if model == "erdos_renyi":
        p = avg_degree / (n - 1)
        G = nx.erdos_renyi_graph(n, p, seed=nx_seed)
    elif model == "barabasi_albert":
        m = avg_degree // 2  # BA graph: each new node attaches m edges
        G = nx.barabasi_albert_graph(n, m, seed=nx_seed)
    elif model == "watts_strogatz":
        k = avg_degree
        beta = 0.1
        G = nx.watts_strogatz_graph(n, k, beta, seed=nx_seed)
    else:
        raise ValueError(f"Unknown graph model: {model}")

    return G


def inject_sybil_ring(
    G: nx.Graph,
    n_honest: int,
    sybil_size: int,
    overlap: float,
    seed: int,
) -> tuple[nx.Graph, list[int], int]:
    """
    Inject a Sybil ring into the graph.

    Args:
        G: The honest graph
        n_honest: Number of honest nodes
        sybil_size: Number of Sybil nodes to create
        overlap: θ ∈ [0, 1] — fraction of neighborhood that overlaps across Sybils.
                 θ=1 means all Sybils connect to the exact same honest nodes (perfect collusion).
                 θ=0 means each Sybil connects to completely different honest nodes.
        seed: Random seed

    Returns:
        (augmented_graph, sybil_node_ids, target_node_id)
    """
    rng = np.random.default_rng(seed)
    G = G.copy()

    honest_nodes = list(range(n_honest))

    # Create a target node that the Sybils will endorse
    target_id = n_honest + sybil_size  # target is separate from Sybils
    G.add_node(target_id)

    # Determine how many honest neighbors each Sybil gets
    n_connections = min(10, len(honest_nodes))  # Each Sybil connects to ~10 honest nodes

    # Shared core: θ fraction of connections are the same for all Sybils
    n_shared = max(1, int(overlap * n_connections))
    n_unique = n_connections - n_shared

    # Pick the shared core neighbors from honest nodes
    shared_neighbors = rng.choice(honest_nodes, size=n_shared, replace=False).tolist()

    # Available honest nodes for unique connections (excluding shared)
    available_for_unique = [n for n in honest_nodes if n not in shared_neighbors]

    sybil_ids = []
    for i in range(sybil_size):
        sid = n_honest + i
        G.add_node(sid)
        sybil_ids.append(sid)

        # Connect to shared neighbors (same for all Sybils)
        for neighbor in shared_neighbors:
            G.add_edge(sid, neighbor)

        # Connect to unique neighbors (disjoint across Sybils if possible)
        if n_unique > 0 and len(available_for_unique) >= n_unique:
            unique_neighbors = rng.choice(
                available_for_unique, size=min(n_unique, len(available_for_unique)), replace=False
            )
            for neighbor in unique_neighbors:
                G.add_edge(sid, neighbor)

        # All Sybils endorse the target
        G.add_edge(sid, target_id)

    # NOTE: No inter-Sybil interaction edges are added. Per Section 4.2.1,
    # TIM neighborhoods are defined by *interaction* signals only. The Sybils
    # endorse each other and the target (these are endorsement edges), but
    # their neighborhoods for TIM consist only of the honest nodes they've
    # faked interactions with. This is the realistic adversary model:
    # Sybils can cheaply endorse each other but cannot cheaply generate
    # real interaction histories with unique honest counterparties.

    return G, sybil_ids, target_id


# ─────────────────────────────────────────────────────────────────────────────
# TIM Computation (Section 4.2)
# ─────────────────────────────────────────────────────────────────────────────

def get_neighborhood(G: nx.Graph, node: int, d_max: int = 100, rng=None) -> set:
    """
    Get the neighborhood of a node (direct neighbors only, capped at d_max).
    Per Section 4.2.1: Nbr(i) = set of nodes i directly trusts via interaction signals.
    In simulation, we use graph adjacency as proxy for interaction signals.
    """
    neighbors = set(G.neighbors(node))
    if len(neighbors) > d_max and rng is not None:
        neighbors = set(rng.choice(list(neighbors), size=d_max, replace=False))
    return neighbors


def jaccard_similarity(set_a: set, set_b: set) -> float:
    """
    Compute Jaccard similarity J(i,j) = |A ∩ B| / |A ∪ B|.
    Per Section 4.2.2: if both empty, return 1; if one empty, return 0.
    """
    if len(set_a) == 0 and len(set_b) == 0:
        return 1.0
    if len(set_a) == 0 or len(set_b) == 0:
        return 0.0
    intersection = len(set_a & set_b)
    union = len(set_a | set_b)
    return intersection / union if union > 0 else 0.0


def compute_tim(
    G: nx.Graph,
    endorsers: list[int],
    alpha: float = 0.7,
    d_max: int = 100,
    sample_size: Optional[int] = None,
    seed: int = 0,
    signal_values: Optional[dict] = None,
    signal_confidences: Optional[dict] = None,
) -> float:
    """
    Compute TIM discount coefficient τ(E) for a set of endorsers.

    Per Section 4.2.4-4.2.5:
        τ(E) = Ind(E) = 1 - avg_pairwise_similarity

    Where similarity S(i,j) = α·J(i,j) + (1-α)·C(i,j).

    C(i,j) = 1 / (1 + Var(v_i, v_j) + Var(c_i, c_j))
    Per Section 4.2.3. If signal data is unavailable, uses α=1.0 (topology only).

    Args:
        G: The graph
        endorsers: List of endorser node IDs
        alpha: Weight for topology (default 0.7)
        d_max: Max neighborhood size
        sample_size: If set, sample this many endorsers for large sets
        seed: Random seed for sampling
        signal_values: Optional dict mapping node_id -> signal value [-1, 1]
        signal_confidences: Optional dict mapping node_id -> signal confidence [0, 1]

    Returns:
        τ ∈ [0, 1]
    """
    rng = np.random.default_rng(seed)

    k = len(endorsers)
    if k <= 1:
        return 1.0  # No collusion possible with 0 or 1 endorser

    # If no signal data, fall back to topology only (α=1.0 per Section 4.2.3)
    if signal_values is None or signal_confidences is None:
        alpha = 1.0

    # Sample if endorser set is large
    if sample_size is not None and k > sample_size:
        endorsers = list(rng.choice(endorsers, size=sample_size, replace=False))
        k = len(endorsers)

    # Precompute neighborhoods
    neighborhoods = {}
    for e in endorsers:
        neighborhoods[e] = get_neighborhood(G, e, d_max, rng)

    # Compute average pairwise similarity
    total_sim = 0.0
    n_pairs = 0
    for i in range(k):
        for j in range(i + 1, k):
            ei, ej = endorsers[i], endorsers[j]
            j_sim = jaccard_similarity(neighborhoods[ei], neighborhoods[ej])

            # Signal correlation C(i,j)
            c_ij = 0.0
            if signal_values is not None and signal_confidences is not None:
                if ei in signal_values and ej in signal_values:
                    vi, vj = signal_values[ei], signal_values[ej]
                    ci, cj = signal_confidences[ei], signal_confidences[ej]
                    var_v = np.var([vi, vj])
                    var_c = np.var([ci, cj])
                    c_ij = 1.0 / (1.0 + var_v + var_c)

            # S(i,j) = α·J(i,j) + (1-α)·C(i,j)
            s_ij = alpha * j_sim + (1.0 - alpha) * c_ij
            total_sim += s_ij
            n_pairs += 1

    avg_sim = total_sim / n_pairs if n_pairs > 0 else 0.0
    tau = 1.0 - avg_sim
    return max(0.0, min(1.0, tau))  # Clamp to [0, 1]


def compute_effective_weight(
    tau: float,
    n_endorsers: int,
    w_per_node: float = 1.0,
) -> float:
    """
    Effective weight after TIM: W_eff = τ · W_raw = τ · k · w_per_node.
    Per Section 4.3.2.
    """
    return tau * n_endorsers * w_per_node


# ─────────────────────────────────────────────────────────────────────────────
# Experiment 1: TIM Sybil Collapse
# ─────────────────────────────────────────────────────────────────────────────

def run_experiment_1(cfg: SimConfig) -> pd.DataFrame:
    """
    Experiment 1: TIM Sybil Collapse.
    For each (graph_model, sybil_size, overlap), inject a Sybil ring and
    compute TIM discount τ and effective weight ratio R_eff.
    """
    print("\n" + "=" * 70)
    print("EXPERIMENT 1: TIM Sybil Collapse")
    print("=" * 70)

    records = []
    total = len(cfg.graph_models) * len(cfg.sybil_sizes) * len(cfg.overlap_params) * cfg.n_reps
    count = 0

    for model in cfg.graph_models:
        for S in cfg.sybil_sizes:
            for theta in cfg.overlap_params:
                for rep in range(cfg.n_reps):
                    seed = rep * 1000 + hash((model, S, theta)) % 10000
                    count += 1

                    if count % 20 == 0 or count == 1:
                        print(f"  [{count}/{total}] model={model}, S={S}, θ={theta:.1f}, rep={rep}")

                    # Generate honest graph
                    G = generate_honest_graph(model, cfg.n_honest, cfg.avg_degree, seed)

                    # Inject Sybil ring
                    G_aug, sybil_ids, target_id = inject_sybil_ring(
                        G, cfg.n_honest, S, theta, seed
                    )

                    # Generate signal values/confidences for Sybil endorsers
                    # Sybils issue nearly identical signals (per Section 4.1.2)
                    rng_sig = np.random.default_rng(seed + 7777)
                    base_value = 0.9
                    base_conf = 0.85
                    # Higher overlap → more correlated signals
                    noise_scale = 0.1 * (1.0 - theta)  # θ=1 → no noise; θ=0 → max noise
                    signal_values = {}
                    signal_confidences = {}
                    for sid in sybil_ids:
                        signal_values[sid] = np.clip(
                            base_value + rng_sig.normal(0, noise_scale), -1, 1
                        )
                        signal_confidences[sid] = np.clip(
                            base_conf + rng_sig.normal(0, noise_scale), 0, 1
                        )

                    # Compute TIM for the Sybil endorser set
                    use_sampling = len(sybil_ids) > cfg.sample_size
                    tau = compute_tim(
                        G_aug,
                        sybil_ids,
                        alpha=cfg.alpha,
                        d_max=cfg.d_max,
                        sample_size=cfg.sample_size if use_sampling else None,
                        seed=seed,
                        signal_values=signal_values,
                        signal_confidences=signal_confidences,
                    )

                    # Effective weight ratio: how many honest-node-equivalents
                    # does the Sybil ring achieve?
                    w_eff = compute_effective_weight(tau, len(sybil_ids))
                    r_eff = w_eff  # Since w_per_honest_node = 1.0

                    records.append({
                        "graph_model": model,
                        "sybil_size": S,
                        "overlap": theta,
                        "rep": rep,
                        "tau": tau,
                        "w_eff": w_eff,
                        "r_eff": r_eff,
                        "sampled": use_sampling,
                    })

    df = pd.DataFrame(records)
    return df


# ─────────────────────────────────────────────────────────────────────────────
# Experiment 2: TIM Computational Cost
# ─────────────────────────────────────────────────────────────────────────────

def run_experiment_2(cfg: SimConfig) -> pd.DataFrame:
    """
    Experiment 2: Computational cost of TIM evaluation.
    Measures wall-clock time for TIM computation as a function of
    endorser set size k, with and without sampling.
    """
    print("\n" + "=" * 70)
    print("EXPERIMENT 2: TIM Computational Cost")
    print("=" * 70)

    records = []
    endorser_sizes = [5, 10, 20, 50, 100, 200, 500, 1000]

    # Use a single graph model for timing
    model = "erdos_renyi"

    for k in endorser_sizes:
        if k > cfg.n_honest:
            continue

        for use_sampling in [False, True]:
            if use_sampling and k <= cfg.sample_size:
                continue  # Sampling only relevant when k > sample_size

            times = []
            for rep in range(min(cfg.n_reps, 10)):  # Fewer reps for timing
                seed = rep * 100 + k
                G = generate_honest_graph(model, max(cfg.n_honest, k + 100), cfg.avg_degree, seed)

                # Pick k random nodes as "endorsers"
                rng = np.random.default_rng(seed)
                endorsers = rng.choice(list(G.nodes()), size=min(k, G.number_of_nodes()), replace=False).tolist()

                t_start = time.perf_counter()
                tau = compute_tim(
                    G,
                    endorsers,
                    alpha=cfg.alpha,
                    d_max=cfg.d_max,
                    sample_size=cfg.sample_size if use_sampling else None,
                    seed=seed,
                )
                t_end = time.perf_counter()
                times.append((t_end - t_start) * 1000)  # Convert to ms

            records.append({
                "endorser_size": k,
                "sampling": use_sampling,
                "time_ms_mean": np.mean(times),
                "time_ms_std": np.std(times),
                "time_ms_median": np.median(times),
                "time_ms_p95": np.percentile(times, 95) if len(times) > 1 else times[0],
            })
            print(f"  k={k:>5}, sampling={str(use_sampling):>5}: "
                  f"{np.mean(times):.2f} ms (±{np.std(times):.2f})")

    df = pd.DataFrame(records)
    return df


# ─────────────────────────────────────────────────────────────────────────────
# Experiment 3: Bootstrap Velocity Limit
# ─────────────────────────────────────────────────────────────────────────────

def run_experiment_3(cfg: SimConfig) -> pd.DataFrame:
    """
    Experiment 3: Bootstrap velocity limit.
    Simulates how long it takes a new node to reach the high-stakes
    trust threshold under velocity-limited accumulation.

    Per Section 6.3:
      - Δ_max = 0.05/day (max trust gain from low-stakes interactions)
      - τ_high = 0.8 (threshold for high-stakes participation)
      - T_min = τ_high / Δ_max = 16 days

    Also models adversary cost vs. number of Sybils.
    """
    print("\n" + "=" * 70)
    print("EXPERIMENT 3: Bootstrap Velocity Limit")
    print("=" * 70)

    records = []

    # 3a: Time to reach trust threshold for honest node
    delta_max_values = [0.02, 0.05, 0.10, 0.15]
    tau_high = cfg.tau_high

    for delta_max in delta_max_values:
        # Honest node: gains Δ_max per day
        t_min = tau_high / delta_max
        days = np.arange(0, t_min * 1.5, 0.5)

        for day in days:
            lts = min(day * delta_max, tau_high)
            records.append({
                "scenario": "honest_node",
                "delta_max": delta_max,
                "day": day,
                "lts": lts,
                "reached_threshold": lts >= tau_high,
                "adversary_sybils": 0,
                "adversary_cost": 0.0,
            })

    # 3b: Adversary cost model
    # Per Section 6.4: C_adv = A · r_max · c_low · T_min
    delta_max = cfg.delta_max
    t_min = tau_high / delta_max  # 16 days

    sybil_counts = [1, 10, 50, 100, 500, 1000, 5000, 10000]
    for A in sybil_counts:
        cost = A * cfg.r_max * cfg.c_low * t_min
        records.append({
            "scenario": "adversary_cost",
            "delta_max": delta_max,
            "day": t_min,
            "lts": tau_high,
            "reached_threshold": True,
            "adversary_sybils": A,
            "adversary_cost": cost,
        })

    # 3c: Confidence saturation
    # Per Section 6.3.2: interactions with the same node have diminishing returns
    # After n interactions with the same peer, confidence gain ≈ c_base · (1 - e^{-n/n_sat})
    n_sat = 10  # Saturation constant
    c_base = 0.1  # Base confidence per new peer
    n_peers_values = [1, 3, 5, 10, 20]

    for n_peers in n_peers_values:
        for day in range(0, 40):
            interactions_per_peer = min(day * 5, 50)  # Up to 5 interactions/day/peer
            # Each unique peer contributes up to c_base; repeated interactions saturate
            trust_from_peers = 0.0
            for _ in range(n_peers):
                trust_from_peers += c_base * (1 - np.exp(-interactions_per_peer / n_sat))

            # Velocity-limited
            lts = min(trust_from_peers, day * delta_max, tau_high)
            records.append({
                "scenario": "confidence_saturation",
                "delta_max": delta_max,
                "day": day,
                "lts": lts,
                "reached_threshold": lts >= tau_high,
                "adversary_sybils": 0,
                "adversary_cost": 0.0,
                "n_peers": n_peers,
            })

    df = pd.DataFrame(records)
    return df


# ─────────────────────────────────────────────────────────────────────────────
# Plotting
# ─────────────────────────────────────────────────────────────────────────────

def plot_experiment_1(df: pd.DataFrame, output_dir: str):
    """Generate plots for Experiment 1: TIM Sybil Collapse."""
    sns.set_theme(style="whitegrid", font_scale=1.1)

    # --- Figure 1: R_eff vs Sybil ring size, for different overlap values ---
    fig, axes = plt.subplots(1, len(df["graph_model"].unique()), figsize=(6 * len(df["graph_model"].unique()), 5), sharey=True)
    if not hasattr(axes, '__len__'):
        axes = [axes]

    for ax, model in zip(axes, df["graph_model"].unique()):
        sub = df[df["graph_model"] == model]
        agg = sub.groupby(["sybil_size", "overlap"]).agg(
            r_eff_mean=("r_eff", "mean"),
            r_eff_std=("r_eff", "std"),
        ).reset_index()

        for theta in sorted(agg["overlap"].unique()):
            data = agg[agg["overlap"] == theta]
            ax.errorbar(
                data["sybil_size"], data["r_eff_mean"], yerr=data["r_eff_std"],
                marker="o", label=f"θ={theta:.1f}", capsize=3,
            )

        ax.set_xlabel("Sybil Ring Size (S)")
        ax.set_ylabel("Effective Weight Ratio (R_eff)")
        ax.set_title(f"{model}")
        ax.set_xscale("log")
        ax.set_yscale("log")
        ax.legend(title="Overlap θ", fontsize=9)
        # Reference line: linear scaling (no TIM)
        sizes = sorted(agg["sybil_size"].unique())
        ax.plot(sizes, sizes, "k--", alpha=0.3, label="No TIM (linear)")

    fig.suptitle("Figure 1: Effective Weight vs. Sybil Ring Size (TIM Discount)", y=1.02)
    fig.tight_layout()
    fig.savefig(os.path.join(output_dir, "fig1_reff_vs_sybil_size.png"), dpi=150, bbox_inches="tight")
    plt.close(fig)

    # --- Figure 2: τ (TIM discount factor) vs overlap ---
    fig, ax = plt.subplots(figsize=(8, 5))
    agg = df.groupby(["overlap", "sybil_size"]).agg(
        tau_mean=("tau", "mean"),
        tau_std=("tau", "std"),
    ).reset_index()

    for S in sorted(agg["sybil_size"].unique()):
        data = agg[agg["sybil_size"] == S]
        ax.errorbar(
            data["overlap"], data["tau_mean"], yerr=data["tau_std"],
            marker="s", label=f"S={S}", capsize=3,
        )

    ax.set_xlabel("Overlap Parameter (θ)")
    ax.set_ylabel("TIM Discount Factor (τ)")
    ax.set_title("Figure 2: TIM Discount Factor vs. Internal Overlap")
    ax.legend(title="Ring Size", fontsize=9)
    ax.set_ylim(-0.05, 1.05)
    fig.tight_layout()
    fig.savefig(os.path.join(output_dir, "fig2_tau_vs_overlap.png"), dpi=150, bbox_inches="tight")
    plt.close(fig)

    # --- Figure 3: Heatmap of R_eff across S and θ (averaged over models) ---
    fig, ax = plt.subplots(figsize=(8, 6))
    pivot = df.groupby(["sybil_size", "overlap"])["r_eff"].mean().reset_index()
    pivot_table = pivot.pivot(index="sybil_size", columns="overlap", values="r_eff")
    sns.heatmap(pivot_table, annot=True, fmt=".1f", cmap="YlOrRd", ax=ax)
    ax.set_title("Figure 3: Effective Weight Ratio (R_eff) — S × θ Heatmap")
    ax.set_xlabel("Overlap Parameter (θ)")
    ax.set_ylabel("Sybil Ring Size (S)")
    fig.tight_layout()
    fig.savefig(os.path.join(output_dir, "fig3_reff_heatmap.png"), dpi=150, bbox_inches="tight")
    plt.close(fig)

    print(f"  Experiment 1 plots saved to {output_dir}/")


def plot_experiment_2(df: pd.DataFrame, output_dir: str):
    """Generate plots for Experiment 2: Computational Cost."""
    sns.set_theme(style="whitegrid", font_scale=1.1)

    fig, ax = plt.subplots(figsize=(8, 5))

    for sampling in df["sampling"].unique():
        sub = df[df["sampling"] == sampling]
        label = f"Sampling (k'={50})" if sampling else "Full computation"
        ax.errorbar(
            sub["endorser_size"], sub["time_ms_mean"], yerr=sub["time_ms_std"],
            marker="o", label=label, capsize=3,
        )

    ax.set_xlabel("Endorser Set Size (k)")
    ax.set_ylabel("Time (ms)")
    ax.set_title("Figure 4: TIM Computation Time vs. Endorser Set Size")
    ax.set_xscale("log")
    ax.set_yscale("log")
    ax.legend()
    fig.tight_layout()
    fig.savefig(os.path.join(output_dir, "fig4_tim_compute_time.png"), dpi=150, bbox_inches="tight")
    plt.close(fig)

    print(f"  Experiment 2 plots saved to {output_dir}/")


def plot_experiment_3(df: pd.DataFrame, output_dir: str):
    """Generate plots for Experiment 3: Bootstrap Velocity."""
    sns.set_theme(style="whitegrid", font_scale=1.1)

    # --- Figure 5: Trust accumulation over time ---
    fig, ax = plt.subplots(figsize=(8, 5))
    honest = df[df["scenario"] == "honest_node"]

    for delta in sorted(honest["delta_max"].unique()):
        sub = honest[honest["delta_max"] == delta]
        ax.plot(sub["day"], sub["lts"], label=f"Δ_max={delta:.2f}/day", linewidth=2)

    ax.axhline(y=0.8, color="red", linestyle="--", alpha=0.7, label="τ_high = 0.8")
    ax.set_xlabel("Days")
    ax.set_ylabel("Local Trust State (LTS)")
    ax.set_title("Figure 5: Bootstrap — Time to Reach Trust Threshold")
    ax.legend()
    ax.set_ylim(-0.05, 1.0)
    fig.tight_layout()
    fig.savefig(os.path.join(output_dir, "fig5_bootstrap_velocity.png"), dpi=150, bbox_inches="tight")
    plt.close(fig)

    # --- Figure 6: Adversary cost vs number of Sybils ---
    fig, ax = plt.subplots(figsize=(8, 5))
    adv = df[df["scenario"] == "adversary_cost"]
    ax.plot(adv["adversary_sybils"], adv["adversary_cost"], "ro-", linewidth=2, markersize=6)
    ax.set_xlabel("Number of Sybils (A)")
    ax.set_ylabel("Total Adversary Cost (USD)")
    ax.set_title("Figure 6: Adversary Cost vs. Sybil Count (Δ_max=0.05, c_low=$0.001)")
    ax.set_xscale("log")
    ax.set_yscale("log")
    fig.tight_layout()
    fig.savefig(os.path.join(output_dir, "fig6_adversary_cost.png"), dpi=150, bbox_inches="tight")
    plt.close(fig)

    # --- Figure 7: Confidence saturation ---
    fig, ax = plt.subplots(figsize=(8, 5))
    sat = df[df["scenario"] == "confidence_saturation"]
    if "n_peers" in sat.columns:
        for n_peers in sorted(sat["n_peers"].dropna().unique()):
            sub = sat[sat["n_peers"] == n_peers]
            ax.plot(sub["day"], sub["lts"], label=f"{int(n_peers)} peers", linewidth=2)
    ax.axhline(y=0.8, color="red", linestyle="--", alpha=0.7, label="τ_high = 0.8")
    ax.set_xlabel("Days")
    ax.set_ylabel("Local Trust State (LTS)")
    ax.set_title("Figure 7: Confidence Saturation — Diverse Peers vs. Repeated Interactions")
    ax.legend()
    ax.set_ylim(-0.05, 1.0)
    fig.tight_layout()
    fig.savefig(os.path.join(output_dir, "fig7_confidence_saturation.png"), dpi=150, bbox_inches="tight")
    plt.close(fig)

    print(f"  Experiment 3 plots saved to {output_dir}/")


# ─────────────────────────────────────────────────────────────────────────────
# Summary Statistics
# ─────────────────────────────────────────────────────────────────────────────

def print_summary(df1: pd.DataFrame, df2: pd.DataFrame, df3: pd.DataFrame):
    """Print key summary statistics for the whitepaper."""
    print("\n" + "=" * 70)
    print("SUMMARY STATISTICS FOR WHITEPAPER")
    print("=" * 70)

    # Experiment 1 highlights
    print("\n--- Experiment 1: TIM Sybil Collapse ---")
    for theta in sorted(df1["overlap"].unique()):
        sub = df1[df1["overlap"] == theta]
        for S in sorted(sub["sybil_size"].unique()):
            row = sub[sub["sybil_size"] == S]
            r = row["r_eff"].mean()
            tau_mean = row["tau"].mean()
            print(f"  θ={theta:.1f}, S={S:>5}: τ={tau_mean:.4f}, R_eff={r:.2f} "
                  f"(collapse ratio: {r/S:.4f})")

    # Key claim validation
    print("\n  KEY CLAIM VALIDATION:")
    perfect = df1[df1["overlap"] == 1.0]
    if not perfect.empty:
        max_r = perfect.groupby("sybil_size")["r_eff"].mean()
        print(f"    θ=1.0 (perfect overlap): max R_eff across all S = {max_r.max():.2f}")
        print(f"    → Theorem 1 predicts R_eff → 1 as θ → 1. "
              f"{'CONFIRMED' if max_r.max() < 5 else 'NEEDS REVIEW'}")

    # Experiment 2 highlights
    print("\n--- Experiment 2: TIM Computational Cost ---")
    print(df2.to_string(index=False))

    # Experiment 3 highlights
    print("\n--- Experiment 3: Bootstrap ---")
    print(f"  T_min (Δ_max=0.05): {0.8/0.05:.0f} days")
    adv = df3[df3["scenario"] == "adversary_cost"]
    if not adv.empty:
        print(f"  Adversary cost for 1000 Sybils: "
              f"${adv[adv['adversary_sybils']==1000]['adversary_cost'].values[0]:,.2f}")


# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="ITP Whitepaper Simulation Suite")
    parser.add_argument("--exp", type=int, choices=[1, 2, 3], help="Run specific experiment only")
    parser.add_argument("--quick", action="store_true", help="Quick mode (smaller graphs, fewer reps)")
    parser.add_argument("--full", action="store_true", help="Full scale (10k nodes, expect hours)")
    parser.add_argument("--output", type=str, default="results", help="Output directory")
    args = parser.parse_args()

    if args.quick:
        cfg = quick_config()
    elif args.full:
        cfg = full_scale_config()
    else:
        cfg = SimConfig()
    cfg.output_dir = args.output
    os.makedirs(cfg.output_dir, exist_ok=True)

    print("ITP Whitepaper Simulation Suite")
    print(f"  Config: n_honest={cfg.n_honest}, n_reps={cfg.n_reps}, "
          f"models={cfg.graph_models}")
    print(f"  Output: {cfg.output_dir}/")

    df1, df2, df3 = None, None, None

    if args.exp is None or args.exp == 1:
        df1 = run_experiment_1(cfg)
        df1.to_csv(os.path.join(cfg.output_dir, "exp1_sybil_collapse.csv"), index=False)
        plot_experiment_1(df1, cfg.output_dir)

    if args.exp is None or args.exp == 2:
        df2 = run_experiment_2(cfg)
        df2.to_csv(os.path.join(cfg.output_dir, "exp2_compute_cost.csv"), index=False)
        plot_experiment_2(df2, cfg.output_dir)

    if args.exp is None or args.exp == 3:
        df3 = run_experiment_3(cfg)
        df3.to_csv(os.path.join(cfg.output_dir, "exp3_bootstrap.csv"), index=False)
        plot_experiment_3(df3, cfg.output_dir)

    if df1 is not None and df2 is not None and df3 is not None:
        print_summary(df1, df2, df3)

    print(f"\nDone. Results in {cfg.output_dir}/")


if __name__ == "__main__":
    main()
