<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import IntakeForm from '$lib/components/IntakeForm.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { images, tracks } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
</script>

<Seo
	title={{ en: 'Careers and contribution', es: 'Carreras y colaboración' }}
	description={{
		en: 'Review five contribution tracks and share an expression of interest; no paid opening or offer is currently confirmed.',
		es: 'Conoce cinco áreas de colaboración y comparte tu interés; no hay vacantes pagadas ni ofertas confirmadas.'
	}}
	path="/careers"
/>
<PageIntro
	eyebrow={{ en: 'Expressions of interest', es: 'Expresiones de interés' }}
	title={{
		en: 'Bring your skills. Build something useful.',
		es: 'Comparte tus habilidades. Crea algo útil.'
	}}
	body={{
		en: 'Interested in practical AI, websites, creative work or community events? Tell us what you want to build and show us something you have made.',
		es: '¿Te interesan la IA práctica, los sitios web, el trabajo creativo o los eventos? Cuéntanos qué te gustaría crear y muéstranos algo que hayas hecho.'
	}}
/>

<section class="shell">
	<ConceptArt base={images.careers.base} alt={images.careers.alt} eager />
</section>

<section class="section shell">
	<div class="pending-box" style="margin-bottom: 2rem">
		<strong
			>{language.locale === 'en'
				? 'These are not confirmed job openings.'
				: 'Estas no son vacantes confirmadas.'}</strong
		>
		<p>
			{language.locale === 'en'
				? 'When a specific opportunity exists, the owner must share the role, scope, schedule and compensation before anyone accepts work.'
				: 'Cuando exista una oportunidad concreta, la persona responsable deberá compartir el rol, alcance, horario y compensación antes de aceptar trabajo.'}
		</p>
	</div>
	<div class="card-grid">
		{#each tracks as track}
			<article class="card">
				<p class="eyebrow">
					{language.locale === 'en' ? 'Contribution track' : 'Área de colaboración'}
				</p>
				<h2 style="font-size: 1.5rem">{track.title[language.locale]}</h2>
				<p>
					<strong
						>{language.locale === 'en'
							? 'What you could help build'
							: 'En qué podrías contribuir'}</strong
					><br />{track.build[language.locale]}
				</p>
				<p>
					<strong>{language.locale === 'en' ? 'What to share' : 'Qué puedes compartir'}</strong><br
					/>{track.share[language.locale]}
				</p>
			</article>
		{/each}
	</div>
	<p class="lede" style="margin-top: 2rem">
		{language.locale === 'en'
			? 'You do not need to know every tool. Show how you learn, communicate and finish useful work. A small personal project is a good place to begin.'
			: 'No necesitas conocer todas las herramientas. Muestra cómo aprendes, te comunicas y terminas un trabajo útil. Un pequeño proyecto personal es un buen comienzo.'}
	</p>
</section>

<section class="section shell"><IntakeForm formType="careers_interest" /></section>
