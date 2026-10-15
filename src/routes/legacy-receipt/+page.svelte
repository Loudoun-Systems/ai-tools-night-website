<script lang="ts">
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { useLanguage } from '$lib/language.svelte';

	const language = useLanguage();
</script>

<Seo
	title={{ en: 'Legacy form receipt', es: 'Comprobante de formulario anterior' }}
	description={{
		en: "Neutral information for visitors returning from a legacy We've Got Now form.",
		es: 'Información neutral para quienes regresan de un formulario anterior de We’ve Got Now.'
	}}
	path="/legacy-receipt"
/>

<PageIntro
	eyebrow={{ en: 'Legacy form return', es: 'Regreso de formulario anterior' }}
	title={{
		en: 'Check the original form for confirmation.',
		es: 'Revisa el formulario original para confirmar.'
	}}
	body={{
		en: 'This return page cannot verify whether a legacy Google Form or another external service accepted your information.',
		es: 'Esta página no puede verificar si un formulario anterior de Google u otro servicio externo aceptó tu información.'
	}}
/>

<section class="shell section" style="padding-top: 0">
	<div class="detail-panel">
		<h2>
			{language.locale === 'en'
				? 'No new receipt was created here.'
				: 'Aquí no se creó un comprobante nuevo.'}
		</h2>
		<p>
			{language.locale === 'en'
				? 'Use the confirmation shown by the original form as the source of truth. This page did not resend your information.'
				: 'Usa la confirmación del formulario original como referencia. Esta página no volvió a enviar tu información.'}
		</p>
		<a class="button primary" href="/"
			>{language.locale === 'en' ? 'Return home' : 'Volver al inicio'}</a
		>
	</div>
</section>
