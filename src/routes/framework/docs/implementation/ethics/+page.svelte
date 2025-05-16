<!-- src/routes/framework/docs/implementation/ethics/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import { onMount, afterUpdate } from 'svelte';

  export let data;

  // Enhanced print mode handling
  $: if (isPrintMode) {
    // Immediately show all sections when in print mode
    sectionsToShow = data.availableSections[currentLevel];
    
    // Make sure all content is visible
    if (browser) {
      setTimeout(() => {
        const sections = document.querySelectorAll('.section-content');
        sections.forEach(section => {
          section.style.display = 'block';
          section.style.visibility = 'visible';
          section.style.opacity = '1';
          section.style.height = 'auto';
        });
      }, 1000);
    }
  }

  // Keep track of which section is active
  let activeSection = 'index';

  // Add a new state variable to track the currently selected guide
  let selectedGuide = null;

  // Function to select a guide and display its content
  function selectGuide(guide) {
    if (guide && data.sections[guide] && (data.sections[guide][currentLevel] || data.sections[guide]['standard'])) {
      selectedGuide = guide;
      // If we have the guide at the current level, use that; otherwise fall back to standard
      selectedGuideContent = data.sections[guide][currentLevel] || data.sections[guide]['standard'];
    } else {
      selectedGuide = null;
      selectedGuideContent = null;
    }
  }

  // Track the content of the selected guide
  let selectedGuideContent = null;

  // Map of guide IDs to display info
  const guides = {
    'youth-guide': { emoji: '🌱', title: 'Youth Guide', description: 'Framework concepts for young changemakers' },
    'community-guide': { emoji: '🏘️', title: 'Community Guide', description: 'Implementing the framework in local communities' },
    'policy-guide': { emoji: '📑', title: 'Policy Guide', description: 'For policymakers and government officials' },
    'educators-guide': { emoji: '🎓', title: 'Educators Guide', description: 'Teaching framework concepts in educational settings' },
    'crisis-guide': { emoji: '🚨', title: 'Crisis Situations Guide', description: 'Ethical decision-making during emergencies' },
    'indigenous-communities-guide': { emoji: '🌎', title: 'Indigenous Communities Guide', description: 'Framework implementation respecting Indigenous knowledge' },
    'religious-communities-guide': { emoji: '🕊️', title: 'Religious Communities Guide', description: 'Framework alignment with faith traditions' }
  };

  // Get available guides from the loaded content
  $: availableGuides = Object.keys(guides).filter(guide => 
    data.sections[guide] && (data.sections[guide][currentLevel] || data.sections[guide]['standard'])
  );

  // Check if there are any guides available
  $: hasGuides = availableGuides.length > 0;
  
  // Add support for accessibility level selection
  $: currentLevel = data.currentLevel || 'standard';
  $: accessibilityLevels = data.accessibilityLevels || ['visual', 'essential', 'standard', 'technical'];
  
  // Function to change the accessibility level
  function changeLevel(level) {
    if (browser) {
      window.location.href = constructLevelChangeUrl(level);
    }
  }

  // Function to construct the correct URL for changing levels
  function constructLevelChangeUrl(newLevel) {
    // The base path for the framework
    const basePath = `${base}/framework/docs/implementation/ethics`;
    
    // Check if the current section is available at the target level
    const targetSection = data.availableSections[newLevel].includes(activeSection) 
      ? activeSection
      : findFallbackSection(newLevel);
    
    // Construct the URL with the appropriate section
    return `${basePath}?level=${newLevel}#${targetSection}`;
  }

  // Function to fix internal links after content is loaded
  function fixInternalLinks() {
    if (browser) {
      // Select all links in the content
      const links = document.querySelectorAll('.section-content a');
      
      links.forEach(link => {
        const href = link.getAttribute('href');
        
        // Only process internal links to the framework
        if (href && (
          href.includes('/framework/docs/implementation/ethics/') ||
          href.startsWith('#')
        )) {
          // Handle different link patterns
          if (href.includes('/framework/docs/implementation/ethics/')) {
            // Extract the section and level from the link
            // Pattern: /framework/docs/implementation/ethics/LEVEL/SECTION
            const parts = href.split('/');
            const linkLevel = parts[parts.length - 2]; // The level (visual, essential, standard, technical)
            const linkSection = parts[parts.length - 1]; // The section identifier
            
            // Create the correct URL format for our system
            const newHref = `${base}/framework/docs/implementation/ethics?level=${linkLevel}#${linkSection}`;
            link.setAttribute('href', newHref);
            
            // Completely replace the link href with the new format
            link.setAttribute('href', newHref);
            
            // Remove any click handlers and rely on the correctly structured href
            link.removeEventListener('click', () => {});
          } else if (href.startsWith('#')) {
            // Handle in-page anchor links
            const targetSection = href.substring(1);
            
            // Convert simple hash links to our section format if they match a section
            if (data.availableSections[currentLevel].includes(targetSection)) {
              const newHref = `${base}/framework/docs/implementation/ethics?level=${currentLevel}#${targetSection}`;
              link.setAttribute('href', newHref);
            }
          }
        }
      });
    }
  }

  // Call the link fixing function after content updates
  afterUpdate(() => {
    setTimeout(fixInternalLinks, 100);
  });
  
  // Helper to find a fallback section when the current one isn't available
  function findFallbackSection(level) {
    // Priority order for fallback sections
    const preferredSections = ['index', '0-preamble', '1-introduction'];
    
    // Try each preferred section in order
    for (const section of preferredSections) {
      if (data.availableSections[level].includes(section)) {
        return section;
      }
    }
    
    // If none of the preferred sections are available, use the first available section
    return data.availableSections[level].length > 0 
      ? data.availableSections[level][0] 
      : 'index'; // Final fallback
  }

  onMount(() => {
    if (browser) {
      // First handle any section query parameter and hash
      const params = new URLSearchParams(window.location.search);
      const sectionParam = params.get('section');
      const hash = window.location.hash ? window.location.hash.substring(1) : null;
      
      // Determine which section to show
      let sectionToShow = null;
      
      // Priority: 1. Section parameter, 2. Hash, 3. Default first section
      if (sectionParam && data.availableSections[currentLevel].includes(sectionParam)) {
        sectionToShow = sectionParam;
      } else if (hash && data.availableSections[currentLevel].includes(hash)) {
        sectionToShow = hash;
      } else if (data.availableSections[currentLevel].includes('index')) {
        sectionToShow = 'index';
      } else if (data.availableSections[currentLevel].length > 0) {
        sectionToShow = data.availableSections[currentLevel][0];
      }
      
      if (sectionToShow) {
        setActiveSection(sectionToShow);
      }
      
      // Set up a window.onhashchange handler to handle navigation
      window.onhashchange = () => {
        const newHash = window.location.hash.substring(1);
        if (newHash && data.availableSections[currentLevel].includes(newHash)) {
          setActiveSection(newHash);
        }
      };
      
      // Fix any internal links in the content
      setTimeout(fixInternalLinks, 100);
    }
  });

  // Function to set active section
  function setActiveSection(section) {
    if (section && data.availableSections[currentLevel].includes(section)) {
      activeSection = section;
      
      // Update the URL hash to reflect the current section (without page reload)
      if (browser) {
        // Use the history API to update just the hash without changing the path
        const url = new URL(window.location.href);
        url.hash = section;
        
        // Replace state rather than push to avoid creating extra history entries
        history.replaceState(null, '', url.toString());
      }
    }
  }

  // Check if we're in print mode
  const isPrintMode = data.isPrintMode;

  // If in print mode, we'll show all sections
  // This is a special state just for PDF generation
  $: sectionsToShow = isPrintMode ? 
    data.availableSections[currentLevel] : 
    [activeSection];

  // Make this function available globally for the PDF generator
  if (browser) {
    window.showAllSectionsForPrint = () => {
      sectionsToShow = data.availableSections[currentLevel];
    };
  }

  // This will track the current locale for our component
  $: currentLocale = $locale;

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
  
  // Group the sections by their main category for navigation
  function groupSections(sections) {
    const groups = {
      'preamble': [],
      'introduction': [],
      'foundational-values': [],
      'commitments': [],
      'governance': [],
      'implementation': [],
      'appendices': []
    };
    
    sections.forEach(section => {
      if (section.startsWith('0-') || section === 'index' || section === 'access-guide' || section === 'youth-guide') {
        groups['preamble'].push(section);
      } else if (section.startsWith('1-')) {
        groups['introduction'].push(section);
      } else if (section.startsWith('2')) {
        groups['foundational-values'].push(section);
      } else if (section.startsWith('3')) {
        groups['commitments'].push(section);
      } else if (section.startsWith('4')) {
        groups['governance'].push(section);
      } else if (section.startsWith('5')) {
        groups['implementation'].push(section);
      } else if (section.startsWith('6')) {
        groups['appendices'].push(section);
      }
    });
    
    return groups;
  }
  
  $: availableSectionsForLevel = data.availableSections[currentLevel] || [];
  $: sectionGroups = groupSections(availableSectionsForLevel);
  
  function getSectionTitle(section) {
    // This mapping translates section file names to display titles
    const titles = {
      'index': 'Overview',
      'access-guide': 'Access Guide',
      'youth-guide': 'Youth Guide',
      
      '0-preamble': 'Preamble',
      '1-introduction': 'Introduction',
      '2-foundational-values': 'Foundational Values & Living Principles',
      '2.3-global-ethical-traditions': 'Global Ethical Traditions',
      '2.5-rights-of-beings': 'Rights of Beings',
      '2.6-scientific-foundations': 'Scientific Foundations',
      
      '3-commitments': 'Human & Non-Human Rights Commitments',
      '3.1-traditional-rights': 'Traditional Rights',
      '3.2-emerging-rights': 'Emerging Rights',
      '3.2.1-ai-consciousness': 'AI Consciousness Assessment',
      '3.2.1a-assessment-hub-network': 'Assessment Hub Network',
      '3.2.1b-scientific-standards': 'Scientific Standards',
      '3.2.2-ambiguous-entities': 'Ambiguous Entities',
      '3.2.3-measurement-standards': 'Measurement Standards',
      '3.2.4-recognition-pathways': 'Recognition Pathways',
      '3.2.5-non-western-recognition': 'Non-Western Recognition',
      '3.3-conflict-resolution': 'Conflict Resolution',
      '3.3.1-moon-wish-test': 'Moon Wish Test',
      
      '4-governance-mechanisms': 'Governance Mechanisms',
      '4.1-transparency': 'Transparency',
      '4.2-inclusive-decision-making': 'Inclusive Decision-Making',
      '4.3-conflict-resolution': 'Conflict Resolution',
      '4.4-guardianship-councils': 'Guardianship Councils',
      '4.4.1-enforcement-mechanisms': 'Enforcement Mechanisms',
      '4.4.2-non-compliance-strategy': 'Non-Compliance Strategy',
      '4.5-funding-model': 'Funding Model',
      '4.5.1-hub-sustainability': 'Hub Sustainability',
      '4.5.2-resource-optimization': 'Resource Optimization',
      '4.6-governance-accountability': 'Governance Accountability',
      '4.7-entity-conflict-resolution': 'Entity Conflict Resolution',
      '4.8-interoperability': 'Interoperability',
      '4.9-decision-making': 'Decision-Making',
      '4.10-coordination-mechanisms': 'Coordination Mechanisms',
      
      '5-implementation': 'Implementation',
      '5.1-quick-wins': 'Quick Wins',
      '5.1.1-cost-analysis': 'Cost Analysis',
      '5.2-phased-rollout': 'Phased Rollout',
      '5.2.1-space-ethics': 'Space Ethics',
      '5.3-education-accessibility': 'Education & Accessibility',
      '5.3.1-resource-constraint': 'Resource Constraint',
      '5.3.2-cultural-accessibility': 'Cultural Accessibility',
      '5.3.3-knowledge-integration': 'Knowledge Integration',
      '5.4-global-cooperation': 'Global Cooperation',
      '5.5-monitoring': 'Monitoring',
      '5.6-public-engagement': 'Public Engagement',
      '5.7-stakeholder-strategy': 'Stakeholder Strategy',
      '5.7.1-consensus-building': 'Consensus Building',
      '5.7.2-resistant-stakeholder': 'Resistant Stakeholder',
      '5.8-resistance-handling': 'Resistance Handling',
      '5.8.1-opposition-response': 'Opposition Response',
      '5.8.2-learning-system': 'Learning System',
      '5.9-benchmarks-metrics': 'Benchmarks & Metrics',
      '5.10-scenario-planning': 'Scenario Planning',
      '5.11-accessibility-matrix': 'Accessibility Matrix',
      
      '6-appendices': 'Appendices',
      '6.1-emerging-rights-toolkit': 'Emerging Rights Toolkit',
      '6.2-case-studies': 'Case Studies',
      '6.3-ethical-forecasting': 'Ethical Forecasting',
      '6.3.1-speculative-paradigm': 'Speculative Paradigm',
      '6.3.2-validation-protocols': 'Validation Protocols',
      '6.4-reporting-portal': 'Reporting Portal',
      '6.5-plain-language': 'Plain Language',
      '6.6-edge-case-protocols': 'Edge Case Protocols',
      '6.7-philosophy-of-rights': 'Philosophy of Rights',
      '6.8-spiral-aware-primer': 'Spiral-Aware Primer',
      '6.9-impact-assessment': 'Impact Assessment',
      '6.10-pioneer-pilots': 'Pioneer Pilots',
      '6.11-crisis-ethics': 'Crisis Ethics',
      '6.12-technical-protocols': 'Technical Protocols'
    };
    
    return titles[section] || section;
  }
  
  function getGroupTitle(group) {
    const titles = {
      'preamble': 'Introduction & Overview',
      'introduction': 'Introduction',
      'foundational-values': 'Foundational Values',
      'commitments': 'Rights Commitments',
      'governance': 'Governance Mechanisms',
      'implementation': 'Implementation',
      'appendices': 'Appendices'
    };
    
    return titles[group] || group;
  }
  
  // Get the first available section in a group
  function getFirstSectionInGroup(group) {
    if (sectionGroups[group] && sectionGroups[group].length > 0) {
      return sectionGroups[group][0];
    }
    return null;
  }
  
  // Check if a section exists at the current accessibility level
  function isSectionAvailable(section) {
    return data.availableSections[currentLevel].includes(section);
  }
  
  // Get the appropriate accessibility level icon
  function getLevelIcon(level) {
    const icons = {
      'visual': '🌱', // Seedling for visual overview
      'essential': '🌿', // Leaf for essential concepts
      'standard': '🌲', // Pine tree for standard framework
      'technical': '🌳'  // Deciduous tree for technical details
    };
    
    return icons[level] || '';
  }
  
  // Get the accessibility level description
  function getLevelDescription(level) {
    const descriptions = {
      'visual': 'Visual Overview - Quick visual summaries of key concepts',
      'essential': 'Essential Concepts - Simple explanations in everyday language',
      'standard': 'Standard Framework - Complete framework text',
      'technical': 'Technical Details - In-depth exploration for specialists'
    };
    
    return descriptions[level] || '';
  }

  // Check if we should show the access guide
  $: showAccessGuide = data.accessGuide && !isPrintMode;
</script>

<div class="documentation-container">
  {#if !isPrintMode}
    <FrameworkSidebar />
  {/if}

  <div class="content">
    {#if !isPrintMode}
      <!-- Accessibility Level Selector -->
      <div class="level-selector">
        <h3>Choose Your Level of Detail:</h3>
        <div class="level-buttons">
          {#each accessibilityLevels as level}
            <!-- Construct a link that preserves the current section if available -->
            <a 
              href={constructLevelChangeUrl(level)}
              class="level-btn" 
              class:active={currentLevel === level}
            >
              <span class="level-icon">{getLevelIcon(level)}</span>
              <span class="level-name">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
            </a>
          {/each}
        </div>
        <div class="level-description">
          {getLevelDescription(currentLevel)}
        </div>
      </div>

      <!-- Show Access Guide if available -->
      {#if showAccessGuide}
        <div class="access-guide-banner">
          <div class="banner-content">
            <h3>Framework Access Guide</h3>
            <p>This guide helps you navigate the framework at your preferred level of detail. Each section is available in multiple formats.</p>
            <button class="secondary-btn" on:click={() => setActiveSection('access-guide')}>
              View Complete Access Guide
            </button>
          </div>
        </div>
      {/if}
    {/if}

    {#if !isPrintMode}
      <!-- Guides Selector - Only show if guides are available -->
      {#if hasGuides}
        <div class="guides-selector">
          <h3>Specialized Framework Guides</h3>
          <div class="dropdown">
            <button class="guides-dropdown-btn">
              <span>🧭 {selectedGuide ? guides[selectedGuide].title : 'Select a Guide'}</span>
              <span class="arrow-icon">▾</span>
            </button>
            <div class="guides-dropdown-menu">
              {#each availableGuides as guide}
                <button 
                  class="guide-link" 
                  on:click={() => selectGuide(guide)}
                  class:active={selectedGuide === guide}
                >
                  <span class="guide-icon">{guides[guide].emoji}</span> 
                  {guides[guide].title}
                </button>
              {/each}
            </div>
          </div>
          <div class="guides-description">
            {selectedGuide 
              ? guides[selectedGuide].description 
              : 'Specialized versions of the framework tailored for different audiences and contexts'}
          </div>
        </div>

        <!-- Guide Content Display Area -->
        {#if selectedGuide && selectedGuideContent}
          <div class="guide-content">
            <div class="guide-header">
              <h2>{guides[selectedGuide].emoji} {guides[selectedGuide].title}</h2>
              <button class="close-guide-btn" on:click={() => selectGuide(null)}>
                ✕
              </button>
            </div>
            <div class="guide-body">
              <svelte:component this={selectedGuideContent.default} />
            </div>
          </div>
        {/if}
      {/if}
    {/if}

    {#if data.isModular}
      <!-- Main navigation for framework sections -->
      {#if !isPrintMode}
        <div class="section-nav">
          <ul>
            {#each Object.keys(sectionGroups) as group}
              {#if sectionGroups[group].length > 0}
                {#if sectionGroups[group].length === 1}
                  <!-- For groups with only one section, display as a regular button -->
                  <li class:active={activeSection === sectionGroups[group][0]}>
                    <button 
                      on:click={() => setActiveSection(sectionGroups[group][0])}
                    >
                      {getGroupTitle(group)}
                    </button>
                  </li>
                {:else}
                  <!-- For groups with multiple sections, keep as dropdown -->
                  <li class="dropdown-li" class:active={sectionGroups[group].includes(activeSection)}>
                    <button 
                      class="dropdown-toggle"
                      on:click={() => {
                        const firstSection = getFirstSectionInGroup(group);
                        if (firstSection) setActiveSection(firstSection);
                      }}
                    >
                      {getGroupTitle(group)} <span class="arrow-icon">▾</span>
                    </button>
                    <div class="dropdown-menu">
                      {#each sectionGroups[group] as section}
                        <button 
                          class="dropdown-item" 
                          class:active={activeSection === section}
                          on:click={() => setActiveSection(section)}
                        >
                          {getSectionTitle(section)}
                        </button>
                      {/each}
                    </div>
                  </li>
                {/if}
              {/if}
            {/each}
          </ul>
        </div>
      {/if}

      <!-- Show active section, or all sections in print mode -->
      {#each sectionsToShow as section}
        {#if data.sections[section] && data.sections[section][currentLevel]}
          <div class="section-content" id={section}>
            <div class="section-header">
              <h2>{getSectionTitle(section)}</h2>
              
              {#if !isPrintMode}
                <!-- Layer navigation for this section -->
                <div class="layer-navigation">
                  {#each accessibilityLevels as level}
                    {#if data.availableSections[level].includes(section)}
                      <a 
                        href={`${base}/framework/docs/implementation/ethics?level=${level}#${section}`} 
                        class="layer-link" 
                        class:active={currentLevel === level}
                      >
                        {getLevelIcon(level)} {level}
                      </a>
                    {/if}
                  {/each}
                </div>
              {/if}
            </div>
            
            <svelte:component this={data.sections[section][currentLevel].default} />
          </div>
        {:else if sectionsToShow.length === 1}
          <div class="section-unavailable">
            <p>This section is not available at the {currentLevel} level.</p>
            <div class="alternative-levels">
              <p>View this section at another level:</p>
              <div class="level-buttons small">
                {#each accessibilityLevels as level}
                  {#if data.availableSections[level].includes(section)}
                    <!-- Make this a link instead of a button for better navigation -->
                    <a 
                      href={`${base}/framework/docs/implementation/ethics?level=${level}#${section}`}
                      class="level-btn small"
                    >
                      <span class="level-icon">{getLevelIcon(level)}</span>
                      <span class="level-name">{level}</span>
                    </a>
                  {/if}
                {/each}
              </div>
            </div>
          </div>
        {/if}
      {/each}
    {:else}
      <!-- Legacy single file display -->
      <div class="legacy-content">
        <svelte:component this={data.component} />
      </div>
    {/if}
  </div>
</div>

<style>
  /* Updated styles with ethics-themed colors (green-based palette) */
  .documentation-container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  @media (max-width: 768px) {
    .documentation-container {
      grid-template-columns: 1fr;
    }
  }
  
  .content {
    min-width: 0;
  }
  
  /* Accessibility Level Selector */
  .level-selector {
    background-color: #f0fdf4; /* Light green background */
    border: 1px solid #22c55e; /* Green border */
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(34, 197, 94, 0.1);
  }
  
  .level-selector h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #166534; /* Dark green text */
  }
  
  .level-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  
  .level-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid #d1fae5;
    border-radius: 0.375rem;
    background-color: white;
    color: #166534;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .level-btn:hover {
    background-color: #d1fae5;
    border-color: #16a34a;
  }
  
  .level-btn.active {
    background-color: #16a34a;
    color: white;
    border-color: #16a34a;
  }
  
  .level-icon {
    font-size: 1.25rem;
  }
  
  .level-description {
    font-size: 0.875rem;
    color: #1f2937;
    line-height: 1.5;
    padding: 0.5rem;
    background-color: #ecfdf5;
    border-radius: 0.375rem;
  }
  
  /* Access Guide Banner */
  .access-guide-banner {
    background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.2);
  }
  
  .banner-content {
    padding: 1.5rem;
  }
  
  .banner-content h3 {
    margin: 0 0 0.5rem 0;
    color: #166534;
    font-size: 1.25rem;
  }
  
  .banner-content p {
    margin: 0 0 1rem 0;
    color: #374151;
  }
  
  /* Section Navigation */
  .section-nav {
    margin-bottom: 2rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .section-nav ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 0.5rem;
  }
  
  .section-nav li {
    position: relative;
  }
  
  .section-nav button {
    padding: 0.75rem 1rem;
    background: none;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    cursor: pointer;
    color: #374151;
    transition: all 0.2s;
    white-space: nowrap;
    font-size: 0.9375rem;
  }

  .section-nav .dropdown-li button.dropdown-toggle {
    /* Base styling */
    padding: 0.75rem 1rem;
    background: none;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    cursor: pointer;
    color: #374151;
    transition: all 0.2s;
    white-space: nowrap;
    font-size: 0.9375rem;
  }

  .section-nav .dropdown-li.active button.dropdown-toggle {
    /* Only subtle styling for dropdown buttons, even when active */
    color: #166534;
    border-color: #16a34a;
    background-color: #f0fdf4;
    font-weight: 500;
  }

  .section-nav button:not(.dropdown-toggle) {
    padding: 0.75rem 1rem;
    background: none;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    cursor: pointer;
    color: #374151;
    transition: all 0.2s;
    white-space: nowrap;
    font-size: 0.9375rem;
  }
  
  .section-nav li.active > button:not(.dropdown-toggle) {
    background-color: #16a34a;
    color: white;
    border-color: #16a34a;
  }

  .section-nav .dropdown-li.active > button.dropdown-toggle {
    color: #166534;
    border-color: #16a34a;
    background-color: #f0fdf4;
    font-weight: 500;
  }

  .section-nav .dropdown-item.active {
    background-color: #16a34a;
    color: white;
    font-weight: 500;
  }
  
  .section-nav button:hover {
    background-color: #f0fdf4;
    color: #166534;
    border-color: #16a34a;
  }

  .section-nav button:hover {
    background-color: #f0fdf4;
    color: #166534;
    border-color: #16a34a;
  }
  
  /* Dropdown Styles */
  .dropdown-li {
    position: relative;
  }
  
  .dropdown-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  }
  
  .arrow-icon {
    font-size: 0.75rem;
    margin-left: 0.25rem;
  }
  
  .dropdown-menu {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    z-index: 1000;
    display: none;
    min-width: 250px;
    max-width: 350px;
    padding: 0.5rem 0;
    margin: 0;
    background-color: white;
    border: 1px solid rgba(34, 197, 94, 0.3);
    border-radius: 0.375rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-height: calc(100vh - 200px);
    overflow-y: auto;
  }

  .dropdown-li::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 8px;
    background-color: transparent;
    z-index: 999;
  }
  
  .dropdown-li:hover .dropdown-menu {
    display: block;
  }
  
  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.625rem 1.25rem;
    text-align: left;
    border: none;
    background: none;
    color: #1f2937;
    font-size: 0.9375rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .dropdown-item:hover {
    background-color: #f0fdf4;
    color: #16a34a;
  }
  
  .dropdown-item.active {
    background-color: #16a34a;
    color: white;
    font-weight: 500;
  }

  .dropdown-item:hover:not(.active) {
    background-color: #f0fdf4;
    color: #16a34a;
  }
  
  /* Section Content */
  .section-content {
    padding-top: 1rem;
    margin-bottom: 3rem;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .section-header h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #166534;
    margin: 0;
  }
  
  .layer-navigation {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .layer-link {
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    color: #166534;
    text-decoration: none;
    background-color: #f0fdf4;
    transition: all 0.2s;
  }
  
  .layer-link:hover {
    background-color: #dcfce7;
  }
  
  .layer-link.active {
    background-color: #16a34a;
    color: white;
  }
  
  /* Section Unavailable Message */
  .section-unavailable {
    padding: 2rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;
    text-align: center;
    margin: 2rem 0;
  }
  
  .section-unavailable p {
    font-size: 1.125rem;
    color: #4b5563;
    margin-bottom: 1.5rem;
  }
  
  .alternative-levels {
    max-width: 500px;
    margin: 0 auto;
  }
  
  .level-buttons.small {
    justify-content: center;
  }
  
  .level-btn.small {
    font-size: 0.875rem;
    padding: 0.375rem 0.75rem;
  }
  
  /* Buttons */
  .primary-btn {
    background-color: #16a34a;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: #15803d;
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: #16a34a;
    border: 1px solid #16a34a;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: #f0fdf4;
    transform: translateY(-1px);
  }
  
  /* Markdown Content Styling */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #166534; /* Dark green for ethics framework */
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #166534; /* Dark green for ethics framework */
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #166534; /* Dark green for ethics framework */
  }
  
  .content :global(h4) {
    font-size: 1.125rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #166534; /* Dark green for ethics framework */
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #374151;
  }
  
  .content :global(ul), .content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    color: #374151;
  }
  
  .content :global(li) {
    margin-bottom: 0.5rem;
  }
  
  .content :global(blockquote) {
    background-color: #f0fdf4; /* Light green background */
    border-left: 4px solid #16a34a; /* Green for ethics framework */
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }
  
  .content :global(a) {
    color: #16a34a; /* Green for ethics framework */
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }
  
  .content :global(a:hover) {
    color: #15803d; /* Darker green on hover */
  }
  
  /* Table styles */
  .content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.95rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 0.375rem;
    overflow: hidden;
  }
  
  .content :global(thead) {
    background: linear-gradient(to right, #166534, #22c55e);
  }
  
  .content :global(td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }
  
  .content :global(tr:nth-child(odd)) {
    background-color: #f8f9fa;
  }
  
  .content :global(tr:nth-child(even)) {
    background-color: #ffffff;
  }
  
  .content :global(tr:hover) {
    background-color: #f0fdf4; /* Light green background on hover */
  }
  
  /* Figure and image styles */
  .content :global(figure) {
    margin: 2rem 0;
    text-align: center;
  }
  
  .content :global(figcaption) {
    font-size: 0.875rem;
    color: #4b5563;
    margin-top: 0.5rem;
    font-style: italic;
  }
  
  .content :global(img) {
    max-width: 100%;
    height: auto;
    border-radius: 0.375rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  /* Code blocks */
  .content :global(pre) {
    background-color: #f8fafc;
    border-radius: 0.375rem;
    padding: 1rem;
    overflow-x: auto;
    margin: 1.5rem 0;
    border: 1px solid #e5e7eb;
  }
  
  .content :global(code) {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 0.875rem;
    color: #16a34a;
  }
  
  /* Inline code */
  .content :global(:not(pre) > code) {
    background-color: #f0fdf4;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
  }
  
  /* Horizontal rule */
  .content :global(hr) {
    border: 0;
    height: 1px;
    background-color: #e5e7eb;
    margin: 2rem 0;
  }
  
  /* Custom bullet points for unordered lists */
  .content :global(ul) {
    list-style-type: none; /* Remove default bullets */
  }
  
  .content :global(ul li) {
    position: relative;
    padding-left: 1.5rem;
  }
  
  .content :global(ul li::before) {
    content: "✧"; /* Star symbol for ethics framework */
    position: absolute;
    left: 0;
    color: #16a34a; /* Green color */
    font-size: 0.9rem;
  }
  
  .content :global(ul ul li::before) {
    content: "⋄"; /* Diamond for nested items */
    color: #22c55e; /* Lighter green */
  }
  
  /* Citation styles for ethics framework */
  .content :global(cite) {
    font-style: italic;
    color: #4b5563;
  }

  /* Add styling for level-changing links */
  .content :global(a[href*="level="]:not([href*="level=standard"])) {
    /* Add a small indicator for links that change levels */
    position: relative;
  }
  
  .content :global(a[href*="level="]:not([href*="level=standard"])::after) {
    content: attr(data-level);
    position: absolute;
    top: -0.75em;
    right: -0.5em;
    font-size: 0.6em;
    background-color: #dcfce7;
    color: #166534;
    padding: 0.1em 0.4em;
    border-radius: 3px;
    opacity: 0.8;
  }

  /* Guides Selector */
  .guides-selector {
    background-color: #f0fdf4;
    border: 1px solid #22c55e;
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(34, 197, 94, 0.1);
  }

  .guides-selector h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #166534;
  }

  .dropdown {
    position: relative;
    display: inline-block;
    margin-bottom: 1rem;
  }

  /* Add a pseudo-element to create a "bridge" between the button and dropdown */
  .dropdown::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 10px; /* Bridge height - adjust as needed */
    background-color: transparent;
    z-index: 900;
  }

  .guides-dropdown-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 250px;
    padding: 0.75rem 1.25rem;
    background-color: white;
    border: 1px solid #16a34a;
    border-radius: 0.375rem;
    color: #166534;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .guides-dropdown-btn:hover {
    background-color: #d1fae5;
  }

  .guides-dropdown-menu {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    z-index: 1000;
    display: none;
    min-width: 250px;
    padding: 0.5rem 0;
    background-color: white;
    border: 1px solid rgba(34, 197, 94, 0.3);
    border-radius: 0.375rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .dropdown:hover .guides-dropdown-menu {
    display: block;
  }

  .guide-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.25rem;
    width: 100%;
    text-align: left;
    border: none;
    background: none;
    color: #1f2937;
    cursor: pointer;
    transition: all 0.2s;
  }

  .guide-link:hover {
    background-color: #f0fdf4;
    color: #16a34a;
  }

  .guide-link.active {
    background-color: #16a34a;
    color: white;
  }

  .guide-icon {
    font-size: 1.25rem;
  }

  .guides-description {
    font-size: 0.875rem;
    color: #1f2937;
    line-height: 1.5;
    padding: 0.5rem;
    background-color: #ecfdf5;
    border-radius: 0.375rem;
  }

  /* Guide Content Styles */
  .guide-content {
    margin-bottom: 3rem;
    padding: 1.5rem;
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .guide-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .guide-header h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #166534;
    margin: 0;
  }

  .close-guide-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: none;
    background-color: #f0fdf4;
    color: #166534;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .close-guide-btn:hover {
    background-color: #dcfce7;
  }

  .guide-body {
    line-height: 1.7;
  }
    
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .layer-navigation {
      width: 100%;
      justify-content: flex-start;
    }
    
    .level-buttons {
      justify-content: center;
    }
    
    .dropdown-menu {
      position: static;
      display: none;
      width: 100%;
      max-width: none;
    }
    
    .dropdown-li:hover .dropdown-menu {
      display: block;
    }
  }
  
  @media (max-width: 480px) {
    .level-btn {
      width: 100%;
      justify-content: center;
    }
    
    .section-nav ul {
      flex-direction: column;
      width: 100%;
    }
    
    .section-nav li {
      width: 100%;
    }
    
    .section-nav button {
      width: 100%;
      text-align: left;
    }

    .guides-dropdown-btn {
      width: 100%;
    }
    
    .guides-dropdown-menu {
      width: 100%;
    }
  }
  
  /* Print mode adjustments */
  @media print {
    /* Force all content to be visible */
    body * {
      visibility: visible !important;
      opacity: 1 !important;
      display: block !important;
    }
    
    /* Hide navigation and interactive elements */
    .level-selector, .section-nav, .guides-selector,
    .dropdown, .dropdown-menu, .dropdown-li,
    .close-guide-btn, .layer-navigation {
      display: none !important;
    }
    
    /* Ensure proper spacing for print */
    .section-content {
      page-break-inside: avoid;
      page-break-after: always;
      margin-bottom: 2cm !important;
    }
    
    /* Adjust header sizes for print */
    h1 { font-size: 24pt !important; }
    h2 { font-size: 18pt !important; }
    h3 { font-size: 14pt !important; }
    
    /* Ensure proper link display */
    a::after {
      content: " (" attr(href) ")";
      font-size: 80%;
      font-weight: normal;
      color: #666;
    }
  }
</style>
