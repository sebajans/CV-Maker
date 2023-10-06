interface GridItemType {
  type: string;
  title: string;
}

export const typesOfGridItems: GridItemType[] = [
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