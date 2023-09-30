<script lang="ts">
  import { getTolgee } from "@tolgee/svelte";
  import { onMount } from "svelte";

  const tolgee = getTolgee(["language"]);
  // function handleLanguageChange(e: Event) {
  // 	$tolgee.changeLanguage((e.currentTarget as HTMLSelectElement).value);
  // }

  let availableLangs = [
    { lang: "de", fullLanguage: "Deutsch" },
    { lang: "en", fullLanguage: "English" },
    { lang: "es", fullLanguage: "Español" },
  ];

  export let langExpanded = false;

  onMount(() => {
    langExpanded = false;
  });

  function expandMenu() {
    langExpanded = !langExpanded;
    setTimeout(() => {
      langExpanded = false;
    }, 5000);
  }
</script>

<button
  aria-label="Open Language Switcher"
  class="{langExpanded
    ? 'w-[5.5rem] '
    : 'w-10 '} group overflow-hidden duration-300 transition-all items-center justify-center h-10 font-sans flex flex-row relative text-teal-50"
  on:click={expandMenu}
  on:focus={expandMenu}
>
  <span
    class="px-1 leading-none my-0 transition-all uppercase text-lg group-hover:text-orange-500 dark:hover:text-orange-400 dark:text-teal-50 text-white"
  >
    {$tolgee.getLanguage()}
  </span>
  {#if langExpanded}
    {#each availableLangs as language}
      {#if language.lang != $tolgee.getLanguage()}
        <span class="dark:text-teal-200 text-white mb-0"> / </span>
        <button
          type="button"
          aria-label="Open Language Switcher (Currently selected language: {$tolgee.getLanguage()})"
          on:click={() => {
            $tolgee.changeLanguage(language.lang);
          }}
          class="w-5 px-0.5 transition-all hover:scale-110 uppercase duration-250 group-hover:text-white dark:group-hover:text-white hover:!text-teal-500 dark:hover:text-teal-400 text-white dark:text-teal-200"
        >
          {language.lang}
        </button>
      {/if}
    {/each}
  {/if}
</button>
