<!-- src/routes/frameworks/global-citizenship/components/FrameworkConnections.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import { generateRecommendations, frameworks, frameworkStatus, tiers } from './compassData.js';
  
  export let quizResults = null;
  
  $: recommendedFrameworks = generateRecommendations(quizResults);
  $: primaryFrameworks = recommendedFrameworks.slice(0, 3);
  $: relatedFrameworks = recommendedFrameworks.slice(3, 8);

  function getTierColor(tier) {
    switch (tier) {
      case tiers.TIER_0:
        return '#8B5A3C'; // Brown
      case tiers.TIER_1:
        return '#DC2626'; // Red
      case tiers.TIER_2:
        return '#2563EB'; // Blue
      case tiers.TIER_3:
        return '#7C3AED'; // Purple
      case tiers.TIER_4:
        return '#059669'; // Green
      default:
        return '#6B7280'; // Gray
    }
  }

  function getTierLabel(tier) {
    switch (tier) {
      case tiers.TIER_0:
        return $t('globalCitizenship.tiers.tier0');
      case tiers.TIER_1:
        return $t('globalCitizenship.tiers.tier1');
      case tiers.TIER_2:
        return $t('globalCitizenship.tiers.tier2');
      case tiers.TIER_3:
        return $t('globalCitizenship.tiers.tier3');
      case tiers.TIER_4:
        return $t('globalCitizenship.tiers.tier4');
      default:
        return '';
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case frameworkStatus.READY:
        return '#10B981'; // Green
      case frameworkStatus.IN_REVIEW:
        return '#F59E0B'; // Orange
      case frameworkStatus.PLANNED:
        return '#6B7280'; // Gray
      default:
        return '#6B7280';
    }
  }

  function getStatusText(status) {
    switch (status) {
      case frameworkStatus.READY:
        return $t('globalCitizenship.compass.status.ready');
      case frameworkStatus.IN_REVIEW:
        return $t('globalCitizenship.compass.status.inReview');
      case frameworkStatus.PLANNED:
        return $t('globalCitizenship.compass.status.planned');
      default:
        return '';
    }
  }
</script>

{#if quizResults && recommendedFrameworks.length > 0}
  <div class="framework-connections">
    <!-- Primary Recommendations -->
    {#if primaryFrameworks.length > 0}
      <div class="recommendations-section primary">
        <div class="section-header">
          <h3>{$t('globalCitizenship.recommendations.primary.title')}</h3>
          <p>{$t('globalCitizenship.recommendations.primary.description')}</p>
        </div>
        
        <div class="frameworks-grid">
          {#each primaryFrameworks as framework}
            <div class="framework-card primary-card">
              <div class="card-header">
                <div class="tier-badge" style="background-color: {getTierColor(framework.tier)}">
                  {getTierLabel(framework.tier)}
                </div>
                <div class="status-badge" style="background-color: {getStatusColor(framework.status)}">
                  {getStatusText(framework.status)}
                </div>
              </div>
              
              <div class="card-content">
                <h4>
                  {#if framework.status === frameworkStatus.READY || framework.status === frameworkStatus.IN_REVIEW}
                    <a href="{base}{framework.path}" class="framework-link">
                      {$t(`globalCitizenship.frameworks.database.${framework.id}.name`)}
                    </a>
                  {:else}
                    <span class="framework-name planned">
                      {$t(`globalCitizenship.frameworks.database.${framework.id}.name`)}
                    </span>
                  {/if}
                </h4>
                <p>{$t(`globalCitizenship.frameworks.database.${framework.id}.description`)}</p>
                
                {#if framework.id === 'treatyFoundation'}
                  <div class="foundation-note">
                    {$t('globalCitizenship.recommendations.foundationNote')}
                  </div>
                {/if}
                
                {#if framework.status === frameworkStatus.PLANNED}
                  <div class="planned-note">
                    <span>{$t('globalCitizenship.compass.info.plannedFrameworks.short')}</span>
                    <a href="{base}/contact" class="contact-link">
                      {$t('globalCitizenship.compass.info.plannedFrameworks.linkText')}
                    </a>
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
    
    <!-- Related Recommendations -->
    {#if relatedFrameworks.length > 0}
      <div class="recommendations-section related">
        <div class="section-header">
          <h3>{$t('globalCitizenship.recommendations.related.title')}</h3>
          <p>{$t('globalCitizenship.recommendations.related.description')}</p>
        </div>
        
        <div class="frameworks-list">
          {#each relatedFrameworks as framework}
            <div class="framework-item">
              <div class="item-header">
                <div class="tier-indicator" style="background-color: {getTierColor(framework.tier)}"></div>
                <div class="status-indicator" style="background-color: {getStatusColor(framework.status)}"></div>
                <h5>
                  {#if framework.status === frameworkStatus.READY || framework.status === frameworkStatus.IN_REVIEW}
                    <a href="{base}{framework.path}" class="framework-link">
                      {$t(`globalCitizenship.frameworks.database.${framework.id}.name`)}
                    </a>
                  {:else}
                    <span class="framework-name planned">
                      {$t(`globalCitizenship.frameworks.database.${framework.id}.name`)}
                    </span>
                  {/if}
                </h5>
              </div>
              <p>{$t(`globalCitizenship.frameworks.database.${framework.id}.description`)}</p>
            </div>
          {/each}
        </div>
      </div>
    {/if}
    
    <!-- Summary and Next Steps -->
    <div class="recommendations-summary">
      <h3>{$t('globalCitizenship.recommendations.summary.title')}</h3>
      <div class="summary-stats">
        <div class="stat-item">
          <span class="stat-label">{$t('globalCitizenship.recommendations.summary.totalFrameworks')}:</span>
          <span class="stat-value">{recommendedFrameworks.length} {$t('globalCitizenship.recommendations.summary.frameworks')}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">{$t('globalCitizenship.recommendations.summary.nextStep')}:</span>
          <span class="stat-value">{$t('globalCitizenship.recommendations.summary.nextStepText')}</span>
        </div>
      </div>
      
      <div class="action-buttons">
        <a href="{base}/frameworks/docs" class="explore-all-btn">
          {$t('globalCitizenship.recommendations.exploreAll')}
        </a>
      </div>
    </div>
  </div>
{/if}

<style>
  .framework-connections {
    margin-top: 2rem;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  
  .recommendations-section {
    margin-bottom: 2.5rem;
  }
  
  .recommendations-section:last-child {
    margin-bottom: 0;
  }
  
  .section-header {
    margin-bottom: 1.5rem;
  }
  
  .section-header h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2B4B8C;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .section-header p {
    color: #4B5563;
    line-height: 1.6;
    margin: 0;
  }
  
  /* Primary Framework Cards */
  .frameworks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
  }
  
  .framework-card {
    background: white;
    border-radius: 12px;
    border: 2px solid #E5E7EB;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }
  
  .framework-card:hover {
    border-color: #2B4B8C;
    box-shadow: 0 8px 24px rgba(43, 75, 140, 0.1);
    transform: translateY(-2px);
  }
  
  .primary-card {
    border-color: #DAA520;
    background: linear-gradient(135deg, #FFFBEB, #FEF3C7);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    gap: 0.5rem;
  }
  
  .tier-badge,
  .status-badge {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .card-content h4 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #1F2937;
  }
  
  .card-content p {
    color: #4B5563;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .framework-link {
    color: #2B4B8C;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .framework-link:hover {
    color: #DAA520;
    text-decoration: underline;
  }
  
  .framework-name.planned {
    color: #6B7280;
  }
  
  .foundation-note {
    background: rgba(139, 90, 60, 0.1);
    border-left: 4px solid #8B5A3C;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    color: #8B5A3C;
    font-style: italic;
  }
  
  .planned-note {
    background: rgba(107, 114, 128, 0.1);
    border-left: 4px solid #6B7280;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    color: #4B5563;
  }
  
  .contact-link {
    color: #F59E0B;
    font-weight: 600;
    text-decoration: none;
  }
  
  .contact-link:hover {
    text-decoration: underline;
  }
  
  /* Related Framework List */
  .frameworks-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .framework-item {
    background: #F8FAFC;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    padding: 1rem;
    transition: all 0.2s ease;
  }
  
  .framework-item:hover {
    background: white;
    border-color: #2B4B8C;
    box-shadow: 0 2px 8px rgba(43, 75, 140, 0.1);
  }
  
  .item-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }
  
  .tier-indicator,
  .status-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .item-header h5 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    color: #1F2937;
  }
  
  .framework-item p {
    color: #6B7280;
    line-height: 1.5;
    margin: 0;
    font-size: 0.9rem;
  }
  
  /* Summary Section */
  .recommendations-summary {
    background: linear-gradient(135deg, #E0F2FE, #F0F9FF);
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid #7DD3FC;
  }
  
  .recommendations-summary h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #0369A1;
    margin-bottom: 1rem;
  }
  
  .summary-stats {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  
  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .stat-label {
    font-weight: 600;
    color: #0369A1;
    font-size: 0.9rem;
  }
  
  .stat-value {
    color: #374151;
    line-height: 1.5;
  }
  
  .action-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .explore-all-btn {
    background-color: #2B4B8C;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
  }
  
  .explore-all-btn:hover {
    background-color: #1E40AF;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(43, 75, 140, 0.3);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .framework-connections {
      padding: 1.5rem;
    }
    
    .frameworks-grid {
      grid-template-columns: 1fr;
    }
    
    .card-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
    
    .summary-stats {
      gap: 1rem;
    }
    
    .action-buttons {
      flex-direction: column;
    }
    
    .explore-all-btn {
      text-align: center;
      width: 100%;
    }
  }
</style>
