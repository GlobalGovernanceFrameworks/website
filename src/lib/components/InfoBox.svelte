<script>
  export let title = '';
  export let color = '#2B4B8C';
  export let background = '#f0f4f9';
  export let borderTop = '#DAA520';
  export let borderBottom = '#e5e7eb';
</script>

<section style="padding: 1rem 0; background-color: {background}; border-top: 3px solid {borderTop}; border-bottom: 1px solid {borderBottom};">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="display: flex; gap: 1rem; align-items: flex-start;">
      <div style="flex-shrink: 0; margin-top: 0.25rem;">
        <svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem; color: {color};" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <h3 style="font-size: 1.125rem; font-weight: 600; color: {color}; margin-bottom: 0.5rem;">
          {title}
        </h3>
        <div style="color: #4b5563; font-size: 0.95rem; line-height: 1.5;">
          <slot />
        </div>
      </div>
    </div>
  </div>
</section>

