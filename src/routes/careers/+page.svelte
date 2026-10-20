<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import IntakeForm from '$lib/components/IntakeForm.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { images, tracks, text } from '$lib/content';
	import copy from '$lib/r6-copy.json';
	import { useLanguage } from '$lib/language.svelte';
	import type { Localized } from '$lib/types';
	const language = useLanguage();
	const t = (v: Localized) => text(v, language.locale);
</script>

<Seo
	title={{ en: 'Careers and contribution', es: 'Carreras y colaboración' }}
	description={copy.careers.lead}
	path="/careers"
/>
<section class="chapter dark contribution-opening">
	<div class="shell split">
		<div>
			<p class="eyebrow">
				{language.locale === 'en' ? 'CAREERS & CONTRIBUTIONS' : 'CARRERAS Y COLABORACIÓN'}
			</p>
			<h1>{t(copy.careers.title)}</h1>
			<p class="lede">{t(copy.careers.lead)}</p>
			<a class="text-link" href="#contribution-areas"
				>{language.locale === 'en'
					? 'Explore the contribution areas'
					: 'Explora las áreas de colaboración'}<span aria-hidden="true">↓</span></a
			>
		</div>
		<ConceptArt base={images.careers.base} alt={images.careers.alt} eager />
	</div>
</section>
<section id="contribution-areas" class="chapter">
	<div class="shell contribution-layout">
		<aside class="contribution-aside">
			<p class="eyebrow">
				{language.locale === 'en' ? 'THERE’S MORE THAN ONE WAY IN' : 'HAY MUCHAS FORMAS DE EMPEZAR'}
			</p>
			<h2>
				{language.locale === 'en'
					? 'Build from what makes you curious.'
					: 'Empieza con lo que despierta tu curiosidad.'}
			</h2>
			<p class="muted">
				{language.locale === 'en'
					? 'You do not need to know every tool. Show how you learn, communicate, and finish something useful. A small personal project is a good place to begin.'
					: 'No necesitas conocer todas las herramientas. Muestra cómo aprendes, te comunicas y terminas algo útil. Un pequeño proyecto personal es un buen comienzo.'}
			</p>
			<p class="contribution-notice">{t(copy.careers.notice)}</p>
		</aside>
		<div class="track-directory">
			{#each tracks as track, index}<details class="contribution-track" open={index === 0}>
					<summary
						><span class="track-number">0{index + 1}</span>
						<h2>{t(track.title)}</h2>
						<span class="track-plus" aria-hidden="true">+</span></summary
					>
					<div class="track-info">
						<div>
							<h3>
								{language.locale === 'en'
									? 'What you could help build'
									: 'En qué podrías contribuir'}
							</h3>
							<p>{t(track.build)}</p>
						</div>
						<div>
							<h3>{language.locale === 'en' ? 'What to share' : 'Qué puedes compartir'}</h3>
							<p>{t(track.share)}</p>
						</div>
					</div>
				</details>{/each}
		</div>
	</div>
</section>
<section class="chapter alt">
	<div class="shell contribution-next">
		<p class="eyebrow">{language.locale === 'en' ? 'A CLEAR START' : 'UN COMIENZO CLARO'}</p>
		<h2>
			{language.locale === 'en'
				? 'Good work starts with clear expectations.'
				: 'El buen trabajo empieza con expectativas claras.'}
		</h2>
		<p>
			{language.locale === 'en'
				? 'When a specific opportunity exists, the owner must share the role, scope, schedule and compensation before anyone accepts work. No role or paid opening is promised here.'
				: 'Cuando exista una oportunidad concreta, la persona responsable deberá compartir el rol, alcance, horario y compensación antes de aceptar trabajo. Aquí no se promete ningún puesto ni vacante remunerada.'}
		</p>
		<a class="text-link" href="/projects"
			>{language.locale === 'en' ? 'Start with a project idea' : 'Empieza con una idea de proyecto'} ↗</a
		>
	</div>
</section>
<section class="section shell"><IntakeForm formType="careers_interest" /></section>
