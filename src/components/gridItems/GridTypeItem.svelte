<script lang="ts">
  import { GridItem, type GridController } from "svelte-grid-extended";
  import { fade } from "svelte/transition";
  import InPlaceEdit from "../InPlaceEdit.svelte";
  import type { ItemType, DataItem } from "$lib/gridTypes/gridItems";

  export let item: ItemType;

  // let items: ItemType[];
  function submit(field: string) {
    return ({ detail: newValue }: { detail: string }) => {
      console.log(`updated ${field}, new value is: "${newValue}"`);
    };
  }

  function addNewEntry() {
    if (item.type.includes("data")) {
      const newDataItem: DataItem = {
        agency: "Agency",
        description: "New Description",
        position: "New Position",
        date: "New Date",
        location: "New Location",
      };

      if (Array.isArray(item.content.data)) {
        item.content.data = [...item.content.data, newDataItem];
      } else {
        item.content.data = [newDataItem];
      }
    } else if (item.type.includes("list")) {
      const newListItem = "New Item";

      if (Array.isArray(item.content.list)) {
        item.content.list = [...item.content.list, newListItem];
      } else {
        item.content.list = [newListItem];
      }
    }
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
    {#if (item.type === "dataWithHeader" || item.type === "textWithHeader" || item.type === "listWithHeader" || item.type === "textWithHeaderAndSubHeader" || item.type === "dataWithHeaderAndSubHeader" || item.type === "listWithHeaderAndSubHeader") && item.content.h2 !== undefined}
      <h2>
        <InPlaceEdit bind:value={item.content.h2} on:submit={submit("Title")} />
      </h2>
    {/if}
    {#if (item.type === "textWithHeaderAndSubHeader" || item.type === "dataWithHeaderAndSubHeader" || item.type === "listWithHeaderAndSubHeader") && item.content.h3 !== undefined}
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
    {#if (item.type === "data" || item.type === "dataWithHeader" || item.type === "dataWithHeaderAndSubHeader") && Array.isArray(item.content.data)}
      <div class="flex flex-row flex-wrap w-full">
        {#each item.content.data as dataItem}
          {#if dataItem.position !== undefined}
            <h4 class="w-3/4">
              <InPlaceEdit
                bind:value={dataItem.position}
                on:submit={submit("data-position")}
              />
            </h4>
          {/if}
          {#if dataItem.date !== undefined}
            <div class="w-1/4">
              <InPlaceEdit
                bind:value={dataItem.date}
                on:submit={submit("data-date")}
              />
            </div>
          {/if}
          {#if dataItem.agency !== undefined}
            <h3 class="w-3/4">
              <InPlaceEdit
                bind:value={dataItem.agency}
                on:submit={submit("data-agency")}
              />
            </h3>
          {/if}
          {#if dataItem.location !== undefined}
            <div class="w-1/4">
              <InPlaceEdit
                bind:value={dataItem.location}
                on:submit={submit("data-date")}
              />
            </div>
          {/if}
          {#if dataItem.description !== undefined}
            <p class="w-full">
              <InPlaceEdit
                bind:value={dataItem.description}
                on:submit={submit("data-description")}
              />
            </p>
          {/if}
        {/each}
      </div>
    {/if}
    <button on:click={addNewEntry}>Add New Entry</button>
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
