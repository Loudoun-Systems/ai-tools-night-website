<script lang="ts">
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
</script>

<Seo
	title={{ en: 'Terms of use', es: 'Términos de uso' }}
	description={{
		en: 'Read plain-language staging terms covering pending event details, expressions of interest and responsible use.',
		es: 'Lee los términos del entorno de prueba sobre eventos pendientes, expresiones de interés y uso responsable.'
	}}
	path="/terms"
/>
<PageIntro
	eyebrow={{
		en: 'Draft for review · October 14, 2026',
		es: 'Borrador para revisión · 14 de octubre de 2026'
	}}
	title={{ en: 'Terms of use', es: 'Términos de uso' }}
	body={{
		en: 'Plain-language staging terms. No payment, refund or ticket rules are introduced here.',
		es: 'Términos sencillos para el entorno de prueba. Aquí no se introducen reglas de pago, reembolso ni entradas.'
	}}
/>
<article class="shell legal">
	<h2>{language.locale === 'en' ? 'Informational staging site' : 'Sitio informativo de prueba'}</h2>
	<p>
		{language.locale === 'en'
			? 'Content is provided for review and practical learning. Dates, prices, capacity and availability are not confirmed unless a specific event record says so.'
			: 'El contenido se ofrece para revisión y aprendizaje práctico. Fechas, precios, cupos y disponibilidad no están confirmados salvo que un evento específico lo indique.'}
	</p>
	<h2>{language.locale === 'en' ? 'Interest is not acceptance' : 'El interés no es aceptación'}</h2>
	<p>
		{language.locale === 'en'
			? 'Workshop interest does not reserve a seat. Careers interest is not a job application to a confirmed vacancy, employment offer or promise of compensation. A project submission is not an accepted demo slot, prize or promotion commitment.'
			: 'El interés en talleres no reserva un cupo. El interés en carreras no es una solicitud para una vacante confirmada, oferta ni promesa de compensación. Enviar un proyecto no confirma una demo, premio ni promoción.'}
	</p>
	<h2>
		{language.locale === 'en'
			? 'Use information responsibly'
			: 'Usa la información de forma responsable'}
	</h2>
	<p>
		{language.locale === 'en'
			? 'Do not submit secrets, private client data or material you do not have permission to share. Prompt templates and assistant answers require your own review before use.'
			: 'No envíes secretos, datos privados de clientes ni material que no tengas permiso para compartir. Debes revisar los prompts y respuestas antes de usarlos.'}
	</p>
</article>
