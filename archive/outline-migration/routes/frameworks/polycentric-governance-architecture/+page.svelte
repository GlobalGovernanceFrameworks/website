<!-- src/routes/frameworks/polycentric-governance/+page.svelte -->
<script>
	import { t, locale, isLocaleLoaded } from '$lib/i18n';
	import { getFrameworkBySlug, statusMapping } from '$lib/stores/frameworkNav.js';
	import FrameworkLayout from '$lib/components/FrameworkLayout.svelte';
	import { initializeFrameworkPageScroll } from '$lib/utils/scrollManager.js';
	import { onMount } from 'svelte';

	// --- PROPS ---
	let { data } = $props();

	// --- FRAMEWORK-SPECIFIC DATA ---
	const framework = getFrameworkBySlug('polycentric-governance');

	// --- STATE (for this page's content) ---
	let selectedGuide = $state('at-a-glance');

	// --- DERIVED STATE ---
	let polycentricGovernance = $derived($t('polycentricGovernance') || {});
	
	let currentLocale = $derived($locale || 'en');
	let translationsReady = $derived($isLocaleLoaded || false);
	let statusText = $derived(framework ? getStatusText(framework.status) : 'Status Unknown');
	let statusClass = $derived(framework ? getStatusClass(framework.status) : 'concept');

	// --- STATUS & PDF LOGIC (specific to this page) ---
	function getStatusText(status) {
		const statusKey = statusMapping[status];
		if (statusKey) {
			const translated = translationsReady ? $t(statusKey) : null;
			if (translated && translated !== statusKey) return translated;
		}
		// Fallback...
		switch (status) {
			case 'ready':
				return 'Ready';
			case 'review':
				return 'In Review';
			case 'planned':
				return 'Planned';
			default:
				return status || 'Unknown';
		}
	}

	function getStatusClass(status) {
		return status ? status.replace(/-/, ' ') : 'concept';
	}

	let pdfPath = $derived(
		framework && framework.slug && framework.version
			? `/downloads/${currentLocale === 'sv' ? 'sv' : 'en'}/${framework.slug}-framework-v${
					framework.version
				}.pdf`
			: ''
	);

	let pdfLabel = $derived(
		translationsReady
			? ($t('common.actions.downloadPdf') ||
					(currentLocale === 'sv' ? 'Ladda ner PDF' : 'Download PDF'))
			: ($t('common.ui.loading') || 'Loading...')
	);

	// --- PASS DATA TO LAYOUT ---
	let pdfInfo = $derived({ path: pdfPath, label: pdfLabel });
	let statusInfo = $derived({ text: statusText, class: statusClass });

	// --- SECTION GROUPINGS (for this page) ---
	const sectionGroups = {
		overview: ['index', 'at-a-glance'],
		foundation: ['introduction', 'principles'],
		structure: ['architecture', 'power-distribution'],
		operations: ['coordination', 'implementation'],
		assessment: ['evaluation', 'examples'],
		ecosystem: ['integration'],
		resources: ['appendix-a']
	};

 const navGroups = [
   {
     id: 'overview',
     titleKey: 'overview',
     defaultTitle: 'Overview',
     icon: '📋',
     sections: sectionGroups.overview
   },
   {
     id: 'foundation',
     titleKey: 'foundation',
     defaultTitle: 'Foundation',
     icon: '🏛️',
     sections: sectionGroups.foundation
   },
   {
     id: 'structure',
     titleKey: 'structure',
     defaultTitle: 'Structure',
     icon: '🏗️',
     sections: sectionGroups.structure
   },
   {
     id: 'operations',
     titleKey: 'operations',
     defaultTitle: 'Operations',
     icon: '⚙️',
     sections: sectionGroups.operations
   },
   {
     id: 'assessment',
     titleKey: 'assessment',
     defaultTitle: 'Assessment',
     icon: '📊',
     sections: sectionGroups.assessment
   },
   {
     id: 'ecosystem',
     titleKey: 'ecosystem',
     defaultTitle: 'Ecosystem',
     icon: '🌐',
     sections: sectionGroups.ecosystem
   },
   {
     id: 'resources',
     titleKey: 'resources',
     defaultTitle: 'Resources',
     icon: '📚',
     sections: sectionGroups.resources
   }
 ];


	// --- QUICK START GUIDES (for index page) ---
	let quickStartGuides = $derived(
		Array.isArray(polycentricGovernance?.quickStart?.guides)
			? polycentricGovernance.quickStart.guides
			: []
	);

	function selectGuide(guide, setActiveSection) {
		selectedGuide = guide;
		setActiveSection(guide);
	}

	// --- PAGE-SPECIFIC I18N OBJECT ---
	let i18nPageObject = $derived({
		...polycentricGovernance,
		sectionIcons: {
			index: framework?.emoji || '🕸️',
			'at-a-glance': '⚡',
			introduction: '🎯',
			principles: '⚖️',
			architecture: '🏗️',
			'power-distribution': '⚖️',
			coordination: '🤝',
			implementation: '🛤️',
			evaluation: '📊',
			examples: '🌍',
			integration: '🌐',
			'appendix-a': '📋'
		}
	});

	// --- PAGE-SPECIFIC REACTIVITY ---
	const allQuickStartSections = ['at-a-glance'];

	// --- SCROLL MANAGEMENT ---
	onMount(() => {
		initializeFrameworkPageScroll();
	});
</script>

<svelte:head>
	<title>
		{i18nPageObject.meta?.title ||
			'Polycentric Governance Architecture - Distributed Authority Framework'}
	</title>
	<meta
		name="description"
		content={i18nPageObject.meta?.description ||
			'Structural blueprint for distributed authority and voluntary coordination - from ancient Indigenous confederacies to modern internet governance, proven architecture for complex challenges through polycentric coordination.'}
	/>
</svelte:head>

<FrameworkLayout
	{framework}
	{data}
	{navGroups}
	{i18nPageObject}
	{pdfInfo}
	status={statusInfo}
>
	<svelte:fragment slot="default" let:activeSection let:setActiveSection>
		{#if activeSection === 'index'}
			<div class="intro-section">
				<div class="intro-header">
					{#if framework}
						<div class="framework-badges-container">
							<div class="framework-badge">
								<span class="badge-icon">{framework?.emoji || '🕸️'}</span>
								<span>{framework?.title || 'Polycentric Governance Architecture'}</span>
							</div>

							<div class="framework-meta-badge">
								<span class="status-badge {statusInfo.class}" title={statusInfo.text}>
									{statusInfo.text}
								</span>
								{#if framework?.version}
									<span class="version-badge">v{framework.version}</span>
								{/if}
							</div>
						</div>
					{/if}

					<h1 class="main-title">
						{i18nPageObject.meta?.title || 'Polycentric Governance Architecture'}
					</h1>
					<p class="intro-description">
						{i18nPageObject.meta?.description ||
							'Structural blueprint for distributed authority and voluntary coordination—enabling governance across autonomous centers without centralized command, from ancient Indigenous confederacies to modern internet governance.'}
					</p>
				</div>

				<div class="quick-start-section">
					<h2 class="section-title">
						<span class="title-icon">⚡</span>
						<span>{polycentricGovernance.navigation?.beginYourJourney || 'Quick start'}</span>
					</h2>

					<div class="guide-cards">
						{#each quickStartGuides as guide}
							<div class="guide-card" class:active={selectedGuide === guide.id}>
								<div class="card-header">
									<div class="card-icon">{guide.icon}</div>
									<h3 class="card-title">{guide.title}</h3>
								</div>
								<div class="card-description">
									<p>{guide.description}</p>
								</div>
								<div class="card-actions">
									<button
										type="button"
										class="guide-btn"
										class:primary={selectedGuide === guide.id}
										on:click={() => selectGuide(guide.id, setActiveSection)}
									>
										{selectedGuide === guide.id ? 'Reading' : 'Read guide'}
									</button>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<div class="index-navigation">
					<button
						type="button"
						class="nav-btn primary"
						on:click={() => setActiveSection('introduction')}
					>
						<span class="btn-icon">🎯</span>
						<span>{polycentricGovernance.navigation?.exploreFramework || 'Explore framework'}</span>
						<span class="btn-arrow">→</span>
					</button>
				</div>
			</div>
		{:else if allQuickStartSections.includes(activeSection)}
			<div class="guide-container">
				<div class="guide-header">
					<button type="button" class="back-btn" on:click={() => setActiveSection('index')}>
						<span>{polycentricGovernance.navigation?.backToFrameworksOverview || '← Back to overview'}</span>
					</button>

					<div class="guide-navigation">
						{#each quickStartGuides as guide}
							<button
								type="button"
								class="guide-nav-btn"
								class:active={activeSection === guide.id}
								on:click={() => setActiveSection(guide.id)}
							>
								<span class="guide-nav-icon">{guide.icon}</span>
								<span>{guide.title}</span>
							</button>
						{/each}
					</div>
				</div>

				<div class="section-content">
					<div class="content">
						{#if data?.sections?.[activeSection]}
							<svelte:component this={data.sections[activeSection].default} />
						{:else}
							<div class="missing-section">
								<h2>Section not found</h2>
								<p>The section "{activeSection}" could not be loaded.</p>
								<button type="button" on:click={() => setActiveSection('index')}>
									Return to overview
								</button>
							</div>
						{/if}
					</div>
				</div>

				<div class="section-navigation">
					{#if activeSection === 'at-a-glance'}
						<button
							type="button"
							class="nav-btn primary"
							on:click={() => setActiveSection('introduction')}
						>
							<span class="btn-icon">🎯</span>
							<span>Introduction</span>
							<span class="btn-arrow">→</span>
						</button>
					{/if}
				</div>
			</div>
		{:else}
			<div class="section-container">
				<div class="section-content">
					<div class="content">
						{#if data?.sections?.[activeSection]}
							<svelte:component this={data.sections[activeSection].default} />
						{:else}
							<div class="missing-section">
								<h2>
									{polycentricGovernance.errors?.sectionNotFound?.replace('{section}', activeSection) ||
										`Section "${activeSection}" not found`}
								</h2>
								<p>
									{polycentricGovernance.errors?.contentInDevelopment ||
										'This content is still being developed.'}
								</p>
								<button
									type="button"
									class="nav-btn secondary"
									on:click={() => setActiveSection('index')}
								>
									<span class="btn-icon">🏠</span>
									<span>Return to overview</span>
								</button>
							</div>
						{/if}
					</div>
				</div>

    <div class="section-navigation">
      {#if activeSection === 'introduction'}
        <button
          type="button"
          class="nav-btn secondary"
          on:click={() => setActiveSection('at-a-glance')}
          style="margin-right: auto;"
        >
          <span class="btn-arrow">←</span>
          <span>{polycentricGovernance?.sectionsShort?.['at-a-glance'] || polycentricGovernance?.sections?.['at-a-glance'] || 'At a glance'}</span>
        </button>
        <button
          type="button"
          class="nav-btn primary"
          on:click={() => setActiveSection('principles')}
        >
          <span class="btn-icon">⚖️</span>
          <span>{polycentricGovernance?.sectionsShort?.principles || polycentricGovernance?.sections?.principles || 'Core principles'}</span>
          <span class="btn-arrow">→</span>
        </button>
      {:else if activeSection === 'principles'}
        <button
          type="button"
          class="nav-btn secondary"
          on:click={() => setActiveSection('introduction')}
          style="margin-right: auto;"
        >
          <span class="btn-arrow">←</span>
          <span>{polycentricGovernance?.sectionsShort?.introduction || polycentricGovernance?.sections?.introduction || 'Introduction'}</span>
        </button>
        <button
          type="button"
          class="nav-btn primary"
          on:click={() => setActiveSection('architecture')}
        >
          <span class="btn-icon">🏗️</span>
          <span>{polycentricGovernance?.sectionsShort?.architecture || polycentricGovernance?.sections?.architecture || 'Architecture'}</span>
          <span class="btn-arrow">→</span>
        </button>
      {:else if activeSection === 'architecture'}
        <button
          type="button"
          class="nav-btn secondary"
          on:click={() => setActiveSection('principles')}
          style="margin-right: auto;"
        >
          <span class="btn-arrow">←</span>
          <span>{polycentricGovernance?.sectionsShort?.principles || polycentricGovernance?.sections?.principles || 'Principles'}</span>
        </button>
        <button
          type="button"
          class="nav-btn primary"
          on:click={() => setActiveSection('power-distribution')}
        >
          <span class="btn-icon">⚖️</span>
          <span>{polycentricGovernance?.sectionsShort?.['power-distribution'] || polycentricGovernance?.sections?.['power-distribution'] || 'Power distribution'}</span>
          <span class="btn-arrow">→</span>
        </button>
      {:else if activeSection === 'power-distribution'}
        <button
          type="button"
          class="nav-btn secondary"
          on:click={() => setActiveSection('architecture')}
          style="margin-right: auto;"
        >
          <span class="btn-arrow">←</span>
          <span>{polycentricGovernance?.sectionsShort?.architecture || polycentricGovernance?.sections?.architecture || 'Architecture'}</span>
        </button>
        <button
          type="button"
          class="nav-btn primary"
          on:click={() => setActiveSection('coordination')}
        >
          <span class="btn-icon">🤝</span>
          <span>{polycentricGovernance?.sectionsShort?.coordination || polycentricGovernance?.sections?.coordination || 'Coordination'}</span>
          <span class="btn-arrow">→</span>
        </button>
      {:else if activeSection === 'coordination'}
        <button
          type="button"
          class="nav-btn secondary"
          on:click={() => setActiveSection('power-distribution')}
          style="margin-right: auto;"
        >
          <span class="btn-arrow">←</span>
          <span>{polycentricGovernance?.sectionsShort?.['power-distribution'] || polycentricGovernance?.sections?.['power-distribution'] || 'Power distribution'}</span>
        </button>
        <button
          type="button"
          class="nav-btn primary"
          on:click={() => setActiveSection('implementation')}
        >
          <span class="btn-icon">🛤️</span>
          <span>{polycentricGovernance?.sectionsShort?.implementation || polycentricGovernance?.sections?.implementation || 'Implementation'}</span>
          <span class="btn-arrow">→</span>
        </button>
      {:else if activeSection === 'implementation'}
        <button
          type="button"
          class="nav-btn secondary"
          on:click={() => setActiveSection('coordination')}
          style="margin-right: auto;"
        >
          <span class="btn-arrow">←</span>
          <span>{polycentricGovernance?.sectionsShort?.coordination || polycentricGovernance?.sections?.coordination || 'Coordination'}</span>
        </button>
        <button
          type="button"
          class="nav-btn primary"
          on:click={() => setActiveSection('evaluation')}
        >
          <span class="btn-icon">📊</span>
          <span>{polycentricGovernance?.sectionsShort?.evaluation || polycentricGovernance?.sections?.evaluation || 'Evaluation'}</span>
          <span class="btn-arrow">→</span>
        </button>
      {:else if activeSection === 'evaluation'}
        <button
          type="button"
          class="nav-btn secondary"
          on:click={() => setActiveSection('implementation')}
          style="margin-right: auto;"
        >
          <span class="btn-arrow">←</span>
          <span>{polycentricGovernance?.sectionsShort?.implementation || polycentricGovernance?.sections?.implementation || 'Implementation'}</span>
        </button>
        <button
          type="button"
          class="nav-btn primary"
          on:click={() => setActiveSection('examples')}
        >
          <span class="btn-icon">🌍</span>
          <span>{polycentricGovernance?.sectionsShort?.examples || polycentricGovernance?.sections?.examples || 'Examples'}</span>
          <span class="btn-arrow">→</span>
        </button>
      {:else if activeSection === 'examples'}
        <button
          type="button"
          class="nav-btn secondary"
          on:click={() => setActiveSection('evaluation')}
          style="margin-right: auto;"
        >
          <span class="btn-arrow">←</span>
          <span>{polycentricGovernance?.sectionsShort?.evaluation || polycentricGovernance?.sections?.evaluation || 'Evaluation'}</span>
        </button>
        <button
          type="button"
          class="nav-btn primary"
          on:click={() => setActiveSection('integration')}
        >
          <span class="btn-icon">🌐</span>
          <span>{polycentricGovernance?.sectionsShort?.integration || polycentricGovernance?.sections?.integration || 'Integration'}</span>
          <span class="btn-arrow">→</span>
        </button>
      {:else if activeSection === 'integration'}
        <button
          type="button"
          class="nav-btn secondary"
          on:click={() => setActiveSection('examples')}
          style="margin-right: auto;"
        >
          <span class="btn-arrow">←</span>
          <span>{polycentricGovernance?.sectionsShort?.examples || polycentricGovernance?.sections?.examples || 'Examples'}</span>
        </button>
        <button
          type="button"
          class="nav-btn primary"
          on:click={() => setActiveSection('appendix-a')}
        >
          <span class="btn-icon">📚</span>
          <span>{polycentricGovernance?.sectionsShort?.['appendix-a'] || polycentricGovernance?.sections?.['appendix-a'] || 'Appendices'}</span>
          <span class="btn-arrow">→</span>
        </button>
      {:else if activeSection === 'appendix-a'}
        <button
          type="button"
          class="nav-btn secondary"
          on:click={() => setActiveSection('integration')}
          style="margin-right: auto;"
        >
          <span class="btn-arrow">←</span>
          <span>{polycentricGovernance?.sectionsShort?.integration || polycentricGovernance?.sections?.integration || 'Integration'}</span>
        </button>
      {/if}
    </div>
			</div>
		{/if}
	</svelte:fragment>
</FrameworkLayout>
