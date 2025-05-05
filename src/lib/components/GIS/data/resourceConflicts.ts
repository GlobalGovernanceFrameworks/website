// src/lib/components/GIS/data/resourceConflicts.ts
// Data for resource conflict hotspots

import type { ResourceConflict } from '../types/GISTypes';

export const resourceConflictData: ResourceConflict[] = [
  { 
    id: 'rc1', 
    name: 'Sahel Region', 
    location: { lat: 15.8, lng: 0.0 }, 
    level: 'high',
    resources: ['water', 'arable land'],
    details: 'Facing acute water scarcity and land degradation exacerbated by climate change, with resource competition between pastoralists and farmers.' 
  },
  { 
    id: 'rc2', 
    name: 'Congo Basin', 
    location: { lat: -2.5, lng: 21.0 }, 
    level: 'medium',
    resources: ['minerals', 'timber'],
    details: 'Rich in minerals and timber with ongoing extraction conflicts and environmental degradation affecting local communities.' 
  },
  { 
    id: 'rc3', 
    name: 'Middle East Water Basins', 
    location: { lat: 33.0, lng: 36.0 }, 
    level: 'high',
    resources: ['water', 'oil'],
    details: 'Transboundary water disputes over limited freshwater resources, particularly in the Jordan and Tigris-Euphrates basins.' 
  },
  { 
    id: 'rc4', 
    name: 'Amazonian Deforestation Front', 
    location: { lat: -5.0, lng: -60.0 }, 
    level: 'medium',
    resources: ['land', 'timber', 'biodiversity'],
    details: 'Conflicts between indigenous communities, farmers, and extractive industries over land use and deforestation.' 
  },
  { 
    id: 'rc5', 
    name: 'Mekong River Basin', 
    location: { lat: 15.0, lng: 105.0 }, 
    level: 'medium',
    resources: ['water', 'fisheries'],
    details: 'Tensions over hydropower development affecting downstream water flows, fisheries, and agricultural productivity.' 
  },
  { 
    id: 'rc6', 
    name: 'Himalayan Glaciers', 
    location: { lat: 30.0, lng: 82.0 }, 
    level: 'high',
    resources: ['water', 'energy'],
    details: 'Disputes over water resources from glacial melt affecting India, China, Pakistan, and other South Asian nations.' 
  },
  { 
    id: 'rc7', 
    name: 'Arctic Region', 
    location: { lat: 80.0, lng: 0.0 }, 
    level: 'low',
    resources: ['oil', 'minerals', 'shipping routes'],
    details: 'Emerging tensions over newly accessible resources due to ice melt and opening shipping routes.' 
  },
  { 
    id: 'rc8', 
    name: 'Caspian Sea Basin', 
    location: { lat: 42.0, lng: 51.0 }, 
    level: 'medium',
    resources: ['oil', 'gas', 'water'],
    details: 'Competing claims over energy resources and disagreements on environmental management and legal status.' 
  }
];

export const resourceConflictLegend = [
  { label: 'High Resource Conflict Risk', color: '#e74c3c', shape: 'circle' },
  { label: 'Medium Resource Conflict Risk', color: '#f39c12', shape: 'circle' },
  { label: 'Low Resource Conflict Risk', color: '#f1c40f', shape: 'circle' }
];
