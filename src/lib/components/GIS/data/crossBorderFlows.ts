// src/lib/components/GIS/data/crossBorderFlows.ts
// Data for cross-border dynamics and movement patterns

import type { CrossBorderFlow, BorderStatus } from '../types/GISTypes';

export const crossBorderFlowData: CrossBorderFlow[] = [
  { 
    id: 'cb1', 
    name: 'Mediterranean Migration Route', 
    start: { lat: 30.0, lng: 20.0 }, 
    end: { lat: 42.0, lng: 12.0 },
    intensity: 'high',
    type: 'forced displacement',
    details: 'Migration flows from North Africa and the Middle East toward Europe driven by conflict and economic factors.' 
  },
  { 
    id: 'cb2', 
    name: 'Venezuela Crisis Outflow', 
    start: { lat: 8.0, lng: -66.0 }, 
    end: { lat: 4.0, lng: -72.0 },
    intensity: 'high',
    type: 'economic migration',
    details: 'Significant population movement from Venezuela to neighboring countries due to economic collapse and political tensions.' 
  },
  { 
    id: 'cb3', 
    name: 'Rohingya Displacement', 
    start: { lat: 20.5, lng: 93.0 }, 
    end: { lat: 21.5, lng: 92.0 },
    intensity: 'high',
    type: 'forced displacement',
    details: 'Forced displacement from Myanmar to Bangladesh resulting from ethnic persecution.' 
  },
  { 
    id: 'cb4', 
    name: 'Lake Chad Basin Mobility', 
    start: { lat: 13.0, lng: 14.0 }, 
    end: { lat: 12.0, lng: 15.0 },
    intensity: 'medium',
    type: 'climate displacement',
    details: 'Population movement around Lake Chad Basin due to climate change, conflict, and resource scarcity.' 
  },
  { 
    id: 'cb5', 
    name: 'Central Asian Labor Migration', 
    start: { lat: 39.0, lng: 65.0 }, 
    end: { lat: 55.0, lng: 37.5 },
    intensity: 'medium',
    type: 'economic migration',
    details: 'Labor migration from Central Asian countries to Russia driven by economic disparities.' 
  }
];

export const borderStatusData: BorderStatus[] = [
  { 
    id: 'b1', 
    name: 'EU External Border', 
    path: [
      { lat: 35.0, lng: 25.0 },
      { lat: 40.0, lng: 20.0 },
      { lat: 45.0, lng: 15.0 }
    ],
    status: 'hardening',
    details: 'Increased fortification and surveillance of the European Union's external borders, particularly in response to migration pressures.' 
  },
  { 
    id: 'b2', 
    name: 'US-Mexico Border', 
    path: [
      { lat: 32.5, lng: -117.0 },
      { lat: 31.7, lng: -106.5 },
      { lat: 29.5, lng: -99.5 },
      { lat: 26.0, lng: -97.5 }
    ],
    status: 'hardening',
    details: 'Heavily secured border with continuing tensions around migration policy and enforcement.' 
  },
  { 
    id: 'b3', 
    name: 'India-Bangladesh Border', 
    path: [
      { lat: 26.0, lng: 88.0 },
      { lat: 24.0, lng: 89.0 },
      { lat: 22.0, lng: 90.0 }
    ],
    status: 'hardening',
    details: 'Increasingly secured border with fencing and surveillance to control migration flows.' 
  },
  { 
    id: 'b4', 
    name: 'Morocco-Ceuta/Melilla', 
    path: [
      { lat: 35.9, lng: -5.3 },
      { lat: 35.3, lng: -2.9 }
    ],
    status: 'hardening',
    details: 'Heavily fortified borders around Spanish enclaves in North Africa.' 
  },
  { 
    id: 'b5', 
    name: 'Colombia-Venezuela Border', 
    path: [
      { lat: 11.0, lng: -72.0 },
      { lat: 8.0, lng: -72.0 },
      { lat: 6.0, lng: -70.0 }
    ],
    status: 'fluctuating',
    details: 'Border that periodically opens and closes in response to political tensions and migration pressures.' 
  }
];

export const crossBorderLegend = [
  { label: 'High Intensity Migration Flow', color: '#e74c3c' },
  { label: 'Medium Intensity Migration Flow', color: '#f39c12' },
  { label: 'Forced Displacement', color: '#9b59b6' },
  { label: 'Economic Migration', color: '#3498db' },
  { label: 'Climate Displacement', color: '#2ecc71' },
  { label: 'Hardening Border', color: '#34495e', lineStyle: 'solid' },
  { label: 'Fluctuating Border', color: '#95a5a6', lineStyle: 'dashed' }
];
