<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import PromptWorkspace from '$lib/components/PromptWorkspace.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { images, prompts } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';

	const language = useLanguage();
	let query = $state('');
	let category = $state('all');
	const categories = $derived([...new Set(prompts.map((prompt) => prompt.category.en))]);
	const visible = $derived(
		prompts.filter((prompt) => {
			const haystack =
				`${prompt.title[language.locale]} ${prompt.category[language.locale]} ${prompt.usefulFor[language.locale]}`.toLowerCase();
			return (
				(category === 'all' || prompt.category.en === category) &&
				haystack.includes(query.toLowerCase())
			);
		})
	);
</script>

<Seo
	title={{ en: 'Prompt library', es: 'Biblioteca de prompts' }}
	description={{
		en: 'Search, edit, copy and reset five complete bilingual prompt templates with placeholders and synthetic examples.',
		es: 'Busca, edita, copia y restablece cinco prompts bilingües completos con marcadores y ejemplos ficticios.'
	}}
	path="/prompt-library"
/>

<PageIntro
	eyebrow={{ en: 'Five practical starters', es: 'Cinco plantillas prácticas' }}
	title={{ en: 'Start with a real task.', es: 'Empieza con una tarea real.' }}
	body={{
		en: 'Replace the brackets, paste only information you can share, and check the answer before using it. Examples are synthetic and no model compatibility is claimed.',
		es: 'Reemplaza los corchetes, usa solo información que puedas compartir y revisa la respuesta antes de usarla. Los ejemplos son ficticios y no se afirma compatibilidad con modelos.'
	}}
/>

<section class="shell">
	<ConceptArt base={images.prompts.base} alt={images.prompts.alt} eager />
</section>

<section class="section shell">
	<div class="filter-bar">
		<label
			><span>{language.locale === 'en' ? 'Search prompts' : 'Buscar prompts'}</span><input
				type="search"
				bind:value={query}
				placeholder={language.locale === 'en'
					? 'Email, workflow, learning…'
					: 'Correo, flujo, aprendizaje…'}
			/></label
		>
		<label
			><span>{language.locale === 'en' ? 'Category' : 'Categoría'}</span><select
				bind:value={category}
				><option value="all"
					>{language.locale === 'en' ? 'All categories' : 'Todas las categorías'}</option
				>{#each categories as item}<option value={item}
						>{prompts.find((prompt) => prompt.category.en === item)?.category[
							language.locale
						]}</option
					>{/each}</select
			></label
		>
	</div>
	<div class="prompt-grid">
		{#each visible as prompt}<PromptWorkspace {prompt} compact />{:else}<div class="pending-box">
				<strong
					>{language.locale === 'en'
						? 'No prompts match.'
						: 'No hay prompts que coincidan.'}</strong
				>
				<p>
					{language.locale === 'en'
						? 'Clear the search or choose another category.'
						: 'Borra la búsqueda o elige otra categoría.'}
				</p>
			</div>{/each}
	</div>
</section>
