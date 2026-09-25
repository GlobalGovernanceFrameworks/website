## Appendix C: Simulation Code Repository and Run Instructions

All simulation code used in this paper is publicly available in the GitHub repository:

**https://github.com/GlobalGovernanceFrameworks/itp-simulation**

The repository contains the complete Python simulation suite, including the three experiments described in Section 11, plotting scripts, and analysis notebooks.

### C.1 Repository Structure

```
itp-simulation/
├── README.md
├── LICENSE
├── requirements.txt
├── .gitignore
├── itp_simulation.py          # All three experiments in one file
└── configs/
    ├── quick.toml
    ├── default.toml
    └── full_scale.toml
```

### C.2 Dependencies

The code requires Python 3.9 or later and the following packages:

- `networkx` – graph generation and analysis
- `numpy` – numerical operations
- `pandas` – data aggregation
- `matplotlib` and `seaborn` – plotting
- `toml` – configuration parsing (optional)

Install all dependencies with:

```bash
pip install -r requirements.txt
```

### C.3 Running the Simulations

#### Quick mode (for testing, ~5 minutes)

```bash
python itp_simulation.py --quick
```

This runs a reduced set of parameters (500 honest nodes, fewer repetitions) to verify the code works.

#### Default mode (as reported in Section 11, ~30 minutes)

```bash
python itp_simulation.py
```

Default parameters: 1000 honest nodes, 30 repetitions, all graph models.

#### Full‑scale mode (for final results, several hours)

```bash
python itp_simulation.py --full
```

Full‑scale parameters: 10,000 honest nodes, up to 10,000 Sybils, 30 repetitions. **Warning**: This will take many hours on a typical laptop; we recommend running on a cloud instance or a multi‑core server.

#### Run individual experiments

```bash
python itp_simulation.py --exp 1   # Sybil collapse
python itp_simulation.py --exp 2   # Computational cost
python itp_simulation.py --exp 3   # Bootstrap velocity
```

### C.4 Outputs

The script generates:

- **CSV files** in the `results/` directory:
  - `exp1_sybil_collapse.csv`
  - `exp2_compute_cost.csv`
  - `exp3_bootstrap.csv`
- **PNG plots** (Figures 1–7 from Section 11):
  - `fig1_reff_vs_sybil_size.png`
  - `fig2_tau_vs_overlap.png`
  - `fig3_reff_heatmap.png`
  - `fig4_tim_compute_time.png`
  - `fig5_bootstrap_velocity.png`
  - `fig6_adversary_cost.png`
  - `fig7_confidence_saturation.png`

All outputs are reproducible; each run includes a random seed for each repetition.

### C.5 Custom Configuration

You can provide your own TOML configuration file:

```bash
python itp_simulation.py --config my_config.toml
```

See `configs/default.toml` for the schema.

### C.6 Reproducing the Paper’s Results

The exact results reported in Section 11 were generated with the default configuration (1000 honest nodes, 30 repetitions) on a machine with the following specifications:

- CPU: Intel Core i5‑8250U @ 1.60GHz (4 cores)
- RAM: 16 GB
- OS: Ubuntu 22.04 LTS

To reproduce the exact figures, run:

```bash
git clone https://github.com/GlobalGovernanceFrameworks/itp-simulation
cd itp-simulation
pip install -r requirements.txt
python itp_simulation.py
```

After completion, the `results/` directory will contain the CSV files and plots. The random seed is fixed internally, so results should be identical across runs.

### C.7 License

The code is released under the MIT License. See `LICENSE` in the repository.

---

**End of Appendix C**
