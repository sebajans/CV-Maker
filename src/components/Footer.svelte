<script lang="ts">
  import T from "@tolgee/svelte/T.svelte"; // change import statement

  let now: number = new Date().getFullYear();
</script>

<div
  class="text-black dark:text-white absolute z-10 bottom-0 inset-x-0 py-5 px-2 text-xs text-center"
>
  &copy; Sebastian Jans, {now}
  <!-- <button
    aria-label="View Terms of Service PopUp"
    class="hover:text-primary-500 font-bold"
  >
    <T keyName="terms-of-service" defaultValue="Terms of Service" /></button
  > -->
</div>
