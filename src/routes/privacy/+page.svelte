<script lang="ts">
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
</script>

<Seo
	title={{ en: 'Privacy notice', es: 'Aviso de privacidad' }}
	description={{
		en: 'Read what the R5 staging site stores, which fixture calls it does not make and which production privacy decisions remain pending.',
		es: 'Consulta qué guarda el sitio R5 de pruebas, qué llamadas no realiza y qué decisiones de privacidad siguen pendientes.'
	}}
	path="/privacy"
/>
<PageIntro
	eyebrow={{
		en: 'Draft for review · October 14, 2026',
		es: 'Borrador para revisión · 14 de octubre de 2026'
	}}
	title={{ en: 'Privacy notice', es: 'Aviso de privacidad' }}
	body={{
		en: 'This draft describes what the R5 staging site actually does. It is not a legal certification.',
		es: 'Este borrador describe lo que realmente hace el sitio R5 de prueba. No es una certificación legal.'
	}}
/>
<article class="shell legal">
	<h2>{language.locale === 'en' ? 'Staging and fixture mode' : 'Entorno de prueba'}</h2>
	<p>
		{language.locale === 'en'
			? 'By default, forms create a clearly labelled fixture receipt and make no Google, email, CRM or other external call. The server stores an idempotency record, a request hash and rate-limit metadata in local SQLite; it does not store the submitted form fields in fixture mode.'
			: 'Por defecto, los formularios crean un comprobante de prueba y no llaman a Google, correo, CRM ni otros sistemas. El servidor guarda un registro de idempotencia, un hash de la solicitud y límites en SQLite; no guarda los campos del formulario en modo de prueba.'}
	</p>
	<h2>
		{language.locale === 'en'
			? 'If QA Sheets mode is enabled later'
			: 'Si se habilita QA en Sheets'}
	</h2>
	<p>
		{language.locale === 'en'
			? 'Only labelled synthetic test records may be written to an allowlisted Website QA tab after credentials and automation exclusion are verified. Production lead collection and follow-up automation are not active in this staging release.'
			: 'Solo se podrán escribir registros ficticios etiquetados en una pestaña Website QA permitida después de verificar credenciales y exclusión de automatizaciones. La recolección de contactos y seguimientos de producción no está activa.'}
	</p>
	<h2>
		{language.locale === 'en'
			? 'Assistant and browser storage'
			: 'Asistente y almacenamiento del navegador'}
	</h2>
	<p>
		{language.locale === 'en'
			? 'The default assistant uses local public facts and makes no model call. Do not send private information in chat. The browser stores only your EN/ES preference in localStorage. No analytics or advertising tracker is enabled.'
			: 'El asistente usa datos públicos locales y no llama a modelos. No envíes información privada. El navegador solo guarda tu preferencia EN/ES. No hay analítica ni rastreadores publicitarios.'}
	</p>
	<h2>{language.locale === 'en' ? 'Retention and contact' : 'Retención y contacto'}</h2>
	<p>
		{language.locale === 'en'
			? 'Final retention periods are still under review and must be approved before production launch. For questions, use the established community contact at hello@aitoolsexplorers.com.'
			: 'Los periodos finales de retención siguen en revisión y deben aprobarse antes del lanzamiento. Para preguntas, usa hello@aitoolsexplorers.com.'}
	</p>
</article>
