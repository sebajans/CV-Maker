<script lang="ts">
  import Grid, { GridItem } from "svelte-grid-extended";

  const itemSize = { height: 40 };
</script>

<div
  class="relative w-full h-screen overflow-hidden bg-gradient-to-b dark:from-slate-500 dark:to-slate-900 from-slate-300 to-slate-100"
>
  <div class="flex flex-col h-2/3 justify-center items-center">
    <div class="max-w-3xl flex flex-col space-y-5">
      <h1
        class="text-5xl p-4 drop-shadow-md text-center font-bold from-orange-400 to-orange-500 bg-gradient-to-r bg-clip-text text-transparent"
      >
        Create your own modular CV
      </h1>
      <h2 class="text-center max-w-2xl">
        Use the grid to create your own CV. You can add, remove and edit the
        content of each grid item.
      </h2>
      <a
        class="mx-auto text-white font-sans font-bold text-xl rounded-md px-8 py-4 bg-orange-400 hover:bg-orange-500 transition-colors w-fit"
        href="/editor">Start now!</a
      >
    </div>
  </div>
  <div class="absolute flex-col bottom-0 w-full p-0 sm:px-4 h-1/3">
    <!-- <div> -->
    <div
      class="max-w-3xl w-full h-full mx-auto shadow-lg bg-white p-[min(10%,_5rem)] rounded-t-2xl"
    >
      <Grid {itemSize} cols={10} rows={10}>
        <GridItem
          activeClass="grid-item-active"
          previewClass="bg-green-500 rounded"
          x={1}
          y={0}
          class="item">Hey</GridItem
        >
        <GridItem x={3} y={3} w={4} class="item">Hoy</GridItem>
      </Grid>
    </div>
  </div>
  <div
    class="absolute select-none max-w-[c alc(48rem_+_8px)] scale-x-105 rounded-t-xl left-1/2 -translate-x-1/2 -bottom-2 h-[5%] w-full bg-gradient-to-t blur-sm from-black/25 via-black/10 to-black/0"
  />
  <!-- </div> -->
</div>
<div class="w-full bg-white min-h-screen">
  <div class="w-full max-w-3xl">This is another section</div>
</div>

<style>
  .preview {
    background-color: red;
  }
  :global(.grid-item-active) {
    opacity: 0.1;
  }
</style>
