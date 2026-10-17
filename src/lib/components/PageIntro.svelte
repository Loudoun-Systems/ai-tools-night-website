<script lang="ts">
	import { text } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	import type { Localized } from '$lib/types';

	let { eyebrow, title, body }: { eyebrow: Localized; title: Localized; body: Localized } =
		$props();
	const language = useLanguage();
</script>

<section class="page-intro shell">
	<p class="eyebrow">{text(eyebrow, language.locale)}</p>
	<h1>{text(title, language.locale)}</h1>
	<p class="lede">{text(body, language.locale)}</p>
</section>
