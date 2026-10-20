<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import HeroArt from '$lib/components/HeroArt.svelte';
	import CommunityInvite from '$lib/components/CommunityInvite.svelte';
	import IntakeForm from '$lib/components/IntakeForm.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { events, images, nextConfirmedEvent, text } from '$lib/content';
	import copy from '$lib/r6-copy.json';
	import { useLanguage } from '$lib/language.svelte';
	import type { Localized } from '$lib/types';
	const language = useLanguage();
	const c = copy.home;
	const nextEvent = nextConfirmedEvent(events);
	const t = (value: Localized) => text(value, language.locale);
	const principles = [
		{
			title: { en: 'Try something.', es: 'Prueba algo.' },
			body: {
				en: 'Explore a practical use for AI. Keep the question small enough to answer.',
				es: 'Explora un uso práctico de la IA. Empieza con una pregunta que puedas resolver.'
			}
		},
		{
			title: { en: 'Make it yours.', es: 'Hazlo tuyo.' },
			body: {
				en: 'Bring your own task into the process. Learn what helps and what still needs checking.',
				es: 'Trabaja con una tarea tuya. Descubre qué funciona y qué necesita más revisión.'
			}
		},
		{
			title: { en: 'Pass it on.', es: 'Compártelo.' },
			body: {
				en: 'Share the useful part. Your next conversation might help someone take their first step.',
				es: 'Comparte lo que te sirvió. Tu próxima conversación puede ayudar a alguien a empezar.'
			}
		}
	];
</script>

<Seo
	title={{ en: 'Make room for your next idea', es: 'Dale espacio a tu próxima idea' }}
	description={c.lead}
	path="/"
/>
<section class="hero">
	<div class="shell">
		<div class="hero-grid">
			<div class="hero-copy">
				<p class="eyebrow">{t(c.eyebrow)}</p>
				<h1>
					{#if language.locale === 'en'}<span>Make room</span>{' '}<span
							>for your <em>next</em></span
						>{' '}<em>idea.</em>{:else}<span>Dale espacio</span>{' '}<span
							>a tu <em>próxima</em></span
						>{' '}<em>idea.</em>{/if}
				</h1>
				<p class="lede">{t(c.lead)}</p>
				<div class="button-row">
					<a class="button primary" href="/workshops"
						>{t(c.primaryCta)}<span aria-hidden="true">↗</span></a
					><a class="button secondary" href="/about">{t(c.secondaryCta)}</a>
				</div>
				<p class="hero-hint">
					{language.locale === 'en'
						? 'A place to learn, build, share, and connect.'
						: 'Un espacio para aprender, crear, compartir y conectar.'}
				</p>
			</div>
			<HeroArt />
		</div>
		<div class="hero-baseline">
			<span
				>{language.locale === 'en'
					? 'LEARN. BUILD. SHARE. CONNECT.'
					: 'APRENDE. CREA. COMPARTE. CONECTA.'}</span
			><span
				>{language.locale === 'en'
					? 'Practical AI. Human connections.'
					: 'IA práctica. Conexiones humanas.'}</span
			><span
				>{language.locale === 'en'
					? 'Everyone starts somewhere ↗'
					: 'Todos empezamos por algo ↗'}</span
			>
		</div>
	</div>
</section>
<section class="chapter">
	<div class="shell">
		<div class="manifesto-grid">
			<div>
				<p class="eyebrow">
					{language.locale === 'en'
						? '01 / A LITTLE LESS WATCHING. A LITTLE MORE DOING.'
						: '01 / MENOS MIRAR. MÁS HACER.'}
				</p>
				<h2>
					{language.locale === 'en'
						? 'Good ideas get better when we work on them together.'
						: 'Las buenas ideas mejoran cuando las trabajamos juntos.'}
				</h2>
			</div>
			<p>
				{language.locale === 'en'
					? 'You don’t need to know every tool or have the perfect prompt. Bring a question, a useful task, or a bit of curiosity. We’ve Got Now is a community for making the next step feel possible.'
					: 'No necesitas conocer todas las herramientas ni tener el prompt perfecto. Trae una pregunta, una tarea útil o un poco de curiosidad. We’ve Got Now es una comunidad para hacer posible el siguiente paso.'}
			</p>
		</div>
		<ol class="principles">
			{#each principles as principle, i}<li>
					<span class="index">0{i + 1}</span>
					<h3>{t(principle.title)}</h3>
					<p>{t(principle.body)}</p>
				</li>{/each}
		</ol>
	</div>
</section>
<section class="chapter workshop-feature">
	<div class="shell split">
		<ConceptArt base={images.workshops.base} alt={images.workshops.alt} />
		<div class="editorial-copy">
			<p class="eyebrow">
				{language.locale === 'en'
					? '02 / LESS THEORY. MORE TRYING.'
					: '02 / MENOS TEORÍA. MÁS PRÁCTICA.'}
			</p>
			<h2>{t(c.workshopTitle)}</h2>
			<p>{t(c.workshopBody)}</p>
			<div class="quiet-meta">
				<span
					><small>{language.locale === 'en' ? 'DATES' : 'FECHAS'}</small>{language.locale === 'en'
						? 'To be announced'
						: 'Por anunciar'}</span
				><span
					><small>{language.locale === 'en' ? 'PRICING' : 'PRECIO'}</small>{language.locale === 'en'
						? 'To be announced'
						: 'Por anunciar'}</span
				>
			</div>
			<a class="button dark-button" href="/workshops"
				>{language.locale === 'en' ? 'Explore the workshop plan' : 'Conoce el plan del taller'}<span
					aria-hidden="true">↗</span
				></a
			>
		</div>
	</div>
</section>
<section class="chapter">
	<div class="shell">
		<div class="section-header">
			<div>
				<p class="eyebrow">
					{language.locale === 'en' ? '03 / WHAT’S TAKING SHAPE' : '03 / LO QUE ESTAMOS PREPARANDO'}
				</p>
				<h2>
					{language.locale === 'en' ? 'A reason to get together.' : 'Una razón para encontrarnos.'}
				</h2>
			</div>
			<p>
				{language.locale === 'en'
					? 'Community meetups and hands-on workshops are separate experiences.'
					: 'Los encuentros de la comunidad y los talleres prácticos son experiencias distintas.'}
			</p>
		</div>
		<a class="event-strip" href={nextEvent ? `/events/${nextEvent.slug}` : '/events'}
			><div>
				<p class="eyebrow">
					{language.locale === 'en' ? 'COMMUNITY MEETUP' : 'ENCUENTRO COMUNITARIO'}
				</p>
				<small>{nextEvent ? t(nextEvent.title) : t(copy.events.pending)}</small>
			</div>
			<div>
				<strong>AI Tools Explorers Night</strong>
				<p>
					{language.locale === 'en'
						? 'Useful demos, open questions, and conversations with people who build.'
						: 'Demos útiles, preguntas abiertas y conversaciones con personas que crean.'}
				</p>
			</div>
			<span class="arrow" aria-hidden="true">↗</span></a
		>
	</div>
</section>
<section class="chapter alt">
	<div class="shell">
		<div class="section-header">
			<div>
				<p class="eyebrow">
					{language.locale === 'en' ? '04 / FOLLOW YOUR CURIOSITY' : '04 / SIGUE TU CURIOSIDAD'}
				</p>
				<h2>{t(c.resourcesTitle)}</h2>
			</div>
			<p>
				{language.locale === 'en'
					? 'A few starting points. Take the one that feels right for you.'
					: 'Algunos puntos de partida. Elige el que más te sirva.'}
			</p>
		</div>
		<div class="resource-mosaic">
			<a class="resource-tile large" href="/prompt-library"
				><div>
					<p class="eyebrow">
						{language.locale === 'en' ? 'PROMPT LIBRARY' : 'BIBLIOTECA DE PROMPTS'}
					</p>
					<h3>
						{language.locale === 'en'
							? 'Start with the task. Make the prompt your own.'
							: 'Empieza con la tarea. Haz tuyo el prompt.'}
					</h3>
					<p>
						{language.locale === 'en'
							? 'Editable starters for notes, writing, learning, and everyday workflows.'
							: 'Plantillas editables para notas, escritura, aprendizaje y tareas cotidianas.'}
					</p>
					<span class="tile-link"
						>{language.locale === 'en'
							? 'Open the prompt library ↗'
							: 'Abre la biblioteca de prompts ↗'}</span
					>
				</div>
				<ConceptArt base={images.prompts.base} alt={images.prompts.alt} /></a
			>
			<a class="resource-tile" href="/careers"
				><div>
					<p class="eyebrow">
						{language.locale === 'en' ? 'CAREERS & CONTRIBUTIONS' : 'CARRERAS Y COLABORACIÓN'}
					</p>
					<h3>
						{language.locale === 'en' ? 'Find a way to contribute.' : 'Encuentra cómo aportar.'}
					</h3>
					<p>
						{language.locale === 'en'
							? 'Explore skills, roles, and small starting points. These are not job offers.'
							: 'Explora habilidades, roles y formas de empezar. No son ofertas de empleo.'}
					</p>
					<span class="tile-link"
						>{language.locale === 'en'
							? 'Explore contribution areas ↗'
							: 'Explora áreas de colaboración ↗'}</span
					>
				</div>
				<ConceptArt base={images.careers.base} alt={images.careers.alt} /></a
			>
			<a class="resource-tile sage" href="/projects"
				><div>
					<p class="eyebrow">
						{language.locale === 'en' ? 'COMMUNITY PROJECTS' : 'PROYECTOS DE LA COMUNIDAD'}
					</p>
					<h3>
						{language.locale === 'en' ? 'See an idea take shape.' : 'Ve cómo toma forma una idea.'}
					</h3>
					<p>
						{language.locale === 'en'
							? 'Learn from what people try, make, and share.'
							: 'Aprende de lo que las personas prueban, crean y comparten.'}
					</p>
					<span class="tile-link"
						>{language.locale === 'en'
							? 'Open community projects ↗'
							: 'Explora los proyectos ↗'}</span
					>
				</div>
				<ConceptArt base={images.projects.base} alt={images.projects.alt} /></a
			>
		</div>
	</div>
</section>
<section class="chapter dark community-feature">
	<div class="shell split">
		<ConceptArt base={images.about.base} alt={images.about.alt} />
		<div class="editorial-copy">
			<p class="eyebrow">
				{language.locale === 'en' ? '05 / BETTER, TOGETHER' : '05 / MEJOR EN COMUNIDAD'}
			</p>
			<h2>
				{language.locale === 'en'
					? 'You don’t have to figure it all out alone.'
					: 'No tienes que descubrirlo todo a solas.'}
			</h2>
			<p>
				{language.locale === 'en'
					? 'We’ve Got Now is about the people around the tools. Ask the question. Share the rough version. Make space for someone else’s perspective.'
					: 'We’ve Got Now trata de las personas que usan las herramientas. Haz la pregunta. Comparte el primer intento. Dale espacio a otra perspectiva.'}
			</p>
			<a class="text-link" href="/about"
				>{language.locale === 'en' ? 'Find where you fit in' : 'Encuentra tu lugar'}<span
					aria-hidden="true">↗</span
				></a
			>
		</div>
	</div>
</section>
<CommunityInvite />
<section id="join" class="section shell">
	<div id="join-form"><IntakeForm formType="community" /></div>
</section>
