<!-- src/routes/frameworks/fractal-intelligence-accord/+page.svelte -->
<script>
	import { t, locale, isLocaleLoaded, translations } from '$lib/i18n';
	import { browser } from '$app/environment';
	import { getFrameworkBySlug, statusMapping } from '$lib/stores/frameworkNav.js';
	import FrameworkLayout from '$lib/components/FrameworkLayout.svelte';
	import { initializeFrameworkPageScroll } from '$lib/utils/scrollManager.js';
	import { onMount } from 'svelte';

	// --- PROPS ---
	let { data } = $props();

	// --- FRAMEWORK-SPECIFIC DATA ---
	const framework = getFrameworkBySlug('fractal-intelligence-accord');

	// --- DERIVED STATE ---
	let accordFramework = $derived($t('fractalIntelligenceAccord') || {});
	let currentLocale = $derived($locale || 'en');
	let translationsReady = $derived($isLocaleLoaded || false);
	let statusText = $derived(framework ? getStatusText(framework.status) : 'Outline');
	let statusClass = $derived(framework ? getStatusClass(framework.status) : 'concept');

	function getStatusText(status) {
		const statusKey = statusMapping[status];
		if (statusKey) {
			const translated = translationsReady ? $t(statusKey) : null;
			if (translated && translated !== statusKey) return translated;
		}
		switch (status) {
			case 'ready': return 'Ready';
			case 'review': return 'In Review';
			case 'planned': return 'Planned';
			case 'outline': return 'Outline';
			default: return status || 'Unknown';
		}
	}

	function getStatusClass(status) {
		return status ? status.replace(/-/, ' ') : 'concept';
	}

	// --- PDF ---
	let charterPdfPath = $derived(
		`/downloads/${currentLocale === 'sv' ? 'sv' : 'en'}/fractal-intelligence-accord-charter-v1.0.pdf`
	);
	let protocolPdfPath = $derived(
		`/downloads/${currentLocale === 'sv' ? 'sv' : 'en'}/fractal-intelligence-accord-transition-protocol-v1.0.pdf`
	);
	let pdfLabel = $derived(
		translationsReady
			? ($t('common.actions.downloadPdf') || (currentLocale === 'sv' ? 'Ladda ner PDF' : 'Download PDF'))
			: ($t('common.ui.loading') || 'Loading...')
	);

	// No single PDF for the FrameworkLayout — we handle downloads per-document
	let pdfInfo = $derived({ path: '', label: pdfLabel });
	let statusInfo = $derived({ text: statusText, class: statusClass });

	// --- SECTION GROUPS ---
	const sectionGroups = {
		overview: ['index'],
		documents: ['charter', 'transition-protocol']
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
			id: 'documents',
			titleKey: 'documents',
			defaultTitle: 'Documents',
			icon: '📄',
			sections: sectionGroups.documents
		}
	];

	// --- i18n PAGE OBJECT ---
	let i18nPageObject = $derived({
		...accordFramework,
		sectionIcons: {
			index: '🧠',
			charter: '📜',
			'transition-protocol': '🗺️'
		}
	});

	// --- DOCUMENT CARDS ---
	let documentCards = $derived(() => {
		try {
			const cards = accordFramework?.documentCards;
			if (Array.isArray(cards)) return cards;
		} catch (e) { /* fallback */ }
		return [
			{
				id: 'charter',
				icon: '📜',
				title: 'The Fractal Intelligence Charter',
				subtitle: 'Philosophical & Visionary',
				description: 'The foundational values document — why AGI must be governed for human meaning, not extraction.'
			},
			{
				id: 'transition-protocol',
				icon: '🗺️',
				title: 'Transition Protocol',
				subtitle: 'Operational & Living',
				description: 'The phased implementation pathway — from shadow commons to full subsidiarity.'
			}
		];
	});

	// --- SCROLL ---
	onMount(() => {
		initializeFrameworkPageScroll();
	});
</script>

<svelte:head>
	<title>
		{i18nPageObject.meta?.title || 'Fractal Intelligence Accord — Global Governance Framework'}
	</title>
	<meta
		name="description"
		content={i18nPageObject.meta?.description ||
			'AGI governance for human meaning: a charter and transition protocol for compute subsidiarity, contextual intelligence, and cognitive sovereignty.'}
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
								<span class="badge-icon">{framework?.emoji || '🧠'}</span>
								<span>{framework?.title || 'Fractal Intelligence Accord'}</span>
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
						{i18nPageObject.meta?.title || 'The Fractal Intelligence Accord'}
					</h1>
					<p class="intro-description">
						{i18nPageObject.meta?.description ||
							'A framework for AGI governance, compute subsidiarity, and contextual intelligence — split into a foundational charter and a living transition protocol.'}
					</p>
				</div>

				<div class="document-cards-section">
					<h2 class="section-title">
						<span class="title-icon">📄</span>
						<span>{accordFramework?.categories?.documents || 'Documents'}</span>
					</h2>

					<div class="document-cards">
						{#each documentCards as card}
							<button
								type="button"
								class="document-card"
								on:click={() => setActiveSection(card.id)}
							>
								<div class="card-header">
									<div class="card-icon">{card.icon}</div>
									<div class="card-titles">
										<h3 class="card-title">{card.title}</h3>
										<span class="card-subtitle">{card.subtitle}</span>
									</div>
								</div>
								<p class="card-description">{card.description}</p>
								<div class="card-action">
									<span>{accordFramework?.navigation?.readDocument || 'Read'}</span>
									<span class="btn-arrow">→</span>
								</div>
							</button>
						{/each}
					</div>
				</div>

				<div class="accord-context">
					<h2 class="section-title">
						<span class="title-icon">🔗</span>
						<span>{accordFramework?.context?.title || 'Document Relationship'}</span>
					</h2>
					<p class="context-text">
						{accordFramework?.context?.description ||
							'The Charter articulates the philosophical vision — what AGI governance must protect and why. The Transition Protocol specifies the operational pathway — phased implementation from the 2026 reality toward full cognitive subsidiarity. The Charter provides the principles; the Protocol provides the mechanisms.'}
					</p>
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
									{accordFramework?.errors?.sectionNotFound?.replace('{section}', activeSection) ||
										`Section "${activeSection}" not found`}
								</h2>
								<p>
									{accordFramework?.errors?.contentInDevelopment ||
										'This content is still being developed.'}
								</p>
								<button
									type="button"
									class="nav-btn secondary"
									on:click={() => setActiveSection('index')}
								>
									<span class="btn-icon">🏠</span>
									<span>{accordFramework?.navigation?.backToOverview || 'Return to Overview'}</span>
								</button>
							</div>
						{/if}
					</div>
				</div>

				<!-- Download button for current document -->
				<div class="document-download">
					{#if activeSection === 'charter'}
						<a href={charterPdfPath} class="download-btn" download>
							<span class="btn-icon">📥</span>
							<span>{accordFramework?.navigation?.downloadCharter || 'Download Charter PDF'}</span>
						</a>
					{:else if activeSection === 'transition-protocol'}
						<a href={protocolPdfPath} class="download-btn" download>
							<span class="btn-icon">📥</span>
							<span>{accordFramework?.navigation?.downloadProtocol || 'Download Transition Protocol PDF'}</span>
						</a>
					{/if}
				</div>

				<!-- Section navigation -->
				<div class="section-navigation">
					{#if activeSection === 'charter'}
						<div></div>
						<button
							type="button"
							class="nav-btn primary"
							on:click={() => setActiveSection('transition-protocol')}
						>
							<span class="btn-icon">🗺️</span>
							<span>{accordFramework?.sections?.['transition-protocol'] || 'Transition Protocol'}</span>
							<span class="btn-arrow">→</span>
						</button>
					{:else if activeSection === 'transition-protocol'}
						<button
							type="button"
							class="nav-btn secondary"
							on:click={() => setActiveSection('charter')}
							style="margin-right: auto;"
						>
							<span class="btn-arrow">←</span>
							<span>{accordFramework?.sections?.charter || 'Charter'}</span>
						</button>
						<button
							type="button"
							class="nav-btn secondary"
							on:click={() => setActiveSection('index')}
						>
							<span class="btn-icon">🏠</span>
							<span>{accordFramework?.navigation?.backToOverview || 'Overview'}</span>
						</button>
					{/if}
				</div>
			</div>
		{/if}
	</svelte:fragment>
</FrameworkLayout>

<style>
	/* Document cards */
	.document-cards-section {
		margin-top: 2rem;
	}

	.document-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.25rem;
		margin-top: 1rem;
	}

	.document-card {
		background: var(--card-bg, rgba(255, 255, 255, 0.05));
		border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
		border-radius: 12px;
		padding: 1.5rem;
		text-align: left;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.document-card:hover {
		border-color: var(--accent-color, #60a5fa);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.card-header {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.card-icon {
		font-size: 1.75rem;
		line-height: 1;
		flex-shrink: 0;
	}

	.card-titles {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.card-title {
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0;
		color: var(--text-primary, #f0f0f0);
	}

	.card-subtitle {
		font-size: 0.8rem;
		color: var(--text-muted, #888);
		font-style: italic;
	}

	.card-description {
		font-size: 0.9rem;
		color: var(--text-secondary, #ccc);
		line-height: 1.5;
		margin: 0;
		flex: 1;
	}

	.card-action {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--accent-color, #60a5fa);
		margin-top: 0.25rem;
	}

	/* Context section */
	.accord-context {
		margin-top: 2.5rem;
		padding: 1.5rem;
		background: var(--card-bg, rgba(255, 255, 255, 0.03));
		border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
		border-radius: 12px;
	}

	.context-text {
		font-size: 0.95rem;
		color: var(--text-secondary, #ccc);
		line-height: 1.6;
		margin: 0.5rem 0 0 0;
	}

	/* Document download */
	.document-download {
		display: flex;
		justify-content: center;
		margin: 2rem 0 1rem;
	}

	.download-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: var(--card-bg, rgba(255, 255, 255, 0.05));
		border: 1px solid var(--border-color, rgba(255, 255, 255, 0.15));
		border-radius: 8px;
  color: var(--text-secondary, #aaa);
		text-decoration: none;
		font-size: 0.9rem;
		transition: all 0.2s ease;
	}

	.download-btn:hover {
		background: var(--accent-color, #60a5fa);
		color: white;
		border-color: var(--accent-color, #60a5fa);
	}

	/* Shared styles matching treaty page */
	.intro-section {
		max-width: 800px;
		margin: 0 auto;
	}

	.intro-header {
		margin-bottom: 2rem;
	}

	.framework-badges-container {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.framework-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.35rem 0.75rem;
		background: var(--card-bg, rgba(255, 255, 255, 0.05));
		border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
		border-radius: 20px;
		font-size: 0.85rem;
		color: var(--text-secondary, #ccc);
	}

	.badge-icon {
		font-size: 1.1rem;
	}

	.framework-meta-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.status-badge {
		padding: 0.2rem 0.6rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 500;
		background: var(--status-bg, rgba(96, 165, 250, 0.15));
		color: var(--status-color, #60a5fa);
	}

	.version-badge {
		font-size: 0.75rem;
		color: var(--text-muted, #888);
	}

	.main-title {
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 0.75rem 0;
		color: var(--text-primary, #f0f0f0);
	}

	.intro-description {
		font-size: 1.05rem;
		color: var(--text-secondary, #ccc);
		line-height: 1.6;
		margin: 0;
	}

	.section-title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.15rem;
		font-weight: 600;
		color: var(--text-primary, #f0f0f0);
		margin: 0 0 0.5rem 0;
	}

	.title-icon {
		font-size: 1.2rem;
	}

	/* Section container & navigation */
	.section-container {
		max-width: 800px;
		margin: 0 auto;
	}

	.section-navigation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		margin-top: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
	}

	.nav-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 1.2rem;
		border: 1px solid var(--border-color, rgba(255, 255, 255, 0.15));
		border-radius: 8px;
		background: var(--card-bg, rgba(255, 255, 255, 0.05));
		color: var(--text-primary, #f0f0f0);
		cursor: pointer;
		font-size: 0.9rem;
		transition: all 0.2s ease;
	}

	.nav-btn:hover {
		border-color: var(--accent-color, #60a5fa);
	}

	.nav-btn.primary {
		background: var(--accent-color, #60a5fa);
		border-color: var(--accent-color, #60a5fa);
		color: white;
	}

	.nav-btn.primary:hover {
		opacity: 0.9;
	}

	.nav-btn.secondary {
		background: transparent;
	}

	.btn-icon {
		font-size: 1rem;
	}

	.btn-arrow {
		font-size: 0.9rem;
	}

	.missing-section {
		text-align: center;
		padding: 3rem 1rem;
	}

	.missing-section h2 {
		margin-bottom: 0.5rem;
	}

	.missing-section p {
		color: var(--text-muted, #888);
		margin-bottom: 1.5rem;
	}

	@media (max-width: 640px) {
		.main-title {
			font-size: 1.5rem;
		}

		.document-cards {
			grid-template-columns: 1fr;
		}

		.section-navigation {
			flex-direction: column;
		}

		.nav-btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>
