<!-- src/lib/components/Footer.svelte -->
<script>
  import { t } from '$lib/i18n';
  const currentYear = new Date().getFullYear();
</script>

<footer class="bg-blue-900 text-white py-10 mt-auto">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <div>
        <h3 class="text-lg font-bold mb-4 text-blue-200">Global Governance Framework</h3>
        <p class="text-blue-100 text-sm">
          Developing interoperable systems and operating models for global governance that respect local autonomy.
        </p>
      </div>
      
      <div>
        <h3 class="text-lg font-bold mb-4 text-blue-200">Navigation</h3>
        <ul class="space-y-2">
          <li><a href="/" class="text-blue-100 hover:text-white">{$t('common.header.home')}</a></li>
          <li><a href="/about" class="text-blue-100 hover:text-white">{$t('common.header.about')}</a></li>
          <li><a href="/framework" class="text-blue-100 hover:text-white">{$t('common.header.framework')}</a></li>
          <li><a href="/contact" class="text-blue-100 hover:text-white">{$t('common.header.contact')}</a></li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-lg font-bold mb-4 text-blue-200">Legal</h3>
        <ul class="space-y-2">
          <li><a href="/privacy" class="text-blue-100 hover:text-white">{$t('common.footer.privacy')}</a></li>
          <li><a href="/terms" class="text-blue-100 hover:text-white">{$t('common.footer.terms')}</a></li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-lg font-bold mb-4 text-blue-200">Connect</h3>
        <div class="flex space-x-4">
          <a href="https://github.com/GlobalGovernanceFramework" target="_blank" rel="noopener noreferrer" class="text-blue-100 hover:text-white transition-colors" aria-label="GitHub">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </a>
          
          <a href="mailto:globalgovernanceframework@gmail.com" class="text-blue-100 hover:text-white transition-colors" aria-label="Email">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
    
    <div class="pt-8 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center">
      <div class="mb-4 md:mb-0">
        <p class="text-sm text-blue-200">
          {$t('common.footer.copyright')} {new Date().getFullYear()} | {$t('common.footer.rights')}
        </p>
      </div>
      
      <div class="flex items-center space-x-2">
        <img src="/logo.svg" alt="Global Governance Framework" class="h-6 w-6" />
        <span class="text-sm text-blue-200">Building frameworks for ethical global governance</span>
      </div>
    </div>
  </div>
</footer>
