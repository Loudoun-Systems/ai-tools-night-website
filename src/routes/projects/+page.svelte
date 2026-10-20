<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import IntakeForm from '$lib/components/IntakeForm.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { images, text } from '$lib/content';
	import copy from '$lib/r6-copy.json';
	import { useLanguage } from '$lib/language.svelte';
	import type { Localized } from '$lib/types';
	const language = useLanguage();
	const t = (v: Localized) => text(v, language.locale);
	const notes = [
		{
			title: { en: 'The problem.', es: 'El problema.' },
			body: {
				en: 'What were you trying to make easier, faster, or clearer? Start with the task, not the tool.',
				es: '¿Qué intentabas hacer más fácil, rápido o claro? Empieza con la tarea, no con la herramienta.'
			}
		},
		{
			title: { en: 'The approach.', es: 'La forma de hacerlo.' },
			body: {
				en: 'Explain what you tried. Share a safe public demo or link if you have one, without private information.',
				es: 'Explica qué probaste. Si tienes una demo o un enlace público seguro, compártelo sin información privada.'
			}
		},
		{
			title: { en: 'What you learned.', es: 'Lo que aprendiste.' },
			body: {
				en: 'What worked? What did not? Tell us what you would change next. An honest lesson is useful.',
				es: '¿Qué funcionó? ¿Qué no? Cuenta qué cambiarías la próxima vez. Un aprendizaje honesto es útil.'
			}
		}
	];
</script>

<Seo
	title={{ en: 'Community projects', es: 'Proyectos de la comunidad' }}
	description={copy.projects.lead}
	path="/projects"
/>
<PageIntro
	eyebrow={{ en: 'THE COMMUNITY NOTEBOOK', es: 'EL CUADERNO DE LA COMUNIDAD' }}
	title={copy.projects.title}
	body={copy.projects.lead}
/>
<section class="chapter">
	<div class="shell split project-empty">
		<div>
			<p class="eyebrow">
				{language.locale === 'en' ? 'ROOM FOR A FIRST STORY' : 'ESPACIO PARA UNA PRIMERA HISTORIA'}
			</p>
			<h2>
				{language.locale === 'en'
					? 'Nothing published here yet. Plenty worth trying.'
					: 'Todavía no hay proyectos publicados. Hay mucho por probar.'}
			</h2>
			<p class="muted">
				{language.locale === 'en'
					? 'We will share project stories here when they are reviewed and approved for publication. This illustration is a concept, not a submitted community project.'
					: 'Compartiremos historias de proyectos cuando estén revisadas y aprobadas para publicación. Esta ilustración es conceptual; no es un proyecto enviado por la comunidad.'}
			</p>
			<a class="text-link" href="#project-brief"
				>{language.locale === 'en'
					? 'Prepare your project story'
					: 'Prepara la historia de tu proyecto'}<span aria-hidden="true">↓</span></a
			>
		</div>
		<ConceptArt base={images.projects.base} alt={images.projects.alt} eager />
	</div>
</section>
<section id="project-brief" class="chapter alt">
	<div class="shell project-brief-layout">
		<div>
			<p class="eyebrow">
				{language.locale === 'en' ? 'SMALL IS A GOOD START' : 'EMPEZAR PEQUEÑO ESTÁ BIEN'}
			</p>
			<h2>
				{language.locale === 'en' ? 'Give an idea enough context.' : 'Dale contexto a una idea.'}
			</h2>
			<p class="muted">
				{language.locale === 'en'
					? 'You do not need to be an expert or have a finished product. A clear question and a useful lesson are enough to start a conversation.'
					: 'No necesitas ser experto ni tener un producto terminado. Una pregunta clara y algo útil que hayas aprendido pueden iniciar una conversación.'}
			</p>
		</div>
		<ol class="project-notes">
			{#each notes as note, index}<li>
					<span class="index">0{index + 1}</span>
					<div>
						<h3>{t(note.title)}</h3>
						<p>{t(note.body)}</p>
					</div>
				</li>{/each}
		</ol>
	</div>
</section>
<section class="section shell">
	<p class="project-disclosure">
		{language.locale === 'en'
			? 'A submission starts a conversation. It does not guarantee publication, selection, presentation time, a prize, an internship, or a collaborator.'
			: 'Enviar una propuesta inicia una conversación. No garantiza publicación, selección, presentación, premio, práctica ni colaborador.'}
	</p>
	<IntakeForm formType="project_submission" />
</section>
