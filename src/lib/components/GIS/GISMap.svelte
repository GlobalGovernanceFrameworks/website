<!-- src/lib/components/GIS/GISMap.svelte -->
<!-- Core map component with Leaflet implementation -->

<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import type { Region } from './types/GISTypes';

  let L;
  
  export let region: Region = 'global';
  export let map = null;
  
  const dispatch = createEventDispatcher();
  let mapContainer: HTMLElement;
  let currentRegion = region;
  
  // Region boundaries for zooming
  const regionBounds = {
    'global': [[minLat(-50), minLng(-180)], [maxLat(85), maxLng(180)]], // Increased northern extent
    'africa': [[minLat(-38), minLng(-25)], [maxLat(45), maxLng(55)]], // Expanded coverage
    'middle-east': [[minLat(8), minLng(20)], [maxLat(48), maxLng(70)]], // Expanded coverage
    'southeast-asia': [[minLat(-20), minLng(85)], [maxLat(40), maxLng(155)]], // Expanded coverage
    'south-america': [[minLat(-60), minLng(-90)], [maxLat(20), maxLng(-30)]] // Expanded coverage
  };

  const regionSettings = {
    'global': { 
      center: [30, 10], // Shifted north and slightly east
      zoom: 2.2,        // Slightly zoomed in
      bounds: [[minLat(-50), minLng(-180)], [maxLat(85), maxLng(180)]]
    },
    'africa': { 
      center: [5, 20],  // Centered on central Africa
      zoom: 3.5,        // More zoomed in
      bounds: [[minLat(-38), minLng(-25)], [maxLat(45), maxLng(55)]]
    },
    'middle-east': { 
      center: [30, 45], // Centered on Middle East
      zoom: 4,          // More zoomed in
      bounds: [[minLat(8), minLng(20)], [maxLat(48), maxLng(70)]]
    },
    'southeast-asia': { 
      center: [10, 115], // Centered on Southeast Asia
      zoom: 3.5,         // More zoomed in
      bounds: [[minLat(-20), minLng(85)], [maxLat(40), maxLng(155)]]
    },
    'south-america': { 
      center: [-20, -60], // Centered on South America
      zoom: 3,           // More zoomed in
      bounds: [[minLat(-60), minLng(-90)], [maxLat(20), maxLng(-30)]]
    }
  };

  // Helper functions for LatLng objects creation once L is loaded
  function minLat(lat) {
    return function() { return L ? new L.LatLng(lat, 0) : null; };
  }
  
  function maxLat(lat) {
    return function() { return L ? new L.LatLng(lat, 0) : null; };
  }
  
  function minLng(lng) {
    return function() { return L ? new L.LatLng(0, lng) : null; };
  }
  
  function maxLng(lng) {
    return function() { return L ? new L.LatLng(0, lng) : null; };
  }
  
  function createLatLngBounds(sw, ne) {
    if (!L) return null;
    return L.latLngBounds(
      L.latLng(sw[0], sw[1]),
      L.latLng(ne[0], ne[1])
    );
  }
  
  function getBoundsForRegion(regionName: Region) {
    if (!L) return null;
    
    switch(regionName) {
      case 'global':
        return createLatLngBounds([-50, -180], [85, 180]);
      case 'africa':
        return createLatLngBounds([-38, -25], [45, 55]);
      case 'middle-east':
        return createLatLngBounds([8, 20], [48, 70]);
      case 'southeast-asia':
        return createLatLngBounds([-20, 85], [40, 155]);
      case 'south-america':
        return createLatLngBounds([-60, -90], [20, -30]);
      default:
        return createLatLngBounds([-50, -180], [85, 180]);
    }
  }
  
  // Export this function to be called from parent components
  export function setRegion(newRegion: Region) {
    if (!map || !L) return;
    
    // Update the current region
    currentRegion = newRegion;
    
    // Get the bounds for the new region
    const bounds = getBoundsForRegion(newRegion);
    if (bounds) {
      // Use fitBounds with animation for smoother transition
      map.fitBounds(bounds, {
        padding: [30, 30],
        maxZoom: regionSettings[newRegion]?.zoom || 6,
        animate: true,
        duration: 1.0 // Animation duration in seconds
      });
      
      // Dispatch region change event after the map has been updated
      setTimeout(() => {
        dispatch('regionChange', { region: newRegion });
      }, 100);
    }
  }
  
  // Watch for region prop changes
  $: if (map && L && region !== currentRegion) {
    setRegion(region);
  }
  
  onMount(async () => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      // Dynamically import Leaflet only in the browser
      const leaflet = await import('leaflet');
      L = leaflet.default;
      
      // Import Leaflet CSS
      await import('leaflet/dist/leaflet.css');
      
      // Initialize map with explicit options
      map = L.map(mapContainer, {
        center: [30, 0],
        zoom: 2,
        zoomControl: true,
        attributionControl: true,
        maxBounds: [[-90, -180], [90, 180]],
        minZoom: 2,
        resetView: false
      });
      
      // Add base tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Set initial view and region
      setTimeout(() => {
        map.setView([30, 20], 2, { animation: false });
        
        if (region !== 'global') {
          setRegion(region);
        }
        
        dispatch('mapReady', { map, L });
      }, 100);
    }
  });
  
  onDestroy(() => {
    if (map) {
      map.remove();
    }
  });
</script>

<svelte:head>
  <!-- You can include the CSS here instead of adding it dynamically -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</svelte:head>

<div class="map-container" bind:this={mapContainer}>
  {#if map}
    <slot {map}></slot>
  {/if}
</div>

<style>
  .map-container {
    width: 100%;
    height: 100%; /* Make sure this is applied */
    min-height: 600px; /* Set a minimum height */
    overflow: hidden; /* Ensure content doesn't overflow */
  }
    
  :global(.leaflet-container) {
    height: 100%;
    width: 100%;
    font-family: Arial, sans-serif;
  }
</style>
