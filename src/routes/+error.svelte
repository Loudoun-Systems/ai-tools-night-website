<script lang="ts">
	import { page } from '$app/state';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
</script>

<svelte:head><title>{page.status} | We've Got Now</title></svelte:head>
<section class="page-intro shell">
	<p class="eyebrow">{page.status}</p>
	<h1>
		{language.locale === 'en' ? 'That path is not available.' : 'Esa ruta no está disponible.'}
	</h1>
	<p class="lede">
		{language.locale === 'en'
			? 'Use the navigation or return to the home page.'
			: 'Usa la navegación o vuelve a la página de inicio.'}
	</p>
	<a class="button primary" href="/"
		>{language.locale === 'en' ? 'Back home' : 'Volver al inicio'}</a
	>
</section>
