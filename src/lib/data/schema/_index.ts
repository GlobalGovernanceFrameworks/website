// /src/lib/data/schema/_index.ts

/**
 * GGF Schema - Complete Index with ALL Frameworks
 * Single source of truth aggregating all cluster data
 */

// Import all cluster data
import { constitutionalFoundationEntities, constitutionalFoundationRelationships } from './cluster.constitutional-foundation';
import { institutionalRegenerationEntities, institutionalRegenerationRelationships } from './cluster.institutional-regeneration';
import { pathfinderProtocolEntities, pathfinderProtocolRelationships } from './cluster.pathfinder-protocol';
import { justTransitionEntities, justTransitionRelationships } from './cluster.just-transition';
import { governanceOSEntities, governanceOSRelationships } from './cluster.governance-os';
import { implementationOSEntities, implementationOSRelationships } from './cluster.implementation-os';
import { ethicalOSEntities, ethicalOSRelationships } from './cluster.ethical-os';
import { justiceOSEntities, justiceOSRelationships } from './cluster.justice-os';
import { economicOSEntities, economicOSRelationships } from './cluster.economic-os';
import { technologyOSEntities, technologyOSRelationships } from './cluster.technology-os';
import { ecologicalEntities, ecologicalRelationships } from './cluster.ecological';
import { humanFlourishingEntities, humanFlourishingRelationships } from './cluster.human-flourishing';
import { socialEquityEntities, socialEquityRelationships } from './cluster.social-equity';
import { culturalKnowledgeEntities, culturalKnowledgeRelationships } from './cluster.cultural-knowledge';
import { mobilityCommonsEntities, mobilityCommonsRelationships, developmentEntities, developmentRelationships } from './cluster.development';
import { visionaryMetaEntities, visionaryMetaRelationships } from './cluster.visionary-meta';
import { dataOSEntities, dataOSRelationships } from './cluster.data-os';
import { hearthstoneEntities, hearthstoneRelationships } from './cluster.property-stewardship';
import { conduitProtocolEntities, conduitProtocolRelationships } from './cluster.infrastructure';


// Import types and metadata
import type { GgfEntity, GgfRelationship, GgfCluster, ValidationResult } from './_types';
import { tierMetadata, groupMetadata } from './_types';

// (Legacy: entities migrated to dedicated cluster files)

// Cross-cluster relationships (connecting entities across different cluster files)
const crossClusterRelationships: GgfRelationship[] = [
  // === TIER 1 â†’ TIER 2 ENABLING RELATIONSHIPS ===
  {
    from: 'framework_aubi',
    to: 'framework_work_liberation',
    type: 'ENABLES',
    description: 'AUBI enables Work Liberation implementation',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'council_phc',
    to: 'framework_food',
    type: 'ENABLES',
    description: 'PHC provides governance foundation for food systems',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Sequential'
  },
  {
    from: 'mechanism_gcf',
    to: 'framework_global_health',
    type: 'FUNDS',
    description: 'Global Commons Fund finances health system implementation',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_aurora_accord',
    to: 'framework_technology_governance',
    type: 'ENABLES',
    description: 'Data governance enables comprehensive technology governance',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },

  // === TIER 2 â†’ TIER 3 ENABLING RELATIONSHIPS ===
  {
    from: 'framework_global_health',
    to: 'framework_migration',
    type: 'ENABLES',
    description: 'Stable health systems enable equitable migration governance',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_education',
    to: 'framework_digital_commons',
    type: 'ENABLES',
    description: 'Educational systems enable knowledge commons preservation',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Sequential'
  },

  // === TIER 3 â†’ TIER 4 ENABLING RELATIONSHIPS ===
  {
    from: 'framework_digital_commons',
    to: 'framework_consciousness_development',
    type: 'ENABLES',
    description: 'Knowledge commons enable consciousness development',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_meta_gov',
    to: 'framework_planetary_immune_system',
    type: 'ENABLES',
    description:
      'Meta-Governance supplies coordination, shared situational awareness and rights-bounded crisis procedures for PIS; it creates no system-level override authority.',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Sequential'
  },

  // === CROSS-TIER COORDINATION ===
  // REMOVED: framework_planetary_immune_system → framework_meta_gov (OVERSEES,
  // "can override entire system during existential crises"). Meta-Governance
  // v1.5 removed all such override paths and PIS v2.2.2 states it does not
  // create a residual global sovereign. A COORDINATES_WITH edge now lives in
  // cluster.visionary-meta.
  //
  // NOTE: the remaining edges in this array belong in their `from` entity's
  // cluster file by the convention used throughout the schema.
  {
    from: 'council_earth',
    to: 'council_phc',
    type: 'GUIDES',
    description: 'Earth Council provides Indigenous wisdom to planetary health decisions',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_baz',
    to: 'framework_food',
    type: 'IMPLEMENTS',
    description: 'BAZs implement regenerative food systems locally',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  }
];

// === AGGREGATE ALL ENTITIES AND RELATIONSHIPS ===
export const allEntities: GgfEntity[] = [
  ...constitutionalFoundationEntities,
  ...institutionalRegenerationEntities,
  ...pathfinderProtocolEntities,
  ...justTransitionEntities,
  ...governanceOSEntities,
  ...implementationOSEntities,
  ...ethicalOSEntities,
  ...justiceOSEntities,
  ...economicOSEntities,
  ...dataOSEntities,
  ...technologyOSEntities, 
  ...ecologicalEntities, 
  ...humanFlourishingEntities, 
  ...socialEquityEntities,
  ...culturalKnowledgeEntities,
  ...mobilityCommonsEntities,
  ...developmentEntities, 
  ...visionaryMetaEntities,
  ...hearthstoneEntities,
  ...conduitProtocolEntities
];

export const allRelationships: GgfRelationship[] = [
  ...constitutionalFoundationRelationships,
  ...institutionalRegenerationRelationships,
  ...pathfinderProtocolRelationships,
  ...justTransitionRelationships,
  ...governanceOSRelationships,
  ...implementationOSRelationships,
  ...ethicalOSRelationships,
  ...justiceOSRelationships,
  ...economicOSRelationships,
  ...dataOSRelationships,
  ...technologyOSRelationships,
  ...ecologicalRelationships,
  ...humanFlourishingRelationships,
  ...socialEquityRelationships,
  ...culturalKnowledgeRelationships,
  ...mobilityCommonsRelationships,
  ...developmentRelationships,
  ...visionaryMetaRelationships,
  ...crossClusterRelationships,
  ...hearthstoneRelationships,
  ...conduitProtocolRelationships
];

// === CLUSTER DEFINITIONS ===
// Retired entities remain in allEntities for historical resolution, but live
// consumers such as clusters, navigation, implementation sequences, and
// critical-path views must not surface them as operative nodes.
const liveEntityIds = (entities: GgfEntity[]): string[] =>
  entities.filter(entity => !entity.retired).map(entity => entity.id);

export const clusters: GgfCluster[] = [
  // TIER 0: CONSTITUTIONAL LAYER
  {
    id: 'constitutional_foundation',
    name: 'Constitutional Foundation',
    description: 'The Treaty for Our Only Home - the singular constitutional framework that enables all others',
    tier: 0,
    entities: liveEntityIds(constitutionalFoundationEntities),
    color: '#1e1b4b'
  },

  // TIER 1: CORE OPERATING SYSTEMS
  {
    id: 'implementation_os',
    name: 'Implementation & Adaptation OS',
    description: 'The GGF\'s primary "operating manual," providing the practical \'how-to\' for all other frameworks.',
    tier: 1,
    entities: [
      'framework_implementation_adaptation',
      'institution_ggf_catalyst',
      'platform_community_of_practice',
      'institution_ggf_failure_library'
    ],
    color: '#7c3aed' // Standard Tier 1 Purple
  },
  {
    id: 'just_transition_security_cluster',
    name: 'Just Transition System (Security)',
    description: 'The Aegis Protocol: A framework for transitioning the military-industrial complex into a regenerative global security architecture.',
    tier: 1,
    entities: liveEntityIds(justTransitionEntities.filter(e => e.tier === 1)),
    color: '#7c3aed' // Purple for Tier 1
  },
  {
    id: 'institutional_regeneration_cluster',
    name: 'Institutional Regeneration System',
    description: 'Practical framework for transforming existing global governance institutions from bureaucratic inertia to agile, mission-driven service',
    tier: 1,
    entities: liveEntityIds(institutionalRegenerationEntities),
    color: '#7c3aed'
  },
  {
    id: 'governance_os',
    name: 'Governance Operating System',
    description: 'Meta-Governance: The nervous system coordinating all other frameworks',
    tier: 1,
    entities: liveEntityIds(governanceOSEntities),
    color: '#7c3aed'
  },
  {
    id: 'ethical_os',
    name: 'Ethical Operating System',
    description: 'Indigenous Framework: The heart providing ethical compass and philosophical foundation',
    tier: 1,
    entities: liveEntityIds(ethicalOSEntities),
    color: '#7c3aed'
  },
  {
    id: 'justice_os',
    name: 'Justice Operating System',
    description: 'Justice & Peace: Rule of law infrastructure for the entire ecosystem',
    tier: 1,
    entities: liveEntityIds(justiceOSEntities),
    color: '#7c3aed'
  },
  {
    id: 'economic_os',
    name: 'Economic Operating System',
    description: 'Regenerative Economy: Core economic engine with Hearts/Leaves, Love Ledger, and AUBI',
    tier: 1,
    entities: liveEntityIds(economicOSEntities),
    color: '#7c3aed'
  },
  {
    id: 'data_os',
    name: 'Data Operating System',
    description: 'Aurora Accord: Digital-first world data governance rules',
    tier: 1,
    entities: liveEntityIds(dataOSEntities),
    color: '#7c3aed'
  },
  {
    id: 'human_flourishing_cluster',
    name: 'Human Flourishing & Capability Systems',
    description: 'Core systems ensuring healthy, capable, and informed citizenry with epistemic integrity',
    tier: 2,
    entities: liveEntityIds(humanFlourishingEntities),
    color: '#059669'
  },
  {
    id: 'technology_os',
    name: 'Technology Operating System',
    description: 'Core technology governance with ethical AI, biotech, and digital systems oversight',
    tier: 1,
    entities: liveEntityIds(technologyOSEntities),
    color: '#7c3aed'
  },

  // TIER 2: FOUNDATIONAL APPLICATIONS
  {
    id: 'just_transition_industry_cluster',
    name: 'Just Transition System (Industry)',
    description: 'The Sundown Protocol: A framework for retiring harmful industries and rebirthing regenerative futures.',
    tier: 2,
    entities: liveEntityIds(justTransitionEntities.filter(e => e.tier === 2)),
    color: '#059669' // Green for Tier 2
  },
  {
    id: 'property_stewardship_cluster',
    name: 'Property & Stewardship Transition',
    description: 'The Hearthstone Protocol: The bridge from extractive ownership to regenerative stewardship.',
    tier: 2,
    entities: liveEntityIds(hearthstoneEntities),
    color: '#059669'
  },
  {
    id: 'infrastructure_cluster',
    name: 'Shared Infrastructure Systems',
    description: 'The Conduit Protocol: The circulatory system for a resilient planetary civilization.',
    tier: 2,
    entities: liveEntityIds(conduitProtocolEntities),
    color: '#059669' // Green for Tier 2
  },
  {
    id: 'pathfinder_protocol_cluster',
    name: 'Pathfinder Protocol System',
    description: 'Voluntary framework for transforming corporate purpose to align with planetary well-being through systemic business model innovation',
    tier: 2,
    entities: liveEntityIds(pathfinderProtocolEntities),
    color: '#059669'
  },
  {
    id: 'ecological_life_support_cluster',
    name: 'Ecological Life Support Systems',
    description: 'Core biophysical systems that sustain life on Earth - the heart of planetary stewardship',
    tier: 2,
    entities: liveEntityIds(ecologicalEntities),
    color: '#059669'
  },
  // TIER 3: EQUITY & CULTURAL SYSTEMS
  {
    id: 'social_equity_inclusion_cluster',
    name: 'Social Equity & Inclusion Systems',
    description: 'Frameworks ensuring deep equity, inclusion, and intersectional justice for all communities',
    tier: 3,
    entities: liveEntityIds(socialEquityEntities),
    color: '#dc2626'
  },
  {
    id: 'cultural_knowledge_commons_cluster',
    name: 'Cultural & Knowledge Commons Systems',
    description: 'The "soul" of the GGF - heritage preservation, knowledge commons, and wisdom cultivation',
    tier: 3, // Primary tier, though spans 3-4
    entities: liveEntityIds(culturalKnowledgeEntities),
    color: '#dc2626'
  },
  {
    id: 'development_applications_cluster',
    name: 'Development Applications',
    description: 'Sustainable urban and rural development frameworks coordinating human settlements with ecological systems',
    tier: 3,
    entities: [
      ...liveEntityIds(developmentEntities),
      ...liveEntityIds(mobilityCommonsEntities)
    ],
    color: '#dc2626'
  },
  // TIER 4: VISIONARY & META-SYSTEMS
  {
    id: 'visionary_meta_systems_cluster',
    name: 'Visionary & Meta-Systems',
    description: 'Highest-level frameworks for future governance, existential risks, and system-wide implementation',
    tier: 4,
    entities: liveEntityIds(visionaryMetaEntities),
    color: '#0891b2'
  }
];

// === UTILITY FUNCTIONS ===

// Export types and metadata
export { tierMetadata, groupMetadata };
export type { GgfEntity, GgfRelationship, GgfCluster, ValidationResult };

// Enhanced validation functions
export function validateSchema(entities: GgfEntity[], relationships: GgfRelationship[]): ValidationResult {
  const entityIds = new Set(entities.map(e => e.id));
  const entityById = new Map(entities.map(e => [e.id, e]));
  const retiredIds = new Set(entities.filter(e => e.retired).map(e => e.id));
  const errors: string[] = [];
  const creationImplyingTypes = new Set<GgfRelationship['type']>([
    'ESTABLISHES',
    'ENABLES',
    'ACTIVATES',
    'IMPLEMENTS',
    'DELEGATES_TO'
  ]);
  
  // Check endpoints, retirement boundaries, and explicit non-creation clauses.
  for (const rel of relationships) {
    if (!entityIds.has(rel.from)) {
      errors.push(`Relationship references unknown entity: ${rel.from}`);
    }
    if (!entityIds.has(rel.to)) {
      errors.push(`Relationship references unknown entity: ${rel.to}`);
    }

    if (retiredIds.has(rel.from)) {
      errors.push(`Relationship originates from retired entity: ${rel.from} --${rel.type}--> ${rel.to}`);
    }
    if (retiredIds.has(rel.to)) {
      errors.push(`Relationship points to retired entity: ${rel.from} --${rel.type}--> ${rel.to}`);
    }

    // Explicit non-creation clauses also block relationship types that can
    // imply activation, delegation, or operational embodiment.
    if (creationImplyingTypes.has(rel.type)) {
      const target = entityById.get(rel.to);
      const exclusion = target?.establishmentExclusions?.find(x => x.framework === rel.from);
      if (exclusion) {
        const source = exclusion.section
          ? `${exclusion.by} ${exclusion.section}`
          : exclusion.by;
        errors.push(
          `Prohibited creation-implying relationship: ${rel.from} --${rel.type}--> ${rel.to}; excluded by ${source}`
        );
      }
    }
  }
  
  // Retirement provenance and presentation status must agree so generic
  // consumers cannot accidentally advertise retired institutions as live.
  for (const entity of entities) {
    if (entity.retired && entity.status !== 'Retired') {
      errors.push(`${entity.id} has retirement provenance but status is ${entity.status ?? 'unset'}`);
    }
    if (entity.status === 'Retired' && !entity.retired) {
      errors.push(`${entity.id} has status Retired but no retirement provenance`);
    }
  }

  // Dependencies and enables arrays are live declarations and may not contain
  // retired entities.
  for (const entity of entities) {
    for (const depId of entity.dependencies ?? []) {
      if (retiredIds.has(depId)) {
        errors.push(`${entity.id}.dependencies contains retired entity: ${depId}`);
      }
    }
    for (const enabledId of entity.enables ?? []) {
      if (retiredIds.has(enabledId)) {
        errors.push(`${entity.id}.enables contains retired entity: ${enabledId}`);
      }
    }
  }

  // Check tier consistency - lower tiers shouldn't depend on higher tiers.
  for (const entity of entities) {
    if (entity.dependencies) {
      for (const depId of entity.dependencies) {
        const dependency = entityById.get(depId);
        if (dependency && entity.tier !== undefined && dependency.tier !== undefined) {
          if (dependency.tier > entity.tier) {
            errors.push(`Tier violation: ${entity.name} (Tier ${entity.tier}) depends on ${dependency.name} (Tier ${dependency.tier})`);
          }
        }
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function getEntitiesByTier(
  tier: 0 | 1 | 2 | 3 | 4,
  options: { includeRetired?: boolean } = {}
): GgfEntity[] {
  return allEntities.filter(entity =>
    entity.tier === tier && (options.includeRetired || !entity.retired)
  );
}

/**
 * Everything published by the /frameworks/[slug] route.
 * The predicate is publication, not entity type — Genesis Protocol is a
 * LegalProtocol and still belongs in the tier-0 list. Deliberately mirrors
 * `publishedEntities` in outlineRegistry.js so nav and routes can't diverge.
 */
export function getFrameworksWithUI(): GgfEntity[] {
  return allEntities.filter((e) => !e.retired && e.ui?.slug && (e.ui.outline || e.ui.prose));
}

export function getImplementationSequence(): GgfEntity[][] {
  const sequence: GgfEntity[][] = [];
  
  // Tier 0: Constitutional prerequisite
  sequence.push(getEntitiesByTier(0));
  
  // Tier 1: Core operating systems (can be implemented in parallel after Tier 0)
  sequence.push(getEntitiesByTier(1));
  
  // Tier 2: Application layer (depends on Tier 1)
  sequence.push(getEntitiesByTier(2));
  
  // Tier 3: Equity and cultural layer (depends on Tier 2)
  sequence.push(getEntitiesByTier(3));
  
  // Tier 4: Visionary governance (depends on lower tiers)
  sequence.push(getEntitiesByTier(4));
  
  return sequence;
}

export function getCriticalPath(): GgfEntity[] {
  return allEntities.filter(entity =>
    !entity.retired && (
      entity.implementationPriority === 'Critical' ||
      entity.tier === 0 ||
      (entity.tier === 1 && entity.primaryDomain === 'Governance')
    )
  );
}

// Legacy compatibility exports
export const entities = allEntities;
export const relationships = allRelationships;
