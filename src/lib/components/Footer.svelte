<script lang="ts">
	import { page } from '$app/state';
	import { LINKEDIN_URL, MEETUP_URL } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
	const links = [
		['/workshops', 'Workshops', 'Talleres'],
		['/events', 'Community events', 'Encuentros comunitarios'],
		['/careers', 'Careers & contributions', 'Carreras y colaboración'],
		['/prompt-library', 'Prompt library', 'Biblioteca de prompts'],
		['/projects', 'Projects', 'Proyectos'],
		['/about', 'Our community', 'La comunidad']
	];
</script>

<footer class="site-footer">
	<div class="shell footer-grid">
		<div class="footer-brand">
			<a class="brand" href="/"
				><img src="/assets/derived/wgn-logo-420.webp" alt="" width="420" height="420" /><span
					><strong>WE'VE GOT NOW</strong><small>AI Tools Explorers Night</small></span
				></a
			>
			<p>
				{language.locale === 'en'
					? `Practical AI. Useful ideas.
People learning together.`
					: `IA práctica. Ideas útiles.
Personas que aprenden juntas.`}
			</p>
			<button
				class="footer-language"
				type="button"
				onclick={() => language.toggle()}
				aria-label={language.locale === 'en'
					? 'Footer: cambiar a español'
					: 'Footer: switch to English'}
				>EN <span aria-hidden="true">/</span> ES <span aria-hidden="true">↗</span></button
			>
		</div>
		<div>
			<h2>{language.locale === 'en' ? 'Explore' : 'Explora'}</h2>
			{#each links.slice(0, 3) as link}<a href={link[0]}>{link[language.locale === 'en' ? 1 : 2]}</a
				>{/each}
		</div>
		<div>
			<h2>{language.locale === 'en' ? 'Stay curious' : 'Sigue explorando'}</h2>
			{#each links.slice(3) as link}<a href={link[0]}>{link[language.locale === 'en' ? 1 : 2]}</a
				>{/each}<a href={MEETUP_URL} target="_blank" rel="noreferrer">Meetup ↗</a><a
				href={LINKEDIN_URL}
				target="_blank"
				rel="noreferrer">LinkedIn ↗</a
			>
		</div>
		<div>
			<h2>{language.locale === 'en' ? 'Good to know' : 'Información útil'}</h2>
			<a href="/privacy">{language.locale === 'en' ? 'Privacy' : 'Privacidad'}</a><a href="/terms"
				>{language.locale === 'en' ? 'Terms' : 'Términos'}</a
			><a href="/code-of-conduct"
				>{language.locale === 'en' ? 'Community guidelines' : 'Código de conducta'}</a
			><a href="/legacy-receipt"
				>{language.locale === 'en' ? 'Earlier links' : 'Enlaces anteriores'}</a
			>
			{#if page.data.chatMode === 'disabled'}<details class="chat-availability">
					<summary>{language.locale === 'en' ? 'Chat unavailable' : 'Chat no disponible'}</summary>
					<p>
						{language.locale === 'en'
							? 'Automated chat is temporarily unavailable. No message is sent.'
							: 'El chat automático no está disponible temporalmente. No se envía ningún mensaje.'}
					</p>
					<a href="/workshops#workshop-faq"
						>{language.locale === 'en' ? 'Workshop FAQs' : 'Preguntas sobre los talleres'}</a
					>
				</details>{/if}
		</div>
	</div>
	<div class="shell footer-bottom">
		<span>© 2026 We’ve Got Now</span><span
			>{language.locale === 'en'
				? 'Learn · Build · Share · Connect'
				: 'Aprende · Crea · Comparte · Conecta'}</span
		>
	</div>
</footer>
