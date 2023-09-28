<script lang="ts">
	import NavButton from './NavButton.svelte';
	import { navItems } from '$lib/lists/navItems';
	import { onMount } from 'svelte';
	import MenuToggle from './MenuToggle.svelte';
	import BackdropBlur from './BackdropBlur.svelte';
	import SocialMenu from '$components/SocialMenu.svelte';
	import Logo from './Logo.svelte';
	import { getTolgee } from '@tolgee/svelte';
	import { draw } from 'svelte/transition';

	const languageStore = getTolgee(['language']);

	export let showMenu = false;
	$: onMount(() => (showMenu = false));

	function toggleMenu() {
		showMenu = !showMenu;
	}
	function hideMenuMobile() {
		showMenu = false;
	}
	$: console.log("showMenu", showMenu)
	$: languageStore;

	export let offset = 100;
	export let tolerance = 3;
	$: showMenu;
	let headerClass: boolean = false;
	let y = 0;
	let lastY = 0;

	function updateClass(y: number) {
		const dy = lastY - y;
		lastY = y;
		return deriveClass(y, dy);
	}
	function deriveClass(y: number, dy: number) {
		// show if at top of page
		if (y < offset) {
			return (headerClass = true);
		}
		// don't change state unless scroll is above threshold
		if (Math.abs(dy) <= tolerance) {
			headerClass != headerClass;
			return headerClass;
		}
		if (dy < 0) {
			headerClass = false;
			return headerClass;
		}
		return (headerClass = true);
	}

	$: headerClass = updateClass(y);
</script>

<svelte:window bind:scrollY={y} />

<header
	class="{showMenu
		? 'h-[100dvh]'
		: 'h-0 md:h-screen md:h-screen-ios'} md:backdrop-blur-2xl border-r border-primary-900/[0.02] dark:border-primary-50/[0.02] bg-gradient-to-bl from-primary-900/[0.02] to-primary-900/[0.06] dark:from-primary-50/[0.02] dark:to-primary-50/[0.06]   transition-transform md:w-40 z-30 fixed inset-y-0 flex justify-between flex-col w-full"
>
	<BackdropBlur {showMenu} />
	<!-- LOGO -->
	<a
		aria-label="Back to Home"
		href="/"
		class="{headerClass || showMenu ? '' : 'opacity-0 md:opacity-100 backdrop-blur-none'}
		{showMenu
			? 'mt-8 md:mt-4 scale-125 md:scale-100 mr-[0%]'
			: 'translate-x-1/2 mr-[100%]'} ease-out group hover:scale-105 md:w-20 w-20 md:h-20 h-20 rounded-br-md md:mt-10 md:mx-8 self-center relative transition-all duration-200 md:translate-x-0 z-50 group"
	>
		<Logo className={'p-3 md:p-1.5'} />
	</a>
	<!-- actual nav -->

	<nav
		class="{showMenu
			? ' '
			: 'opacity-0 md:opacity-100 md:translate-y-0 md:pointer-events-auto pointer-events-none translate-y-[100%]'} max-w-sm self-center h-auto md:overflow-visible md:translate-y-0 md:pb-4 pb-16 duration-300 transition-transform md:rounded-tr-xl  w-screen md:w-40 overflow-hidden space-y-3 relative z-30 p-3"
	>
		<SocialMenu />
		<ul aria-label="Navigation Bar" class="flex font-sans flex-col gap-4 flex-grow self-center">
			{#each navItems as { link, text }}
				<NavButton on:click={hideMenuMobile} {link} {text} />
			{/each}
		</ul>
	</nav>
	<MenuToggle on:click={toggleMenu} {showMenu} />
</header>
