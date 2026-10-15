<script lang="ts">
	import PageIntro from '$lib/components/PageIntro.svelte';
	import PromptWorkspace from '$lib/components/PromptWorkspace.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { useLanguage } from '$lib/language.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	const language = useLanguage();
</script>

<Seo
	title={data.prompt.title}
	description={data.prompt.usefulFor}
	path={`/prompt-library/${data.prompt.slug}`}
/>
<PageIntro eyebrow={data.prompt.category} title={data.prompt.title} body={data.prompt.usefulFor} />
<section class="section shell" style="padding-top: 0">
	<PromptWorkspace prompt={data.prompt} />
	<p style="margin-top: 1rem">
		<a href="/prompt-library"
			>← {language.locale === 'en' ? 'Back to all prompts' : 'Volver a todos los prompts'}</a
		>
	</p>
</section>
