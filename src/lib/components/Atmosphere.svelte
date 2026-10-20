<script lang="ts">
	import { onMount } from 'svelte';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
	let paused = $state(false);
	let reduced = $state(false);
	let hidden = $state(false);
	let ready = $state(false);
	const stopped = $derived(paused || reduced || hidden || !ready);
	onMount(() => {
		const media = matchMedia('(prefers-reduced-motion: reduce)');
		const sync = () => {
			reduced = media.matches;
			hidden = document.hidden;
		};
		try {
			paused = localStorage.getItem('wgn-motion') === 'paused';
		} catch {
			/* Optional preference. */
		}
		sync();
		ready = true;
		media.addEventListener('change', sync);
		document.addEventListener('visibilitychange', sync);
		return () => {
			media.removeEventListener('change', sync);
			document.removeEventListener('visibilitychange', sync);
			document.documentElement.removeAttribute('data-ambient-paused');
		};
	});
	$effect(() => {
		if (ready) document.documentElement.toggleAttribute('data-ambient-paused', stopped);
	});
	function toggle() {
		paused = !paused;
		try {
			localStorage.setItem('wgn-motion', paused ? 'paused' : 'running');
		} catch {
			/* Optional preference. */
		}
	}
</script>

<div class="atmosphere" class:atmosphere-still={stopped} aria-hidden="true" inert>
	<div class="atmosphere-grid"></div>
	<div class="atmosphere-stars"></div>
	<div class="aurora aurora-cyan"></div>
	<div class="aurora aurora-violet"></div>
	<div class="aurora aurora-pink"></div>
	<div class="orbital-system"><i></i><i></i><i></i></div>
	<div class="atmosphere-horizon"></div>
</div>
{#if ready}
	<button
		class="motion-control"
		type="button"
		onclick={toggle}
		disabled={reduced}
		aria-pressed={paused || reduced}
		aria-label={reduced
			? language.locale === 'en'
				? 'Motion off: reduced-motion preference'
				: 'Animación desactivada: preferencia de movimiento reducido'
			: language.locale === 'en'
				? paused
					? 'Resume background animations'
					: 'Pause background animations'
				: paused
					? 'Reanudar animaciones de fondo'
					: 'Pausar animaciones de fondo'}
	>
		<span class="motion-symbol" aria-hidden="true">{paused || reduced ? '▷' : 'Ⅱ'}</span>
		<span
			>{language.locale === 'en'
				? reduced
					? 'Motion off'
					: paused
						? 'Resume motion'
						: 'Pause motion'
				: reduced
					? 'Sin animación'
					: paused
						? 'Reanudar'
						: 'Pausar animación'}</span
		>
	</button>
{/if}
