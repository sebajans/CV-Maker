

export function submit() {
  if (value !== original) {
    dispatch("submit", { value });
  }

  editing = false;
}