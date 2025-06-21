<!-- src/routes/frameworks/docs/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  
  export let data;
  
  $: if (browser && $locale) {
    invalidate('app:locale');
  }
</script>

<div class="documentation-container">
  <FrameworkSidebar />
  
  <div class="content">
    <svelte:component this={data.component} />
  </div>
</div>

<style>
  .documentation-container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  @media (max-width: 768px) {
    .documentation-container {
      grid-template-columns: 1fr;
    }
  }
  
  .sidebar {
    border-right: 1px solid #2D5F2D; /* Earthy green border */
    padding-right: 1.5rem;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar li {
    margin-bottom: 0.75rem;
  }
  
  .sidebar a {
    display: block;
    padding: 0.5rem 0;
    color: #4b5563;
    text-decoration: none;
    border-left: 3px solid transparent;
    padding-left: 1rem;
    transition: all 0.2s;
  }
  
  .sidebar a:hover {
    color: #DAA520; /* Gold on hover */
    border-left-color: #DAA520;
  }
  
  .sidebar a.active {
    color: #DAA520; /* Gold for active */
    border-left-color: #DAA520;
    font-weight: 600;
  }
  
  .content {
    min-width: 0;
  }
  
  /* Additional styles for markdown content */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #2B4B8C; /* Cosmic blue for h1 */
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #2B4B8C; /* Cosmic blue for h2 */
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #2B4B8C; /* Cosmic blue for h3 */
  }

  .content :global(h4) {
    font-size: 1.125rem;
    font-weight: 600;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    color: #2B4B8C; /* Cosmic blue for h4 */
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  .content :global(ul), .content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }
  
  .content :global(li) {
    margin-bottom: 0.5rem;
  }

  /* Enhanced list styles */
  .content :global(ul), .content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 2rem; /* Slightly increased for better indentation */
    color: #4b5563; /* Matches paragraph text color */
  }

  .content :global(ul) {
    list-style-type: none; /* Remove default bullets */
  }

  .content :global(ul li) {
    position: relative;
    margin-bottom: 0.75rem; /* Slightly more spacing between items */
    padding-left: 1rem;
  }

  .content :global(ul li::before) {
    content: "✦"; /* Cosmic star symbol for bullets */
    position: absolute;
    left: 0;
    color: #DAA520; /* Gold color for bullet points */
    font-size: 0.9rem;
  }

  .content :global(ol) {
    list-style-type: decimal; /* Ensure ordered lists use numbers */
  }

  .content :global(ol li) {
    margin-bottom: 0.75rem; /* Consistent spacing with ul */
    padding-left: 0.5rem;
  }

  .content :global(ol li::marker) {
    color: #2B4B8C; /* Cosmic blue for numbers */
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "✧"; /* Smaller star for nested items */
    color: #6B5CA5; /* Cosmic purple for nested bullets */
  }

  /* Hover effect for interactivity */
  .content :global(li:hover) {
    color: #2B4B8C; /* Cosmic blue on hover */
  }

  /* DOWNLOAD LINK STYLES - Main Enhancement */
  
  /* Target PDF, DOC, DOCX links and "Link to" phrases for book downloads */
  .content :global(a[href*="/resources/"]),
  .content :global(a[href$=".pdf"]),
  .content :global(a[href$=".doc"]),
  .content :global(a[href$=".docx"]),
  .content :global(a[href$=".zip"]),
  .content :global(a[href*="download"]) {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #DAA520; /* Gold background */
    color: #2B4B8C; /* Cosmic blue text */
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    margin: 0.5rem 0.25rem 0.5rem 0;
    border: 2px solid transparent;
    font-size: 0.95rem;
  }

  .content :global(a[href*="/resources/"]:hover),
  .content :global(a[href$=".pdf"]:hover),
  .content :global(a[href$=".doc"]:hover),
  .content :global(a[href$=".docx"]:hover),
  .content :global(a[href$=".zip"]:hover),
  .content :global(a[href*="download"]:hover) {
    background-color: #B8860B; /* Darker gold on hover */
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  /* Special styling for external links (keep them normal but with theme colors) */
  .content :global(a:not([href*="/resources/"]):not([href$=".pdf"]):not([href$=".doc"]):not([href$=".docx"]):not([href$=".zip"]):not([href*="download"])) {
    color: #2B4B8C;
    text-decoration: underline;
    text-decoration-color: #DAA520;
    text-underline-offset: 3px;
    transition: all 0.2s ease;
  }

  .content :global(a:not([href*="/resources/"]):not([href$=".pdf"]):not([href$=".doc"]):not([href$=".docx"]):not([href$=".zip"]):not([href*="download"])):hover {
    color: #DAA520;
    text-decoration-color: #2B4B8C;
  }

  /* File type icons for download links */
  .content :global(a[href$=".pdf"]::before) {
    content: "📄";
    font-size: 1.1rem;
  }

  .content :global(a[href$=".doc"]::before),
  .content :global(a[href$=".docx"]::before) {
    content: "📝";
    font-size: 1.1rem;
  }

  .content :global(a[href$=".zip"]::before) {
    content: "📦";
    font-size: 1.1rem;
  }

  .content :global(a[href*="/resources/"]:not([href$=".pdf"]):not([href$=".doc"]):not([href$=".docx"]):not([href$=".zip"]))::before {
    content: "📚";
    font-size: 1.1rem;
  }

  /* Special styling for book links - using a more specific approach */
  .content :global(h4 + p a[href*="/resources/"]) {
    background-color: #2B4B8C; /* Cosmic blue for book downloads */
    color: white;
    font-size: 1rem;
    padding: 0.875rem 1.75rem;
    margin: 0.75rem 0;
    display: inline-block;
    width: auto;
    min-width: 200px;
  }

  .content :global(h4 + p a[href*="/resources/"]:hover) {
    background-color: #1e3a8a; /* Darker blue on hover */
    color: white;
  }

  /* Enhanced section styling for better organization */
  .content :global(h2) {
    border-bottom: 3px solid #DAA520;
    padding-bottom: 0.5rem;
    margin-top: 3rem;
  }

  .content :global(h2:first-of-type) {
    margin-top: 0;
  }

  /* Enhanced styling for section headers - removing :contains() selectors */
  .content :global(h3) {
    background: linear-gradient(to right, #f8fafc, #e2e8f0);
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    border-left: 4px solid #2B4B8C;
    margin: 1.5rem 0 1rem 0;
  }

  /* Focus styles for accessibility */
  .content :global(a:focus) {
    outline: 2px solid #2B4B8C;
    outline-offset: 2px;
  }

  /* Responsive adjustments */
  @media (max-width: 640px) {
    .content :global(a[href*="/resources/"]),
    .content :global(a[href$=".pdf"]),
    .content :global(a[href$=".doc"]),
    .content :global(a[href$=".docx"]),
    .content :global(a[href$=".zip"]) {
      padding: 0.625rem 1.25rem;
      font-size: 0.9rem;
      display: block;
      text-align: center;
      margin: 0.5rem 0;
    }

    .content :global(h3) {
      padding: 0.75rem 1rem;
      margin: 1rem 0 0.75rem 0;
    }
  }

  /* Coming soon text styling */
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }

  .content :global(em) {
    background-color: #f3f4f6;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border-left: 4px solid #9ca3af;
    font-style: italic;
    color: #6b7280;
    display: inline-block;
    margin: 0.5rem 0;
  }
</style>
