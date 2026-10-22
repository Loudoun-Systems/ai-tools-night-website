<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import '../app.css';
	import Atmosphere from '$lib/components/Atmosphere.svelte';
	import ChatWidget from '$lib/components/ChatWidget.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { createLanguageContext } from '$lib/language.svelte';
	import type { LayoutData } from './$types';
	let { children, data }: { children: import('svelte').Snippet; data: LayoutData } = $props();
	const language = createLanguageContext();
	let hydrated = $state(false);
	onMount(() => {
		try {
			const stored = localStorage.getItem('wgn-language');
			if (stored === 'en' || stored === 'es') language.set(stored);
		} catch {
			/* Browsing still works when storage is denied. */
		}
		hydrated = true;
		const visibility = () =>
			document.documentElement.toggleAttribute('data-motion-paused', document.hidden);
		visibility();
		document.addEventListener('visibilitychange', visibility);
		return () => {
			document.removeEventListener('visibilitychange', visibility);
			document.documentElement.removeAttribute('data-motion-paused');
		};
	});
	$effect(() => {
		if (browser && hydrated) {
			document.documentElement.lang = language.locale;
			try {
				localStorage.setItem('wgn-language', language.locale);
			} catch {
				/* Optional preference only. */
			}
		}
	});
</script>

<svelte:head>
	<link
		rel="preload"
		href="/fonts/manrope-latin-variable.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	{#if data.environment !== 'production'}<meta
			name="robots"
			content="noindex,nofollow,noarchive"
		/>{/if}
</svelte:head>
<a class="skip-link" href="#main-content"
	>{language.locale === 'en' ? 'Skip to content' : 'Saltar al contenido'}</a
>
{#if data.environment !== 'production'}<div class="stage-banner">
		{data.formsMode === 'fixture'
			? language.locale === 'en'
				? 'LOCAL QA · Fixture receipts only. No external submissions.'
				: 'QA LOCAL · Solo comprobantes de prueba. Sin envíos externos.'
			: language.locale === 'en'
				? 'DESIGN PREVIEW · Forms and automated chat are temporarily unavailable.'
				: 'VISTA PREVIA DEL DISEÑO · Formularios y chat automático temporalmente no disponibles.'}
	</div>{/if}
<Atmosphere />
<Header />
<main id="main-content" tabindex="-1">{@render children()}</main>
<Footer />
{#if data.chatMode !== 'disabled'}<ChatWidget mode={data.chatMode} />{/if}
