<script lang="ts">
	import { page } from '$app/state';
	import { text } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	import type { Localized } from '$lib/types';
	let { eyebrow, title, body }: { eyebrow: Localized; title: Localized; body: Localized } =
		$props();
	const language = useLanguage();
	const reference = $derived(
		['/privacy', '/terms', '/code-of-conduct'].includes(page.url.pathname)
	);
</script>

<section class="page-intro">
	<div class="shell">
		<p class="eyebrow">{text(eyebrow, language.locale)}</p>
		<div class="page-intro-inner">
			<h1>{text(title, language.locale)}</h1>
			<p class="lede">{text(body, language.locale)}</p>
		</div>
	</div>
</section>
{#if reference}<nav
		class="policy-navigation shell"
		aria-label={language.locale === 'en' ? 'Related notices' : 'Avisos relacionados'}
	>
		<span>{language.locale === 'en' ? 'COMMUNITY REFERENCE' : 'INFORMACIÓN DE LA COMUNIDAD'}</span
		><a href="/privacy" aria-current={page.url.pathname === '/privacy' ? 'page' : undefined}
			>{language.locale === 'en' ? 'Privacy' : 'Privacidad'}</a
		><a href="/terms" aria-current={page.url.pathname === '/terms' ? 'page' : undefined}
			>{language.locale === 'en' ? 'Terms' : 'Términos'}</a
		><a
			href="/code-of-conduct"
			aria-current={page.url.pathname === '/code-of-conduct' ? 'page' : undefined}
			>{language.locale === 'en' ? 'Community guidelines' : 'Código de conducta'}</a
		>
	</nav>{/if}
