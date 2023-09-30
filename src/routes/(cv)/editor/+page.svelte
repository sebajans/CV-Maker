<script lang="ts">
  import { getTranslate } from "@tolgee/svelte";
  import T from "@tolgee/svelte/T.svelte";
  import DarkModeButton from "$components/base/DarkModeButton.svelte";
  import LanguageSwitcher from "$components/base/LanguageSwitcher.svelte";
  import { fade } from "svelte/transition";
  import Grid, { GridItem, type GridController } from "svelte-grid-extended";
  import { printPage } from "$lib/functions/printPage";
  import InPlaceEdit from "$components/InPlaceEdit.svelte";
  import { itemsStore, type ItemType } from "$lib/gridTypes/gridItems";
  import GridTypeItem from "$components/gridItems/GridTypeItem.svelte";

  import Icon from "@iconify/svelte";

  const { t } = getTranslate();

  let items: ItemType[];

  // Subscribe to changes in the store
  itemsStore.subscribe((value) => {
    items = value;
  });

  let gridController: GridController;

  let selectedType: string = ""; // Default type

  function addNewItem(typeToUse: string = selectedType) {
    const w = Math.floor(Math.random() * 2) + 1;
    const h = Math.floor(Math.random() * 5) + 1;
    const newPosition = gridController.getFirstAvailablePosition(w, h);
    const newItemId = crypto.randomUUID();

    let newItem: ItemType;
    newItem = {
      id: newItemId,
      x: newPosition ? newPosition.x : 0,
      y: newPosition ? newPosition.y : 0,
      w,
      h,
      type: typeToUse,
      content: {
        h2:
          selectedType === "listWithHeader" ||
          selectedType === "textWithHeader" ||
          selectedType === "dataWithHeader" ||
          selectedType === "listWithHeaderAndSubHeader" ||
          selectedType === "textWithHeaderAndSubHeader" ||
          selectedType === "dataWithHeaderAndSubHeader"
            ? "New Title"
            : undefined,
        h3:
          selectedType === "listWithHeaderAndSubHeader" ||
          selectedType === "textWithHeaderAndSubHeader" ||
          selectedType === "dataWithHeaderAndSubHeader"
            ? "Subtitle"
            : undefined,
        text:
          selectedType === "text" ||
          selectedType === "textWithHeader" ||
          selectedType === "textWithHeaderAndSubHeader"
            ? ["Hello"]
            : undefined,
        list:
          selectedType === "list" ||
          selectedType === "listWithHeader" ||
          selectedType === "listWithHeaderAndSubHeader"
            ? ["Hello"]
            : undefined,
        data:
          selectedType === "data" ||
          selectedType === "dataWithHeader" ||
          selectedType === "dataWithHeaderAndSubHeader"
            ? [
                {
                  location: "Location",
                  description: "Description",
                  position: "Position",
                  date: "Date",
                  agency: "Agency",
                },
              ]
            : undefined,
      },
    };

    itemsStore.update((currentItems) => [...currentItems, newItem]);
  }

  $: console.log($itemsStore);
  $: console.log(items);

  // const itemSize = { height: 50 };

  // $: console.log(items);

  // function submit(field: string) {
  //   return ({ detail: newValue }: { detail: string }) => {
  //     console.log(`updated ${field}, new value is: "${newValue}"`);
  //   };
  // }

  const differentTypes = [
    {
      type: "text",
      title: "Text",
    },
    {
      type: "textWithHeader",
      title: "Text + Header",
    },
    {
      type: "textWithHeaderAndSubHeader",
      title: "Heading + Subheading + Text",
    },
    {
      type: "data",
      title: "Data",
    },
    {
      type: "dataWithHeader",
      title: "Data + Header",
    },
    {
      type: "dataWithHeaderAndSubHeader",
      title: "Data + Header + Subheader",
    },
    {
      type: "list",
      title: "List",
    },
    {
      type: "listWithHeader",
      title: "List + Header",
    },
    {
      type: "listWithHeaderAndSubHeader",
      title: "List + Header + Subheader",
    },
    {
      type: "image",
      title: "Image",
    },
  ];
</script>

<div class="hide-on-print fixed bottom-0 left-0 pt-4 px-4 flex">
  <div
    class="flex flex-col justify-between items-center space-y-6 border border-teal-600/30 shadow-md mb-4 z-50 w-40 bg-teal-600/30 dark:bg-teal-400/50 backdrop-blur-md rounded-md"
  >
    <div id="add-items" class="w-full flex flex-col">
      <label class="p-2" for="item-type">Add item:</label>
      <div class="w- flex">
        <select class="w-3/4" bind:value={selectedType} id="item-type">
          <option value="" selected hidden>Select type</option>
          {#each differentTypes as type}
            <option value={type.type}>{type.title}</option>
          {/each}
        </select>
        <button
          class="bg-slate-400 p-1 flex flex-row"
          on:click={() => addNewItem(selectedType)}
        >
          <Icon class="h-6 w-6" color="black" icon="ic:round-add" />
          <!-- <span class="text-start">Add</span> -->
        </button>
      </div>
    </div>
    <span class="mx-2 dark:text-teal-50">Categories:</span>
    <button class="btn btn-navajo" on:click={printPage}>print page</button>
  </div>
</div>
<div class="py-20">
  <page class="section-to-print space-y-10">
    <div
      id="page-1"
      class="!h-[29.7cm] p-[2cm] outline-1 outline outline-offset-1 !w-[21cm] flex justify-center bg-white dark:bg-black rounded-md"
    >
      <Grid
        rows={20}
        cols={10}
        gap={8}
        class="w-full h-full grid-container z-10"
        bind:controller={gridController}
      >
        <!-- {#each items as item}
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
      {/each} -->
        {#each items as item, id}
          <GridTypeItem {item} />
        {/each}
      </Grid>
    </div>
  </page>
</div>

<style>
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  h2 {
    @apply text-teal-600 font-sans uppercase font-medium;
  }

  @page {
    margin: 0cm !important;
  }

  @media print {
    .hide-on-print {
      visibility: hidden;
    }

    .section-to-print {
      border: initial;
      border-radius: initial;
      width: initial;
      min-height: initial;
      box-shadow: initial;
      background: initial;
      page-break-after: always;
    }

    .section-to-print,
    .section-to-print *,
    .print-this {
      visibility: visible;
    }
    .section-to-print {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>
