<script lang="ts">
  import "../app.css";
  import { settingsState } from "$lib/stores/settingsState";

  // import localeEn from '../i18n/en.json';
  // import localeEs from '../i18n/es.json';
  // import localeDe from '../i18n/de.json';

  import {
    TolgeeProvider,
    Tolgee,
    DevTools,
    FormatSimple,
    LanguageStorage,
    LanguageDetector,
  } from "@tolgee/svelte";

  const tolgee = Tolgee()
    .use(DevTools())
    .use(FormatSimple())
    .use(LanguageStorage())
    .use(LanguageDetector())
    .init({
      // language: 'en',
      defaultLanguage: "en",
      availableLanguages: ["en", "es", "de"],
      apiUrl: import.meta.env.VITE_TOLGEE_API_URL,
      apiKey: import.meta.env.VITE_TOLGEE_API_KEY,
      staticData: {
        // en: localeEn,
        // es: localeEs,
        // de: localeDe
      },
    });
</script>

<div
  class="relative antialiased font-serif min-h-screen min-h-screen-ios bg-primary-50 dark:bg-primary-900 text-primary-900 dark:text-primary-50 {$settingsState.darkMode
    ? 'dark'
    : 'light'}"
  style="overflow:hidden;"
>
  <TolgeeProvider {tolgee}>
    <slot />
  </TolgeeProvider>
</div>
