<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  export let value: string,
    required: boolean = true;

  const dispatch = createEventDispatcher();
  let editing: boolean = false,
    original: string;

  onMount(() => {
    original = value;
  });

  function edit() {
    editing = true;
  }

  function submit() {
    if (value !== original) {
      dispatch("submit", { value });
    }

    editing = false;
  }

  function keydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      value = original;
      editing = false;
    }
  }

  function focus(element: HTMLInputElement) {
    element.focus();
  }
</script>

{#if editing}
  <form
    class="text-inherit w-full"
    on:submit|preventDefault={submit}
    on:keydown={keydown}
  >
    <input
      class="text-inherit p- 1 w-full focus:rou nded-md focus:outline-none focus:bg-t eal-900"
      bind:value
      on:blur={submit}
      {required}
      use:focus
    />
  </form>
{:else}
  <span class="hover:cursor-text text-inherit w-full p -1" on:click={edit}>
    {value}
  </span>
{/if}

<style>
  input {
    border: none;
    background: none;
    font-size: inherit;
    font-variant: inherit;
    text-transform: inherit;
    color: inherit;
    font-weight: inherit;
    text-align: inherit;
    box-shadow: none;
  }
  input:focus:after {
    content: "";
    position: absolute;
    left: -2px;
    right: -2px;
    bottom: -2px;
    top: -2px;
    border-radius: inherit;
    background: #000;
  }
</style>
