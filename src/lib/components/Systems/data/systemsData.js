// src/lib/components/Systems/data/systemsData.js
// Sample data for system dynamics models

/**
 * Get Feedback Loop Diagram data
 * @param {string} context - Regional context
 * @returns {Object} - Diagram data with variables and loops
 */
export function getFeedbackLoopData(context) {
  // Get context-specific data
  switch (context) {
    case 'africa':
      return feedbackLoopDataAfrica;
    case 'middle-east':
      return feedbackLoopDataMiddleEast;
    case 'south-asia':
      return feedbackLoopDataSouthAsia;
    case 'latin-america':
      return feedbackLoopDataLatinAmerica;
    case 'global':
    default:
      return feedbackLoopDataGlobal;
  }
}

/**
 * Get Stock and Flow Model data
 * @param {string} context - Regional context
 * @returns {Object} - Diagram data with stocks, flows, and auxiliaries
 */
export function getStockFlowData(context) {
  // Get context-specific data
  switch (context) {
    case 'africa':
      return stockFlowDataAfrica;
    case 'middle-east':
      return stockFlowDataMiddleEast;
    case 'south-asia':
      return stockFlowDataSouthAsia;
    case 'latin-america':
      return stockFlowDataLatinAmerica;
    case 'global':
    default:
      return stockFlowDataGlobal;
  }
}

/**
 * Get Leverage Points data
 * @param {string} context - Regional context
 * @returns {Object} - Diagram data with leverage points and connections
 */
export function getLeveragePointsData(context) {
  // Get context-specific data
  switch (context) {
    case 'africa':
      return leveragePointsDataAfrica;
    case 'middle-east':
      return leveragePointsDataMiddleEast;
    case 'south-asia':
      return leveragePointsDataSouthAsia;
    case 'latin-america':
      return leveragePointsDataLatinAmerica;
    case 'global':
    default:
      return leveragePointsDataGlobal;
  }
}

/**
 * Get Resilience Factors data
 * @param {string} context - Regional context
 * @returns {Object} - Diagram data with resilience factors and connections
 */
export function getResilienceFactorsData(context) {
  // Get context-specific data
  switch (context) {
    case 'africa':
      return resilienceFactorsDataAfrica;
    case 'middle-east':
      return resilienceFactorsDataMiddleEast;
    case 'south-asia':
      return resilienceFactorsDataSouthAsia;
    case 'latin-america':
      return resilienceFactorsDataLatinAmerica;
    case 'global':
    default:
      return resilienceFactorsDataGlobal;
  }
}

/**
 * Update a model with new variable values
 * This is a helper function used to update simulation models with user-controlled variables
 */
function updateModelWithVariables(model, variables) {
  // Create a deep copy of the model
  const updatedModel = JSON.parse(JSON.stringify(model));
  
  // Update all variables with new values if they exist
  if (updatedModel.variables) {
    updatedModel.variables = updatedModel.variables.map(variable => {
      if (variables[variable.id]) {
        return { ...variable, value: variables[variable.id].value };
      }
      return variable;
    });
  }
  
  // Update stocks if they exist
  if (updatedModel.stocks) {
    updatedModel.stocks = updatedModel.stocks.map(stock => {
      if (variables[stock.id]) {
        return { ...stock, value: variables[stock.id].value };
      }
      return stock;
    });
  }
  
  // Update flows if they exist
  if (updatedModel.flows) {
    updatedModel.flows = updatedModel.flows.map(flow => {
      if (variables[flow.id]) {
        return { ...flow, rate: variables[flow.id].value };
      }
      return flow;
    });
  }
  
  // Update auxiliaries if they exist
  if (updatedModel.auxiliaries) {
    updatedModel.auxiliaries = updatedModel.auxiliaries.map(aux => {
      if (variables[aux.id]) {
        return { ...aux, value: variables[aux.id].value };
      }
      return aux;
    });
  }
  
  // Update leverage points if they exist
  if (updatedModel.leveragePoints) {
    updatedModel.leveragePoints = updatedModel.leveragePoints.map(point => {
      if (variables[point.id]) {
        return { ...point, impact: variables[point.id].value };
      }
      return point;
    });
  }
  
  // Update resilience factors if they exist
  if (updatedModel.factors) {
    updatedModel.factors = updatedModel.factors.map(factor => {
      if (variables[factor.id]) {
        return { ...factor, strength: variables[factor.id].value };
      }
      return factor;
    });
  }
  
  // Add update method
  updatedModel.updateModel = function(newVariables) {
    return updateModelWithVariables(this, newVariables);
  };
  
  // Add simulation update method
  updatedModel.updateSimulation = function(time, newVariables) {
    // Implement a simple simulation update for the different model types
    if (this.variables) {
      // Feedback loops simulation
      return simulateFeedbackLoops(this, time, newVariables);
    } else if (this.stocks) {
      // Stock and flow simulation
      return simulateStockFlow(this, time, newVariables);
    } else if (this.leveragePoints) {
      // Leverage points simulation (simplified)
      return simulateLeveragePoints(this, time, newVariables);
    } else if (this.factors) {
      // Resilience factors simulation (simplified)
      return simulateResilienceFactors(this, time, newVariables);
    }
    
    // Default: return unchanged model
    return this;
  };
  
  return updatedModel;
}

function simulateFeedbackLoops(model, time, variables) {
  // Use exaggerated version for better visibility
  return exaggeratedFeedbackLoops(model, time, variables);
}

/**
 * Simulate feedback loops model over time
 */
function simulateFeedbackLoops_original(model, time, variables) {
  // Create a deep copy of the model
  const updatedModel = JSON.parse(JSON.stringify(model));
  
  console.log("Running feedback loops simulation at time:", time);
  
  // Add a simple oscillating effect for testing
  updatedModel.variables.forEach(variable => {
    // Create a visible oscillation based on time
    const originalValue = variable.value;
    const amplitude = 2.0; // Large amplitude for visibility
    const period = 5.0; // 5-second period
    const oscillation = amplitude * Math.sin(time * 2 * Math.PI / period);
    
    // Apply the oscillation with constraints
    variable.value = Math.max(1, Math.min(10, originalValue + oscillation));
    
    console.log(`Variable ${variable.id} updated: ${originalValue.toFixed(2)} → ${variable.value.toFixed(2)}`);
  });
  
  // Re-add update methods
  updatedModel.updateModel = model.updateModel;
  updatedModel.updateSimulation = model.updateSimulation;
  
  return updatedModel;
}

function simulateFeedbackLoops_original3(model, time, variables) {
  // Create a deep copy of the model
  const updatedModel = JSON.parse(JSON.stringify(model));
  
  // Get the current variable values
  const variableMap = {};
  updatedModel.variables.forEach(variable => {
    variableMap[variable.id] = variable;
  });
  
  // Update each variable based on its connections in loops
  updatedModel.loops.forEach(loop => {
    const path = loop.path;
    const type = loop.type;
    const strength = loop.strength;
    
    // Get variable IDs from path endpoints
    for (let i = 0; i < path.length - 1; i++) {
      // Find the variables at this path segment
      const startPoint = path[i];
      const endPoint = path[i + 1];
      
      // Find variables at these coordinates
      const affectedVariable = updatedModel.variables.find(v => 
        Math.abs(v.x - endPoint.x) < 10 && Math.abs(v.y - endPoint.y) < 10
      );
      
      if (affectedVariable) {
        // Calculate influence based on loop type
        const timeStep = 0.1;
        // Increase base influence for more visible changes
        const baseInfluence = strength * timeStep * 0.5;  // Increased from 0.2 to 0.5
        
        if (type === 'reinforcing') {
          // Reinforcing loops amplify change - increase factor for visibility
          affectedVariable.value += baseInfluence * affectedVariable.value * 0.2;  // Increased from 0.1 to 0.2
        } else {
          // Balancing loops move toward equilibrium - increase factor for visibility
          const equilibrium = 5; // Assume equilibrium at middle value
          affectedVariable.value += baseInfluence * (equilibrium - affectedVariable.value) * 0.4;  // Added multiplier 0.4
        }
        
        // Ensure value stays within bounds
        affectedVariable.value = Math.max(1, Math.min(10, affectedVariable.value));
      }
    }
  });
  
  // Re-add update methods
  updatedModel.updateModel = model.updateModel;
  updatedModel.updateSimulation = model.updateSimulation;
  
  return updatedModel;
}

function simulateStockFlow(model, time, variables) {
  // Use exaggerated version for better visibility
  return exaggeratedStockFlow(model, time, variables);
}

/**
 * Simulate stock and flow model over time
 */
function simulateStockFlow_original2(model, time, variables) {
  // Create a deep copy of the model
  const updatedModel = JSON.parse(JSON.stringify(model));
  
  // Get the current stock and flow values
  const stockMap = {};
  updatedModel.stocks.forEach(stock => {
    stockMap[stock.id] = stock;
  });
  
  const flowMap = {};
  updatedModel.flows.forEach(flow => {
    flowMap[flow.id] = flow;
  });
  
  const auxMap = {};
  if (updatedModel.auxiliaries) {
    updatedModel.auxiliaries.forEach(aux => {
      auxMap[aux.id] = aux;
    });
  }
  
  // First, update flow rates based on auxiliaries (if needed)
  if (updatedModel.connectors) {
    updatedModel.connectors.forEach(connector => {
      if (connector.source.startsWith('aux') && connector.target.startsWith('flow')) {
        const auxVariable = auxMap[connector.source];
        const targetFlow = flowMap[connector.target];
        
        if (auxVariable && targetFlow) {
          // Adjust flow rate based on auxiliary variable
          const influence = auxVariable.value / 5; // Scale factor
          if (connector.polarity === 'positive') {
            targetFlow.rate += influence * 0.1; // Small increase for positive influence
          } else {
            targetFlow.rate -= influence * 0.1; // Small decrease for negative influence
          }
          // Ensure rate stays within reasonable bounds
          targetFlow.rate = Math.max(0.5, Math.min(10, targetFlow.rate));
        }
      }
    });
  }
  
  // Update stocks based on flows
  updatedModel.flows.forEach(flow => {
    const { source, target, rate } = flow;
    // Increase timeStep for more visible changes
    const timeStep = 0.3;  // Increased from 0.1 to 0.3
    
    if (source && stockMap[source]) {
      // Reduce source stock
      stockMap[source].value = Math.max(0, stockMap[source].value - rate * timeStep);
    }
    
    if (target && stockMap[target]) {
      // Increase target stock
      stockMap[target].value += rate * timeStep;
      
      // Respect capacity if defined
      if (stockMap[target].capacity !== undefined) {
        stockMap[target].value = Math.min(stockMap[target].value, stockMap[target].capacity);
      }
    }
  });
  
  // Re-add update methods
  updatedModel.updateModel = model.updateModel;
  updatedModel.updateSimulation = model.updateSimulation;
  
  return updatedModel;
}

/**
 * Simulate leverage points model over time (simplified)
 */
function simulateLeveragePoints(model, time, variables) {
  // Create a deep copy of the model
  const updatedModel = JSON.parse(JSON.stringify(model));
  
  // Create leverage point influence map
  const leverageMap = {};
  updatedModel.leveragePoints.forEach(point => {
    leverageMap[point.id] = point;
  });
  
  // Process connections to simulate influence flow
  updatedModel.connections.forEach(connection => {
    const { source, target, influence } = connection;
    
    // Only process leverage point to leverage point connections
    if (source.startsWith('lp') && target.startsWith('lp')) {
      const sourcePoint = leverageMap[source];
      const targetPoint = leverageMap[target];
      
      if (sourcePoint && targetPoint) {
        // Calculate influence based on source impact and connection strength
        const timeStep = 0.1;
        const changeAmount = (sourcePoint.impact / 10) * (influence / 10) * timeStep * 0.4;
        
        // Higher level leverage points influence lower level ones more strongly
        const levelFactor = Math.max(0.5, (sourcePoint.level < targetPoint.level) ? 1.5 : 0.8);
        
        targetPoint.impact += changeAmount * levelFactor;
        
        // Ensure impact stays within bounds
        targetPoint.impact = Math.max(1, Math.min(10, targetPoint.impact));
      }
    }
  });
  
  // Re-add update methods
  updatedModel.updateModel = model.updateModel;
  updatedModel.updateSimulation = model.updateSimulation;
  
  return updatedModel;
}

/**
 * Simulate resilience factors model over time (simplified)
 */
function simulateResilienceFactors(model, time, variables) {
  // Create a deep copy of the model
  const updatedModel = JSON.parse(JSON.stringify(model));
  
  // Apply changes based on connections with enhanced visibility
  if (updatedModel.connections) {
    updatedModel.connections.forEach(connection => {
      const { source, target, strength, type } = connection;
      
      // Find the source and target factors
      const sourceFactor = updatedModel.factors.find(f => f.id === source);
      const targetFactor = updatedModel.factors.find(f => f.id === target);
      
      if (sourceFactor && targetFactor) {
        const timeStep = 0.1;
        // Increase influence factor for more visible changes
        const influence = strength * timeStep * 0.2;  // Increased from 0.05 to 0.2
        
        if (type === 'synergy') {
          // Synergistic connections: source strength positively affects target
          targetFactor.strength += influence * sourceFactor.strength / 8;  // Increased effect
        } else if (type === 'dependency') {
          // Dependency: target can't exceed source
          if (targetFactor.strength > sourceFactor.strength) {
            targetFactor.strength -= influence * (targetFactor.strength - sourceFactor.strength) * 1.5;  // Faster adjustment
          }
        } else if (type === 'trade-off') {
          // Trade-off: source growth reduces target
          targetFactor.strength -= influence * sourceFactor.strength / 8;  // Increased effect
        }
        
        // Ensure value stays within bounds
        targetFactor.strength = Math.max(1, Math.min(10, targetFactor.strength));
      }
    });
  }
  
  // Re-add update methods
  updatedModel.updateModel = model.updateModel;
  updatedModel.updateSimulation = model.updateSimulation;
  
  return updatedModel;
}

// Sample data for feedback loop model (Global)
const feedbackLoopDataGlobal = {
  variables: [
    { 
      id: 'var1', 
      x: 200, 
      y: 200, 
      label: 'Security\nDilemma', 
      value: 6, 
      description: 'The tendency for actions taken by one state to improve its security to lead to reactions from other states, which can leave all states less secure.',
      loops: ['reinforcing']
    },
    { 
      id: 'var2', 
      x: 400, 
      y: 200, 
      label: 'Arms\nBuild-up', 
      value: 5, 
      description: 'The acquisition of weapons and military capabilities by states in response to perceived threats.',
      loops: ['reinforcing']
    },
    { 
      id: 'var3', 
      x: 300, 
      y: 350, 
      label: 'Perceived\nThreat', 
      value: 7, 
      description: 'The perception by states that other states pose a security threat, whether or not this perception is accurate.',
      loops: ['reinforcing']
    },
    { 
      id: 'var4', 
      x: 150, 
      y: 450, 
      label: 'Dialogue\nChannels', 
      value: 4, 
      description: 'Formal and informal communication pathways between states that allow for clarification of intentions and de-escalation.',
      loops: ['balancing']
    },
    { 
      id: 'var5', 
      x: 450, 
      y: 450, 
      label: 'Trust\nLevel', 
      value: 3, 
      description: 'The degree of confidence between states that the other will not exploit vulnerabilities or act against their interests.',
      loops: ['balancing']
    },
    { 
      id: 'var6', 
      x: 300, 
      y: 550, 
      label: 'Confidence\nBuilding\nMeasures', 
      value: 4, 
      description: 'Activities designed to reduce fear of attack by increasing transparency about military activities.',
      loops: ['balancing']
    }
  ],
  loops: [
    {
      id: 'loop1',
      type: 'reinforcing',
      label: 'Arms Race Cycle',
      strength: 8,
      path: [
        { x: 200, y: 200 }, // Security Dilemma
        { x: 300, y: 350 }, // Perceived Threat
        { x: 400, y: 200 }, // Arms Build-up
        { x: 200, y: 200 }  // Back to Security Dilemma
      ]
    },
    {
      id: 'loop2',
      type: 'balancing',
      label: 'Trust Building Cycle',
      strength: 5,
      path: [
        { x: 300, y: 350 }, // Perceived Threat
        { x: 150, y: 450 }, // Dialogue Channels
        { x: 300, y: 550 }, // Confidence Building Measures
        { x: 450, y: 450 }, // Trust Level
        { x: 300, y: 350 }  // Back to Perceived Threat
      ]
    }
  ],
  bounds: {
    minX: 100,
    minY: 150,
    maxX: 500,
    maxY: 600
  },
  // Add update methods
  updateModel: function(variables) {
    return updateModelWithVariables(this, variables);
  },
  updateSimulation: function(time, variables) {
    return simulateFeedbackLoops(this, time, variables);
  }
};

// Sample data for stock and flow model (Global)
const stockFlowDataGlobal = {
  stocks: [
    {
      id: 'stock1',
      x: 150,
      y: 200,
      label: 'Grievances',
      value: 7,
      capacity: 10,
      description: 'Accumulated grievances that lead to conflict potential'
    },
    {
      id: 'stock2',
      x: 450,
      y: 200,
      label: 'Social Cohesion',
      value: 4,
      capacity: 10,
      description: 'Level of trust and cooperation between social groups'
    },
    {
      id: 'stock3',
      x: 300,
      y: 400,
      label: 'Violence',
      value: 3,
      capacity: 10,
      description: 'Active conflict and violence in the system'
    }
  ],
  flows: [
    {
      id: 'flow1',
      x: 300,
      y: 200,
      label: 'Grievance\nResolution',
      rate: 2,
      source: 'stock1',
      target: 'stock2',
      description: 'Process of addressing and resolving grievances'
    },
    {
      id: 'flow2',
      x: 200,
      y: 300,
      label: 'Conflict\nEscalation',
      rate: 3,
      source: 'stock1',
      target: 'stock3',
      description: 'Transformation of grievances into active violence'
    },
    {
      id: 'flow3',
      x: 400,
      y: 300,
      label: 'Peacebuilding',
      rate: 2,
      source: 'stock3',
      target: 'stock2',
      description: 'Activities that reduce violence and build social cohesion'
    }
  ],
  auxiliaries: [
    {
      id: 'aux1',
      x: 100,
      y: 100,
      label: 'Resource\nInequality',
      value: 6,
      description: 'Level of inequality in resource distribution'
    },
    {
      id: 'aux2',
      x: 500,
      y: 100,
      label: 'Governance\nQuality',
      value: 4,
      description: 'Effectiveness and inclusiveness of governance institutions'
    },
    {
      id: 'aux3',
      x: 100,
      y: 350,
      label: 'Identity\nPolarization',
      value: 5,
      description: 'Degree of division along identity lines'
    },
    {
      id: 'aux4',
      x: 500,
      y: 350,
      label: 'Int\'l\nSupport',
      value: 3,
      description: 'Level of external support for peace processes'
    }
  ],
  connectors: [
    { source: 'aux1', target: 'stock1', polarity: 'positive' },
    { source: 'aux2', target: 'stock2', polarity: 'positive' },
    { source: 'aux3', target: 'flow2', polarity: 'positive' },
    { source: 'aux4', target: 'flow3', polarity: 'positive' },
    { source: 'stock2', target: 'flow1', polarity: 'positive' },
    { source: 'stock2', target: 'flow2', polarity: 'negative' }
  ],
  bounds: {
    minX: 50,
    minY: 50,
    maxX: 550,
    maxY: 450
  },
  // Add update methods
  updateModel: function(variables) {
    return updateModelWithVariables(this, variables);
  },
  updateSimulation: function(time, variables) {
    return simulateStockFlow(this, time, variables);
  }
};

// Sample data for leverage points model (Global)
const leveragePointsDataGlobal = {
  leveragePoints: [
    {
      id: 'lp1',
      x: 300,
      y: 150,
      label: 'Shared Peace\nNarrative',
      level: 2,
      impact: 8,
      difficulty: 7,
      description: 'A compelling shared vision and narrative about peaceful coexistence that transcends divisions'
    },
    {
      id: 'lp2',
      x: 150,
      y: 250,
      label: 'Resource\nSharing Rules',
      level: 5,
      impact: 7,
      difficulty: 6,
      description: 'Formal and informal rules governing how resources are distributed between groups'
    },
    {
      id: 'lp3',
      x: 450,
      y: 250,
      label: 'Inter-group\nCouncils',
      level: 4,
      impact: 6,
      difficulty: 5,
      description: 'Formal structures bringing together representatives from different identity groups for dialogue'
    },
    {
      id: 'lp4',
      x: 200,
      y: 350,
      label: 'Early Warning\nNetworks',
      level: 7,
      impact: 5,
      difficulty: 3,
      description: 'Community-based systems to detect and respond to emerging conflict triggers'
    },
    {
      id: 'lp5',
      x: 400,
      y: 350,
      label: 'Security Actor\nIncentives',
      level: 6,
      impact: 7,
      difficulty: 6,
      description: 'Incentive structures shaping how security forces interact with communities'
    },
    {
      id: 'lp6',
      x: 300,
      y: 450,
      label: 'Community\nPolicing Ratio',
      level: 11,
      impact: 4,
      difficulty: 2,
      description: 'The ratio of police officers drawn from local communities versus external forces'
    }
  ],
  elements: [
    {
      id: 'elem1',
      x: 100,
      y: 150,
      label: 'Political\nLeadership',
      type: 'actor',
      description: 'Key decision-makers with formal authority'
    },
    {
      id: 'elem2',
      x: 500,
      y: 150,
      label: 'Civil Society',
      type: 'actor',
      description: 'Non-governmental organizations and civic groups'
    },
    {
      id: 'elem3',
      x: 100,
      y: 450,
      label: 'Resource\nAllocation',
      type: 'process',
      description: 'How resources are distributed among different groups'
    },
    {
      id: 'elem4',
      x: 500,
      y: 450,
      label: 'Security\nProvision',
      type: 'process',
      description: 'How safety and security are maintained'
    }
  ],
  connections: [
    { id: 'conn1', source: 'lp1', target: 'lp2', influence: 7 },
    { id: 'conn2', source: 'lp1', target: 'lp3', influence: 8 },
    { id: 'conn3', source: 'lp2', target: 'lp4', influence: 5 },
    { id: 'conn4', source: 'lp3', target: 'lp5', influence: 6 },
    { id: 'conn5', source: 'lp5', target: 'lp6', influence: 8 },
    { id: 'conn6', source: 'elem1', target: 'lp1', influence: 9 },
    { id: 'conn7', source: 'elem2', target: 'lp1', influence: 7 },
    { id: 'conn8', source: 'elem1', target: 'lp2', influence: 8 },
    { id: 'conn9', source: 'elem2', target: 'lp3', influence: 6 },
    { id: 'conn10', source: 'lp2', target: 'elem3', influence: 9 },
    { id: 'conn11', source: 'lp5', target: 'elem4', influence: 8 },
    { id: 'conn12', source: 'lp6', target: 'elem4', influence: 5 }
  ],
  boundaries: [
    {
      id: 'bound1',
      label: 'Social Norms System',
      color: '#3498db',
      points: [
        { x: 200, y: 100 },
        { x: 400, y: 100 },
        { x: 450, y: 200 },
        { x: 400, y: 300 },
        { x: 200, y: 300 },
        { x: 150, y: 200 }
      ]
    },
    {
      id: 'bound2',
      label: 'Security System',
      color: '#e74c3c',
      points: [
        { x: 200, y: 300 },
        { x: 400, y: 300 },
        { x: 500, y: 400 },
        { x: 400, y: 500 },
        { x: 200, y: 500 },
        { x: 100, y: 400 }
      ]
    }
  ],
  bounds: {
    minX: 50,
    minY: 50,
    maxX: 550,
    maxY: 500
  },
  // Add update methods
  updateModel: function(variables) {
    return updateModelWithVariables(this, variables);
  },
  updateSimulation: function(time, variables) {
    return simulateLeveragePoints(this, time, variables);
  }
};

// Sample data for resilience factors model (Global)
const resilienceFactorsDataGlobal = {
  factors: [
    {
      id: 'factor1',
      x: 300,
      y: 200,
      label: 'Inclusive\nGovernance',
      category: 'institutional',
      strength: 5,
      potential: 8,
      description: 'Governance systems that include diverse stakeholders in decision-making'
    },
    {
      id: 'factor2',
      x: 150,
      y: 300,
      label: 'Social\nCohesion',
      category: 'social',
      strength: 4,
      potential: 7,
      description: 'Strength of bonds between different identity groups'
    },
    {
      id: 'factor3',
      x: 450,
      y: 300,
      label: 'Economic\nDiversity',
      category: 'economic',
      strength: 6,
      potential: 8,
      description: 'Diversity of economic activities and livelihoods'
    },
    {
      id: 'factor4',
      x: 300,
      y: 400,
      label: 'Ecosystem\nHealth',
      category: 'ecological',
      strength: 3,
      potential: 6,
      description: 'Functioning ecosystems providing services and resources'
    },
    {
      id: 'factor5',
      x: 200,
      y: 170,
      label: 'Conflict\nResolution\nMechanisms',
      category: 'institutional',
      strength: 5,
      potential: 9,
      description: 'Formal and informal systems for resolving disputes'
    },
    {
      id: 'factor6',
      x: 400,
      y: 170,
      label: 'Cultural\nIdentity',
      category: 'social',
      strength: 7,
      potential: 8,
      description: 'Strength and adaptability of cultural practices and identity'
    }
  ],
  connections: [
    { id: 'conn1', source: 'factor1', target: 'factor2', strength: 7, type: 'synergy' },
    { id: 'conn2', source: 'factor1', target: 'factor3', strength: 6, type: 'synergy' },
    { id: 'conn3', source: 'factor2', target: 'factor5', strength: 8, type: 'synergy' },
    { id: 'conn4', source: 'factor3', target: 'factor4', strength: 5, type: 'dependency' },
    { id: 'conn5', source: 'factor4', target: 'factor3', strength: 7, type: 'dependency' },
    { id: 'conn6', source: 'factor5', target: 'factor2', strength: 6, type: 'synergy' },
    { id: 'conn7', source: 'factor6', target: 'factor2', strength: 8, type: 'synergy' },
    { id: 'conn8', source: 'factor3', target: 'factor6', strength: 4, type: 'trade-off' },
    { id: 'conn9', source: 'factor1', target: 'factor5', strength: 7, type: 'synergy' }
  ],
  layers: [
    {
      id: 'layer1',
      x: 300,
      y: 300,
      radius: 280,
      label: 'Community System',
      color: '#ecf0f1'
    },
    {
      id: 'layer2',
      x: 300,
      y: 300,
      radius: 180,
      label: 'Core Resilience',
      color: '#bdc3c7'
    }
  ],
  bounds: {
    minX: 100,
    minY: 100,
    maxX: 500,
    maxY: 450
  },
  // Add update methods
  updateModel: function(variables) {
    return updateModelWithVariables(this, variables);
  },
  updateSimulation: function(time, variables) {
    return simulateResilienceFactors(this, time, variables);
  }
};

// Create simplified regional data versions by selecting subsets of global data
// These would be more detailed in a real implementation with region-specific models

// Africa regional data - using feedback loops as example
const feedbackLoopDataAfrica = {
  variables: feedbackLoopDataGlobal.variables.map(v => ({
    ...v,
    value: v.value * 0.9, // Adjust values for region
    x: v.x * 0.9 + 50,    // Adjust positions
    y: v.y * 0.9 + 40
  })),
  loops: feedbackLoopDataGlobal.loops.map(l => ({
    ...l,
    strength: l.strength * 0.95, // Adjust strength
    path: l.path.map(p => ({     // Adjust path positions
      x: p.x * 0.9 + 50,
      y: p.y * 0.9 + 40
    }))
  })),
  bounds: {
    minX: 120,
    minY: 120,
    maxX: 480,
    maxY: 430
  },
  // Add update methods
  updateModel: function(variables) {
    return updateModelWithVariables(this, variables);
  },
  updateSimulation: function(time, variables) {
    return simulateFeedbackLoops(this, time, variables);
  }
};

// Middle East regional data - using stock flow as example
const stockFlowDataMiddleEast = {
  stocks: stockFlowDataGlobal.stocks.map(s => ({
    ...s,
    value: s.value * 1.2, // Adjust values for region
    x: s.x * 0.85 + 60,   // Adjust positions
    y: s.y * 0.85 + 50
  })),
  flows: stockFlowDataGlobal.flows.map(f => ({
    ...f,
    rate: f.rate * 1.1,   // Adjust rates
    x: f.x * 0.85 + 60,   // Adjust positions
    y: f.y * 0.85 + 50
  })),
  auxiliaries: stockFlowDataGlobal.auxiliaries.map(a => ({
    ...a,
    value: a.value * 0.9, // Adjust values
    x: a.x * 0.85 + 60,   // Adjust positions
    y: a.y * 0.85 + 50
  })),
  connectors: stockFlowDataGlobal.connectors,
  bounds: {
    minX: 100,
    minY: 90,
    maxX: 470,
    maxY: 400
  },
  // Add update methods
  updateModel: function(variables) {
    return updateModelWithVariables(this, variables);
  },
  updateSimulation: function(time, variables) {
    return simulateStockFlow(this, time, variables);
  }
};

// South Asia regional data - using leverage points as example
const leveragePointsDataSouthAsia = {
  leveragePoints: leveragePointsDataGlobal.leveragePoints.map(p => ({
    ...p,
    impact: p.impact * 1.1,    // Adjust impact
    x: p.x * 0.9 + 40,         // Adjust positions
    y: p.y * 0.9 + 40
  })),
  elements: leveragePointsDataGlobal.elements.map(e => ({
    ...e,
    x: e.x * 0.9 + 40,         // Adjust positions
    y: e.y * 0.9 + 40
  })),
  connections: leveragePointsDataGlobal.connections.map(c => ({
    ...c,
    influence: c.influence * 0.9 // Adjust influence
  })),
  boundaries: leveragePointsDataGlobal.boundaries.map(b => ({
    ...b,
    points: b.points.map(p => ({  // Adjust boundary points
      x: p.x * 0.9 + 40,
      y: p.y * 0.9 + 40
    }))
  })),
  bounds: {
    minX: 80,
    minY: 80,
    maxX: 480,
    maxY: 440
  },
  // Add update methods
  updateModel: function(variables) {
    return updateModelWithVariables(this, variables);
  },
  updateSimulation: function(time, variables) {
    return simulateLeveragePoints(this, time, variables);
  }
};

// Latin America regional data - using resilience factors as example
const resilienceFactorsDataLatinAmerica = {
  factors: resilienceFactorsDataGlobal.factors.map(f => ({
    ...f,
    strength: f.strength * 1.05,  // Adjust strength
    x: f.x * 0.85 + 60,           // Adjust positions
    y: f.y * 0.85 + 50
  })),
  connections: resilienceFactorsDataGlobal.connections.map(c => ({
    ...c,
    strength: c.strength * 0.95   // Adjust connection strength
  })),
  layers: resilienceFactorsDataGlobal.layers.map(l => ({
    ...l,
    radius: l.radius * 0.85,      // Adjust layer radius
    x: l.x * 0.85 + 60,           // Adjust positions
    y: l.y * 0.85 + 50
  })),
  bounds: {
    minX: 110,
    minY: 110,
    maxX: 470,
    maxY: 410
  },
  // Add update methods
  updateModel: function(variables) {
    return updateModelWithVariables(this, variables);
  },
  updateSimulation: function(time, variables) {
    return simulateResilienceFactors(this, time, variables);
  }
};

function exaggeratedFeedbackLoops(model, time, variables) {
  // Create a deep copy of the model
  const updatedModel = JSON.parse(JSON.stringify(model));
  
  // Add more dramatic oscillations for testing visibility
  updatedModel.variables.forEach(variable => {
    const originalValue = variable.value;
    
    // Create distinct patterns for each variable for visibility
    if (variable.id === 'var1') {
      // Sine wave pattern with 5 second period
      const oscillation = 2.0 * Math.sin(time * 2 * Math.PI / 5.0);
      variable.value = Math.max(1, Math.min(10, originalValue + oscillation));
    } 
    else if (variable.id === 'var2') {
      // Cosine wave pattern with 7 second period
      const oscillation = 2.5 * Math.cos(time * 2 * Math.PI / 7.0);
      variable.value = Math.max(1, Math.min(10, originalValue + oscillation));
    }
    else if (variable.id === 'var3') {
      // Sawtooth pattern
      const period = 10.0;
      const phase = (time % period) / period;
      const oscillation = 3.0 * (phase < 0.5 ? phase * 2 : 2 - phase * 2);
      variable.value = Math.max(1, Math.min(10, originalValue + oscillation - 1.5));
    }
    else {
      // Square wave pattern
      const period = 8.0;
      const phase = (time % period) / period;
      const oscillation = phase < 0.5 ? -1.5 : 1.5;
      variable.value = Math.max(1, Math.min(10, originalValue + oscillation));
    }
  });
  
  // Re-add update methods
  updatedModel.updateModel = model.updateModel;
  updatedModel.updateSimulation = model.updateSimulation;
  
  return updatedModel;
}

function exaggeratedStockFlow(model, time, variables) {
  // Create a deep copy of the model
  const updatedModel = JSON.parse(JSON.stringify(model));
  
  // Add dramatic changes to stock values for testing visibility
  if (updatedModel.stocks) {
    updatedModel.stocks.forEach((stock, index) => {
      const originalValue = stock.value;
      
      // Different pattern for each stock
      if (index === 0) {
        // Rising and falling pattern
        const period = 15.0;
        const phase = (time % period) / period;
        const change = phase < 0.5 ? 
          4.0 * phase : 
          4.0 * (1 - phase);
        stock.value = Math.max(1, Math.min(10, originalValue + change - 2.0));
      }
      else if (index === 1) {
        // Oscillating pattern
        const oscillation = 2.0 * Math.sin(time * 2 * Math.PI / 10.0);
        stock.value = Math.max(1, Math.min(10, originalValue + oscillation));
      }
      else {
        // Gradual increase pattern
        const increase = Math.min(5.0, time / 10.0);
        stock.value = Math.max(1, Math.min(10, originalValue + increase - 2.5));
      }
    });
  }
  
  // Add dramatic changes to flow rates
  if (updatedModel.flows) {
    updatedModel.flows.forEach((flow, index) => {
      const originalRate = flow.rate;
      
      // Different pattern for each flow
      if (index === 0) {
        // Pulsing pattern
        const pulse = 2.0 * Math.pow(Math.sin(time * Math.PI), 2);
        flow.rate = Math.max(0.5, Math.min(10, originalRate + pulse - 1.0));
      }
      else if (index === 1) {
        // Sawtooth pattern
        const period = 8.0;
        const phase = (time % period) / period;
        const change = 3.0 * phase - 1.5;
        flow.rate = Math.max(0.5, Math.min(10, originalRate + change));
      }
      else {
        // Oscillating pattern with different period
        const oscillation = 1.5 * Math.sin(time * 2 * Math.PI / 6.0);
        flow.rate = Math.max(0.5, Math.min(10, originalRate + oscillation));
      }
    });
  }
  
  // Re-add update methods
  updatedModel.updateModel = model.updateModel;
  updatedModel.updateSimulation = model.updateSimulation;
  
  return updatedModel;
}

// Create basic placeholders for remaining region-context combinations
// In a real implementation, these would be more detailed and customized
const feedbackLoopDataMiddleEast = { ...feedbackLoopDataAfrica };
const feedbackLoopDataSouthAsia = { ...feedbackLoopDataAfrica };
const feedbackLoopDataLatinAmerica = { ...feedbackLoopDataAfrica };

const stockFlowDataAfrica = { ...stockFlowDataMiddleEast };
const stockFlowDataSouthAsia = { ...stockFlowDataMiddleEast };
const stockFlowDataLatinAmerica = { ...stockFlowDataMiddleEast };

const leveragePointsDataAfrica = { ...leveragePointsDataSouthAsia };
const leveragePointsDataMiddleEast = { ...leveragePointsDataSouthAsia };
const leveragePointsDataLatinAmerica = { ...leveragePointsDataSouthAsia };

const resilienceFactorsDataAfrica = { ...resilienceFactorsDataLatinAmerica };
const resilienceFactorsDataMiddleEast = { ...resilienceFactorsDataLatinAmerica };
const resilienceFactorsDataSouthAsia = { ...resilienceFactorsDataLatinAmerica };
