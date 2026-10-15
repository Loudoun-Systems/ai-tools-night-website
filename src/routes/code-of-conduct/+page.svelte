<script lang="ts">
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
</script>

<Seo
	title={{ en: 'Code of conduct', es: 'Código de conducta' }}
	description={{
		en: 'Community expectations for welcoming, harassment-free events and responsible handling of people, recordings and data.',
		es: 'Expectativas para eventos acogedores y sin acoso, y para el manejo responsable de personas, grabaciones y datos.'
	}}
	path="/code-of-conduct"
/>
<PageIntro
	eyebrow={{ en: 'Community expectations', es: 'Expectativas de la comunidad' }}
	title={{ en: 'Curiosity with respect.', es: 'Curiosidad con respeto.' }}
	body={{
		en: 'We want events and online spaces where people can learn, build and share without harassment or pressure.',
		es: 'Queremos eventos y espacios en línea donde las personas puedan aprender, crear y compartir sin acoso ni presión.'
	}}
/>
<article class="shell legal">
	<h2>{language.locale === 'en' ? 'Be welcoming' : 'Da la bienvenida'}</h2>
	<p>
		{language.locale === 'en'
			? 'Respect different backgrounds, identities, roles and experience levels. Listen actively, make room for questions and criticize ideas without attacking people.'
			: 'Respeta distintos orígenes, identidades, roles y niveles de experiencia. Escucha, da espacio a preguntas y critica ideas sin atacar a personas.'}
	</p>
	<h2>{language.locale === 'en' ? 'No harassment or pressure' : 'Sin acoso ni presión'}</h2>
	<p>
		{language.locale === 'en'
			? 'Harassment, discrimination, threats, unwanted sexual attention, repeated disruption and pressure to share contact or private information are not acceptable.'
			: 'No se aceptan acoso, discriminación, amenazas, atención sexual no deseada, interrupciones repetidas ni presión para compartir contacto o información privada.'}
	</p>
	<h2>
		{language.locale === 'en' ? 'Protect people and data' : 'Protege a las personas y sus datos'}
	</h2>
	<p>
		{language.locale === 'en'
			? 'Ask before recording or sharing someone else’s work or image. Use sample or redacted material in demonstrations. Do not expose credentials, customer data or confidential work.'
			: 'Pide permiso antes de grabar o compartir el trabajo o imagen de otra persona. Usa material ficticio o redactado. No expongas credenciales, datos de clientes ni trabajo confidencial.'}
	</p>
	<h2>{language.locale === 'en' ? 'Raise a concern' : 'Reporta una inquietud'}</h2>
	<p>
		{language.locale === 'en'
			? 'Contact hello@aitoolsexplorers.com. Organizers may remove content or participants when needed to protect the community.'
			: 'Escribe a hello@aitoolsexplorers.com. Las personas organizadoras pueden retirar contenido o participantes para proteger a la comunidad.'}
	</p>
</article>
