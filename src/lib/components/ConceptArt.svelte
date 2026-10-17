<script lang="ts">
	import { onMount } from 'svelte';
	import { text } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	import type { Localized } from '$lib/types';

	let { base, alt, eager = false }: { base: string; alt: Localized; eager?: boolean } = $props();
	const language = useLanguage();
	let failed = $state(false);
	let imageElement = $state<HTMLImageElement>();

	onMount(() => {
		const node = imageElement;
		if (!node) return;
		const markFailed = () => (failed = true);
		node.addEventListener('error', markFailed);

		// An eager/cached image can finish before the client action is attached.
		if (node.complete && node.naturalWidth === 0) markFailed();

		return () => node.removeEventListener('error', markFailed);
	});
</script>

<figure class="concept-art">
	{#if failed}
		<div class="image-fallback" role="img" aria-label={text(alt, language.locale)}>
			<span
				>{language.locale === 'en'
					? 'Concept artwork unavailable'
					: 'Imagen conceptual no disponible'}</span
			>
		</div>
	{:else}
		<picture>
			<source
				media="(max-width: 720px)"
				srcset={`/assets/derived/${base}-768.webp`}
				type="image/webp"
			/>
			<source srcset={`/assets/derived/${base}-1280.webp`} type="image/webp" />
			<img
				bind:this={imageElement}
				src={`/assets/originals/${base}.png`}
				alt={text(alt, language.locale)}
				width="1672"
				height="941"
				loading={eager ? 'eager' : 'lazy'}
				fetchpriority={eager ? 'high' : 'auto'}
			/>
		</picture>
	{/if}
	<figcaption>
		{language.locale === 'en'
			? 'AI-generated concept artwork — not a photograph of an actual WGN event, employee or venue.'
			: 'Arte conceptual generado con IA — no es una foto de un evento, empleado o lugar real de WGN.'}
	</figcaption>
</figure>
