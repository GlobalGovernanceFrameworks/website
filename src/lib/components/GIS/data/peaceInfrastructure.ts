// src/lib/components/GIS/data/peaceInfrastructure.ts
// Data for peace infrastructure distribution

import type { PeaceInfrastructure, InfrastructureGap } from '../types/GISTypes';

export const peaceInfrastructureData: PeaceInfrastructure[] = [
  { 
    id: 'pi1-1', 
    name: 'UN Peacekeeping Mission - South Sudan', 
    location: { lat: 7.5, lng: 30.0 },
    category: 'international',
    details: 'UNMISS: UN peacekeeping mission established in 2011 to support peace implementation and civilian protection.' 
  },
  { 
    id: 'pi1-2', 
    name: 'UN Peacekeeping Mission - DR Congo', 
    location: { lat: -2.5, lng: 25.0 },
    category: 'international',
    details: 'MONUSCO: Large UN stabilization mission operating since 1999 to protect civilians and support the peace process.' 
  },
  { 
    id: 'pi1-3', 
    name: 'UN Peacekeeping Mission - Mali', 
    location: { lat: 17.0, lng: -2.0 },
    category: 'international',
    details: 'MINUSMA: UN mission established in 2013 to support political processes and carry out security-related tasks.' 
  },
  { 
    id: 'pi2-1', 
    name: 'Regional Mediation Center - Addis Ababa', 
    location: { lat: 9.0, lng: 38.7 },
    category: 'regional',
    details: 'African Union Mediation Support Unit: Provides technical expertise and resources for regional mediation efforts.' 
  },
  { 
    id: 'pi2-2', 
    name: 'Regional Mediation Center - Dakar', 
    location: { lat: 14.7, lng: -17.5 },
    category: 'regional',
    details: 'ECOWAS Mediation & Security Council: Coordinates regional conflict prevention and mediation in West Africa.' 
  },
  { 
    id: 'pi2-3', 
    name: 'Regional Mediation Center - Singapore', 
    location: { lat: 1.3, lng: 103.8 },
    category: 'regional',
    details: 'ASEAN Institute for Peace and Reconciliation: Develops capacity and provides research for regional peace efforts.' 
  },
  { 
    id: 'pi3-1', 
    name: 'Local Peace Committee Network - Philippines', 
    location: { lat: 8.0, lng: 125.0 },
    category: 'local',
    details: 'Network of grassroots peace committees in Mindanao supporting community-level conflict resolution and prevention.' 
  },
  { 
    id: 'pi3-2', 
    name: 'Local Peace Committee Network - Colombia', 
    location: { lat: 4.5, lng: -74.0 },
    category: 'local',
    details: 'Community peace infrastructure supporting implementation of the 2016 peace agreement at the local level.' 
  },
  { 
    id: 'pi3-3', 
    name: 'Local Peace Committee Network - Kenya', 
    location: { lat: 0.5, lng: 37.5 },
    category: 'local',
    details: 'District Peace Committees providing early warning and local mediation across potential conflict hotspots.' 
  },
  { 
    id: 'pi4-1', 
    name: 'Digital Peace Observatory - Geneva', 
    location: { lat: 46.2, lng: 6.1 },
    category: 'digital',
    details: 'Digital conflict monitoring hub tracking hate speech, disinformation, and incitement to violence online.' 
  },
  { 
    id: 'pi4-2', 
    name: 'Digital Peace Observatory - New York', 
    location: { lat: 40.7, lng: -74.0 },
    category: 'digital',
    details: 'Global platform for coordinating digital peacebuilding strategies and technological solutions for conflict prevention.' 
  },
  { 
    id: 'pi4-3', 
    name: 'Digital Peace Observatory - Tokyo', 
    location: { lat: 35.7, lng: 139.7 },
    category: 'digital',
    details: 'Center focused on AI ethics for peace applications and emerging technology governance in conflict settings.' 
  }
];

export const infrastructureGapData: InfrastructureGap[] = [
  { 
    id: 'gap1', 
    name: 'Central Africa', 
    location: { lat: 6.5, lng: 20.5 }, 
    level: 'severe',
    details: 'Insufficient peace infrastructure in the context of multiple overlapping conflicts, with limited early warning capacity and response mechanisms.' 
  },
  { 
    id: 'gap2', 
    name: 'Yemen', 
    location: { lat: 15.5, lng: 47.5 }, 
    level: 'severe',
    details: 'Critical lack of civilian protection, humanitarian access, and conflict resolution mechanisms in ongoing complex emergency.' 
  },
  { 
    id: 'gap3', 
    name: 'Central America', 
    location: { lat: 13.0, lng: -87.0 }, 
    level: 'moderate',
    details: 'Limited cross-border peacebuilding capacity despite regional gang violence, displacement, and trafficking challenges.' 
  },
  { 
    id: 'gap4', 
    name: 'Papua New Guinea', 
    location: { lat: -6.0, lng: 144.0 }, 
    level: 'moderate',
    details: 'Underdeveloped mediation systems and early warning networks needed to address tribal conflicts and resource disputes.' 
  }
];

export const peaceInfrastructureLegend = [
  { label: 'International Peace Infrastructure', color: '#3498db', shape: 'star' },
  { label: 'Regional Peace Infrastructure', color: '#2ecc71', shape: 'square' },
  { label: 'Local Peace Infrastructure', color: '#9b59b6', shape: 'circle' },
  { label: 'Digital Peace Infrastructure', color: '#34495e', shape: 'triangle' },
  { label: 'Severe Infrastructure Gap', color: '#c0392b', lineStyle: 'dashed' },
  { label: 'Moderate Infrastructure Gap', color: '#d35400', lineStyle: 'dashed' }
];
