<script lang="ts">
  import { GridItem, type GridController } from "svelte-grid-extended";
  import { fade } from "svelte/transition";
  import InPlaceEdit from "../InPlaceEdit.svelte";
  import type { ItemType, DataItem } from "$lib/gridTypes/gridItems";
  import Icon from "@iconify/svelte";
  export let item: ItemType;
  interface ColorCombination {
    id: number;
    mainColor: string;
    secondaryColor: string;
  }
  export let colorPalette: ColorCombination;

  // let items: ItemType[];
  function submit(field: string) {
    return ({ detail: newValue }: { detail: string }) => {
      console.log(`updated ${field}, new value is: "${newValue}"`);
    };
  }

  function addNewEntry() {
    if (item.type.includes("data")) {
      const newDataItem: DataItem = {
        institution: "Institution",
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
  let openSubMenu = false;

  function moveStart() {
    console.log("moveStart");
    document.body.classList.add("disable-selection");
  }

  function moveEnd() {
    console.log("moveEnd");
    document.body.classList.remove("disable-selection");
  }
</script>

<GridItem
  class="grid-item hover:bg-black/10 transition-colors rounded-md  hover:dark:bg-slate-100/10"
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
    {#if item.type === "image" && item.content.imgUrl !== undefined}
      <img
        class="pointer-events-none select-none w-full h-full rounded-full aspect-square object-cover"
        src={item.content.imgUrl}
        alt="altTag"
      />
    {/if}
    {#if (item.type === "dataWithHeader" || item.type === "textWithHeader" || item.type === "listWithHeader" || item.type === "textWithHeaderAndSubHeader" || item.type === "dataWithHeaderAndSubHeader" || item.type === "listWithHeaderAndSubHeader") && item.content.h2 !== undefined}
      <h2 style="color: {colorPalette.mainColor}">
        <InPlaceEdit bind:value={item.content.h2} on:submit={submit("Title")} />
      </h2>
    {/if}
    {#if (item.type === "textWithHeaderAndSubHeader" || item.type === "dataWithHeaderAndSubHeader" || item.type === "listWithHeaderAndSubHeader") && item.content.h3 !== undefined}
      <h3 style="color: {colorPalette.mainColor}">
        <InPlaceEdit
          bind:value={item.content.h3}
          on:submit={submit("Subtitle")}
        />
      </h3>
    {/if}
    <div
      role="cell"
      tabindex="0"
      on:mouseenter={() => (openSubMenu = true)}
      on:mouseleave={() => (openSubMenu = false)}
      class="w-full h-full"
    >
      {#if (item.type === "text" || item.type === "textWithHeader" || item.type === "textWithHeaderAndSubHeader") && Array.isArray(item.content.text)}
        {#each item.content.text as text}
          <p class="hoverItem">
            <InPlaceEdit bind:value={text} on:submit={submit("text")} />
          </p>
        {/each}
      {/if}
      {#if (item.type === "list" || item.type === "listWithHeader" || item.type === "listWithHeaderAndSubHeader") && Array.isArray(item.content.list)}
        <ul class="list-inside">
          {#each item.content.list as listItem}
            <li class=" list-disc">
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
              <h4 class="w-3/4 font-medium">
                <InPlaceEdit
                  bind:value={dataItem.position}
                  on:submit={submit("data-position")}
                />
              </h4>
            {/if}
            {#if dataItem.date !== undefined}
              <div class="w-1/4 text-right text-sm">
                <InPlaceEdit
                  bind:value={dataItem.date}
                  on:submit={submit("data-date")}
                />
              </div>
            {/if}
            {#if dataItem.institution !== undefined}
              <h3 class="w-3/4 text-sm">
                <InPlaceEdit
                  bind:value={dataItem.institution}
                  on:submit={submit("data-institution")}
                />
              </h3>
            {/if}
            {#if dataItem.location !== undefined}
              <div class="w-1/4 text-right text-sm">
                <InPlaceEdit
                  bind:value={dataItem.location}
                  on:submit={submit("data-location")}
                />
              </div>
            {/if}
            {#if dataItem.description !== undefined}
              <p class="w-full text-base font-sans">
                <InPlaceEdit
                  bind:value={dataItem.description}
                  on:submit={submit("data-description")}
                />
              </p>
            {/if}
          {/each}
        </div>
      {/if}
      {#if openSubMenu}
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
    role="cell"
    tabindex="0"
    on:mouseenter={() => (hovering = true)}
    on:mouseleave={() => (hovering = false)}
    class="absolute top-0 left-1/2 -translate-x-1/2"
    slot="moveHandle"
    let:moveStart
  >
    {#if hovering}
      <div class=" text-white cursor-move" on:pointerdown={moveStart}>
        <Icon
          class="h-5 w-5 text-black/50 hover:text-black"
          icon="mdi:drag-horizontal"
        />
      </div>
    {/if}
  </div>
  <div
    role="cell"
    tabindex="0"
    on:mouseenter={() => (hovering = true)}
    on:mouseleave={() => (hovering = false)}
    class="absolute bottom-1 right-1"
    slot="resizeHandle"
    let:resizeStart
  >
    {#if hovering}
      <div class="cursor-move" on:pointerdown={resizeStart}>
        <Icon
          class="h-5 w-5 text-black/50 hover:text-black"
          icon="mdi:resize-bottom-right"
        />
      </div>
    {/if}
  </div>
  <div class="absolute top-1 right-1">
    <button
      on:mouseenter={() => (hovering = true)}
      on:mouseleave={() => (hovering = false)}
      on:click={() => (openSubMenu = !openSubMenu)}
      class="{hovering ? 'opacity-100' : 'opacity-0'} absolute top-0 right-0"
    >
      <Icon
        class="h-5 w-5 text-black/50 transition-colors hover:text-black"
        icon="iconamoon:options-fill"
      />
    </button>
    <div
      class="{openSubMenu
        ? 'opacity-100'
        : 'opacity-0'} mt-6 p-1 bg-slate-50 shadow-sm flex flex-col space-y-1 rounded-md relative"
    >
      <button class="text-xs bg-slate-200 px-2 py-1"> color </button>
      <button class="text-xs bg-slate-200 px-2 py-1"> color </button>
    </div>
  </div>
</GridItem>

<style>
  .hoverItem {
    position: relative;
  }
  .hoverItem:after {
    /* z-index: -1; */
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: -5px;
    top: -5px;
    border-radius: inherit;
    background: transparent;
    @apply select-none pointer-events-none;
  }
  .hoverItem:after:hover {
    background: #000;
    z-index: 1;
  }

  /* :global(.preview) {
    background-color: black;
    opacity: 0.3;
    transition: all 0.15s ease-in-out;
  } */
</style>
