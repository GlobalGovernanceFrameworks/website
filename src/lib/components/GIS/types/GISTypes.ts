// src/lib/components/GIS/types/GISTypes.ts
// TypeScript types and interfaces for the GIS visualization components

export type MapMode = 'resource-conflict' | 'peace-infrastructure' | 'cross-border' | 'climate-migration';

export type Region = 'global' | 'africa' | 'middle-east' | 'southeast-asia' | 'south-america';

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface ResourceConflict {
  id: string;
  name: string;
  location: GeoPoint;
  level: 'high' | 'medium' | 'low';
  resources: string[];
  details: string;
}

export interface PeaceInfrastructure {
  id: string;
  name: string;
  category: 'international' | 'regional' | 'local' | 'digital';
  location: GeoPoint;
  details: string;
}

export interface InfrastructureGap {
  id: string;
  name: string;
  location: GeoPoint;
  level: 'severe' | 'moderate';
  details: string;
}

export interface CrossBorderFlow {
  id: string;
  name: string;
  start: GeoPoint;
  end: GeoPoint;
  intensity: 'high' | 'medium' | 'low';
  type: 'forced displacement' | 'economic migration' | 'climate displacement';
  details: string;
}

export interface BorderStatus {
  id: string;
  name: string;
  path: GeoPoint[];
  status: 'hardening' | 'fluctuating' | 'open';
  details: string;
}

export interface ClimateProjection {
  id: string;
  name: string;
  location: GeoPoint;
  timeframe: string; // e.g., '2030', '2040', '2050'
  impacts: {
    displacement: 'high' | 'medium' | 'low';
    conflict: 'high' | 'medium' | 'low';
    description: string;
  };
}

export interface LegendItem {
  label: string;
  color: string;
  lineStyle?: 'solid' | 'dashed';
  shape?: 'circle' | 'square' | 'triangle' | 'star';
}
