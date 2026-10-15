<script lang="ts">
	import { page } from '$app/state';
	import { useLanguage } from '$lib/language.svelte';

	const language = useLanguage();
	let open = $state(false);
	const labels = {
		en: ['Home', 'Events', 'Workshops', 'Prompts', 'Careers', 'Projects', 'About'],
		es: ['Inicio', 'Eventos', 'Talleres', 'Prompts', 'Carreras', 'Proyectos', 'Nosotros']
	};
	const hrefs = [
		'/',
		'/events',
		'/workshops',
		'/prompt-library',
		'/careers',
		'/projects',
		'/about'
	];
</script>

<header class="site-header">
	<div class="shell header-inner">
		<a class="brand" href="/" aria-label="We've Got Now home" onclick={() => (open = false)}>
			<img src="/assets/derived/wgn-logo-420.webp" alt="" width="420" height="420" />
			<span><strong>WE'VE GOT NOW</strong><small>AI Tools Explorers Night</small></span>
		</a>
		<button
			class="menu-button"
			type="button"
			aria-expanded={open}
			aria-controls="primary-navigation"
			onclick={() => (open = !open)}
		>
			<span class="sr-only"
				>{language.locale === 'en' ? 'Toggle navigation' : 'Abrir navegación'}</span
			>
			<span></span><span></span><span></span>
		</button>
		<nav id="primary-navigation" aria-label="Primary" class:open>
			<ul>
				{#each hrefs as href, index}
					<li>
						<a
							{href}
							aria-current={page.url.pathname === href ? 'page' : undefined}
							onclick={() => (open = false)}>{labels[language.locale][index]}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
		<button
			class="language-toggle"
			type="button"
			onclick={() => language.toggle()}
			aria-label={language.locale === 'en' ? 'Cambiar a español' : 'Switch to English'}
		>
			<span class:active={language.locale === 'en'}>EN</span><span aria-hidden="true">/</span><span
				class:active={language.locale === 'es'}>ES</span
			>
		</button>
	</div>
</header>
