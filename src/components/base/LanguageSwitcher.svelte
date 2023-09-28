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
    ? 'w-[5.5rem] outline-teal-700 dark:outline-teal-300'
    : 'w-10 '} group overflow-hidden outline outline-none -outline-offset-1 hover:outline-1 hover:outline-teal-700 dark:hover:outline-teal-300 duration-300 transition-all items-center justify-center h-10 font-sans flex flex-row relative border-2 border-transparent hover:border-teal-700 dark:hover:border-teal-300 text-teal-50"
  on:click={expandMenu}
  on:focus={expandMenu}
>
  <span
    class="px-1 leading-none my-0 transition-all uppercase text-lg group-hover:text-teal-500 dark:hover:text-teal-500 dark:text-teal-50 text-teal-900"
  >
    {$tolgee.getLanguage()}
  </span>
  {#if langExpanded}
    {#each availableLangs as language}
      {#if language.lang != $tolgee.getLanguage()}
        <span class="dark:text-teal-200 text-teal-700 mb-0"> / </span>
        <button
          type="button"
          aria-label="Open Language Switcher (Currently selected language: {$tolgee.getLanguage()})"
          on:click={() => {
            $tolgee.changeLanguage(language.lang);
          }}
          class="w-5 px-0.5 transition-all hover:scale-110 uppercase duration-250 group-hover:text-teal-700 dark:group-hover:text-teal-700 hover:!text-teal-500 dark:hover:text-teal-400 text-teal-700 dark:text-teal-200"
        >
          {language.lang}
        </button>
      {/if}
    {/each}
  {/if}
</button>
