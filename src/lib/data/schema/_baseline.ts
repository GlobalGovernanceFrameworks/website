// /src/lib/data/schema/_baseline.ts

/**
 * Issues that are known, understood, and not yet resolved.
 *
 * A baselined issue is not hidden — it is reported at 'info' and counted. The
 * point is to let the error set reach zero so that the *next* regression is
 * visible, rather than joining a permanent backlog nobody reads.
 *
 * Rules for this file:
 *  - every entry needs a reason and, where possible, what would resolve it;
 *  - nothing gets added to make a failing build pass without that reason;
 *  - `staleBaseline` in the validation result lists entries that no longer
 *    match anything; delete those rather than leaving them.
 */

export const acceptedIssues: readonly string[] = [
  // --- Tier inversions between frameworks -------------------------------
  // Accepted pending the tier semantics decision. Three of the seven are the
  // same call: Foundation Protocol (Tier 3) and Horizon (Tier 3) are being
  // depended on as if they were infrastructure, which suggests they are
  // mistiered rather than that the dependencies are wrong. Resolve by
  // retiering those two, then re-examine the remaining four individually.
  'tier-inversion:framework_kintsugi_protocol,framework_disability',
  'tier-inversion:framework_mobility_commons,framework_disability',
  'tier-inversion:framework_hearthlight_protocol,framework_youth',

  // Aegis (Tier 1) reaches up into Tier 2 and Tier 4. Either Aegis is
  // mistiered or these are soft influences that should not be `dependencies`.
  'tier-inversion:framework_aegis_protocol,framework_synoptic',
  'tier-inversion:framework_aegis_protocol,framework_inner_dev',

  // Arts Flourishing (3) -> WDIP (4) and Discovery Commons (2) -> Digital
  // Commons (3). Both are single edges and both are plausibly real
  // dependencies, which is the case for tier being the thing that is wrong.
  'tier-inversion:framework_arts_flourishing,framework_wdmip',
  'tier-inversion:framework_discovery_commons,framework_digital_commons'
];
