<script lang="ts">
	import { page } from '$app/state';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
</script>

<svelte:head><title>{page.status} | We've Got Now</title></svelte:head>
<section class="error-opening dark">
	<div class="shell">
		<p class="eyebrow">
			{page.status} / {language.locale === 'en' ? 'A DIFFERENT DIRECTION' : 'OTRA DIRECCIÓN'}
		</p>
		<h1>
			{language.locale === 'en' ? 'That path is not available.' : 'Esa ruta no está disponible.'}
		</h1>
		<p class="lede">
			{language.locale === 'en'
				? 'There are still good places to start. Return home, explore the workshops, or find a useful prompt.'
				: 'Todavía hay buenos puntos de partida. Vuelve al inicio, explora los talleres o encuentra un prompt útil.'}
		</p>
		<div class="button-row">
			<a class="button primary" href="/"
				>{language.locale === 'en' ? 'Back home' : 'Volver al inicio'} ↗</a
			><a class="button secondary" href="/prompt-library"
				>{language.locale === 'en' ? 'Explore the prompt library' : 'Explora los prompts'} ↗</a
			>
		</div>
	</div>
</section>
