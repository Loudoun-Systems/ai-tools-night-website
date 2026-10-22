<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import IntakeForm from '$lib/components/IntakeForm.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { images, tracks, text } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	import type { Localized } from '$lib/types';
	const language = useLanguage();
	const t = (v: Localized) => text(v, language.locale);
	const paths: Record<string, { skills: Localized; project: Localized; question: Localized }> = {
		'web-app': {
			skills: {
				en: 'Clear page structure, accessible interactions, version control, and testing a real visitor task.',
				es: 'Estructura clara de páginas, interacciones accesibles, control de versiones y pruebas de tareas reales.'
			},
			project: {
				en: 'Build a small event page with a usable mobile menu, bilingual copy, and honest pending states. Explain how you tested it.',
				es: 'Crea una página de evento con menú móvil usable, textos bilingües y estados pendientes honestos. Explica cómo la probaste.'
			},
			question: {
				en: 'Can another person use what I built without an explanation?',
				es: '¿Otra persona puede usar lo que creé sin una explicación?'
			}
		},
		'ai-automation': {
			skills: {
				en: 'Mapping a process, structured inputs, clear handoffs, failure handling, and documenting what the workflow changes.',
				es: 'Mapeo de procesos, datos estructurados, entregas claras, manejo de errores y documentación de los cambios del flujo.'
			},
			project: {
				en: 'Map a repetitive task from trigger to result. Prototype it with sample data and show the failure path as well as the happy path.',
				es: 'Mapea una tarea repetitiva desde el inicio hasta el resultado. Crea un prototipo con datos de ejemplo y muestra el manejo de errores.'
			},
			question: {
				en: 'What happens when an input is missing or a service fails?',
				es: '¿Qué ocurre si falta un dato o falla un servicio?'
			}
		},
		'content-media': {
			skills: {
				en: 'Audience awareness, storytelling, visual hierarchy, editing, and a repeatable review process.',
				es: 'Conocimiento de la audiencia, narrativa, jerarquía visual, edición y un proceso de revisión repetible.'
			},
			project: {
				en: 'Turn one practical idea into a short explainer and a matching visual. Include the source, the intended audience, and your editing choices.',
				es: 'Convierte una idea práctica en una explicación breve y una imagen. Incluye la fuente, la audiencia y tus decisiones de edición.'
			},
			question: {
				en: 'What should the viewer understand or do after seeing this?',
				es: '¿Qué debería entender o hacer la persona después de verlo?'
			}
		},
		'community-events': {
			skills: {
				en: 'Welcoming communication, event checklists, accessible materials, logistics, and respectful follow-up.',
				es: 'Comunicación acogedora, listas de preparación, materiales accesibles, logística y seguimiento respetuoso.'
			},
			project: {
				en: 'Prepare a small meetup runbook: arrival, introductions, a demo, questions, and follow-up. Identify which details still need an owner.',
				es: 'Prepara una guía para un encuentro: llegada, presentaciones, demo, preguntas y seguimiento. Indica qué detalles necesitan una persona responsable.'
			},
			question: {
				en: 'Would someone coming for the first time know what to expect?',
				es: '¿Alguien que viene por primera vez sabría qué esperar?'
			}
		},
		'research-enablement': {
			skills: {
				en: 'Finding primary sources, comparing evidence, teaching one task clearly, and recording what remains uncertain.',
				es: 'Buscar fuentes originales, comparar evidencia, enseñar una tarea con claridad y registrar lo que sigue sin confirmarse.'
			},
			project: {
				en: 'Write a practical learning guide for one task. Include a worked example, a check for understanding, sources, and a way to spot mistakes.',
				es: 'Escribe una guía práctica para una tarea. Incluye un ejemplo, una pregunta de comprensión, fuentes y una forma de detectar errores.'
			},
			question: {
				en: 'Can a beginner repeat this and check their own result?',
				es: '¿Una persona principiante puede repetirlo y comprobar su resultado?'
			}
		}
	};
</script>

<Seo
	title={{ en: 'Careers and contribution', es: 'Carreras y colaboración' }}
	description={{
		en: 'Explore practical skills, portfolio ideas and ways to contribute across AI, development, media, research and community.',
		es: 'Explora habilidades, ideas de portafolio y formas de colaborar en IA, desarrollo, medios, investigación y comunidad.'
	}}
	path="/careers"
/>
<section class="chapter route-careers-opening">
	<div class="shell route-careers-hero">
		<div>
			<p class="eyebrow">
				{language.locale === 'en' ? 'CAREERS & CONTRIBUTIONS' : 'CARRERAS Y COLABORACIÓN'}
			</p>
			<h1>
				{language.locale === 'en'
					? 'There’s more than one way to build.'
					: 'Hay muchas formas de crear.'}
			</h1>
			<p class="lede">
				{language.locale === 'en'
					? 'A useful idea needs more than a tool. Explore the skills, questions, and small projects that can become your way in.'
					: 'Una idea útil necesita más que una herramienta. Explora habilidades, preguntas y pequeños proyectos para encontrar tu punto de partida.'}
			</p>
			<a class="text-link" href="#contribution-areas"
				>{language.locale === 'en'
					? 'Explore the contribution areas'
					: 'Explora las áreas de colaboración'} <span aria-hidden="true">↓</span></a
			>
		</div>
		<div class="route-careers-art">
			<ConceptArt base={images.careers.base} alt={images.careers.alt} eager />
			<p class="route-careers-caption">
				{language.locale === 'en'
					? 'Start with what makes you curious. Show what you learn.'
					: 'Empieza con lo que despierta tu curiosidad. Muestra lo que aprendes.'}
			</p>
		</div>
	</div>
</section>
<section id="contribution-areas" class="chapter route-paths">
	<div class="shell route-paths-layout">
		<aside class="route-paths-intro">
			<p class="eyebrow">
				{language.locale === 'en' ? 'FIND YOUR STARTING POINT' : 'ENCUENTRA TU PUNTO DE PARTIDA'}
			</p>
			<h2>
				{language.locale === 'en'
					? 'Make something small. Make it useful.'
					: 'Crea algo pequeño. Hazlo útil.'}
			</h2>
			<p class="muted">
				{language.locale === 'en'
					? 'These are learning and contribution areas, not confirmed paid job openings. Use the starter projects as practice, not an application requirement.'
					: 'Estas son áreas de aprendizaje y colaboración; no son vacantes remuneradas confirmadas. Los proyectos iniciales son ideas para practicar, no requisitos de postulación.'}
			</p>
			<a class="text-link" href="/prompt-library"
				>{language.locale === 'en' ? 'Find a useful prompt' : 'Encuentra un prompt útil'} ↗</a
			>
		</aside>
		<div class="track-directory route-track-directory">
			{#each tracks as track, index}<details
					class="contribution-track route-track"
					open={index === 0}
				>
					<summary
						><span class="route-track-number">0{index + 1}</span>
						<h2>{t(track.title)}</h2>
						<span class="route-track-plus" aria-hidden="true">+</span></summary
					>
					<div class="route-track-body">
						<p class="route-track-overview">{t(track.build)}</p>
						<div class="route-track-columns">
							<div>
								<h3>
									{language.locale === 'en'
										? 'Skills worth practicing'
										: 'Habilidades para practicar'}
								</h3>
								<p>{t(paths[track.id].skills)}</p>
							</div>
							<div>
								<h3>{language.locale === 'en' ? 'What to share' : 'Qué puedes compartir'}</h3>
								<p>{t(track.share)}</p>
							</div>
						</div>
						<div class="route-starter">
							<p class="eyebrow">
								{language.locale === 'en' ? 'A PORTFOLIO STARTER' : 'UNA IDEA PARA TU PORTAFOLIO'}
							</p>
							<p>{t(paths[track.id].project)}</p>
							<p class="route-starter-question">{t(paths[track.id].question)}</p>
						</div>
					</div>
				</details>{/each}
		</div>
	</div>
</section>
<section class="chapter">
	<div class="shell route-careers-next">
		<div>
			<p class="eyebrow">
				{language.locale === 'en' ? 'A CLEAR NEXT STEP' : 'UN SIGUIENTE PASO CLARO'}
			</p>
			<h2>
				{language.locale === 'en' ? 'Show your thinking, too.' : 'Comparte también cómo piensas.'}
			</h2>
		</div>
		<div>
			<p>
				{language.locale === 'en'
					? 'A small project tells a stronger story when you explain the problem, the choices you made, and what you would improve. You do not need to pretend it is finished.'
					: 'Un proyecto pequeño cuenta una historia más clara cuando explicas el problema, tus decisiones y lo que mejorarías. No necesitas fingir que está terminado.'}
			</p>
			<a class="button secondary" href="/projects"
				>{language.locale === 'en' ? 'Explore project ideas' : 'Explora ideas de proyectos'}
				<span aria-hidden="true">↗</span></a
			>
			<p class="small muted">
				{language.locale === 'en'
					? 'Any future work opportunity must state its scope, expectations and compensation before someone accepts it.'
					: 'Cualquier oportunidad futura deberá indicar alcance, expectativas y compensación antes de aceptarla.'}
			</p>
		</div>
	</div>
</section>
<section class="section shell route-careers-interest">
	<IntakeForm formType="careers_interest" />
</section>

<style>
	section.chapter {
		padding-block: 56px;
	}

	.route-careers-hero {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
		gap: clamp(24px, 3vw, 36px);
		align-items: center;
	}
	.route-careers-hero h1 {
		max-width: 12ch;
		margin: 1rem 0 1.75rem;
	}
	.route-careers-hero .text-link {
		margin-top: 2rem;
	}
	.route-careers-art {
		align-self: end;
	}
	.route-careers-caption {
		font-size: 0.85rem;
		max-width: 38ch;
		margin: 14px 0 0;
		color: var(--muted);
	}
	.route-paths {
		--focus-ring: var(--cyan);
		background:
			radial-gradient(ellipse at 0 20%, #7045af26, transparent 60%),
			linear-gradient(135deg, #11172d, #101728);
		color: var(--ink);
		border-block: 1px solid var(--line);
	}
	.route-paths :global(.eyebrow) {
		color: var(--pink, #ff83d4);
	}
	.route-paths :global(.text-link) {
		color: var(--cyan);
	}
	.route-paths-layout {
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.65fr);
		gap: clamp(24px, 3vw, 36px);
		align-items: start;
	}
	.route-paths-intro {
		position: sticky;
		top: 7rem;
	}
	.route-paths-intro h2 {
		max-width: 12ch;
		margin: 1rem 0 1.5rem;
	}
	.route-paths-intro :global(.muted) {
		color: var(--muted);
	}
	.route-paths-intro .text-link {
		margin-top: 1.5rem;
	}
	.route-track {
		border-bottom: 1px solid var(--line);
		padding: 22px 0;
	}
	.route-track:first-child {
		border-top: 1px solid var(--line);
	}
	.route-track summary {
		display: grid;
		grid-template-columns: 2rem minmax(0, 1fr) 2rem;
		gap: 1rem;
		align-items: center;
		cursor: pointer;
		list-style: none;
	}
	.route-track summary::-webkit-details-marker {
		display: none;
	}
	.route-track h2 {
		font-size: clamp(1.25rem, 2vw, 1.8rem);
		margin: 0;
		letter-spacing: -0.03em;
	}
	.route-track-number {
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		color: var(--violet);
	}
	.route-track-plus {
		font-size: 1.7rem;
		text-align: center;
		font-weight: 300;
		transition: transform 0.2s;
	}
	.route-track[open] .route-track-plus {
		transform: rotate(45deg);
	}
	.route-track-body {
		padding: 22px 0 4px 40px;
	}
	.route-track-overview {
		font-size: 1.05rem;
		max-width: 54ch;
	}
	.route-track-columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
		margin: 22px 0;
	}
	.route-track-columns h3 {
		font-size: 0.85rem;
		letter-spacing: 0;
		margin-bottom: 0.65rem;
		font-weight: 700;
	}
	.route-track-columns p {
		font-size: 0.9rem;
		color: var(--muted);
	}
	.route-starter {
		padding: 20px;
		background: linear-gradient(120deg, #7a3e992b, #17354d40);
		border: 1px solid #b981ff3b;
		border-radius: 14px;
	}
	.route-starter > p:not(.eyebrow) {
		font-size: 0.95rem;
		margin-top: 0.8rem;
	}
	.route-starter-question {
		font-weight: 600;
		color: #f1e4ff;
	}
	.route-careers-next {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(24px, 3vw, 40px);
	}
	.route-careers-next h2 {
		max-width: 12ch;
		margin-top: 1rem;
	}
	.route-careers-next .button {
		margin: 2rem 0;
	}
	.route-careers-next .small {
		font-size: 0.85rem;
	}
	@media (max-width: 900px) {
		.route-careers-hero {
			gap: 2rem;
		}
		.route-paths-layout {
			grid-template-columns: 1fr;
		}
		.route-paths-intro {
			position: static;
			max-width: 50ch;
		}
		.route-paths-intro h2 {
			max-width: 20ch;
		}
		.route-track-body {
			padding-left: 3rem;
		}
	}
	@media (max-width: 650px) {
		.route-careers-hero,
		.route-careers-next {
			grid-template-columns: 1fr;
		}
		.route-careers-hero h1 {
			max-width: 14ch;
		}
		.route-careers-art {
			max-width: 100%;
		}
		.route-track summary {
			grid-template-columns: 1.5rem minmax(0, 1fr) 1.5rem;
			gap: 0.6rem;
		}
		.route-track-body {
			padding-left: 0;
		}
		.route-track-columns {
			grid-template-columns: 1fr;
			gap: 1.25rem;
		}
		.route-starter {
			padding: 1.25rem;
		}
		.route-careers-caption {
			margin-left: 0;
		}
		.route-careers-next h2 {
			max-width: 18ch;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.route-track-plus {
			transition: none;
		}
	}

	.route-careers-art :global(.concept-art) {
		margin: 0;
	}

	.route-careers-art :global(.concept-art picture) {
		border: 1px solid #ac78ff70;
		box-shadow: 0 0 76px -30px #a22bd565;
	}

	@media (max-width: 650px) {
		section.chapter {
			padding-block: 40px;
		}
	}
</style>
