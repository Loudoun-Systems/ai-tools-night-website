<script lang="ts">
	import { LINKEDIN_URL, MEETUP_URL } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';

	const language = useLanguage();
</script>

<footer class="site-footer">
	<div class="shell footer-grid">
		<div>
			<p class="eyebrow">WE'VE GOT NOW</p>
			<h2>AI Tools Explorers Night</h2>
			<p>
				{language.locale === 'en'
					? 'A community for practical AI learning, building and sharing.'
					: 'Una comunidad para aprender, crear y compartir usos prácticos de IA.'}
			</p>
		</div>
		<div>
			<h3>{language.locale === 'en' ? 'Explore' : 'Explora'}</h3>
			<a href="/events">{language.locale === 'en' ? 'Events' : 'Eventos'}</a>
			<a href="/prompt-library"
				>{language.locale === 'en' ? 'Prompt library' : 'Biblioteca de prompts'}</a
			>
			<a href="/code-of-conduct"
				>{language.locale === 'en' ? 'Code of conduct' : 'Código de conducta'}</a
			>
		</div>
		<div>
			<h3>{language.locale === 'en' ? 'Community' : 'Comunidad'}</h3>
			<a href={MEETUP_URL} target="_blank" rel="noreferrer">Meetup</a>
			<a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
			<a href="/#join"
				>{language.locale === 'en' ? 'Community interest' : 'Interés en la comunidad'}</a
			>
		</div>
		<div>
			<h3>{language.locale === 'en' ? 'Notices' : 'Avisos'}</h3>
			<a href="/privacy">{language.locale === 'en' ? 'Privacy' : 'Privacidad'}</a>
			<a href="/terms">{language.locale === 'en' ? 'Terms' : 'Términos'}</a>
			<p class="small">© 2026 We've Got Now</p>
		</div>
	</div>
</footer>
