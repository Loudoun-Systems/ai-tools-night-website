<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import CommunityInvite from '$lib/components/CommunityInvite.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { images, MEETUP_URL, LINKEDIN_URL, text } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	import type { Localized } from '$lib/types';
	const language = useLanguage();
	const t = (v: Localized) => text(v, language.locale);
	const values = [
		{
			verb: { en: 'Learn.', es: 'Aprende.' },
			title: { en: 'Start with a real question.', es: 'Empieza con una pregunta real.' },
			body: {
				en: 'You do not need to know every tool. Bring something you want to understand and make space for a different perspective.',
				es: 'No necesitas conocer todas las herramientas. Trae algo que quieras entender y da espacio a otra perspectiva.'
			}
		},
		{
			verb: { en: 'Build.', es: 'Crea.' },
			title: { en: 'Try the small version.', es: 'Prueba una versión pequeña.' },
			body: {
				en: 'Use a practical example. Test an approach, check the result, and keep your own judgment in the process.',
				es: 'Usa un ejemplo práctico. Prueba una idea, revisa el resultado e incorpora tu criterio en el proceso.'
			}
		},
		{
			verb: { en: 'Share.', es: 'Comparte.' },
			title: { en: 'Tell the useful part.', es: 'Cuenta lo que sirve.' },
			body: {
				en: 'A lesson is worth sharing even when an experiment does not go to plan. Be clear about what worked and what remains uncertain.',
				es: 'Un aprendizaje merece compartirse aunque la prueba no salga como esperabas. Explica qué funcionó y qué sigue sin estar claro.'
			}
		},
		{
			verb: { en: 'Connect.', es: 'Conecta.' },
			title: { en: 'Leave room for people.', es: 'Dale espacio a las personas.' },
			body: {
				en: 'Welcome different backgrounds and starting points. Listen carefully, ask thoughtfully, and make it easier for someone else to join in.',
				es: 'Recibe distintas historias y puntos de partida. Escucha con atención, pregunta con respeto y facilita que otra persona participe.'
			}
		}
	];
</script>

<Seo
	title={{ en: 'Our community', es: 'Nuestra comunidad' }}
	description={{
		en: 'We’ve Got Now is a community for practical AI exploration, useful experiments and people learning together.',
		es: 'We’ve Got Now es una comunidad para explorar usos prácticos de IA, probar ideas útiles y aprender juntos.'
	}}
	path="/about"
/>
<section class="chapter route-about-opening">
	<div class="shell">
		<p class="eyebrow">
			{language.locale === 'en'
				? 'WE’VE GOT NOW / THE PEOPLE AROUND THE TOOLS'
				: 'WE’VE GOT NOW / LAS PERSONAS QUE USAN LAS HERRAMIENTAS'}
		</p>
		<div class="route-about-title">
			<h1>
				{language.locale === 'en'
					? 'The future feels closer when we build it together.'
					: 'El futuro se siente más cerca cuando creamos juntos.'}
			</h1>
			<p class="lede">
				{language.locale === 'en'
					? 'A place for curious people, practical ideas, and the confidence that grows when someone says: let’s try it.'
					: 'Un espacio para personas curiosas, ideas prácticas y la confianza que nace cuando alguien dice: vamos a probar.'}
			</p>
		</div>
		<div class="route-about-image">
			<ConceptArt base={images.about.base} alt={images.about.alt} eager />
			<div class="route-about-image-label" aria-hidden="true">LEARN · BUILD · SHARE · CONNECT</div>
		</div>
	</div>
</section>
<section class="chapter route-about-statement">
	<div class="shell route-about-manifesto">
		<p class="eyebrow">{language.locale === 'en' ? 'THE IDEA IS SIMPLE' : 'LA IDEA ES SENCILLA'}</p>
		<div>
			<h2>
				{language.locale === 'en'
					? 'You can start with a question.'
					: 'Puedes empezar con una pregunta.'}
			</h2>
			<div class="route-about-prose">
				<p>
					{language.locale === 'en'
						? 'AI Tools Explorers Night brings together practical demonstrations, thoughtful questions and people who want to understand what the tools can help them do. You do not have to arrive with all the answers.'
						: 'AI Tools Explorers Night reúne demostraciones prácticas, preguntas útiles y personas que quieren entender qué pueden hacer con estas herramientas. No necesitas llegar con todas las respuestas.'}
				</p>
				<p>
					{language.locale === 'en'
						? 'Bring something you want to learn. Share something you tried. Listen to another way of looking at the same task. Useful connections often start there.'
						: 'Trae algo que quieras aprender. Comparte algo que hayas probado. Escucha otra forma de ver la misma tarea. Las conexiones útiles suelen empezar ahí.'}
				</p>
			</div>
		</div>
	</div>
</section>
<section class="chapter">
	<div class="shell">
		<div class="section-header">
			<div>
				<p class="eyebrow">{language.locale === 'en' ? 'HOW WE SHOW UP' : 'CÓMO PARTICIPAMOS'}</p>
				<h2>
					{language.locale === 'en'
						? 'Four verbs. A shared way forward.'
						: 'Cuatro verbos. Un camino compartido.'}
				</h2>
			</div>
			<a class="text-link" href="/code-of-conduct"
				>{language.locale === 'en' ? 'Community guidelines' : 'Código de conducta'} ↗</a
			>
		</div>
		<div class="route-about-values">
			{#each values as value, index}<article>
					<span class="route-about-value-number">0{index + 1}</span>
					<p class="route-about-verb">{t(value.verb)}</p>
					<div>
						<h3>{t(value.title)}</h3>
						<p>{t(value.body)}</p>
					</div>
				</article>{/each}
		</div>
	</div>
</section>
<section class="chapter route-about-formats">
	<div class="shell">
		<p class="eyebrow">
			{language.locale === 'en' ? 'TWO WAYS TO TAKE PART' : 'DOS FORMAS DE PARTICIPAR'}
		</p>
		<div class="route-about-format-grid">
			<article>
				<span class="route-about-format-label"
					>{language.locale === 'en' ? 'THE CONVERSATION' : 'LA CONVERSACIÓN'}</span
				>
				<h2>AI Tools Explorers Night</h2>
				<p>
					{language.locale === 'en'
						? 'Community meetups make room for demos, questions and practical connections. Follow the community for confirmed event details.'
						: 'Los encuentros de la comunidad ofrecen demos, preguntas y conexiones prácticas. Sigue a la comunidad para conocer los eventos confirmados.'}
				</p>
				<div class="button-row">
					<a class="button primary" href={MEETUP_URL} target="_blank" rel="noreferrer">Meetup ↗</a
					><a class="text-link" href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn ↗</a>
				</div>
			</article>
			<article>
				<span class="route-about-format-label"
					>{language.locale === 'en' ? 'THE PRACTICE' : 'LA PRÁCTICA'}</span
				>
				<h2>{language.locale === 'en' ? 'MyGuyGus workshops' : 'Talleres de MyGuyGus'}</h2>
				<p>
					{language.locale === 'en'
						? 'A separate hands-on format is being planned around useful everyday tasks. Dates, pricing, capacity and registration remain pending.'
						: 'Se prepara un formato práctico y distinto para trabajar con tareas cotidianas. La fecha, precio, cupos e inscripción siguen pendientes.'}
				</p>
				<a class="text-link" href="/workshops"
					>{language.locale === 'en' ? 'Explore the workshop plan' : 'Conoce el plan del taller'} ↗</a
				>
			</article>
		</div>
	</div>
</section>
<CommunityInvite />

<style>
	.route-about-title {
		display: grid;
		grid-template-columns: minmax(0, 1.6fr) minmax(0, 0.8fr);
		gap: clamp(2rem, 5vw, 6rem);
		align-items: end;
		margin: 2rem 0 4rem;
	}
	.route-about-title h1 {
		max-width: 17ch;
	}
	.route-about-title .lede {
		padding-bottom: 0.5rem;
	}
	.route-about-image {
		position: relative;
	}
	.route-about-image :global(.concept-art) {
		margin: 0;
	}
	.route-about-image-label {
		position: absolute;
		bottom: 3rem;
		left: 2rem;
		right: 2rem;
		display: flex;
		justify-content: center;
		padding: 0.8rem 1rem;
		font-size: 0.65rem;
		letter-spacing: 0.22em;
		color: #fff;
		pointer-events: none;
		text-shadow: 0 1px 12px #050714;
	}
	.route-about-statement {
		background: #f4f1e9;
		color: #172033;
	}
	.route-about-manifesto {
		display: grid;
		grid-template-columns: minmax(0, 0.55fr) minmax(0, 1.5fr);
		gap: 4rem;
	}
	.route-about-manifesto > .eyebrow {
		color: #596174;
		margin-top: 0.5rem;
	}
	.route-about-manifesto h2 {
		max-width: 18ch;
		margin-bottom: 2.5rem;
	}
	.route-about-prose {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2.5rem;
	}
	.route-about-prose p {
		font-size: 1rem;
		color: #596174;
	}
	.route-about-values {
		margin-top: 3rem;
	}
	.route-about-values article {
		display: grid;
		grid-template-columns: 2rem minmax(0, 0.8fr) minmax(0, 1.35fr);
		gap: 2rem;
		align-items: start;
		border-top: 1px solid var(--line);
		padding: 2.5rem 0;
	}
	.route-about-value-number {
		font-size: 0.75rem;
		color: var(--muted);
		padding-top: 0.75rem;
	}
	.route-about-verb {
		font-size: clamp(2rem, 4.5vw, 4rem);
		line-height: 1.1;
		letter-spacing: -0.055em;
		font-weight: 500;
		color: var(--violet);
	}
	.route-about-values h3 {
		font-size: 1.25rem;
		margin-bottom: 0.8rem;
	}
	.route-about-values article > div > p {
		font-size: 1rem;
		color: var(--muted);
		max-width: 52ch;
	}
	.route-about-formats {
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
		background: var(--surface);
	}
	.route-about-format-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(2rem, 7vw, 7rem);
		margin-top: 2.5rem;
	}
	.route-about-format-grid article + article {
		border-left: 1px solid var(--line);
		padding-left: clamp(2rem, 5vw, 5rem);
	}
	.route-about-format-label {
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		color: var(--cyan);
	}
	.route-about-format-grid h2 {
		font-size: clamp(1.6rem, 3vw, 2.5rem);
		margin: 1rem 0 1.5rem;
	}
	.route-about-format-grid p {
		color: var(--muted);
		font-size: 1rem;
	}
	.route-about-format-grid .button-row,
	.route-about-format-grid article > .text-link {
		margin-top: 2rem;
	}
	@media (max-width: 1000px) {
		.route-about-title {
			grid-template-columns: 1fr;
		}
		.route-about-title .lede {
			max-width: 45ch;
		}
		.route-about-manifesto {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		.route-about-prose {
			gap: 2rem;
		}
		.route-about-values article {
			grid-template-columns: 1.5rem minmax(0, 0.75fr) minmax(0, 1.4fr);
			gap: 1.25rem;
		}
		.route-about-format-grid article + article {
			padding-left: 2rem;
		}
	}
	@media (max-width: 650px) {
		.route-about-title {
			margin-bottom: 2.5rem;
		}
		.route-about-title h1 {
			max-width: 17ch;
		}
		.route-about-prose,
		.route-about-format-grid {
			grid-template-columns: 1fr;
		}
		.route-about-image-label {
			position: static;
			margin-top: 1rem;
			color: var(--muted);
			padding: 0;
			letter-spacing: 0.12em;
			font-size: 0.6rem;
		}
		.route-about-values article {
			grid-template-columns: 1.5rem minmax(0, 1fr);
			gap: 1rem;
			padding: 2rem 0;
		}
		.route-about-values article > div {
			grid-column: 2;
		}
		.route-about-value-number {
			padding-top: 0.5rem;
		}
		.route-about-verb {
			font-size: 2.6rem;
		}
		.route-about-format-grid article + article {
			border-left: 0;
			padding-left: 0;
			border-top: 1px solid var(--line);
			padding-top: 2.5rem;
		}
	}
</style>
