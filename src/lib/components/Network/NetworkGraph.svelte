<!-- src/lib/components/Network/NetworkGraph.svelte -->
<!-- Core network graph component using vis-network for visualization -->

<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { 
    getFormalInformalData,
    getResourceFlowData,
    getInfluenceData,
    getTrustData
  } from './data/networkData.js';
  import { getNetworkOptions } from './options/networkOptions.js';
  
  // Props
  export let type = 'formal-informal';
  export let view = 'global';
  
  // State
  let container;
  let network;
  let nodes;
  let edges;
  let data;
  let initialized = false;
  
  const dispatch = createEventDispatcher();
  
  // Export methods for parent component
  export function setZoom(zoomLevel) {
    if (network) {
      network.moveTo({ scale: zoomLevel });
    }
  }
  
  export function togglePhysics(enabled) {
    if (network) {
      network.setOptions({ physics: { enabled } });
    }
  }
  
  export function toggleClustering(enabled) {
    if (!network || !data) return;
    
    if (enabled) {
      // Apply clustering based on group property
      const clusterOptionsByData = {
        joinCondition: (nodeOptions) => {
          return nodeOptions.group === 1; // Cluster group 1 nodes
        },
        processProperties: (clusterOptions, childNodes) => {
          // Process cluster properties based on child nodes
          return {
            ...clusterOptions,
            label: `Cluster (${childNodes.length} nodes)`,
            color: '#8BC34A',
            shape: 'dot',
            size: 25 + childNodes.length
          };
        },
        clusterNodeProperties: {
          borderWidth: 2,
          shape: 'dot',
          font: { size: 14 }
        }
      };
      
      network.cluster(clusterOptionsByData);
      
      // Create additional clusters for other groups
      const clusterOptionsByData2 = {
        joinCondition: (nodeOptions) => {
          return nodeOptions.group === 2; // Cluster group 2 nodes
        },
        processProperties: (clusterOptions, childNodes) => {
          return {
            ...clusterOptions,
            label: `Cluster (${childNodes.length} nodes)`,
            color: '#2196F3',
            shape: 'dot',
            size: 25 + childNodes.length
          };
        },
        clusterNodeProperties: {
          borderWidth: 2,
          shape: 'dot',
          font: { size: 14 }
        }
      };
      
      network.cluster(clusterOptionsByData2);
    } else {
      // Undo clustering
      network.openCluster('*');
    }
  }
  
  export function setEdgeFilter(strengthThreshold) {
    if (!network || !edges) return;
    
    // Filter edges based on strength/weight
    const filteredEdges = edges.get().map(edge => {
      const updatedEdge = { ...edge };
      if (edge.value < strengthThreshold * 10) {
        updatedEdge.hidden = true;
      } else {
        updatedEdge.hidden = false;
      }
      return updatedEdge;
    });
    
    edges.update(filteredEdges);
  }
  
  // Function to load data based on selected type and view
  function loadData() {
    switch (type) {
      case 'formal-informal':
        data = getFormalInformalData(view);
        break;
      case 'resource-flow':
        data = getResourceFlowData(view);
        break;
      case 'influence':
        data = getInfluenceData(view);
        break;
      case 'trust':
        data = getTrustData(view);
        break;
      default:
        data = getFormalInformalData(view);
    }
    
    return data;
  }
  
  // Initialize or update the visualization
  async function initNetwork() {
    if (typeof window === 'undefined') return; // Skip on SSR
    
    try {
      // First make sure vis-network is installed
      if (!window.vis) {
        // Add the script to the page if it doesn't exist
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/vis-network/standalone/umd/vis-network.min.js';
        script.async = true;
        
        // Wait for script to load
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      
      // Now we can use the global vis object
      const vis = window.vis;
      
      const networkData = loadData();
      
      // Create a DataSet for nodes and edges
      nodes = new vis.DataSet(networkData.nodes);
      edges = new vis.DataSet(networkData.edges);
      
      // Get network options based on network type
      const options = getNetworkOptions(type);
      
      // Create network with the data
      network = new vis.Network(
        container, 
        { nodes, edges }, 
        options
      );
      
      // Add event listeners
      network.on('click', function(params) {
        if (params.nodes.length > 0) {
          // Node click
          const nodeId = params.nodes[0];
          const node = nodes.get(nodeId);
          dispatch('nodeSelect', { node });
        } else if (params.edges.length > 0) {
          // Edge click
          const edgeId = params.edges[0];
          const edge = edges.get(edgeId);
          dispatch('edgeSelect', { edge });
        }
      });
      
      network.on('stabilizationIterationsDone', function() {
        dispatch('ready', { graph: network });
      });
      
      initialized = true;
    } catch (error) {
      console.error('Error initializing network:', error);
    }
  }
  
  // Update network when type or view changes
  $: if (initialized && (type || view)) {
    const networkData = loadData();
    nodes.clear();
    edges.clear();
    nodes.add(networkData.nodes);
    edges.add(networkData.edges);
    
    // Get updated options for the new network type
    const options = getNetworkOptions(type);
    network.setOptions(options);
    
    // Reset zoom and position
    network.fit();
  }
  
  onMount(() => {
    initNetwork();
  });
  
  onDestroy(() => {
    if (network) {
      network.destroy();
      network = null;
    }
  });
</script>

<div class="network-graph" bind:this={container}></div>

<style>
  .network-graph {
    width: 100%;
    height: 100%;
    background-color: #fdfdfd;
    position: relative;
  }
  
  /* vis-network CSS */
  :global(.vis-network) {
    position: relative;
    overflow: hidden;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: move;
  }
  
  :global(.vis-canvas) {
    position: relative;
    touch-action: none;
    -ms-touch-action: none;
  }
</style>
