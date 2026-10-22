<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import IntakeForm from '$lib/components/IntakeForm.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { images, text } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	import type { Localized } from '$lib/types';
	const language = useLanguage();
	const t = (v: Localized) => text(v, language.locale);
	const ideas = [
		{
			kind: { en: 'A USEFUL WORKFLOW', es: 'UN FLUJO ÚTIL' },
			title: {
				en: 'From scattered notes to a clear next step.',
				es: 'De notas dispersas a un siguiente paso claro.'
			},
			body: {
				en: 'Design a small workflow that turns sample notes into decisions, questions and a task list. Show what a human still needs to review.',
				es: 'Diseña un flujo pequeño que convierta notas de ejemplo en decisiones, preguntas y tareas. Muestra qué necesita revisión humana.'
			},
			deliverable: {
				en: 'A process map, sample inputs and a checked result.',
				es: 'Un mapa del proceso, datos de ejemplo y un resultado revisado.'
			},
			href: '/prompt-library/notes-to-next-steps',
			link: { en: 'Start with a planning prompt', es: 'Empieza con un prompt de planificación' }
		},
		{
			kind: { en: 'A SMALL WEB EXPERIENCE', es: 'UNA EXPERIENCIA WEB PEQUEÑA' },
			title: { en: 'A page someone can actually use.', es: 'Una página que alguien pueda usar.' },
			body: {
				en: 'Choose a local idea or community activity. Build an accessible page that explains it clearly, works on a phone, and makes its next action obvious.',
				es: 'Elige una idea local o actividad comunitaria. Crea una página accesible que la explique, funcione en móvil y tenga una acción clara.'
			},
			deliverable: {
				en: 'A working prototype and a short usability review.',
				es: 'Un prototipo funcional y una breve revisión de uso.'
			},
			href: '/careers',
			link: { en: 'Explore building skills', es: 'Explora habilidades para crear' }
		},
		{
			kind: { en: 'A PRACTICAL EXPLAINER', es: 'UNA EXPLICACIÓN PRÁCTICA' },
			title: {
				en: 'Make one useful idea easier to understand.',
				es: 'Haz que una idea útil sea fácil de entender.'
			},
			body: {
				en: 'Explain a task with a short guide, an example and a visual. Keep your sources close and identify where the approach stops being reliable.',
				es: 'Explica una tarea con una guía breve, un ejemplo y una imagen. Incluye fuentes e indica los límites del método.'
			},
			deliverable: {
				en: 'A clear guide, one example and a source list.',
				es: 'Una guía clara, un ejemplo y una lista de fuentes.'
			},
			href: '/prompt-library/learn-by-doing',
			link: { en: 'Plan a learning experiment', es: 'Planifica una experiencia de aprendizaje' }
		}
	];
	const notes = [
		{
			title: { en: 'The problem.', es: 'El problema.' },
			body: {
				en: 'What were you trying to make easier, faster or clearer? Start with the task, not the tool.',
				es: '¿Qué intentabas hacer más fácil, rápido o claro? Empieza con la tarea, no con la herramienta.'
			}
		},
		{
			title: { en: 'The approach.', es: 'La forma de hacerlo.' },
			body: {
				en: 'Explain the choices you made. Share a safe public demo or example, without private information.',
				es: 'Explica tus decisiones. Comparte una demo o ejemplo público seguro, sin información privada.'
			}
		},
		{
			title: { en: 'What you learned.', es: 'Lo que aprendiste.' },
			body: {
				en: 'What worked, what did not, and what would you change next? The lesson matters as much as the result.',
				es: '¿Qué funcionó, qué no y qué cambiarías? El aprendizaje importa tanto como el resultado.'
			}
		}
	];
</script>

<Seo
	title={{ en: 'Community projects', es: 'Proyectos de la comunidad' }}
	description={{
		en: 'Small project ideas, useful starting points and a clear way to share what you learned with the WGN community.',
		es: 'Ideas de proyectos pequeños, puntos de partida útiles y una forma clara de compartir lo aprendido con la comunidad WGN.'
	}}
	path="/projects"
/>
<PageIntro
	eyebrow={{ en: 'THE COMMUNITY NOTEBOOK', es: 'EL CUADERNO DE LA COMUNIDAD' }}
	title={{ en: 'Less someday. More something.', es: 'Menos «algún día». Más empezar.' }}
	body={{
		en: 'A useful project starts with a question worth trying. Explore an idea, make a small version, and share what you learn along the way.',
		es: 'Un proyecto útil empieza con una pregunta que vale la pena probar. Explora una idea, crea una versión pequeña y comparte lo que aprendes.'
	}}
/>
<section class="chapter route-project-feature">
	<div class="shell route-project-feature-grid">
		<ConceptArt base={images.projects.base} alt={images.projects.alt} eager />
		<div>
			<p class="eyebrow">
				{language.locale === 'en' ? 'THE NOTEBOOK IS OPEN' : 'EL CUADERNO ESTÁ ABIERTO'}
			</p>
			<h2>
				{language.locale === 'en'
					? 'A work in progress is worth a conversation.'
					: 'Un proyecto en proceso merece una conversación.'}
			</h2>
			<p>
				{language.locale === 'en'
					? 'Community project stories will appear here after review and permission to publish. Until then, these clearly labeled ideas offer somewhere useful to begin.'
					: 'Publicaremos historias de proyectos de la comunidad después de revisarlas y obtener permiso. Mientras tanto, estas ideas ilustrativas ofrecen un punto de partida útil.'}
			</p>
			<a class="text-link" href="#project-ideas"
				>{language.locale === 'en' ? 'Explore the starter ideas' : 'Explora las ideas iniciales'} ↓</a
			>
		</div>
	</div>
</section>
<section id="project-ideas" class="chapter route-project-ideas">
	<div class="shell">
		<div class="section-header">
			<div>
				<p class="eyebrow">
					{language.locale === 'en'
						? 'ILLUSTRATIVE IDEAS · NOT PUBLISHED COMMUNITY PROJECTS'
						: 'IDEAS ILUSTRATIVAS · NO SON PROYECTOS PUBLICADOS'}
				</p>
				<h2>
					{language.locale === 'en'
						? 'Small enough to start.'
						: 'Lo bastante pequeño para empezar.'}
				</h2>
			</div>
			<p>
				{language.locale === 'en'
					? 'Use these as practice briefs. They are possibilities to explore, not products, client work or promised outcomes.'
					: 'Úsalas como ejercicios. Son posibilidades para explorar, no productos, trabajo para clientes ni resultados prometidos.'}
			</p>
		</div>
		<div class="route-idea-list">
			{#each ideas as idea, index}<article class="route-idea">
					<span class="route-idea-index">0{index + 1}</span>
					<div>
						<p class="eyebrow">{t(idea.kind)}</p>
						<h3>{t(idea.title)}</h3>
						<p>{t(idea.body)}</p>
					</div>
					<div class="route-idea-output">
						<span>{language.locale === 'en' ? 'WHAT TO MAKE' : 'QUÉ CREAR'}</span>
						<p>{t(idea.deliverable)}</p>
						<a class="text-link" href={idea.href}>{t(idea.link)} ↗</a>
					</div>
				</article>{/each}
		</div>
	</div>
</section>
<section id="project-brief" class="chapter">
	<div class="shell route-project-brief">
		<div>
			<p class="eyebrow">
				{language.locale === 'en' ? 'TELL THE USEFUL PART' : 'CUENTA LO QUE SIRVE'}
			</p>
			<h2>
				{language.locale === 'en'
					? 'Give the idea a little context.'
					: 'Dale un poco de contexto a la idea.'}
			</h2>
			<p class="muted">
				{language.locale === 'en'
					? 'You do not need a finished product. A clear question, an honest experiment and a useful lesson can start a good conversation.'
					: 'No necesitas un producto terminado. Una pregunta clara, una prueba honesta y un aprendizaje útil pueden iniciar una buena conversación.'}
			</p>
		</div>
		<ol>
			{#each notes as note, index}<li>
					<span>0{index + 1}</span>
					<div>
						<h3>{t(note.title)}</h3>
						<p>{t(note.body)}</p>
					</div>
				</li>{/each}
		</ol>
	</div>
</section>
<section class="chapter route-related">
	<div class="shell">
		<div class="section-header">
			<div>
				<p class="eyebrow">
					{language.locale === 'en' ? 'FURTHER EXPLORATION' : 'PARA SEGUIR EXPLORANDO'}
				</p>
				<h2>{language.locale === 'en' ? 'Around the team.' : 'Más del equipo.'}</h2>
			</div>
			<p>
				{language.locale === 'en'
					? 'Related team sites with their own services and scope. These are separate from the WGN project notebook and workshop plan.'
					: 'Sitios relacionados del equipo, cada uno con sus servicios y alcance. Son distintos del cuaderno de proyectos de WGN y del plan de talleres.'}
			</p>
		</div>
		<div class="route-related-links">
			<a href="https://automatewithgus.com/" target="_blank" rel="noreferrer"
				><span>Automate With Gus</span><span aria-hidden="true">↗</span></a
			><a href="https://aienablementworks.com/" target="_blank" rel="noreferrer"
				><span>AI Enablement Works</span><span aria-hidden="true">↗</span></a
			>
		</div>
	</div>
</section>
<section class="section shell">
	<p class="route-project-note">
		{language.locale === 'en'
			? 'A submission starts a conversation. It does not guarantee publication, selection or presentation time.'
			: 'Enviar una propuesta inicia una conversación. No garantiza publicación, selección ni tiempo de presentación.'}
	</p>
	<IntakeForm formType="project_submission" />
</section>

<style>
	section.chapter {
		padding-block: 56px;
	}

	.route-project-feature-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
		gap: clamp(24px, 3vw, 36px);
		align-items: center;
	}
	.route-project-feature-grid h2 {
		max-width: 15ch;
		margin: 1rem 0 1.5rem;
	}
	.route-project-feature-grid .text-link {
		margin-top: 1.5rem;
	}
	.route-project-ideas {
		--focus-ring: var(--cyan);
		background:
			radial-gradient(ellipse at 95% 0%, #1db2be22, transparent 60%),
			linear-gradient(130deg, #11172d, #15142c);
		color: var(--ink);
		border-block: 1px solid var(--line);
	}
	.route-project-ideas :global(.eyebrow),
	.route-project-ideas :global(.section-header > p) {
		color: var(--muted);
	}
	.route-project-ideas :global(.text-link) {
		color: var(--ink);
	}
	.route-idea-list {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
		margin-top: 28px;
	}
	.route-idea {
		display: flex;
		flex-direction: column;
		gap: 18px;
		padding: 24px;
		border: 1px solid var(--line);
		border-radius: 18px;
		background: linear-gradient(145deg, #25304a66, #11172daa);
		align-items: start;
	}
	.route-idea-index {
		font-size: 0.8rem;
		color: var(--violet);
	}
	.route-idea h3 {
		font-size: clamp(1.35rem, 1.8vw, 1.8rem);
		max-width: 23ch;
		margin: 12px 0 18px;
	}
	.route-idea > div > p:not(.eyebrow) {
		color: var(--muted);
		font-size: 1rem;
	}
	.route-idea-output {
		width: 100%;
		margin-top: auto;
		padding-top: 20px;
		border-top: 1px solid var(--line);
	}
	.route-idea-output > span {
		font-size: 0.7rem;
		letter-spacing: 0.09em;
		font-weight: 600;
		color: var(--cyan);
	}
	.route-idea-output p {
		font-size: 0.9rem !important;
		margin: 0.75rem 0 1.25rem;
	}
	.route-idea-output .text-link {
		font-size: 0.9rem;
	}
	.route-project-brief {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(24px, 3vw, 40px);
	}
	.route-project-brief h2 {
		max-width: 14ch;
		margin: 1rem 0 1.5rem;
	}
	.route-project-brief ol {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.route-project-brief li {
		display: grid;
		grid-template-columns: 2rem minmax(0, 1fr);
		gap: 1rem;
		border-top: 1px solid var(--line);
		padding: 1.5rem 0;
	}
	.route-project-brief li > span {
		color: var(--cyan);
		font-size: 0.8rem;
	}
	.route-project-brief h3 {
		font-size: 1.25rem;
		margin: 0 0 0.7rem;
	}
	.route-project-brief li p {
		font-size: 0.95rem;
		color: var(--muted);
	}
	.route-project-note {
		font-size: 0.9rem;
		color: var(--muted);
		margin-bottom: 2rem;
		max-width: 70ch;
	}
	.route-related-links {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-top: 2.5rem;
	}
	.route-related-links a {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
		padding: 1.5rem 0;
		font-size: 1.1rem;
	}
	.route-related-links a > span:last-child {
		color: var(--cyan);
	}
	@media (max-width: 900px) {
		.route-idea {
			grid-template-columns: 1.5rem minmax(0, 1fr);
			gap: 1.5rem;
		}
		.route-idea-output {
			grid-column: 2;
		}
		.route-idea h3 {
			max-width: none;
		}
	}
	@media (max-width: 650px) {
		.route-related-links {
			grid-template-columns: 1fr;
			gap: 0;
		}
		.route-project-feature-grid,
		.route-project-brief {
			grid-template-columns: 1fr;
		}
		.route-project-feature-grid h2 {
			max-width: none;
		}
		.route-idea {
			grid-template-columns: 1fr;
			padding: 2rem 0;
			gap: 1rem;
		}
		.route-idea-output {
			grid-column: 1;
		}
		.route-idea-index {
			display: none;
		}
		.route-project-brief h2 {
			max-width: 19ch;
		}
	}

	.route-project-feature-grid :global(.concept-art) {
		margin: 0;
	}

	.route-project-feature-grid :global(.concept-art picture) {
		border: 1px solid #a98aff70;
		box-shadow: 0 0 70px -28px #9b3ed76b;
	}

	.route-idea:nth-child(2) {
		background: linear-gradient(145deg, #38264b66, #11172daa);
	}

	.route-idea:nth-child(3) {
		background: linear-gradient(145deg, #143f4a66, #11172daa);
	}

	.route-related {
		background: radial-gradient(ellipse at 10% 100%, #7e45ba24, transparent 65%);
		border-block: 1px solid var(--line);
	}

	@media (max-width: 1000px) {
		.route-idea-list {
			grid-template-columns: 1fr;
			gap: 18px;
		}
		.route-idea {
			display: grid;
			grid-template-columns: 26px minmax(0, 1.4fr) minmax(0, 0.9fr);
			gap: 22px;
		}
		.route-idea-output {
			grid-column: auto;
			padding-top: 0;
			padding-left: 22px;
			border-top: 0;
			border-left: 1px solid var(--line);
			margin-top: 0;
		}
	}
	@media (max-width: 650px) {
		.route-idea {
			display: flex;
			padding: 22px;
			gap: 14px;
		}
		.route-idea-output {
			padding-left: 0;
			padding-top: 18px;
			border-left: 0;
			border-top: 1px solid var(--line);
		}
	}

	@media (max-width: 650px) {
		section.chapter {
			padding-block: 40px;
		}
	}
</style>
