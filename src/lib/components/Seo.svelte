<script lang="ts">
	import { useLanguage } from '$lib/language.svelte';
	import type { Localized } from '$lib/types';

	let { title, description, path }: { title: Localized; description: Localized; path: string } =
		$props();
	const language = useLanguage();
	const pageTitle = $derived(`${title[language.locale]} | We've Got Now`);
	const canonical = $derived(`https://wevegotnow.com${path === '/' ? '/' : path}`);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={description[language.locale]} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="We've Got Now" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={description[language.locale]} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content="https://wevegotnow.com/assets/derived/wgn-hero-1536.webp" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
