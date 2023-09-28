<script>
  import InPlaceEdit from "./InPlaceEdit.svelte";

  let items = [
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ];

  function addItem() {
    const newItem = { id: items.length + 1, text: "" };
    items = [...items, newItem];
  }
</script>

<button on:click={addItem}>Add Item</button>
