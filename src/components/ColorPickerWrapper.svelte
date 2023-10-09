<script lang="ts">
  import { portal } from "svelte-portal";

  export let wrapper;
  export let isOpen: boolean;
  export let isPopup: boolean;
  /* svelte-ignore unused-export-let */
  export let toRight;
</script>

{#if isOpen}
  <div
    use:portal={"#colorpicker-wrapper"}
    class="wrapper !transition-all duration-500 !pb-0.5 z-50 !grid grid-cols-[repeat(3_,_auto)] grid-rows-1"
    bind:this={wrapper}
    class:isOpen
    class:isPopup
    role={isPopup ? "dialog" : undefined}
    aria-label="color picker"
  >
    <slot />
  </div>
{/if}

<!-- <div
  class=" left-1/2 -translate-x-1/2 relative -top-3 block h-3 w-8 rounded-t-md bg-teal-600/30"
/> -->

<style>
  div {
    padding: 6px 1px 1px 5px;
    /* margin: 0 10px 10px; */
    /* border: 1px solid black; */
    display: none;
    @apply m-0;
    width: max-content;
  }
  :global(.picker-wrapper) {
    /* width: 10px !important; */
    border-radius: 5px !important;
    @apply m-0 row-span-2;
  }
  :global(.slider-wrapper) {
    margin: 0 !important;
    /* rotate: 90deg; */
  }
  :global(.picker-wrapper .text-input) {
    margin: 0 5px 5px;
    border-radius: 200px !important;
    width: max-content;
    @apply overflow-hidden;
  }
  :global(.text-input) {
    max-width: 120px !important;
    margin: 0 4px !important;
    border: none !important;
    outline: none !important;
  }

  /* :global(.text-input > .input-container) {
    outline: none !important;
    border: none !important;
  } */

  :global(.text-input > .input-container > input) {
    height: 100% !important;
    width: fit-content !important;
    background-color: white;
    @apply rounded-md border-none outline-none overflow-hidden;
  }
  /* div:first-child {
    @apply grid-rows-2;
  } */
  /* div .picker-wrapper {
  } */
  .isOpen {
    display: block;
  }
  .isPopup {
    position: absolute;
    top: 30px;
    z-index: var(--picker-z-index, 2);
  }
</style>
