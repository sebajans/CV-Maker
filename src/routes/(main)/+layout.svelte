<script lang="ts">
  // import NavBar from '$components/NavBar.svelte';

  import { page } from "$app/stores";

  let title = $page.url.pathname.split("/").pop();

  import Footer from "$components/Footer.svelte";

  let showMenu = false;
</script>

<!-- <NavBar {showMenu} /> -->
<main
  style="display:grid"
  class="min-h-[100vh] relative mx-auto bg-white dark:bg-black transition-colors duration-300"
>
  <h1
    class="z-[3] transition-all py-0 md:py-3 md:top-12 top-5 absolute md:left-44 left-24 duration-300 pl-0 text-3xl md:text-4xl text-left font-sans font-bold"
  >
    {title}
  </h1>
  <!-- <div class="w-full bg- black"> -->
  <!-- <div class="my-auto md:ml-44"> -->
  <slot />
  <!-- </div> -->
  <!-- </div> -->
  <Footer />
</main>
