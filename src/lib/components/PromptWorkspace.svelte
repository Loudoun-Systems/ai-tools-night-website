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
	const inputs = $derived(
		prompt.inputs ?? [
			{
				en: 'Your task, relevant context and the constraints that matter.',
				es: 'Tu tarea, el contexto relevante y las restricciones importantes.'
			}
		]
	);
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
	<article class="lp-card prompt-card">
		<p class="lp-kicker lp-kicker-dark">{prompt.category[language.locale]}</p>
		<h2><a href={`/prompt-library/${prompt.slug}`}>{prompt.title[language.locale]}</a></h2>
		<p>{prompt.usefulFor[language.locale]}</p>
		<a class="lp-card-open" href={`/prompt-library/${prompt.slug}`}
			>{language.locale === 'en' ? 'Open detail' : 'Ver detalle'} ↗</a
		>
	</article>
{:else}
	<article class="lp-workspace prompt-workspace">
		<div class="lp-editor workspace-editor">
			<div class="lp-editor-top">
				<div>
					<p class="lp-kicker lp-kicker-dark">
						{language.locale === 'en' ? 'MAKE IT YOUR OWN' : 'HAZLO TUYO'}
					</p>
					<h2>{language.locale === 'en' ? 'Your working copy.' : 'Tu borrador de trabajo.'}</h2>
				</div>
				<span class="lp-editor-language"
					>{language.locale.toUpperCase()} <span aria-hidden="true">↙</span></span
				>
			</div>
			<p class="lp-editor-description">
				{language.locale === 'en'
					? 'Replace the bracketed inputs, adjust the brief, then copy it into the AI tool you use. Your edits stay here while this page is open.'
					: 'Reemplaza los datos entre corchetes, ajusta las instrucciones y copia el texto en tu herramienta de IA. Tus cambios se conservan aquí mientras esta página está abierta.'}
			</p>
			<label class="lp-editor-label"
				><span
					>{language.locale === 'en' ? 'Editable prompt text' : 'Texto editable del prompt'}</span
				><textarea
					bind:this={editor}
					{value}
					oninput={(event) => {
						drafts[key] = event.currentTarget.value;
						copyState = 'idle';
					}}
					spellcheck="false"
				></textarea></label
			>
			<div class="lp-editor-actions">
				<button class="lp-action" type="button" onclick={copy}
					>{copyState === 'copied'
						? language.locale === 'en'
							? 'Copied'
							: 'Copiado'
						: language.locale === 'en'
							? 'Copy prompt'
							: 'Copiar prompt'} <span aria-hidden="true">↗</span></button
				><button class="lp-reset" type="button" onclick={reset}
					>{language.locale === 'en' ? 'Reset' : 'Restablecer'}</button
				><span class="lp-copy-status" role="status"
					>{copyState === 'copied'
						? language.locale === 'en'
							? 'Prompt copied.'
							: 'Prompt copiado.'
						: language.locale === 'en'
							? 'Not sent to a model.'
							: 'No se envía a un modelo.'}</span
				>
			</div>
			{#if copyState === 'failed'}<p class="lp-copy-error" role="alert">
					{language.locale === 'en'
						? 'Clipboard access was blocked. The text is selected; copy it manually with your keyboard or device menu.'
						: 'El portapapeles está bloqueado. El texto está seleccionado; cópialo con el teclado o el menú del dispositivo.'}
				</p>{/if}
		</div>
		<aside class="lp-guide workspace-guide">
			<div class="lp-guide-block">
				<p class="lp-kicker lp-kicker-dark">
					{language.locale === 'en' ? 'THE INTENDED RESULT' : 'EL RESULTADO BUSCADO'}
				</p>
				<h2>
					{prompt.outcome?.[language.locale] ??
						(language.locale === 'en'
							? 'A useful result begins with useful context.'
							: 'Un resultado útil empieza con buen contexto.')}
				</h2>
			</div>
			<div class="lp-guide-block">
				<h3>{language.locale === 'en' ? 'Have these ready' : 'Ten esto a mano'}</h3>
				<ul class="lp-input-list">
					{#each inputs as input}<li>{input[language.locale]}</li>{/each}
				</ul>
			</div>
			<div class="lp-guide-block">
				<h3>
					{language.locale === 'en' ? 'Before you use the output' : 'Antes de usar el resultado'}
				</h3>
				<ol class="lp-check-list">
					<li>
						{language.locale === 'en'
							? 'Compare it with your original task and constraints.'
							: 'Compáralo con tu tarea y tus restricciones.'}
					</li>
					<li>
						{language.locale === 'en'
							? 'Check sources, assumptions and any missing information.'
							: 'Revisa las fuentes, los supuestos y la información que falta.'}
					</li>
					<li>
						{language.locale === 'en'
							? 'Keep decisions and final approval with a person.'
							: 'Mantén las decisiones y la aprobación final en manos de una persona.'}
					</li>
				</ol>
			</div>
			<details class="lp-example workspace-example">
				<summary>{language.locale === 'en' ? 'Synthetic example' : 'Ejemplo ficticio'}</summary>
				<p>{prompt.example[language.locale]}</p>
			</details>
			<p class="lp-provenance">
				{prompt.reviewStatus[language.locale]}<br />{prompt.reviewedAt}<br />{language.locale ===
				'en'
					? 'No model call or submission happens here.'
					: 'Aquí no se consulta un modelo ni se envían datos.'}
			</p>
		</aside>
	</article>
{/if}
