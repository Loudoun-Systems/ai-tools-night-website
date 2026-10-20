<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { MEETUP_URL } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
	let exploreOpen = $state(false),
		menuOpen = $state(false);
	let header: HTMLElement,
		exploreButton: HTMLButtonElement,
		mobileButton: HTMLButtonElement,
		drawer: HTMLDialogElement;
	let explorePanel = $state<HTMLDivElement>();
	const links = [
		{
			href: '/prompt-library',
			en: 'Prompt library',
			es: 'Biblioteca de prompts',
			noteEn: 'A useful place to start',
			noteEs: 'Un buen punto de partida'
		},
		{
			href: '/careers',
			en: 'Careers & contributions',
			es: 'Carreras y colaboración',
			noteEn: 'Find your way into building',
			noteEs: 'Encuentra tu forma de crear'
		},
		{
			href: '/projects',
			en: 'Community projects',
			es: 'Proyectos de la comunidad',
			noteEn: 'Ideas put into practice',
			noteEs: 'Ideas llevadas a la práctica'
		}
	];
	async function openExplore() {
		exploreOpen = !exploreOpen;
		if (exploreOpen) {
			await tick();
			explorePanel?.querySelector('a')?.focus();
		}
	}
	function closeDrawer() {
		drawer?.close();
		menuOpen = false;
		mobileButton?.focus();
	}
	async function openDrawer() {
		menuOpen = true;
		await tick();
		drawer.showModal();
	}
	function closeExplore(restore = false) {
		exploreOpen = false;
		if (restore) exploreButton?.focus();
	}
	afterNavigate(() => {
		exploreOpen = false;
		if (menuOpen) closeDrawer();
	});
	onMount(() => {
		const outside = (event: PointerEvent) => {
			if (!header?.contains(event.target as Node)) closeExplore();
		};
		document.addEventListener('pointerdown', outside);
		return () => document.removeEventListener('pointerdown', outside);
	});
	$effect(() => {
		if (menuOpen) {
			const previous = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = previous;
			};
		}
	});
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape' && exploreOpen) {
			event.preventDefault();
			closeExplore(true);
		}
	}}
/>
<header bind:this={header} class="site-header">
	<div class="shell header-inner">
		<a
			class="brand"
			href="/"
			aria-label={language.locale === 'en' ? "We've Got Now home" : "We've Got Now — inicio"}
		>
			<img src="/assets/derived/wgn-logo-420.webp" alt="" width="420" height="420" />
			<span><strong>WE'VE GOT NOW</strong><small>AI Tools Explorers Night</small></span>
		</a>
		<nav class="desktop-nav" aria-label={language.locale === 'en' ? 'Primary' : 'Principal'}>
			<a href="/workshops" aria-current={page.url.pathname === '/workshops' ? 'page' : undefined}
				>{language.locale === 'en' ? 'Workshops' : 'Talleres'}</a
			>
			<a href="/events" aria-current={page.url.pathname.startsWith('/events') ? 'page' : undefined}
				>{language.locale === 'en' ? 'Events' : 'Eventos'}</a
			>
			<div class="explore-wrap">
				<button
					bind:this={exploreButton}
					class="nav-disclosure"
					type="button"
					aria-expanded={exploreOpen}
					aria-controls="explore-navigation"
					onclick={openExplore}
					onkeydown={(e) => {
						if (e.key === 'ArrowDown' && !exploreOpen) {
							e.preventDefault();
							openExplore();
						}
					}}
					>{language.locale === 'en' ? 'Explore' : 'Explorar'}
					<span aria-hidden="true" class:turned={exploreOpen}>⌄</span></button
				>
				{#if exploreOpen}<div
						bind:this={explorePanel}
						id="explore-navigation"
						class="explore-panel"
					>
						{#each links as link}<a href={link.href} onclick={() => closeExplore()}
								><strong>{language.locale === 'en' ? link.en : link.es}</strong><small
									>{language.locale === 'en' ? link.noteEn : link.noteEs}</small
								><span aria-hidden="true">↗</span></a
							>{/each}
					</div>{/if}
			</div>
			<a href="/about" aria-current={page.url.pathname === '/about' ? 'page' : undefined}
				>{language.locale === 'en' ? 'Our community' : 'La comunidad'}</a
			>
		</nav>
		<div class="header-actions">
			<button
				class="language-toggle"
				type="button"
				onclick={() => language.toggle()}
				aria-label={language.locale === 'en' ? 'Cambiar a español' : 'Switch to English'}
				><span class:active={language.locale === 'en'}>EN</span><span aria-hidden="true">
					/
				</span><span class:active={language.locale === 'es'}>ES</span></button
			>
			<a class="button primary header-cta" href={MEETUP_URL} target="_blank" rel="noreferrer"
				>{language.locale === 'en' ? 'Find your people' : 'Encuentra tu comunidad'}<span
					aria-hidden="true">↗</span
				></a
			>
			<button
				bind:this={mobileButton}
				class="menu-button"
				type="button"
				aria-expanded={menuOpen}
				aria-controls="mobile-navigation"
				onclick={openDrawer}
				><span class="sr-only"
					>{language.locale === 'en' ? 'Toggle navigation' : 'Abrir navegación'}</span
				><span aria-hidden="true"></span><span aria-hidden="true"></span></button
			>
		</div>
	</div>
</header>
<dialog
	bind:this={drawer}
	id="mobile-navigation"
	class="mobile-drawer"
	aria-label={language.locale === 'en' ? 'Site navigation' : 'Navegación del sitio'}
	onclose={() => {
		menuOpen = false;
	}}
>
	<div class="drawer-top">
		<span class="eyebrow">WE'VE GOT NOW</span><button
			type="button"
			class="close-button"
			onclick={closeDrawer}
			aria-label={language.locale === 'en' ? 'Close navigation' : 'Cerrar navegación'}>×</button
		>
	</div>
	<nav aria-label={language.locale === 'en' ? 'Mobile navigation' : 'Navegación móvil'}>
		<a href="/" onclick={closeDrawer}>{language.locale === 'en' ? 'Home' : 'Inicio'}</a>
		<a href="/workshops" onclick={closeDrawer}
			>{language.locale === 'en' ? 'Workshops' : 'Talleres'}</a
		>
		<a href="/events" onclick={closeDrawer}>{language.locale === 'en' ? 'Events' : 'Eventos'}</a>
		{#each links as link}<a href={link.href} onclick={closeDrawer}
				>{language.locale === 'en' ? link.en : link.es}</a
			>{/each}
		<a href="/about" onclick={closeDrawer}
			>{language.locale === 'en' ? 'Our community' : 'La comunidad'}</a
		>
	</nav>
	<p class="muted">
		{language.locale === 'en'
			? 'Learn. Build. Share. Connect.'
			: 'Aprende. Crea. Comparte. Conecta.'}
	</p>
	<a class="button primary" href={MEETUP_URL} target="_blank" rel="noreferrer"
		>{language.locale === 'en' ? 'Find WGN on Meetup' : 'Encuentra WGN en Meetup'}
		<span aria-hidden="true">↗</span></a
	>
</dialog>
