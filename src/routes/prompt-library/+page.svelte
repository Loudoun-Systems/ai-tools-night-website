<script lang="ts">
	import PageIntro from '$lib/components/PageIntro.svelte';
	import PromptWorkspace from '$lib/components/PromptWorkspace.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { prompts, text } from '$lib/content';
	import copy from '$lib/r6-copy.json';
	import { useLanguage } from '$lib/language.svelte';
	import type { Localized } from '$lib/types';
	const language = useLanguage();
	const t = (v: Localized) => text(v, language.locale);
	let query = $state(''),
		category = $state('all');
	const categories = [...new Set(prompts.map((p) => p.category.en))];
	const visible = $derived(
		prompts.filter(
			(p) =>
				(category === 'all' || p.category.en === category) &&
				`${p.title[language.locale]} ${p.category[language.locale]} ${p.usefulFor[language.locale]}`
					.toLocaleLowerCase(language.locale)
					.includes(query.trim().toLocaleLowerCase(language.locale))
		)
	);
</script>

<Seo
	title={{ en: 'Prompt library', es: 'Biblioteca de prompts' }}
	description={copy.prompts.lead}
	path="/prompt-library"
/>
<PageIntro
	eyebrow={{ en: 'THE PROMPT LIBRARY', es: 'LA BIBLIOTECA DE PROMPTS' }}
	title={copy.prompts.title}
	body={copy.prompts.lead}
/>
<section class="chapter prompt-catalog">
	<div class="shell">
		<div class="catalog-top">
			<p class="eyebrow">
				{language.locale === 'en' ? 'FIVE PRACTICAL STARTERS' : 'CINCO PLANTILLAS PRÁCTICAS'}
			</p>
			<p>
				{language.locale === 'en'
					? 'Edit. Copy. Try. Then check. These are templates, not generated answers.'
					: 'Edita. Copia. Prueba. Después revisa. Son plantillas, no respuestas generadas.'}
			</p>
		</div>
		<div class="filter-bar">
			<label
				><span>{language.locale === 'en' ? 'Search prompts' : 'Buscar prompts'}</span><input
					type="search"
					bind:value={query}
					placeholder={language.locale === 'en'
						? 'A task, a word, a starting point…'
						: 'Una tarea, una palabra, por dónde empezar…'}
				/></label
			><label
				><span>{language.locale === 'en' ? 'Category' : 'Categoría'}</span><select
					bind:value={category}
					><option value="all"
						>{language.locale === 'en' ? 'All categories' : 'Todas las categorías'}</option
					>{#each categories as item}<option value={item}
							>{prompts.find((p) => p.category.en === item)?.category[language.locale]}</option
						>{/each}</select
				></label
			>
		</div>
		<div class="catalog-count">
			<p role="status">
				{visible.length}
				{language.locale === 'en' ? 'templates shown' : 'plantillas visibles'}
			</p>
			{#if query || category !== 'all'}<button
					class="reset-button"
					type="button"
					onclick={() => {
						query = '';
						category = 'all';
					}}>{language.locale === 'en' ? 'Clear filters' : 'Borrar filtros'}</button
				>{/if}
		</div>
		<div class="prompt-grid">
			{#each visible as prompt (prompt.slug)}<PromptWorkspace {prompt} compact />{:else}<div
					class="empty-state"
					role="status"
				>
					<span class="empty-mark" aria-hidden="true">—</span>
					<h2>
						{language.locale === 'en' ? 'No prompts match.' : 'No hay prompts que coincidan.'}
					</h2>
					<p>{t(copy.prompts.empty)}</p>
					<button
						class="button dark-button"
						type="button"
						onclick={() => {
							query = '';
							category = 'all';
						}}
						>{language.locale === 'en' ? 'Show every template' : 'Ver todas las plantillas'}</button
					>
				</div>{/each}
		</div>
		<p class="catalog-disclosure">
			{language.locale === 'en'
				? 'Prompt templates are editorially reviewed. Examples are synthetic. No model compatibility or output quality is guaranteed.'
				: 'Las plantillas tienen revisión editorial. Los ejemplos son ficticios. No se garantiza compatibilidad con modelos ni calidad de resultados.'}
		</p>
	</div>
</section>
