<script lang="ts">
  import { page } from "$app/stores";
  import T from "@tolgee/svelte/T.svelte";

  export let link: string;
  export let text: string;
  let isActive: boolean;

  $: isActive =
    link === "/"
      ? $page.url.pathname === link
      : $page.url.pathname.startsWith(link);
</script>

<li class="grow w-full">
  <a
    on:click
    aria-label="Navigate to {text}"
    class="dark:after:bg-teal-200 after:bg-teal-300 py-2 relative text-lg font-medium text-white dark:text-white dark:hover:text-teal-200
			{isActive ? ' font-normal ' : ' font-light'}
				"
    href={link}
  >
    <T keyName={text} defaultValue={text} />
  </a>
</li>

<!-- <a
          href="/about"
          class="dark:after:bg-teal-200 after:bg-teal-300 relative font-medium text-teal-600 dark:text-teal-300 dark:hover:text-teal-200"
        >
          <T keyName="text-learn-more" defaultValue="learn more about me" />
        </a> -->

<style>
  a::after {
    content: "";
    display: inline;
    width: 100%;
    height: 0px;
    transition: all 0.3s;
    background-color: white;
    @apply absolute inset-x-0 bottom-0;
  }

  a:hover::after {
    width: 100%;
    @apply h-1;
  }
</style>
