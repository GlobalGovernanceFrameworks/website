<!-- src/lib/components/Systems/SystemsDiagram.svelte -->
<!-- Core component for rendering different system dynamics diagrams -->

<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { 
    getFeedbackLoopData,
    getStockFlowData, 
    getLeveragePointsData,
    getResilienceFactorsData
  } from './data/systemsData.js';
  
  // Props
  export let type = 'feedback-loops';
  export let context = 'global';
  export let width = '100%';
  export let height = '100%';
  
  // State
  let container;
  let canvas;
  let ctx;
  let diagramData;
  let simulationInterval;
  let simulationSpeed = 1;
  let simulationTime = 0;
  let animationFrameId;
  let variables = {};
  let hoverElement = null;
  let selectedElement = null;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let scale = 1;
  let offsetX = 0;
  let offsetY = 0;
  let dragStart = null;
  
  const dispatch = createEventDispatcher();

  export function getDebugState() {
    const state = {
      diagramType: type,
      simulationTime: simulationTime,
      scale: scale,
      offset: { x: offsetX, y: offsetY }
    };
    
    // Add type-specific data
    if (type === 'feedback-loops' && diagramData && diagramData.variables) {
      state.variables = diagramData.variables.map(v => ({
        id: v.id,
        label: v.label,
        value: v.value
      }));
    } else if (type === 'stock-flow' && diagramData) {
      if (diagramData.stocks) {
        state.stocks = diagramData.stocks.map(s => ({
          id: s.id,
          label: s.label,
          value: s.value
        }));
      }
      if (diagramData.flows) {
        state.flows = diagramData.flows.map(f => ({
          id: f.id,
          label: f.label,
          rate: f.rate
        }));
      }
    }
    
    return state;
  }
  
  // Load data based on diagram type and context
  function loadData() {
    switch(type) {
      case 'feedback-loops':
        diagramData = getFeedbackLoopData(context);
        break;
      case 'stock-flow':
        diagramData = getStockFlowData(context);
        break;
      case 'leverage-points':
        diagramData = getLeveragePointsData(context);
        break;
      case 'resilience-factors':
        diagramData = getResilienceFactorsData(context);
        break;
      default:
        diagramData = getFeedbackLoopData(context);
    }
    return diagramData;
  }
  
  // Update the model based on current variables
  export function updateVariables(newVariables) {
    variables = newVariables;
    if (diagramData && diagramData.updateModel) {
      diagramData = diagramData.updateModel(variables);
      redraw();
    }
  }
  
  // Start simulation
  export function startSimulation(speed) {
    console.log(`Starting simulation with speed ${speed}`);
    simulationSpeed = speed;
    if (simulationInterval) {
      clearInterval(simulationInterval);
    }
    
    const timeStep = 100; // milliseconds
    simulationInterval = setInterval(() => {
      simulationTime += (timeStep / 1000) * simulationSpeed;
      
      // Update simulation state based on model type
      if (diagramData && diagramData.updateSimulation) {
        console.log(`Updating simulation at time ${simulationTime.toFixed(1)}`);
        
        // Store values before update for comparison
        let beforeValues;
        if (type === 'feedback-loops' && diagramData.variables) {
          beforeValues = diagramData.variables.map(v => ({ id: v.id, value: v.value }));
        } else if (type === 'stock-flow' && diagramData.stocks) {
          beforeValues = diagramData.stocks.map(s => ({ id: s.id, value: s.value }));
        }
        
        // Update the model
        const newDiagramData = diagramData.updateSimulation(simulationTime, variables);
        
        // Always replace the entire object reference
        diagramData = newDiagramData;
        
        // Log changes for debugging
        if (beforeValues) {
          let changes = [];
          if (type === 'feedback-loops' && diagramData.variables) {
            changes = diagramData.variables.filter((v, i) => 
              Math.abs(v.value - beforeValues[i].value) > 0.001
            ).map(v => `${v.id}: ${beforeValues.find(b => b.id === v.id).value.toFixed(1)} → ${v.value.toFixed(1)}`);
          } else if (type === 'stock-flow' && diagramData.stocks) {
            changes = diagramData.stocks.filter((s, i) => 
              Math.abs(s.value - beforeValues[i].value) > 0.001
            ).map(s => `${s.id}: ${beforeValues.find(b => b.id === s.id).value.toFixed(1)} → ${s.value.toFixed(1)}`);
          }
          
          if (changes.length > 0) {
            console.log("Changes detected:", changes.join(', '));
          } else {
            console.log("No significant changes detected in simulation update");
          }
        }
        
        // Force a complete redraw to ensure updates are visible
        forceCompleteRedraw();
      }
      
      dispatch('timeUpdate', { time: simulationTime });
    }, timeStep);
    
    console.log("Simulation interval started");
  }
  
  // Pause simulation
  export function pauseSimulation() {
    if (simulationInterval) {
      clearInterval(simulationInterval);
      simulationInterval = null;
    }
  }
  
  // Reset simulation
  export function resetSimulation() {
    simulationTime = 0;
    if (simulationInterval) {
      clearInterval(simulationInterval);
      simulationInterval = null;
    }
    
    // Reset the model data
    diagramData = loadData();
    
    dispatch('timeUpdate', { time: simulationTime });
    redraw();
  }
  
  // Update simulation speed
  export function setSimulationSpeed(speed) {
    simulationSpeed = speed;
    if (simulationInterval) {
      pauseSimulation();
      startSimulation(speed);
    }
  }
  
  // Initialize the canvas and start rendering
  function initCanvas() {
    if (!canvas || !ctx) return;
    
    // Get canvas dimensions - make sure this gets the full container size
    const rect = container.getBoundingClientRect();
    canvasWidth = rect.width;
    canvasHeight = rect.height;
    
    console.log("Canvas dimensions:", canvasWidth, canvasHeight); // Debug log
    
    // Set canvas size with higher resolution for retina displays
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    
    // Apply DPR scaling to context
    const dpr = window.devicePixelRatio || 1;
    ctx.scale(dpr, dpr);
    
    // Load initial data
    diagramData = loadData();
    
    // Center the diagram
    centerDiagram();
    
    // Start animation loop
    startAnimation();
    
    // Signal that diagram is ready
    dispatch('ready', { diagram: { 
      updateVariables, 
      startSimulation, 
      pauseSimulation, 
      resetSimulation, 
      setSimulationSpeed 
    }});
  }
  
  // Center the diagram in the canvas
  function centerDiagram() {
    if (!diagramData || !diagramData.bounds) return;
    
    const { minX, minY, maxX, maxY } = diagramData.bounds;
    const diagramWidth = maxX - minX;
    const diagramHeight = maxY - minY;
    
    // Calculate scale to fit the diagram in the canvas with some padding
    const padding = 80; // Increased padding
    const scaleX = (canvasWidth - padding * 2) / diagramWidth;
    const scaleY = (canvasHeight - padding * 2) / diagramHeight;
    scale = Math.min(scaleX, scaleY, 1.5); // Cap the scale at 1.5
    
    // Calculate offsets to center the diagram
    // Adjust these values to nudge the diagram up and left
    offsetX = (canvasWidth - diagramWidth * scale) / 2 - minX * scale - 70; // Added 30px left shift
    offsetY = (canvasHeight - diagramHeight * scale) / 2 - minY * scale - 70; // Added 20px upward shift
  }
  
  // Animation loop
  function startAnimation() {
    // Clear any existing animation frame
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    
    function animate() {
      // Only redraw here if we're not in a simulation
      // (simulation will trigger its own redraws)
      if (!simulationInterval) {
        redraw();
      }
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();
  }
  
  // Redraw the canvas
  function redraw() {
    if (!ctx || !diagramData) {
      console.log("Redraw called but ctx or diagramData is null");
      return;
    }
    
    console.log("Redraw called with valid ctx and diagramData");
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw background grid
    drawGrid();
    
    // Apply transformations
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);
    
    // Draw the diagram based on type
    switch(type) {
      case 'feedback-loops':
        console.log(`Drawing feedback loops with ${diagramData.variables.length} variables`);
        drawFeedbackLoops();
        break;
      case 'stock-flow':
        console.log(`Drawing stock-flow with ${diagramData.stocks.length} stocks, ${diagramData.flows.length} flows`);
        drawStockFlow();
        break;
      case 'leverage-points':
        drawLeveragePoints();
        break;
      case 'resilience-factors':
        drawResilienceFactors();
        break;
      default:
        drawFeedbackLoops();
    }
    
    // Restore canvas state
    ctx.restore();
  }

  export function updateModelData(newVariables) {
    if (diagramData) {
      // First update variables from controls
      variables = newVariables;
      
      // Then update model with these variables
      if (diagramData.updateModel) {
        diagramData = diagramData.updateModel(variables);
      }
      
      // Force redraw to reflect changes
      redraw();
      
      return true;
    }
    return false;
  }
  
  // Draw background grid
  function drawGrid() {
    const gridSize = 20 * scale;
    const offsetXMod = offsetX % gridSize;
    const offsetYMod = offsetY % gridSize;
    
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    
    // Draw vertical lines
    for (let x = offsetXMod; x < canvasWidth; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
      ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = offsetYMod; y < canvasHeight; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
      ctx.stroke();
    }
  }
  
  // Draw feedback loop diagram
  function drawFeedbackLoops() {
    if (!diagramData || !diagramData.loops || !diagramData.variables) return;
    
    // Make a local copy of the variables for rendering to avoid any reference issues
    const currentVariables = [...diagramData.variables];
    
    // Draw connections first (so they appear behind nodes)
    diagramData.loops.forEach(loop => {
      drawLoop(loop);
    });
    
    // Draw variables
    currentVariables.forEach(variable => {
      drawVariable(variable);
    });
  }
  
  // Draw a feedback loop
  function drawLoop(loop) {
    const { path, type, strength, label } = loop;
    
    if (!path || path.length < 2) return;
    
    // Set line style based on loop type
    if (type === 'reinforcing') {
      ctx.strokeStyle = '#e74c3c'; // Red for reinforcing loops
      ctx.setLineDash([]);
    } else {
      ctx.strokeStyle = '#3498db'; // Blue for balancing loops
      ctx.setLineDash([5, 3]);
    }
    
    // Line width based on strength
    ctx.lineWidth = 1 + (strength / 10) * 3;
    
    // Draw the path
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    
    for (let i = 1; i < path.length; i++) {
      // For curved paths, use quadratic curves
      if (path[i].control) {
        ctx.quadraticCurveTo(
          path[i].control.x, 
          path[i].control.y, 
          path[i].x, 
          path[i].y
        );
      } else {
        ctx.lineTo(path[i].x, path[i].y);
      }
    }
    
    ctx.stroke();
    
    // Draw arrowhead at the end of path
    drawArrowhead(
      path[path.length - 2].x, 
      path[path.length - 2].y, 
      path[path.length - 1].x, 
      path[path.length - 1].y,
      type === 'reinforcing' ? '#e74c3c' : '#3498db'
    );
    
    // Draw loop label
    if (label) {
      const midIndex = Math.floor(path.length / 2);
      const x = path[midIndex].x;
      const y = path[midIndex].y;
      
      ctx.font = '12px Arial';
      ctx.fillStyle = type === 'reinforcing' ? '#e74c3c' : '#3498db';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y - 15);
      
      // Draw loop type indicator (R or B)
      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = type === 'reinforcing' ? '#e74c3c' : '#3498db';
      ctx.fillText(type === 'reinforcing' ? 'R' : 'B', x, y - 30);
    }
  }
  
  // Draw a variable node
  function drawVariable(variable) {
    const { x, y, label, value, id, highlight, type } = variable;
    
    // Use a more dramatic radius calculation based on value
    // This makes changes more visually apparent
    const radius = 20 + (value / 10) * 30; // Enhanced scaling for visibility
    
    // Check if this variable is being hovered over
    const isHovered = hoverElement && hoverElement.id === id;
    const isSelected = selectedElement && selectedElement.id === id;
    
    // Fill style based on variable type and state
    let fillColor = '#f8f9fa';
    let strokeColor = '#2c3e50';
    let textColor = '#2c3e50';
    
    if (type === 'stock') {
      fillColor = '#3498db';
      textColor = 'white';
    } else if (type === 'flow') {
      fillColor = '#2ecc71';
      textColor = 'white';
    } else if (type === 'auxiliary') {
      fillColor = '#f1c40f';
      textColor = '#2c3e50';
    } else if (type === 'leverage') {
      fillColor = '#9b59b6';
      textColor = 'white';
    } else if (type === 'resilience') {
      fillColor = '#1abc9c';
      textColor = 'white';
    }
    
    // Change appearance if highlighted, hovered or selected
    if (highlight) {
      strokeColor = '#e74c3c';
    }
    
    if (isHovered) {
      fillColor = '#ecf0f1';
      textColor = '#2c3e50';
    }
    
    if (isSelected) {
      strokeColor = '#e67e22';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#e67e22';
    }
    
    // Draw node
    ctx.beginPath();
    
    if (type === 'stock') {
      // Rectangle for stocks
      ctx.rect(x - radius / 2, y - radius / 2, radius, radius);
    } else if (type === 'flow') {
      // Diamond for flows
      ctx.moveTo(x, y - radius / 2);
      ctx.lineTo(x + radius / 2, y);
      ctx.lineTo(x, y + radius / 2);
      ctx.lineTo(x - radius / 2, y);
      ctx.closePath();
    } else {
      // Circle for other variables
      ctx.arc(x, y, radius / 2, 0, Math.PI * 2);
    }
    
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = isSelected || isHovered ? 3 : 2;
    ctx.fill();
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw variable label
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Handle multiline labels
    if (label && label.includes('\n')) {
      const lines = label.split('\n');
      lines.forEach((line, i) => {
        const lineY = y + (i - (lines.length - 1) / 2) * 15;
        ctx.fillText(line, x, lineY);
      });
    } else {
      ctx.fillText(label, x, y);
    }
    
    // Draw value indicator with more prominence
    if (value !== undefined) {
      // Draw a background for the value
      const valueText = value.toFixed(1);
      ctx.font = 'bold 14px Arial'; // Larger font
      const textWidth = ctx.measureText(valueText).width;
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fillRect(x - textWidth/2 - 4, y + radius / 2 + 8, textWidth + 8, 20);
      
      // Draw the value with a distinctive color
      ctx.fillStyle = '#e74c3c'; // Bright red for visibility
      ctx.fillText(valueText, x, y + radius / 2 + 18);
    }
  }
  
  // Draw stock-flow diagram
  function drawStockFlow() {
    if (!diagramData) return;
    
    // Draw flows first
    if (diagramData.flows) {
      diagramData.flows.forEach(flow => {
        drawFlow(flow);
      });
    }
    
    // Draw stocks
    if (diagramData.stocks) {
      diagramData.stocks.forEach(stock => {
        drawStock(stock);
      });
    }
    
    // Draw auxiliaries
    if (diagramData.auxiliaries) {
      diagramData.auxiliaries.forEach(aux => {
        drawAuxiliary(aux);
      });
    }
    
    // Draw connectors
    if (diagramData.connectors) {
      diagramData.connectors.forEach(connector => {
        drawConnector(connector);
      });
    }
  }
  
  // Draw a stock
  function drawStock(stock) {
    const { x, y, label, value, id } = stock;
    // Make size more dynamic based on value
    const width = 60 + (value / 10) * 40;
    const height = 40 + (value / 10) * 20;
    
    // Check if this stock is being hovered or selected
    const isHovered = hoverElement && hoverElement.id === id;
    const isSelected = selectedElement && selectedElement.id === id;
    
    // Set styles
    let fillColor = '#3498db';
    let strokeColor = '#2c3e50';
    let textColor = 'white';
    
    if (isHovered) {
      fillColor = '#2980b9';
    }
    
    if (isSelected) {
      strokeColor = '#e67e22';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#e67e22';
    }
    
    // Draw rectangle
    ctx.beginPath();
    ctx.rect(x - width / 2, y - height / 2, width, height);
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = isSelected || isHovered ? 3 : 2;
    ctx.fill();
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw label
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y - 5);
    
    // Draw value with more prominence
    if (value !== undefined) {
      ctx.font = 'bold 16px Arial';
      ctx.fillText(value.toFixed(1), x, y + 15);
    }
  }
    
  // Draw a flow
  function drawFlow(flow) {
    const { x, y, label, rate, id, source, target } = flow;
    const size = 30;
    
    // Check states
    const isHovered = hoverElement && hoverElement.id === id;
    const isSelected = selectedElement && selectedElement.id === id;
    
    // Set styles
    let fillColor = '#2ecc71';
    let strokeColor = '#27ae60';
    let textColor = 'white';
    
    if (isHovered) {
      fillColor = '#27ae60';
    }
    
    if (isSelected) {
      strokeColor = '#e67e22';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#e67e22';
    }
    
    // Draw diamond
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x + size / 2, y);
    ctx.lineTo(x, y + size / 2);
    ctx.lineTo(x - size / 2, y);
    ctx.closePath();
    
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = isSelected || isHovered ? 3 : 2;
    ctx.fill();
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw label
    ctx.font = '11px Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);
    
    // Draw rate
    if (rate !== undefined) {
      ctx.font = '10px Arial';
      ctx.fillText(rate.toFixed(1) + '/t', x, y + size / 2 + 15);
    }
    
    // Draw flow pipes
    if (source && target) {
      drawFlowPipe(source, target, flow);
    }
  }
  
  // Draw a flow pipe
  function drawFlowPipe(source, target, flow) {
    const sourceObj = diagramData.stocks.find(s => s.id === source);
    const targetObj = diagramData.stocks.find(s => s.id === target);
    
    if (!sourceObj || !targetObj) return;
    
    const { x: flowX, y: flowY } = flow;
    const { x: sourceX, y: sourceY } = sourceObj;
    const { x: targetX, y: targetY } = targetObj;
    
    // Draw pipe from source to flow
    ctx.beginPath();
    ctx.moveTo(sourceX, sourceY);
    ctx.lineTo(flowX, flowY);
    ctx.strokeStyle = '#95a5a6';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw pipe from flow to target
    ctx.beginPath();
    ctx.moveTo(flowX, flowY);
    ctx.lineTo(targetX, targetY);
    ctx.strokeStyle = '#95a5a6';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw arrow toward target
    drawArrowhead(
      flowX, 
      flowY, 
      targetX, 
      targetY,
      '#95a5a6'
    );
  }
  
  // Draw an auxiliary variable
  function drawAuxiliary(aux) {
    const { x, y, label, value, id } = aux;
    const radius = 20;
    
    // Check states
    const isHovered = hoverElement && hoverElement.id === id;
    const isSelected = selectedElement && selectedElement.id === id;
    
    // Set styles
    let fillColor = '#f1c40f';
    let strokeColor = '#f39c12';
    let textColor = '#2c3e50';
    
    if (isHovered) {
      fillColor = '#f39c12';
      textColor = 'white';
    }
    
    if (isSelected) {
      strokeColor = '#e67e22';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#e67e22';
    }
    
    // Draw circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = isSelected || isHovered ? 3 : 2;
    ctx.fill();
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw label
    ctx.font = '11px Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);
    
    // Draw value
    if (value !== undefined) {
      ctx.font = '10px Arial';
      ctx.fillText(value.toFixed(1), x, y + radius + 12);
    }
  }
  
  // Draw a connector
  function drawConnector(connector) {
    const { source, target, polarity } = connector;
    
    // Find source and target objects
    const sourceObj = 
      diagramData.stocks.find(s => s.id === source) ||
      diagramData.flows.find(f => f.id === source) ||
      diagramData.auxiliaries.find(a => a.id === source);
    
    const targetObj = 
      diagramData.stocks.find(s => s.id === target) ||
      diagramData.flows.find(f => f.id === target) ||
      diagramData.auxiliaries.find(a => a.id === target);
    
    if (!sourceObj || !targetObj) return;
    
    const { x: sourceX, y: sourceY } = sourceObj;
    const { x: targetX, y: targetY } = targetObj;
    
    // Calculate control point for curved line
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const controlX = sourceX + dx / 2 - dy / 4;
    const controlY = sourceY + dy / 2 + dx / 4;
    
    // Draw curved line
    ctx.beginPath();
    ctx.moveTo(sourceX, sourceY);
    ctx.quadraticCurveTo(controlX, controlY, targetX, targetY);
    
    // Set line style based on polarity
    if (polarity === 'positive') {
      ctx.strokeStyle = '#2ecc71';
      ctx.setLineDash([]);
    } else {
      ctx.strokeStyle = '#e74c3c';
      ctx.setLineDash([3, 2]);
    }
    
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw arrowhead
    drawArrowhead(
      controlX, 
      controlY, 
      targetX, 
      targetY,
      polarity === 'positive' ? '#2ecc71' : '#e74c3c'
    );
    
    // Draw polarity sign
    const signX = controlX;
    const signY = controlY;
    
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = polarity === 'positive' ? '#2ecc71' : '#e74c3c';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(polarity === 'positive' ? '+' : '−', signX, signY);
  }
  
  // Draw leverage points diagram
  function drawLeveragePoints() {
    if (!diagramData) return;
    
    // Draw system boundaries
    if (diagramData.boundaries) {
      diagramData.boundaries.forEach(boundary => {
        drawSystemBoundary(boundary);
      });
    }
    
    // Draw connections
    if (diagramData.connections) {
      diagramData.connections.forEach(connection => {
        drawLeverageConnection(connection);
      });
    }
    
    // Draw leverage points
    if (diagramData.leveragePoints) {
      diagramData.leveragePoints.forEach(point => {
        drawLeveragePoint(point);
      });
    }
    
    // Draw other elements
    if (diagramData.elements) {
      diagramData.elements.forEach(element => {
        drawSystemElement(element);
      });
    }
  }
  
  // Draw a system boundary
  function drawSystemBoundary(boundary) {
    const { points, label, id, color } = boundary;
    
    if (!points || points.length < 3) return;
    
    // Check states
    const isHovered = hoverElement && hoverElement.id === id;
    const isSelected = selectedElement && selectedElement.id === id;
    
    // Set styles
    let fillColor = color || '#ecf0f1';
    let strokeColor = '#7f8c8d';
    let alpha = 0.2;
    
    if (isHovered) {
      alpha = 0.3;
      strokeColor = '#34495e';
    }
    
    if (isSelected) {
      strokeColor = '#e67e22';
      alpha = 0.4;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(230, 126, 34, 0.5)';
    }
    
    // Draw boundary area
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.closePath();
    ctx.fillStyle = `rgba(${hexToRgb(fillColor)}, ${alpha})`;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = isSelected || isHovered ? 2 : 1;
    ctx.setLineDash([5, 3]);
    ctx.fill();
    ctx.stroke();
    
    // Reset shadow and line dash
    ctx.shadowBlur = 0;
    ctx.setLineDash([]);
    
    // Draw label
    if (label) {
      const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
      const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;
      
      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = '#34495e';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, centerX, centerY);
    }
  }
  
  // Draw a leverage point
  function drawLeveragePoint(point) {
    const { x, y, label, level, impact, id } = point;
    const size = 25 + (impact / 10) * 15;
    
    // Check states
    const isHovered = hoverElement && hoverElement.id === id;
    const isSelected = selectedElement && selectedElement.id === id;
    
    // Set styles based on leverage level (1-12, with 1 being highest)
    let fillColor = '#9b59b6';
    let strokeColor = '#8e44ad';
    let textColor = 'white';
    
    // Adjust color based on leverage level
    if (level <= 3) {
      // Paradigm/goals levels - highest leverage
      fillColor = '#e74c3c';
      strokeColor = '#c0392b';
    } else if (level <= 6) {
      // Rules/information levels - medium high leverage
      fillColor = '#e67e22';
      strokeColor = '#d35400';
    } else if (level <= 9) {
      // Feedback/delay levels - medium low leverage
      fillColor = '#f1c40f';
      strokeColor = '#f39c12';
      textColor = '#2c3e50';
    }
    // else: buffer/parameter levels - lowest leverage (default purple)
    
    if (isHovered) {
      fillColor = lightenColor(fillColor, 10);
    }
    
    if (isSelected) {
      strokeColor = '#2980b9';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#2980b9';
    }
    
    // Draw hexagon for leverage points
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const pointX = x + Math.sin(angle) * (size / 2);
      const pointY = y - Math.cos(angle) * (size / 2);
      
      if (i === 0) {
        ctx.moveTo(pointX, pointY);
      } else {
        ctx.lineTo(pointX, pointY);
      }
    }
    ctx.closePath();
    
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = isSelected || isHovered ? 3 : 2;
    ctx.fill();
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw label
    ctx.font = '11px Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Handle multiline labels
    if (label && label.includes('\n')) {
      const lines = label.split('\n');
      lines.forEach((line, i) => {
        const lineY = y + (i - (lines.length - 1) / 2) * 14;
        ctx.fillText(line, x, lineY);
      });
    } else {
      ctx.fillText(label, x, y);
    }
    
    // Draw level indicator
    ctx.font = 'bold 10px Arial';
    ctx.fillText(`L${level}`, x, y + size / 2 + 12);
  }
  
  // Draw a connection between leverage points
  function drawLeverageConnection(connection) {
    const { source, target, influence, id } = connection;
    
    // Find source and target objects
    const sourceObj = diagramData.leveragePoints.find(p => p.id === source) ||
                     diagramData.elements.find(e => e.id === source);
    
    const targetObj = diagramData.leveragePoints.find(p => p.id === target) ||
                     diagramData.elements.find(e => e.id === target);
    if (!sourceObj || !targetObj) return;
    
    const { x: sourceX, y: sourceY } = sourceObj;
    const { x: targetX, y: targetY } = targetObj;
    
    // Calculate control point for curved line
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const controlX = sourceX + dx / 2 - dy / 6;
    const controlY = sourceY + dy / 2 + dx / 6;
    
    // Check states
    const isHovered = hoverElement && hoverElement.id === id;
    const isSelected = selectedElement && selectedElement.id === id;
    
    // Set styles based on influence strength
    let strokeColor = '#95a5a6';
    let lineWidth = 1 + (influence / 10) * 2;
    
    if (influence > 7) {
      strokeColor = '#2c3e50';
    } else if (influence > 4) {
      strokeColor = '#7f8c8d';
    }
    
    if (isHovered) {
      strokeColor = '#2980b9';
      lineWidth += 1;
    }
    
    if (isSelected) {
      strokeColor = '#e67e22';
      lineWidth += 1;
      ctx.shadowBlur = 5;
      ctx.shadowColor = '#e67e22';
    }
    
    // Draw curved line
    ctx.beginPath();
    ctx.moveTo(sourceX, sourceY);
    ctx.quadraticCurveTo(controlX, controlY, targetX, targetY);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw arrowhead
    drawArrowhead(
      controlX, 
      controlY, 
      targetX, 
      targetY,
      strokeColor
    );
    
    // Draw influence strength
    if (influence) {
      ctx.font = 'bold 11px Arial';
      ctx.fillStyle = strokeColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(influence.toString(), controlX, controlY - 10);
    }
  }
  
  // Draw a system element
  function drawSystemElement(element) {
    const { x, y, label, type, id } = element;
    const size = 20;
    
    // Check states
    const isHovered = hoverElement && hoverElement.id === id;
    const isSelected = selectedElement && selectedElement.id === id;
    
    // Set styles based on element type
    let fillColor = '#bdc3c7';
    let strokeColor = '#7f8c8d';
    let textColor = '#2c3e50';
    
    if (type === 'process') {
      fillColor = '#3498db';
      strokeColor = '#2980b9';
      textColor = 'white';
    } else if (type === 'resource') {
      fillColor = '#2ecc71';
      strokeColor = '#27ae60';
      textColor = 'white';
    } else if (type === 'actor') {
      fillColor = '#f1c40f';
      strokeColor = '#f39c12';
      textColor = '#2c3e50';
    }
    
    if (isHovered) {
      fillColor = lightenColor(fillColor, 10);
    }
    
    if (isSelected) {
      strokeColor = '#e67e22';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#e67e22';
    }
    
    // Draw shape based on type
    ctx.beginPath();
    
    if (type === 'process') {
      // Rounded rectangle for process
      const rectWidth = 70;
      const rectHeight = 40;
      const radius = 8;
      
      ctx.moveTo(x - rectWidth/2 + radius, y - rectHeight/2);
      ctx.lineTo(x + rectWidth/2 - radius, y - rectHeight/2);
      ctx.quadraticCurveTo(x + rectWidth/2, y - rectHeight/2, x + rectWidth/2, y - rectHeight/2 + radius);
      ctx.lineTo(x + rectWidth/2, y + rectHeight/2 - radius);
      ctx.quadraticCurveTo(x + rectWidth/2, y + rectHeight/2, x + rectWidth/2 - radius, y + rectHeight/2);
      ctx.lineTo(x - rectWidth/2 + radius, y + rectHeight/2);
      ctx.quadraticCurveTo(x - rectWidth/2, y + rectHeight/2, x - rectWidth/2, y + rectHeight/2 - radius);
      ctx.lineTo(x - rectWidth/2, y - rectHeight/2 + radius);
      ctx.quadraticCurveTo(x - rectWidth/2, y - rectHeight/2, x - rectWidth/2 + radius, y - rectHeight/2);
    } else if (type === 'resource') {
      // Circle for resource
      ctx.arc(x, y, size, 0, Math.PI * 2);
    } else if (type === 'actor') {
      // Triangle for actor
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size, y + size);
      ctx.lineTo(x - size, y + size);
      ctx.closePath();
    } else {
      // Default square
      ctx.rect(x - size, y - size, size * 2, size * 2);
    }
    
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = isSelected || isHovered ? 3 : 2;
    ctx.fill();
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw label
    ctx.font = '11px Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    if (type === 'process') {
      ctx.fillText(label, x, y);
    } else {
      // Position label below other shapes
      ctx.fillText(label, x, y + size + 12);
    }
  }
  
  // Draw resilience factors diagram
  function drawResilienceFactors() {
    if (!diagramData) return;
    
    // Draw the background layers first
    if (diagramData.layers) {
      diagramData.layers.forEach(layer => {
        drawResilienceLayer(layer);
      });
    }
    
    // Draw connections
    if (diagramData.connections) {
      diagramData.connections.forEach(connection => {
        drawResilienceConnection(connection);
      });
    }
    
    // Draw resilience factors
    if (diagramData.factors) {
      diagramData.factors.forEach(factor => {
        drawResilienceFactor(factor);
      });
    }
  }
  
  // Draw a resilience layer (concentric circle)
  function drawResilienceLayer(layer) {
    const { x, y, radius, label, color, id } = layer;
    
    // Check states
    const isHovered = hoverElement && hoverElement.id === id;
    const isSelected = selectedElement && selectedElement.id === id;
    
    // Set styles
    let fillColor = color || '#ecf0f1';
    let strokeColor = '#bdc3c7';
    let alpha = 0.15;
    
    if (isHovered) {
      alpha = 0.25;
      strokeColor = '#7f8c8d';
    }
    
    if (isSelected) {
      strokeColor = '#e67e22';
      alpha = 0.3;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(230, 126, 34, 0.3)';
    }
    
    // Draw circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${hexToRgb(fillColor)}, ${alpha})`;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = isSelected || isHovered ? 2 : 1;
    ctx.setLineDash([5, 3]);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw label
    if (label) {
      // Position at top of circle
      const labelX = x;
      const labelY = y - radius - 10;
      
      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = '#34495e';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, labelX, labelY);
    }
  }
  
  // Draw a resilience factor
  function drawResilienceFactor(factor) {
    const { x, y, label, strength, category, id } = factor;
    const size = 25 + (strength / 10) * 15;
    
    // Check states
    const isHovered = hoverElement && hoverElement.id === id;
    const isSelected = selectedElement && selectedElement.id === id;
    
    // Set styles based on category
    let fillColor = '#1abc9c'; // Default teal
    let strokeColor = '#16a085';
    let textColor = 'white';
    
    if (category === 'social') {
      fillColor = '#3498db';
      strokeColor = '#2980b9';
    } else if (category === 'institutional') {
      fillColor = '#9b59b6';
      strokeColor = '#8e44ad';
    } else if (category === 'economic') {
      fillColor = '#f1c40f';
      strokeColor = '#f39c12';
      textColor = '#2c3e50';
    } else if (category === 'ecological') {
      fillColor = '#2ecc71';
      strokeColor = '#27ae60';
    }
    
    if (isHovered) {
      fillColor = lightenColor(fillColor, 10);
    }
    
    if (isSelected) {
      strokeColor = '#e67e22';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#e67e22';
    }
    
    // Draw octagon for resilience factors
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI / 4) * i;
      const pointX = x + Math.sin(angle) * (size / 2);
      const pointY = y - Math.cos(angle) * (size / 2);
      
      if (i === 0) {
        ctx.moveTo(pointX, pointY);
      } else {
        ctx.lineTo(pointX, pointY);
      }
    }
    ctx.closePath();
    
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = isSelected || isHovered ? 3 : 2;
    ctx.fill();
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw label
    ctx.font = '11px Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Handle multiline labels
    if (label && label.includes('\n')) {
      const lines = label.split('\n');
      lines.forEach((line, i) => {
        const lineY = y + (i - (lines.length - 1) / 2) * 14;
        ctx.fillText(line, x, lineY);
      });
    } else {
      ctx.fillText(label, x, y);
    }
    
    // Draw strength indicator
    ctx.font = 'bold 10px Arial';
    ctx.fillText(`S${strength}`, x, y + size / 2 + 12);
  }
  
  // Draw a resilience connection
  function drawResilienceConnection(connection) {
    const { source, target, strength, type, id } = connection;
    
    // Find source and target objects
    const sourceObj = diagramData.factors.find(f => f.id === source);
    const targetObj = diagramData.factors.find(f => f.id === target);
    
    if (!sourceObj || !targetObj) return;
    
    const { x: sourceX, y: sourceY } = sourceObj;
    const { x: targetX, y: targetY } = targetObj;
    
    // Calculate control point for curved line
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const controlX = sourceX + dx / 2 - dy / 6;
    const controlY = sourceY + dy / 2 + dx / 6;
    
    // Check states
    const isHovered = hoverElement && hoverElement.id === id;
    const isSelected = selectedElement && selectedElement.id === id;
    
    // Set styles based on connection type and strength
    let strokeColor = '#95a5a6';
    let lineWidth = 1 + (strength / 10) * 2;
    
    if (type === 'synergy') {
      strokeColor = '#2ecc71';
    } else if (type === 'dependency') {
      strokeColor = '#3498db';
    } else if (type === 'trade-off') {
      strokeColor = '#e74c3c';
    }
    
    if (isHovered) {
      strokeColor = lightenColor(strokeColor, 10);
      lineWidth += 1;
    }
    
    if (isSelected) {
      ctx.shadowBlur = 5;
      ctx.shadowColor = strokeColor;
      lineWidth += 1;
    }
    
    // Draw line style based on type
    ctx.beginPath();
    ctx.moveTo(sourceX, sourceY);
    ctx.quadraticCurveTo(controlX, controlY, targetX, targetY);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    
    if (type === 'trade-off') {
      ctx.setLineDash([5, 3]);
    } else {
      ctx.setLineDash([]);
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw arrowhead
    drawArrowhead(
      controlX, 
      controlY, 
      targetX, 
      targetY,
      strokeColor
    );
    
    // Draw strength indicator
    if (strength) {
      ctx.font = 'bold 11px Arial';
      ctx.fillStyle = strokeColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(strength.toString(), controlX, controlY - 10);
    }
  }
  
  // Helper function to draw arrowhead
  function drawArrowhead(fromX, fromY, toX, toY, color) {
    const headLength = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - headLength * Math.cos(angle - Math.PI / 6),
      toY - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      toX - headLength * Math.cos(angle + Math.PI / 6),
      toY - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    
    ctx.fillStyle = color;
    ctx.fill();
  }

  // Force a complete redraw from scratch
  function forceCompleteRedraw() {
    if (!canvas || !ctx || !diagramData) return;
    
    console.log("FORCE REDRAW: Performing complete canvas redraw");
    
    // Clear the entire canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw grid
    drawGrid();
    
    // Save context for transformations
    ctx.save();
    
    // Apply transformations
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);
    
    // Draw elements based on diagram type
    switch(type) {
      case 'feedback-loops':
        forceDrawFeedbackLoops();
        break;
      case 'stock-flow':
        forceDrawStockFlow();
        break;
      case 'leverage-points':
        forceDrawLeveragePoints();
        break;
      case 'resilience-factors':
        forceDrawResilienceFactors();
        break;
    }
    
    // Restore context
    ctx.restore();
    
    console.log("FORCE REDRAW: Complete redraw finished");
  }

  // Alternative drawing function for feedback loops
  function forceDrawFeedbackLoops() {
    if (!diagramData || !diagramData.variables || !diagramData.loops) {
      console.log("FORCE REDRAW: Missing feedback loop data");
      return;
    }
    
    console.log("FORCE REDRAW: Drawing feedback loops with values:", 
      diagramData.variables.map(v => `${v.id}: ${v.value.toFixed(1)}`).join(', '));
    
    // Draw connections first
    diagramData.loops.forEach(loop => {
      forceDrawLoop(loop);
    });
    
    // Draw variables with enhanced visual representation
    diagramData.variables.forEach(variable => {
      forceDrawVariable(variable);
    });
  }

  // Enhanced variable drawing
  function forceDrawVariable(variable) {
    const { x, y, label, value, id, highlight, type } = variable;
    
    // Make radius dramatically dependent on value for clear visual feedback
    const baseRadius = 25;
    const valueRadius = (value / 10) * 25; // 0-25px additional radius based on value
    const radius = baseRadius + valueRadius;
    
    console.log(`FORCE REDRAW: Drawing variable ${id} with value ${value.toFixed(1)} and radius ${radius.toFixed(1)}`);
    
    // Check states
    const isHovered = hoverElement && hoverElement.id === id;
    const isSelected = selectedElement && selectedElement.id === id;
    
    // Set styles
    let fillColor = '#f8f9fa';
    let strokeColor = '#2c3e50';
    let strokeWidth = 2;
    let textColor = '#2c3e50';
    
    if (isHovered) {
      fillColor = '#ecf0f1';
      strokeWidth = 3;
    }
    
    if (isSelected) {
      strokeColor = '#e67e22';
      strokeWidth = 3;
    }
    
    // Add glow effect based on value to make changes more obvious
    ctx.shadowBlur = value * 1.5;
    ctx.shadowColor = `rgba(52, 152, 219, ${value / 15})`;
    
    // Draw node
    ctx.beginPath();
    ctx.arc(x, y, radius / 2, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.fill();
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw label
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Handle multiline labels
    if (label && label.includes('\n')) {
      const lines = label.split('\n');
      lines.forEach((line, i) => {
        const lineY = y + (i - (lines.length - 1) / 2) * 15;
        ctx.fillText(line, x, lineY);
      });
    } else {
      ctx.fillText(label, x, y);
    }
    
    // Draw value indicator with high visibility
    if (value !== undefined) {
      // Draw background circle for value
      ctx.beginPath();
      ctx.arc(x, y + radius / 2 + 15, 15, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(44, 62, 80, 0.7)';
      ctx.fill();
      
      // Draw value text
      ctx.font = 'bold 12px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(value.toFixed(1), x, y + radius / 2 + 15);
    }
  }

  // Force drawing of loop connections
  function forceDrawLoop(loop) {
    const { path, type, strength, label } = loop;
    
    if (!path || path.length < 2) return;
    
    // Set line style based on loop type
    if (type === 'reinforcing') {
      ctx.strokeStyle = '#e74c3c'; // Red for reinforcing loops
      ctx.setLineDash([]);
    } else {
      ctx.strokeStyle = '#3498db'; // Blue for balancing loops
      ctx.setLineDash([5, 3]);
    }
    
    // Line width based on strength
    ctx.lineWidth = 1 + (strength / 10) * 3;
    
    // Draw the path
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    
    for (let i = 1; i < path.length; i++) {
      if (path[i].control) {
        ctx.quadraticCurveTo(
          path[i].control.x, 
          path[i].control.y, 
          path[i].x, 
          path[i].y
        );
      } else {
        ctx.lineTo(path[i].x, path[i].y);
      }
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw arrowhead
    const last = path.length - 1;
    const secondLast = path.length - 2;
    drawArrowhead(
      path[secondLast].x, 
      path[secondLast].y, 
      path[last].x, 
      path[last].y,
      type === 'reinforcing' ? '#e74c3c' : '#3498db'
    );
    
    // Draw loop label
    if (label) {
      const midIndex = Math.floor(path.length / 2);
      const x = path[midIndex].x;
      const y = path[midIndex].y;
      
      ctx.font = '12px Arial';
      ctx.fillStyle = type === 'reinforcing' ? '#e74c3c' : '#3498db';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y - 15);
      
      // Draw loop type indicator (R or B)
      ctx.font = 'bold 14px Arial';
      ctx.fillText(type === 'reinforcing' ? 'R' : 'B', x, y - 30);
    }
  }

  // Force drawing of stock-flow model
  function forceDrawStockFlow() {
    if (!diagramData) return;
    
    console.log("FORCE REDRAW: Drawing stock-flow with values:", 
      diagramData.stocks.map(s => `${s.id}: ${s.value.toFixed(1)}`).join(', '));
    
    // Draw flows first
    if (diagramData.flows) {
      diagramData.flows.forEach(flow => {
        forceDrawFlow(flow);
      });
    }
    
    // Draw stocks
    if (diagramData.stocks) {
      diagramData.stocks.forEach(stock => {
        forceDrawStock(stock);
      });
    }
    
    // Draw auxiliaries
    if (diagramData.auxiliaries) {
      diagramData.auxiliaries.forEach(aux => {
        forceDrawAuxiliary(aux);
      });
    }
    
    // Draw connectors
    if (diagramData.connectors) {
      diagramData.connectors.forEach(connector => {
        forceDrawConnector(connector);
      });
    }
  }

  // Enhanced stock drawing
  function forceDrawStock(stock) {
    const { x, y, label, value, id } = stock;
    
    // Make size dramatically dependent on value
    const baseWidth = 70;
    const baseHeight = 45;
    const valueWidth = (value / 10) * 40; // 0-40px additional width
    const valueHeight = (value / 10) * 25; // 0-25px additional height
    const width = baseWidth + valueWidth;
    const height = baseHeight + valueHeight;
    
    console.log(`FORCE REDRAW: Drawing stock ${id} with value ${value.toFixed(1)} and size ${width.toFixed(1)}x${height.toFixed(1)}`);
    
    // Check states
    const isHovered = hoverElement && hoverElement.id === id;
    const isSelected = selectedElement && selectedElement.id === id;
    
    // Set styles
    let fillColor = '#3498db';
    let strokeColor = '#2c3e50';
    let strokeWidth = 2;
    let textColor = 'white';
    
    if (isHovered) {
      fillColor = '#2980b9';
      strokeWidth = 3;
    }
    
    if (isSelected) {
      strokeColor = '#e67e22';
      strokeWidth = 3;
    }
    
    // Add glow effect based on value
    ctx.shadowBlur = value * 1.5;
    ctx.shadowColor = `rgba(52, 152, 219, ${value / 15})`;
    
    // Draw rectangle
    ctx.beginPath();
    ctx.rect(x - width / 2, y - height / 2, width, height);
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.fill();
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw label
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y - 10);
    
    // Draw value with high visibility
    if (value !== undefined) {
      ctx.font = 'bold 16px Arial';
      ctx.fillText(value.toFixed(1), x, y + 15);
    }
  }

  // Enhanced flow drawing
  function forceDrawFlow(flow) {
    const { x, y, label, rate, id, source, target } = flow;
    const size = 30;
    
    console.log(`FORCE REDRAW: Drawing flow ${id} with rate ${rate.toFixed(1)}`);
    
    // Check states
    const isHovered = hoverElement && hoverElement.id === id;
    const isSelected = selectedElement && selectedElement.id === id;
    
    // Set styles
    let fillColor = '#2ecc71';
    let strokeColor = '#27ae60';
    let strokeWidth = 2;
    let textColor = 'white';
    
    if (isHovered) {
      fillColor = '#27ae60';
      strokeWidth = 3;
    }
    
    if (isSelected) {
      strokeColor = '#e67e22';
      strokeWidth = 3;
    }
    
    // Add glow effect based on rate
    ctx.shadowBlur = rate * 1.5;
    ctx.shadowColor = `rgba(46, 204, 113, ${rate / 15})`;
    
    // Draw diamond
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x + size / 2, y);
    ctx.lineTo(x, y + size / 2);
    ctx.lineTo(x - size / 2, y);
    ctx.closePath();
    
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.fill();
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw label
    ctx.font = '12px Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);
    
    // Draw rate with high visibility
    if (rate !== undefined) {
      // Draw background for rate
      ctx.beginPath();
      ctx.rect(x - 20, y + size / 2 + 5, 40, 20);
      ctx.fillStyle = 'rgba(44, 62, 80, 0.7)';
      ctx.fill();
      
      // Draw rate text
      ctx.font = 'bold 11px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(rate.toFixed(1) + '/t', x, y + size / 2 + 15);
    }
    
    // Draw flow pipes
    if (source && target) {
      forceDrawFlowPipe(source, target, flow);
    }
  }

  // Force drawing for flow pipes
  function forceDrawFlowPipe(source, target, flow) {
    const sourceObj = diagramData.stocks.find(s => s.id === source);
    const targetObj = diagramData.stocks.find(s => s.id === target);
    
    if (!sourceObj || !targetObj) return;
    
    const { x: flowX, y: flowY } = flow;
    const { x: sourceX, y: sourceY } = sourceObj;
    const { x: targetX, y: targetY } = targetObj;
    
    // Draw pipe from source to flow
    ctx.beginPath();
    ctx.moveTo(sourceX, sourceY);
    ctx.lineTo(flowX, flowY);
    ctx.strokeStyle = '#95a5a6';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw pipe from flow to target
    ctx.beginPath();
    ctx.moveTo(flowX, flowY);
    ctx.lineTo(targetX, targetY);
    ctx.strokeStyle = '#95a5a6';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw arrow toward target
    drawArrowhead(
      flowX, 
      flowY, 
      targetX, 
      targetY,
      '#95a5a6'
    );
  }

  // Enhanced auxiliary drawing
  function forceDrawAuxiliary(aux) {
    const { x, y, label, value, id } = aux;
    const radius = 20;
    
    console.log(`FORCE REDRAW: Drawing auxiliary ${id} with value ${value.toFixed(1)}`);
    
    // Check states
    const isHovered = hoverElement && hoverElement.id === id;
    const isSelected = selectedElement && selectedElement.id === id;
    
    // Set styles
    let fillColor = '#f1c40f';
    let strokeColor = '#f39c12';
    let strokeWidth = 2;
    let textColor = '#2c3e50';
    
    if (isHovered) {
      fillColor = '#f39c12';
      textColor = 'white';
      strokeWidth = 3;
    }
    
    if (isSelected) {
      strokeColor = '#e67e22';
      strokeWidth = 3;
    }
    
    // Add glow effect based on value
    ctx.shadowBlur = value * 1.5;
    ctx.shadowColor = `rgba(241, 196, 15, ${value / 15})`;
    
    // Draw circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.fill();
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw label
    ctx.font = '11px Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);
    
    // Draw value with high visibility
    if (value !== undefined) {
      // Draw background circle for value
      ctx.beginPath();
      ctx.arc(x, y + radius + 12, 12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(44, 62, 80, 0.7)';
      ctx.fill();
      
      // Draw value text
      ctx.font = 'bold 10px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(value.toFixed(1), x, y + radius + 12);
    }
  }

  // Enhanced connector drawing
  function forceDrawConnector(connector) {
    const { source, target, polarity } = connector;
    
    // Find source and target objects
    const sourceObj = 
      diagramData.stocks.find(s => s.id === source) ||
      diagramData.flows.find(f => f.id === source) ||
      diagramData.auxiliaries.find(a => a.id === source);
    
    const targetObj = 
      diagramData.stocks.find(s => s.id === target) ||
      diagramData.flows.find(f => f.id === target) ||
      diagramData.auxiliaries.find(a => a.id === target);
    
    if (!sourceObj || !targetObj) return;
    
    const { x: sourceX, y: sourceY } = sourceObj;
    const { x: targetX, y: targetY } = targetObj;
    
    // Calculate control point for curved line
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const controlX = sourceX + dx / 2 - dy / 4;
    const controlY = sourceY + dy / 2 + dx / 4;
    
    // Draw curved line
    ctx.beginPath();
    ctx.moveTo(sourceX, sourceY);
    ctx.quadraticCurveTo(controlX, controlY, targetX, targetY);
    
    // Set line style based on polarity
    if (polarity === 'positive') {
      ctx.strokeStyle = '#2ecc71';
      ctx.setLineDash([]);
    } else {
      ctx.strokeStyle = '#e74c3c';
      ctx.setLineDash([3, 2]);
    }
    
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw arrowhead
    drawArrowhead(
      controlX, 
      controlY, 
      targetX, 
      targetY,
      polarity === 'positive' ? '#2ecc71' : '#e74c3c'
    );
    
    // Draw polarity sign
    const signX = controlX;
    const signY = controlY;
    
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = polarity === 'positive' ? '#2ecc71' : '#e74c3c';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(polarity === 'positive' ? '+' : '−', signX, signY);
  }
  
  // Helper function to convert hex color to rgb for opacity
  function hexToRgb(hex) {
    // Remove # if present
    hex = hex.replace(/^#/, '');
    
    // Parse the hex value
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  }
  
  // Helper function to lighten a color
  function lightenColor(color, percent) {
    // Remove # if present
    color = color.replace(/^#/, '');
    
    // Parse the hex value
    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);
    
    // Lighten each channel
    r = Math.min(255, Math.floor(r * (100 + percent) / 100));
    g = Math.min(255, Math.floor(g * (100 + percent) / 100));
    b = Math.min(255, Math.floor(b * (100 + percent) / 100));
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  // Mouse event handlers
  function handleMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) / scale - offsetX / scale;
    const mouseY = (event.clientY - rect.top) / scale - offsetY / scale;
    
    // Find element under cursor
    const element = findElementUnderCursor(mouseX, mouseY);
    
    if (element) {
      canvas.style.cursor = 'pointer';
      hoverElement = element;
    } else {
      canvas.style.cursor = dragStart ? 'grabbing' : 'grab';
      hoverElement = null;
    }
    
    // Handle panning
    if (dragStart) {
      offsetX += event.clientX - dragStart.x;
      offsetY += event.clientY - dragStart.y;
      dragStart = { x: event.clientX, y: event.clientY };
    }
    
    redraw();
  }
  
  function handleMouseDown(event) {
    if (event.button === 0) { // Left click
      const rect = canvas.getBoundingClientRect();
      const mouseX = (event.clientX - rect.left) / scale - offsetX / scale;
      const mouseY = (event.clientY - rect.top) / scale - offsetY / scale;
      
      const element = findElementUnderCursor(mouseX, mouseY);
      
      if (element) {
        selectedElement = element;
        dispatch('elementSelect', { element });
      } else {
        // Start panning
        dragStart = { x: event.clientX, y: event.clientY };
        canvas.style.cursor = 'grabbing';
      }
    }
  }
  
  function handleMouseUp(event) {
    dragStart = null;
    canvas.style.cursor = 'grab';
  }
  
  function handleWheel(event) {
    event.preventDefault();
    
    const delta = -Math.sign(event.deltaY) * 0.1;
    const newScale = Math.max(0.1, Math.min(3, scale + delta));
    
    // Zoom centered on mouse position
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const oldScale = scale;
    scale = newScale;
    
    // Adjust offset to zoom towards mouse position
    offsetX = mouseX - (mouseX - offsetX) * (newScale / oldScale);
    offsetY = mouseY - (mouseY - offsetY) * (newScale / oldScale);
    
    redraw();
  }
  
  // Find element under cursor
  function findElementUnderCursor(x, y) {
    if (!diagramData) return null;
    
    // Define a helper function to check if a point is inside a shape
    function isPointInCircle(px, py, cx, cy, radius) {
      const dx = px - cx;
      const dy = py - cy;
      return dx * dx + dy * dy <= radius * radius;
    }
    
    function isPointInRect(px, py, rx, ry, width, height) {
      return px >= rx - width / 2 && px <= rx + width / 2 &&
             py >= ry - height / 2 && py <= ry + height / 2;
    }
    
    // Check different element types based on diagram type
    switch(type) {
      case 'feedback-loops':
        if (diagramData.variables) {
          for (const variable of diagramData.variables) {
            const radius = 25 + (variable.value / 10) * 10;
            if (isPointInCircle(x, y, variable.x, variable.y, radius / 2)) {
              return variable;
            }
          }
        }
        break;
        
      case 'stock-flow':
        // Check stocks
        if (diagramData.stocks) {
          for (const stock of diagramData.stocks) {
            if (isPointInRect(x, y, stock.x, stock.y, 80, 50)) {
              return stock;
            }
          }
        }
        
        // Check flows
        if (diagramData.flows) {
          for (const flow of diagramData.flows) {
            if (isPointInCircle(x, y, flow.x, flow.y, 20)) {
              return flow;
            }
          }
        }
        
        // Check auxiliaries
        if (diagramData.auxiliaries) {
          for (const aux of diagramData.auxiliaries) {
            if (isPointInCircle(x, y, aux.x, aux.y, 20)) {
              return aux;
            }
          }
        }
        break;
        
      case 'leverage-points':
        // Check leverage points
        if (diagramData.leveragePoints) {
          for (const point of diagramData.leveragePoints) {
            const size = 25 + (point.impact / 10) * 15;
            if (isPointInCircle(x, y, point.x, point.y, size / 2)) {
              return point;
            }
          }
        }
        
        // Check system elements
        if (diagramData.elements) {
          for (const element of diagramData.elements) {
            if (isPointInCircle(x, y, element.x, element.y, 25)) {
              return element;
            }
          }
        }
        break;
        
      case 'resilience-factors':
        // Check resilience factors
        if (diagramData.factors) {
          for (const factor of diagramData.factors) {
            const size = 25 + (factor.strength / 10) * 15;
            if (isPointInCircle(x, y, factor.x, factor.y, size / 2)) {
              return factor;
            }
          }
        }
        break;
    }
    
    return null;
  }
  
  onMount(() => {
    canvas = document.createElement('canvas');
    container.appendChild(canvas);
    ctx = canvas.getContext('2d');
    
    initCanvas();
    
    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);
    
    // Handle window resize
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      canvasWidth = rect.width;
      canvasHeight = rect.height;
      
      // Update canvas size
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      
      // Scale the context for retina displays
      ctx.scale(dpr, dpr);
      
      redraw();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      // Clean up
      if (simulationInterval) {
        clearInterval(simulationInterval);
      }
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
    };
  });

  function forceDrawLeveragePoints() {
    if (!diagramData) return;
    
    console.log("FORCE REDRAW: Drawing leverage points diagram");
    
    // Draw system boundaries
    if (diagramData.boundaries) {
      diagramData.boundaries.forEach(boundary => {
        forceDrawSystemBoundary(boundary);
      });
    }
    
    // Draw connections
    if (diagramData.connections) {
      diagramData.connections.forEach(connection => {
        forceDrawLeverageConnection(connection);
      });
    }
    
    // Draw leverage points
    if (diagramData.leveragePoints) {
      console.log("FORCE REDRAW: Drawing leverage points with impacts:", 
        diagramData.leveragePoints.map(p => `${p.id}: ${p.impact.toFixed(1)}`).join(', '));
      
      diagramData.leveragePoints.forEach(point => {
        forceDrawLeveragePoint(point);
      });
    }
    
    // Draw other elements
    if (diagramData.elements) {
      diagramData.elements.forEach(element => {
        forceDrawSystemElement(element);
      });
    }
  }

  function forceDrawResilienceFactors() {
    if (!diagramData) return;
    
    console.log("FORCE REDRAW: Drawing resilience factors diagram");
    
    // Draw the background layers first
    if (diagramData.layers) {
      diagramData.layers.forEach(layer => {
        forceDrawResilienceLayer(layer);
      });
    }
    
    // Draw connections
    if (diagramData.connections) {
      diagramData.connections.forEach(connection => {
        forceDrawResilienceConnection(connection);
      });
    }
    
    // Draw resilience factors
    if (diagramData.factors) {
      console.log("FORCE REDRAW: Drawing resilience factors with strengths:", 
        diagramData.factors.map(f => `${f.id}: ${f.strength.toFixed(1)}`).join(', '));
      
      diagramData.factors.forEach(factor => {
        forceDrawResilienceFactor(factor);
      });
    }
  }
  
  // Update diagram when type or context changes
  $: if (canvas && ctx && (type || context)) {
    diagramData = loadData();
    centerDiagram();
    redraw();
  }
  
  onDestroy(() => {
    if (simulationInterval) {
      clearInterval(simulationInterval);
    }
    
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
</script>

<div class="systems-diagram" 
     bind:this={container} 
     style="width: {width}; height: {height};">
</div>

<style>
  .systems-diagram {
    width: 100%;
    height: 100%;
    min-height: 600px; /* Add minimum height */
    background-color: #ffffff;
    position: relative;
    overflow: hidden;
  }
</style>
