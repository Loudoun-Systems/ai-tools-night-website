<script lang="ts">
	import { useLanguage } from '$lib/language.svelte';
	import type { PromptRecord } from '$lib/types';

	let { prompt, compact = false }: { prompt: PromptRecord; compact?: boolean } = $props();
	const language = useLanguage();
	let value = $state('');
	let activeLocale = $state<'en' | 'es' | null>(null);
	let copyState = $state<'idle' | 'copied' | 'failed'>('idle');

	$effect(() => {
		if (activeLocale === null || activeLocale !== language.locale) {
			activeLocale = language.locale;
			value = prompt.prompt[language.locale];
			copyState = 'idle';
		}
	});

	function reset() {
		value = prompt.prompt[language.locale];
		copyState = 'idle';
	}

	async function copy() {
		try {
			await navigator.clipboard.writeText(value);
			copyState = 'copied';
		} catch {
			copyState = 'failed';
		}
	}
</script>

<article class:compact class="prompt-editor detail-panel">
	<div>
		<p class="eyebrow">{prompt.category[language.locale]}</p>
		<h2>{prompt.title[language.locale]}</h2>
		<p>{prompt.usefulFor[language.locale]}</p>
	</div>
	<label>
		<span class="sr-only"
			>{language.locale === 'en' ? 'Editable prompt text' : 'Texto editable del prompt'}</span
		>
		<textarea
			bind:value
			aria-label={language.locale === 'en' ? 'Editable prompt text' : 'Texto editable del prompt'}
		></textarea>
	</label>
	<div class="button-row">
		<button class="button primary" type="button" onclick={copy}>
			{copyState === 'copied'
				? language.locale === 'en'
					? 'Copied'
					: 'Copiado'
				: language.locale === 'en'
					? 'Copy prompt'
					: 'Copiar prompt'}
		</button>
		<button class="button secondary" type="button" onclick={reset}>
			{language.locale === 'en' ? 'Reset' : 'Restablecer'}
		</button>
		{#if compact}<a class="button secondary" href={`/prompt-library/${prompt.slug}`}
				>{language.locale === 'en' ? 'Open detail' : 'Ver detalle'}</a
			>{/if}
	</div>
	{#if copyState === 'failed'}
		<p class="notice error" role="alert">
			{language.locale === 'en'
				? 'Clipboard access was blocked. Select the text and copy it manually.'
				: 'El acceso al portapapeles fue bloqueado. Selecciona el texto y cópialo manualmente.'}
		</p>
	{/if}
	<details>
		<summary>{language.locale === 'en' ? 'Synthetic example' : 'Ejemplo ficticio'}</summary>
		<p>{prompt.example[language.locale]}</p>
	</details>
	<p class="small">{prompt.reviewStatus[language.locale]} · {prompt.reviewedAt}</p>
</article>
