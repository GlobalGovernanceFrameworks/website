<!-- src/lib/components/GIS/layers/ClimateProjectionLayer.svelte -->
<!-- Layer component for climate migration projections visualization -->

<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import type { ClimateProjection } from '../types/GISTypes';
  import { climateProjectionData } from '../data/climateProjections';
  
  export let map;
  
  const dispatch = createEventDispatcher();
  let displacementLayerGroup;
  let conflictLayerGroup;
  let markers = {};
  
  onMount(() => {
    if (!map || !map.L) return;
    
    const L = map.L;
    displacementLayerGroup = L.layerGroup().addTo(map);
    conflictLayerGroup = L.layerGroup().addTo(map);
    
    // Add climate projection markers
    climateProjectionData.forEach(projection => {
      // Displacement risk circle
      const displacementRadius = getDisplacementRadius(projection.impacts.displacement);
      const displacementColor = getDisplacementColor(projection.impacts.displacement);
      
      const displacementMarker = L.circle(
        [projection.location.lat, projection.location.lng],
        {
          radius: displacementRadius * 1000, // Convert to meters
          color: displacementColor,
          fillColor: displacementColor,
          fillOpacity: 0.3,
          weight: 1,
          pane: 'overlayPane'
        }
      ).addTo(displacementLayerGroup);
      
      // Conflict risk circle (offset slightly for visibility)
      const conflictRadius = getConflictRadius(projection.impacts.conflict);
      const conflictColor = getConflictColor(projection.impacts.conflict);
      
      const conflictMarker = L.circle(
        [projection.location.lat + 0.5, projection.location.lng + 0.5],
        {
          radius: conflictRadius * 1000, // Convert to meters
          color: conflictColor,
          fill: false,
          weight: 2,
          dashArray: '4, 4',
          pane: 'overlayPane'
        }
      ).addTo(conflictLayerGroup);
      
      // Add time label marker
      const icon = L.divIcon({
        html: `<div class="projection-time">${projection.timeframe}</div>`,
        className: 'projection-time-icon',
        iconSize: [40, 20],
        iconAnchor: [20, 10]
      });
      
      const labelMarker = L.marker(
        [projection.location.lat, projection.location.lng],
        { icon }
      ).addTo(displacementLayerGroup);
      
      // Add tooltip to both circles
      displacementMarker.bindTooltip(`${projection.name} (${projection.timeframe})`, {
        permanent: false,
        direction: 'top',
        className: 'climate-projection-tooltip'
      });
      
      // Add click handler to both circles
      displacementMarker.on('click', () => {
        dispatch('select', { projection });
      });
      
      conflictMarker.on('click', () => {
        dispatch('select', { projection });
      });
      
      // Store marker references
      markers[projection.id] = {
        displacement: displacementMarker,
        conflict: conflictMarker,
        label: labelMarker
      };
    });
  });
  
  function getDisplacementRadius(level: string): number {
    switch(level) {
      case 'high':
        return 300;
      case 'medium':
        return 200;
      case 'low':
        return 100;
      default:
        return 150;
    }
  }
  
  function getDisplacementColor(level: string): string {
    switch(level) {
      case 'high':
        return '#e74c3c';
      case 'medium':
        return '#f39c12';
      case 'low':
        return '#f1c40f';
      default:
        return '#7f8c8d';
    }
  }
  
  function getConflictRadius(level: string): number {
    switch(level) {
      case 'high':
        return 350;
      case 'medium':
        return 250;
      case 'low':
        return 150;
      default:
        return 200;
    }
  }
  
  function getConflictColor(level: string): string {
    switch(level) {
      case 'high':
        return '#8e44ad';
      case 'medium':
        return '#9b59b6';
      case 'low':
        return '#3498db';
      default:
        return '#7f8c8d';
    }
  }
  
  onDestroy(() => {
    if (map) {
      if (displacementLayerGroup) map.removeLayer(displacementLayerGroup);
      if (conflictLayerGroup) map.removeLayer(conflictLayerGroup);
    }
  });
</script>

<style>
  :global(.projection-time-icon) {
    background: none;
    text-align: center;
  }
  
  :global(.projection-time) {
    background-color: rgba(52, 73, 94, 0.8);
    color: white;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 10px;
    font-weight: bold;
  }
  
  :global(.climate-projection-tooltip) {
    background-color: rgba(44, 62, 80, 0.9);
    border: none;
    box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    color: white;
    font-size: 12px;
    padding: 5px 10px;
  }
</style>
