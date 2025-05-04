<!-- src/routes/framework/hubs/+page.svelte -->
<script>
  import { locale } from '$lib/i18n';
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  
  // Track current locale
  $: currentLocale = $locale;
  
  // Content in English
  const contentEn = {
    title: "Regional Climate & Energy Governance Hubs",
    subtitle: "Connecting Global Vision to Local Action",
    intro: "Regional Climate & Energy Governance Hubs form the crucial middle layer of our governance framework, translating global commitments into regionally appropriate strategies while supporting national implementation.",
    conceptDescription: "These hubs represent a conceptual model for effective climate and energy governance across geographic regions, respecting unique contexts while maintaining global coordination.",
    
    // Hub functions section
    functionsSectionTitle: "Core Functions of Regional Hubs",
    functions: [
      {
        title: "Regional Strategy Development",
        description: "Translating global targets into context-specific regional plans that account for shared ecosystems, energy infrastructure, and economic relationships.",
        icon: "🎯"
      },
      {
        title: "Cross-Border Coordination",
        description: "Facilitating cooperation on issues that transcend national boundaries, such as regional power grids, transboundary waters, and disaster response.",
        icon: "🤝"
      },
      {
        title: "Implementation Support",
        description: "Providing technical assistance, capacity building, and knowledge sharing to enhance national and local climate and energy governance capabilities.",
        icon: "🛠️"
      },
      {
        title: "Climate Finance Access",
        description: "Supporting access to climate finance through project development assistance, regional pooling mechanisms, and coordinated investment strategies.",
        icon: "💰"
      },
      {
        title: "Policy Harmonization",
        description: "Promoting coherent policy approaches to prevent carbon leakage and create economies of scale for clean energy markets.",
        icon: "📜"
      },
      {
        title: "Political Resilience",
        description: "Maintaining momentum for climate action when national politics fluctuate by supporting subnational actors and preserving institutional knowledge.",
        icon: "🛡️"
      }
    ],
    
    // Regional divisions section
    regionsSectionTitle: "Conceptual Regional Hub Structure",
    regionsIntro: "While actual implementation would adapt to existing regional institutions and relationships, the framework envisions hubs across major world regions:",
    regions: [
      {
        name: "Africa",
        description: "Addressing adaptation needs, renewable energy access, and sustainable development synergies.",
        challenges: "Water scarcity, food security, energy access, climate finance"
      },
      {
        name: "Asia-Pacific",
        description: "Coordinating diverse approaches across developing and developed economies with significant climate vulnerability.",
        challenges: "Coastal vulnerability, rapid urbanization, energy transition"
      },
      {
        name: "Europe",
        description: "Building on existing EU mechanisms while integrating Eastern European and non-EU countries.",
        challenges: "Policy integration, just transition, cross-border energy systems"
      },
      {
        name: "Latin America & Caribbean",
        description: "Leveraging natural climate solutions while addressing unique island and continental challenges.",
        challenges: "Forest conservation, renewable integration, climate justice"
      },
      {
        name: "Middle East & North Africa",
        description: "Supporting economic diversification in fossil fuel-dependent economies and addressing extreme heat adaptation.",
        challenges: "Water stress, energy transition, heat adaptation"
      },
      {
        name: "North America",
        description: "Connecting diverse federal, state/provincial, and local initiatives into coherent regional action.",
        challenges: "Policy fragmentation, fossil fuel transition, climate resilience"
      },
      {
        name: "Small Island States",
        description: "Virtual hub addressing the unique existential challenges faced by vulnerable island nations.",
        challenges: "Sea level rise, extreme weather, economic resilience"
      }
    ],
    
    // Governance structure section
    governanceSectionTitle: "Conceptual Governance Structure",
    governanceIntro: "Each Regional Hub would balance regional ownership with global coordination through:",
    governanceElements: [
      {
        title: "Regional Council",
        description: "Representatives from member countries with rotating leadership and balanced voting rights."
      },
      {
        title: "Stakeholder Forums",
        description: "Formal engagement mechanisms for civil society, businesses, and subnational governments."
      },
      {
        title: "Technical Teams",
        description: "Expert groups focusing on mitigation, adaptation, energy transition, and climate finance."
      },
      {
        title: "Knowledge Management System",
        description: "Digital platform for sharing best practices, policy tools, and implementation resources."
      },
      {
        title: "Global Coordination Mechanism",
        description: "Formal link to the Global Oversight Body to ensure alignment with international goals."
      }
    ],
    
    // Implementation approach section
    implementationSectionTitle: "Phased Implementation Approach",
    implementationIntro: "Regional Hubs would develop gradually through a phased approach:",
    implementationPhases: [
      {
        phase: "Phase 1: Concept Development",
        activities: "Define regional boundaries, assess existing institutions, identify key stakeholders, develop initial governance concepts"
      },
      {
        phase: "Phase 2: Network Building",
        activities: "Establish virtual coordination, develop knowledge sharing platforms, build partnerships with regional organizations"
      },
      {
        phase: "Phase 3: Formalization",
        activities: "Develop formal governance structures, secure resources for operations, establish technical teams"
      },
      {
        phase: "Phase 4: Full Implementation",
        activities: "Launch comprehensive operations, integrate with national and global governance, implement regional initiatives"
      }
    ],
    
    // Get involved section
    getInvolvedSectionTitle: "Engage with the Hub Concept",
    getInvolvedIntro: "While Regional Hubs represent a governance concept rather than currently operational entities, organizations can support their development:",
    involvementOptions: [
      {
        title: "Concept Development",
        description: "Contribute to refining the Regional Hub concept for specific regions and contexts."
      },
      {
        title: "Institutional Partnerships",
        description: "Explore how existing regional organizations could integrate hub functions into their operations."
      },
      {
        title: "Knowledge Sharing",
        description: "Share regional climate governance best practices and challenges to inform hub design."
      },
      {
        title: "Research Collaboration",
        description: "Partner on research to develop effective regional governance models adapted to specific contexts."
      },
      {
        title: "Pilot Projects",
        description: "Implement aspects of the hub concept through regional coordination initiatives."
      }
    ],
    
    // Contact section
    contactSectionTitle: "Contact for Hub Concept Development",
    contactIntro: "For more information about the Regional Hub concept or to discuss potential collaboration:",
    contactEmail: "globalgovernanceframework@gmail.com",
    contactSubject: "Regional Hubs Inquiry",
    
    // Note on current status
    currentStatusNote: "Note: Regional Climate & Energy Governance Hubs are currently a conceptual component of the Global Governance Framework. This page describes the vision for such hubs rather than currently operational entities. Implementation would require institutional partnerships and resources beyond the scope of the framework development project itself."
  };
  
  // Content in Swedish
  const contentSv = {
    title: "Regionala Klimat- och Energistyrningsnav",
    subtitle: "Kopplar Global Vision till Lokal Handling",
    intro: "Regionala klimat- och energistyrningsnav utgör det avgörande mellanskiktet i vår styrningsram, som översätter globala åtaganden till regionalt lämpliga strategier samtidigt som de stödjer nationellt genomförande.",
    conceptDescription: "Dessa nav representerar en konceptuell modell för effektiv klimat- och energistyrning över geografiska regioner, som respekterar unika sammanhang samtidigt som global samordning upprätthålls.",
    
    // Hub functions section
    functionsSectionTitle: "Kärnfunktioner för Regionala Nav",
    functions: [
      {
        title: "Regional Strategiutveckling",
        description: "Översätta globala mål till kontextspecifika regionala planer som tar hänsyn till delade ekosystem, energiinfrastruktur och ekonomiska relationer.",
        icon: "🎯"
      },
      {
        title: "Gränsöverskridande Samordning",
        description: "Underlätta samarbete kring frågor som överskrider nationella gränser, såsom regionala elnät, gränsöverskridande vatten och katastrofrespons.",
        icon: "🤝"
      },
      {
        title: "Implementeringsstöd",
        description: "Tillhandahålla tekniskt stöd, kapacitetsuppbyggnad och kunskapsdelning för att förbättra nationella och lokala klimat- och energistyrningsförmågor.",
        icon: "🛠️"
      },
      {
        title: "Tillgång till Klimatfinansiering",
        description: "Stödja tillgång till klimatfinansiering genom projektuvecklingshjälp, regionala poolningsmekanismer och samordnade investeringsstrategier.",
        icon: "💰"
      },
      {
        title: "Policyharmonisering",
        description: "Främja sammanhängande policystrategier för att förhindra koldioxidläckage och skapa stordriftsfördelar för marknader för ren energi.",
        icon: "📜"
      },
      {
        title: "Politisk Motståndskraft",
        description: "Upprätthålla momentum för klimatåtgärder när nationell politik fluktuerar genom att stödja subnationella aktörer och bevara institutionell kunskap.",
        icon: "🛡️"
      }
    ],
    
    // Regional divisions section
    regionsSectionTitle: "Konceptuell Regional Navstruktur",
    regionsIntro: "Medan faktiskt genomförande skulle anpassas till befintliga regionala institutioner och relationer, förutser ramverket nav över större världsregioner:",
    regions: [
      {
        name: "Afrika",
        description: "Adresserar anpassningsbehov, tillgång till förnybar energi och synergier för hållbar utveckling.",
        challenges: "Vattenbrist, livsmedelssäkerhet, energitillgång, klimatfinansiering"
      },
      {
        name: "Asien-Stillahavsområdet",
        description: "Samordnar olika strategier mellan utvecklingsländer och utvecklade ekonomier med betydande klimatsårbarhet.",
        challenges: "Kustsårbarhet, snabb urbanisering, energiomställning"
      },
      {
        name: "Europa",
        description: "Bygger på befintliga EU-mekanismer samtidigt som östeuropeiska och icke-EU-länder integreras.",
        challenges: "Policyintegration, rättvis omställning, gränsöverskridande energisystem"
      },
      {
        name: "Latinamerika och Karibien",
        description: "Utnyttjar naturliga klimatlösningar samtidigt som unika ö- och kontinentala utmaningar adresseras.",
        challenges: "Skogsbevarande, förnybar integration, klimaträttvisa"
      },
      {
        name: "Mellanöstern och Nordafrika",
        description: "Stödjer ekonomisk diversifiering i fossilberoende ekonomier och adresserar anpassning till extrem värme.",
        challenges: "Vattenstress, energiomställning, värmeanpassning"
      },
      {
        name: "Nordamerika",
        description: "Kopplar samman olika federala, delstatliga/provinsiella och lokala initiativ till sammanhängande regionala åtgärder.",
        challenges: "Policyfragmentering, fossilomställning, klimatresiliens"
      },
      {
        name: "Små Östater",
        description: "Virtuellt nav som adresserar de unika existentiella utmaningar som sårbara önationer står inför.",
        challenges: "Havsnivåhöjning, extremt väder, ekonomisk motståndskraft"
      }
    ],
    
    // Governance structure section
    governanceSectionTitle: "Konceptuell Styrningsstruktur",
    governanceIntro: "Varje regionalt nav skulle balansera regionalt ägarskap med global samordning genom:",
    governanceElements: [
      {
        title: "Regionalt Råd",
        description: "Representanter från medlemsländer med roterande ledarskap och balanserade rösträtter."
      },
      {
        title: "Intressentforum",
        description: "Formella engagemangsmekanismer för civilsamhället, företag och subnationella regeringar."
      },
      {
        title: "Tekniska Team",
        description: "Expertgrupper med fokus på begränsning, anpassning, energiomställning och klimatfinansiering."
      },
      {
        title: "Kunskapshanteringssystem",
        description: "Digital plattform för att dela bästa praxis, policyverktyg och implementeringsresurser."
      },
      {
        title: "Global Samordningsmekanism",
        description: "Formell länk till det globala tillsynsorganet för att säkerställa anpassning till internationella mål."
      }
    ],
    
    // Implementation approach section
    implementationSectionTitle: "Fasad Implementeringsmetod",
    implementationIntro: "Regionala nav skulle utvecklas gradvis genom en fasad metod:",
    implementationPhases: [
      {
        phase: "Fas 1: Konceptutveckling",
        activities: "Definiera regionala gränser, bedöma befintliga institutioner, identifiera viktiga intressenter, utveckla initiala styrningskoncept"
      },
      {
        phase: "Fas 2: Nätverksbyggande",
        activities: "Etablera virtuell samordning, utveckla kunskapsdelningsplattformar, bygga partnerskap med regionala organisationer"
      },
      {
        phase: "Fas 3: Formalisering",
        activities: "Utveckla formella styrningsstrukturer, säkra resurser för drift, etablera tekniska team"
      },
      {
        phase: "Fas 4: Fullständig Implementering",
        activities: "Lansera omfattande verksamhet, integrera med nationell och global styrning, implementera regionala initiativ"
      }
    ],
    
    // Get involved section
    getInvolvedSectionTitle: "Engagera dig i Navkonceptet",
    getInvolvedIntro: "Medan regionala nav representerar ett styrningskoncept snarare än för närvarande operativa enheter, kan organisationer stödja deras utveckling:",
    involvementOptions: [
      {
        title: "Konceptutveckling",
        description: "Bidra till att förfina det regionala navkonceptet för specifika regioner och sammanhang."
      },
      {
        title: "Institutionella Partnerskap",
        description: "Utforska hur befintliga regionala organisationer skulle kunna integrera navfunktioner i sin verksamhet."
      },
      {
        title: "Kunskapsdelning",
        description: "Dela bästa praxis och utmaningar för regional klimatstyrning för att informera navdesign."
      },
      {
        title: "Forskningssamarbete",
        description: "Samarbeta kring forskning för att utveckla effektiva regionala styrningsmodeller anpassade till specifika sammanhang."
      },
      {
        title: "Pilotprojekt",
        description: "Implementera aspekter av navkonceptet genom regionala samordningsinitiativ."
      }
    ],
    
    // Contact section
    contactSectionTitle: "Kontakt för Navkonceptutveckling",
    contactIntro: "För mer information om det regionala navkonceptet eller för att diskutera potentiellt samarbete:",
    contactEmail: "globalgovernanceframework@gmail.com",
    contactSubject: "Förfrågan om Regionala Nav",
    
    // Note on current status
    currentStatusNote: "Observera: Regionala klimat- och energistyrningsnav är för närvarande en konceptuell komponent i det globala styrningsramverket. Denna sida beskriver visionen för sådana nav snarare än för närvarande operativa enheter. Implementering skulle kräva institutionella partnerskap och resurser utöver omfattningen av själva ramverksutvecklingsprojektet."
  };
  
  // Select the appropriate content based on locale
  $: content = currentLocale === 'sv' ? contentSv : contentEn;
  
  // Create email link with subject
  $: emailLink = `mailto:${content.contactEmail}?subject=${encodeURIComponent(content.contactSubject)}`;
</script>

<svelte:head>
  <title>{content.title} - Global Governance Framework</title>
  <meta name="description" content={content.intro} />
</svelte:head>

<div class="hubs-container">
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-content">
      <h1>{content.title}</h1>
      <h2>{content.subtitle}</h2>
      <p class="intro-text">{content.intro}</p>
      <p class="concept-description">{content.conceptDescription}</p>
    </div>
  </section>
  
  <!-- World Map Visualization -->
  <section class="map-section">
    <div class="world-map">
      <!-- SVG World Map with Hub Points -->
      <svg viewBox="0 0 1000 500" class="hub-map">
        <!-- Simplified world map outline -->
        <path d="M150,250 Q200,200 250,220 Q300,240 350,230 Q400,220 450,240 Q500,260 550,250 Q600,240 650,260 Q700,280 750,260 Q800,240 850,250" 
              fill="none" stroke="#2B4B8C" stroke-width="2"/>
        <!-- Africa outline -->
        <path d="M500,180 Q520,200 530,250 Q540,300 530,350 Q520,400 510,420 Q490,430 470,410 Q450,390 440,340 Q430,290 450,260 Q470,230 500,180" 
              fill="#e8eaf6" stroke="#2B4B8C" stroke-width="1.5"/>
        <!-- Europe outline -->
        <path d="M450,180 Q480,170 510,150 Q540,130 570,140 Q600,150 590,180 Q580,210 550,230 Q520,250 490,240 Q460,230 450,180" 
              fill="#e8eaf6" stroke="#2B4B8C" stroke-width="1.5"/>
        <!-- Asia outline -->
        <path d="M600,150 Q650,130 700,140 Q750,150 800,170 Q850,190 830,240 Q810,290 780,320 Q750,350 700,330 Q650,310 620,270 Q590,230 600,150" 
              fill="#e8eaf6" stroke="#2B4B8C" stroke-width="1.5"/>
        <!-- North America outline -->
        <path d="M200,150 Q250,130 300,150 Q350,170 370,220 Q390,270 370,310 Q350,350 300,330 Q250,310 220,270 Q190,230 200,150" 
              fill="#e8eaf6" stroke="#2B4B8C" stroke-width="1.5"/>
        <!-- South America outline -->
        <path d="M300,330 Q330,350 350,380 Q370,410 360,450 Q350,490 320,480 Q290,470 280,430 Q270,390 300,330" 
              fill="#e8eaf6" stroke="#2B4B8C" stroke-width="1.5"/>
        <!-- Australia outline -->
        <path d="M800,350 Q830,340 860,360 Q890,380 880,410 Q870,440 840,430 Q810,420 800,390 Q790,360 800,350" 
              fill="#e8eaf6" stroke="#2B4B8C" stroke-width="1.5"/>
        
        <!-- Hub points with pulsing effect -->
        <!-- Africa Hub -->
        <circle cx="500" cy="300" r="15" fill="#2B4B8C" opacity="0.7">
          <animate attributeName="r" values="15;20;15" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        <!-- Europe Hub -->
        <circle cx="520" cy="200" r="15" fill="#2B4B8C" opacity="0.7">
          <animate attributeName="r" values="15;20;15" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        <!-- Asia-Pacific Hub -->
        <circle cx="700" cy="250" r="15" fill="#2B4B8C" opacity="0.7">
          <animate attributeName="r" values="15;20;15" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        <!-- North America Hub -->
        <circle cx="280" cy="220" r="15" fill="#2B4B8C" opacity="0.7">
          <animate attributeName="r" values="15;20;15" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        <!-- Latin America Hub -->
        <circle cx="320" cy="380" r="15" fill="#2B4B8C" opacity="0.7">
          <animate attributeName="r" values="15;20;15" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        <!-- MENA Hub -->
        <circle cx="580" cy="280" r="15" fill="#2B4B8C" opacity="0.7">
          <animate attributeName="r" values="15;20;15" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        <!-- Small Island States Hub -->
        <circle cx="850" cy="380" r="15" fill="#2B4B8C" opacity="0.7">
          <animate attributeName="r" values="15;20;15" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        
        <!-- Connection lines between hubs -->
        <path d="M500,300 Q510,250 520,200" stroke="#2B4B8C" stroke-width="2" stroke-dasharray="5,5" fill="none" />
        <path d="M520,200 Q610,225 700,250" stroke="#2B4B8C" stroke-width="2" stroke-dasharray="5,5" fill="none" />
        <path d="M520,200 Q400,210 280,220" stroke="#2B4B8C" stroke-width="2" stroke-dasharray="5,5" fill="none" />
        <path d="M500,300 Q410,340 320,380" stroke="#2B4B8C" stroke-width="2" stroke-dasharray="5,5" fill="none" />
        <path d="M500,300 Q540,290 580,280" stroke="#2B4B8C" stroke-width="2" stroke-dasharray="5,5" fill="none" />
        <path d="M700,250 Q775,315 850,380" stroke="#2B4B8C" stroke-width="2" stroke-dasharray="5,5" fill="none" />
      </svg>
    </div>
  </section>
  
  <!-- Functions Section -->
  <section class="functions-section">
    <h2>{content.functionsSectionTitle}</h2>
    <div class="functions-grid">
      {#each content.functions as func}
        <div class="function-card">
          <div class="function-icon">{func.icon}</div>
          <h3>{func.title}</h3>
          <p>{func.description}</p>
        </div>
      {/each}
    </div>
  </section>
  
  <!-- Regional Hubs Section -->
  <section class="regions-section">
    <h2>{content.regionsSectionTitle}</h2>
    <p>{content.regionsIntro}</p>
    
    <div class="regions-table-container">
      <table class="regions-table">
        <thead>
          <tr>
            <th>Region</th>
            <th>Focus Areas</th>
            <th>Key Challenges</th>
          </tr>
        </thead>
        <tbody>
          {#each content.regions as region}
            <tr>
              <td>{region.name}</td>
              <td>{region.description}</td>
              <td>{region.challenges}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
  
  <!-- Governance Structure Section -->
  <section class="governance-section">
    <h2>{content.governanceSectionTitle}</h2>
    <p>{content.governanceIntro}</p>
    
    <div class="governance-elements">
      {#each content.governanceElements as element}
        <div class="governance-element">
          <h3>{element.title}</h3>
          <p>{element.description}</p>
        </div>
      {/each}
    </div>
  </section>
  
  <!-- Implementation Approach Section -->
  <section class="implementation-section">
    <h2>{content.implementationSectionTitle}</h2>
    <p>{content.implementationIntro}</p>
    
    <div class="implementation-timeline">
      {#each content.implementationPhases as phase, i}
        <div class="timeline-item">
          <div class="timeline-marker">{i + 1}</div>
          <div class="timeline-content">
            <h3>{phase.phase}</h3>
            <p>{phase.activities}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>
  
  <!-- Get Involved Section -->
  <section class="get-involved-section">
    <h2>{content.getInvolvedSectionTitle}</h2>
    <p>{content.getInvolvedIntro}</p>
    
    <div class="involvement-options">
      {#each content.involvementOptions as option}
        <div class="involvement-option">
          <h3>{option.title}</h3>
          <p>{option.description}</p>
        </div>
      {/each}
    </div>
    
    <div class="contact-info">
      <h3>{content.contactSectionTitle}</h3>
      <p>{content.contactIntro}</p>
      <a href={emailLink} class="contact-button">
        <span class="email-icon">✉️</span> {content.contactEmail}
      </a>
    </div>
    
    <div class="status-note">
      <p>{content.currentStatusNote}</p>
    </div>
  </section>
</div>

<style>
  /* Base Styles */
  .hubs-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    color: #333;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  h1, h2, h3 {
    color: #2B4B8C;
    line-height: 1.3;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e8eaf6;
  }
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  
  p {
    line-height: 1.6;
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  section {
    margin-bottom: 4rem;
  }
  
  /* Hero Section */
  .hero {
    background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%);
    padding: 3rem 0;
    border-radius: 0.5rem;
    margin-bottom: 3rem;
  }
  
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: 0 1.5rem;
  }
  
  .hero h2 {
    font-weight: 500;
    color: #4B8AC2;
    border-bottom: none;
    margin-top: 0;
  }
  
  .intro-text {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
  
  .concept-description {
    font-style: italic;
    color: #505050;
  }
  
  /* Map Section */
  .map-section {
    margin-bottom: 3rem;
  }
  
  .world-map {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    background-color: #f8f9fa;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .hub-map {
    width: 100%;
    height: 100%;
    background-color: #f0f2fa;
  }
  
  /* Functions Section */
  .functions-section {
    margin-bottom: 3rem;
  }
  
  .functions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .function-card {
    background-color: #ffffff;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border-left: 4px solid #2B4B8C;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .function-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .function-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  /* Regions Section */
  .regions-section {
    margin-bottom: 3rem;
  }
  
  .regions-table-container {
    overflow-x: auto;
  }
  
  .regions-table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .regions-table th {
    background: linear-gradient(to right, #2B4B8C, #4B8AC2);
    color: white;
    text-align: left;
    padding: 1rem;
    font-weight: 600;
  }
  
  .regions-table td {
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    vertical-align: top;
  }
  
  .regions-table tr:nth-child(even) {
    background-color: #f9fafb;
  }
  
  .regions-table tr:hover {
    background-color: #e8eaf6;
  }
  
  /* Governance Section */
  .governance-section {
    margin-bottom: 3rem;
  }
  
  .governance-elements {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  .governance-element {
    background-color: #f9fafb;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .governance-element h3 {
    color: #4B8AC2;
    margin-top: 0;
  }
  
  /* Implementation Section */
  .implementation-section {
    margin-bottom: 3rem;
  }
  
  .implementation-timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 0;
  }
  
  .implementation-timeline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50px;
    width: 4px;
    background-color: #e8eaf6;
  }
  
  .timeline-item {
    position: relative;
    margin-bottom: 2rem;
    padding-left: 80px;
  }
  
  .timeline-marker {
    position: absolute;
    left: 32px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #2B4B8C;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    z-index: 1;
  }
  
  .timeline-content {
    background-color: #ffffff;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .timeline-content h3 {
    margin-top: 0;
    color: #2B4B8C;
  }
  
  /* Get Involved Section */
  .get-involved-section {
    margin-bottom: 3rem;
  }
  
  .involvement-options {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  .involvement-option {
    background-color: #f9fafb;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }
  
  .involvement-option:hover {
    transform: translateY(-5px);
  }
  
  .contact-info {
    background-color: #e8eaf6;
    padding: 2rem;
    border-radius: 0.5rem;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .contact-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #2B4B8C;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    text-decoration: none;
    font-weight: 500;
    transition: background-color 0.2s ease;
  }
  
  .contact-button:hover {
    background-color: #1a3a6c;
  }
  
  .email-icon {
    font-size: 1.25rem;
  }
  
  .status-note {
    background-color: #fffbeb;
    border: 1px solid #fef3c7;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-top: 2rem;
  }
  
  .status-note p {
    margin: 0;
    font-style: italic;
    color: #92400e;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .functions-grid, 
    .governance-elements,
    .involvement-options {
      grid-template-columns: 1fr;
    }
    
    .implementation-timeline {
      padding-left: 1rem;
    }
    
    .implementation-timeline::before {
      left: 30px;
    }
    
    .timeline-item {
      padding-left: 50px;
    }
    
    .timeline-marker {
      left: 30px;
      width: 30px;
      height: 30px;
      font-size: 0.875rem;
    }
    
    .hero h1 {
      font-size: 2rem;
    }
    
    .hero h2 {
      font-size: 1.5rem;
    }
    
    .intro-text {
      font-size: 1.125rem;
    }
  }
</style>
