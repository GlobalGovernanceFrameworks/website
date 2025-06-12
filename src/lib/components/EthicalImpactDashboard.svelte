<script>
  import { onMount } from 'svelte';
  import { locale } from '$lib/i18n';
  
  // Embedded translations
  const translations = {
    en: {
      header: {
        title: "📊 Framework Performance Dashboard",
        subtitle: "Interactive comparison of our governance frameworks across key ethical dimensions"
      },
      legends: {
        frameworks: "📋 Select Frameworks:",
        dimensions: "🎯 Select Dimensions:"
      },
      frameworks: {
        // Tier 1: Urgent Global Stability & Justice
        climateEnergy: "Climate & Energy Governance",
        peaceConflict: "Peace & Conflict Resolution",
        healthcare: "Healthcare Governance", 
        foodSystems: "Food Systems & Agriculture",
        economicIntegration: "Economic Integration",
        justiceSystems: "Justice Systems",
        disasterRisk: "Disaster Risk Reduction & Resilience",
        
        // Tier 2: Systems for Long-Term Thriving
        technology: "Technology Governance",
        financialSystems: "Financial Systems",
        educationalSystems: "Educational Systems",
        waterSanitation: "Water & Sanitation",
        environmentalStewardship: "Environmental Stewardship",
        animalWelfare: "Animal Welfare",
        biodiversityGovernance: "Biodiversity Governance",
        
        // Tier 3: Equity, Culture & Future Generations
        digitalCommons: "Digital Commons",
        religiousDialogue: "Religious & Spiritual Dialogue",
        globalEthics: "Global Ethics & Human Rights",
        agingPopulation: "Aging Population Support",
        
        // Tier 4: Visionary & Meta Governance
        consciousness: "Consciousness & Inner Development",
        metaGovernance: "Integrated Meta-Governance",
        implementationMethods: "Implementation Methods & Tools",
        
      },
      dimensions: {
        equity: "Equity & Justice",
        sustainability: "Sustainability",
        transparency: "Transparency",
        participation: "Participation",
        innovation: "Innovation",
        scalability: "Scalability"
      },
      emptyState: "👆 Select frameworks and dimensions above to view the comparison chart",
      insights: {
        title: "💡 Key Insights",
        topPerformer: "Top Performer",
        leadsIn: "leads in",
        averageScores: "Average Scores"
      },
      footer: {
        methodology: "📊 Methodology: Scores based on peer review, stakeholder surveys, and implementation impact assessment",
        updated: "🔄 Updated quarterly with community feedback and real-world performance data"
      }
    },
    sv: {
      header: {
        title: "📊 Ramverk Prestanda Dashboard",
        subtitle: "Interaktiv jämförelse av våra styrningsramverk över viktiga etiska dimensioner"
      },
      legends: {
        frameworks: "📋 Välj Ramverk:",
        dimensions: "🎯 Välj Dimensioner:"
      },
      frameworks: {
        // Tier 1: Urgent Global Stability & Justice
        climateEnergy: "Klimat & Energi Styrning",
        peaceConflict: "Fred & Konfliktlösning",
        healthcare: "Hälsovård Styrning", 
        foodSystems: "Livsmedelssystem & Jordbruk",
        economicIntegration: "Ekonomisk Integration",
        justiceSystems: "Rättvisesystem",
        disasterRisk: "Katastrofrisk Minskning & Motståndskraft",
        
        // Tier 2: Systems for Long-Term Thriving
        technology: "Teknologi Styrning",
        financialSystems: "Finansiella System",
        educationalSystems: "Utbildningssystem",
        waterSanitation: "Vatten & Sanitet",
        environmentalStewardship: "Miljöförvaltning",
        animalWelfare: "Djurvälfärd",
        biodiversityGovernance: "Biodiversitet Styrning",
        
        // Tier 3: Equity, Culture & Future Generations
        digitalCommons: "Digitala Allmänningar",
        religiousDialogue: "Religiös & Andlig Dialog",
        globalEthics: "Global Etik & Mänskliga Rättigheter",
        agingPopulation: "Åldrande Befolkning Stöd",
        
        // Tier 4: Visionary & Meta Governance
        consciousness: "Medvetenhet & Inre Utveckling",
        metaGovernance: "Integrerad Meta-Styrning",
        implementationMethods: "Implementeringsmetoder & Verktyg",
        
      },
      dimensions: {
        equity: "Rättvisa & Jämställdhet",
        sustainability: "Hållbarhet",
        transparency: "Transparens",
        participation: "Deltagande",
        innovation: "Innovation",
        scalability: "Skalbarhet"
      },
      emptyState: "👆 Välj ramverk och dimensioner ovan för att se jämförelsediagrammet",
      insights: {
        title: "💡 Viktiga Insikter",
        topPerformer: "Toppresultat",
        leadsIn: "leder inom",
        averageScores: "Genomsnittliga Poäng"
      },
      footer: {
        methodology: "📊 Metodik: Poäng baserade på expertbedömning, intressentundersökningar och implementeringskonsekvensanalys",
        updated: "🔄 Uppdateras kvartalsvis med community-feedback och verklig prestanda data"
      }
    }
  };

  // Simple translation function
  function getText(key, lang = 'en') {
    const keys = key.split('.');
    let result = translations[lang] || translations.en;
    for (const k of keys) {
      result = result?.[k];
      if (!result) break;
    }
    return result || translations.en[keys[0]] || key;
  }

  // Current language
  let currentLang = 'en';
  
  // Watch locale changes
  $: if ($locale) {
    currentLang = $locale;
  }

  // Static framework data
  const frameworksData = [
    // Tier 1: Urgent Global Stability & Justice
    {
      id: 'climate-energy',
      emoji: "🌡️",
      nameKey: 'climateEnergy',
      scores: { equity: 88, sustainability: 98, transparency: 85, participation: 87, innovation: 92, scalability: 89 },
      color: "#059669"
    },
    {
      id: 'peace-conflict',
      emoji: "🕊️",
      nameKey: 'peaceConflict',
      scores: { equity: 94, sustainability: 78, transparency: 88, participation: 95, innovation: 75, scalability: 82 },
      color: "#7c3aed"
    },
    {
      id: 'healthcare',
      emoji: "🏥",
      nameKey: 'healthcare',
      scores: { equity: 92, sustainability: 82, transparency: 87, participation: 88, innovation: 85, scalability: 90 },
      color: "#dc2626"
    },
    {
      id: 'food-systems',
      emoji: "🌾",
      nameKey: 'foodSystems',
      scores: { equity: 89, sustainability: 94, transparency: 83, participation: 91, innovation: 87, scalability: 85 },
      color: "#ea580c"
    },
    {
      id: 'economic-integration',
      emoji: "💰",
      nameKey: 'economicIntegration',
      scores: { equity: 85, sustainability: 80, transparency: 78, participation: 82, innovation: 88, scalability: 92 },
      color: "#3A6EA5"
    },
    {
      id: 'justice-systems',
      emoji: "⚖️",
      nameKey: 'justiceSystems',
      scores: { equity: 96, sustainability: 79, transparency: 94, participation: 89, innovation: 81, scalability: 84 },
      color: "#10b981"
    },
    {
      id: 'disaster-risk',
      emoji: "🛡️",
      nameKey: 'disasterRisk',
      scores: { equity: 88, sustainability: 85, transparency: 92, participation: 86, innovation: 88, scalability: 91 },
      color: "#ea580c"
    },
    
    // Tier 2: Systems for Long-Term Thriving
    {
      id: 'technology',
      emoji: "💻",
      nameKey: 'technology',
      scores: { equity: 84, sustainability: 86, transparency: 89, participation: 83, innovation: 96, scalability: 94 },
      color: "#2563eb"
    },
    {
      id: 'financial-systems',
      emoji: "🏦",
      nameKey: 'financialSystems',
      scores: { equity: 93, sustainability: 87, transparency: 84, participation: 89, innovation: 91, scalability: 82 },
      color: "#3A6EA5"
    },
    {
      id: 'educational-systems',
      emoji: "🎓",
      nameKey: 'educationalSystems',
      scores: { equity: 91, sustainability: 83, transparency: 86, participation: 93, innovation: 89, scalability: 88 },
      color: "#3f51b5"
    },
    {
      id: 'water-sanitation',
      emoji: "💧",
      nameKey: 'waterSanitation',
      scores: { equity: 95, sustainability: 92, transparency: 87, participation: 90, innovation: 84, scalability: 86 },
      color: "#0369a1"
    },
    {
      id: 'environmental-stewardship',
      emoji: "🌿",
      nameKey: 'environmentalStewardship',
      scores: { equity: 87, sustainability: 97, transparency: 85, participation: 89, innovation: 86, scalability: 84 },
      color: "#059669"
    },
    {
      id: 'animal-welfare',
      emoji: "🐾",
      nameKey: 'animalWelfare',
      scores: { equity: 90, sustainability: 89, transparency: 82, participation: 85, innovation: 78, scalability: 79 },
      color: "#7c2d12"
    },
    {
      id: 'biodiversity-governance',
      emoji: "🦋",
      nameKey: 'biodiversityGovernance',
      scores: { equity: 86, sustainability: 96, transparency: 84, participation: 88, innovation: 85, scalability: 83 },
      color: "#16a34a"
    },
    
    // Tier 3: Equity, Culture & Future Generations
    {
      id: 'digital-commons',
      emoji: "🌐",
      nameKey: 'digitalCommons',
      scores: { equity: 92, sustainability: 88, transparency: 95, participation: 89, innovation: 85, scalability: 87 },
      color: "#2563eb"
    },
    {
      id: 'religious-dialogue',
      emoji: "🕉️",
      nameKey: 'religiousDialogue',
      scores: { equity: 94, sustainability: 82, transparency: 79, participation: 91, innovation: 76, scalability: 73 },
      color: "#7c3aed"
    },
    {
      id: 'global-ethics',
      emoji: "🌍",
      nameKey: 'globalEthics',
      scores: { equity: 97, sustainability: 85, transparency: 91, participation: 87, innovation: 82, scalability: 86 },
      color: "#8B5CF6"
    },
    {
      id: 'aging-population',
      emoji: "👴",
      nameKey: 'agingPopulation',
      scores: { equity: 93, sustainability: 81, transparency: 83, participation: 86, innovation: 79, scalability: 85 },
      color: "#9333ea"
    },
    
    // Tier 4: Visionary & Meta Governance
    {
      id: 'consciousness',
      emoji: "🧠",
      nameKey: 'consciousness',
      scores: { equity: 85, sustainability: 87, transparency: 81, participation: 84, innovation: 93, scalability: 77 },
      color: "#6366f1"
    },
    {
      id: 'meta-governance',
      emoji: "🔄",
      nameKey: 'metaGovernance',
      scores: { equity: 89, sustainability: 84, transparency: 95, participation: 92, innovation: 88, scalability: 94 },
      color: "#8b5cf6"
    },
    {
      id: 'implementation-methods',
      emoji: "🛠️",
      nameKey: 'implementationMethods',
      scores: { equity: 86, sustainability: 83, transparency: 89, participation: 90, innovation: 87, scalability: 96 },
      color: "#64748b"
    }
  ];

  const dimensionsData = [
    { key: 'equity', icon: '⚖️', color: '#10b981' },
    { key: 'sustainability', icon: '🌍', color: '#059669' },
    { key: 'transparency', icon: '🔍', color: '#3b82f6' },
    { key: 'participation', icon: '🤝', color: '#8b5cf6' },
    { key: 'innovation', icon: '💡', color: '#f59e0b' },
    { key: 'scalability', icon: '📈', color: '#ef4444' }
  ];

  // State management
  let selectedFrameworks = ['climate-energy', 'peace-conflict', 'healthcare', 'food-systems', 'economic-integration', 'justice-systems'];
  let selectedDimensions = ['equity', 'transparency', 'innovation'];
  let animationStarted = false;
  let hoveredPoint = null;

  // Chart dimensions
  const chartWidth = 800;
  const chartHeight = 400;
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const plotWidth = chartWidth - margin.left - margin.right;
  const plotHeight = chartHeight - margin.top - margin.bottom;

  onMount(() => {
    setTimeout(() => {
      animationStarted = true;
    }, 300);
  });

  // Toggle functions
  function toggleFramework(frameworkId) {
    if (selectedFrameworks.includes(frameworkId)) {
      selectedFrameworks = selectedFrameworks.filter(id => id !== frameworkId);
    } else {
      selectedFrameworks = [...selectedFrameworks, frameworkId];
    }
  }

  function toggleDimension(dimensionKey) {
    if (selectedDimensions.includes(dimensionKey)) {
      selectedDimensions = selectedDimensions.filter(key => key !== dimensionKey);
    } else {
      selectedDimensions = [...selectedDimensions, dimensionKey];
    }
  }

  // Get filtered data
  $: filteredFrameworks = frameworksData.filter(f => selectedFrameworks.includes(f.id));
  $: filteredDimensions = dimensionsData.filter(d => selectedDimensions.includes(d.key));

  // Chart scales
  $: xScale = plotWidth / Math.max(filteredFrameworks.length - 1, 1);
  $: yScale = plotHeight / 100;

  // Generate chart points
  $: chartData = filteredDimensions.map(dimension => ({
    dimension,
    points: filteredFrameworks.map((framework, index) => ({
      framework,
      x: margin.left + (index * xScale),
      y: margin.top + plotHeight - (framework.scores[dimension.key] * yScale),
      score: framework.scores[dimension.key]
    }))
  }));

  function getPathD(points) {
    if (points.length === 0) return '';
    return points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');
  }

  function handlePointHover(point, dimension) {
    hoveredPoint = { ...point, dimension };
  }

  function clearHover() {
    hoveredPoint = null;
  }
</script>

<!-- Dashboard Section Wrapper -->
<section class="dashboard-section">
  <div class="dashboard-container">
    <!-- Header -->
    <div class="dashboard-header">
      <h2 class="dashboard-title">{getText('header.title', currentLang)}</h2>
      <p class="dashboard-subtitle">{getText('header.subtitle', currentLang)}</p>
    </div>

    <!-- Legend Controls -->
    <div class="legend-container">
      <!-- Framework Legend -->
      <div class="legend-group">
        <h3 class="legend-title">{getText('legends.frameworks', currentLang)}</h3>
        <div class="legend-items">
          {#each frameworksData as framework (framework.id)}
            <button
              class="legend-item framework-legend"
              class:selected={selectedFrameworks.includes(framework.id)}
              style="--framework-color: {framework.color}"
              on:click={() => toggleFramework(framework.id)}
            >
              <span class="legend-emoji">{framework.emoji}</span>
              <span class="legend-text">{getText(`frameworks.${framework.nameKey}`, currentLang)}</span>
            </button>
          {/each}
        </div>
      </div>

      <!-- Dimension Legend -->
      <div class="legend-group">
        <h3 class="legend-title">{getText('legends.dimensions', currentLang)}</h3>
        <div class="legend-items">
          {#each dimensionsData as dimension (dimension.key)}
            <button
              class="legend-item dimension-legend"
              class:selected={selectedDimensions.includes(dimension.key)}
              style="--dimension-color: {dimension.color}"
              on:click={() => toggleDimension(dimension.key)}
            >
              <span class="legend-icon">{dimension.icon}</span>
              <span class="legend-text">{getText(`dimensions.${dimension.key}`, currentLang)}</span>
            </button>
          {/each}
        </div>
      </div>
    </div>

    <!-- Chart Container -->
    <div class="chart-container">
      {#if filteredFrameworks.length > 0 && filteredDimensions.length > 0}
        <svg width={chartWidth} height={chartHeight} class="chart-svg">
          <!-- Grid lines -->
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" stroke-width="1" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          <!-- Y-axis labels -->
          {#each [0, 20, 40, 60, 80, 100] as value}
            <g>
              <line 
                x1={margin.left} 
                x2={chartWidth - margin.right} 
                y1={margin.top + plotHeight - (value * yScale)} 
                y2={margin.top + plotHeight - (value * yScale)}
                stroke="#d1d5db" 
                stroke-width="1"
              />
              <text 
                x={margin.left - 10} 
                y={margin.top + plotHeight - (value * yScale) + 5}
                text-anchor="end" 
                class="axis-label"
              >
                {value}
              </text>
            </g>
          {/each}

          <!-- X-axis labels (Framework emojis) -->
          {#each filteredFrameworks as framework, index}
            <text 
              x={margin.left + (index * xScale)} 
              y={chartHeight - margin.bottom + 25}
              text-anchor="middle" 
              class="axis-emoji"
            >
              {framework.emoji}
            </text>
            <text 
              x={margin.left + (index * xScale)} 
              y={chartHeight - margin.bottom + 45}
              text-anchor="middle" 
              class="axis-label-small"
            >
              {getText(`frameworks.${framework.nameKey}`, currentLang).split(' ')[0]}
            </text>
          {/each}

          <!-- Chart lines and points -->
          {#each chartData as lineData (lineData.dimension.key)}
            <g class="line-group" class:animated={animationStarted}>
              <!-- Line -->
              <path
                d={getPathD(lineData.points)}
                fill="none"
                stroke={lineData.dimension.color}
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="chart-line"
              />
              
              <!-- Points -->
              {#each lineData.points as point, index}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill={lineData.dimension.color}
                  stroke="white"
                  stroke-width="2"
                  class="chart-point"
                  class:hovered={hoveredPoint?.framework.id === point.framework.id && hoveredPoint?.dimension.key === lineData.dimension.key}
                  on:mouseenter={() => handlePointHover(point, lineData.dimension)}
                  on:mouseleave={clearHover}
                />
              {/each}
            </g>
          {/each}

          <!-- Tooltip -->
          {#if hoveredPoint}
            <g class="tooltip">
              <rect
                x={hoveredPoint.x - 60}
                y={hoveredPoint.y - 50}
                width="120"
                height="40"
                fill="rgba(0, 0, 0, 0.9)"
                rx="6"
              />
              <text
                x={hoveredPoint.x}
                y={hoveredPoint.y - 30}
                text-anchor="middle"
                class="tooltip-text"
                fill="white"
              >
                {hoveredPoint.framework.emoji} {hoveredPoint.dimension.icon}
              </text>
              <text
                x={hoveredPoint.x}
                y={hoveredPoint.y - 15}
                text-anchor="middle"
                class="tooltip-score"
                fill="white"
              >
                {hoveredPoint.score}%
              </text>
            </g>
          {/if}
        </svg>
      {:else}
        <div class="empty-state">
          <p>{getText('emptyState', currentLang)}</p>
        </div>
      {/if}
    </div>

    <!-- Insights -->
    {#if filteredFrameworks.length > 0 && filteredDimensions.length > 0}
      <div class="insights-container">
        <h3 class="insights-title">{getText('insights.title', currentLang)}</h3>
        <div class="insights-grid">
          <div class="insight-card">
            <h4>{getText('insights.topPerformer', currentLang)}</h4>
            <p>
              {#each filteredDimensions as dimension}
                {@const topFramework = filteredFrameworks.reduce((best, current) => 
                  current.scores[dimension.key] > best.scores[dimension.key] ? current : best
                )}
                <span class="insight-highlight">
                  {topFramework.emoji} {getText('insights.leadsIn', currentLang)} {getText(`dimensions.${dimension.key}`, currentLang)} ({topFramework.scores[dimension.key]}%)
                </span><br>
              {/each}
            </p>
          </div>
          <div class="insight-card">
            <h4>{getText('insights.averageScores', currentLang)}</h4>
            <p>
              {#each filteredDimensions as dimension}
                {@const avg = Math.round(filteredFrameworks.reduce((sum, f) => sum + f.scores[dimension.key], 0) / filteredFrameworks.length)}
                <span style="color: {dimension.color}">
                  {dimension.icon} {getText(`dimensions.${dimension.key}`, currentLang)}: {avg}%
                </span><br>
              {/each}
            </p>
          </div>
        </div>
      </div>
    {/if}

    <!-- Footer -->
    <div class="dashboard-footer">
      <p>{getText('footer.methodology', currentLang)}</p>
      <p>{getText('footer.updated', currentLang)}</p>
    </div>
  </div>
</section>

<style>
  .dashboard-section {
    padding: 4rem 0;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    position: relative;
  }

  .dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  }

  .dashboard-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .dashboard-title {
    font-size: 2.25rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .dashboard-title::first-letter {
    background: none;
    -webkit-text-fill-color: initial;
  }

  .dashboard-subtitle {
    font-size: 1.1rem;
    color: #64748b;
    margin: 0;
    max-width: 600px;
    margin: 0 auto;
  }

  .legend-container {
    display: grid;
    gap: 2rem;
    margin-bottom: 3rem;
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .legend-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .legend-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #374151;
    margin: 0;
  }

  .legend-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    background: #f9fafb;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .legend-item:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .framework-legend.selected {
    border-color: var(--framework-color);
    background: var(--framework-color);
    color: white;
  }

  .dimension-legend.selected {
    border-color: var(--dimension-color);
    background: var(--dimension-color);
    color: white;
  }

  .legend-emoji {
    font-size: 1.2rem;
  }

  .legend-icon {
    font-size: 1.1rem;
  }

  .legend-text {
    white-space: nowrap;
  }

  .chart-container {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
    overflow-x: auto;
  }

  .chart-svg {
    width: 100%;
    height: auto;
  }

  .axis-label {
    font-size: 12px;
    fill: #64748b;
    font-weight: 500;
  }

  .axis-emoji {
    font-size: 24px;
  }

  .axis-label-small {
    font-size: 10px;
    fill: #64748b;
    font-weight: 500;
  }

  .line-group {
    opacity: 0;
    transition: opacity 0.8s ease;
  }

  .line-group.animated {
    opacity: 1;
  }

  .chart-line {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: drawLine 2s ease-out forwards;
  }

  .chart-point {
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .chart-point:hover,
  .chart-point.hovered {
    r: 8;
    stroke-width: 3;
  }

  .tooltip-text {
    font-size: 12px;
    font-weight: 600;
  }

  .tooltip-score {
    font-size: 14px;
    font-weight: 700;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #64748b;
    font-size: 1.1rem;
  }

  .insights-container {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  .insights-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1.5rem;
  }

  .insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .insight-card {
    background: #f8fafc;
    padding: 1.5rem;
    border-radius: 12px;
    border-left: 4px solid #3b82f6;
  }

  .insight-card h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.75rem;
  }

  .insight-card p {
    color: #4b5563;
    line-height: 1.6;
    margin: 0;
  }

  .insight-highlight {
    font-weight: 600;
    color: #1e293b;
  }

  .dashboard-footer {
    text-align: center;
    padding: 2rem;
    border-top: 1px solid #e5e7eb;
    color: #64748b;
  }

  .dashboard-footer p {
    margin: 0.5rem 0;
    font-size: 0.9rem;
  }

  @keyframes drawLine {
    to {
      stroke-dashoffset: 0;
    }
  }

  @media (max-width: 768px) {
    .dashboard-container {
      padding: 0 1rem;
    }
    
    .dashboard-title {
      font-size: 1.8rem;
    }
    
    .legend-container {
      padding: 1.5rem;
    }
    
    .legend-items {
      flex-direction: column;
    }
    
    .legend-item {
      justify-content: center;
    }
    
    .chart-container {
      padding: 1rem;
      overflow-x: scroll;
    }
    
    .insights-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .dashboard-section {
      padding: 2rem 0;
    }
    
    .dashboard-header {
      margin-bottom: 2rem;
    }
    
    .legend-container {
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
  }
</style>
