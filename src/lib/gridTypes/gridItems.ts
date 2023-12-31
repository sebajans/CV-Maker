import { writable, type Writable } from "svelte/store";

export interface DataItem {
  institution?: string;
  description?: string;
  position?: string;
  date?: string;
  location?: string;
}

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
    data?: DataItem[];
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
    w: 7,
    h: 3,
    type: "textWithHeader",
    content: {
      h2: "Introduction",
      h3: "",
      text: ["Results-driven professional seeking a challenging role in [industry/field]. Proven track record in [key skills/experience] with a focus on [specific achievements]. Ready to contribute strategic and innovative solutions to drive organizational success."],
    },
  },
  {
    id: crypto.randomUUID(),
    x: 7,
    y: 4,
    w: 3,
    h: 6,
    type: "listWithHeaderAndSubHeader",
    content: {
      h2: "Skills",
      h3: "",
      list: ["Skill 1", "Skill 2", "Skill 3"],
    },
  },
  {
    id: crypto.randomUUID(),
    x: 7,
    y: 0,
    w: 3,
    h: 4,
    type: "image",
    content: {
      imgUrl: "profile-pic.webp",
    },
  },
  {
    id: crypto.randomUUID(),
    x: 0,
    y: 8,
    w: 7,
    h: 4,
    type: "dataWithHeaderAndSubHeader",
    content: {
      h2: "Education",
      h3: "Degree in Materials Science",
      data: [
        {
          institution: "University of California",
          location: "Berkeley, CA",
          position: "B.S. Materials Science and Engineering",
          date: "2016 - 2020",
          description: "Test",
        },
      ],
    },
  },
  {
    id: crypto.randomUUID(),
    x: 0,
    y: 4,
    w: 7,
    h: 4,
    type: "dataWithHeaderAndSubHeader",
    content: {
      h2: "Work Experience",
      h3: "Front-end Developer",
      data: [
        {
          institution: "University of California",
          location: "Berkeley, CA",
          position: "B.S. Materials Science and Engineering",
          date: "2016 - 2020",
          description: "Test",
        },
      ],
    },
  },
  {
    id: crypto.randomUUID(),
    x: 0,
    y: 12,
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