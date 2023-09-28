import { browser } from "$app/environment";
import { writable } from "svelte/store";

export interface SettingsState {
  darkMode: boolean;
  reducedMotion: boolean,
}

export const initialSettingsState: SettingsState = {
  darkMode: userPrefersDark(),
  reducedMotion: false,
}

let stored = initialSettingsState;
if (browser) {
  if (localStorage["settingState"]) stored = JSON.parse(localStorage["settingState"]);
}

export const settingsState = writable(stored);

if (browser) settingsState.subscribe(state => {
  localStorage.settingState = JSON.stringify(state)
});

export function toggleDarkMode() {
  settingsState.update((settings) => {
    const newSettings = {
      ...settings,
      darkMode: !settings.darkMode,
    };

    return newSettings;
  });
}


// Function to determine user's preferred color scheme
function userPrefersDark() {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
}