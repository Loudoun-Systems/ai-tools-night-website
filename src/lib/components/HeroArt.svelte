<script lang="ts">
	import { onMount } from 'svelte';
	import { useLanguage } from '$lib/language.svelte';
	import { ambient } from '$lib/motion';
	const language = useLanguage();
	let failed = $state(false);
	let imageElement = $state<HTMLImageElement>();
	onMount(() => {
		const node = imageElement;
		if (!node) return;
		const fail = () => {
			failed = true;
		};
		node.addEventListener('error', fail);
		// Catch an eager/cached image failure without Svelte's CSP-unsafe image action capture attributes.
		if (node.complete && node.naturalWidth === 0) fail();
		return () => node.removeEventListener('error', fail);
	});
</script>

<figure class="hero-art" use:ambient>
	<div class="hero-orbit orbit-one" aria-hidden="true"></div>
	<div class="hero-orbit orbit-two" aria-hidden="true"></div>
	<div class="hero-art-frame">
		{#if failed}<div
				class="hero-art-fallback"
				role="img"
				aria-label={language.locale === 'en'
					? 'WGN skyline illustration unavailable'
					: 'Ilustración de WGN no disponible'}
			>
				WE’VE GOT NOW
			</div>{:else}<picture
				><source srcset="/assets/derived/wgn-hero-1536.webp" type="image/webp" /><img
					src="/assets/originals/wgn-hero-original.jpg"
					width="1536"
					height="1024"
					fetchpriority="high"
					loading="eager"
					alt={language.locale === 'en'
						? "Original WGN concept artwork: an explorer looking over a neon city, alongside the We've Got Now wordmark."
						: 'Arte conceptual original de WGN: una persona exploradora frente a una ciudad iluminada y la marca We’ve Got Now.'}
					bind:this={imageElement}
				/></picture
			>{/if}
	</div>
	<span class="art-note" aria-hidden="true"
		>{language.locale === 'en'
			? `Give an idea
a little room.`
			: `Dale espacio
a una idea.`}</span
	>
	<figcaption>
		{language.locale === 'en'
			? 'THE ORIGINAL WGN WORLD · AI-GENERATED CONCEPT ART'
			: 'EL UNIVERSO ORIGINAL DE WGN · ARTE CONCEPTUAL CON IA'}
	</figcaption>
</figure>
