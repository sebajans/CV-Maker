import type GridController from "svelte-grid-extended";
import { itemsStore, type ItemType } from "$lib/gridTypes/gridItems";


let gridController: GridController;

export function addNewItem(selectedType: string) {
  const w = 3;
  const h = 5;
  const newPosition = gridController.getFirstAvailablePosition(w, h);
  const newItemId = crypto.randomUUID();

  let newItem: ItemType;
  newItem = {
    id: newItemId,
    x: newPosition ? newPosition.x : 0,
    y: newPosition ? newPosition.y : 0,
    w,
    h,
    type: selectedType,
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
              institution: "Institution",
            },
          ]
          : undefined,
    },
  };

  itemsStore.update((currentItems) => [...currentItems, newItem]);
  $: console.log(itemsStore);
}