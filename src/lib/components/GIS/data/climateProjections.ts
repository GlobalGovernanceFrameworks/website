// src/lib/components/GIS/data/climateProjections.ts
// Data for climate-migration-conflict projection maps

import type { ClimateProjection } from '../types/GISTypes';

export const climateProjectionData: ClimateProjection[] = [
  {
    id: 'cm1',
    name: 'Sahel Desertification',
    location: { lat: 15.0, lng: 5.0 },
    timeframe: '2030',
    impacts: {
      displacement: 'high',
      conflict: 'high',
      description: 'Projected severe drought and advancing desertification leading to significant southward population movement and resource competition.'
    }
  },
  {
    id: 'cm2',
    name: 'Bengal Delta Flooding',
    location: { lat: 23.0, lng: 90.0 },
    timeframe: '2040',
    impacts: {
      displacement: 'high',
      conflict: 'medium',
      description: 'Sea level rise and increased monsoon intensity projected to displace millions in low-lying coastal areas of Bangladesh and India.'
    }
  },
  {
    id: 'cm3',
    name: 'Central American Dry Corridor',
    location: { lat: 14.0, lng: -88.0 },
    timeframe: '2035',
    impacts: {
      displacement: 'high',
      conflict: 'medium',
      description: 'Expanding drought conditions affecting crop yields, food security, and northward migration patterns through Mexico toward the United States.'
    }
  },
  {
    id: 'cm4',
    name: 'Pacific Island Nations',
    location: { lat: -15.0, lng: 170.0 },
    timeframe: '2045',
    impacts: {
      displacement: 'high',
      conflict: 'low',
      description: 'Existential threat to low-lying island nations from sea level rise, forcing relocation to larger Pacific countries and beyond.'
    }
  },
  {
    id: 'cm5',
    name: 'Middle East Water Stress',
    location: { lat: 33.0, lng: 44.0 },
    timeframe: '2035',
    impacts: {
      displacement: 'medium',
      conflict: 'high',
      description: 'Intensifying water scarcity affecting agriculture, urban water supplies, and transboundary water tensions in already fragile region.'
    }
  },
  {
    id: 'cm6',
    name: 'Mediterranean Basin',
    location: { lat: 38.0, lng: 18.0 },
    timeframe: '2040',
    impacts: {
      displacement: 'medium',
      conflict: 'medium',
      description: 'Increasing heat waves, drought, and fire risk affecting southern European and North African agricultural productivity and habitability.'
    }
  }
];

export const climateProjectionLegend = [
  { label: 'High Displacement Risk', color: '#e74c3c', shape: 'circle' },
  { label: 'Medium Displacement Risk', color: '#f39c12', shape: 'circle' },
  { label: 'Low Displacement Risk', color: '#f1c40f', shape: 'circle' },
  { label: 'High Conflict Risk', color: '#8e44ad', lineStyle: 'dashed' },
  { label: 'Medium Conflict Risk', color: '#9b59b6', lineStyle: 'dashed' },
  { label: 'Low Conflict Risk', color: '#3498db', lineStyle: 'dashed' }
];
