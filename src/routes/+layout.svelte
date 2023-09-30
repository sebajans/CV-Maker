<script lang="ts">
  import "../app.css";
  import { settingsState } from "$lib/stores/settingsState";
  import NavBar from "$components/base/NavBar.svelte";

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
  class="relative antialiased font-serif min-h-screen bg-teal-50 dark:bg-teal-900 text-teal-900 dark:text-teal-50 {$settingsState.darkMode
    ? 'dark'
    : 'light'}"
  style="display: contents; overflow:hidden;"
>
  <TolgeeProvider {tolgee}>
    <NavBar />
    <slot />
  </TolgeeProvider>
</div>
