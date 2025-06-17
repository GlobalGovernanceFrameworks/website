<!-- lib/components/FrameworkComingSoon.svelte -->
<script>
  import { locale } from '$lib/i18n';
  
  // Required props
  export let frameworkName; // e.g., 'migration', 'urban', 'oceans', etc.
  export let icon = '🚧'; // Default construction icon
  
  // Optional props with defaults
  export let expectedQuarter = 'Q4 2025';
  export let features = [];
  export let description = '';
  export let themeColors = {
    primary: '#2B4B8C',
    secondary: '#6B5CA5', 
    accent: '#DAA520',
    light: '#f8f9fc'
  };
  export let contactEmail = 'frameworks@yourcompany.com';
  export let frameworksPageUrl = '/frameworks';
  
  // Track current locale
  $: currentLocale = $locale;
  
  // Framework-specific translations
  const frameworkTranslations = {
    migration: {
      en: {
        title: 'Migration & Human Mobility Framework',
        defaultDescription: "We're developing a revolutionary framework treating migration as a natural planetary force, creating fluid sovereignty systems that honor movement as life itself.",
        defaultFeatures: [
          'Global Mobility Passport and Hearts currency integration',
          'Climate Resilience Visas and ecological stewardship migration',
          'Regenerative resettlement and planetary healing programs',
          'Decolonized borders and Indigenous transit corridors',
          'Migration Justice Tribunals and reparative mobility policies'
        ]
      },
      sv: {
        title: 'Migration & mänsklig rörlighet ramverk',
        defaultDescription: "Vi utvecklar ett revolutionerande ramverk som behandlar migration som en naturlig planetär kraft och skapar flytande suveränitetssystem som hedrar rörelse som själva livet.",
        defaultFeatures: [
          'Globalt rörlighetspass och Hearts-valutaintegration',
          'Klimatmotståndskraftvisa och ekologisk förvaltarmigration',
          'Regenerativ återbosättning och planetära läkningsprogram',
          'Avkoloniserade gränser och ursprungsbefolknings-transitkorridorer',
          'Migrationsrättvisetribunaler och reparativa rörlighetspolicys'
        ]
      }
    },
    urban: {
      en: {
        title: 'Urban & Community Development Framework',
        defaultDescription: "We're creating a transformative framework for regenerative cities that thrive within planetary boundaries while fostering equity, resilience, and participatory governance.",
        defaultFeatures: [
          '15-minute cities with biophilic design and wildlife corridors',
          'Community land trusts and circular economy systems',
          'Universal basic services and gender-responsive urban planning',
          'Urban sanctuary networks and mental health landscapes',
          'Cross-city disaster coordination and climate adaptation infrastructure'
        ]
      },
      sv: {
        title: 'Urban & samhällsutveckling ramverk',
        defaultDescription: "Vi skapar ett transformativt ramverk för regenerativa städer som blomstrar inom planetära gränser samtidigt som de främjar rättvisa, motståndskraft och deltagande styrning.",
        defaultFeatures: [
          '15-minutersstäder med biofilisk design och vildlivskorridorer',
          'Gemenskapsjordförtroenden och cirkulära ekonomisystem',
          'Universella bastjänster och genusresponsiv stadsplanering',
          'Urbana naturskyddsnätverk och mental hälsolandskap',
          'Korsstad katastrofkoordination och klimatanpassningsinfrastruktur'
        ]
      }
    },
    oceans: {
      en: {
        title: 'Oceans & Marine Framework',
        defaultDescription: "We're developing a comprehensive marine framework for ocean health, sustainable fisheries, and coastal community resilience.",
        defaultFeatures: [
          'Marine ecosystem conservation and restoration',
          'Sustainable fisheries management and blue economy',
          'Ocean pollution reduction and plastic mitigation',
          'Coastal climate adaptation and resilience',
          'Indigenous-led marine stewardship programs'
        ]
      },
      sv: {
        title: 'Hav & marina ramverk',
        defaultDescription: "Vi utvecklar ett omfattande marina ramverk för havshälsa, hållbart fiske och kustsamhällens motståndskraft.",
        defaultFeatures: [
          'Bevarande och restaurering av marina ekosystem',
          'Hållbar fiskeriförvaltning och blå ekonomi',
          'Minskning av havsföroreningar och plastmittigation',
          'Klimatanpassning och motståndskraft för kustområden',
          'Ursprungsbefolknings-ledda marina förvaltningsprogram'
        ]
      }
    },
    labor: {
      en: {
        title: 'Labor & Employment Framework',
        defaultDescription: "We're building a framework for fair, dignified work in the evolving economy of the 21st century.",
        defaultFeatures: [
          'Care Bonus Pay and community work systems',
          'Shorter workweeks and flexible time arrangements',
          'Community work teams and cooperative models',
          'Green job creation and planetary stewardship',
          'Post-growth economics and care-centered work'
        ]
      },
      sv: {
        title: 'Arbete & sysselsättning ramverk',
        defaultDescription: "Vi bygger ett ramverk för rättvist, värdigt arbete i 2000-talets utvecklande ekonomi.",
        defaultFeatures: [
          'Omsorgsbonus och samhällsarbetssystem',
          'Kortare arbetsveckor och flexibla tidsarrangemang',
          'Samhällsarbetsteam och kooperativa modeller',
          'Skapande av gröna jobb och planetär förvaltning',
          'Post-tillväxtekonomi och omsorgscentrerat arbete'
        ]
      }
    },
    inclusion: {
      en: {
        title: 'Disability Rights & Inclusion Framework',
        defaultDescription: "We're creating a framework ensuring full participation, accessibility, and rights for people with disabilities.",
        defaultFeatures: [
          'Universal design and radical accessibility standards',
          'Care cooperatives and disability-led support systems',
          'Crip technology labs and assistive innovation',
          'Abolition of ableist institutional systems',
          'Global disability alliance with enforcement powers'
        ]
      },
      sv: {
        title: 'Funktionsrätter & inkludering ramverk',
        defaultDescription: "Vi skapar ett ramverk som säkerställer full delaktighet, tillgänglighet och rättigheter för personer med funktionsnedsättningar.",
        defaultFeatures: [
          'Universell design och radikala tillgänglighetsstandarder',
          'Omsorgskooperativ och funktionshindersledda stödsystem',
          'Funktionshindersteknik-labb och hjälpteknikinnovation',
          'Avskaffande av ableistiska institutionella system',
          'Global funktionshinderallians med verkställande befogenheter'
        ]
      }
    },
    gender: {
      en: {
        title: 'Gender Equality & LGBTQ+ Rights Framework',
        defaultDescription: "We're developing a framework promoting gender equality and LGBTQ+ rights across all sectors of society.",
        defaultFeatures: [
          'Intersectional policy development and implementation',
          'LGBTQ+ inclusive spaces and protection systems',
          'Economic empowerment through cooperative models',
          'Gender-responsive healthcare and rights frameworks',
          'Cultural change and anti-discrimination programs'
        ]
      },
      sv: {
        title: 'Jämställdhet & HBTQ+ rättigheter ramverk',
        defaultDescription: "Vi utvecklar ett ramverk som främjar jämställdhet och HBTQ+ rättigheter inom alla samhällssektorer.",
        defaultFeatures: [
          'Intersektionell policyutveckling och implementering',
          'HBTQ+ inkluderande utrymmen och skyddssystem',
          'Ekonomisk empowerment genom kooperativa modeller',
          'Genusresponsiva hälsovårds- och rättighetsramverk',
          'Kulturell förändring och anti-diskrimineringsprogram'
        ]
      }
    },
    culture: {
      en: {
        title: 'Cultural Heritage Preservation Framework',
        defaultDescription: "We're crafting a framework for preserving, protecting, and celebrating cultural heritage in our globalized world.",
        defaultFeatures: [
          'Digital preservation and blockchain provenance systems',
          'Indigenous stewardship and FPIC 2.0 protocols',
          'Biocultural corridors and ecosystem integration',
          'Heritage bonds and sustainable financing',
          'Global cultural exchange and education programs'
        ]
      },
      sv: {
        title: 'Kulturarvsbevarande ramverk',
        defaultDescription: "Vi utformar ett ramverk för att bevara, skydda och fira kulturarvet i vår globaliserade värld.",
        defaultFeatures: [
          'Digital bevarande och blockchain-provenienssystem',
          'Ursprungsbefolknings-förvaltning och FPIC 2.0-protokoll',
          'Biokulturella korridorer och ekosystemintegration',
          'Kulturarvsobligationer och hållbar finansiering',
          'Globala kulturutbyten och utbildningsprogram'
        ]
      }
    },
    youth: {
      en: {
        title: 'Youth & Intergenerational Framework',
        defaultDescription: "We're building a framework that empowers youth while fostering meaningful connections across generations.",
        defaultFeatures: [
          'Youth leadership in global governance',
          'Intergenerational mentorship and wisdom exchange',
          'Climate justice and environmental stewardship',
          'Digital rights and technology ethics',
          'Truth and reconciliation processes'
        ]
      },
      sv: {
        title: 'Ungdom & intergenerationell ramverk',
        defaultDescription: "Vi bygger ett ramverk som stärker ungdomar samtidigt som det främjar meningsfulla förbindelser mellan generationer.",
        defaultFeatures: [
          'Ungdomsledarskap i global styrning',
          'Intergenerationell mentorskap och visdomsutbyte',
          'Klimaträttvisa och miljöförvaltning',
          'Digitala rättigheter och tekniketik',
          'Sanning och försoningsprocesser'
        ]
      }
    },
    space: {
      en: {
        title: 'Space Framework',
        defaultDescription: "We're developing a framework for ethical, sustainable space exploration and the peaceful use of outer space.",
        defaultFeatures: [
          'Peaceful space use and planetary defense systems',
          'Sustainable orbital management and debris mitigation',
          'Equitable access and technology sharing programs',
          'Cultural heritage protection in space exploration',
          'International coordination and crisis response'
        ]
      },
      sv: {
        title: 'Rymdramverk',
        defaultDescription: "Vi utvecklar ett ramverk för etisk, hållbar rymdforskning och fredlig användning av yttre rymden.",
        defaultFeatures: [
          'Fredlig rymdanvändning och planetära försvarssystem',
          'Hållbar omloppsbaneförvaltning och skrotminskning',
          'Rättvis tillgång och teknikdelningsprogram',
          'Kulturarvsskydd inom rymdforskning',
          'Internationell koordination och krishantering'
        ]
      }
    },
    wisdom: {
      en: {
        title: 'Wisdom Framework',
        defaultDescription: "We're creating a framework that cultivates wisdom, ethical decision-making, and long-term thinking in governance and society.",
        defaultFeatures: [
          'Contemplative practices in governance and leadership',
          'Traditional knowledge integration with modern systems',
          'Long-term thinking and future generations focus',
          'Ethical decision-making frameworks and training',
          'Wisdom-based policy development and evaluation'
        ]
      },
      sv: {
        title: 'Visdomsramverk',
        defaultDescription: "Vi skapar ett ramverk som odlar visdom, etiskt beslutsfattande och långsiktigt tänkande inom styrning och samhälle.",
        defaultFeatures: [
          'Kontemplativa metoder inom styrning och ledarskap',
          'Integration av traditionell kunskap med moderna system',
          'Långsiktigt tänkande och fokus på framtida generationer',
          'Ramverk och träning för etiskt beslutsfattande',
          'Visdomsbaserad policyutveckling och utvärdering'
        ]
      }
    }
  };

  // Get localized text for common UI elements
  function getLocalizedText(key) {
    const texts = {
      en: {
        comingSoon: 'Coming Soon',
        description: 'This framework will include:',
        developmentStatus: 'Currently in Development',
        timeline: 'Expected completion:',
        expressInterest: 'Express Interest',
        learnMore: 'Learn About Our Other Frameworks'
      },
      sv: {
        comingSoon: 'Kommer snart',
        description: 'Detta ramverk kommer att inkludera:',
        developmentStatus: 'För närvarande under utveckling',
        timeline: 'Förväntad färdigställning:',
        expressInterest: 'Uttryck intresse',
        learnMore: 'Lär dig om våra andra ramverk'
      }
    };
    
    return (texts[currentLocale] || texts.en)[key] || key;
  }

  // Get framework-specific content
  $: frameworkData = frameworkTranslations[frameworkName] || {};
  $: localizedFramework = frameworkData[currentLocale] || frameworkData.en || {};
  
  $: finalTitle = localizedFramework.title || `${frameworkName} Framework`;
  $: finalDescription = description || localizedFramework.defaultDescription || `We're developing the ${frameworkName} framework.`;
  $: finalFeatures = features.length > 0 ? features : (localizedFramework.defaultFeatures || []);

  // Track interest function
  function trackInterest() {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'framework_interest', {
        framework_name: frameworkName,
        language: currentLocale
      });
    }
    
    // Open email client
    const subject = encodeURIComponent(`Interest in ${finalTitle}`);
    const body = encodeURIComponent(`Hi,\n\nI'm interested in learning more about the ${finalTitle} when it becomes available.\n\nBest regards`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }
</script>

<div class="framework-planned-card" style="--primary-color: {themeColors.primary}; --secondary-color: {themeColors.secondary}; --accent-color: {themeColors.accent}; --light-color: {themeColors.light}">
  <div class="card-header">
    <div class="card-icon">{icon}</div>
    <div class="card-title-section">
      <h1>{finalTitle}</h1>
      <div class="status-badge">
        <span class="status-dot"></span>
        {getLocalizedText('developmentStatus')}
      </div>
    </div>
  </div>
  
  <div class="card-content">
    <p class="description">{finalDescription}</p>
    
    {#if finalFeatures.length > 0}
      <div class="features-section">
        <h3>{getLocalizedText('description')}</h3>
        <ul class="features-list">
          {#each finalFeatures as feature, index}
            <li>
              {#if frameworkName === 'migration'}
                {index === 0 ? '🌡️' : index === 1 ? '💼' : index === 2 ? '🏛️' : index === 3 ? '⚖️' : '💻'}
              {:else if frameworkName === 'urban'}
                {index === 0 ? '🏙️' : index === 1 ? '👥' : index === 2 ? '🌱' : index === 3 ? '🏠' : '🤝'}
              {:else if frameworkName === 'oceans'}
                {index === 0 ? '🐋' : index === 1 ? '🎣' : index === 2 ? '🌊' : index === 3 ? '🏖️' : '💙'}
              {:else if frameworkName === 'labor'}
                {index === 0 ? '🤖' : index === 1 ? '✊' : index === 2 ? '📚' : index === 3 ? '💼' : '💰'}
              {:else if frameworkName === 'inclusion'}
                {index === 0 ? '♿' : index === 1 ? '🎓' : index === 2 ? '🏠' : index === 3 ? '🔧' : '🤲'}
              {:else if frameworkName === 'gender'}
                {index === 0 ? '⚖️' : index === 1 ? '🏳️‍🌈' : index === 2 ? '💪' : index === 3 ? '🏥' : '📚'}
              {:else if frameworkName === 'culture'}
                {index === 0 ? '📜' : index === 1 ? '🏛️' : index === 2 ? '💾' : index === 3 ? '👥' : '🎓'}
              {:else if frameworkName === 'youth'}
                {index === 0 ? '👨‍💼' : index === 1 ? '🤝' : index === 2 ? '💚' : index === 3 ? '🚀' : '🌍'}
              {:else if frameworkName === 'space'}
                {index === 0 ? '🚀' : index === 1 ? '🌍' : index === 2 ? '⚖️' : index === 3 ? '🛸' : '🔬'}
              {:else if frameworkName === 'wisdom'}
                {index === 0 ? '🧠' : index === 1 ? '⚖️' : index === 2 ? '🔮' : index === 3 ? '📚' : '🧘'}
              {:else}
                🔹
              {/if}
              {feature}
            </li>
          {/each}
        </ul>
      </div>
    {/if}
    
    <div class="timeline-section">
      <p class="timeline">{getLocalizedText('timeline')} {expectedQuarter}</p>
    </div>
    
    <div class="card-actions">
      <button class="primary-btn" on:click={trackInterest}>
        {getLocalizedText('expressInterest')} <span class="mail-icon">✉️</span>
      </button>
      <a href={frameworksPageUrl} class="secondary-btn">
        {getLocalizedText('learnMore')} <span class="arrow-icon">→</span>
      </a>
    </div>
  </div>
</div>

<style>
  /* Framework Coming Soon Card */
  .framework-planned-card {
    background: linear-gradient(135deg, rgba(43, 75, 140, 0.1) 0%, rgba(107, 92, 165, 0.1) 100%);
    border-radius: 1rem;
    margin-bottom: 2rem;
    box-shadow: 0 8px 16px rgba(43, 75, 140, 0.15);
    border: 1px solid var(--primary-color, #2B4B8C);
    border-opacity: 0.2;
    overflow: hidden;
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 2rem 2rem 1rem 2rem;
    background: linear-gradient(135deg, rgba(43, 75, 140, 0.05), rgba(107, 92, 165, 0.05));
  }

  .card-icon {
    font-size: 3rem;
    color: var(--primary-color, #2B4B8C);
    flex-shrink: 0;
    margin-top: 0.25rem;
  }

  .card-title-section {
    flex: 1;
  }

  .card-title-section h1 {
    margin: 0 0 0.75rem 0;
    color: var(--primary-color, #2B4B8C);
    font-size: 2rem;
    font-weight: 700;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: rgba(218, 165, 32, 0.1);
    color: var(--accent-color, #DAA520);
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid rgba(218, 165, 32, 0.3);
  }

  .status-dot {
    width: 8px;
    height: 8px;
    background-color: var(--accent-color, #DAA520);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .card-content {
    padding: 1rem 2rem 2rem 2rem;
  }

  .description {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4b5563;
    margin-bottom: 2rem;
  }

  .features-section {
    margin-bottom: 2rem;
  }

  .features-section h3 {
    color: var(--primary-color, #2B4B8C);
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  .features-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .features-list li {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 0;
    color: #4b5563;
    font-size: 1rem;
    border-bottom: 1px solid rgba(43, 75, 140, 0.1);
  }

  .features-list li:last-child {
    border-bottom: none;
  }

  .timeline-section {
    background-color: rgba(43, 75, 140, 0.05);
    border-radius: 0.5rem;
    padding: 1rem 1.5rem;
    margin-bottom: 2rem;
    border-left: 4px solid var(--primary-color, #2B4B8C);
  }

  .timeline {
    margin: 0;
    color: var(--primary-color, #2B4B8C);
    font-weight: 600;
    font-size: 1rem;
  }

  .card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
  }

  .primary-btn {
    background-color: var(--primary-color, #2B4B8C);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }

  .primary-btn:hover {
    background-color: var(--secondary-color, #6B5CA5);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(43, 75, 140, 0.2);
  }

  .secondary-btn {
    background-color: white;
    color: var(--primary-color, #2B4B8C);
    border: 1px solid var(--primary-color, #2B4B8C);
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .secondary-btn:hover {
    background-color: rgba(43, 75, 140, 0.05);
    transform: translateY(-1px);
  }

  .mail-icon,
  .arrow-icon {
    font-size: 1rem;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .card-header {
      flex-direction: column;
      align-items: flex-start;
      padding: 1.5rem;
      gap: 1rem;
    }
    
    .card-content {
      padding: 1rem 1.5rem 1.5rem 1.5rem;
    }
    
    .card-title-section h1 {
      font-size: 1.5rem;
    }
    
    .card-actions {
      flex-direction: column;
      width: 100%;
    }
    
    .primary-btn,
    .secondary-btn {
      width: 100%;
      justify-content: center;
    }
    
    .card-icon {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 480px) {
    .card-header,
    .card-content {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    
    .features-list li {
      font-size: 0.9rem;
    }
    
    .description {
      font-size: 1rem;
    }
  }
</style>
