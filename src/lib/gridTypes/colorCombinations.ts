export interface ColorCombinationType {
  id: number;
  mainColor: string;
  secondaryColor: string;
}

export let colorCombinations: ColorCombinationType[] = [

  {
    id: 0,
    mainColor: "#000000",
    secondaryColor: "#ffffff",
  },
  {
    id: 1,
    mainColor: "#b53525",
    secondaryColor: "#d8c9e0",
  },
  {
    id: 3,
    mainColor: "#490dd6",
    secondaryColor: "#eae4c9",
  },
  {
    id: 4,
    mainColor: "#3b32d5",
    secondaryColor: "#d0dac8",
  },
  {
    id: 5,
    mainColor: "#3b2848",
    secondaryColor: "#e0eedb",
  },
  {
    id: 6,
    mainColor: "#2d8d8d",
    secondaryColor: "#dbdac6",
  },
];

export function addColorCombination(combination: ColorCombinationType): void {
  colorCombinations = [...colorCombinations, combination];
}