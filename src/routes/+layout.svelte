<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import '../app.css';
	import ChatWidget from '$lib/components/ChatWidget.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { createLanguageContext } from '$lib/language.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: import('svelte').Snippet; data: LayoutData } = $props();
	const language = createLanguageContext();
	let hydrated = $state(false);

	onMount(() => {
		const stored = window.localStorage.getItem('wgn-language');
		if (stored === 'en' || stored === 'es') language.set(stored);
		hydrated = true;
	});

	$effect(() => {
		if (browser && hydrated) {
			document.documentElement.lang = language.locale;
			window.localStorage.setItem('wgn-language', language.locale);
		}
	});
</script>

<svelte:head>
	<meta name="robots" content="noindex,nofollow,noarchive" />
</svelte:head>

<a class="skip-link" href="#main-content"
	>{language.locale === 'en' ? 'Skip to content' : 'Saltar al contenido'}</a
>
{#if data.environment !== 'production'}
	<div class="stage-banner" role="status">
		<span>{language.locale === 'en' ? 'STAGING' : 'PRUEBAS'}</span>
		<span>
			{language.locale === 'en' ? 'Forms' : 'Formularios'}:
			{data.formsMode === 'fixture'
				? language.locale === 'en'
					? 'fixture receipts only'
					: 'solo comprobantes de prueba'
				: language.locale === 'en'
					? 'configured QA adapter'
					: 'adaptador QA configurado'} ·
			{language.locale === 'en' ? 'Chat' : 'Chat'}:
			{data.chatMode === 'fixture'
				? language.locale === 'en'
					? 'public-content fixture'
					: 'prueba con contenido público'
				: language.locale === 'en'
					? 'configured provider'
					: 'proveedor configurado'}
		</span>
	</div>
{/if}
<Header />
<main id="main-content" tabindex="-1">
	{@render children()}
</main>
<Footer />
<ChatWidget mode={data.chatMode} />
