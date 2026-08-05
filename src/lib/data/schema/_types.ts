// /src/lib/data/schema/_types.ts

/**
 * Links a schema entity to its canonical outline document on disk.
 *
 * The outline is the authoritative text. Any drafted prose version is a
 * derivative and may lag. If this block is present, the entity is published
 * at its `ui.path` by the dynamic /frameworks/[slug] route.
 */
export interface OutlinePublication {
  /**
   * Path under src/lib/content/framework-outlines/<lang>/, without the
   * `versions/` segment. Defaults to `tier-<tier>/<ui.slug>` when omitted —
   * set it only when the outline folder name differs from the route slug,
   * e.g. 'tier-1/polycentric-governance-architecture'.
   */
  dir?: string;
 
  /** Filename in versions/, without extension. e.g. 'v1.3' */
  version: string;
 
  /** ISO date of that version. Displayed, not computed. */
  updated: string;
 
  /**
   * External validation reached, NOT internal completeness.
   * A 20,000-word document nobody outside the project has read is 'internal'.
   */
  maturity: 'internal' | 'adversarial' | 'external' | 'piloted';
 
  /** Overrides entity.description under the title. Optional. */
  subtitle?: string;
 
  /** Two or three sentences setting expectations before the document begins. */
  standfirst?: string;
}

/**
 * Publishes a framework from a multi-section prose draft rather than from a
 * single canonical outline.
 *
 * Use this only where the prose is genuinely downstream of the outline and
 * newer than it — the Pathfinder Protocol being the case it was built for.
 * Everywhere else the outline is canonical and `OutlinePublication` applies.
 *
 * An entity may carry BOTH: `prose` supplies the text, `outline` supplies the
 * version lineage. Where both exist, `prose` decides what is rendered.
 */
export interface ProsePublication {
  /**
   * Folder under src/lib/content/frameworks/<lang>/implementation/.
   * Defaults to `ui.slug`.
   */
  dir?: string;
 
  /** Displayed version of the prose draft. */
  version: string;
 
  /** ISO date of that version. */
  updated: string;
 
  /** Same ladder as OutlinePublication. */
  maturity: 'internal' | 'adversarial' | 'external' | 'piloted';
 
  /**
   * Ordered table of contents. `id` is the filename without .md.
   * `group` is optional and only used to break the sidebar into headings.
   */
  sections: Array<{ id: string; title: string; group?: string }>;
 
  subtitle?: string;
  standfirst?: string;
}

/**
 * The maturity ladder. Presentation constants only — all user-visible text
 * lives in i18n under `framework.maturity.<key>.*`, so it can be translated.
 *
 * The keys here are the contract: the schema validates against them, and
 * `framework.json` must define a matching entry for each.
 */
export const MATURITY = {
  internal: { color: '#6B7280', bg: '#F3F4F6' },
  adversarial: { color: '#2B4B8C', bg: '#EEF2FB' },
  external: { color: '#B8860B', bg: '#FDF6E3' },
  piloted: { color: '#065F46', bg: '#ECFDF5' }
} as const;

export type Maturity = keyof typeof MATURITY;


/**
 * Records that a current canonical framework revision retired an entity.
 * Retired entities remain resolvable for historical references, but are not
 * operative graph nodes and must not receive new inbound relationships.
 */
export interface EntityRetirement {
  /** Canonical document/version that retired it, e.g. 'shield-v2.0.1'. */
  by: string;
  /** Article or section reference in the retiring document. */
  section?: string;
  /** Entity ID now performing the function, where there is one successor. */
  supersededBy?: string;
  /** ISO date of the retiring revision. */
  date: string;
}

/**
 * A source-level prohibition on treating a framework as the entity's creator.
 * This makes explicit non-creation clauses machine-checkable.
 */
export interface EstablishmentExclusion {
  framework: string;
  by: string;
  section?: string;
}

/**
 * Core type definitions for the GGF Schema modular system
 */

export interface GgfEntity {
  id: string;
  type: 'Framework' | 'Council' | 'EconomicMechanism' | 'DataMetric' | 'LegalProtocol' | 
        'Platform' | 'Initiative' | 'Process' | 'Institution' | 'Tool' | 'Protocol' | 'Hub' |
        'Metric' | 'Pilot' | 'Mechanism';
  name: string;
  shortName?: string;
  description?: string;
  // Strategic tier system (0-4)
  tier?: 0 | 1 | 2 | 3 | 4;
  /** Current presentation/lifecycle state. `Retired` must be accompanied by retirement provenance. */
  status?: 'Draft' | 'Pilot' | 'Implemented' | 'Proposed' | 'Ready' | 'Review' | 'Planned' | 'Coming-Soon' | 'Active' | 'Retired';
  primaryDomain?: 'Ecological' | 'Economic' | 'Justice' | 'Governance' | 'Technology' | 'Health' | 'Ethics';
  geographicScope?: 'Local' | 'Regional' | 'Global' | 'BAZ' | 'Bioregional' | 'Institutional';
  /** Defaults to GGF. External entities are reference targets, not GGF organs. */
  ecosystem?: 'GGF' | 'External';
  /** Present when a current canonical revision has retired this entity. */
  retired?: EntityRetirement;
  /** Frameworks whose current canonical text explicitly does not create it. */
  establishmentExclusions?: EstablishmentExclusion[];
  // Strategic metadata
  implementationPriority?: 'Critical' | 'High' | 'Medium' | 'Low';
  dependencies?: string[]; // Array of entity IDs this depends on
  enables?: string[]; // Array of entity IDs this enables
  
  // === UI METADATA FOR NAVIGATION GENERATION ===
  ui?: {
    /** e.g. '/frameworks/kinship-garden' */
    path?: string;
    /** i18n key, e.g. 'framework.docs.nav.frameworkTitles.kinshipGarden' */
    titleKey?: string;
    emoji?: string;
    /** URL-friendly identifier */
    slug?: string;
    /** Thematic grouping for navigation */
    group?: string;
 
    /**
     * @deprecated Use `ui.outline.version`. Retained only for entities not
     * yet migrated to outline-first publication. Where both exist,
     * `ui.outline.version` wins.
     */
    version?: string;
 
    /** Present = published from its outline at `ui.path`. */
    outline?: OutlinePublication;

    /** Present = published from a multi-section prose draft. */
    prose?: ProsePublication;

  };
}

export interface GgfRelationship {
  from: string;
  to: string;
  type: 'OVERSEES' | 'INFORMS' | 'FUNDS' | 'ENFORCES' | 'PRODUCES' | 'USES_DATA_FROM' | 
        'REPORTS_TO' | 'COORDINATES_WITH' | 'IMPLEMENTS' | 'MEDIATES' | 'REWARDS' | 
        'ESCALATES_TO' | 'DELEGATES_TO' | 'AUDITS' | 'COLLABORATES_WITH' | 'ESTABLISHES' | 
        'GUIDES' | 'ACTIVATES' | 'COMMISSIONS' | 'INTEGRATES_WITH' | 'VALIDATES' |
        'DEPENDS_ON' | 'ENABLES' | 'PREREQUISITES' |
        // Extended relationship types
        'SUPPORTS' | 'TESTS' | 'USES' | 'MEASURES' | 'INTEGRATES' | 'CERTIFIES' |
        'PARTICIPATES_IN' | 'RESOLVES_CONFLICTS_FOR' | 'BENEFITS_FROM' | 
        'QUALIFIES_FOR' | 'EVOLVES_INTO';
  description?: string;
  strength?: 'Strong' | 'Medium' | 'Weak';
  frequency?: 'Continuous' | 'Regular' | 'As-Needed' | 'Crisis-Only' | 'Occasional';
  direction?: 'Bidirectional' | 'Unidirectional';
  // Implementation sequencing
  sequenceType?: 'Sequential' | 'Parallel' | 'Conditional';
}

export interface GgfCluster {
  id: string;
  name: string;
  description: string;
  color?: string;
  entities: string[];
  tier?: 0 | 1 | 2 | 3 | 4;
}

// Strategic tier metadata - UPDATED WITH PROPER TRANSLATION KEYS
export const tierMetadata = {
  0: {
    name: 'Constitutional Layer',
    titleKey: 'framework.tier.0.title',
    descriptionKey: 'framework.tier.0.description',
    emoji: '🏛️',
    description: 'The absolute, non-negotiable prerequisite. The new global "constitution" that makes everything else legally and institutionally possible.',
    color: '#1e1b4b', // Deep indigo
    priority: 'Critical',
    keyCharacteristics: ['Legal foundation', 'Institutional reform', 'Enforcement mechanisms']
  },
  1: {
    name: 'Core Operating Systems',
    titleKey: 'framework.tier.1.title',
    descriptionKey: 'framework.tier.1.description',
    emoji: '⚙️',
    description: 'Foundational frameworks that define the GGF\'s core governance, economic, ethical, and justice systems.',
    color: '#7c3aed', // Purple
    priority: 'Critical',
    keyCharacteristics: ['Governance coordination', 'Economic engine', 'Justice foundation', 'Ethical compass']
  },
  2: {
    name: 'Foundational Application Layer',
    titleKey: 'framework.tier.2.title',
    descriptionKey: 'framework.tier.2.description',
    emoji: '🧩',
    description: 'Essential frameworks for managing core societal and ecological systems.',
    color: '#059669', // Green
    priority: 'High',
    keyCharacteristics: ['Life support systems', 'Human capabilities', 'Ecological integrity']
  },
  3: {
    name: 'Equity & Cultural Flourishing Layer',
    titleKey: 'framework.tier.3.title',
    descriptionKey: 'framework.tier.3.description',
    emoji: '🤝',
    description: 'Frameworks ensuring deep equity, inclusion, and cultural preservation.',
    color: '#dc2626', // Red
    priority: 'Medium',
    keyCharacteristics: ['Social equity', 'Cultural preservation', 'Knowledge commons']
  },
  4: {
    name: 'Visionary & Meta-Governance Layer',
    titleKey: 'framework.tier.4.title',
    descriptionKey: 'framework.tier.4.description',
    emoji: '🔮',
    description: 'Highest level frameworks governing the entire system and addressing future risks.',
    color: '#0891b2', // Cyan
    priority: 'Medium',
    keyCharacteristics: ['System governance', 'Future orientation', 'Existential risk', 'Consciousness evolution']
  }
};

// Group metadata for navigation (aligned with frameworkNav.js structure)
export const groupMetadata = {
  planetaryHealthResilience: {
    titleKey: 'framework.groups.planetaryHealthResilience.title',
    descriptionKey: 'framework.groups.planetaryHealthResilience.description',
    emoji: '🌱'
  },
  socialFabricJustice: {
    titleKey: 'framework.groups.socialFabricJustice.title',
    descriptionKey: 'framework.groups.socialFabricJustice.description',
    emoji: '⚖️'
  },
  globalEconomicSystems: {
    titleKey: 'framework.groups.globalEconomicSystems.title',
    descriptionKey: 'framework.groups.globalEconomicSystems.description',
    emoji: '💱'
  },
  ecologicalSystems: {
    titleKey: 'framework.groups.ecologicalSystems.title',
    descriptionKey: 'framework.groups.ecologicalSystems.description',
    emoji: '🌿'
  },
  humanSocialSystems: {
    titleKey: 'framework.groups.humanSocialSystems.title',
    descriptionKey: 'framework.groups.humanSocialSystems.description',
    emoji: '🎓'
  }
};

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
