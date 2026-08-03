<!-- src/routes/frameworks/docs/glossary/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';

  // Direct inclusion of glossary data
  // You'll paste your actual glossaryData here
  const glossaryData = {
    en: {
      "title": "Glossary",
      "intro": "This glossary provides definitions for key terms used throughout the Global Governance Framework. Each term includes a category emoji to help identify its primary domain. Use the filters below to explore terms by category.",
      "categories": {
        "title": "Filter by Category",
        "all": "All Terms",
        "process": "Process & Methods",
        "reflection": "Reflection & Learning",
        "framework": "Frameworks & Models",
        "ai": "AI & Automation",
        "tech": "Technology & Systems",
        "digital": "Digital & Virtual",
        "community": "Community & Participation",
        "youth": "Youth & Future Generations",
        "indigenous": "Indigenous & Traditional",
        "justice": "Justice & Rights",
        "ethics": "Ethics & Values",
        "global": "Global & Planetary",
        "structure": "Structure & Design",
        "metrics": "Metrics & Evaluation",
        "connection": "Connection & Networks",
        "financial": "Financial & Resources",
        "longterm": "Long-term & Future",
        "growth": "Growth & Development",
        "space": "Space & Extraterrestrial",
        "spiritual": "Spiritual & Consciousness"
      },
      "alphabet": {
        "title": "Jump to Letter"
      },
      "example": "Example in context",
      "related": "Related terms",
      "contribute": {
        "title": "Contribute to this Glossary",
        "description": "This glossary is continually evolving. If you'd like to suggest a new term or improvement, please",
        "contact": "contact us"
      },
      "terms": {
        "Adaptive Evaluation": {
          "definition": "A real-time assessment method that evolves alongside projects, prioritizing learning over static metrics.",
          "example": "A climate resilience program uses adaptive evaluation to adjust its indicators as community understanding of resilience evolves through implementation."
        },
        "Gamified Feedback": {
          "definition": "Using game mechanics (badges, leaderboards, challenges) to incentivize participation in governance processes.",
          "example": "A municipal government created a digital platform where citizens earn points for submitting ideas, voting on proposals, and attending public meetings."
        },
        "Human-in-the-Loop": {
          "definition": "Ensuring humans retain final authority over AI-assisted decisions, especially in governance contexts.",
          "example": "The city's planning department uses AI to generate zoning recommendations, but requires human planners to review and approve all suggestions before implementation."
        },
        "Interoperability APIs": {
          "definition": "Technical standards enabling governance tools to share data across platforms and jurisdictions.",
          "example": "The regional climate initiative created APIs that allow different cities' environmental monitoring systems to share data seamlessly, despite using different software."
        },
        "Legitimacy Recognition Systems": {
          "definition": "Public ratings and certification systems assessing governance alignment with shared values and ethical principles.",
          "example": "The Global Indigenous Council developed a recognition system that rates government policies based on their respect for traditional knowledge and self-determination."
        },
        "Meta-Governance": {
          "definition": "Frameworks for coordinating governance systems across domains, jurisdictions, and levels to enable collaboration without centralization.",
          "example": "The Baltic Sea Commission established meta-governance protocols that allow eight countries to coordinate environmental protection while maintaining their unique governance systems."
        },
        "Nested Legitimacy": {
          "definition": "A condition where local decisions align with broader governance frameworks without coercion, maintaining autonomy while ensuring compatibility.",
          "example": "Indigenous forest management practices were recognized as legitimate within national conservation frameworks, allowing communities to maintain traditional governance while fulfilling broader sustainability goals."
        },
        "Participatory Budgeting": {
          "definition": "Processes enabling communities to directly allocate portions of public funds through democratic deliberation and voting.",
          "example": "Porto Alegre, Brazil pioneered participatory budgeting where citizens collectively decide how to spend 20% of the municipal infrastructure budget through neighborhood assemblies and city-wide votes."
        },
        "Reflexive Cycle": {
          "definition": "Structured self-assessment processes with audit trails, ensuring governance systems continuously learn and improve from their operations.",
          "example": "The Urban Climate Alliance built quarterly reflexive cycles into their governance, documenting decisions, outcomes, and lessons learned to improve future policy-making."
        },
        "Transgenerational KPIs": {
          "definition": "Metrics and indicators designed to evaluate the long-term impacts of current decisions on future generations and planetary health.",
          "example": "The Finnish Parliament established transgenerational KPIs for all major infrastructure projects, requiring assessment of impacts over 100-year timeframes."
        },
        "Value-Sensitive Design": {
          "definition": "Methodologies for embedding ethical principles and human values directly into the development of technologies and governance systems.",
          "example": "The public health data system was developed using value-sensitive design to ensure privacy, equity, and accessibility were built into its architecture, not added as afterthoughts."
        },
        "Youth-Led Design": {
          "definition": "Governance tools and processes co-created by young people, ensuring intergenerational perspectives shape systems that will affect their futures.",
          "example": "Finland's Climate Council includes a Youth Panel with decision-making authority that co-designs climate policies alongside traditional experts and government officials."
        },
        "Epistemic Justice": {
          "definition": "Fair recognition of diverse knowledge systems and ways of knowing, ensuring that no single epistemology (Western, scientific, etc.) dominates governance frameworks to the exclusion of others.",
          "example": "The Arctic Council incorporates both scientific research and Indigenous oral histories as equally valid sources of knowledge in climate policy deliberations."
        },
        "Pluriversal Governance": {
          "definition": "Governance approaches that recognize multiple valid worldviews and ontologies, enabling different civilizational perspectives to coexist and collaborate without requiring assimilation to a single dominant framework.",
          "example": "New Zealand's legal recognition of the Whanganui River as a legal person with rights represents a pluriversal approach that incorporates Māori understandings of nature alongside Western legal concepts."
        },
        "Digital Commons": {
          "definition": "Collectively managed digital resources that are governed as shared assets rather than private property, ensuring equitable access, participatory development, and protection from enclosure or monopolization.",
          "example": "The Linux operating system represents a digital commons, developed and maintained by a global community with governance structures ensuring it remains freely available while evolving through distributed contribution."
        },
        "Non-Linear Decision Protocols": {
          "definition": "Governance approaches that operate through cyclical, relational, or recursive processes rather than linear progression, often based on Indigenous or non-Western decision traditions.",
          "example": "The Haudenosaunee Confederacy's consensus process involves multiple cycles of proposal, deliberation, and consultation with home communities before decisions are finalized, contrasting with Western parliamentary voting sequences."
        },
        "Intergenerational Trusteeship": {
          "definition": "Governance structures that formally represent the interests of future generations in current decision-making, ensuring long-term impacts are prioritized alongside present concerns.",
          "example": "Wales' Future Generations Commissioner has legal authority to review policies for their impact on generations not yet born, with the power to require changes to protect their interests."
        },
        "Governance Sandboxes": {
          "definition": "Protected spaces where innovative governance approaches can be tested with relaxed regulatory constraints but heightened monitoring, allowing experimentation while containing potential harms.",
          "example": "Finland's AI Governance Sandbox allows municipalities to test new algorithmic decision systems under close ethical oversight but with temporary exemptions from certain regulatory requirements."
        },
        "Cosmo-Local Production": {
          "definition": "Economic model where knowledge, designs, and expertise are shared globally while physical production remains local, combining the efficiency of global coordination with the resilience of distributed manufacturing.",
          "example": "The OSPRI (Open Source Pandemic Response Initiative) shares globally-developed ventilator designs that can be locally manufactured using available materials and adapted to local contexts during health emergencies."
        },
        "Polycentric Coordination": {
          "definition": "Governance structures with multiple independent but overlapping centers of decision-making, enabling both autonomy and coordination across different scales and domains without requiring central control.",
          "example": "Water management in the Netherlands operates through polycentric coordination, with local water boards, regional authorities, national agencies, and EU frameworks all governing different aspects of water systems while maintaining coherence through coordination mechanisms."
        },
        "Cosmic Commons": {
          "definition": "The shared heritage of cosmic resources and environments, governed as a commons for the benefit of all humanity rather than being subject to national or corporate appropriation.",
          "example": "The Outer Space Treaty established the Moon and other celestial bodies as cosmic commons, declaring that exploration and use 'shall be carried out for the benefit and in the interests of all countries' and not subject to national appropriation."
        },
        "Non-Terrestrial Governance": {
          "definition": "Governance systems designed for space environments, satellites, or planetary settlements that operate outside Earth's jurisdictions while maintaining alignment with core ethical principles.",
          "example": "The Mars Settlement Charter established a rotational council with members from all habitat domes, creating a non-terrestrial governance model adapted to the unique constraints and needs of Martian settlements."
        },
        "Consciousness-Informed Governance": {
          "definition": "Governance approaches that explicitly incorporate awareness practices, inner development, and consciousness exploration into their structures and processes.",
          "example": "Bhutan's Gross National Happiness Commission includes meditation practitioners who evaluate policy impacts on mental well-being and consciousness development alongside material metrics."
        },
        "Contemplative Governance": {
          "definition": "Decision-making processes that integrate periods of silence, reflection, and contemplative practice to enhance wisdom, reduce reactivity, and access deeper collective intelligence.",
          "example": "The Montreal Climate Council begins each meeting with a shared contemplative practice and includes structured silence before critical decisions, reporting improved outcomes and reduced polarization."
        }
      }
    },
    sv: {
      "title": "Ordlista",
      "intro": "Denna ordlista innehåller definitioner av viktiga begrepp som används i Ramverket för Globalt Styre. Varje begrepp har en kategori-emoji för att identifiera dess huvudsakliga område. Använd filtren nedan för att utforska begrepp efter kategori.",
      "categories": {
        "title": "Filtrera efter kategori",
        "all": "Alla begrepp",
        "process": "Processer & Metoder",
        "reflection": "Reflektion & Lärande",
        "framework": "Ramverk & Modeller",
        "ai": "AI & Automation",
        "tech": "Teknik & System",
        "digital": "Digitalt & Virtuellt",
        "community": "Gemenskap & Deltagande",
        "youth": "Ungdom & Framtida Generationer",
        "indigenous": "Urfolk & Traditionellt",
        "justice": "Rättvisa & Rättigheter",
        "ethics": "Etik & Värderingar",
        "global": "Globalt & Planetärt",
        "structure": "Struktur & Design",
        "metrics": "Mätetal & Utvärdering",
        "connection": "Anslutning & Nätverk",
        "financial": "Finansiellt & Resurser",
        "longterm": "Långsiktigt & Framtid",
        "growth": "Tillväxt & Utveckling",
        "space": "Rymd & Utomjordiskt",
        "spiritual": "Andligt & Medvetande"
      },
      "alphabet": {
        "title": "Hoppa till bokstav"
      },
      "example": "Exempel i kontext",
      "related": "Relaterade begrepp",
      "contribute": {
        "title": "Bidra till denna ordlista",
        "description": "Denna ordlista utvecklas kontinuerligt. Om du vill föreslå ett nytt begrepp eller förbättring, vänligen",
        "contact": "kontakta oss"
      },
      "terms": {
        "Adaptive Evaluation": {
          "definition": "En metod för utvärdering i realtid som utvecklas parallellt med projekt, där lärande prioriteras framför statiska mått.",
          "example": "Ett klimatresiliensprogram använder adaptiv utvärdering för att justera sina indikatorer i takt med att samhällets förståelse för resiliens utvecklas under genomförandet."
        },
        "Gamified Feedback Loops": {
          "definition": "Att använda spelmekanismer (märken, topplistor, utmaningar) för att uppmuntra deltagande i styrprocesser.",
          "example": "En kommunal regering skapade en digital plattform där medborgare tjänar poäng för att lämna in idéer, rösta på förslag och delta i offentliga möten."
        },
        "Human-in-the-Loop": {
          "definition": "Att säkerställa att människor har sista ordet i AI-assisterade beslut, särskilt i styrsammanhang.",
          "example": "Stadsplaneringsavdelningen använder AI för att generera zonindelningsförslag, men kräver att mänskliga planerare granskar och godkänner alla förslag innan de implementeras."
        },
        "Interoperability APIs": {
          "definition": "Tekniska standarder som gör det möjligt för styrverktyg att dela data över plattformar och jurisdiktioner.",
          "example": "Det regionala klimatsamarbetet skapade API:er som gör det möjligt för olika städers miljöövervakningssystem att dela data sömlöst, trots att de använder olika mjukvaror."
        },
        "Legitimacy Recognition Systems": {
          "definition": "Offentliga betygs- och certifieringssystem som bedömer hur väl styrning stämmer överens med gemensamma värderingar och etiska principer.",
          "example": "Det Globala Rådet för Ursprungsbefolkningar utvecklade ett erkännandesystem som betygsätter statliga policyer baserat på respekt för traditionell kunskap och självbestämmande."
        },
        "Meta-Governance": {
          "definition": "Ramverk för att samordna styrsystem över områden, jurisdiktioner och nivåer för att möjliggöra samarbete utan centralisering.",
          "example": "Baltiska havskommissionen etablerade metastyrningsprotokoll som gör det möjligt för åtta länder att samordna miljöskydd samtidigt som de behåller sina unika styrsystem."
        },
        "Nested Legitimacy": {
          "definition": "Ett tillstånd där lokala beslut är i linje med bredare styrningsramverk utan tvång, vilket bevarar autonomi samtidigt som kompatibilitet säkerställs.",
          "example": "Ursprungsbefolkningens skogsförvaltning erkändes som legitim inom nationella bevaranderamverk, vilket möjliggjorde traditionell styrning i linje med bredare hållbarhetsmål."
        },
        "Participatory Budgeting": {
          "definition": "Processer som gör det möjligt för samhällen att direkt fördela delar av offentliga medel genom demokratisk överläggning och omröstning.",
          "example": "Porto Alegre i Brasilien var pionjär inom deltagandebudgetering där medborgare kollektivt beslutar hur 20% av stadens infrastrukturbudget ska användas genom kvartersförsamlingar och stadsövergripande omröstningar."
        },
        "Reflexive Cycle": {
          "definition": "Strukturerade självutvärderingsprocesser med spårbar dokumentation, som säkerställer att styrsystem kontinuerligt lär sig och förbättras genom sin verksamhet.",
          "example": "Urban Climate Alliance införde kvartalsvisa reflexiva cykler i sitt styrsystem, där beslut, resultat och lärdomar dokumenteras för att förbättra framtida policyarbete."
        },
        "Transgenerational KPIs": {
          "definition": "Mått och indikatorer utformade för att utvärdera långsiktiga effekter av dagens beslut på framtida generationer och planetens hälsa.",
          "example": "Finlands riksdag införde transgenerationella KPI:er för alla större infrastrukturprojekt, där effekterna ska bedömas över en tidsperiod på 100 år."
        },
        "Value-Sensitive Design": {
          "definition": "Metoder för att integrera etiska principer och mänskliga värderingar direkt i utvecklingen av teknik och styrsystem.",
          "example": "Det offentliga hälsodatasytemet utvecklades med värdebaserad design för att säkerställa att integritet, jämlikhet och tillgänglighet byggdes in i arkitekturen – inte tillfördes i efterhand."
        },
        "Youth-Led Design": {
          "definition": "Styrverktyg och processer som samskapas av unga människor, för att säkerställa att generationsövergripande perspektiv formar systemen som påverkar deras framtid.",
          "example": "Finlands Klimatråd inkluderar en ungdomspanel med beslutsmakt som samskapar klimatpolicy tillsammans med traditionella experter och myndigheter."
        },
        "Epistemic Justice": {
          "definition": "Rättvist erkännande av olika kunskapssystem och sätt att veta, som säkerställer att ingen enskild epistemologi (västerländsk, vetenskaplig, etc.) dominerar styrningsramverk på bekostnad av andra.",
          "example": "Arktiska rådet införlivar både vetenskaplig forskning och urfolks muntliga historier som lika giltiga kunskapskällor i klimatpolitiska överläggningar."
        },
        "Pluriversal Governance": {
          "definition": "Styrningsmetoder som erkänner flera giltiga världsåskådningar och ontologier, vilket möjliggör att olika civilisatoriska perspektiv kan samexistera och samarbeta utan att kräva assimilering till ett enda dominerande ramverk.",
          "example": "Nya Zeelands juridiska erkännande av Whanganui-floden som en juridisk person med rättigheter representerar ett pluriversellt tillvägagångssätt som införlivar maoriernas förståelse av naturen tillsammans med västerländska juridiska begrepp."
        },
        "Digital Commons": {
          "definition": "Kollektivt förvaltade digitala resurser som styrs som gemensamma tillgångar snarare än privat egendom, vilket säkerställer rättvis tillgång, deltagandebaserad utveckling och skydd mot inhägnad eller monopolisering.",
          "example": "Operativsystemet Linux representerar digitala allmänningar, utvecklat och underhållet av en global gemenskap med styrningsstrukturer som säkerställer att det förblir fritt tillgängligt samtidigt som det utvecklas genom distribuerade bidrag."
        },
        "Non-Linear Decision Protocols": {
          "definition": "Styrningsmetoder som fungerar genom cykliska, relationella eller rekursiva processer snarare än linjär progression, ofta baserade på urfolks eller icke-västerländska beslutstraditioner.",
          "example": "Haudenosaunee-konfederationens konsensusprocess involverar flera cykler av förslag, överläggning och samråd med hemmasamhällen innan beslut slutförs, i kontrast till västerländska parlamentariska röstningssekvenser."
        },
        "Intergenerational Trusteeship": {
          "definition": "Styrningsstrukturer som formellt representerar framtida generationers intressen i nuvarande beslutsfattande, vilket säkerställer att långsiktiga effekter prioriteras tillsammans med nuvarande bekymmer.",
          "example": "Wales kommissionär för framtida generationer har juridisk behörighet att granska politik för dess påverkan på generationer som ännu inte är födda, med befogenhet att kräva förändringar för att skydda deras intressen."
        },
        "Governance Sandboxes": {
          "definition": "Skyddade utrymmen där innovativa styrningsmetoder kan testas med lättade regleringsrestriktioner men förhöjd övervakning, vilket möjliggör experimenterande samtidigt som potentiella skador begränsas.",
          "example": "Finlands AI-styrningssandlåda tillåter kommuner att testa nya algoritmiska beslutssystem under noggrann etisk övervakning men med tillfälliga undantag från vissa regulatoriska krav."
        },
        "Cosmo-Local Production": {
          "definition": "Ekonomisk modell där kunskap, design och expertis delas globalt medan fysisk produktion förblir lokal, vilket kombinerar effektiviteten hos global samordning med motståndskraften hos distribuerad tillverkning.",
          "example": "OSPRI (Open Source Pandemic Response Initiative) delar globalt utvecklade ventilatordesigner som kan tillverkas lokalt med tillgängliga material och anpassas till lokala sammanhang under hälsonödsituationer."
        },
        "Polycentric Coordination": {
          "definition": "Styrningsstrukturer med flera oberoende men överlappande beslutscentra, vilket möjliggör både autonomi och samordning över olika skalor och domäner utan att kräva central kontroll.",
          "example": "Vattenhantering i Nederländerna fungerar genom polycentrisk samordning, med lokala vattenstyrelser, regionala myndigheter, nationella organ och EU-ramverk som alla styr olika aspekter av vattensystem samtidigt som de upprätthåller sammanhang genom samordningsmekanismer."
        },
        "Cosmic Commons": {
          "definition": "Det gemensamma arvet av kosmiska resurser och miljöer, som förvaltas som allmänningar till förmån för hela mänskligheten snarare än att vara föremål för nationellt eller företagsmässigt tillägnande.",
          "example": "Yttre rymdfördragets etablerade månen och andra himlakroppar som kosmiska allmänningar, med förklaringen att utforskning och användning 'ska genomföras till förmån för och i alla länders intresse' och inte vara föremål för nationellt tillägnande."
        },
        "Non-Terrestrial Governance": {
          "definition": "Styrningssystem utformade för rymdmiljöer, satelliter eller planetära bosättningar som fungerar utanför jordens jurisdiktioner samtidigt som de upprätthåller anpassning till grundläggande etiska principer.",
          "example": "Mars-bosättningens stadga etablerade ett rotationsråd med medlemmar från alla habitatkupoler, vilket skapade en icke-terrestrisk styrningsmodell anpassad till de unika begränsningarna och behoven hos marsiska bosättningar."
        },
        "Consciousness-Informed Governance": {
          "definition": "Styrningsmetoder som uttryckligen integrerar medvetenhetspraxis, inre utveckling och utforskning av medvetandet i sina strukturer och processer.",
          "example": "Bhutans kommission för bruttonationell lycka inkluderar meditationsutövare som utvärderar policyeffekter på mentalt välbefinnande och medvetandeutveckling tillsammans med materiella mätvärden."
        },
        "Contemplative Governance": {
          "definition": "Beslutsprocesser som integrerar perioder av tystnad, reflektion och kontemplativ praktik för att förbättra visdom, minska reaktivitet och få tillgång till djupare kollektiv intelligens.",
          "example": "Montreals klimatråd börjar varje möte med en gemensam kontemplativ övning och inkluderar strukturerad tystnad före kritiska beslut, och rapporterar förbättrade resultat och minskad polarisering."
        }
      }
    }
  };
  
  // Category filter state
  let selectedCategory = null;
  
  // Define category mapping
  const categories = {
    process: '🔄',
    reflection: '🔍',
    framework: '🧩',
    ai: '🤖',
    tech: '🔌',
    digital: '💻',
    community: '👥',
    youth: '🧒',
    indigenous: '🌿',
    justice: '⚖️',
    ethics: '❤️',
    global: '🌍',
    structure: '🏛️',
    metrics: '📊',
    connection: '🔗',
    financial: '💰',
    longterm: '⏳',
    growth: '🌱',
    space: '🚀',
    spiritual: '✨'
  };
  
  // Define base term structures (without translations)
  const baseTerms = {
    en: [
      {
        name: "Adaptive Evaluation",
        emoji: "🔄",
        category: "process",
        related: ["Reflexive Cycle", "Developmental Evaluation"]
      },
      {
        name: "Gamified Feedback Loops",
        emoji: "🎮",
        category: "digital",
        related: ["Participatory Budgeting", "Youth-Led Design"]
      },
      {
        name: "Human-in-the-Loop",
        emoji: "🤖",
        category: "ai",
        related: ["Ethical AI", "Value-Sensitive Design"]
      },
      {
        name: "Interoperability APIs",
        emoji: "🔌",
        category: "tech",
        related: ["Digital Commons", "Meta-Governance"]
      },
      {
        name: "Legitimacy Recognition Systems",
        emoji: "⚖️",
        category: "justice",
        related: ["Cultural Autonomy", "Nested Legitimacy"]
      },
      {
        name: "Meta-Governance",
        emoji: "🌐",
        category: "global",
        related: ["Decentralized Authority", "Integrated Systems Thinking"]
      },
      {
        name: "Nested Legitimacy",
        emoji: "🏛️",
        category: "structure",
        related: ["Subsidiarity", "Cultural Autonomy"]
      },
      {
        name: "Participatory Budgeting",
        emoji: "💰",
        category: "financial",
        related: ["Direct Participation", "Resource Justice"]
      },
      {
        name: "Reflexive Cycle",
        emoji: "🔍",
        category: "reflection",
        related: ["Adaptive Evolution", "Adaptive Evaluation"]
      },
      {
        name: "Transgenerational KPIs",
        emoji: "⏳",
        category: "longterm",
        related: ["Environmental Stewardship", "Cosmic Ethics"]
      },
      {
        name: "Value-Sensitive Design",
        emoji: "❤️",
        category: "ethics",
        related: ["Ethical Technology Governance", "Universal Human Rights"]
      },
      {
        name: "Youth-Led Design",
        emoji: "🧒",
        category: "youth",
        related: ["Direct Participation", "Intergenerational Equity"]
      },
      {
        name: "Epistemic Justice",
        emoji: "🧠",
        category: "ethics",
        related: ["Cultural Autonomy", "Indigenous Knowledge Systems", "Pluriversal Governance"]
      },
      {
        name: "Pluriversal Governance",
        emoji: "🌐",
        category: "structure",
        related: ["Cultural Autonomy", "Balance of Integration & Diversity", "Epistemic Justice"]
      },
      {
        name: "Digital Commons",
        emoji: "💻",
        category: "digital",
        related: ["Resource Justice", "Interoperability APIs", "Decentralized Authority"]
      },
      {
        name: "Non-Linear Decision Protocols",
        emoji: "🔄",
        category: "process",
        related: ["Indigenous Knowledge Systems", "Adaptive Evolution", "Pluriversal Governance"]
      },
      {
        name: "Intergenerational Trusteeship",
        emoji: "⏳",
        category: "longterm",
        related: ["Transgenerational KPIs", "Environmental Stewardship", "Cosmic Ethics"]
      },
      {
        name: "Governance Sandboxes",
        emoji: "🧪",
        category: "structure",
        related: ["Adaptive Evolution", "Experimental Governance", "Decentralized Authority"]
      },
      {
        name: "Cosmo-Local Production",
        emoji: "🌍",
        category: "financial",
        related: ["Resource Justice", "Cultural Autonomy", "Digital Commons"]
      },
      {
        name: "Polycentric Coordination",
        emoji: "🕸️",
        category: "structure",
        related: ["Meta-Governance", "Decentralized Authority", "Nested Legitimacy"]
      },
      {
        name: "Cosmic Commons",
        emoji: "🚀",
        category: "space",
        related: ["Resource Justice", "Cosmic Ethics", "Global Commons"]
      },
      {
        name: "Non-Terrestrial Governance",
        emoji: "🛰️",
        category: "space",
        related: ["Pluriversal Governance", "Decentralized Authority", "Cosmic Ethics"]
      },
      {
        name: "Consciousness-Informed Governance",
        emoji: "✨",
        category: "spiritual",
        related: ["Value-Sensitive Design", "Epistemic Justice", "Indigenous Knowledge Systems"]
      },
      {
        name: "Contemplative Governance",
        emoji: "🧘",
        category: "spiritual",
        related: ["Reflexive Cycle", "Non-Linear Decision Protocols", "Consciousness-Informed Governance"]
      },
    ],
    sv: [
      {
        name: "Adaptiv Utvärdering",
        original: "Adaptive Evaluation",
        emoji: "🔄",
        category: "process",
        related: ["Reflexiv Cykel", "Utvecklingsutvärdering"]
      },
      {
        name: "Gamifierade Återkopplingsloopar",
        original: "Gamified Feedback Loops",
        emoji: "🎮",
        category: "digital",
        related: ["Deltagande Budgetering", "Ungdomsledd Design"]
      },
      {
        name: "Människa-i-loopen",
        original: "Human-in-the-Loop",
        emoji: "🤖",
        category: "ai",
        related: ["Etisk AI", "Värdekänslig Design"]
      },
      {
        name: "Interoperabilitets-API:er",
        original: "Interoperability APIs",
        emoji: "🔌",
        category: "tech",
        related: ["Digitala Allmänningar", "Metastyrning"]
      },
      {
        name: "Legitimitetserkännande System",
        original: "Legitimacy Recognition Systems",
        emoji: "⚖️",
        category: "justice",
        related: ["Kulturell Autonomi", "Nästlad Legitimitet"]
      },
      {
        name: "Metastyrning",
        original: "Meta-Governance",
        emoji: "🌐",
        category: "global",
        related: ["Decentraliserad Auktoritet", "Integrerat Systemtänkande"]
      },
      {
        name: "Nästlad Legitimitet",
        original: "Nested Legitimacy",
        emoji: "🏛️",
        category: "structure",
        related: ["Subsidiaritet", "Kulturell Autonomi"]
      },
      {
        name: "Deltagande Budgetering",
        original: "Participatory Budgeting",
        emoji: "💰",
        category: "financial",
        related: ["Direkt Deltagande", "Resursrättvisa"]
      },
      {
        name: "Reflexiv Cykel",
        original: "Reflexive Cycle",
        emoji: "🔍",
        category: "reflection",
        related: ["Adaptiv Evolution", "Adaptiv Utvärdering"]
      },
      {
        name: "Transgenerationella Nyckeltal",
        original: "Transgenerational KPIs",
        emoji: "⏳",
        category: "longterm",
        related: ["Miljöförvaltning", "Kosmisk Etik"]
      },
      {
        name: "Värdekänslig Design",
        original: "Value-Sensitive Design",
        emoji: "❤️",
        category: "ethics",
        related: ["Etisk Teknikstyrning", "Universella Mänskliga Rättigheter"]
      },
      {
        name: "Ungdomsledd Design",
        original: "Youth-Led Design",
        emoji: "🧒",
        category: "youth",
        related: ["Direkt Deltagande", "Intergenerationell Rättvisa"]
      },
      {
        name: "Epistemisk Rättvisa",
        original: "Epistemic Justice",
        emoji: "🧠",
        category: "ethics",
        related: ["Kulturell Autonomi", "Urfolks Kunskapssystem", "Pluriversell Styrning"]
      },
      {
        name: "Pluriversell Styrning",
        original: "Pluriversal Governance",
        emoji: "🌐",
        category: "structure",
        related: ["Kulturell Autonomi", "Balans av Integration & Mångfald", "Epistemisk Rättvisa"]
      },
      {
        name: "Digitala Allmänningar",
        original: "Digital Commons",
        emoji: "💻",
        category: "digital",
        related: ["Resursrättvisa", "Interoperabilitets-API:er", "Decentraliserad Auktoritet"]
      },
      {
        name: "Icke-linjära Beslutsprotokoll",
        original: "Non-Linear Decision Protocols",
        emoji: "🔄",
        category: "process",
        related: ["Urfolks Kunskapssystem", "Adaptiv Evolution", "Pluriversell Styrning"]
      },
      {
        name: "Intergenerationellt Förvaltarskap",
        original: "Intergenerational Trusteeship",
        emoji: "⏳",
        category: "longterm",
        related: ["Transgenerationella Nyckeltal", "Miljöförvaltning", "Kosmisk Etik"]
      },
      {
        name: "Styrningssandlådor",
        original: "Governance Sandboxes",
        emoji: "🧪",
        category: "structure",
        related: ["Adaptiv Evolution", "Experimentell Styrning", "Decentraliserad Auktoritet"]
      },
      {
        name: "Kosmo-lokal Produktion",
        original: "Cosmo-Local Production",
        emoji: "🌍",
        category: "financial",
        related: ["Resursrättvisa", "Kulturell Autonomi", "Digitala Allmänningar"]
      },
      {
        name: "Polycentrisk Koordinering",
        original: "Polycentric Coordination",
        emoji: "🕸️",
        category: "structure",
        related: ["Metastyrning", "Decentraliserad Auktoritet", "Nästlad Legitimitet"]
      },
      {
        name: "Kosmiska Allmänningar",
        original: "Cosmic Commons",
        emoji: "🚀",
        category: "space",
        related: ["Resursrättvisa", "Kosmisk Etik", "Globala Allmänningar"]
      },
      {
        name: "Icke-Terrestrisk Styrning",
        original: "Non-Terrestrial Governance",
        emoji: "🛰️",
        category: "space",
        related: ["Pluriversell Styrning", "Decentraliserad Auktoritet", "Kosmisk Etik"]
      },
      {
        name: "Medvetandebaserad Styrning",
        original: "Consciousness-Informed Governance",
        emoji: "✨",
        category: "spiritual",
        related: ["Värdekänslig Design", "Epistemisk Rättvisa", "Urfolks Kunskapssystem"]
      },
      {
        name: "Kontemplativ Styrning",
        original: "Contemplative Governance",
        emoji: "🧘",
        category: "spiritual",
        related: ["Reflexiv Cykel", "Icke-linjära Beslutsprotokoll", "Medvetandebaserad Styrning"]
      }
      // Add more Swedish terms following the same pattern
    ]
  };
  
  // Get properly sorted and translated terms
  function getProcessedTerms(locale) {
    const currentBaseTerms = baseTerms[locale] || baseTerms.en;
    const currentGlossary = glossaryData[locale] || glossaryData.en;
    
    // Map terms and add translations
    const translatedTerms = currentBaseTerms.map(term => {
      // Use the original English term as the key if available, otherwise use the term name
      const lookupKey = term.original || term.name;
      
      // Retrieve definition and example from the glossary data
      const termData = currentGlossary.terms[lookupKey] || {};
      
      return {
        ...term,
        definition: termData.definition || `Definition not found for ${term.name}`,
        example: termData.example || `Example not found for ${term.name}`
      };
    });
    
    // Sort alphabetically according to current locale
    return [...translatedTerms].sort((a, b) => 
      a.name.localeCompare(b.name, locale)
    );
  }
  
  // Reactive terms based on current locale
  $: terms = getProcessedTerms($locale);
  
  // Get title and intro directly from glossary data
  $: title = glossaryData[$locale]?.title || glossaryData.en.title;
  $: intro = glossaryData[$locale]?.intro || glossaryData.en.intro;
  $: categoriesText = glossaryData[$locale]?.categories || glossaryData.en.categories;
  $: alphabetText = glossaryData[$locale]?.alphabet || glossaryData.en.alphabet;
  $: exampleText = glossaryData[$locale]?.example || glossaryData.en.example;
  $: relatedText = glossaryData[$locale]?.related || glossaryData.en.related;
  $: contributeText = glossaryData[$locale]?.contribute || glossaryData.en.contribute;
  
  // Filter terms based on selected category
  $: filteredTerms = selectedCategory 
    ? terms.filter(term => term.category === selectedCategory) 
    : terms;
    
  // Group terms by first letter for alphabetical navigation
  $: groupedTerms = filteredTerms.reduce((groups, term) => {
    const firstLetter = term.name.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(term);
    return groups;
  }, {});
  
  // Create alphabet for quick navigation
  $: alphabet = Object.keys(groupedTerms).sort();
  
  // Full alphabet for reference (will show disabled letters if no terms start with them)
  const fullAlphabet = $locale === 'sv' 
    ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ'.split('') 
    : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
</script>

<div class="documentation-container">
  <div class="content">
    <h1>{title}</h1>
    
    <p class="intro">
      {intro}
    </p>
    
    <!-- Category filter -->
    <div class="category-section">
      <h2>{categoriesText.title}</h2>
      <div class="category-filter">
        <button class={selectedCategory === null ? 'active' : ''} 
                on:click={() => selectedCategory = null}>
          {categoriesText.all}
        </button>
        
        {#each Object.entries(categories) as [category, emoji]}
          <button class={selectedCategory === category ? 'active' : ''} 
                  on:click={() => selectedCategory = category}
                  title={categoriesText[category] || category}>
            <span class="category-emoji">{emoji}</span>
            <span class="category-text">{categoriesText[category] || category}</span>
          </button>
        {/each}
      </div>
    </div>
    
    <!-- Alphabet quick-jump -->
    <div class="alphabet-section">
      <h2>{alphabetText.title}</h2>
      <div class="alphabet-nav">
        {#each fullAlphabet as letter}
          <a 
            href={`#${letter}`} 
            class="letter-link {!alphabet.includes(letter) ? 'disabled' : ''}"
            aria-disabled={!alphabet.includes(letter)}
          >
            {letter}
          </a>
        {/each}
      </div>
    </div>
    
    <!-- Glossary terms -->
    <div class="glossary-terms">
      {#each alphabet as letter}
        <div class="letter-section" id={letter}>
          <h2 class="letter-heading">{letter}</h2>
          
          {#each groupedTerms[letter] as term}
            <div class="term">
              <h3>{term.name} <span class="term-emoji">{term.emoji}</span></h3>
              <p class="definition">{term.definition}</p>
              
              <details>
                <summary>{exampleText}</summary>
                <p class="example-text">{term.example}</p>
              </details>
              
              {#if term.related.length > 0}
                <p class="related">
                  <strong>{relatedText}:</strong>
                  {#each term.related as related, i}
                    <a href={`#${related}`}>{related}</a>{i < term.related.length - 1 ? ', ' : ''}
                  {/each}
                </p>
              {/if}
            </div>
          {/each}
        </div>
      {/each}
    </div>
    
    <!-- Contribute section -->
    <div class="contribute">
      <h2>{contributeText.title}</h2>
      <p>
        {contributeText.description} 
        <a href="/contact">{contributeText.contact}</a>.
      </p>
    </div>
  </div>
</div>

<style>
  .documentation-container {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1.25rem;
    box-sizing: border-box;
  }

  .content {
    width: 100%;
    min-width: 0;
  }

  @media (max-width: 768px) {
    .documentation-container {
      padding: 1.25rem 1rem;
    }
  }

  .content h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2B4B8C; /* Matches your cosmic-dark color scheme */
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 3px solid #DAA520; /* Gold accent that matches your design */
    display: inline-block;
  }
  
  .intro {
    margin-bottom: 2rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  .category-section {
    margin-bottom: 2rem;
  }
  
  .category-section h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2B4B8C;
    margin-bottom: 1rem;
  }
  
  .category-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .category-filter button {
    padding: 0.5rem 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    background-color: #f9fafb;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .category-filter button.active {
    background-color: #2B4B8C;
    color: white;
    border-color: #2B4B8C;
  }
  
  .category-filter button:hover:not(.active) {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }
  
  .alphabet-section {
    margin-bottom: 2rem;
  }
  
  .alphabet-section h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2B4B8C;
    margin-bottom: 1rem;
  }
  
  .alphabet-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .alphabet-nav .letter-link {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #2B4B8C;
    border-radius: 0.25rem;
    background-color: #f9fafb;
    font-weight: 600;
    transition: all 0.2s;
  }
  
  .alphabet-nav .letter-link:hover:not(.disabled) {
    background-color: #2B4B8C;
    color: white;
  }
  
  .alphabet-nav .letter-link.disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  .letter-section {
    margin-bottom: 2rem;
    scroll-margin-top: 2rem;
  }
  
  .letter-heading {
    font-size: 1.5rem;
    font-weight: 700;
    color: #DAA520;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #DAA520;
    margin-bottom: 1.5rem;
  }
  
  .term {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .term:last-child {
    border-bottom: none;
  }
  
  .term h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2B4B8C;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
  }
  
  .term-emoji {
    margin-left: 0.5rem;
    font-size: 1.25rem;
  }
  
  .term .definition {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  .term details {
    margin-bottom: 1rem;
    border-radius: 0.375rem;
    overflow: hidden;
  }
  
  .term details summary {
    cursor: pointer;
    font-weight: 500;
    color: #2B4B8C;
    padding: 0.75rem;
    background-color: #f9fafb;
    border-radius: 0.375rem;
    transition: all 0.2s;
  }
  
  .term details summary:hover {
    background-color: #f3f4f6;
  }
  
  .term details[open] summary {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .term details .example-text {
    padding: 1rem;
    background-color: #f9fafb;
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
    margin: 0;
    color: #4b5563;
  }
  
  .term .related {
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 1rem;
  }
  
  .term .related a {
    color: #2B4B8C;
    text-decoration: none;
    transition: all 0.2s;
  }
  
  .term .related a:hover {
    color: #DAA520;
    text-decoration: underline;
  }
  
  .contribute {
    margin-top: 3rem;
    padding: 1.5rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;
    border-left: 4px solid #DAA520;
  }
  
  .contribute h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2B4B8C;
    margin-bottom: 0.75rem;
  }
  
  @media (max-width: 768px) {
    .category-filter {
      flex-direction: column;
      align-items: stretch;
      max-height: 300px;
      overflow-y: auto;
      padding-right: 0.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
    }
    
    .category-filter button {
      width: 100%;
      text-align: left;
    }
    
    .alphabet-nav {
      justify-content: center;
    }
  }
</style>
