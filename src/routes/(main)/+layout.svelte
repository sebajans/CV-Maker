<script lang="ts">
  // import NavBar from '$components/NavBar.svelte';

  import Footer from "$components/Footer.svelte";

  let showMenu = false;
</script>

<!-- <NavBar {showMenu} /> -->
<main
  style="display:grid"
  class="min-h-[100vh] w-screen pt-24 md:pt-28 relative mx-auto bg-stone-300 dark:bg-stone-900 transition-colors duration-300"
>
  <h1
    class="z-[3] transition-all py-0 md:py-3 md:top-12 top-5 absolute md:left-44 left-24 duration-300 pl-0 text-3xl md:text-4xl text-left font-sans font-bold"
  >
    Welcome Test
  </h1>
  <div class="my-auto md:ml-44">
    <slot />
  </div>
  <Footer />
</main>
