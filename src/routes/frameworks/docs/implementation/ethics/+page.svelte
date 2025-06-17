<!-- src/routes/frameworks/docs/implementation/ethics/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import { onMount, afterUpdate } from 'svelte';
  import { slide } from 'svelte/transition';

  export let data;

  // Enhanced print mode handling
  $: if (isPrintMode) {
    sectionsToShow = data.availableSections[currentLevel];
    
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
    const basePath = `${base}/frameworks/docs/implementation/ethics`;
    const targetSection = data.availableSections[newLevel].includes(activeSection) 
      ? activeSection
      : findFallbackSection(newLevel);
    return `${basePath}?level=${newLevel}#${targetSection}`;
  }

  // Helper to find a fallback section when the current one isn't available
  function findFallbackSection(level) {
    const preferredSections = ['index', '0-preamble', '1-introduction'];
    
    for (const section of preferredSections) {
      if (data.availableSections[level].includes(section)) {
        return section;
      }
    }
    
    return data.availableSections[level].length > 0 
      ? data.availableSections[level][0] 
      : 'index';
  }

  onMount(() => {
    if (browser) {
      const params = new URLSearchParams(window.location.search);
      const sectionParam = params.get('section');
      const hash = window.location.hash ? window.location.hash.substring(1) : null;
      
      let sectionToShow = null;
      
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
      
      window.onhashchange = () => {
        const newHash = window.location.hash.substring(1);
        if (newHash && data.availableSections[currentLevel].includes(newHash)) {
          setActiveSection(newHash);
        }
      };
      
      setTimeout(fixInternalLinks, 100);
    }
  });

  // Function to set active section
  function setActiveSection(section) {
    if (section && data.availableSections[currentLevel].includes(section)) {
      activeSection = section;
      
      if (browser) {
        const url = new URL(window.location.href);
        url.hash = section;
        history.replaceState(null, '', url.toString());

        setTimeout(() => {
          const contentElement = document.querySelector('.section-content');
          if (contentElement) {
            contentElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }
        }, 100);
      }
    }
  }

  // Function to fix internal links after content is loaded
  function fixInternalLinks() {
    if (browser) {
      const links = document.querySelectorAll('.section-content a');
      
      links.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href && (
          href.includes('/frameworks/docs/implementation/ethics/') ||
          href.startsWith('#')
        )) {
          if (href.includes('/frameworks/docs/implementation/ethics/')) {
            const parts = href.split('/');
            const linkLevel = parts[parts.length - 2];
            const linkSection = parts[parts.length - 1];
            
            const newHref = `${base}/frameworks/docs/implementation/ethics?level=${linkLevel}#${linkSection}`;
            link.setAttribute('href', newHref);
          } else if (href.startsWith('#')) {
            const targetSection = href.substring(1);
            
            if (data.availableSections[currentLevel].includes(targetSection)) {
              const newHref = `${base}/frameworks/docs/implementation/ethics?level=${currentLevel}#${targetSection}`;
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

  // Check if we're in print mode
  const isPrintMode = data.isPrintMode;

  // If in print mode, we'll show all sections
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
  
  // Group the sections by their main category for navigation with level-aware structure
  function groupSectionsForLevel(sections, level) {
    const groups = {
      'overview': [],
      'introduction': [], // Combined preamble and introduction into one group
      'foundational-values': [],
      'commitments': [],
      'governance': [],
      'implementation': [],
      'appendices': []
    };
    
    sections.forEach(section => {
      if (section === 'index' || section === 'access-guide') {
        groups['overview'].push(section);
      } else if (section.startsWith('0-') || section === 'youth-guide' || section.startsWith('1-')) {
        // Combine preamble (0-) and introduction (1-) sections into one group
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
    
    // Create subcategories for complex sections
    const subcategorizedGroups = {};
    
    Object.keys(groups).forEach(group => {
      if (group === 'commitments' && groups[group].length > 0) {
        subcategorizedGroups[`${group}-traditional`] = groups[group].filter(s => 
          s.startsWith('3.1') || s === '3-commitments'
        );
        subcategorizedGroups[`${group}-emerging`] = groups[group].filter(s => 
          s.startsWith('3.2') && !s.startsWith('3.3')
        );
        subcategorizedGroups[`${group}-conflict`] = groups[group].filter(s => 
          s.startsWith('3.3')
        );
      } else if (group === 'governance' && groups[group].length > 0) {
        subcategorizedGroups[`${group}-basic`] = groups[group].filter(s => 
          ['4-governance-mechanisms', '4.1-transparency', '4.2-inclusive-decision-making', '4.3-conflict-resolution'].includes(s)
        );
        subcategorizedGroups[`${group}-councils`] = groups[group].filter(s => 
          s.startsWith('4.4')
        );
        subcategorizedGroups[`${group}-operations`] = groups[group].filter(s => 
          s.startsWith('4.5') || s.startsWith('4.6') || s.startsWith('4.7') || s.startsWith('4.8') || s.startsWith('4.9') || s.startsWith('4.10')
        );
      } else if (group === 'implementation' && groups[group].length > 0) {
        subcategorizedGroups[`${group}-planning`] = groups[group].filter(s => 
          ['5-implementation', '5.1-quick-wins', '5.1.1-cost-analysis', '5.2-phased-rollout', '5.2.1-space-ethics'].includes(s)
        );
        subcategorizedGroups[`${group}-education`] = groups[group].filter(s => 
          s.startsWith('5.3')
        );
        subcategorizedGroups[`${group}-cooperation`] = groups[group].filter(s => 
          s.startsWith('5.4') || s.startsWith('5.5') || s.startsWith('5.6') || s.startsWith('5.7')
        );
        subcategorizedGroups[`${group}-management`] = groups[group].filter(s => 
          s.startsWith('5.8') || s.startsWith('5.9') || s.startsWith('5.10') || s.startsWith('5.11')
        );
      } else {
        subcategorizedGroups[group] = groups[group];
      }
    });
    
    return subcategorizedGroups;
  }
  
  $: availableSectionsForLevel = data.availableSections[currentLevel] || [];
  $: sectionGroups = groupSectionsForLevel(availableSectionsForLevel, currentLevel);
  
  // Progress calculation functions
  function getAllOrderedSections() {
    const allSections = availableSectionsForLevel;
    const ordered = [];
    
    // Add overview sections first
    if (allSections.includes('index')) ordered.push('index');
    if (allSections.includes('access-guide')) ordered.push('access-guide');
    
    // Add preamble
    if (allSections.includes('0-preamble')) ordered.push('0-preamble');
    if (allSections.includes('youth-guide')) ordered.push('youth-guide');
    
    // Add numbered sections in order (1-introduction, 2-foundational-values, etc.)
    const numberedSections = allSections
      .filter(s => s.match(/^\d+(-|\.)/))
      .sort((a, b) => {
        // Extract the main number (e.g., "3" from "3.2.1-ai-consciousness")
        const aMainNum = parseInt(a.split(/[-\.]/)[0]);
        const bMainNum = parseInt(b.split(/[-\.]/)[0]);
        
        if (aMainNum !== bMainNum) {
          return aMainNum - bMainNum;
        }
        
        // If main numbers are same, sort by the full number string
        const aNumStr = a.match(/^[\d\.]+/)[0];
        const bNumStr = b.match(/^[\d\.]+/)[0];
        
        const aParts = aNumStr.split('.').map(n => parseInt(n) || 0);
        const bParts = bNumStr.split('.').map(n => parseInt(n) || 0);
        
        const maxLength = Math.max(aParts.length, bParts.length);
        
        for (let i = 0; i < maxLength; i++) {
          const aVal = aParts[i] || 0;
          const bVal = bParts[i] || 0;
          if (aVal !== bVal) {
            return aVal - bVal;
          }
        }
        
        return 0;
      });
    
    ordered.push(...numberedSections);
    
    return ordered;
  }

  function getCurrentSectionIndex() {
    return orderedSections.indexOf(activeSection);
  }

  function getTotalSections() {
    return orderedSections.length;
  }

  function getProgressPercentage() {
    const currentIndex = getCurrentSectionIndex();
    const total = getTotalSections();
    if (currentIndex === -1 || total === 0) return 0;
    return Math.round(((currentIndex + 1) / total) * 100);
  }

  function getCurrentSectionNumber() {
    const currentIndex = getCurrentSectionIndex();
    return currentIndex === -1 ? 0 : currentIndex + 1;
  }

  function getNextSection() {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex >= 0 && currentIndex < orderedSections.length - 1) {
      return orderedSections[currentIndex + 1];
    }
    return null;
  }

  function getPreviousSection() {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
      return orderedSections[currentIndex - 1];
    }
    return null;
  }

  // Progress indicators
  $: orderedSections = getAllOrderedSections();
  $: currentSectionIndex = orderedSections.indexOf(activeSection);
  $: totalSections = orderedSections.length;
  $: progressPercentage = currentSectionIndex >= 0 && totalSections > 0 
    ? Math.round(((currentSectionIndex + 1) / totalSections) * 100) 
    : 0;
  $: currentSectionNumber = currentSectionIndex >= 0 ? currentSectionIndex + 1 : 0;
  $: nextSection = currentSectionIndex >= 0 && currentSectionIndex < orderedSections.length - 1 
    ? orderedSections[currentSectionIndex + 1] 
    : null;
  $: previousSection = currentSectionIndex > 0 
    ? orderedSections[currentSectionIndex - 1] 
    : null;
  
  // Check if we should show progress (not for overview sections)
  $: showProgress = activeSection !== 'index' && activeSection !== 'access-guide' && !isPrintMode;
  
  // Swedish translations for section titles
  function getSectionTitle(section) {
    const titles = {
      en: {
        'index': 'Overview',
        'access-guide': 'Access guide',
        'youth-guide': 'Youth guide',
        
        '0-preamble': 'Preamble',
        '1-introduction': 'Introduction',
        '2-foundational-values': 'Foundational values & living principles',
        '2.3-global-ethical-traditions': 'Global ethical traditions',
        '2.5-rights-of-beings': 'Rights of beings',
        '2.6-scientific-foundations': 'Scientific foundations',
        
        '3-commitments': 'Human & non-human rights commitments',
        '3.1-traditional-rights': 'Traditional rights',
        '3.2-emerging-rights': 'Emerging rights',
        '3.2.1-ai-consciousness': 'AI consciousness assessment',
        '3.2.1a-assessment-hub-network': 'Assessment hub network',
        '3.2.1b-scientific-standards': 'Scientific standards',
        '3.2.2-ambiguous-entities': 'Ambiguous entities',
        '3.2.3-measurement-standards': 'Measurement standards',
        '3.2.4-recognition-pathways': 'Recognition pathways',
        '3.2.5-non-western-recognition': 'Non-western recognition',
        '3.3-conflict-resolution': 'Conflict resolution',
        '3.3.1-moon-wish-test': 'Moon wish test',
        
        '4-governance-mechanisms': 'Governance mechanisms',
        '4.1-transparency': 'Transparency',
        '4.2-inclusive-decision-making': 'Inclusive decision-making',
        '4.3-conflict-resolution': 'Conflict resolution',
        '4.4-guardianship-councils': 'Guardianship councils',
        '4.4.1-enforcement-mechanisms': 'Enforcement mechanisms',
        '4.4.2-non-compliance-strategy': 'Non-compliance strategy',
        '4.5-funding-model': 'Funding model',
        '4.5.1-hub-sustainability': 'Hub sustainability',
        '4.5.2-resource-optimization': 'Resource optimization',
        '4.6-governance-accountability': 'Governance accountability',
        '4.7-entity-conflict-resolution': 'Entity conflict resolution',
        '4.8-interoperability': 'Interoperability',
        '4.9-decision-making': 'Decision-making',
        '4.10-coordination-mechanisms': 'Coordination mechanisms',
        
        '5-implementation': 'Implementation',
        '5.1-quick-wins': 'Quick wins',
        '5.1.1-cost-analysis': 'Cost analysis',
        '5.2-phased-rollout': 'Phased rollout',
        '5.2.1-space-ethics': 'Space ethics',
        '5.3-education-accessibility': 'Education & accessibility',
        '5.3.1-resource-constraint': 'Resource constraint',
        '5.3.2-cultural-accessibility': 'Cultural accessibility',
        '5.3.3-knowledge-integration': 'Knowledge integration',
        '5.4-global-cooperation': 'Global cooperation',
        '5.5-monitoring': 'Monitoring',
        '5.6-public-engagement': 'Public engagement',
        '5.7-stakeholder-strategy': 'Stakeholder strategy',
        '5.7.1-consensus-building': 'Consensus building',
        '5.7.2-resistant-stakeholder': 'Resistant stakeholder',
        '5.8-resistance-handling': 'Resistance handling',
        '5.8.1-opposition-response': 'Opposition response',
        '5.8.2-learning-system': 'Learning system',
        '5.9-benchmarks-metrics': 'Benchmarks & metrics',
        '5.10-scenario-planning': 'Scenario planning',
        '5.11-accessibility-matrix': 'Accessibility matrix',
        
        '6-appendices': 'Appendices',
        '6.1-emerging-rights-toolkit': 'Emerging rights toolkit',
        '6.2-case-studies': 'Case studies',
        '6.3-ethical-forecasting': 'Ethical forecasting',
        '6.3.1-speculative-paradigm': 'Speculative paradigm',
        '6.3.2-validation-protocols': 'Validation protocols',
        '6.4-reporting-portal': 'Reporting portal',
        '6.5-plain-language': 'Plain language',
        '6.6-edge-case-protocols': 'Edge case protocols',
        '6.7-philosophy-of-rights': 'Philosophy of rights',
        '6.8-spiral-aware-primer': 'Spiral-aware primer',
        '6.9-impact-assessment': 'Impact assessment',
        '6.10-pioneer-pilots': 'Pioneer pilots',
        '6.11-crisis-ethics': 'Crisis ethics',
        '6.12-technical-protocols': 'Technical protocols'
      },
      sv: {
        'index': 'Översikt',
        'access-guide': 'Tillgänglighetsguide',
        'youth-guide': 'Ungdomsguide',
        
        '0-preamble': 'Inledning',
        '1-introduction': 'Introduktion',
        '2-foundational-values': 'Grundläggande värden & levande principer',
        '2.3-global-ethical-traditions': 'Globala etiska traditioner',
        '2.5-rights-of-beings': 'Rättigheter för varelser',
        '2.6-scientific-foundations': 'Vetenskapliga grunder',
        
        '3-commitments': 'Mänskliga & icke-mänskliga rättighetsåtaganden',
        '3.1-traditional-rights': 'Traditionella rättigheter',
        '3.2-emerging-rights': 'Framväxande rättigheter',
        '3.2.1-ai-consciousness': 'AI-medvetenhetsbedömning',
        '3.2.1a-assessment-hub-network': 'Bedömningshubbnätverk',
        '3.2.1b-scientific-standards': 'Vetenskapliga standarder',
        '3.2.2-ambiguous-entities': 'Tvetydiga entiteter',
        '3.2.3-measurement-standards': 'Mätstandarder',
        '3.2.4-recognition-pathways': 'Erkännandevägar',
        '3.2.5-non-western-recognition': 'Icke-västerländskt erkännande',
        '3.3-conflict-resolution': 'Konfliktlösning',
        '3.3.1-moon-wish-test': 'Månönsketest',
        
        '4-governance-mechanisms': 'Styrningsmekanismer',
        '4.1-transparency': 'Transparens',
        '4.2-inclusive-decision-making': 'Inkluderande beslutsfattande',
        '4.3-conflict-resolution': 'Konfliktlösning',
        '4.4-guardianship-councils': 'Förmyndarråd',
        '4.4.1-enforcement-mechanisms': 'Verkställighetsmekanismer',
        '4.4.2-non-compliance-strategy': 'Strategi för bristande efterlevnad',
        '4.5-funding-model': 'Finansieringsmodell',
        '4.5.1-hub-sustainability': 'Hubbarnas hållbarhet',
        '4.5.2-resource-optimization': 'Resursoptimering',
        '4.6-governance-accountability': 'Styrningens ansvarsskyldighet',
        '4.7-entity-conflict-resolution': 'Konfliktlösning mellan entiteter',
        '4.8-interoperability': 'Interoperabilitet',
        '4.9-decision-making': 'Beslutsfattande',
        '4.10-coordination-mechanisms': 'Koordinationsmekanismer',
        
        '5-implementation': 'Genomförande',
        '5.1-quick-wins': 'Snabba vinster',
        '5.1.1-cost-analysis': 'Kostnadsanalys',
        '5.2-phased-rollout': 'Stegvis utrullning',
        '5.2.1-space-ethics': 'Rymdenetik',
        '5.3-education-accessibility': 'Utbildning & tillgänglighet',
        '5.3.1-resource-constraint': 'Resursbegränsning',
        '5.3.2-cultural-accessibility': 'Kulturell tillgänglighet',
        '5.3.3-knowledge-integration': 'Kunskapsintegrering',
        '5.4-global-cooperation': 'Globalt samarbete',
        '5.5-monitoring': 'Övervakning',
        '5.6-public-engagement': 'Allmänhetens engagemang',
        '5.7-stakeholder-strategy': 'Intressentstrategi',
        '5.7.1-consensus-building': 'Konsensusbyggande',
        '5.7.2-resistant-stakeholder': 'Motvillig intressent',
        '5.8-resistance-handling': 'Motståndhantering',
        '5.8.1-opposition-response': 'Oppositionssvar',
        '5.8.2-learning-system': 'Inlärningssystem',
        '5.9-benchmarks-metrics': 'Riktmärken & mätetal',
        '5.10-scenario-planning': 'Scenarioplanering',
        '5.11-accessibility-matrix': 'Tillgänglighetsmatris',
        
        '6-appendices': 'Bilagor',
        '6.1-emerging-rights-toolkit': 'Verktygskit för framväxande rättigheter',
        '6.2-case-studies': 'Fallstudier',
        '6.3-ethical-forecasting': 'Etisk prognostisering',
        '6.3.1-speculative-paradigm': 'Spekulativt paradigm',
        '6.3.2-validation-protocols': 'Valideringsprotokoll',
        '6.4-reporting-portal': 'Rapporteringsportal',
        '6.5-plain-language': 'Enkelt språk',
        '6.6-edge-case-protocols': 'Protokoll för gränsfall',
        '6.7-philosophy-of-rights': 'Rättigheternas filosofi',
        '6.8-spiral-aware-primer': 'Spiralmedveten grund',
        '6.9-impact-assessment': 'Konsekvensanalys',
        '6.10-pioneer-pilots': 'Pionjärpiloter',
        '6.11-crisis-ethics': 'Krisetik',
        '6.12-technical-protocols': 'Tekniska protokoll'
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }
  
  function getGroupTitle(group) {
    const titles = {
      en: {
        'overview': 'Overview',
        'introduction': 'Introduction & overview', // Updated to reflect combined content
        'foundational-values': 'Foundational values',
        'commitments-traditional': 'Traditional rights',
        'commitments-emerging': 'Emerging rights',
        'commitments-conflict': 'Conflict resolution',
        'governance-basic': 'Basic governance',
        'governance-councils': 'Guardianship councils',
        'governance-operations': 'Operations & coordination',
        'implementation-planning': 'Planning & rollout',
        'implementation-education': 'Education & accessibility',
        'implementation-cooperation': 'Cooperation & engagement',
        'implementation-management': 'Management & metrics',
        'appendices': 'Appendices'
      },
      sv: {
        'overview': 'Översikt',
        'introduction': 'Introduktion & översikt', // Updated Swedish translation
        'foundational-values': 'Grundläggande värden',
        'commitments-traditional': 'Traditionella rättigheter',
        'commitments-emerging': 'Framväxande rättigheter',
        'commitments-conflict': 'Konfliktlösning',
        'governance-basic': 'Grundläggande styrning',
        'governance-councils': 'Förmyndarråd',
        'governance-operations': 'Verksamhet & koordination',
        'implementation-planning': 'Planering & utrullning',
        'implementation-education': 'Utbildning & tillgänglighet',
        'implementation-cooperation': 'Samarbete & engagemang',
        'implementation-management': 'Förvaltning & mätetal',
        'appendices': 'Bilagor'
      }
    };
    
    return (titles[currentLocale] || titles.en)[group] || group;
  }
  
  // Get the appropriate accessibility level icon
  function getLevelIcon(level) {
    const icons = {
      'visual': '🌱',
      'essential': '🌿',
      'standard': '🌲',
      'technical': '🌳'
    };
    
    return icons[level] || '';
  }
  
  // Get the accessibility level description
  function getLevelDescription(level) {
    const descriptions = {
      en: {
        'visual': 'Visual overview - Quick visual summaries of key concepts',
        'essential': 'Essential concepts - Simple explanations in everyday language',
        'standard': 'Standard framework - Complete framework text',
        'technical': 'Technical details - In-depth exploration for specialists'
      },
      sv: {
        'visual': 'Visuell översikt - Snabba visuella sammanfattningar av nyckelbegrepp',
        'essential': 'Grundläggande begrepp - Enkla förklaringar på vardagsspråk',
        'standard': 'Standardramverk - Komplett ramverkstext',
        'technical': 'Tekniska detaljer - Djupgående utforskning för specialister'
      }
    };
    
    return (descriptions[currentLocale] || descriptions.en)[level] || '';
  }

  // Get localized UI text
  function getLocalizedText(key) {
    const texts = {
      en: {
        'chooseLevel': 'Choose your level of detail:',
        'frameworkAccessGuide': 'Framework access guide',
        'accessGuideDescription': 'This guide helps you navigate the framework at your preferred level of detail. Each section is available in multiple formats.',
        'viewCompleteGuide': 'View complete access guide',
        'sectionUnavailable': 'Section unavailable',
        'notAvailableAtLevel': 'This section is not available at the {level} level.',
        'viewAtAnotherLevel': 'View this section at another level:',
        'progressOf': 'Section {current} of {total}',
        'progressPercentage': '{percentage}% complete',
        'previousSection': 'Previous section',
        'nextSection': 'Next section'
      },
      sv: {
        'chooseLevel': 'Välj din detaljnivå:',
        'frameworkAccessGuide': 'Ramverkets tillgänglighetsguide',
        'accessGuideDescription': 'Den här guiden hjälper dig att navigera i ramverket på din föredragna detaljnivå. Varje avsnitt finns tillgängligt i flera format.',
        'viewCompleteGuide': 'Visa komplett tillgänglighetsguide',
        'sectionUnavailable': 'Avsnitt ej tillgängligt',
        'notAvailableAtLevel': 'Detta avsnitt är inte tillgängligt på {level}-nivån.',
        'viewAtAnotherLevel': 'Visa detta avsnitt på en annan nivå:',
        'progressOf': 'Avsnitt {current} av {total}',
        'progressPercentage': '{percentage}% färdigt',
        'previousSection': 'Föregående avsnitt',
        'nextSection': 'Nästa avsnitt'
      }
    };
    
    return (texts[currentLocale] || texts.en)[key] || key;
  }

  // Check if we should show the access guide
  $: showAccessGuide = data.accessGuide && !isPrintMode;

  // For handling accordion states
  let accordionStates = {
    'overview': true,
    'introduction': false,
    'foundational-values': false,
    'commitments-traditional': false,
    'commitments-emerging': false,
    'commitments-conflict': false,
    'governance-basic': false,
    'governance-councils': false,
    'governance-operations': false,
    'implementation-planning': false,
    'implementation-education': false,
    'implementation-cooperation': false,
    'implementation-management': false,
    'appendices': false
  };

  function toggleAccordion(group) {
    accordionStates[group] = !accordionStates[group];
  }

  // Check if group has active sections
  function hasActiveSection(group) {
    return sectionGroups[group] && sectionGroups[group].includes(activeSection);
  }

  // Get icon for each group
  function getGroupIcon(group) {
    const icons = {
      'overview': '🏠',
      'preamble': '📖',
      'introduction': '🌟',
      'foundational-values': '⚖️',
      'commitments-traditional': '📜',
      'commitments-emerging': '🔮',
      'commitments-conflict': '🤝',
      'governance-basic': '🏛️',
      'governance-councils': '👥',
      'governance-operations': '⚙️',
      'implementation-planning': '📋',
      'implementation-education': '🎓',
      'implementation-cooperation': '🌍',
      'implementation-management': '📊',
      'appendices': '📄'
    };
    
    return icons[group] || '📑';
  }

  // Auto-open accordion if it contains the active section
  $: {
    Object.keys(sectionGroups).forEach(group => {
      if (hasActiveSection(group)) {
        accordionStates[group] = true;
      }
    });
  }

  // Close dropdowns when clicking outside
  function handleClickOutside(event) {
    if (browser) {
      const dropdown = document.querySelector('.level-selector .dropdown');
      
      if (dropdown && !dropdown.contains(event.target)) {
        // Handle dropdown close if needed
      }
    }
  }

  onMount(() => {
    if (browser) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  });
 </script>

 <svelte:window on:click={handleClickOutside}/>

 <div class="documentation-container">
  {#if !isPrintMode}
    <FrameworkSidebar />
  {/if}

  <div class="content">
    {#if !isPrintMode}
      <!-- Accessibility Level Selector -->
      <div class="level-selector">
        <h3>{getLocalizedText('chooseLevel')}</h3>
        <div class="level-buttons">
          {#each accessibilityLevels as level}
            <a 
              href={constructLevelChangeUrl(level)}
              class="level-btn" 
              class:active={currentLevel === level}
            >
              <span class="level-icon">{getLevelIcon(level)}</span>
              <div class="level-content">
                <span class="level-name">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
              </div>
            </a>
          {/each}
        </div>
        <div class="level-description">
          {getLevelDescription(currentLevel)}
        </div>
      </div>

      <!-- Show Access Guide if available -->
      {#if showAccessGuide && activeSection === 'index'}
        <div class="access-guide-banner">
          <div class="banner-content">
            <div class="banner-icon">🧭</div>
            <div class="banner-text">
              <h3>{getLocalizedText('frameworkAccessGuide')}</h3>
              <p>{getLocalizedText('accessGuideDescription')}</p>
            </div>
            <div class="banner-actions">
              <button class="guide-btn" on:click={() => setActiveSection('access-guide')}>
                {getLocalizedText('viewCompleteGuide')}
              </button>
            </div>
          </div>
        </div>
      {/if}
    {/if}

    {#if data.isModular}
      <!-- Main navigation for framework sections -->
      {#if !isPrintMode}
        <div class="section-nav">
          {#each Object.keys(sectionGroups) as group}
            {#if sectionGroups[group].length > 0}
              <div class="nav-accordion">
                <button 
                  class="accordion-header" 
                  class:open={accordionStates[group]}
                  class:has-active={hasActiveSection(group)}
                  on:click={() => toggleAccordion(group)}
                >
                  <span class="accordion-icon">{getGroupIcon(group)}</span>
                  <span class="accordion-title">{getGroupTitle(group)}</span>
                  <span class="section-count">({sectionGroups[group].length})</span>
                  <span class="toggle-arrow" class:rotated={accordionStates[group]}>▼</span>
                </button>
                {#if accordionStates[group]}
                  <div class="accordion-content" transition:slide={{ duration: 200 }}>
                    {#each sectionGroups[group] as section}
                      <button 
                        class="nav-item" 
                        class:active={activeSection === section}
                        on:click={() => setActiveSection(section)}
                      >
                        <span class="nav-icon">
                          {#if section.match(/^\d/)}
                            <span class="nav-number">{section.substring(0, section.indexOf('-'))}</span>
                          {:else}
                            📑
                          {/if}
                        </span>
                        <span class="nav-title">{getSectionTitle(section)}</span>
                        {#if !data.availableSections[currentLevel].includes(section)}
                          <span class="unavailable-indicator">⚠️</span>
                        {/if}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            {/if}
          {/each}
        </div>
      {/if}

      <!-- Progress Indicator -->
      {#if showProgress}
        <div class="progress-indicator">
          <div class="progress-content">
            <div class="progress-info">
              <div class="progress-text">
                <span class="progress-section">{getLocalizedText('progressOf').replace('{current}', currentSectionNumber).replace('{total}', totalSections)}</span>
                <span class="progress-percentage">{getLocalizedText('progressPercentage').replace('{percentage}', progressPercentage)}</span>
              </div>
              <div class="progress-navigation">
                {#if previousSection}
                  <button class="progress-nav-btn prev" on:click={() => setActiveSection(previousSection)}>
                    ← {getLocalizedText('previousSection')}
                  </button>
                {/if}
                {#if nextSection}
                  <button class="progress-nav-btn next" on:click={() => setActiveSection(nextSection)}>
                    {getLocalizedText('nextSection')} →
                  </button>
                {/if}
              </div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar">
                <div class="progress-fill" style="width: {progressPercentage}%"></div>
                <div class="progress-marker" style="left: {progressPercentage}%"></div>
              </div>
            </div>
          </div>
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
                        href={`${base}/frameworks/docs/implementation/ethics?level=${level}#${section}`} 
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

            <!-- Section navigation at bottom -->
            {#if showProgress && !isPrintMode}
              <div class="section-footer-navigation">
                {#if previousSection}
                  <button class="footer-nav-btn prev" on:click={() => setActiveSection(previousSection)}>
                    <span class="nav-arrow">←</span>
                    <div class="nav-text">
                      <span class="nav-label">{getLocalizedText('previousSection')}</span>
                      <span class="nav-title">{getSectionTitle(previousSection)}</span>
                    </div>
                  </button>
                {/if}
                
                {#if nextSection}
                  <button class="footer-nav-btn next" on:click={() => setActiveSection(nextSection)}>
                    <div class="nav-text">
                      <span class="nav-label">{getLocalizedText('nextSection')}</span>
                      <span class="nav-title">{getSectionTitle(nextSection)}</span>
                    </div>
                    <span class="nav-arrow">→</span>
                  </button>
                {/if}
              </div>
            {/if}
          </div>
        {:else if sectionsToShow.length === 1}
          <div class="section-unavailable">
            <h3>{getLocalizedText('sectionUnavailable')}</h3>
            <p>{getLocalizedText('notAvailableAtLevel').replace('{level}', currentLevel)}</p>
            <div class="alternative-levels">
              <p>{getLocalizedText('viewAtAnotherLevel')}</p>
              <div class="level-buttons small">
                {#each accessibilityLevels as level}
                  {#if data.availableSections[level].includes(section)}
                    <a 
                      href={`${base}/frameworks/docs/implementation/ethics?level=${level}#${section}`}
                      class="level-btn small"
                    >
                      <span class="level-icon">{getLevelIcon(level)}</span>
                      <div class="level-content">
                        <span class="level-name">{level}</span>
                      </div>
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
  /* Ethics framework color scheme (green-based palette) */
  :root {
    --ethics-primary: #166534; /* Dark green for ethics framework */
    --ethics-secondary: #6b7280; /* Gray */
    --ethics-accent: #16a34a; /* Medium green */
    --ethics-light: #f0fdf4; /* Light green */
    --ethics-medium: #dcfce7; /* Medium light green */
    --ethics-hover: #059669; /* Darker green for hover states */
  }

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
    background: linear-gradient(135deg, var(--ethics-light) 0%, var(--ethics-medium) 100%);
    border: 1px solid var(--ethics-accent);
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(22, 101, 52, 0.1);
  }
  
  .level-selector h3 {
    margin-top: 0;
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--ethics-primary);
  }
  
  .level-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin-bottom: 1.25rem;
  }
  
  .level-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    border: 2px solid transparent;
    border-radius: 0.5rem;
    background: white;
    color: var(--ethics-primary);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
  }

  .level-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(22, 101, 52, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  .level-btn:hover {
    background: var(--ethics-light);
    border-color: var(--ethics-accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(22, 101, 52, 0.15);
  }

  .level-btn:hover::before {
    left: 100%;
  }
  
  .level-btn.active {
    background: var(--ethics-accent);
    color: white;
    border-color: var(--ethics-accent);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(22, 101, 52, 0.25);
  }

  .level-btn.active::before {
    display: none;
  }
  
  .level-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .level-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .level-name {
    font-size: 1rem;
    font-weight: 600;
  }
  
  .level-description {
    font-size: 0.9rem;
    color: var(--ethics-primary);
    line-height: 1.5;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 0.5rem;
    border: 1px solid rgba(22, 101, 52, 0.2);
  }

  /* Progress Indicator */
  .progress-indicator {
    background: linear-gradient(135deg, var(--ethics-light) 0%, var(--ethics-medium) 100%);
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid var(--ethics-accent);
    box-shadow: 0 2px 8px rgba(22, 101, 52, 0.1);
  }

  .progress-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .progress-text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .progress-section {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--ethics-primary);
  }

  .progress-percentage {
    font-size: 0.9rem;
    color: var(--ethics-hover);
    font-weight: 500;
  }

  .progress-navigation {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .progress-nav-btn {
    padding: 0.5rem 1rem;
    border: 1px solid var(--ethics-accent);
    border-radius: 0.375rem;
    background: white;
    color: var(--ethics-primary);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
  }

  .progress-nav-btn:hover {
    background: var(--ethics-accent);
    color: white;
    transform: translateY(-1px);
  }

  .progress-bar-container {
    width: 100%;
  }

  .progress-bar {
    position: relative;
    width: 100%;
    height: 8px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 4px;
    overflow: visible;
    border: 1px solid rgba(22, 101, 52, 0.2);
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--ethics-accent), var(--ethics-hover));
    border-radius: 4px;
    transition: width 0.3s ease;
    position: relative;
  }

  .progress-marker {
    position: absolute;
    top: -2px;
    width: 12px;
    height: 12px;
    background: var(--ethics-primary);
    border-radius: 50%;
    transform: translateX(-50%);
    transition: left 0.3s ease;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  /* Access Guide Banner */
  .access-guide-banner {
    background: linear-gradient(135deg, var(--ethics-medium) 0%, #bbf7d0 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.2);
  }
  
  .banner-content {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .banner-icon {
    font-size: 2.5rem;
    color: var(--ethics-primary);
    flex-shrink: 0;
  }

  .banner-text {
    flex: 1;
  }
  
  .banner-content h3 {
    margin: 0 0 0.5rem 0;
    color: var(--ethics-primary);
    font-size: 1.25rem;
  }
  
  .banner-content p {
    margin: 0;
    color: #374151;
  }

  .banner-actions {
    flex-shrink: 0;
  }

  .guide-btn {
    background: var(--ethics-accent);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .guide-btn:hover {
    background: var(--ethics-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  /* Section Navigation */
  .section-nav {
    margin-bottom: 2rem;
    background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
    border-radius: 0.75rem;
    padding: 1.25rem;
    border: 1px solid #e5e7eb;
  }

  .nav-accordion {
    margin-bottom: 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    overflow: hidden;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .accordion-header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1.25rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.95rem;
    font-weight: 500;
    color: #374151;
    text-align: left;
  }

  .accordion-header:hover {
    background-color: rgba(22, 101, 52, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(22, 101, 52, 0.1);
    color: var(--ethics-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(22, 101, 52, 0.1);
    border-bottom: 1px solid #e5e7eb;
  }

  .accordion-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .accordion-title {
    flex-grow: 1;
    font-weight: 600;
  }

  .section-count {
    font-size: 0.8rem;
    color: #6b7280;
    font-weight: 400;
    background: #f3f4f6;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }

  .toggle-arrow {
    font-size: 0.8rem;
    color: #6b7280;
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }

  .toggle-arrow.rotated {
    transform: rotate(180deg);
  }

  .accordion-content {
    border-top: 1px solid #e5e7eb;
    background-color: #fafafa;
  }

  .nav-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.25rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9rem;
    color: #4b5563;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  .nav-item:last-child {
    border-bottom: none;
  }

  .nav-item:hover {
    background-color: rgba(22, 101, 52, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--ethics-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--ethics-accent);
  }

  .nav-icon {
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .nav-number {
    font-size: 0.8rem;
    background-color: rgba(22, 101, 52, 0.1);
    color: var(--ethics-primary);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-weight: 600;
    min-width: 2rem;
    text-align: center;
    flex-shrink: 0;
  }

  .nav-item.active .nav-number {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .nav-title {
    flex-grow: 1;
    text-align: left;
  }

  .unavailable-indicator {
    font-size: 0.8rem;
    opacity: 0.6;
  }
  
  /* Section Content */
  .section-content {
    padding-top: 1rem;
    margin-bottom: 3rem;
    scroll-margin-top: 2rem;
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
    color: var(--ethics-primary);
    margin: 0;
  }
  
  .layer-navigation {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .layer-link {
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.8rem;
    color: var(--ethics-primary);
    text-decoration: none;
    background-color: var(--ethics-light);
    transition: all 0.2s;
    border: 1px solid transparent;
  }
  
  .layer-link:hover {
    background-color: var(--ethics-medium);
    border-color: var(--ethics-accent);
  }
  
  .layer-link.active {
    background-color: var(--ethics-accent);
    color: white;
    border-color: var(--ethics-accent);
  }

  /* Section Footer Navigation */
  .section-footer-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e5e7eb;
    gap: 1rem;
  }

  .footer-nav-btn {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border: 2px solid var(--ethics-accent);
    border-radius: 0.5rem;
    background: white;
    color: var(--ethics-primary);
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    max-width: 300px;
    flex: 1;
  }

  .footer-nav-btn.prev {
    justify-content: flex-start;
  }

  .footer-nav-btn.next {
    justify-content: flex-end;
    margin-left: auto;
  }

  .footer-nav-btn:hover {
    background: var(--ethics-accent);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(22, 101, 52, 0.2);
  }

  .nav-arrow {
    font-size: 1.25rem;
    font-weight: bold;
  }

  .nav-text {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .footer-nav-btn.next .nav-text {
    text-align: right;
  }

  .nav-label {
    font-size: 0.8rem;
    font-weight: 500;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .nav-title {
    font-size: 0.9rem;
    font-weight: 600;
    margin-top: 0.25rem;
  }
  
  /* Section Unavailable Message */
  .section-unavailable {
    padding: 2rem;
    background-color: #f9fafb;
    border-radius: 0.75rem;
    text-align: center;
    margin: 2rem 0;
    border: 1px solid #e5e7eb;
  }

  .section-unavailable h3 {
    color: var(--ethics-primary);
    margin-bottom: 1rem;
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.75rem;
    justify-content: center;
  }
  
  .level-btn.small {
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
  }

  .level-btn.small .level-content {
    align-items: center;
  }

  .level-btn.small .level-name {
    font-size: 0.875rem;
  }
  
  /* Markdown Content Styling */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--ethics-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--ethics-primary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--ethics-primary);
  }
  
  .content :global(h4) {
    font-size: 1.125rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--ethics-primary);
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
    background-color: var(--ethics-light);
    border-left: 4px solid var(--ethics-accent);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }
  
  .content :global(a) {
    color: var(--ethics-accent);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
    border-bottom: 1px solid transparent;
  }
  
  .content :global(a:hover) {
    color: var(--ethics-hover);
    border-bottom-color: var(--ethics-hover);
  }
  
  /* Table styles */
  .content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.95rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .content :global(thead) {
    background: linear-gradient(to right, var(--ethics-primary), var(--ethics-accent));
  }

  .content :global(th) {
    padding: 0.75rem 1rem;
    color: white;
    font-weight: 600;
    text-align: left;
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
    background-color: var(--ethics-light);
  }
  
  /* Custom bullet points for unordered lists */
  .content :global(ul) {
    list-style-type: none;
  }
  
  .content :global(ul li) {
    position: relative;
    padding-left: 1.5rem;
  }
  
  .content :global(ul li::before) {
    content: "✧";
    position: absolute;
    left: 0;
    color: var(--ethics-accent);
    font-size: 0.9rem;
  }
  
  .content :global(ul ul li::before) {
    content: "⋄";
    color: #22c55e;
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
      grid-template-columns: 1fr;
    }

    .banner-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .banner-actions {
      width: 100%;
    }

    .guide-btn {
      width: 100%;
      text-align: center;
    }

    .section-nav {
      padding: 1rem;
    }

    .accordion-header {
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
    }

    .nav-item {
      padding: 0.625rem 1rem;
      font-size: 0.85rem;
    }

    .progress-info {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .progress-navigation {
      flex-direction: column;
      width: 100%;
    }

    .progress-nav-btn {
      width: 100%;
      text-align: center;
    }

    .section-footer-navigation {
      flex-direction: column;
    }

    .footer-nav-btn {
      max-width: none;
      justify-content: center;
    }

    .footer-nav-btn.next {
      margin-left: 0;
    }

    .footer-nav-btn .nav-text {
      text-align: center;
    }
  }
  
  @media (max-width: 480px) {
    .level-btn {
      flex-direction: column;
      text-align: center;
      gap: 0.5rem;
    }

    .level-content {
      align-items: center;
    }

    .banner-content {
      padding: 1.25rem;
    }

    .banner-icon {
      font-size: 2rem;
    }

    .banner-text h3 {
      font-size: 1.1rem;
    }

    .banner-text p {
      font-size: 0.9rem;
    }

    .progress-indicator {
      padding: 1rem;
    }

    .progress-text {
      align-items: center;
      text-align: center;
    }

    .footer-nav-btn {
      padding: 0.75rem 1rem;
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav-arrow {
      font-size: 1rem;
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
    .level-selector, .section-nav, .access-guide-banner,
    .accordion-header, .accordion-content, .nav-accordion,
    .layer-navigation, .banner-actions, .progress-indicator,
    .section-footer-navigation {
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
