<script lang="ts">
	import { page } from '$app/state';
	import { LINKEDIN_URL, MEETUP_URL } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
	const links = [
		['/workshops', 'Workshops', 'Talleres'],
		['/events', 'Community events', 'Encuentros comunitarios'],
		['/prompt-library', 'Prompt field guide', 'Guía práctica de prompts'],
		['/careers', 'Ways to contribute', 'Formas de colaborar'],
		['/projects', 'Practice projects', 'Proyectos prácticos'],
		['/about', 'The people behind the curiosity', 'Las personas detrás de la curiosidad']
	];
</script>

<footer class="site-footer">
	<div class="shell">
		<a class="footer-statement" href={MEETUP_URL} target="_blank" rel="noreferrer"
			><span
				>{language.locale === 'en'
					? 'See you at your next idea.'
					: 'Nos vemos en tu próxima idea.'}</span
			><span aria-hidden="true">↗</span></a
		>
		<div class="footer-grid">
			<div class="footer-brand">
				<a class="brand" href="/"
					><img src="/assets/derived/wgn-logo-420.webp" alt="" width="420" height="420" /><span
						><strong>WE’VE GOT NOW</strong><small>AI Tools Explorers Night</small></span
					></a
				>
				<p>
					{language.locale === 'en'
						? 'A place for curious people, useful ideas, and the things we learn together.'
						: 'Un espacio para personas curiosas, ideas útiles y lo que aprendemos juntos.'}
				</p>
				<button
					class="footer-language"
					type="button"
					onclick={() => language.toggle()}
					aria-label={language.locale === 'en'
						? 'Idioma del sitio: español'
						: 'Site language: English'}
					>EN <span aria-hidden="true">/</span> ES <span aria-hidden="true">↗</span></button
				>
			</div>
			<div>
				<h2>{language.locale === 'en' ? 'Find your next step' : 'Encuentra tu siguiente paso'}</h2>
				{#each links as link}<a href={link[0]}>{link[language.locale === 'en' ? 1 : 2]}</a>{/each}
			</div>
			<div>
				<h2>{language.locale === 'en' ? 'Stay connected' : 'Sigamos conectados'}</h2>
				<a href={MEETUP_URL} target="_blank" rel="noreferrer">Meetup ↗</a><a
					href={LINKEDIN_URL}
					target="_blank"
					rel="noreferrer">LinkedIn ↗</a
				><a href="/privacy">{language.locale === 'en' ? 'Privacy' : 'Privacidad'}</a><a
					href="/terms">{language.locale === 'en' ? 'Terms' : 'Términos'}</a
				><a href="/code-of-conduct"
					>{language.locale === 'en' ? 'Community guidelines' : 'Código de conducta'}</a
				><a href="/legacy-receipt"
					>{language.locale === 'en' ? 'Earlier links' : 'Enlaces anteriores'}</a
				>{#if page.data.chatMode === 'disabled'}<details class="chat-availability">
						<summary>{language.locale === 'en' ? 'Chat unavailable' : 'Chat no disponible'}</summary
						>
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
		<div class="footer-bottom">
			<span>© 2026 We’ve Got Now</span><span
				>{language.locale === 'en'
					? 'Learn · Build · Share · Connect'
					: 'Aprende · Crea · Comparte · Conecta'}</span
			>
		</div>
	</div>
</footer>
