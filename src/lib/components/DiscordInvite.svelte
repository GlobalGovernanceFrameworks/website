<!-- src/lib/components/DiscordInvite.svelte -->
<!--
  Reusable Discord invite.

  Two variants:
    inline (default) — a quiet one-line strip. Use on pages that already have a
                       primary action, so this doesn't outcompete it.
    card             — the full panel. Use where the invite IS the action:
                       the get-involved hub and the contact page.

  Usage:
    <DiscordInvite />
    <DiscordInvite variant="card" />
-->
<script>
  import { t } from '$lib/i18n';

  export let variant = 'inline';

  const INVITE_URL = 'https://discord.gg/tHddm5hwm9';
</script>

{#if variant === 'card'}
  <aside class="discord-card">
    <div class="discord-card-head">
      <svg class="discord-glyph" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
      <h3>{$t('common.discord.title')}</h3>
    </div>

    <p>{$t('common.discord.description')}</p>

    <a href={INVITE_URL} target="_blank" rel="noopener noreferrer" class="discord-button">
      {$t('common.discord.button')}
    </a>
  </aside>
{:else}
  <aside class="discord-inline">
    <svg class="discord-glyph" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>

    <p>
      {$t('common.discord.inline')}
      <a href={INVITE_URL} target="_blank" rel="noopener noreferrer">
        {$t('common.discord.button')} <span aria-hidden="true">→</span>
      </a>
    </p>
  </aside>
{/if}

<style>
  /* ---------- shared ---------- */

  .discord-glyph {
    flex-shrink: 0;
    color: #5865f2;
  }

  /* ---------- inline variant ---------- */

  .discord-inline {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    max-width: 640px;
    margin: 2.5rem auto 0 auto;
    padding: 0.9rem 1.1rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 0.75rem;
    background: #fff;
  }

  .discord-inline p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.55;
    color: var(--content-text, #4b5563);
  }

  .discord-inline a {
    color: #4752c4;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
  }

  .discord-inline a:hover {
    text-decoration: underline;
  }

  /* ---------- card variant ---------- */

  .discord-card {
    max-width: 600px;
    margin: 2.5rem auto 0 auto;
    padding: 1.75rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-top: 3px solid #5865f2;
    border-radius: 0.9rem;
    background: #fff;
    text-align: center;
  }

  .discord-card-head {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
    margin-bottom: 0.85rem;
  }

  .discord-card-head h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 650;
    color: #1f2937;
  }

  .discord-card p {
    margin: 0 0 1.5rem 0;
    font-size: 1rem;
    line-height: 1.65;
    color: var(--content-text, #4b5563);
  }

  .discord-button {
    display: inline-block;
    padding: 0.75rem 1.75rem;
    border-radius: 0.65rem;
    background: #5865f2;
    color: #fff;
    font-weight: 650;
    text-decoration: none;
    transition: background 0.2s ease, transform 0.2s ease;
  }

  .discord-button:hover {
    background: #4752c4;
    transform: translateY(-2px);
  }

  /* ---------- a11y ---------- */

  .discord-inline a:focus-visible,
  .discord-button:focus-visible {
    outline: 2px solid #5865f2;
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    .discord-button {
      transition: none;
    }
    .discord-button:hover {
      transform: none;
    }
  }

  @media (max-width: 640px) {
    .discord-card {
      padding: 1.25rem;
    }

    .discord-card-head {
      flex-direction: column;
      gap: 0.5rem;
    }

    .discord-button {
      display: block;
    }
  }
</style>
