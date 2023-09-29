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
    previewClass="previewClassTest"
    class="flex flex-col p-1 space-y-2 hover:bg-teal-900/10 rounded-md hover:dark:bg-slate-100/10"
    id={item.id.toString()}
    bind:x={item.x}
    bind:y={item.y}
    bind:w={item.w}
    bind:h={item.h}
  >
    {#if item.type === "image" && item.content.imgUrl !== undefined}
      <img src="url" alt="altTag" />
      <!-- <InPlaceEdit bind:value={item.content.img} on:submit={submit("title")} /> -->
    {/if}
    {#if (item.type === "tableWithHeader" || item.type === "textWithHeader" || item.type === "listWithHeader" || item.type === "textWithHeaderAndSubHeader" || item.type === "tableWithHeaderAndSubHeader" || item.type === "listWithHeaderAndSubHeader") && item.content.h2 !== undefined}
      <h2>
        <InPlaceEdit bind:value={item.content.h2} on:submit={submit("Title")} />
      </h2>
    {/if}
    {#if (item.type === "textWithHeaderAndSubHeader" || item.type === "tableWithHeaderAndSubHeader" || item.type === "listWithHeaderAndSubHeader") && item.content.h3 !== undefined}
      <h3>
        <InPlaceEdit
          bind:value={item.content.h3}
          on:submit={submit("Subtitle")}
        />
      </h3>
    {/if}
    {#if (item.type === "text" || item.type === "textWithHeader" || item.type === "textWithHeaderAndSubHeader") && Array.isArray(item.content.text)}
      {#each item.content.text as text}
        <p>
          <InPlaceEdit bind:value={text} on:submit={submit("text")} />
        </p>
      {/each}
    {/if}
    {#if (item.type === "list" || item.type === "listWithHeader" || item.type === "listWithHeaderAndSubHeader") && Array.isArray(item.content.list)}
      <ul>
        {#each item.content.list as listItem}
          <li>
            <InPlaceEdit bind:value={listItem} on:submit={submit("listItem")} />
          </li>
        {/each}
      </ul>
    {/if}
    {#if (item.type === "table" || item.type === "tableWithHeader" || item.type === "tableWithHeaderAndSubHeader") && Array.isArray(item.content.table)}
      <ul>
        {#each item.content.table as tableItem}
          <li>
            <InPlaceEdit bind:value={tableItem} on:submit={submit("table")} />
          </li>
        {/each}
      </ul>
    {/if}
  </GridItem>
</div>

<style>
  .previewClassTest {
    background-color: red;
    width: 100%;
    height: 100%;
    z-index: 30;
  }
</style>
