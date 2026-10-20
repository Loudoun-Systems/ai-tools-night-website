<script lang="ts">
	import { useLanguage } from '$lib/language.svelte';
	import type { PromptRecord } from '$lib/types';
	let { prompt, compact = false }: { prompt: PromptRecord; compact?: boolean } = $props();
	const language = useLanguage();
	let drafts = $state<Record<string, string>>({});
	const key = $derived(`${prompt.slug}:${language.locale}`);
	const value = $derived(drafts[key] ?? prompt.prompt[language.locale]);
	let copyState = $state<'idle' | 'copied' | 'failed'>('idle');
	let editor = $state<HTMLTextAreaElement>();
	$effect(() => {
		language.locale;
		prompt.slug;
		copyState = 'idle';
	});
	function reset() {
		drafts[key] = prompt.prompt[language.locale];
		copyState = 'idle';
	}
	async function copy() {
		try {
			await navigator.clipboard.writeText(value);
			copyState = 'copied';
		} catch {
			copyState = 'failed';
			editor?.focus();
			editor?.select();
		}
	}
</script>

{#if compact}
	<article class="prompt-card">
		<p class="eyebrow">{prompt.category[language.locale]}</p>
		<h2><a href={`/prompt-library/${prompt.slug}`}>{prompt.title[language.locale]}</a></h2>
		<p>{prompt.usefulFor[language.locale]}</p>
		<div
			class="prompt-card-preview"
			aria-label={language.locale === 'en' ? 'Template preview' : 'Vista de la plantilla'}
		>
			{prompt.prompt[language.locale].split(String.fromCharCode(10))[0]}
		</div>
		<div class="prompt-card-actions">
			<a class="text-link" href={`/prompt-library/${prompt.slug}`}
				>{language.locale === 'en' ? 'Open detail' : 'Ver detalle'}
				<span aria-hidden="true">↗</span></a
			><button class="copy-small" type="button" onclick={copy}
				>{copyState === 'copied'
					? language.locale === 'en'
						? 'Copied'
						: 'Copiado'
					: language.locale === 'en'
						? 'Copy prompt'
						: 'Copiar prompt'}</button
			>
		</div>
		{#if copyState === 'failed'}<p role="alert" class="small">
				{language.locale === 'en'
					? 'Clipboard access was blocked. Open the template to select and copy the text manually.'
					: 'El portapapeles está bloqueado. Abre la plantilla para seleccionar y copiar el texto.'}
			</p>{/if}
	</article>
{:else}
	<article class="prompt-workspace">
		<div class="workspace-editor">
			<div class="workspace-toolbar">
				<span>{language.locale === 'en' ? 'YOUR WORKING COPY' : 'TU BORRADOR'}</span><span
					>{language.locale.toUpperCase()} · {language.locale === 'en'
						? 'EDITABLE'
						: 'EDITABLE'}</span
				>
			</div>
			<label
				><span class="sr-only"
					>{language.locale === 'en' ? 'Editable prompt text' : 'Texto editable del prompt'}</span
				><textarea
					bind:this={editor}
					{value}
					oninput={(e) => {
						drafts[key] = e.currentTarget.value;
						copyState = 'idle';
					}}
					aria-label={language.locale === 'en'
						? 'Editable prompt text'
						: 'Texto editable del prompt'}
					spellcheck="false"
				></textarea></label
			>
			<div class="workspace-actions">
				<button class="button dark-button" type="button" onclick={copy}
					>{copyState === 'copied'
						? language.locale === 'en'
							? 'Copied'
							: 'Copiado'
						: language.locale === 'en'
							? 'Copy prompt'
							: 'Copiar prompt'} <span aria-hidden="true">↗</span></button
				><button class="reset-button" type="button" onclick={reset}
					>{language.locale === 'en' ? 'Reset' : 'Restablecer'}</button
				><span class="copy-status" role="status"
					>{copyState === 'copied'
						? language.locale === 'en'
							? 'Prompt copied.'
							: 'Prompt copiado.'
						: language.locale === 'en'
							? 'Not sent to a model.'
							: 'No se envía a un modelo.'}</span
				>
			</div>
			{#if copyState === 'failed'}<p class="notice error" role="alert">
					{language.locale === 'en'
						? 'Clipboard access was blocked. Select the text and copy it manually.'
						: 'El acceso al portapapeles fue bloqueado. Selecciona el texto y cópialo manualmente.'}
				</p>{/if}
		</div>
		<aside class="workspace-guide">
			<p class="eyebrow">{language.locale === 'en' ? 'MAKE IT USEFUL' : 'HAZLO ÚTIL'}</p>
			<h2>
				{language.locale === 'en'
					? 'Your context makes the difference.'
					: 'Tu contexto hace la diferencia.'}
			</h2>
			<ol>
				<li>
					{language.locale === 'en'
						? 'Replace the bracketed placeholders with your task.'
						: 'Reemplaza los corchetes con los datos de tu tarea.'}
				</li>
				<li>
					{language.locale === 'en'
						? 'Use sample or redacted information. Leave private data out.'
						: 'Usa ejemplos o información sin datos privados.'}
				</li>
				<li>
					{language.locale === 'en'
						? 'Review the result before you rely on it.'
						: 'Revisa el resultado antes de utilizarlo.'}
				</li>
			</ol>
			<p class="small muted">
				{language.locale === 'en'
					? 'This editor only prepares text in your browser. It does not send a prompt or call an AI model.'
					: 'Este editor solo prepara texto en tu navegador. No envía el prompt ni consulta ningún modelo de IA.'}
			</p>
			<details class="workspace-example">
				<summary>{language.locale === 'en' ? 'Synthetic example' : 'Ejemplo ficticio'}</summary>
				<p>{prompt.example[language.locale]}</p>
			</details>
			<p class="workspace-provenance">
				{prompt.reviewStatus[language.locale]}<br />{prompt.reviewedAt}
			</p>
		</aside>
	</article>
{/if}
