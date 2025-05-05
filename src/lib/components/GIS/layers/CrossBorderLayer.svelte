<!-- src/lib/components/GIS/layers/CrossBorderLayer.svelte -->
<!-- Layer component for cross-border dynamics visualization -->

<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import type { CrossBorderFlow, BorderStatus } from '../types/GISTypes';
  import { crossBorderFlowData, borderStatusData } from '../data/crossBorderFlows';
  
  export let map;
  
  const dispatch = createEventDispatcher();
  let flowLayerGroup;
  let borderLayerGroup;
  let elements = {};
  
  onMount(() => {
    if (!map || !map.L) return;
    
    const L = map.L;
    flowLayerGroup = L.layerGroup().addTo(map);
    borderLayerGroup = L.layerGroup().addTo(map);
    
    // Create arrow marker definition
    const arrowMarker = {
      'high': L.Symbol.arrowHead({
        pixelSize: 12,
        polygon: false,
        pathOptions: { stroke: true, weight: 3 }
      }),
      'medium': L.Symbol.arrowHead({
        pixelSize: 10,
        polygon: false,
        pathOptions: { stroke: true, weight: 2 }
      }),
      'low': L.Symbol.arrowHead({
        pixelSize: 8,
        polygon: false,
        pathOptions: { stroke: true, weight: 1 }
      })
    };
    
    // Add cross-border flows
    crossBorderFlowData.forEach(flow => {
      const color = getFlowColor(flow.type);
      const weight = getFlowWeight(flow.intensity);
      
      // Create polyline with arrow decorations
      const pathPattern = L.polylineDecorator(
        [
          [flow.start.lat, flow.start.lng],
          [flow.end.lat, flow.end.lng]
        ],
        {
          patterns: [
            { offset: '100%', repeat: 0, symbol: arrowMarker[flow.intensity] }
          ]
        }
      ).addTo(flowLayerGroup);
      
      // Set colors based on flow type
      pathPattern.setPatterns([{
        offset: '100%',
        repeat: 0,
        symbol: arrowMarker[flow.intensity],
        patternOptions: { color }
      }]);
      
      // Create the main flow line
      const flowLine = L.polyline(
        [
          [flow.start.lat, flow.start.lng],
          [flow.end.lat, flow.end.lng]
        ],
        {
          color,
          weight,
          opacity: 0.8,
          pane: 'overlayPane'
        }
      ).addTo(flowLayerGroup);
      
      // Add tooltip
      flowLine.bindTooltip(flow.name, {
        permanent: false,
        direction: 'top',
        className: 'cross-border-tooltip'
      });
      
      // Add click handler
      flowLine.on('click', () => {
        dispatch('select', { flow });
      });
      
      // Store element references
      elements[`flow-${flow.id}`] = { pathPattern, flowLine };
    });
    
    // Add border statuses
    borderStatusData.forEach(border => {
      const color = getBorderColor(border.status);
      const dashArray = getBorderDashArray(border.status);
      
      const borderLine = L.polyline(
        border.path.map(point => [point.lat, point.lng]),
        {
          color,
          weight: 3,
          opacity: 0.8,
          dashArray,
          pane: 'overlayPane'
        }
      ).addTo(borderLayerGroup);
      
      // Add tooltip
      borderLine.bindTooltip(border.name, {
        permanent: false,
        direction: 'top',
        className: 'border-status-tooltip'
      });
      
      // Add click handler
      borderLine.on('click', () => {
        dispatch('select', { border });
      });
      
      // Store element reference
      elements[`border-${border.id}`] = borderLine;
    });
  });
  
  function getFlowColor(type: string): string {
    switch(type) {
      case 'forced displacement':
        return '#9b59b6';
      case 'economic migration':
        return '#3498db';
      case 'climate displacement':
        return '#2ecc71';
      default:
        return '#7f8c8d';
    }
  }
  
  function getFlowWeight(intensity: string): number {
    switch(intensity) {
      case 'high':
        return 4;
      case 'medium':
        return 3;
      case 'low':
        return 2;
      default:
        return 2;
    }
  }
  
  function getBorderColor(status: string): string {
    return status === 'hardening' ? '#34495e' : '#95a5a6';
  }
  
  function getBorderDashArray(status: string): string | null {
    return status === 'hardening' ? null : '5, 5';
  }
  
  onDestroy(() => {
    if (map) {
      if (flowLayerGroup) map.removeLayer(flowLayerGroup);
      if (borderLayerGroup) map.removeLayer(borderLayerGroup);
    }
  });
</script>

<style>
  :global(.cross-border-tooltip),
  :global(.border-status-tooltip) {
    background-color: rgba(44, 62, 80, 0.9);
    border: none;
    box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    color: white;
    font-size: 12px;
    padding: 5px 10px;
  }
</style>
