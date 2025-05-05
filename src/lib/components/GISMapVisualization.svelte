<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  
  // Default props with options for customization
  export let mapMode = 'resource-conflict'; // Options: resource-conflict, peace-infrastructure, cross-border, climate-migration
  export let initialRegion = 'global'; // Options: global, africa, middle-east, southeast-asia, south-america
  export let showLegend = true;
  export let showControls = true;
  export let interactive = true;
  
  // Event dispatcher for component interactions
  const dispatch = createEventDispatcher();
  
  // State variables
  let mapContainer;
  let mapLoaded = false;
  let selectedRegion = initialRegion;
  let selectedMode = mapMode;
  let selectedHotspot = null;
  let showInfoPanel = false;
  let zoom = 1;
  let hoveredCountry = null;
  
  // Data for the different map modes
  const mapData = {
    'resource-conflict': {
      title: 'Resource Conflict Hotspot Mapping',
      description: 'Overlay of resource scarcity and conflict incidence',
      hotspots: [
        { 
          id: 'rc1', 
          name: 'Sahel Region', 
          coords: { x: 47, y: 38 }, 
          level: 'high',
          resources: ['water', 'arable land'],
          details: 'Facing acute water scarcity and land degradation exacerbated by climate change, with resource competition between pastoralists and farmers.' 
        },
        { 
          id: 'rc2', 
          name: 'Congo Basin', 
          coords: { x: 50, y: 45 }, 
          level: 'medium',
          resources: ['minerals', 'timber'],
          details: 'Rich in minerals and timber with ongoing extraction conflicts and environmental degradation affecting local communities.' 
        },
        { 
          id: 'rc3', 
          name: 'Middle East Water Basins', 
          coords: { x: 55, y: 33 }, 
          level: 'high',
          resources: ['water', 'oil'],
          details: 'Transboundary water disputes over limited freshwater resources, particularly in the Jordan and Tigris-Euphrates basins.' 
        },
        { 
          id: 'rc4', 
          name: 'Amazonian Deforestation Front', 
          coords: { x: 30, y: 50 }, 
          level: 'medium',
          resources: ['land', 'timber', 'biodiversity'],
          details: 'Conflicts between indigenous communities, farmers, and extractive industries over land use and deforestation.' 
        },
        { 
          id: 'rc5', 
          name: 'Mekong River Basin', 
          coords: { x: 73, y: 42 }, 
          level: 'medium',
          resources: ['water', 'fisheries'],
          details: 'Tensions over hydropower development affecting downstream water flows, fisheries, and agricultural productivity.' 
        },
        { 
          id: 'rc6', 
          name: 'Himalayan Glaciers', 
          coords: { x: 68, y: 35 }, 
          level: 'high',
          resources: ['water', 'energy'],
          details: 'Disputes over water resources from glacial melt affecting India, China, Pakistan, and other South Asian nations.' 
        },
        { 
          id: 'rc7', 
          name: 'Arctic Region', 
          coords: { x: 52, y: 12 }, 
          level: 'low',
          resources: ['oil', 'minerals', 'shipping routes'],
          details: 'Emerging tensions over newly accessible resources due to ice melt and opening shipping routes.' 
        },
        { 
          id: 'rc8', 
          name: 'Caspian Sea Basin', 
          coords: { x: 60, y: 27 }, 
          level: 'medium',
          resources: ['oil', 'gas', 'water'],
          details: 'Competing claims over energy resources and disagreements on environmental management and legal status.' 
        }
      ],
      legend: [
        { label: 'High Resource Conflict Risk', color: '#e74c3c' },
        { label: 'Medium Resource Conflict Risk', color: '#f39c12' },
        { label: 'Low Resource Conflict Risk', color: '#f1c40f' }
      ]
    },
    'peace-infrastructure': {
      title: 'Peace Infrastructure Distribution',
      description: 'Spatial analysis of peace capacities and gaps',
      infrastructure: [
        { 
          id: 'pi1', 
          name: 'UN Peacekeeping Mission', 
          locations: [
            { name: 'South Sudan', coords: { x: 54, y: 45 } },
            { name: 'DR Congo', coords: { x: 50, y: 45 } },
            { name: 'Mali', coords: { x: 44, y: 38 } }
          ],
          category: 'international'
        },
        { 
          id: 'pi2', 
          name: 'Regional Mediation Center', 
          locations: [
            { name: 'Addis Ababa', coords: { x: 55, y: 43 } },
            { name: 'Dakar', coords: { x: 42, y: 40 } },
            { name: 'Singapore', coords: { x: 74, y: 45 } }
          ],
          category: 'regional'
        },
        { 
          id: 'pi3', 
          name: 'Local Peace Committee Network', 
          locations: [
            { name: 'Philippines', coords: { x: 77, y: 43 } },
            { name: 'Colombia', coords: { x: 27, y: 47 } },
            { name: 'Kenya', coords: { x: 54, y: 45 } }
          ],
          category: 'local'
        },
        { 
          id: 'pi4', 
          name: 'Digital Peace Observatory', 
          locations: [
            { name: 'Geneva', coords: { x: 48, y: 28 } },
            { name: 'New York', coords: { x: 28, y: 30 } },
            { name: 'Tokyo', coords: { x: 82, y: 32 } }
          ],
          category: 'digital'
        }
      ],
      gaps: [
        { name: 'Central Africa', coords: { x: 51, y: 42 }, level: 'severe' },
        { name: 'Yemen', coords: { x: 58, y: 37 }, level: 'severe' },
        { name: 'Central America', coords: { x: 24, y: 40 }, level: 'moderate' },
        { name: 'Papua New Guinea', coords: { x: 84, y: 50 }, level: 'moderate' }
      ],
      legend: [
        { label: 'International Peace Infrastructure', color: '#3498db' },
        { label: 'Regional Peace Infrastructure', color: '#2ecc71' },
        { label: 'Local Peace Infrastructure', color: '#9b59b6' },
        { label: 'Digital Peace Infrastructure', color: '#34495e' },
        { label: 'Severe Infrastructure Gap', color: '#e74c3c' },
        { label: 'Moderate Infrastructure Gap', color: '#f39c12' }
      ]
    },
    'cross-border': {
      title: 'Cross-Border Dynamics Visualization',
      description: 'Movement patterns across boundaries in conflict regions',
      flows: [
        { 
          id: 'cb1', 
          name: 'Mediterranean Migration Route', 
          start: { x: 49, y: 38 }, 
          end: { x: 47, y: 28 },
          intensity: 'high',
          type: 'forced displacement',
          details: 'Migration flows from North Africa and the Middle East toward Europe driven by conflict and economic factors.'
        },
        { 
          id: 'cb2', 
          name: 'Venezuela Crisis Outflow', 
          start: { x: 28, y: 45 }, 
          end: { x: 26, y: 48 },
          intensity: 'high',
          type: 'economic migration',
          details: 'Significant population movement from Venezuela to neighboring countries due to economic collapse and political tensions.'
        },
        { 
          id: 'cb3', 
          name: 'Rohingya Displacement', 
          start: { x: 72, y: 40 }, 
          end: { x: 71, y: 42 },
          intensity: 'high',
          type: 'forced displacement',
          details: 'Forced displacement from Myanmar to Bangladesh resulting from ethnic persecution.'
        },
        { 
          id: 'cb4', 
          name: 'Lake Chad Basin Mobility', 
          start: { x: 48, y: 40 }, 
          end: { x: 50, y: 38 },
          intensity: 'medium',
          type: 'climate displacement',
          details: 'Population movement around Lake Chad Basin due to climate change, conflict, and resource scarcity.'
        },
        { 
          id: 'cb5', 
          name: 'Central Asian Labor Migration', 
          start: { x: 65, y: 28 }, 
          end: { x: 60, y: 25 },
          intensity: 'medium',
          type: 'economic migration',
          details: 'Labor migration from Central Asian countries to Russia driven by economic disparities.'
        }
      ],
      boundaries: [
        { 
          id: 'b1', 
          name: 'EU External Border', 
          coords: [{ x: 48, y: 28 }, { x: 52, y: 26 }],
          status: 'hardening',
          details: "Increased fortification and surveillance of the European Union's external borders, particularly in response to migration pressures."
        },
        { 
          id: 'b2', 
          name: 'US-Mexico Border', 
          coords: [{ x: 20, y: 32 }, { x: 24, y: 35 }],
          status: 'hardening',
          details: 'Heavily secured border with continuing tensions around migration policy and enforcement.'
        },
        { 
          id: 'b3', 
          name: 'India-Bangladesh Border', 
          coords: [{ x: 70, y: 38 }, { x: 71, y: 36 }],
          status: 'hardening',
          details: 'Increasingly secured border with fencing and surveillance to control migration flows.'
        },
        { 
          id: 'b4', 
          name: 'Morocco-Ceuta/Melilla', 
          coords: [{ x: 44, y: 33 }, { x: 45, y: 32 }],
          status: 'hardening',
          details: 'Heavily fortified borders around Spanish enclaves in North Africa.'
        },
        { 
          id: 'b5', 
          name: 'Colombia-Venezuela Border', 
          coords: [{ x: 27, y: 45 }, { x: 29, y: 44 }],
          status: 'fluctuating',
          details: 'Border that periodically opens and closes in response to political tensions and migration pressures.'
        }
      ],
      legend: [
        { label: 'High Intensity Migration Flow', color: '#e74c3c' },
        { label: 'Medium Intensity Migration Flow', color: '#f39c12' },
        { label: 'Forced Displacement', color: '#9b59b6' },
        { label: 'Economic Migration', color: '#3498db' },
        { label: 'Climate Displacement', color: '#2ecc71' },
        { label: 'Hardening Border', color: '#34495e' },
        { label: 'Fluctuating Border', color: '#95a5a6' }
      ]
    },
    'climate-migration': {
      title: 'Climate-Migration-Conflict Projection Maps',
      description: 'Forward-looking scenarios based on climate models',
      projections: [
        {
          id: 'cm1',
          name: 'Sahel Desertification',
          coords: { x: 47, y: 37 },
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
          coords: { x: 70, y: 39 },
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
          coords: { x: 24, y: 38 },
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
          coords: { x: 90, y: 50 },
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
          coords: { x: 57, y: 34 },
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
          coords: { x: 49, y: 32 },
          timeframe: '2040',
          impacts: {
            displacement: 'medium',
            conflict: 'medium',
            description: 'Increasing heat waves, drought, and fire risk affecting southern European and North African agricultural productivity and habitability.'
          }
        }
      ],
      legend: [
        { label: 'High Displacement Risk', color: '#e74c3c' },
        { label: 'Medium Displacement Risk', color: '#f39c12' },
        { label: 'Low Displacement Risk', color: '#f1c40f' },
        { label: 'High Conflict Risk', color: '#8e44ad' },
        { label: 'Medium Conflict Risk', color: '#9b59b6' },
        { label: 'Low Conflict Risk', color: '#3498db' }
      ]
    }
  };
  
  // Map regions with coordinates (percentage-based for responsive mapping)
  const regions = {
    'global': { scale: 1, center: { x: 50, y: 50 } },
    'africa': { scale: 2.5, center: { x: 50, y: 42 } },
    'middle-east': { scale: 3, center: { x: 55, y: 34 } },
    'southeast-asia': { scale: 2.8, center: { x: 75, y: 42 } },
    'south-america': { scale: 2.8, center: { x: 30, y: 48 } }
  };
  
  // Function to get hotspot radius based on level
  function getHotspotSize(level) {
    switch(level) {
      case 'high': return 12;
      case 'medium': return 9;
      case 'low': return 7;
      case 'severe': return 10;
      case 'moderate': return 8;
      default: return 8;
    }
  }
  
  // Function to get hotspot color based on level
  function getHotspotColor(level) {
    switch(level) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#f1c40f';
      case 'severe': return '#c0392b';
      case 'moderate': return '#d35400';
      default: return '#3498db';
    }
  }
  
  // Function to get infrastructure marker type based on category
  function getInfrastructureMarker(category) {
    switch(category) {
      case 'international': return { symbol: '★', color: '#3498db' };
      case 'regional': return { symbol: '◆', color: '#2ecc71' };
      case 'local': return { symbol: '●', color: '#9b59b6' };
      case 'digital': return { symbol: '▲', color: '#34495e' };
      default: return { symbol: '■', color: '#7f8c8d' };
    }
  }
  
  // Function to calculate transformed coordinates based on zoom and center
  function transformCoords(coords) {
    const region = regions[selectedRegion];
    const scale = region.scale;
    const centerX = region.center.x;
    const centerY = region.center.y;
    
    // Calculate offset from center and apply scaling
    const offsetX = (coords.x - centerX) * scale;
    const offsetY = (coords.y - centerY) * scale;
    
    // Add scaled offset to center (50%) to get final position
    return {
      x: 50 + offsetX,
      y: 50 + offsetY
    };
  }
  
  // Handle region selection change
  function changeRegion(region) {
    selectedRegion = region;
    dispatch('regionChange', { region });
  }
  
  // Handle map mode selection change
  function changeMode(mode) {
    selectedMode = mode;
    selectedHotspot = null;
    showInfoPanel = false;
    dispatch('modeChange', { mode });
  }
  
  // Handle hotspot selection
  function selectHotspot(hotspot) {
    selectedHotspot = hotspot;
    showInfoPanel = true;
    dispatch('hotspotSelect', { hotspot });
  }
  
  // Close info panel
  function closeInfoPanel() {
    showInfoPanel = false;
    selectedHotspot = null;
  }
  
  // Zoom in function
  function zoomIn() {
    zoom = Math.min(zoom + 0.2, 3);
  }
  
  // Zoom out function
  function zoomOut() {
    zoom = Math.max(zoom - 0.2, 0.5);
  }
  
  // Handle map loading
  onMount(() => {
    mapLoaded = true;
  });
</script>

<div class="gis-map-container">
  {#if showControls}
    <div class="controls-panel">
      <div class="mode-selector">
        <h3>Map View</h3>
        <div class="button-group">
          <button 
            class:active={selectedMode === 'resource-conflict'} 
            on:click={() => changeMode('resource-conflict')}
          >
            Resource Conflicts
          </button>
          <button 
            class:active={selectedMode === 'peace-infrastructure'} 
            on:click={() => changeMode('peace-infrastructure')}
          >
            Peace Infrastructure
          </button>
          <button 
            class:active={selectedMode === 'cross-border'} 
            on:click={() => changeMode('cross-border')}
          >
            Cross-Border Dynamics
          </button>
          <button 
            class:active={selectedMode === 'climate-migration'} 
            on:click={() => changeMode('climate-migration')}
          >
            Climate-Migration
          </button>
        </div>
      </div>
      
      <div class="region-selector">
        <h3>Region Focus</h3>
        <div class="button-group">
          <button 
            class:active={selectedRegion === 'global'} 
            on:click={() => changeRegion('global')}
          >
            Global
          </button>
          <button 
            class:active={selectedRegion === 'africa'} 
            on:click={() => changeRegion('africa')}
          >
            Africa
          </button>
          <button 
            class:active={selectedRegion === 'middle-east'} 
            on:click={() => changeRegion('middle-east')}
          >
            Middle East
          </button>
          <button 
            class:active={selectedRegion === 'southeast-asia'} 
            on:click={() => changeRegion('southeast-asia')}
          >
            Southeast Asia
          </button>
          <button 
            class:active={selectedRegion === 'south-america'} 
            on:click={() => changeRegion('south-america')}
          >
            South America
          </button>
        </div>
      </div>
      
      <div class="zoom-controls">
        <button on:click={zoomIn}>+</button>
        <button on:click={zoomOut}>-</button>
      </div>
    </div>
  {/if}
  
  <div class="map-view-container">
    <div class="map-title">
      <h2>{mapData[selectedMode].title}</h2>
      <p>{mapData[selectedMode].description}</p>
    </div>
    
    <div class="map-wrapper" style="transform: scale({zoom});">
      {#if mapLoaded}
        <div class="map-background">
          <!-- Simplified world map outline -->
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <!-- Simplified continents - using rectangles for demonstration - would be actual map outlines in production -->
            <!-- North America -->
            <path d="M15,15 L30,15 L32,35 L17,40 L15,15 Z" fill="#e0e0e0" stroke="#ccc" class="continent" />
            
            <!-- South America -->
            <path d="M25,40 L30,40 L35,60 L25,65 L20,50 L25,40 Z" fill="#e0e0e0" stroke="#ccc" class="continent" />
            
            <!-- Europe -->
            <path d="M45,15 L55,15 L58,20 L50,30 L40,25 L45,15 Z" fill="#e0e0e0" stroke="#ccc" class="continent" />
            
            <!-- Africa -->
            <path d="M45,30 L55,25 L60,50 L45,60 L40,40 L45,30 Z" fill="#e0e0e0" stroke="#ccc" class="continent" />
            
            <!-- Asia -->
            <path d="M60,15 L85,15 L85,45 L60,55 L55,25 L60,15 Z" fill="#e0e0e0" stroke="#ccc" class="continent" />
            
            <!-- Australia -->
            <path d="M75,50 L85,50 L85,60 L75,60 L75,50 Z" fill="#e0e0e0" stroke="#ccc" class="continent" />
            
            <!-- Country borders would be added here in a real implementation -->
            
            <!-- Resource Conflict Hotspots -->
            {#if selectedMode === 'resource-conflict'}
              {#each mapData['resource-conflict'].hotspots as hotspot}
                {@const transformedCoords = transformCoords(hotspot.coords)}
                <circle 
                  cx={transformedCoords.x} 
                  cy={transformedCoords.y} 
                  r={getHotspotSize(hotspot.level)} 
                  fill={getHotspotColor(hotspot.level)}
                  fill-opacity="0.7"
                  stroke="#fff"
                  stroke-width="0.5"
                  class="hotspot-marker"
                  on:click={() => selectHotspot(hotspot)}
                  on:mouseenter={() => hoveredCountry = hotspot.name}
                  on:mouseleave={() => hoveredCountry = null}
                />
                <text 
                  x={transformedCoords.x} 
                  y={transformedCoords.y + getHotspotSize(hotspot.level) + 3}
                  font-size="2.5"
                  text-anchor="middle"
                  fill="#333"
                  class="hotspot-label"
                >
                  {hotspot.name}
                </text>
              {/each}
            {/if}
            
            <!-- Peace Infrastructure -->
            {#if selectedMode === 'peace-infrastructure'}
              {#each mapData['peace-infrastructure'].infrastructure as infra}
                {#each infra.locations as location}
                  {@const transformedCoords = transformCoords(location.coords)}
                  {@const marker = getInfrastructureMarker(infra.category)}
                  <text 
                    x={transformedCoords.x} 
                    y={transformedCoords.y}
                    font-size="5"
                    text-anchor="middle"
                    dominant-baseline="central"
                    fill={marker.color}
                    class="infrastructure-marker"
                    on:click={() => selectHotspot({...infra, location: location.name})}
                    on:mouseenter={() => hoveredCountry = `${infra.name} - ${location.name}`}
                    on:mouseleave={() => hoveredCountry = null}
                  >
                    {marker.symbol}
                  </text>
                  <text 
                    x={transformedCoords.x} 
                    y={transformedCoords.y + 4}
                    font-size="2"
                    text-anchor="middle"
                    fill="#333"
                    class="location-label"
                  >
                    {location.name}
                  </text>
                {/each}
              {/each}
              
              <!-- Peace Infrastructure Gaps -->
              {#each mapData['peace-infrastructure'].gaps as gap}
                {@const transformedCoords = transformCoords(gap.coords)}
                <circle 
                  cx={transformedCoords.x} 
                  cy={transformedCoords.y} 
                  r={getHotspotSize(gap.level)} 
                  fill="none"
                  stroke={getHotspotColor(gap.level)}
                  stroke-width="1"
                  stroke-dasharray="1,1"
                  class="gap-marker"
                  on:click={() => selectHotspot(gap)}
                  on:mouseenter={() => hoveredCountry = `Gap: ${gap.name}`}
                  on:mouseleave={() => hoveredCountry = null}
                />
                <text 
                  x={transformedCoords.x} 
                  y={transformedCoords.y + getHotspotSize(gap.level) + 3}
                  font-size="2.5"
                  text-anchor="middle"
                  fill="#c0392b"
                  class="gap-label"
                >
                  {gap.name}
                </text>
              {/each}
            {/if}
            
            <!-- Cross-Border Dynamics -->
            {#if selectedMode === 'cross-border'}
              {#each mapData['cross-border'].flows as flow}
                {@const startCoords = transformCoords(flow.start)}
                {@const endCoords = transformCoords(flow.end)}
                <!-- Flow Arrow -->
                <path 
                  d="M{startCoords.x},{startCoords.y} {endCoords.x},{endCoords.y}"
                  stroke={flow.type === 'forced displacement' ? '#9b59b6' : 
                         flow.type === 'economic migration' ? '#3498db' : 
                         flow.type === 'climate displacement' ? '#2ecc71' : '#95a5a6'}
                  stroke-width={flow.intensity === 'high' ? 2 : 1}
                  stroke-opacity="0.8"
                  fill="none"
                  marker-end="url(#arrowhead)"
                  class="flow-line"
                  on:click={() => selectHotspot(flow)}
                  on:mouseenter={() => hoveredCountry = flow.name}
                  on:mouseleave={() => hoveredCountry = null}
                />
                <!-- Add a small circle at the start for better clickability -->
                <circle 
                  cx={startCoords.x} 
                  cy={startCoords.y} 
                  r="1.5" 
                  fill={flow.type === 'forced displacement' ? '#9b59b6' : 
                        flow.type === 'economic migration' ? '#3498db' : 
                        flow.type === 'climate displacement' ? '#2ecc71' : '#95a5a6'}
                  class="flow-marker"
                />
                <text 
                  x={(startCoords.x + endCoords.x) / 2} 
                  y={(startCoords.y + endCoords.y) / 2 - 2}
                  font-size="2"
                  text-anchor="middle"
                  fill="#333"
                  class="flow-label"
                >
                  {flow.name}
                </text>
              {/each}
              
              <!-- Border Dynamics -->
              {#each mapData['cross-border'].boundaries as boundary}
                {@const startCoords = transformCoords(boundary.coords[0])}
                {@const endCoords = transformCoords(boundary.coords[1])}
                <path 
                  d="M{startCoords.x},{startCoords.y} {endCoords.x},{endCoords.y}"
                  stroke={boundary.status === 'hardening' ? '#34495e' : '#95a5a6'}
                  stroke-width="2"
                  stroke-dasharray={boundary.status === 'hardening' ? "none" : "2,1"}
                  stroke-opacity="0.8"
                  fill="none"
                  class="boundary-line"
                  on:click={() => selectHotspot(boundary)}
                  on:mouseenter={() => hoveredCountry = boundary.name}
                  on:mouseleave={() => hoveredCountry = null}
                />
                <text 
                  x={(startCoords.x + endCoords.x) / 2} 
                  y={(startCoords.y + endCoords.y) / 2 + 3}
                  font-size="2"
                  text-anchor="middle"
                  fill="#333"
                  class="boundary-label"
                >
                  {boundary.name}
                </text>
              {/each}
            {/if}
            
            <!-- Climate-Migration-Conflict Projections -->
            {#if selectedMode === 'climate-migration'}
              {#each mapData['climate-migration'].projections as projection}
                {@const transformedCoords = transformCoords(projection.coords)}
                <!-- Displacement risk circle -->
                <circle 
                  cx={transformedCoords.x} 
                  cy={transformedCoords.y} 
                  r={getHotspotSize(projection.impacts.displacement)} 
                  fill={getHotspotColor(projection.impacts.displacement)}
                  fill-opacity="0.5"
                  stroke="none"
                  class="projection-displacement"
                />
                <!-- Conflict risk circle (slightly offset) -->
                <circle 
                  cx={transformedCoords.x + 2} 
                  cy={transformedCoords.y - 2} 
                  r={getHotspotSize(projection.impacts.conflict)} 
                  fill="none"
                  stroke={projection.impacts.conflict === 'high' ? '#8e44ad' : 
                          projection.impacts.conflict === 'medium' ? '#9b59b6' : '#3498db'}
                  stroke-width="1"
                  stroke-dasharray="1,1"
                  class="projection-conflict"
                />
                <!-- Combined marker for clicking -->
                <circle 
                  cx={transformedCoords.x} 
                  cy={transformedCoords.y} 
                  r={getHotspotSize('high')} 
                  fill="transparent"
                  class="projection-marker"
                  on:click={() => selectHotspot(projection)}
                  on:mouseenter={() => hoveredCountry = projection.name}
                  on:mouseleave={() => hoveredCountry = null}
                />
                <text 
                  x={transformedCoords.x} 
                  y={transformedCoords.y + getHotspotSize('high') + 3}
                  font-size="2.5"
                  text-anchor="middle"
                  fill="#333"
                  class="projection-label"
                >
                  {projection.name} ({projection.timeframe})
                </text>
              {/each}
            {/if}
            
            <!-- Arrow marker definition for flow lines -->
            <defs>
              <marker 
                id="arrowhead" 
                markerWidth="4" 
                markerHeight="4" 
                refX="2" 
                refY="2" 
                orient="auto"
              >
                <polygon points="0,0 4,2 0,4" fill="#666" />
              </marker>
            </defs>
          </svg>
        </div>
        
        <!-- Hover tooltip -->
        {#if hoveredCountry}
          <div class="tooltip" transition:fade={{ duration: 100 }}>
            {hoveredCountry}
          </div>
        {/if}
      {/if}
    </div>
    
    {#if showLegend}
      <div class="map-legend">
        <h3>Legend</h3>
        <div class="legend-items">
          {#each mapData[selectedMode].legend as item}
            <div class="legend-item">
              <span class="legend-color-box" style="background-color: {item.color}"></span>
              <span class="legend-label">{item.label}</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
  
  <!-- Information panel for selected hotspots -->
  {#if showInfoPanel && selectedHotspot}
    <div class="info-panel" transition:slide={{ duration: 200 }}>
      <div class="info-header">
        <h3>{selectedHotspot.name}</h3>
        <button class="close-btn" on:click={closeInfoPanel}>×</button>
      </div>
      
      <div class="info-content">
        {#if selectedMode === 'resource-conflict'}
          <p><strong>Conflict Level:</strong> {selectedHotspot.level.charAt(0).toUpperCase() + selectedHotspot.level.slice(1)}</p>
          <p><strong>Key Resources:</strong> {selectedHotspot.resources.join(', ')}</p>
          <p>{selectedHotspot.details}</p>
        {:else if selectedMode === 'peace-infrastructure'}
          {#if selectedHotspot.category}
            <p><strong>Infrastructure Type:</strong> {selectedHotspot.category.charAt(0).toUpperCase() + selectedHotspot.category.slice(1)}</p>
            <p><strong>Location:</strong> {selectedHotspot.location}</p>
            <p><strong>Description:</strong> {selectedHotspot.name} providing conflict prevention and resolution services.</p>
          {:else}
            <p><strong>Gap Severity:</strong> {selectedHotspot.level.charAt(0).toUpperCase() + selectedHotspot.level.slice(1)}</p>
            <p><strong>Impact:</strong> Reduced peace capacity, limited conflict prevention, and delayed responses to emerging tensions.</p>
          {/if}
        {:else if selectedMode === 'cross-border'}
          {#if selectedHotspot.intensity}
            <p><strong>Flow Type:</strong> {selectedHotspot.type.charAt(0).toUpperCase() + selectedHotspot.type.slice(1)}</p>
            <p><strong>Intensity:</strong> {selectedHotspot.intensity.charAt(0).toUpperCase() + selectedHotspot.intensity.slice(1)}</p>
            <p>{selectedHotspot.details}</p>
          {:else}
            <p><strong>Border Status:</strong> {selectedHotspot.status.charAt(0).toUpperCase() + selectedHotspot.status.slice(1)}</p>
            <p>{selectedHotspot.details}</p>
          {/if}
        {:else if selectedMode === 'climate-migration'}
          <p><strong>Projected Timeframe:</strong> {selectedHotspot.timeframe}</p>
          <p><strong>Displacement Risk:</strong> {selectedHotspot.impacts.displacement.charAt(0).toUpperCase() + selectedHotspot.impacts.displacement.slice(1)}</p>
          <p><strong>Conflict Risk:</strong> {selectedHotspot.impacts.conflict.charAt(0).toUpperCase() + selectedHotspot.impacts.conflict.slice(1)}</p>
          <p>{selectedHotspot.impacts.description}</p>
        {/if}
        
        <!-- Policy recommendations would go here in a real implementation -->
        <div class="policy-recommendations">
          <h4>Policy Recommendations</h4>
          <ul>
            <li>Develop integrated early warning systems linking climate, migration, and conflict indicators.</li>
            <li>Strengthen cross-border cooperation mechanisms for resource management.</li>
            <li>Implement targeted peace infrastructure in identified gap regions.</li>
          </ul>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .gis-map-container {
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: 1rem;
    height: 100%;
    min-height: 600px;
    font-family: Arial, sans-serif;
  }
  
  .map-view-container {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .map-title {
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .map-title h2 {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
    font-size: 1.5rem;
  }
  
  .map-title p {
    margin: 0;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
  
  .map-wrapper {
    position: relative;
    flex-grow: 1;
    overflow: hidden;
    transition: transform 0.3s ease;
    transform-origin: center center;
  }
  
  .map-background {
    width: 100%;
    height: 100%;
    background-color: #f0f8ff;
    position: relative;
  }
  
  .continent {
    transition: fill 0.3s ease;
  }
  
  .continent:hover {
    fill: #d0d0d0;
  }
  
  .controls-panel {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .controls-panel h3 {
    margin: 0 0 0.75rem 0;
    color: #2c3e50;
    font-size: 1rem;
  }
  
  .button-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .button-group button {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f8f9fa;
    color: #333;
    cursor: pointer;
    text-align: left;
    transition: all 0.2s ease;
  }
  
  .button-group button:hover {
    background-color: #e9ecef;
  }
  
  .button-group button.active {
    background-color: #2c3e50;
    color: white;
    border-color: #2c3e50;
  }
  
  .zoom-controls {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .zoom-controls button {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 1px solid #ddd;
    background-color: white;
    color: #333;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .zoom-controls button:hover {
    background-color: #e9ecef;
  }
  
  .hotspot-marker, 
  .flow-marker, 
  .infrastructure-marker, 
  .gap-marker, 
  .projection-marker {
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .hotspot-marker:hover, 
  .flow-marker:hover,
  .infrastructure-marker:hover,
  .gap-marker:hover,
  .projection-marker:hover {
    transform: scale(1.1);
  }
  
  .hotspot-label, 
  .flow-label,
  .boundary-label,
  .location-label,
  .gap-label,
  .projection-label {
    pointer-events: none;
  }
  
  .tooltip {
    position: absolute;
    background-color: rgba(44, 62, 80, 0.9);
    color: white;
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    z-index: 100;
    top: 10px;
    left: 10px;
    max-width: 200px;
  }
  
  .map-legend {
    padding: 1rem;
    border-top: 1px solid #eee;
  }
  
  .map-legend h3 {
    margin: 0 0 0.75rem 0;
    color: #2c3e50;
    font-size: 1rem;
  }
  
  .legend-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 0.5rem;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
  }
  
  .legend-color-box {
    width: 1rem;
    height: 1rem;
    border-radius: 3px;
  }
  
  .info-panel {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 320px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 200;
    overflow: hidden;
  }
  
  .info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eee;
    background-color: #f8f9fa;
  }
  
  .info-header h3 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #7f8c8d;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }
  
  .close-btn:hover {
    color: #34495e;
  }
  
  .info-content {
    padding: 1rem;
    font-size: 0.9rem;
    color: #333;
  }
  
  .info-content p {
    margin: 0 0 0.75rem 0;
    line-height: 1.5;
  }
  
  .policy-recommendations {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px dashed #ddd;
  }
  
  .policy-recommendations h4 {
    margin: 0 0 0.75rem 0;
    color: #2c3e50;
    font-size: 1rem;
  }
  
  .policy-recommendations ul {
    margin: 0;
    padding-left: 1.5rem;
  }
  
  .policy-recommendations li {
    margin-bottom: 0.5rem;
  }
  
  @media (max-width: 992px) {
    .gis-map-container {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
    }
    
    .info-panel {
      width: 80%;
      max-width: 320px;
    }
  }
</style>
