<!-- src/lib/components/GIS/layers/PeaceInfrastructureLayer.svelte -->
<!-- Layer component for peace infrastructure visualization -->

<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import type { PeaceInfrastructure, InfrastructureGap } from '../types/GISTypes';
  import { peaceInfrastructureData, infrastructureGapData } from '../data/peaceInfrastructure';
  
  export let map;
  
  const dispatch = createEventDispatcher();
  let infrastructureLayerGroup;
  let gapLayerGroup;
  let markers = {};
  
  onMount(() => {
    if (!map || !map.L) return;
    
    const L = map.L;
    infrastructureLayerGroup = L.layerGroup().addTo(map);
    gapLayerGroup = L.layerGroup().addTo(map);
    
    // Add peace infrastructure markers
    peaceInfrastructureData.forEach(infrastructure => {
      const { symbol, color } = getInfrastructureSymbol(infrastructure.category);
      
      // Create custom icon for the infrastructure type
      const icon = L.divIcon({
        html: `<div style="color: ${color}; font-size: 20px;">${symbol}</div>`,
        className: 'peace-infrastructure-icon',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
      
      const marker = L.marker(
        [infrastructure.location.lat, infrastructure.location.lng],
        { icon }
      ).addTo(infrastructureLayerGroup);
      
      // Add tooltip
      marker.bindTooltip(`${infrastructure.name}`, {
        permanent: false,
        direction: 'top',
        className: 'peace-infrastructure-tooltip'
      });
      
      // Add click handler
      marker.on('click', () => {
        dispatch('select', { infrastructure });
      });
      
      // Store marker reference
      markers[infrastructure.id] = marker;
    });
    
    // Add infrastructure gap circles
    infrastructureGapData.forEach(gap => {
      const radius = getGapRadius(gap.level);
      const color = getGapColor(gap.level);
      
      const marker = L.circle(
        [gap.location.lat, gap.location.lng],
        {
          radius: radius * 1000, // Convert to meters
          color,
          weight: 2,
          fill: false,
          dashArray: '5, 5',
          pane: 'overlayPane'
        }
      ).addTo(gapLayerGroup);
      
      // Add tooltip
      marker.bindTooltip(`Gap: ${gap.name}`, {
        permanent: false,
        direction: 'top',
        className: 'infrastructure-gap-tooltip'
      });
      
      // Add click handler
      marker.on('click', () => {
        dispatch('select', { gap });
      });
      
      // Store marker reference
      markers[`gap-${gap.id}`] = marker;
    });
  });
  
  function getInfrastructureSymbol(category: string) {
    switch(category) {
      case 'international':
        return { symbol: '★', color: '#3498db' };
      case 'regional':
        return { symbol: '■', color: '#2ecc71' };
      case 'local':
        return { symbol: '●', color: '#9b59b6' };
      case 'digital':
        return { symbol: '▲', color: '#34495e' };
      default:
        return { symbol: '✦', color: '#7f8c8d' };
    }
  }
  
  function getGapRadius(level: string): number {
    return level === 'severe' ? 200 : 150;
  }
  
  function getGapColor(level: string): string {
    return level === 'severe' ? '#c0392b' : '#d35400';
  }
  
  onDestroy(() => {
    if (map) {
      if (infrastructureLayerGroup) map.removeLayer(infrastructureLayerGroup);
      if (gapLayerGroup) map.removeLayer(gapLayerGroup);
    }
  });
</script>

<style>
  :global(.peace-infrastructure-icon) {
    background: none;
    text-align: center;
    width: 20px !important;
    height: 20px !important;
    margin-left: -10px !important;
    margin-top: -10px !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  :global(.peace-infrastructure-tooltip),
  :global(.infrastructure-gap-tooltip) {
    background-color: rgba(44, 62, 80, 0.9);
    border: none;
    box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    color: white;
    font-size: 12px;
    padding: 5px 10px;
  }
</style>
