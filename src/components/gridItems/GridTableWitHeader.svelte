<script lang="ts">
  import { GridItem, type GridController } from "svelte-grid-extended";
  import { fade } from "svelte/transition";
  import InPlaceEdit from "../InPlaceEdit.svelte";
  import type { ItemType } from "$lib/gridTypes/gridItems";

  export let item: ItemType;

  // let items: ItemType[];
  function submit(field: string) {
    return ({ detail: newValue }: { detail: string }) => {
      console.log(`updated ${field}, new value is: "${newValue}"`);
    };
  }
</script>

<div transition:fade={{ duration: 300 }}>
  <GridItem
    previewClass="bg-red-400 w-full h-full z-10 "
    class="flex flex-col p-1 space-y-2  bg-red-900/30 dark:bg-red-100/30"
    id={item.id.toString()}
    bind:x={item.x}
    bind:y={item.y}
    bind:w={item.w}
    bind:h={item.h}
  >
    <!-- <span>{item.type}</span> -->
    <!-- <h1>{item.content.h2}</h1> -->
    <h2>
      <InPlaceEdit bind:value={item.content.h2} on:submit={submit("title")} />
    </h2>
    <!-- {item.content.h3
    ? "h-auto bg-teal-400"
    : "h-px bg-red-400 hover:h-auto"} -->
    <h3>
      <InPlaceEdit bind:value={item.content.h3} on:submit={submit("title")} />
    </h3>
    {#each item.content.text as text}
      <p>
        <InPlaceEdit bind:value={text} on:submit={submit("title")} />
      </p>
    {/each}
    <!-- <div class={item.type}> -->
    {#if item.content.table && item.content.table.content}
      <div style="education" class="grid">
        {#each item.content.table.content as text}
          <InPlaceEdit bind:value={text} on:submit={submit("title")} />
        {/each}
      </div>
    {/if}
    <!-- </div> -->
  </GridItem>
</div>

<style>
  .education {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(100px, auto);
  }
</style>
