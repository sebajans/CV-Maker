<script lang="ts">
  import { getTranslate } from "@tolgee/svelte";
  import T from "@tolgee/svelte/T.svelte";
  import { cvItems } from "$lib/lists/cvItems";
  import { skillItems, type SkillItems } from "$lib/lists/skillItems";
  import DarkModeButton from "$components/base/DarkModeButton.svelte";
  import LanguageSwitcher from "$components/base/LanguageSwitcher.svelte";
  import { fade } from "svelte/transition";
  import Grid, { GridItem, type GridController } from "svelte-grid-extended";
  import { writable, type Writable } from "svelte/store";
  import { printPage } from "$lib/functions/printPage";
  import InPlaceEdit from "$components/InPlaceEdit.svelte";
  // interface IntroItems {
  //   fieldOfWork: string[];
  //   name: string;
  //   defaultValue: string;
  // }
  // let introtext: IntroItems[] = [
  //   {
  //     fieldOfWork: ["webdev"],
  //     name: "webdev",
  //     defaultValue:
  //       "Hey, I'm Sebastian. I'm a front-end web developer. I'm currently working as a freelancer. While studying Materials Science I realized i wanted to work in a more creative field. I started to learn web development and graphic design in my free time. I'm passionate about creating beautiful and functional websites and designs.",
  //   },
  //   {
  //     fieldOfWork: ["graphicdesign"],
  //     name: "graphicdesign",
  //     defaultValue:
  //       "Hey, I'm Sebastian. I'm a graphic designer. I'm currently working as a freelancer. While studying Materials Science I realized i wanted to work in a more creative field. I started to learn graphic design in my free time. I'm passionate about creating beautiful designs.",
  //   },
  //   {
  //     fieldOfWork: ["productdesign"],
  //     name: "productdesign",
  //     defaultValue:
  //       "Hey, I'm Sebastian. I'm a product designer. I'm currently working as a freelancer. While studying Materials Science I realized i wanted to work in a more creative field. I studied Design Engineering and graphic design in my free time. I'm passionate about creating beautiful designs.",
  //   },
  // ];

  // let filteredCvItems = cvItems;
  // let filteredSkillItems = skillItems;
  // let filteredIntroText = introtext;

  // function selectCategory(fieldOfWork: string[] = ["webdev"]) {
  //   filteredCvItems = cvItems.filter((item) =>
  //     item.fieldOfWork.some((field) => fieldOfWork.includes(field))
  //   );

  //   filteredIntroText = introtext.filter((item) =>
  //     item.fieldOfWork.some((field) => fieldOfWork.includes(field))
  //   );

  //   filteredSkillItems = Object.entries(skillItems).reduce(
  //     (acc, [categoryName, skills]) => {
  //       acc[categoryName] = {
  //         categorydescription: skills.categorydescription,
  //         categoryArray: skills.categoryArray.filter((skill) =>
  //           skill.fieldOfWork.some((field) => fieldOfWork.includes(field))
  //         ),
  //       };
  //       return acc;
  //     },
  //     {} as SkillItems
  //   );
  // }

  // $: console.log(filteredIntroText);

  const { t } = getTranslate();

  // Define the type for items
  interface ItemType {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    type: string;
    content: {
      h2: string;
      h3: string;
      table?: {
        rowsAmount?: number;
      };
      text: string[];
    };
    isEditing?: boolean; // Add isEditing property
  }

  // Create a writable store for items
  const itemsStore: Writable<ItemType[]> = writable([
    {
      id: crypto.randomUUID(),
      x: 0,
      y: 0,
      w: 6,
      h: 3,
      type: "text",
      content: {
        h2: "Introduction",
        h3: "",
        text: [],
        table: {
          rowsAmount: 1,
        },
      },
    },
    {
      id: crypto.randomUUID(),
      x: 0,
      y: 7,
      w: 6,
      h: 4,
      type: "table",
      content: {
        h2: "Education",
        h3: "Degree in Materials Science",
        table: {
          rowsAmount: 1,
        },
        text: [],
      },
    },
    {
      id: crypto.randomUUID(),
      x: 0,
      y: 3,
      w: 6,
      h: 4,
      type: "table",
      content: {
        h2: "Work Experience",
        h3: "Front-end Developer",
        table: {
          rowsAmount: 1,
        },
        text: [],
      },
    },
    {
      id: crypto.randomUUID(),
      x: 0,
      y: 11,
      w: 6,
      h: 4,
      type: "list",
      content: {
        h2: "Certificates",
        h3: "Web Development Certificate",
        table: {
          rowsAmount: 1,
        },
        text: [],
      },
    },
    // Add more default items as needed
  ]);

  let items: ItemType[];

  // Subscribe to changes in the store
  itemsStore.subscribe((value) => {
    items = value;
  });

  let gridController: GridController;

  function addNewItem() {
    const w = Math.floor(Math.random() * 2) + 1;
    const h = Math.floor(Math.random() * 5) + 1;
    const newPosition = gridController.getFirstAvailablePosition(w, h);
    const newItemId = crypto.randomUUID();

    const newItem: ItemType = {
      id: newItemId,
      x: newPosition ? newPosition.x : 0,
      y: newPosition ? newPosition.y : 0,
      w,
      h,
      type: "text",
      content: {
        h2: "New Title",
        h3: "Subtitle",
        text: [],
      },
    };

    itemsStore.update((currentItems) => [...currentItems, newItem]);
  }

  const itemSize = { height: 50 };

  $: console.log(items);

  function submit(field: string) {
    return ({ detail: newValue }: { detail: string }) => {
      // IRL: POST value to server here
      console.log(`updated ${field}, new value is: "${newValue}"`);
    };
  }
</script>

<div class="hide-on-print absolute inset-y-0 left-0 pt-4 px-4 flex">
  <div
    class="flex flex-col justify-between items-center space-y-6 border border-teal-600/30 shadow-md mb-4 z-50 w-40 bg-teal-600/30 dark:bg-teal-400/50 backdrop-blur-md rounded-md p-2"
  >
    <div class="flex flex-row space-x-2">
      <LanguageSwitcher />
      <DarkModeButton />
    </div>
    <div id="add-items" class=" flex flex-col">
      <button on:click={addNewItem}>Add New Item</button>
      <span class="mx-2 dark:text-teal-50">Categories:</span>
    </div>
    <button class="btn btn-navajo" on:click={printPage}>print page</button>
  </div>
</div>
<page class="section-to-print space-y-10">
  <div
    id="page-1"
    class="!h-[29.7cm] p-[2cm] outline-1 outline outline-offset-1 !w-[21cm] flex justify-center bg-teal-50 dark:bg-teal-900"
  >
    <Grid
      {itemSize}
      cols={10}
      gap={10}
      class=""
      collision="push"
      bind:controller={gridController}
    >
      {#each items as item, id}
        <!-- {#if item.type === "table"}
          <div transition:fade={{ duration: 300 }}>
            <GridItem
              class="flex bg-slate-100/30"
              id={id.toString()}
              bind:x={item.x}
              bind:y={item.y}
              bind:w={item.w}
              bind:h={item.h}
            >
              <div>
                <h1>{item.content.h2}</h1>
                <h3>{item.content.h3}</h3>
              </div>
            </GridItem>
          </div>
        {:else if item.type === "list"}
          <div transition:fade={{ duration: 300 }}>
            <GridItem
              class="flex bg-slate-100/30"
              id={id.toString()}
              bind:x={item.x}
              bind:y={item.y}
              bind:w={item.w}
              bind:h={item.h}
            >
              <div>
                <h1>{item.content.h2}</h1>
                <h3>{item.content.h3}</h3>
              </div>
            </GridItem>
          </div>
        {:else if item.type === "text"} -->
        <div transition:fade={{ duration: 300 }}>
          <GridItem
            class="flex p-1 space-y-2  bg-slate-100/10"
            id={id.toString()}
            bind:x={item.x}
            bind:y={item.y}
            bind:w={item.w}
            bind:h={item.h}
          >
            <div class={item.type}>
              <!-- <span>{item.type}</span> -->
              <!-- <h1>{item.content.h2}</h1> -->
              <h2>
                <InPlaceEdit
                  bind:value={item.content.h2}
                  on:submit={submit("title")}
                />
              </h2>
              <!-- {item.content.h3
                ? "h-auto bg-teal-400"
                : "h-px bg-red-400 hover:h-auto"} -->
              <h3>
                <InPlaceEdit
                  bind:value={item.content.h3}
                  on:submit={submit("title")}
                />
                <!-- {item.content.h3 === undefined ? "" : item.content.h3} -->
              </h3>
              {#each item.content.text as text}
                <p>
                  <InPlaceEdit bind:value={text} on:submit={submit("title")} />
                </p>
              {/each}
            </div>
          </GridItem>
        </div>
        <!-- {/if} -->
      {/each}
    </Grid>
    <!-- <div
      class=" h-[25.7cm] grid-rows-12 grid grid-cols-[10.5cm,_0.2cm,_5.5cm] gap-x-[0.4cm] gap-y-[0.5cm]"
    >
      <div class="row-start-1 col-start-1 row-span-3 flex flex-col">
        <h1
          class="font-sans pb-3 font-normal uppercase text-[2.5rem] text-right leading-8"
        >
          Sebastian Jans
        </h1>
        {#each filteredIntroText as text}
          <p class="text-left text-sm my-auto align-baseline">
            <T
              keyName="introduction-text-{text.name}"
              defaultValue={text.defaultValue}
            />
          </p>
        {/each}
      </div>

      <div
        class="row-start-4 col-start-1 pt-4 border-t-2 border-teal-600 row-span-4"
      >
        <h2 class="mt-0 !pt-0">
          {$t({ key: "work-experience", defaultValue: "Work Experience" })}
        </h2>
        <div class="flex flex-row flex-wrap">
          {#each filteredCvItems as item}
            {#if item.category === "job"}
              <h3 class="w-4/6 dark:text-teal-300">
                <T keyName={item.name} defaultValue={item.name} />
              </h3>
              <h3
                class="w-2/6 mt-1.5 font-medium text-sm text-right dark:text-teal-300"
              >
                {item.fromMonth}/{item.fromYear} - {item.toMonth}/{item.toYear}
              </h3>
              <p class="w-4/6 font-light -mt-0.5 text-teal-700 font-sans">
                &#8212;
                <T keyName="role-{item.name}" defaultValue={item.role} />
              </p>
              <p class="w-2/6 text-sm text-teal-700 font-sans text-right">
                <T
                  keyName="location-{item.name}"
                  defaultValue={item.location}
                />
              </p>
              <p class="w-full text-[0.8em] pb-1.5">
                <T
                  keyName="short-{item.name}"
                  defaultValue={item.shortdescription}
                />
              </p>
            {/if}
          {/each}
        </div>
      </div>
      <div
        class="row-start-[8] row-span-3 col-start-1 border-t-2 border-teal-600 pt-4"
      >
        <h2 class="!pt-0">
          {$t({ key: "my-education", defaultValue: "Education" })}
        </h2>
        <div class="flex flex-row flex-wrap">
          {#each filteredCvItems as item}
            {#if item.category === "education"}
              <h3 class="w-4/6 dark:text-teal-300">
                <T keyName={item.name} defaultValue={item.name} />
              </h3>
              <h3
                class="w-2/6 text-sm mt-1.5 font-medium text-right dark:text-teal-300"
              >
                {item.fromMonth}/{item.fromYear} - {item.toMonth}/{item.toYear}
              </h3>
              <p class="w-4/6 font-light -mt-0.5 text-teal-700 font-sans">
                &#8212;
                <T keyName="role-{item.name}" defaultValue={item.role} />
              </p>
              <p class="w-2/6 text-sm text-teal-700 font-sans text-right">
                <T
                  keyName="location-{item.name}"
                  defaultValue={item.location}
                />
              </p>
              <p class="w-full text-[0.8em] pb-1.5">
                <T
                  keyName="short-{item.name}"
                  defaultValue={item.shortdescription}
                />
              </p>
            {/if}
          {/each}
        </div>
      </div>
      <div
        class="col-start-2 col-span-1 row-span-4 h-[25.7cm] border-teal-500 border-l-2 border-r-2"
      />
      <div
        class="row-start-4 col-start-3 row-span-1 pt-4 border-t-2 border-teal-600"
      >
        <h2 class="!pt-0">
          <T keyName="personal-data" defaultValue="Personal Data" />
        </h2>
        <div
          class="grid gap-x-2 gap-y-0 grid-co ls-[minmax(0,40%)_minmax(0,_1fr)] grid-rows-[1fr_rep eat(4,_1.5rem)] justify -center align-baseline w-full h-auto"
        >
          <h3 class="align-baseline text-base dark:text-teal-300">
            <T keyName="direction" defaultValue="Direction" />
          </h3>
          <p class="text-left text-xs mt-0.5 mb-1.5 align-baseline">
            Calle Azucena 10, Piso 20<br />46025 Valencia, Valencia
          </p>
          <h3 class="align-baseline text-base dark:text-teal-300">
            <T keyName="telephone" defaultValue="Telephone" />
          </h3>
          <p class="text-left text-xs mt-0.5 mb-1.5 align-baseline h-auto">
            +49 176 644 673 44
          </p>
          <h3 class="align-baseline text-base dark:text-teal-300">E-Mail</h3>
          <p class="text-left text-xs mt-0.5 mb-1.5 align-baseline h-auto">
            sebajans@icloud.com
          </p>
          <h3 class="align-baseline text-base dark:text-teal-300">
            <T keyName="nationality" defaultValue="Nationality" />
          </h3>
          <p class="text-left text-xs mt-0.5 mb-1.5 align-baseline h-auto">
            <T keyName="nationality-data" defaultValue="German, Argentinean" />
          </p>
          <h3 class="align-baseline text-base dark:text-teal-300">
            <T keyName="date-of-birth" defaultValue="Date/Place of Birth" />
          </h3>
          <p class="text-left text-xs mt-0.5 mb-1.5 align-baseline h-auto">
            14.12.1996, Kirchheim (Teck)
          </p>
        </div>
      </div>
      <div
        class="row-start-1 col-span-1 col-start-3 row-span-3 flex flex-col justify-start"
      >
        <h1
          class="font-sans pb-4 font-normal uppercase text-[2.5rem] text-left leading-8"
        >
          <T keyName="CV" defaultValue="CV" />
        </h1>
        <img
          class="rounded-full outline outline-2 outline-teal-500 mx-auto my-auto w-40 aspect-square object-cover object-top"
          alt="profile-pic"
          src="/img/profile-pic.webp"
        />
      </div>
      <div
        class="row-start-[8] col-start-3 col-span-1 row-span-6 pt-4 border-t-2 border-teal-600"
      >
        <h2 class="!pt-0">
          {$t({ key: "skills-title", defaultValue: "Skills" })}
        </h2>
        {#each Object.entries(filteredSkillItems) as [categoryName, skills], i}
          {#if skills.categoryArray.length > 0 && categoryName !== "Language Skills"}
            <div class="flex flex-row flex-wrap">
              <h3 class="pt-2">
                <T keyName={categoryName} defaultValue={categoryName} />
              </h3>
              {#each skills.categoryArray as skill}
                <p class="text-sm w-full leading-loose">
                  <T keyName={skill.name} defaultValue={skill.name} />
                </p>
              {/each}
            </div>
          {/if}
        {/each}
      </div>
    </div> -->
  </div>
  <!-- <div
    id="page-2"
    class="!h-[29.7cm] p-[2cm] outline-1 outline outline-offset-1 !w-[21cm] flex justify-center bg-teal-50 dark:bg-teal-900"
  >
    <div
      class=" max-h-[25.7cm] grid grid-cols-[10.5cm_0.2cm_5.5cm] gap-x-[0.4cm] gap-y-[0.5cm]"
    >
      <div class="col-span-1 row-start-1 row-span-1 flex flex-col">
        <h2 class="!pt-0">
          {$t({ key: "experience-abroad", defaultValue: "experience abroad" })}
        </h2>
        <div class="flex flex-row flex-wrap">
          <h3 class="w-4/6 dark:text-teal-300">
            <T
              keyName="south-america"
              defaultValue="Round trip through South America"
            />
          </h3>
          <h3
            class="w-2/6 text-sm text-right font-medium mt-1.5 dark:text-teal-300"
          >
            11/2015 - 06/2016
          </h3>
          <p class="w-full text-[0.8em] pb-2">
            <T
              keyName="south-america-description"
              defaultValue="Insight into new cultures, consolidation of Spanish skills"
            />
          </p>
          <h3 class="w-4/6 dark:text-teal-300">
            <T
              keyName="great-britain"
              defaultValue="Language trips in Great Britain"
            />
          </h3>
          <h3
            class="w-2/6 text-sm text-right font-medium mt-1.5 dark:text-teal-300"
          >
            08/2013 & 08/2014
          </h3>
          <p class="w-full text-[0.8em]">
            <T
              keyName="great-britain-description"
              defaultValue="Living with a host family in Rochester with English classes"
            />
          </p>
        </div>
        <h2 class="!pt-0 mt-8">
          {$t({ key: "my-certificate", defaultValue: "Certificates" })}
        </h2>
        <div class="flex flex-row flex-wrap">
          {#each filteredCvItems as item}
            {#if item.category === "certificate"}
              <h3 class="w-4/6 dark:text-teal-300">
                <T
                  keyName="achievement-title-{item.name}"
                  defaultValue={item.name}
                />
              </h3>
              <h3
                class="w-2/6 text-sm mt-1.5 font-medium text-right dark:text-teal-300"
              >
                {item.fromYear}
              </h3>

              <p class="w-full text-[0.8em] pb-1.5">
                <T
                  keyName="achievement-text-{item.name}"
                  defaultValue={item.shortdescription}
                />
              </p>
            {/if}
          {/each}
        </div>
      </div>
      <div
        class="col-start-2 col-span-1 row-start-1 row-span-full h-[25.7cm] border-teal-500 border-l-2 border-r-2"
      />
      <div class="row-start-1 col-start-3 col-span-1">
        <h2 class="!pt-0">
          {$t({
            key: "language-skills-title",
            defaultValue: "Language Skills",
          })}
        </h2>
        {#each Object.entries(filteredSkillItems) as [categoryName, skills], i}
          {#if skills.categoryArray.length > 0 && categoryName === "Language Skills"}
            <div class="flex flex-row flex-wrap">
              {#each skills.categoryArray as skill}
                <p class="text-sm w-full leading-loose">
                  <T keyName={skill.name} defaultValue={skill.name} />
                </p>
              {/each}
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </div> -->
</page>

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
