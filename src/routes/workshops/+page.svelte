<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import CommunityInvite from '$lib/components/CommunityInvite.svelte';
	import IntakeForm from '$lib/components/IntakeForm.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { images, text } from '$lib/content';
	import copy from '$lib/r6-copy.json';
	import { useLanguage } from '$lib/language.svelte';
	import type { Localized } from '$lib/types';
	const language = useLanguage();
	const c = copy.workshops;
	const t = (v: Localized) => text(v, language.locale);
	const flowArt = [images.events, images.workshops, images.projects];
	const flowTitles = [
		{ en: 'Start with a question.', es: 'Empieza con una pregunta.' },
		{ en: 'Try an approach.', es: 'Prueba una forma de hacerlo.' },
		{ en: 'Keep the useful part.', es: 'Quédate con lo que sirve.' }
	];
	const flowBodies = [
		{
			en: 'Choose one task worth understanding. Use a small, useful example to begin.',
			es: 'Elige una tarea que quieras entender mejor. Empieza con un ejemplo pequeño y útil.'
		},
		{
			en: 'Work through the idea with a small, manageable example. Make your judgment part of the loop.',
			es: 'Prueba la idea con un ejemplo manejable. Incorpora tu criterio en cada paso.'
		},
		{
			en: 'Compare what happened with what you expected. Share what helped and what you would change.',
			es: 'Compara el resultado con lo que esperabas. Comparte qué ayudó y qué cambiarías.'
		}
	];
</script>

<Seo
	title={{ en: 'Hands-on AI workshops', es: 'Talleres prácticos de IA' }}
	description={c.lead}
	path="/workshops"
/>
<section class="workshop-opening dark">
	<div class="shell">
		<p class="eyebrow">{t(c.eyebrow)}</p>
		<div class="section-header">
			<h1>{t(c.title)}</h1>
			<div>
				<p class="lede">{t(c.lead)}</p>
				<p class="status-line">{t(c.status)}</p>
			</div>
		</div>
		<ConceptArt base={images.workshops.base} alt={images.workshops.alt} eager />
	</div>
</section>
<section class="chapter">
	<div class="shell workshop-planning">
		<div>
			<p class="eyebrow">{language.locale === 'en' ? 'THE IDEA' : 'LA IDEA'}</p>
			<h2>
				{language.locale === 'en'
					? 'Learn around something that matters to you.'
					: 'Aprende con algo que te importa.'}
			</h2>
			<p class="muted">{t(c.audienceBody)}</p>
			<ol class="learning-list">
				{#each c.learningAreas as area, i}<li>
						<span>0{i + 1}</span>
						<div>
							<h3>{t(area.title)}</h3>
							<p>{t(area.body)}</p>
						</div>
					</li>{/each}
			</ol>
			<p class="muted small">
				{language.locale === 'en'
					? 'Illustrative learning areas only. The final curriculum is not yet confirmed.'
					: 'Áreas de aprendizaje ilustrativas. El programa final aún no está confirmado.'}
			</p>
			<div id="workshop-faq" class="faq-list">
				<p class="eyebrow">
					{language.locale === 'en' ? 'A FEW USEFUL ANSWERS' : 'ALGUNAS RESPUESTAS ÚTILES'}
				</p>
				{#each copy.workshopFaq as faq}<details>
						<summary>{t(faq.q)}</summary>
						<p>{t(faq.a)}</p>
					</details>{/each}
			</div>
		</div>
		<aside
			class="planning-note"
			aria-label={language.locale === 'en'
				? 'Workshop planning status'
				: 'Estado de preparación del taller'}
		>
			<h3>
				{language.locale === 'en' ? 'The details will follow.' : 'Los detalles llegarán pronto.'}
			</h3>
			<dl>
				<dt>{language.locale === 'en' ? 'DATE & TIME' : 'FECHA Y HORA'}</dt>
				<dd>{language.locale === 'en' ? 'To be announced' : 'Por anunciar'}</dd>
				<dt>{language.locale === 'en' ? 'PRICING' : 'PRECIO'}</dt>
				<dd>{language.locale === 'en' ? 'To be announced' : 'Por anunciar'}</dd>
				<dt>{language.locale === 'en' ? 'REGISTRATION' : 'INSCRIPCIONES'}</dt>
				<dd>{language.locale === 'en' ? 'Not open yet' : 'Aún no disponibles'}</dd>
				<dt>{language.locale === 'en' ? 'HOST' : 'ANFITRIÓN'}</dt>
				<dd>Gus Gonzalez · MyGuyGus</dd>
			</dl>
			<p>
				{language.locale === 'en'
					? 'We will publish confirmed details here. No payment, booking or seat reservation is available through this page.'
					: 'Publicaremos los detalles confirmados aquí. Esta página no permite pagar, reservar ni apartar un cupo.'}
			</p>
			<a class="text-link" href="/events"
				>{language.locale === 'en' ? 'Visit the community' : 'Conoce la comunidad'}<span
					aria-hidden="true">↗</span
				></a
			>
		</aside>
	</div>
</section>
<section class="chapter dark">
	<div class="shell">
		<p class="eyebrow">
			{language.locale === 'en' ? 'A POSSIBLE WORKSHOP RHYTHM' : 'UN POSIBLE RECORRIDO DEL TALLER'}
		</p>
		<h2>
			{language.locale === 'en'
				? 'From question to something you can try.'
				: 'De una pregunta a algo que puedas probar.'}
		</h2>
		<div class="flow-grid">
			{#each flowArt as art, i}<article class="flow-item">
					<span class="index">0{i + 1} / {language.locale === 'en' ? 'EXPLORE' : 'EXPLORA'}</span>
					<h3>{t(flowTitles[i])}</h3>
					<p>{t(flowBodies[i])}</p>
					<ConceptArt base={art.base} alt={art.alt} />
				</article>{/each}
		</div>
		<p class="flow-note">{t(c.flowNote)}</p>
	</div>
</section>
<section class="section shell"><IntakeForm formType="workshop_interest" /></section>
<CommunityInvite />
