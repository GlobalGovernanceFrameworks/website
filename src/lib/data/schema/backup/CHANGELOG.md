# GGF Schema — Technical Debt Fixes

## 1. Orphaned References Resolved (~30 fixes across 15 files)

**Naming drift (ID remaps):**
- `framework_educational_systems` → `framework_education`
- `council_planetary_health` → `council_phc`
- `framework_peace_conflict_resolution` → `framework_peace`
- `framework_shield_protocol` → `framework_shield`
- `institution_gcf` → `mechanism_gcf`
- `protocol_mos_rights` → `protocol_dynamic_rights_spectrum`
- `framework_genesis` → `protocol_genesis`
- `framework_fractal_labor_parliament` → `council_flp`
- `framework_disability_justice` → `framework_disability`
- `framework_gender_justice` → `framework_gender`
- `framework_youth_justice` → `framework_youth`
- `framework_sanctuary_accord` → `framework_sanctuary`
- `framework_implementation_tools` → `framework_implementation_adaptation`
- `framework_regenerative_enterprise` → `framework_pathfinder_protocol`
- `institution_baz_sanctuary_councils` → `institution_baz_cognitive_sovereignty_councils`
- `process_safety_weaver` → `process_community_safety_weaver`

**Removed (doc-sourced concepts never formalized):**
- `framework_living_land`, `framework_bioregional_polis` — removed from dependency lists

## 2. New Entity Stubs (5 entities added)

- **`institution_ero`** (Existential Risk Observatory) → `cluster_governance-os.ts`
- **`framework_consciousness_development`** → `cluster_visionary-meta.ts`
- **`framework_capacity_engine`** (Societal Adaptation Framework) → `cluster_visionary-meta.ts`
- **`protocol_indigenous_ai`** (Indigenous AI Sovereignty Protocol) → `cluster_ethical-os.ts`
- **`framework_memorial_commons`** (The Memorial Commons) → `cluster_cultural-knowledge.ts`

## 3. Duplicate IDs Resolved (2 fixes)

- **`institution_ggf_catalyst`** — removed from `cluster_institutional-regeneration.ts` (kept richer definition in `cluster_implementation-os.ts`)
- **`process_community_weaver`** — removed from `cluster_social-equity.ts` (kept in `cluster_economic-os.ts` where AUBI enables it)
- **`council_phc`** — removed from `_index.ts` (kept richer definition in `cluster_ecological.ts`)

## 4. Type Definitions Expanded (`_types.ts`)

**Entity types added:** `Metric`, `Pilot`, `Mechanism`
**Status added:** `Active`
**Geographic scopes added:** `Bioregional`, `Institutional`
**Relationship types added:** `SUPPORTS`, `TESTS`, `USES`, `MEASURES`, `INTEGRATES`, `CERTIFIES`, `PARTICIPATES_IN`, `RESOLVES_CONFLICTS_FOR`, `BENEFITS_FROM`, `QUALIFIES_FOR`, `EVOLVES_INTO`
**Frequency added:** `Occasional`

## 5. Missing `primaryDomain` Fields (81 entities patched)

Concentrated in: `human-flourishing`, `just-transition`, `social-equity`, `visionary-meta`, `infrastructure`, `property-stewardship`.

## 6. `_index.ts` Cleanup

- Removed 3 vestigial cluster definitions (`human_capability_applications`, `technology_applications`, `equity_cultural_layer`) referencing the now-empty `completeApplicationLayerEntities`
- Removed empty `completeApplicationLayerEntities` array
- Renamed `completeApplicationLayerRelationships` → `crossClusterRelationships`

## Validation Result

```
Entities:        327
Relationships:   ~618
Orphaned refs:   ✅ 0
Duplicates:      ✅ 0
Missing domains: ✅ 0
```
