<!-- src/routes/frameworks/global-citizenship/components/CompassInfoPanel.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import { getConnectedFrameworks, frameworks, frameworkStatus } from './compassData.js';
  
  export let selectedElement = null;
  export let userProgress = {};
  export let closeInfoPanel = () => {};

  $: connectedFrameworkIds = selectedElement 
    ? getConnectedFrameworks(selectedElement.type, selectedElement.id)
    : [];
    
  $: connectedFrameworks = connectedFrameworkIds
    .map(id => frameworks[id])
    .filter(Boolean)
    .sort((a, b) => a.priority - b.priority);

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

{#if selectedElement}
  <div class="info-panel">
    <button class="close-button" on:click={closeInfoPanel}>
      ✕
    </button>
    
    <div class="info-content">
      <!-- Center/Shared Values -->
      {#if selectedElement.type === 'center'}
        <h3>{$t('globalCitizenship.compass.info.center.title')}</h3>
        <p>{$t('globalCitizenship.compass.info.center.description')}</p>
        <div class="info-tip">
          {$t('globalCitizenship.compass.info.center.tip')}
        </div>
        
      <!-- Development Level/Practice -->
      {:else if selectedElement.type === 'practice'}
        <h3>{$t(`globalCitizenship.compass.levels.${selectedElement.id}.title`)}</h3>
        <p>
          {userProgress[selectedElement.id] 
            ? $t('globalCitizenship.compass.info.practice.completed')
            : $t('globalCitizenship.compass.info.practice.incomplete')}
        </p>
        
        {#if connectedFrameworks.length > 0}
          <div class="connected-frameworks">
            <h4>{$t('globalCitizenship.compass.info.connectedFrameworks')}</h4>
            <div class="framework-list">
              {#each connectedFrameworks as framework}
                <div class="framework-item">
                  <div class="framework-header">
                    <span 
                      class="status-indicator" 
                      style="background-color: {getStatusColor(framework.status)}"
                      title={getStatusText(framework.status)}
                    ></span>
                    {#if framework.status === frameworkStatus.READY || framework.status === frameworkStatus.IN_REVIEW}
                      <a href="{base}{framework.path}" class="framework-link">
                        {$t(`globalCitizenship.frameworks.database.${framework.id}.name`)}
                      </a>
                    {:else}
                      <span class="framework-name planned">
                        {$t(`globalCitizenship.frameworks.database.${framework.id}.name`)}
                      </span>
                    {/if}
                  </div>
                  <p class="framework-description">
                    {$t(`globalCitizenship.frameworks.database.${framework.id}.description`)}
                  </p>
                </div>
              {/each}
            </div>
          </div>
        {/if}
        
        <div class="info-tip">
          {$t('globalCitizenship.compass.info.practice.tip')}
        </div>
        
      <!-- Core Values -->
      {:else if selectedElement.type === 'value'}
        <h3>{$t(`globalCitizenship.compass.valueDetails.${selectedElement.id}.title`)}</h3>
        <p>{$t(`globalCitizenship.compass.valueDetails.${selectedElement.id}.description`)}</p>
        
        {#if connectedFrameworks.length > 0}
          <div class="connected-frameworks">
            <h4>{$t('globalCitizenship.compass.info.connectedFrameworks')}</h4>
            <div class="framework-list">
              {#each connectedFrameworks as framework}
                <div class="framework-item">
                  <div class="framework-header">
                    <span 
                      class="status-indicator" 
                      style="background-color: {getStatusColor(framework.status)}"
                      title={getStatusText(framework.status)}
                    ></span>
                    {#if framework.status === frameworkStatus.READY || framework.status === frameworkStatus.IN_REVIEW}
                      <a href="{base}{framework.path}" class="framework-link">
                        {$t(`globalCitizenship.frameworks.database.${framework.id}.name`)}
                      </a>
                    {:else}
                      <span class="framework-name planned">
                        {$t(`globalCitizenship.frameworks.database.${framework.id}.name`)}
                      </span>
                    {/if}
                  </div>
                  <p class="framework-description">
                    {$t(`globalCitizenship.frameworks.database.${framework.id}.description`)}
                  </p>
                </div>
              {/each}
            </div>
          </div>
        {/if}
        
        <div class="info-tip">
          {$t('globalCitizenship.compass.info.values.tip')}
        </div>
      {/if}
      
      <!-- Planned Framework Contact Encouragement -->
      {#if connectedFrameworks.some(fw => fw.status === frameworkStatus.PLANNED)}
        <div class="planned-frameworks-cta">
          <p>{$t('globalCitizenship.compass.info.plannedFrameworks.text')}</p>
          <div class="cta-buttons">
            <a href="{base}/contact" class="contact-button">
              {$t('globalCitizenship.compass.info.plannedFrameworks.button')}
            </a>
            <a href="https://discord.gg/Zx4hMJf4JU" target="_blank" rel="noopener noreferrer" class="discord-button">
              <span class="discord-icon">💬</span>
              {$t('globalCitizenship.compass.info.plannedFrameworks.discordButton')}
            </a>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .info-panel {
    position: absolute;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    max-width: 380px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 0;
    border-left: 4px solid #2B4B8C;
    z-index: 10;
  }
  
  .close-button {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    font-size: 18px;
    color: #9CA3AF;
    cursor: pointer;
    padding: 4px;
    line-height: 1;
    transition: color 0.2s ease;
  }
  
  .close-button:hover {
    color: #374151;
  }
  
  .info-content {
    padding: 20px;
    padding-right: 40px;
  }
  
  .info-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2B4B8C;
    margin-bottom: 12px;
    margin-top: 0;
  }
  
  .info-content h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 12px;
    margin-top: 20px;
  }
  
  .info-content p {
    color: #4B5563;
    line-height: 1.6;
    margin-bottom: 16px;
    font-size: 0.95rem;
  }
  
  .info-tip {
    font-size: 0.85rem;
    color: #6B7280;
    background: #F9FAFB;
    padding: 12px;
    border-radius: 8px;
    border-left: 3px solid #DAA520;
    margin-top: 16px;
  }
  
  .connected-frameworks {
    margin-top: 20px;
  }
  
  .framework-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .framework-item {
    background: #F8FAFC;
    border-radius: 8px;
    padding: 12px;
    border: 1px solid #E5E7EB;
  }
  
  .framework-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }
  
  .status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .framework-link {
    color: #2B4B8C;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: color 0.2s ease;
  }
  
  .framework-link:hover {
    color: #DAA520;
    text-decoration: underline;
  }
  
  .framework-name {
    font-weight: 600;
    font-size: 0.9rem;
    color: #374151;
  }
  
  .framework-name.planned {
    color: #6B7280;
  }
  
  .framework-description {
    font-size: 0.85rem;
    color: #6B7280;
    line-height: 1.5;
    margin: 0;
  }
  
  .planned-frameworks-cta {
    margin-top: 20px;
    padding: 16px;
    background: linear-gradient(135deg, #FEF3C7, #FDE68A);
    border-radius: 8px;
    border: 1px solid #F59E0B;
  }
  
  .planned-frameworks-cta p {
    font-size: 0.9rem;
    color: #92400E;
    margin-bottom: 12px;
  }
  
  .cta-buttons {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  
  .contact-button,
  .discord-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background-color: #F59E0B;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.85rem;
    transition: all 0.2s ease;
    flex: 1;
    justify-content: center;
    min-width: 120px;
  }
  
  .discord-button {
    background-color: #5865F2; /* Discord brand color */
  }
  
  .discord-icon {
    font-size: 0.9rem;
  }
  
  .contact-button:hover {
    background-color: #D97706;
    transform: translateY(-1px);
  }
  
  .discord-button:hover {
    background-color: #4752C4;
    transform: translateY(-1px);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .info-panel {
      position: static;
      margin-top: 1rem;
      max-width: none;
      max-height: none;
    }
    
    .close-button {
      display: none;
    }
    
    .info-content {
      padding-right: 20px;
    }
  }
</style>
