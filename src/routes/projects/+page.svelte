<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import IntakeForm from '$lib/components/IntakeForm.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { images } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
</script>

<Seo
	title={{ en: 'Project and demo sharing', es: 'Proyectos y demostraciones' }}
	description={{
		en: 'Share a project, workflow or demo as an inquiry without a promise of selection, promotion, prize or presentation time.',
		es: 'Comparte un proyecto, flujo o demo como consulta, sin promesa de selección, promoción, premio ni presentación.'
	}}
	path="/projects"
/>
<PageIntro
	eyebrow={{ en: 'Builders welcome', es: 'Bienvenidas las personas que crean' }}
	title={{
		en: 'Built something? Share what you learned.',
		es: '¿Creaste algo? Comparte lo que aprendiste.'
	}}
	body={{
		en: 'Show a project, workflow or in-progress demo. Clear lessons matter more than polish, and you do not need to be an expert to share.',
		es: 'Muestra un proyecto, flujo o demo en progreso. Lo aprendido importa más que el acabado y no necesitas ser experto para compartir.'
	}}
/>

<section class="shell">
	<ConceptArt base={images.projects.base} alt={images.projects.alt} eager />
</section>

<section class="section shell">
	<div class="section-header">
		<div>
			<p class="eyebrow">
				{language.locale === 'en' ? 'A useful submission' : 'Una propuesta útil'}
			</p>
			<h2>
				{language.locale === 'en'
					? 'Give the community enough context.'
					: 'Dale suficiente contexto a la comunidad.'}
			</h2>
		</div>
		<p>
			{language.locale === 'en'
				? 'A submission starts a conversation. It does not guarantee promotion, selection, presentation time, a prize, an internship or a collaborator.'
				: 'Enviar una propuesta inicia una conversación. No garantiza promoción, selección, tiempo de presentación, premio, práctica ni colaborador.'}
		</p>
	</div>
	<div class="card-grid">
		<article class="card">
			<span class="chip">01</span>
			<h3>{language.locale === 'en' ? 'The problem' : 'El problema'}</h3>
			<p>
				{language.locale === 'en'
					? 'What were you trying to make easier, faster or clearer?'
					: '¿Qué intentabas hacer más fácil, rápido o claro?'}
			</p>
		</article>
		<article class="card">
			<span class="chip">02</span>
			<h3>{language.locale === 'en' ? 'The demo or link' : 'La demo o enlace'}</h3>
			<p>
				{language.locale === 'en'
					? 'Share a safe public link when one exists. We treat URLs as data and do not fetch them automatically.'
					: 'Comparte un enlace público seguro cuando exista. Tratamos los enlaces como datos y no los abrimos automáticamente.'}
			</p>
		</article>
		<article class="card">
			<span class="chip">03</span>
			<h3>{language.locale === 'en' ? 'Tools and learning' : 'Herramientas y aprendizaje'}</h3>
			<p>
				{language.locale === 'en'
					? 'Explain what you tried, what worked and what you would change.'
					: 'Explica qué probaste, qué funcionó y qué cambiarías.'}
			</p>
		</article>
	</div>
</section>

<section class="section shell"><IntakeForm formType="project_submission" /></section>
