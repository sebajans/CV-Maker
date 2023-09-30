<script lang="ts">
  export let showMenu: boolean = false;
</script>

<button
  on:click
  aria-label="Open Navigation Menu"
  class="{showMenu
    ? ''
    : ''} md:hidden bg-white dark:bg-gray-800 z-30 fixed left-2 bottom-2 group p-2 h-12 w-12 space-y-2 outline-1 -outline-offset-2 outline-black dark:outline-white outline"
>
  <span
    class="{showMenu
      ? 'translate-y-[9px] rotate-45 group-hover:rotate-0'
      : 'group-hover:-rotate-180'}
			block h-px w-8 bg-teal-950 dark:bg-teal-50 delay-100 duration-200 group-hover:translate-y-[9px] group-hover:-translate-x-0 group-hover:w-8"
  />
  <span
    class="{showMenu
      ? 'w-0 translate-x-5'
      : 'group-hover:w-0 w-8 group-hover:translate-x-5 '} 
			visible block h-px bg-teal-950 dark:bg-teal-50 delay-100 duration-200"
  />
  <span
    class="{showMenu
      ? '-translate-y-[9px] -rotate-45 group-hover:-rotate-90'
      : 'group-hover:-rotate-90'} 
			block h-px w-8 bg-teal-950 dark:bg-teal-50 delay-100 duration-200 group-hover:-translate-y-[9px] group-hover:-translate-x-0 group-hover:w-8"
  />
</button>
