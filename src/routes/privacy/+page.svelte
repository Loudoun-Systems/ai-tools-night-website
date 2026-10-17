<script lang="ts">
	import { page } from '$app/state';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
	const production = $derived(page.data.environment === 'production');
</script>

<Seo
	title={{ en: 'Privacy notice', es: 'Aviso de privacidad' }}
	description={{
		en: 'Read the current privacy notice, browser storage details and the status of online submissions and the website assistant.',
		es: 'Consulta el aviso de privacidad, el almacenamiento del navegador y el estado de los envíos y del asistente del sitio.'
	}}
	path="/privacy"
/>
<PageIntro
	eyebrow={{
		en: 'Notice for review · October 17, 2026',
		es: 'Aviso para revisión · 17 de octubre de 2026'
	}}
	title={{ en: 'Privacy notice', es: 'Aviso de privacidad' }}
	body={{
		en: 'This notice describes the current website functionality. It is not a legal certification.',
		es: 'Este aviso describe las funciones actuales del sitio. No es una certificación legal.'
	}}
/>
<article class="shell legal">
	{#if production}
		<h2>
			{language.locale === 'en'
				? 'Online submissions are disabled'
				: 'Los envíos en línea están deshabilitados'}
		</h2>
		<p>
			{language.locale === 'en'
				? 'Website forms and the AI assistant are temporarily unavailable. This release does not accept form submissions or chat questions, send them to Google Sheets or an AI provider, or create submission receipts. Existing community forms and their established workflows are separate from this website intake.'
				: 'Los formularios y el asistente de IA están temporalmente no disponibles. Esta versión no acepta formularios ni preguntas, no los envía a Google Sheets ni a proveedores de IA, y no crea comprobantes. Los formularios existentes de la comunidad y sus procesos son independientes de este formulario del sitio.'}
		</p>
	{:else}
		<h2>{language.locale === 'en' ? 'Staging and fixture mode' : 'Entorno de prueba'}</h2>
		<p>
			{language.locale === 'en'
				? 'Forms create labelled fixture receipts without external calls. Local SQLite stores idempotency records, request hashes and rate-limit metadata, not the submitted form fields in fixture mode. QA Sheets mode requires labelled synthetic staging records, scoped credentials and verified automation exclusions; it is not production lead collection.'
				: 'Los formularios crean comprobantes de prueba sin llamadas externas. SQLite guarda registros de idempotencia, hashes y límites, no los campos enviados en modo de prueba. El modo QA de Sheets requiere registros ficticios etiquetados, credenciales limitadas y exclusiones verificadas; no recopila contactos de producción.'}
		</p>
	{/if}
	<h2>
		{language.locale === 'en'
			? 'Assistant and browser storage'
			: 'Asistente y almacenamiento del navegador'}
	</h2>
	<p>
		{production
			? language.locale === 'en'
				? 'The browser remembers your EN/ES preference in localStorage. The website assistant does not generate answers or make model calls in this release. Hosting and security infrastructure may process normal request metadata; no analytics or advertising tracker is enabled by this application.'
				: 'El navegador recuerda tu preferencia EN/ES en localStorage. El asistente no genera respuestas ni llama a modelos en esta versión. La infraestructura de alojamiento y seguridad puede procesar metadatos normales de solicitudes; esta aplicación no habilita analítica ni rastreadores publicitarios.'
			: language.locale === 'en'
				? 'The fixture assistant uses local public facts and makes no model calls. Do not send private information. The browser stores the EN/ES preference and fixture receipt identifiers in localStorage. No analytics or advertising tracker is enabled by this application.'
				: 'El asistente de prueba usa datos públicos locales y no llama a modelos. No envíes información privada. El navegador guarda la preferencia EN/ES y los identificadores de comprobantes de prueba. Esta aplicación no habilita analítica ni rastreadores publicitarios.'}
	</p>
	<h2>{language.locale === 'en' ? 'Retention and contact' : 'Retención y contacto'}</h2>
	<p>
		{language.locale === 'en'
			? 'Retention arrangements remain under review, and production website intake remains disabled. For privacy questions, use the established community contact at hello@aitoolsexplorers.com.'
			: 'Los plazos de retención siguen en revisión y los formularios de producción permanecen deshabilitados. Para preguntas de privacidad, usa hello@aitoolsexplorers.com.'}
	</p>
</article>
