<script lang="ts">
  import Grid, { GridItem } from "svelte-grid-extended";

  const items = [
    { id: "0", x: 0, y: 0, w: 2, h: 5 },
    { id: "1", x: 2, y: 2, w: 2, h: 2 },
    { id: "2", x: 2, y: 0, w: 1, h: 2 },
    { id: "3", x: 3, y: 0, w: 2, h: 2 },
    { id: "4", x: 4, y: 2, w: 1, h: 3 },
    { id: "5", x: 8, y: 0, w: 2, h: 8 },
    { id: "6", x: 4, y: 5, w: 1, h: 1 },
    { id: "7", x: 2, y: 6, w: 3, h: 2 },
    { id: "8", x: 2, y: 4, w: 2, h: 2 },
  ];
</script>

<div class="w-full h-[50vh] flex justify-center items-center">
  <Grid class="w-full h-full grid-container z-20" gap={10} rows={10} cols={10}>
    {#each items as item}
      <GridItem
        id={item.id.toString()}
        x={item.x}
        y={item.y}
        w={item.w}
        h={item.h}
        class="bg-white grid-item"
        previewClass="preview"
      >
        <div class="item">{item.id}</div>
      </GridItem>
    {/each}
  </Grid>
</div>

<style>
  /* :global(.preview) {
    background-color: black;
    opacity: 0.3;
    transition: all 0.15s ease-in-out;
  } */

  :global(.rounded) {
    border-radius: 0.25rem;
  }
</style>
