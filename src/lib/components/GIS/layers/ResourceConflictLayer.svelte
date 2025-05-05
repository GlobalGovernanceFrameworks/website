<!-- src/lib/components/GIS/layers/ResourceConflictLayer.svelte -->
<!-- Layer component for resource conflicts visualization -->

<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import type { ResourceConflict } from '../types/GISTypes';
  import { resourceConflictData } from '../data/resourceConflicts';
  
  export let map;
  
  const dispatch = createEventDispatcher();
  let layerGroup;
  let markers = {};
  
  onMount(() => {
    if (!map || !map.L) return;
    
    const L = map.L;
    layerGroup = L.layerGroup().addTo(map);
    
    // Add resource conflict markers
    resourceConflictData.forEach(conflict => {
      const radius = getRadius(conflict.level);
      const color = getColor(conflict.level);
      
      const marker = L.circleMarker(
        [conflict.location.lat, conflict.location.lng], 
        {
          radius,
          color: '#fff',
          weight: 1,
          fillColor: color,
          fillOpacity: 0.7,
          pane: 'markerPane'
        }
      ).addTo(layerGroup);
      
      // Add tooltip
      marker.bindTooltip(conflict.name, {
        permanent: false,
        direction: 'top',
        className: 'resource-conflict-tooltip'
      });
      
      // Add click handler
      marker.on('click', () => {
        dispatch('select', { conflict });
      });
      
      // Store marker reference
      markers[conflict.id] = marker;
    });
    
    // Return cleanup function
    return () => {
      if (map && layerGroup) {
        map.removeLayer(layerGroup);
      }
    };
  });
  
  function getRadius(level: string): number {
    switch(level) {
      case 'high': return 12;
      case 'medium': return 9;
      case 'low': return 6;
      default: return 8;
    }
  }
  
  function getColor(level: string): string {
    switch(level) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#f1c40f';
      default: return '#3498db';
    }
  }
  
  onDestroy(() => {
    if (map && layerGroup) {
      map.removeLayer(layerGroup);
    }
  });
</script>

<style>
  :global(.resource-conflict-tooltip) {
    background-color: rgba(44, 62, 80, 0.9);
    border: none;
    box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    color: white;
    font-size: 12px;
    padding: 5px 10px;
  }
</style>
