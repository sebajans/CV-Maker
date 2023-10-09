<script lang="ts">
  import T from "@tolgee/svelte/T.svelte";
  import Grid, { type GridController } from "svelte-grid-extended";
  import { printPage } from "$lib/functions/printPage";
  import InPlaceEdit from "$components/InPlaceEdit.svelte";
  import { itemsStore, type ItemType } from "$lib/gridTypes/gridItems";
  import GridTypeItem from "$components/gridItems/GridTypeItem.svelte";
  import { typesOfGridItems } from "$lib/gridTypes/typesOfGridItems";
  import Icon from "@iconify/svelte";
  import {
    colorCombinations,
    addColorCombination,
    type ColorCombinationType,
  } from "$lib/gridTypes/colorCombinations";
  // import * as html2pdf from 'html2pdf.js';
  import { addNewItem } from "$lib/functions/addNewItem";
  import ColorPicker from "svelte-awesome-color-picker";
  import ColorPickerWrapper from "$components/ColorPickerWrapper.svelte";
  import { clickOutside } from "$lib/functions/clickOutside";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  let hex: string;
  let hex2: string;

  let items: ItemType[];

  // Subscribe to changes in the store
  itemsStore.subscribe((value) => {
    items = value;
  });

  // onMount(() => {
  //   // Add initial color combination
  //   addColorCombination();
  // });
  $: {
    const combinedColors: ColorCombinationType = {
      id:
        colorCombinations.length > 0
          ? colorCombinations[colorCombinations.length - 1].id
          : 0,
      mainColor: hex || "#000000",
      secondaryColor: hex2 || "#ffffff",
    };

    // Check if the combinedColors is different from the last item in colorCombinations
    if (
      !colorCombinations.length ||
      JSON.stringify(combinedColors) !==
        JSON.stringify(colorCombinations[colorCombinations.length - 1])
    ) {
      // Add the combinedColors only if it's different
      addColorCombination(combinedColors);
    }
  }

  let gridController: GridController;

  let selectedType: string = ""; // Default type

  // function addNewItem(typeToUse: string = selectedType) {
  //   const w = 3;
  //   const h = 5;
  //   const newPosition = gridController.getFirstAvailablePosition(w, h);
  //   const newItemId = crypto.randomUUID();

  //   let newItem: ItemType;
  //   newItem = {
  //     id: newItemId,
  //     x: newPosition ? newPosition.x : 0,
  //     y: newPosition ? newPosition.y : 0,
  //     w,
  //     h,
  //     type: typeToUse,
  //     content: {
  //       h2:
  //         selectedType === "listWithHeader" ||
  //         selectedType === "textWithHeader" ||
  //         selectedType === "dataWithHeader" ||
  //         selectedType === "listWithHeaderAndSubHeader" ||
  //         selectedType === "textWithHeaderAndSubHeader" ||
  //         selectedType === "dataWithHeaderAndSubHeader"
  //           ? "New Title"
  //           : undefined,
  //       h3:
  //         selectedType === "listWithHeaderAndSubHeader" ||
  //         selectedType === "textWithHeaderAndSubHeader" ||
  //         selectedType === "dataWithHeaderAndSubHeader"
  //           ? "Subtitle"
  //           : undefined,
  //       text:
  //         selectedType === "text" ||
  //         selectedType === "textWithHeader" ||
  //         selectedType === "textWithHeaderAndSubHeader"
  //           ? ["Hello"]
  //           : undefined,
  //       list:
  //         selectedType === "list" ||
  //         selectedType === "listWithHeader" ||
  //         selectedType === "listWithHeaderAndSubHeader"
  //           ? ["Hello"]
  //           : undefined,
  //       data:
  //         selectedType === "data" ||
  //         selectedType === "dataWithHeader" ||
  //         selectedType === "dataWithHeaderAndSubHeader"
  //           ? [
  //               {
  //                 location: "Location",
  //                 description: "Description",
  //                 position: "Position",
  //                 date: "Date",
  //                 institution: "Institution",
  //               },
  //             ]
  //           : undefined,
  //     },
  //   };

  //   itemsStore.update((currentItems) => [...currentItems, newItem]);
  // }

  let selectedColor = 1;
  let expandColorPalette = false;
  false;

  let isColorPickerOpen = true;
  let isOpen = true;
  // https://www.npmjs.com/package/svelte-awesome-color-picker

  $: isOpen;
  $: isColorPickerOpen;
  let scrollY = 0;
  $: console.log(scrollY);
</script>

<svelte:window bind:scrollY />

<div
  class="hide-on-print fixed w-full bottom-0 left-1/2 -translate-x-1/2 pt -4 px-4 flex z-50"
>
  {#if isColorPickerOpen}
    <div
      transition:fade={{ duration: 300 }}
      class="absolute -translate-x-1/2 transition-all left-1/2 top-0 bg-teal-600/30 backdrop-blur-md flex flex-row w-auto -translate-y-[calc(100%_+_0.5rem)] z-10 rounded-md"
    >
      <div class="w-10 flex flex-col space-y-2 h-full p-1.5">
        <div class="h-full max-h-10 w-8 rounded-md overflow-hidden">
          <ColorPicker
            label=""
            isAlpha={false}
            {isOpen}
            isPopup={false}
            canChangeMode={true}
            bind:hex
            components={{ wrapper: ColorPickerWrapper }}
          />
        </div>
        <div class="h-full max-h-10 w-8 rounded-md overflow-hidden">
          <ColorPicker
            label=""
            isAlpha={false}
            isOpen={!isOpen}
            isPopup={false}
            canChangeMode={true}
            bind:hex={hex2}
            components={{ wrapper: ColorPickerWrapper }}
          />
        </div>
      </div>

      <div
        transition:fade={{ duration: 300 }}
        id="colorpicker-wrapper"
        class="[--picker-height:100%] {expandColorPalette
          ? 'max-h-52 h-52 pb-1'
          : 'max-h-20 h-20'}  transition-all delay-100"
      />
      <!-- <div class="relative w-full flex justify-center"> -->
      <button
        on:mouseenter={() => {
          expandColorPalette = !expandColorPalette;
        }}
        class="w-8 p-1 absolute -top-1.5 left-1/2 -translate-x-1/2 h-1.5 group hover:h-3 duration-300 hover:cursor-pointer bg-teal-600/30 transition-all"
      >
        <div class="w-full bg-white h-px z-10" />
        <div
          class="-translate-y-px group-hover:translate-y-0.5 duration-500 transition-transform w-full bg-white h-px z-10"
        />
      </button>
      <!-- </div> -->
    </div>
  {/if}
  <div
    class="flex relative p-1 flex-row justify-start mx-auto items-center space-x-2 shadow-md mb-4 w-fit max-w-3xl bg-teal-600/30 dark:bg-teal-400/50 backdrop-blur-md rounded-md"
  >
    <div class="w-36 flex flex-col space-y-2">
      <label class="h-10 px-1 py-2" for="item-type">Add new item:</label>
      <div class="flex h-10 flex-row space-x-1">
        <div class="select">
          <select class=" w-full" bind:value={selectedType} id="item-type">
            <option value="" selected hidden>Add new</option>
            {#each typesOfGridItems as type}
              <option value={type.type}>{type.title}</option>
            {/each}
          </select>
          <span class="focus" />
        </div>
        <button
          class="bg-white p-1 hover:bg-slate-200 transition-all rounded-md flex flex-row"
          on:click={() => addNewItem(selectedType)}
        >
          <Icon class="h-6 w-6 self-center" color="black" icon="ic:round-add" />
        </button>
      </div>
    </div>
    <div class="w-36 flex flex-col space-y-2">
      <label class="h-10 px-1 py-2" for="item-type">Item Storage:</label>
      <div class="flex h-10 flex-row space-x-1">
        <div class="select w-full">
          <select class=" w-full" bind:value={selectedType} id="item-type">
            <option value="" selected hidden>Select type</option>
            {#each items as type}
              <option value={type.type}>{type.content.h2}</option>
            {/each}
          </select>
          <span class="focus" />
        </div>
        <button
          class="bg-white p-1 hover:bg-slate-200 transition-all rounded-md flex flex-row"
          on:click={() => addNewItem(selectedType)}
        >
          <Icon class="h-6 w-6 self-center" color="black" icon="ic:round-add" />
        </button>
      </div>
    </div>
    <div class="w-32 flex flex-col space-y-2">
      <label class="h-10 px-1 py-2" for="item-type">Color palette:</label>
      <div
        class="flex flex-row space-x-1 h-10 p-1 bg-white overflow-x-scroll rounded-md"
      >
        {#each colorCombinations as combination}
          <div
            role="button"
            tabindex="0"
            on:keydown={() => (selectedColor = combination.id)}
            on:click={() => (selectedColor = combination.id)}
            style="background: linear-gradient(to bottom right, {combination.mainColor} 0%, {combination.mainColor} 50%, {combination.secondaryColor} 50.1%, {combination.secondaryColor} 100%);"
            class=" rounded-full h-8 aspect-square"
          >
            <div
              class="w-full h-full transition-all {combination.id ===
              selectedColor
                ? 'bg-black/50'
                : 'hover:bg-black/50'} rounded-full flex justify-center items-center"
            >
              {#if combination.id === selectedColor}
                <Icon
                  class="h-6 w-6 self-center"
                  color="white"
                  icon="ic:round-check"
                />
              {/if}
            </div>
          </div>
        {/each}
        <button
          on:click={() => {
            isColorPickerOpen = !isColorPickerOpen;
            console.log(isColorPickerOpen);
            selectedColor = 7;
          }}
          style="background: conic-gradient(#ff0000, #ffff00 17.2%, #ffff00 18.2%, #00ff00 33.3%, #00ffff 49.5%, #00ffff 51.5%,
          #0000ff 67.7%, #ff00ff 83.3%, #ff0000)"
          class=" relative rounded-full h-8 aspect-square"
        >
          <!-- <button class="bg-slate-500 w-full h-full" /> -->
          <!-- <ColorPicker
            label=""
            isAlpha={false}
            {isOpen}
            isPopup={false}
            canChangeMode={false}
            bind:hex
            components={{ wrapper: ColorPickerWrapper }}
          /> -->
        </button>
        <div
          role="button"
          tabindex="0"
          class="relative rounded-full bg-black h-8 !w-8 overflow-hidden"
        >
          <!-- <div class="w-full h-full"> -->

          <!-- </div> -->
        </div>
        <!-- <div
          role="button"
          tabindex="0"
          on:keydown={() => (selectedColor = 0)}
          on:click={() => (selectedColor = 0)}
          class=" rounded-full h-8 aspect-square"
        >

      </div> -->

        <!-- <select class=" w-full" bind:value={selectedType} id="item-type">
            <option value="" selected hidden>Select type</option>
            {#each differentTypes as type}
              <option value={type.type}>{type.title}</option>
            {/each}
          </select>
          <span class="focus" /> -->
      </div>
    </div>
    <div class="w-24 flex flex-col space-y-2">
      <button
        class="bg-white flex hover:bg-gray-200 transition-all flex-row items-center justify-start p-1.5 space-x-2 w-full h-10 rounded-md"
        on:click={printPage}
      >
        <Icon class="h-5 w-5" color="black" icon="ic:round-print" />
        <span class="font-sans text-black"> Print </span>
      </button>
      <button
        class="bg-white flex hover:bg-gray-200 transition-all flex-row items-center justify-start p-1.5 space-x-2 w-full h-10 rounded-md"
        on:click={printPage}
      >
        <Icon class="h-5 w-5" color="black" icon="material-symbols:download" />
        <span class="font-sans text-black"> Export </span>
      </button>
    </div>
  </div>
</div>

<div class="py-20">
  <page class="section-to-print space-y-10">
    <div
      style="background-color: {colorCombinations[selectedColor]
        .secondaryColor}; color: {colorCombinations[selectedColor].mainColor};"
      id="page-1"
      class="!h-[29.7cm] p-[2cm] outline-1 shadow-xl !w-[21cm] flex flex-col justify-center rounded-md"
    >
      <div class="w-full">
        <h1 class="text-black dark:text-white">CV - Dow Jones</h1>
      </div>
      <Grid
        rows={20}
        cols={10}
        gap={8}
        class="w-full h-full grid-container z-10"
        bind:controller={gridController}
      >
        {#each items as item, id}
          <GridTypeItem
            {item}
            colorPalette={colorCombinations[selectedColor]}
          />
        {/each}
      </Grid>
    </div>
  </page>
</div>
<div class="py-20">
  <page class="section-to-print space-y-10">
    <div
      style="background-color: {colorCombinations[selectedColor]
        .secondaryColor}; color: {colorCombinations[selectedColor].mainColor};"
      id="page-2"
      class="!h-[29.7cm] p-[2cm] outline-1 shadow-xl !w-[21cm] flex flex-col justify-center rounded-md"
    >
      <div class="w-full">
        <h1 class="text-black dark:text-white">CV - Dow Jones</h1>
      </div>
      <Grid
        rows={20}
        cols={10}
        gap={8}
        class="w-full h-full grid-container z-10"
        bind:controller={gridController}
      >
        {#each items as item, id}
          <GridTypeItem
            {item}
            colorPalette={colorCombinations[selectedColor]}
          />
        {/each}
      </Grid>
    </div>
  </page>
</div>

<style>
  :root {
    --select-border: #777;
    --select-focus: blue;
    --select-arrow: var(--select-border);
    /* --picker-height: 50px; */
  }

  :global(input[type="color"]) {
    border-radius: 0 !important;
    height: 100% !important;
    margin: 0px !important;
    width: 100% !important;
  }
  :global(div .color) {
    border-radius: 0 !important;
    @apply m-0;
  }
  :global(
      .color-picker > label > .container > .alpha,
      .color-picker > label > .container > .color
    ) {
    height: 100%;
    width: 100%;
  }
  :global(.picker-wrapper) {
    height: 100%;
  }
  :global(#colorpicker-wrapper > .wrapper) {
    height: 100%;
  }

  :global(.color-picker > label) {
    height: 32px;
    margin: 0px !important;
    border-radius: 0px !important;
  }
  :global(.color-picker > label > .container) {
    width: 100%;
    aspect-ratio: 1/1;
  }

  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  select {
    appearance: none;
    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    @apply text-sm rounded-md h-8 font-sans;
    z-index: 1;
    &::-ms-expand {
      display: none;
    }
    outline: none;
  }

  .select {
    display: grid;
    grid-template-areas: "select";
    align-items: center;
    position: relative;

    &::after {
      grid-area: select;
    }

    /* min-width: 15ch; */
    max-width: 30ch;

    border: 0px solid var(--select-border);
    border-radius: 0.25em;
    padding: 0.25em 0.5em;

    font-size: 1.25rem;
    cursor: pointer;
    line-height: 1.1;

    background-color: #fff;
    background-image: linear-gradient(to top, #f9f9f9, #fff 33%);

    &::after {
      position: absolute;
      content: "";
      justify-self: end;
      width: 0.5em;
      height: 0.3em;
      background-color: var(--select-arrow);
      clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    }
  }

  select:focus + .focus {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 2px solid var(--select-focus);
    border-radius: inherit;
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
