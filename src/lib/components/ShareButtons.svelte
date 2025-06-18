<!-- ShareButtons.svelte -->
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let title = '';
  export let description = '';
  export let url = '';
  export let hashtags = 'GlobalGovernance,Polycrisis,SystemicChange';
  export let position = 'right'; // 'right' or 'left'
  export let showLabels = false; // Show text labels on desktop
  
  let currentUrl = '';
  let pageTitle = '';
  let pageDescription = '';
  let copySuccess = false;
  let visible = false;
  let mobileExpanded = false; // New state for mobile panel
  
  onMount(() => {
    if (browser) {
      // Get current page info if not provided
      currentUrl = url || window.location.href;
      pageTitle = title || document.title || 'Global Governance Framework';
      pageDescription = description || 
        document.querySelector('meta[name="description"]')?.content || 
        'Discover frameworks for global governance and planetary citizenship';
      
      // Show buttons after a brief delay to avoid layout shift
      setTimeout(() => {
        visible = true;
      }, 500);
    }
  });
  
  // Toggle mobile panel
  function toggleMobilePanel() {
    mobileExpanded = !mobileExpanded;
  }
  
  // Close mobile panel when a share action is performed
  function closeMobilePanel() {
    mobileExpanded = false;
  }
  
  // Native Web Share API
  async function shareNative() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: pageTitle,
          text: pageDescription,
          url: currentUrl,
        });
        closeMobilePanel();
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  }
  
  function shareToLinkedIn() {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    openShareWindow(linkedinUrl);
    closeMobilePanel();
  }
  
  function shareToTwitter() {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(pageTitle)}&hashtags=${encodeURIComponent(hashtags)}`;
    openShareWindow(twitterUrl);
    closeMobilePanel();
  }
  
  function shareToFacebook() {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    openShareWindow(facebookUrl);
    closeMobilePanel();
  }
  
  function shareToBluesky() {
    const blueskyText = `${pageTitle} ${currentUrl} #${hashtags.split(',').join(' #')}`;
    const blueskyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(blueskyText)}`;
    openShareWindow(blueskyUrl);
    closeMobilePanel();
  }
  
  function shareToReddit() {
    const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(pageTitle)}`;
    openShareWindow(redditUrl);
    closeMobilePanel();
  }
  
  function shareViaEmail() {
    const subject = encodeURIComponent(pageTitle);
    const body = encodeURIComponent(`I thought you might find this interesting:\n\n${pageTitle}\n${pageDescription}\n\n${currentUrl}\n\nShared from Global Governance Framework`);
    const emailUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = emailUrl;
    closeMobilePanel();
  }
  
  async function copyLink() {
    if (!browser) return;
    
    try {
      await navigator.clipboard.writeText(currentUrl);
      copySuccess = true;
      setTimeout(() => {
        copySuccess = false;
      }, 2000);
      closeMobilePanel();
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      copySuccess = true;
      setTimeout(() => {
        copySuccess = false;
      }, 2000);
      closeMobilePanel();
    }
  }
  
  function openShareWindow(url) {
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
      url,
      'share',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );
  }
  
  // Check if native sharing is available
  $: hasNativeShare = browser && navigator.share;
  
  // Social media brand colors
  const brandColors = {
    native: '#6B7280',
    linkedin: '#0077B5',
    twitter: '#1DA1F2',
    facebook: '#1877F2',
    bluesky: '#00A8E8',
    reddit: '#FF4500',
    email: '#6B7280'
  };
</script>

{#if browser && visible}
  <div class="share-buttons" class:left={position === 'left'} class:right={position === 'right'}>
    <!-- Mobile Toggle Button -->
    <button 
      class="mobile-toggle-btn"
      class:expanded={mobileExpanded}
      on:click={toggleMobilePanel}
      title={mobileExpanded ? 'Close share menu' : 'Open share menu'}
    >
      <div class="toggle-icon" class:rotated={mobileExpanded}>
        {#if mobileExpanded}
          <!-- Close X icon -->
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        {:else}
          <!-- Share icon -->
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
          </svg>
        {/if}
      </div>
    </button>

    <!-- Share Panel -->
    <div class="share-container" class:mobile-expanded={mobileExpanded}>
      <!-- Share Label -->
      <div class="share-label">
        <span class="share-text">Share</span>
        <div class="share-icon">📤</div>
      </div>
      
      <!-- Share Buttons -->
      <div class="buttons-list">
        <!-- Native Share (mobile priority) -->
        {#if hasNativeShare}
          <button 
            class="share-button native" 
            on:click={shareNative}
            title="Share via device"
            style="--brand-color: {brandColors.native}"
          >
            <svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
            {#if showLabels}<span class="button-label">Share</span>{/if}
          </button>
        {/if}
        
        <!-- LinkedIn -->
        <button 
          class="share-button linkedin" 
          on:click={shareToLinkedIn}
          title="Share on LinkedIn"
          style="--brand-color: {brandColors.linkedin}"
        >
          <svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          {#if showLabels}<span class="button-label">LinkedIn</span>{/if}
        </button>
        
        <!-- Twitter/X -->
        <button 
          class="share-button twitter" 
          on:click={shareToTwitter}
          title="Share on X (Twitter)"
          style="--brand-color: {brandColors.twitter}"
        >
          <svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          {#if showLabels}<span class="button-label">X</span>{/if}
        </button>
        
        <!-- Facebook -->
        <button 
          class="share-button facebook" 
          on:click={shareToFacebook}
          title="Share on Facebook"
          style="--brand-color: {brandColors.facebook}"
        >
          <svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          {#if showLabels}<span class="button-label">Facebook</span>{/if}
        </button>
        
        <!-- Bluesky -->
        <button 
          class="share-button bluesky" 
          on:click={shareToBluesky}
          title="Share on Bluesky"
          style="--brand-color: {brandColors.bluesky}"
        >
          <svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-2.67-.297-5.568.628-6.383 3.364C.378 17.702 0 22.661 0 23.351c0 .688.139 1.86.902 2.203.659.299 1.664.621 4.3-1.24C7.954 22.456 10.913 18.517 12 16.403c1.087 2.114 4.046 6.053 6.798 7.995 2.636 1.861 3.641 1.539 4.3 1.24.763-.343.902-1.515.902-2.203 0-.69-.378-5.649-.624-6.478-.815-2.736-3.713-3.661-6.383-3.364-.139.016-.277.034-.415.056.138-.017.276-.036.415-.056 2.67.297 5.568-.628 6.383-3.364.246-.829.624-5.789.624-6.478 0-.688-.139-1.86-.902-2.203-.659-.299-1.664-.621-4.3 1.24C16.046 4.747 13.087 8.686 12 10.8z"/>
          </svg>
          {#if showLabels}<span class="button-label">Bluesky</span>{/if}
        </button>
        
        <!-- Reddit -->
        <button 
          class="share-button reddit" 
          on:click={shareToReddit}
          title="Share on Reddit"
          style="--brand-color: {brandColors.reddit}"
        >
          <svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
          </svg>
          {#if showLabels}<span class="button-label">Reddit</span>{/if}
        </button>
        
        <!-- Email -->
        <button 
          class="share-button email" 
          on:click={shareViaEmail}
          title="Share via Email"
          style="--brand-color: {brandColors.email}"
        >
          <svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
          </svg>
          {#if showLabels}<span class="button-label">Email</span>{/if}
        </button>
        
        <!-- Copy Link -->
        <button 
          class="share-button copy-link" 
          class:success={copySuccess}
          on:click={copyLink}
          title={copySuccess ? 'Link copied!' : 'Copy link'}
        >
          {#if copySuccess}
            <svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          {:else}
            <svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
          {/if}
          {#if showLabels}
            <span class="button-label">{copySuccess ? 'Copied!' : 'Copy'}</span>
          {/if}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .share-buttons {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    opacity: 0;
    animation: fadeInSlide 0.6s ease-out 0.5s forwards;
  }
  
  .share-buttons.right {
    right: 20px;
  }
  
  .share-buttons.left {
    left: 20px;
  }
  
  @keyframes fadeInSlide {
    from {
      opacity: 0;
      transform: translateY(-50%) translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateY(-50%) translateX(0);
    }
  }
  
  /* Mobile Toggle Button */
  .mobile-toggle-btn {
    display: none;
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #2B4B8C;
    color: white;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(43, 75, 140, 0.3);
    transition: all 0.3s ease;
    z-index: 102;
  }
  
  .mobile-toggle-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(43, 75, 140, 0.4);
  }
  
  .mobile-toggle-btn:active {
    transform: scale(0.95);
  }
  
  .mobile-toggle-btn.expanded {
    background: #dc2626;
    transform: rotate(90deg);
  }
  
  .toggle-icon {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
  }
  
  .toggle-icon svg {
    width: 100%;
    height: 100%;
  }
  
  .share-container {
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem;
    backdrop-filter: blur(10px);
    max-width: 80px;
    transition: all 0.3s ease;
  }
  
  .share-container:hover {
    max-width: 200px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  }
  
  .share-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: #2B4B8C;
    font-weight: 600;
    font-size: 0.875rem;
  }
  
  .share-text {
    opacity: 0;
    transition: opacity 0.3s ease;
    white-space: nowrap;
  }
  
  .share-container:hover .share-text {
    opacity: 1;
  }
  
  .share-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
  }
  
  .buttons-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .share-button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: white;
    border: 2px solid #E5E7EB;
    border-radius: 12px;
    padding: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #6B7280;
    font-weight: 500;
    font-size: 0.875rem;
    text-decoration: none;
    min-width: 44px;
    justify-content: flex-start;
    position: relative;
  }
  
  /* Center icons when container is collapsed */
  .share-container:not(:hover) .share-button {
    justify-content: center;
  }
  
  /* Return to left-alignment when expanded */
  .share-container:hover .share-button {
    justify-content: flex-start;
  }
  
  .share-button:hover {
    background: var(--brand-color, #2B4B8C);
    color: white;
    border-color: var(--brand-color, #2B4B8C);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  .share-button.copy-link {
    --brand-color: #10B981;
  }
  
  .share-button.copy-link.success {
    background: #10B981;
    color: white;
    border-color: #10B981;
  }
  
  .button-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
  
  .button-label {
    opacity: 0;
    transition: opacity 0.3s ease;
    white-space: nowrap;
    overflow: hidden;
  }
  
  .share-container:hover .button-label {
    opacity: 1;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .share-buttons {
      position: fixed;
      bottom: 20px;
      right: 20px;
      top: auto;
      left: auto;
      transform: none;
    }
    
    /* Show mobile toggle button */
    .mobile-toggle-btn {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    /* Hide share container by default on mobile */
    .share-container {
      position: fixed;
      bottom: 90px;
      right: 20px;
      max-width: 280px;
      width: 280px;
      opacity: 0;
      transform: translateY(20px) scale(0.9);
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 101;
    }
    
    /* Show share container when expanded */
    .share-container.mobile-expanded {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }
    
    /* Mobile share container styles */
    .share-container.mobile-expanded:hover {
      max-width: 280px;
    }
    
    .share-container .share-label {
      margin-bottom: 0.75rem;
    }
    
    .share-container .share-text {
      opacity: 1;
      display: block;
    }
    
    .share-container .button-label {
      opacity: 1;
      display: block;
    }
    
    .share-container .buttons-list {
      gap: 0.5rem;
    }
    
    .share-container .share-button {
      padding: 0.75rem;
      justify-content: flex-start;
    }
    
    .share-container .button-icon {
      width: 18px;
      height: 18px;
    }
  }
  
  /* Hide on very small screens or when space is limited */
  @media (max-width: 480px) {
    .mobile-toggle-btn {
      bottom: 20px;
      right: 16px;
      width: 52px;
      height: 52px;
    }
    
    .share-container {
      right: 16px;
      bottom: 80px;
      max-width: calc(100vw - 32px);
      width: calc(100vw - 32px);
    }
    
    .share-container.mobile-expanded:hover {
      max-width: calc(100vw - 32px);
    }
  }
  
  /* Accessibility improvements */
  .share-button:focus,
  .mobile-toggle-btn:focus {
    outline: 2px solid var(--brand-color, #2B4B8C);
    outline-offset: 2px;
  }
  
  .share-button:focus:not(:focus-visible),
  .mobile-toggle-btn:focus:not(:focus-visible) {
    outline: none;
  }
  
  /* Reduce motion for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    .share-buttons,
    .share-button,
    .share-container,
    .button-label,
    .share-text,
    .mobile-toggle-btn,
    .toggle-icon {
      transition: none;
      animation: none;
    }
    
    .share-buttons {
      opacity: 1;
      transform: translateY(-50%);
    }
    
    .mobile-toggle-btn.expanded {
      transform: none;
    }
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .share-container {
      border: 2px solid;
    }
    
    .share-button,
    .mobile-toggle-btn {
      border-width: 2px;
    }
  }
