<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  
  export let processData;
  
  const dispatch = createEventDispatcher();
  let svgElement;
  let containerWidth;
  let containerHeight;
  let boxWidth = 200;  // Slightly smaller boxes
  let boxHeight = 80;
  let horizontalGap = 40; // Reduced horizontal gap
  let verticalGap = 150; // Increased vertical gap for better readability
  let currentPhase = null;
  let selectedStep = null;
  let showModal = false;
  
  // Rearrange step layout to horizontal format
  let reorganizedSteps = [...processData.steps];
  
  // Modify the reorganizedSteps to use the new layout
  onMount(() => {
    // Create a map for easier lookup
    const stepsMap = {};
    processData.steps.forEach(step => {
      stepsMap[step.id] = step;
    });
    
    // Assign new row and column positions
    let stepId = 1;
    
    // Row 1: 7 steps
    for (let col = 1; col <= 7; col++) {
      if (stepsMap[stepId]) {
        stepsMap[stepId].row = 1;
        stepsMap[stepId].column = col;
        stepId++;
      }
    }
    
    // Row 2: 7 steps
    for (let col = 1; col <= 7; col++) {
      if (stepsMap[stepId]) {
        stepsMap[stepId].row = 2;
        stepsMap[stepId].column = col;
        stepId++;
      }
    }
    
    // Row 3: 7 steps
    for (let col = 1; col <= 7; col++) {
      if (stepsMap[stepId]) {
        stepsMap[stepId].row = 3;
        stepsMap[stepId].column = col;
        stepId++;
      }
    }
    
    // Row 4: 6 steps
    for (let col = 1; col <= 6; col++) {
      if (stepsMap[stepId]) {
        stepsMap[stepId].row = 4;
        stepsMap[stepId].column = col;
        stepId++;
      }
    }
    
    // Set the container dimensions based on the new layout
    containerWidth = (boxWidth + horizontalGap) * 7 + 50;  // 7 is the max number of steps in a row
    containerHeight = (boxHeight + verticalGap) * 4 + 50;  // 4 rows total
    
    // Update the reorganizedSteps array
    reorganizedSteps = Object.values(stepsMap);
  });
  
  function handleStepHover(step) {
    currentPhase = step.phase;
  }
  
  function handleStepLeave() {
    currentPhase = null;
  }
  
  function handleStepClick(step) {
    selectedStep = step;
    showModal = true;
    dispatch('stepSelect', { id: step.id });
  }
  
  function closeModal() {
    showModal = false;
  }
  
  function handleClickOutside(event) {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent && !modalContent.contains(event.target)) {
      closeModal();
    }
  }
</script>

<div class="process-map-container">
  <svg 
    bind:this={svgElement} 
    width="100%" 
    height="100%" 
    viewBox="0 0 {containerWidth} {containerHeight}" 
    preserveAspectRatio="xMidYMid meet"
  >
    <!-- Connection Lines -->
    {#each processData.connections as connection}
      {@const fromStep = reorganizedSteps.find(s => s.id === connection.from)}
      {@const toStep = reorganizedSteps.find(s => s.id === connection.to)}
      
      {#if fromStep && toStep}
        {@const fromX = (boxWidth + horizontalGap) * (fromStep.column - 1) + (boxWidth / 2)}
        {@const fromY = (boxHeight + verticalGap) * (fromStep.row - 1) + boxHeight}
        {@const toX = (boxWidth + horizontalGap) * (toStep.column - 1) + (boxWidth / 2)}
        {@const toY = (boxHeight + verticalGap) * (toStep.row - 1)}
        
        <!-- Connect steps with lines -->
        <path 
          d="M{fromX},{fromY} C{fromX},{fromY + 40} {toX},{toY - 40} {toX},{toY}" 
          fill="none" 
          stroke={connection.highlighted && currentPhase === fromStep.phase ? fromStep.phaseColor : "#aaa"} 
          stroke-width="2"
          class="connection-line"
        />
        <polygon 
          points="{toX},{toY} {toX-5},{toY-10} {toX+5},{toY-10}" 
          fill={connection.highlighted && currentPhase === fromStep.phase ? fromStep.phaseColor : "#aaa"}
          class="arrow-head"
        />
      {/if}
    {/each}
    
    <!-- Process Steps -->
    {#each reorganizedSteps as step}
      {@const x = (boxWidth + horizontalGap) * (step.column - 1)}
      {@const y = (boxHeight + verticalGap) * (step.row - 1)}
      
      <g 
        transform="translate({x}, {y})" 
        on:mouseenter={() => handleStepHover(step)} 
        on:mouseleave={handleStepLeave}
        on:click={() => handleStepClick(step)}
        class="step-box-group"
      >
        <rect 
          width={boxWidth} 
          height={boxHeight} 
          rx="8" 
          ry="8" 
          fill="white" 
          stroke={currentPhase === step.phase ? step.phaseColor : "#ddd"} 
          stroke-width={currentPhase === step.phase ? "3" : "1"}
          class="step-box"
        />
        <rect 
          x="0" 
          y="0" 
          width="8" 
          height={boxHeight} 
          fill={step.phaseColor} 
          rx="8" 
          ry="8"
          class="phase-indicator"
        />
        <text 
          x="12" 
          y="20" 
          font-family="Arial, sans-serif" 
          font-size="16" 
          font-weight="bold" 
          fill="#333"
          class="step-number"
        >
          Step {step.id}
        </text>
        <foreignObject x="12" y="26" width={boxWidth - 16} height={boxHeight - 26}>
          <div xmlns="http://www.w3.org/1999/xhtml" class="step-title">
            {step.title}
          </div>
        </foreignObject>
      </g>
    {/each}
  </svg>
</div>

{#if showModal && selectedStep}
  <div class="modal-overlay" on:click={handleClickOutside} transition:fade={{ duration: 150 }}>
    <div class="modal-content" transition:scale={{ duration: 200, start: 0.95 }}>
      <div class="modal-header" style="border-color: {selectedStep.phaseColor};">
        <div class="header-content">
          <h2>Step {selectedStep.id}: {selectedStep.title}</h2>
          <span class="phase-tag" style="background-color: {selectedStep.phaseColor}">{selectedStep.phase}</span>
        </div>
        <button class="close-button" on:click={closeModal}>×</button>
      </div>
      
      <div class="modal-body">
        <p class="description">{selectedStep.description}</p>
        
        {#if selectedStep.keyConsiderations && selectedStep.keyConsiderations.length > 0}
          <h3>Key Considerations</h3>
          <ul class="considerations-list">
            {#each selectedStep.keyConsiderations as consideration}
              <li>{consideration}</li>
            {/each}
          </ul>
        {/if}
        
        {#if selectedStep.resources && selectedStep.resources.length > 0}
          <h3>Resources</h3>
          <ul class="resources-list">
            {#each selectedStep.resources as resource}
              <li>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  {resource.title}
                </a>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
      
      <div class="modal-footer">
        <div class="step-navigation">
          {#if selectedStep.id > 1}
            <button class="nav-button prev" on:click={() => handleStepClick(processData.steps.find(s => s.id === selectedStep.id - 1))}>
              ← Previous Step
            </button>
          {/if}
          
          {#if selectedStep.id < processData.steps.length}
            <button class="nav-button next" on:click={() => handleStepClick(processData.steps.find(s => s.id === selectedStep.id + 1))}>
              Next Step →
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .process-map-container {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  
  svg {
    display: block;
  }
  
  .step-box-group {
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .step-box-group:hover .step-box {
    filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.15));
    transform: translateY(-2px);
  }
  
  .step-box {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    transform: translateY(0);
  }
  
  .step-title {
    font-family: Arial, sans-serif;
    font-size: 15px;
    color: #333;
    padding: 2;
    margin: 0;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
    line-height: 1.3;
  }
  
  .connection-line {
    transition: stroke 0.3s ease;
  }
  
  .arrow-head {
    transition: fill 0.3s ease;
  }

  /* Modal styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 1rem;
  }
  
  .modal-content {
    background-color: white;
    border-radius: 8px;
    width: 100%;
    max-width: 700px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    position: relative;
  }
  
  .modal-header {
    padding: 1.5rem;
    border-bottom: 1px solid #eee;
    border-left: 5px solid;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  
  .header-content {
    flex: 1;
  }
  
  .modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    width: 40px;
    height: 40px;
    min-width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s ease;
    margin-left: 15px;
    margin-top: -10px;
  }
  
  .close-button:hover {
    background-color: #f0f0f0;
  }
  
  .phase-tag {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    color: white;
    font-size: 0.9rem;
    font-weight: bold;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  
  .description {
    font-size: 1rem;
    line-height: 1.6;
    color: #333;
    margin-bottom: 1.5rem;
  }
  
  .modal-body h3 {
    font-size: 1.2rem;
    color: #333;
    margin: 1.5rem 0 0.75rem 0;
  }
  
  .considerations-list, .resources-list {
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .considerations-list li, .resources-list li {
    margin-bottom: 0.5rem;
  }
  
  .resources-list a {
    color: #3498db;
    text-decoration: none;
  }
  
  .resources-list a:hover {
    text-decoration: underline;
  }
  
  .modal-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #eee;
  }
  
  .step-navigation {
    display: flex;
    justify-content: space-between;
  }
  
  .nav-button {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .nav-button:hover {
    background-color: #e9ecef;
  }
  
  .nav-button.prev {
    margin-right: auto;
  }
  
  .nav-button.next {
    margin-left: auto;
  }
  
  /* Ensure SVG is responsive */
  :global(.process-map-container svg) {
    min-width: 800px;
  }
</style>
