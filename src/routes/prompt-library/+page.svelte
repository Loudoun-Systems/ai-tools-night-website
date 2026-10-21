<script lang="ts">
	import { onMount } from 'svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { prompts } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	import '$lib/prompt-library.css';
	const language = useLanguage();
	let query = $state('');
	let category = $state('all');
	let savedOnly = $state(false);
	let saved = $state<string[]>([]);
	let saveState = $state<'idle' | 'saved' | 'error'>('idle');
	const storageKey = 'wgn-saved-prompts-v1';
	const orderedPrompts = [
		...prompts.filter((p) => p.difficulty === 'advanced'),
		...prompts.filter((p) => p.difficulty === 'intermediate'),
		...prompts.filter((p) => !p.difficulty)
	];
	const categories = Array.from(
		new Map(orderedPrompts.map((p) => [p.category.en, p.category])).values()
	);
	const visible = $derived(
		orderedPrompts.filter((p) => {
			const search = [
				p.title[language.locale],
				p.category[language.locale],
				p.usefulFor[language.locale],
				p.outcome?.[language.locale] ?? '',
				p.prompt[language.locale],
				...(p.tags ?? [])
			]
				.join(' ')
				.toLocaleLowerCase(language.locale);
			return (
				(category === 'all' || p.category.en === category) &&
				(!savedOnly || saved.includes(p.slug)) &&
				search.includes(query.trim().toLocaleLowerCase(language.locale))
			);
		})
	);
	const filtered = $derived(query.trim() !== '' || category !== 'all' || savedOnly);
	onMount(() => {
		try {
			const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
			if (Array.isArray(value))
				saved = value.filter(
					(slug): slug is string => typeof slug === 'string' && prompts.some((p) => p.slug === slug)
				);
		} catch {
			/* Optional device-local preference. */
		}
	});
	function toggleSaved(slug: string) {
		const next = saved.includes(slug) ? saved.filter((item) => item !== slug) : [...saved, slug];
		try {
			localStorage.setItem(storageKey, JSON.stringify(next));
			saved = next;
			saveState = 'saved';
		} catch {
			saveState = 'error';
		}
	}
	function clearFilters() {
		query = '';
		category = 'all';
		savedOnly = false;
	}
</script>

<Seo
	title={{ en: 'The prompt field guide', es: 'La guía práctica de prompts' }}
	description={{
		en: 'Explore structured bilingual prompts for research, automation, content, product work and learning. Adapt the inputs and make the workflow your own.',
		es: 'Explora prompts bilingües para investigación, automatización, contenido, producto y aprendizaje. Adapta los datos y haz tuyo el flujo.'
	}}
	path="/prompt-library"
/>
<section class="lp-intro">
	<div class="shell lp-intro-grid">
		<div>
			<p class="lp-kicker">
				{language.locale === 'en' ? 'THE WGN FIELD GUIDE / PROMPTS' : 'GUÍA PRÁCTICA WGN / PROMPTS'}
			</p>
			<h1 class="lp-heading">
				{language.locale === 'en'
					? 'Go beyond the blank prompt.'
					: 'Ve más allá del prompt en blanco.'}
			</h1>
			<p class="lp-intro-lead">
				{language.locale === 'en'
					? 'A collection for the work you actually want to do. Find a workflow, add your context, and make it your own.'
					: 'Una colección para el trabajo que quieres hacer. Encuentra un flujo, añade tu contexto y hazlo tuyo.'}
			</p>
			<a class="lp-intro-link" href="#prompt-workbench"
				>{language.locale === 'en' ? 'Find your next workflow' : 'Encuentra tu próximo flujo'}
				<span aria-hidden="true">↘</span></a
			>
		</div>
		<div class="lp-library-note">
			<span class="lp-total">{prompts.length.toString().padStart(2, '0')}</span>
			<p>
				{language.locale === 'en'
					? 'prompts, with a point of view.'
					: 'prompts, con una intención.'}
			</p>
			<div class="lp-note-rule"></div>
			<span
				>{language.locale === 'en'
					? 'Clear inputs. A considered method. A result you can check.'
					: 'Datos claros. Un método pensado. Un resultado que puedes revisar.'}</span
			>
		</div>
	</div>
</section>
<section id="prompt-workbench" class="lp-workbench">
	<div class="shell">
		<div class="lp-workbench-top">
			<div>
				<p class="lp-kicker lp-kicker-dark">
					{language.locale === 'en' ? 'PICK A DIRECTION' : 'ELIGE UNA DIRECCIÓN'}
				</p>
				<h2>
					{language.locale === 'en' ? 'What are you working on?' : '¿En qué estás trabajando?'}
				</h2>
			</div>
			<p>
				{language.locale === 'en'
					? 'Every template is editable. Nothing is sent to an AI model from this page.'
					: 'Todas las plantillas son editables. Esta página no envía nada a un modelo de IA.'}
			</p>
		</div>
		<div class="lp-catalog-layout">
			<aside class="lp-rail">
				<div class="lp-rail-label">
					{language.locale === 'en' ? 'Browse the collection' : 'Explora la colección'}
				</div>
				<nav
					class="lp-category-list"
					aria-label={language.locale === 'en' ? 'Prompt categories' : 'Categorías de prompts'}
				>
					<button
						class:lp-selected={category === 'all'}
						type="button"
						aria-pressed={category === 'all'}
						onclick={() => (category = 'all')}
						><span>{language.locale === 'en' ? 'All categories' : 'Todas las categorías'}</span
						><span>{prompts.length}</span></button
					>
					{#each categories as item}<button
							class:lp-selected={category === item.en}
							type="button"
							aria-pressed={category === item.en}
							onclick={() => (category = item.en)}
							><span>{item[language.locale]}</span><span
								>{prompts.filter((p) => p.category.en === item.en).length}</span
							></button
						>{/each}
				</nav>
				<div class="lp-saved-note">
					<span aria-hidden="true">◇</span>
					<p>
						{language.locale === 'en'
							? 'Keep a few close. Saved prompts stay on this browser and device.'
							: 'Guarda los que más te sirven. Se conservan solo en este navegador y dispositivo.'}
					</p>
				</div>
			</aside>
			<div class="lp-results">
				<div class="lp-toolbar">
					<label class="lp-search"
						><span class="sr-only"
							>{language.locale === 'en' ? 'Search prompts' : 'Buscar prompts'}</span
						><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"
							><circle cx="10.5" cy="10.5" r="6.5"></circle><path d="m16 16 4.5 4.5"></path></svg
						><input
							type="search"
							bind:value={query}
							placeholder={language.locale === 'en'
								? 'Search a task, topic or outcome…'
								: 'Busca una tarea, un tema o un resultado…'}
						/></label
					><button
						class="lp-saved-toggle"
						class:lp-saved-active={savedOnly}
						type="button"
						aria-pressed={savedOnly}
						onclick={() => (savedOnly = !savedOnly)}
						><span aria-hidden="true">◇</span>{language.locale === 'en'
							? 'Saved'
							: 'Guardados'}<span class="lp-small-count">{saved.length}</span></button
					>
				</div>
				<div class="lp-count-line">
					<p role="status">
						{visible.length}
						{language.locale === 'en'
							? visible.length === 1
								? 'template shown'
								: 'templates shown'
							: visible.length === 1
								? 'plantilla visible'
								: 'plantillas visibles'}
					</p>
					{#if filtered}<button type="button" onclick={clearFilters}
							>{language.locale === 'en' ? 'Clear filters' : 'Borrar filtros'}
							<span aria-hidden="true">×</span></button
						>{:else}<span
							>{language.locale === 'en'
								? 'Find an idea. Make it useful.'
								: 'Encuentra una idea. Hazla útil.'}</span
						>{/if}
				</div>
				<div class="lp-card-grid">
					{#each visible as prompt (prompt.slug)}<article class="lp-card prompt-card">
							<div class="lp-card-meta">
								<span>{prompt.category[language.locale]}</span><button
									class="lp-bookmark"
									class:lp-bookmarked={saved.includes(prompt.slug)}
									type="button"
									aria-pressed={saved.includes(prompt.slug)}
									aria-label={`${saved.includes(prompt.slug) ? (language.locale === 'en' ? 'Remove saved prompt' : 'Quitar prompt guardado') : language.locale === 'en' ? 'Save prompt' : 'Guardar prompt'}: ${prompt.title[language.locale]}`}
									onclick={() => toggleSaved(prompt.slug)}
									><svg viewBox="0 0 24 24" aria-hidden="true"
										><path d="M6 3.5h12v17l-6-4-6 4z"></path></svg
									></button
								>
							</div>
							<h3>
								<a href={`/prompt-library/${prompt.slug}`}>{prompt.title[language.locale]}</a>
							</h3>
							<p>{prompt.usefulFor[language.locale]}</p>
							<div class="lp-card-outcome">
								<span>{language.locale === 'en' ? 'TAKE AWAY' : 'RESULTADO'}</span>
								<p>
									{prompt.outcome?.[language.locale] ??
										(language.locale === 'en'
											? 'A structured starting point you can adapt and check.'
											: 'Un punto de partida estructurado que puedes adaptar y revisar.')}
								</p>
							</div>
							{#if prompt.tags?.length}<div
									class="lp-card-tags"
									aria-label={language.locale === 'en' ? 'Topics' : 'Temas'}
								>
									{#each prompt.tags.slice(0, 2) as tag}<span>{tag}</span>{/each}
								</div>{/if}
							<div class="lp-card-bottom">
								<span class="lp-level"
									>{prompt.difficulty === 'advanced'
										? language.locale === 'en'
											? 'Advanced workflow'
											: 'Flujo avanzado'
										: prompt.difficulty === 'intermediate'
											? language.locale === 'en'
												? 'Intermediate workflow'
												: 'Flujo intermedio'
											: language.locale === 'en'
												? 'Everyday starter'
												: 'Plantilla cotidiana'}</span
								><a
									href={`/prompt-library/${prompt.slug}`}
									aria-label={`${language.locale === 'en' ? 'Open prompt' : 'Abrir prompt'}: ${prompt.title[language.locale]}`}
									><span>{language.locale === 'en' ? 'Open detail' : 'Ver detalle'}</span>
									<span aria-hidden="true">↗</span></a
								>
							</div>
						</article>
					{:else}<div class="lp-empty">
							<span aria-hidden="true">↗</span>
							<h3>
								{savedOnly && saved.length === 0
									? language.locale === 'en'
										? 'Your collection starts here.'
										: 'Tu colección empieza aquí.'
									: language.locale === 'en'
										? 'No prompts match.'
										: 'No hay prompts que coincidan.'}
							</h3>
							<p>
								{savedOnly && saved.length === 0
									? language.locale === 'en'
										? 'Use the bookmark on a template to save it on this device. There is no account to create.'
										: 'Usa el marcador de una plantilla para guardarla en este dispositivo. No necesitas una cuenta.'
									: language.locale === 'en'
										? 'Try a different word, choose another category or clear the filters.'
										: 'Prueba otra palabra, elige otra categoría o elimina los filtros.'}
							</p>
							<button type="button" class="lp-action" onclick={clearFilters}
								>{language.locale === 'en' ? 'Show every template' : 'Ver todas las plantillas'}
								<span aria-hidden="true">↗</span></button
							>
						</div>{/each}
				</div>
				<p class="lp-save-notice" role="status">
					{saveState === 'saved'
						? language.locale === 'en'
							? 'Saved list updated on this device.'
							: 'Lista guardada actualizada en este dispositivo.'
						: saveState === 'error'
							? language.locale === 'en'
								? 'This browser could not save the list. Your current list was not changed.'
								: 'Este navegador no pudo guardar la lista. La lista actual no cambió.'
							: ''}
				</p>
			</div>
		</div>
		<div class="lp-editorial-note">
			<span>{language.locale === 'en' ? 'A NOTE ON THE COLLECTION' : 'SOBRE ESTA COLECCIÓN'}</span>
			<p>
				{language.locale === 'en'
					? 'These are editorial templates, not model-tested guarantees. Use sample or redacted inputs, compare the output with your goal, and keep your judgment in the loop.'
					: 'Son plantillas editoriales, no garantías comprobadas con modelos. Usa datos de ejemplo o sin información privada, compara el resultado con tu objetivo y mantén tu criterio en cada paso.'}
			</p>
		</div>
	</div>
</section>
