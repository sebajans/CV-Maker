<script lang="ts">
  import { GridItem, type GridController } from "svelte-grid-extended";
  import { fade } from "svelte/transition";
  import InPlaceEdit from "../InPlaceEdit.svelte";
  import type { ItemType, DataItem } from "$lib/gridTypes/gridItems";
  import Icon from "@iconify/svelte";
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
    } else if (item.type.includes("text")) {
      const newTextItem = "New Item";

      if (Array.isArray(item.content.text)) {
        item.content.text = [...item.content.text, newTextItem];
      } else {
        item.content.text = [newTextItem];
      }
    }
  }
  let hovering = false;

  function moveStart() {
    document.body.classList.add("disable-selection");
  }

  function moveEnd() {
    document.body.classList.remove("disable-selection");
  }
</script>

<GridItem
  class="grid-item hover:bg-black-900/10 rounded-md hover:dark:bg-slate-100/10"
  id={item.id.toString()}
  bind:x={item.x}
  bind:y={item.y}
  bind:w={item.w}
  bind:h={item.h}
  on:previewchange={moveStart}
  on:change={moveEnd}
  previewClass="bg-black/20 rounded-md"
>
  <div
    class="w-full h-full flex flex-col p-1 space-y-2"
    role="cell"
    tabindex="0"
    on:mouseenter={() => (hovering = true)}
    on:mouseleave={() => (hovering = false)}
    on:pointerdown={moveStart}
    on:pointerup={moveEnd}
  >
    <!-- transition:fade={{ duration: 300 }} -->
    {#if item.type === "image" && item.content.imgUrl !== undefined}
      <img src="url" alt="altTag" />
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
    <div class="w-full h-full">
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
              <InPlaceEdit
                bind:value={listItem}
                on:submit={submit("listItem")}
              />
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
      {#if hovering}
        <button
          class="bg-black/20 hover:bg-slate-100 rounded-full w-5 h-5 flex justify-center items-center"
          on:click={addNewEntry}
        >
          <Icon color="black" width="100%" height="100%" icon="ic:round-add" />
        </button>
      {/if}
    </div>
  </div>
  <div
    class="absolute top-0 left-1/2 -translate-x-1/2"
    slot="moveHandle"
    let:moveStart
  >
    <!-- {#if hovering} -->
    <div class=" rounded text-white cursor-move" on:pointerdown={moveStart}>
      <Icon
        class="h-4 w-4"
        color="grey"
        icon="teenyicons:drag-horizontal-solid"
      />
    </div>
    <!-- {/if} -->
  </div>
</GridItem>

<style>
  :global(.preview) {
    background-color: black;
    opacity: 0.3;
    transition: all 0.15s ease-in-out;
  }
</style>
