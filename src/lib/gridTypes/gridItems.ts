import { writable, type Writable } from "svelte/store";

export interface ItemType {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: string;
  content: {
    h2?: string;
    h3?: string;
    table?: {
      rowsAmount?: number;
      colsAmount?: number;
      rowContent?: string[];
      content?: string[];
    };
    imgUrl?: string;
    text?: string[];
    list?: string[];
  };
  isEditing?: boolean; // Add isEditing property
}

export const itemsStore: Writable<ItemType[]> = writable([
  {
    id: crypto.randomUUID(),
    x: 0,
    y: 0,
    w: 6,
    h: 3,
    type: "textWithHeader",
    content: {
      h2: "Introduction",
      h3: "",
      text: ["Test"],
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
    },
  },
  {
    id: crypto.randomUUID(),
    x: 0,
    y: 11,
    w: 6,
    h: 4,
    type: "listWithHeaderAndSubHeader",
    content: {
      h2: "Certificates",
      h3: "Web Development Certificate",
      list: ["Test", "test 2"],
    },
  },
  // Add more default items as needed
]);