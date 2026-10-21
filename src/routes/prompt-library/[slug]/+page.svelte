<script lang="ts">
	import PromptWorkspace from '$lib/components/PromptWorkspace.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { prompts } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	import type { PageData } from './$types';
	import '$lib/prompt-library.css';
	let { data }: { data: PageData } = $props();
	const language = useLanguage();
	const related = $derived(
		[
			...prompts.filter(
				(p) => p.slug !== data.prompt.slug && p.category.en === data.prompt.category.en
			),
			...prompts.filter(
				(p) => p.slug !== data.prompt.slug && p.category.en !== data.prompt.category.en
			)
		].slice(0, 3)
	);
</script>

<Seo
	title={data.prompt.title}
	description={data.prompt.usefulFor}
	path={`/prompt-library/${data.prompt.slug}`}
/>
<section class="lp-detail-intro">
	<div class="shell">
		<a class="lp-back" href="/prompt-library"
			>← {language.locale === 'en' ? 'Back to all prompts' : 'Volver a todos los prompts'}</a
		>
		<div class="lp-detail-title">
			<div>
				<p class="lp-kicker">{data.prompt.category[language.locale]}</p>
				<h1>{data.prompt.title[language.locale]}</h1>
			</div>
			<div>
				<p class="lp-detail-lead">{data.prompt.usefulFor[language.locale]}</p>
				<span class="lp-detail-level"
					>{data.prompt.difficulty === 'advanced'
						? language.locale === 'en'
							? 'Advanced workflow'
							: 'Flujo avanzado'
						: data.prompt.difficulty === 'intermediate'
							? language.locale === 'en'
								? 'Intermediate workflow'
								: 'Flujo intermedio'
							: language.locale === 'en'
								? 'Everyday starter'
								: 'Plantilla cotidiana'} <span aria-hidden="true">/</span> EN + ES</span
				>
			</div>
		</div>
	</div>
</section>
<section class="lp-detail-body">
	<div class="shell"><PromptWorkspace prompt={data.prompt} /></div>
</section>
<section class="lp-related">
	<div class="shell">
		<div class="lp-related-top">
			<h2>{language.locale === 'en' ? 'Keep exploring.' : 'Sigue explorando.'}</h2>
			<a class="lp-back" href="/prompt-library"
				>{language.locale === 'en' ? 'Browse the collection' : 'Explora la colección'} ↗</a
			>
		</div>
		<div class="lp-related-grid">
			{#each related as prompt}<a class="lp-related-link" href={`/prompt-library/${prompt.slug}`}
					><span>{prompt.category[language.locale]}</span>
					<h3>{prompt.title[language.locale]}</h3>
					<p>{prompt.outcome?.[language.locale] ?? prompt.usefulFor[language.locale]}</p>
					<b aria-hidden="true">↗</b></a
				>{/each}
		</div>
	</div>
</section>
