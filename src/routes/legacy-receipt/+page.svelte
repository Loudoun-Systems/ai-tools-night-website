<script lang="ts">
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
	const title = {
		en: 'Check the original form for confirmation.',
		es: 'Revisa el formulario original para confirmar.'
	};
	const description = {
		en: 'This return page cannot verify whether a legacy Google Form or another external service accepted your information.',
		es: 'Esta página no puede verificar si un formulario anterior de Google u otro servicio externo aceptó tu información.'
	};
</script>

<Seo {title} {description} path="/legacy-receipt" />
<PageIntro
	eyebrow={{ en: 'A NOTE ABOUT EARLIER LINKS', es: 'UNA NOTA SOBRE ENLACES ANTERIORES' }}
	{title}
	body={description}
/>
<section class="shell legacy-return">
	<span class="legacy-symbol" aria-hidden="true">↩</span>
	<div>
		<p class="eyebrow">
			{language.locale === 'en'
				? 'THE ORIGINAL SERVICE IS THE SOURCE'
				: 'CONSULTA EL SERVICIO ORIGINAL'}
		</p>
		<h2>
			{language.locale === 'en'
				? 'No new receipt was created here.'
				: 'Aquí no se creó un comprobante nuevo.'}
		</h2>
		<p>
			{language.locale === 'en'
				? 'Use the confirmation shown by the original form as the source of truth. This page did not resend your information, reserve a place, or create another submission.'
				: 'Usa la confirmación del formulario original como referencia. Esta página no volvió a enviar tu información, no reservó ningún cupo ni creó otro envío.'}
		</p>
		<div class="button-row">
			<a class="button dark-button" href="/"
				>{language.locale === 'en' ? 'Return home' : 'Volver al inicio'} ↗</a
			><a class="text-link" href="/events"
				>{language.locale === 'en' ? 'Explore community events' : 'Explora los encuentros'} ↗</a
			>
		</div>
	</div>
</section>
