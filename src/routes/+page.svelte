<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import IntakeForm from '$lib/components/IntakeForm.svelte';
	import { images, MEETUP_URL, prompts, text } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
	const featured = $derived(
		prompts.filter((p) =>
			[
				'decision-brief-with-evidence',
				'automation-opportunity-map',
				'hands-on-workshop-design'
			].includes(p.slug)
		)
	);
	const formats = [
		{
			n: '01',
			en: 'See an idea in action.',
			es: 'Ve una idea en acción.',
			bodyEn:
				'Live demonstrations, thoughtful questions, and people who are exploring what comes next.',
			bodyEs: 'Demostraciones, buenas preguntas y personas explorando lo que viene.',
			href: '/events',
			linkEn: 'Community meetups',
			linkEs: 'Encuentros comunitarios'
		},
		{
			n: '02',
			en: 'Make something of your own.',
			es: 'Crea algo por tu cuenta.',
			bodyEn:
				'Hands-on workshops built around a useful task. A little guidance. Plenty of room to try.',
			bodyEs:
				'Talleres prácticos alrededor de una tarea útil. Un poco de guía. Mucho espacio para probar.',
			href: '/workshops',
			linkEn: 'Hands-on workshops',
			linkEs: 'Talleres prácticos'
		},
		{
			n: '03',
			en: 'Keep your curiosity going.',
			es: 'Sigue alimentando tu curiosidad.',
			bodyEn: 'Go deeper with structured prompts, practical projects, and new ways to contribute.',
			bodyEs:
				'Profundiza con prompts estructurados, proyectos prácticos y nuevas formas de aportar.',
			href: '/prompt-library',
			linkEn: 'The resource library',
			linkEs: 'La biblioteca de recursos'
		}
	];
</script>

<Seo
	title={{
		en: 'A curious mind. A useful next step.',
		es: 'Una mente curiosa. Un siguiente paso útil.'
	}}
	description={{
		en: 'Explore AI with people, practical workshops and a library of thoughtful workflows. Learn, build, share and connect with We’ve Got Now.',
		es: 'Explora la IA con personas, talleres prácticos y una biblioteca de flujos de trabajo. Aprende, crea, comparte y conecta con We’ve Got Now.'
	}}
	path="/"
/>
<section class="r7-opening">
	<div class="shell">
		<div class="r7-opening-copy">
			<p class="eyebrow">
				<span>WE’VE GOT NOW</span><span class="r7-eyebrow-separator">/</span>{language.locale ===
				'en'
					? 'A place for your curiosity'
					: 'Un espacio para tu curiosidad'}
			</p>
			<h1>
				{#if language.locale === 'en'}A curious mind.<br /><span>A useful next step.</span
					>{:else}Una mente curiosa.<br /><span>Un siguiente paso útil.</span>{/if}
			</h1>
			<p class="lede">
				{language.locale === 'en'
					? 'The tools will keep changing. The good part is figuring them out together. Explore AI, make something useful, and find your people.'
					: 'Las herramientas seguirán cambiando. Lo bueno es descubrirlas juntos. Explora la IA, crea algo útil y encuentra tu comunidad.'}
			</p>
			<div class="button-row">
				<a class="button primary" href="/workshops"
					>{language.locale === 'en'
						? 'Find your starting point'
						: 'Encuentra por dónde empezar'}<span aria-hidden="true">↗</span></a
				><a class="r7-quiet-link" href="/prompt-library"
					>{language.locale === 'en'
						? 'Explore the prompt library'
						: 'Explora la biblioteca de prompts'} <span aria-hidden="true">→</span></a
				>
			</div>
		</div>
		<div
			class="r7-scene"
			aria-label={language.locale === 'en'
				? 'Three ways to explore with WGN'
				: 'Tres formas de explorar con WGN'}
		>
			<a href="/events" class="r7-scene-card r7-scene-left"
				><ConceptArt base={images.events.base} alt={images.events.alt} />
				<div>
					<span class="r7-card-kicker">01 / {language.locale === 'en' ? 'MEET' : 'CONECTA'}</span
					><strong
						>{language.locale === 'en'
							? 'Ideas worth a conversation.'
							: 'Ideas para conversar.'}</strong
					><span aria-hidden="true">↗</span>
				</div></a
			>
			<a href="/workshops" class="r7-scene-card r7-scene-main"
				><ConceptArt base={images.workshops.base} alt={images.workshops.alt} eager />
				<div>
					<span class="r7-card-kicker">02 / {language.locale === 'en' ? 'MAKE' : 'CREA'}</span
					><strong
						>{language.locale === 'en'
							? 'Bring a task. Leave with a new perspective.'
							: 'Trae una tarea. Descubre otra perspectiva.'}</strong
					><span aria-hidden="true">↗</span>
				</div></a
			>
			<a href="/projects" class="r7-scene-card r7-scene-right"
				><ConceptArt base={images.projects.base} alt={images.projects.alt} />
				<div>
					<span class="r7-card-kicker">03 / {language.locale === 'en' ? 'SHARE' : 'COMPARTE'}</span
					><strong
						>{language.locale === 'en'
							? 'Build on each other’s curiosity.'
							: 'Crea con la curiosidad de otros.'}</strong
					><span aria-hidden="true">↗</span>
				</div></a
			>
		</div>
		<div class="r7-scene-credit">
			<span
				>{language.locale === 'en'
					? 'AI-generated community illustrations'
					: 'Ilustraciones de comunidad generadas con IA'}</span
			><span>LEARN · BUILD · SHARE · CONNECT</span>
		</div>
	</div>
</section>
<section class="r7-introduction chapter">
	<div class="shell r7-manifesto">
		<p class="eyebrow">
			{language.locale === 'en' ? 'THE THING ABOUT LEARNING' : 'LO BUENO DE APRENDER'}
		</p>
		<h2>
			{language.locale === 'en'
				? 'You don’t need all the answers. Just a place to begin.'
				: 'No necesitas todas las respuestas. Solo un lugar para empezar.'}
		</h2>
		<p>
			{language.locale === 'en'
				? 'We’ve Got Now brings curious people together around practical AI. Some of us are taking a first step. Some are building the next thing. There’s room for both.'
				: 'We’ve Got Now reúne a personas curiosas alrededor de la IA práctica. Algunas están dando su primer paso. Otras ya están creando algo nuevo. Hay espacio para ambas.'}
		</p>
	</div>
	<div class="shell r7-paths">
		{#each formats as f}<a href={f.href} class="r7-path"
				><span class="r7-path-index">{f.n}</span>
				<div>
					<h3>{language.locale === 'en' ? f.en : f.es}</h3>
					<p>{language.locale === 'en' ? f.bodyEn : f.bodyEs}</p>
					<span class="r7-path-link"
						>{language.locale === 'en' ? f.linkEn : f.linkEs}
						<span aria-hidden="true">↗</span></span
					>
				</div></a
			>{/each}
	</div>
</section>
<section class="r7-workshop-chapter chapter">
	<div class="shell r7-workshop-grid">
		<div class="r7-workshop-copy">
			<p class="eyebrow">
				{language.locale === 'en'
					? 'THE WORKSHOP SERIES · IN PLANNING'
					: 'LA SERIE DE TALLERES · EN PREPARACIÓN'}
			</p>
			<h2>
				{language.locale === 'en'
					? 'Less watching. More “let me try.”'
					: 'Menos mirar. Más «déjame probar».'}
			</h2>
			<p class="lede">
				{language.locale === 'en'
					? 'A real task is a much better starting point than a list of tools. We’re shaping workshops that turn curiosity into something you can work on.'
					: 'Una tarea real es un mejor punto de partida que una lista de herramientas. Estamos preparando talleres para convertir la curiosidad en algo que puedas trabajar.'}
			</p>
			<a class="button dark-button" href="/workshops"
				>{language.locale === 'en' ? 'Inside the workshop plan' : 'Conoce el plan del taller'}<span
					aria-hidden="true">↗</span
				></a
			>
			<p class="r7-pending">
				{language.locale === 'en'
					? 'Dates and pricing are being finalized. Registration is not open.'
					: 'Fechas y precios en preparación. Las inscripciones aún no están abiertas.'}
			</p>
		</div>
		<div class="r7-session">
			<div class="r7-session-top">
				<span>{language.locale === 'en' ? 'A POSSIBLE SESSION' : 'UN POSIBLE ENCUENTRO'}</span><span
					aria-hidden="true">✳</span
				>
			</div>
			{#each [{ en: 'Start with your question', es: 'Empieza con tu pregunta', subEn: 'One task. Your context.', subEs: 'Una tarea. Tu contexto.' }, { en: 'Build a useful first version', es: 'Crea una primera versión útil', subEn: 'Try an approach. See what happens.', subEs: 'Prueba una idea. Observa el resultado.' }, { en: 'Leave with a better question', es: 'Sal con una mejor pregunta', subEn: 'Compare, improve, share.', subEs: 'Compara, mejora, comparte.' }] as step, i}<div
					class="r7-session-step"
				>
					<span>0{i + 1}</span>
					<div>
						<h3>{language.locale === 'en' ? step.en : step.es}</h3>
						<p>{language.locale === 'en' ? step.subEn : step.subEs}</p>
					</div>
				</div>{/each}
			<div class="r7-session-bottom">
				{language.locale === 'en'
					? 'An illustrative flow, not a finalized agenda.'
					: 'Un recorrido ilustrativo, no una agenda final.'}<span aria-hidden="true">↗</span>
			</div>
		</div>
	</div>
</section>
<section class="chapter r7-library-chapter">
	<div class="shell">
		<div class="section-header">
			<div>
				<p class="eyebrow">
					{language.locale === 'en' ? 'THE PROMPT FIELD GUIDE' : 'LA GUÍA PRÁCTICA DE PROMPTS'}
				</p>
				<h2>
					{language.locale === 'en'
						? 'Go beyond a blank prompt.'
						: 'Ve más allá de un prompt en blanco.'}
				</h2>
			</div>
			<div>
				<p class="muted">
					{language.locale === 'en'
						? 'Detailed workflows for the work you actually do. With inputs, a method, an output structure, and a way to check it.'
						: 'Flujos detallados para tareas reales. Con datos de entrada, un método, una estructura de salida y una forma de revisarla.'}
				</p>
				<a class="text-link" href="/prompt-library"
					>{language.locale === 'en'
						? `Explore ${prompts.length} templates`
						: `Explora ${prompts.length} plantillas`} <span aria-hidden="true">↗</span></a
				>
			</div>
		</div>
		<div class="r7-prompt-picks">
			{#each featured as prompt, i}<a href={`/prompt-library/${prompt.slug}`}
					><div class="r7-pick-top">
						<span>0{i + 1}</span><span>{text(prompt.category, language.locale)}</span>
					</div>
					<h3>{text(prompt.title, language.locale)}</h3>
					<p>{text(prompt.outcome ?? prompt.usefulFor, language.locale)}</p>
					<span class="r7-pick-action"
						>{language.locale === 'en' ? 'Make it your own' : 'Hazlo tuyo'}
						<span aria-hidden="true">↗</span></span
					></a
				>{/each}
		</div>
	</div>
</section>
<section class="chapter r7-community-room">
	<div class="shell r7-room-grid">
		<div>
			<p class="eyebrow">
				{language.locale === 'en' ? 'AI TOOLS EXPLORERS NIGHT' : 'AI TOOLS EXPLORERS NIGHT'}
			</p>
			<h2>
				{language.locale === 'en' ? 'The people are the point.' : 'Lo importante son las personas.'}
			</h2>
			<p class="lede">
				{language.locale === 'en'
					? 'A useful demo can start a conversation. A conversation can change what you try next. That’s the idea behind our community meetups.'
					: 'Una buena demo puede iniciar una conversación. Una conversación puede cambiar lo que pruebas después. Esa es la idea de nuestros encuentros.'}
			</p>
			<div class="button-row">
				<a class="button primary" href={MEETUP_URL} target="_blank" rel="noreferrer"
					>{language.locale === 'en' ? 'Find your people' : 'Encuentra tu comunidad'}<span
						aria-hidden="true">↗</span
					></a
				><a class="text-link" href="/events"
					>{language.locale === 'en' ? 'Explore the gatherings' : 'Conoce los encuentros'}</a
				>
			</div>
			<p class="r7-room-note">
				{language.locale === 'en'
					? 'The next meetup date has not been announced.'
					: 'La próxima fecha de encuentro aún no se ha anunciado.'}
			</p>
		</div>
		<ConceptArt base={images.about.base} alt={images.about.alt} />
	</div>
</section>
<section class="r7-final-invitation chapter">
	<div class="shell">
		<p class="eyebrow">
			{language.locale === 'en'
				? 'YOUR NEXT STEP DOESN’T HAVE TO BE BIG'
				: 'TU SIGUIENTE PASO NO TIENE QUE SER GRANDE'}
		</p>
		<h2>
			{language.locale === 'en'
				? 'A question is a good start.'
				: 'Una pregunta es un buen comienzo.'}
		</h2>
		<a class="button secondary" href="/about"
			>{language.locale === 'en' ? 'A little more about us' : 'Un poco más sobre nosotros'}<span
				aria-hidden="true">↗</span
			></a
		>
	</div>
</section>
<section id="join" class="section shell r7-intake">
	<div id="join-form"><IntakeForm formType="community" /></div>
</section>

<style>
	.r7-opening {
		padding: 100px 0 32px;
		position: relative;
	}
	.r7-opening-copy {
		text-align: center;
		max-width: 1080px;
		margin: auto;
	}
	.r7-opening .eyebrow {
		justify-content: center;
		gap: 12px;
	}
	.r7-opening .eyebrow:before {
		display: none;
	}
	.r7-opening .eyebrow > span:first-child {
		font-family: Orbitron, sans-serif;
		font-size: 0.66rem;
		letter-spacing: 0.08em;
	}
	.r7-eyebrow-separator {
		opacity: 0.4;
	}
	.r7-opening h1 {
		font-size: clamp(3rem, 6.8vw, 7rem);
		line-height: 1.06;
		letter-spacing: -0.065em;
		margin: 0 auto 30px;
	}
	.r7-opening h1 > span {
		color: #c6b8f2;
	}
	.r7-opening .lede {
		max-width: 53ch;
		margin: 0 auto;
		font-size: clamp(1.05rem, 1.4vw, 1.22rem);
	}
	.r7-opening .button-row {
		justify-content: center;
		gap: 32px;
	}
	.r7-quiet-link {
		font-size: 0.88rem;
		text-decoration: none;
		padding: 12px 0;
		min-height: 48px;
		border-bottom: 1px solid #ffffff40;
	}
	.r7-quiet-link > span {
		margin-left: 12px;
	}
	.r7-scene {
		display: grid;
		grid-template-columns: 0.86fr 1.28fr 0.86fr;
		gap: 24px;
		align-items: center;
		margin-top: 88px;
		padding: 0 16px;
	}
	.r7-scene-card {
		min-width: 0;
		position: relative;
		background: #151e32;
		border: 1px solid #ffffff1e;
		border-radius: 24px;
		text-decoration: none;
		box-shadow: 0 30px 80px #03071245;
		transition:
			transform 0.3s,
			border-color 0.3s;
	}
	.r7-scene-card:hover {
		transform: translateY(-8px);
		border-color: #99d9dd80;
	}
	.r7-scene-left {
		transform: rotate(-4deg);
	}
	.r7-scene-right {
		transform: rotate(4deg);
	}
	.r7-scene-left:hover {
		transform: rotate(-2deg) translateY(-8px);
	}
	.r7-scene-right:hover {
		transform: rotate(2deg) translateY(-8px);
	}
	.r7-scene-card :global(.concept-art picture) {
		border-radius: 23px 23px 0 0;
		aspect-ratio: 1.35;
	}
	.r7-scene-main :global(.concept-art picture) {
		aspect-ratio: 1.5;
	}
	.r7-scene-card :global(.concept-art figcaption) {
		display: none;
	}
	.r7-scene-card > div {
		padding: 24px;
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 10px 16px;
	}
	.r7-card-kicker {
		grid-column: 1/-1;
		font-size: 0.64rem;
		letter-spacing: 0.14em;
		color: #a5b9d2;
	}
	.r7-scene-card strong {
		font:
			600 clamp(1rem, 1.4vw, 1.3rem)/1.4 Manrope,
			sans-serif;
		letter-spacing: -0.025em;
	}
	.r7-scene-card > div > span:last-child {
		align-self: end;
		color: var(--cyan);
	}
	.r7-scene-credit {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		font-size: 0.66rem;
		color: #8495b2;
		margin-top: 40px;
		padding-top: 24px;
		border-top: 1px solid var(--line);
		letter-spacing: 0.05em;
	}
	.r7-manifesto {
		display: grid;
		grid-template-columns: 0.7fr 1.5fr 1fr;
		gap: 60px;
		align-items: start;
	}
	.r7-manifesto .eyebrow {
		margin-top: 10px;
	}
	.r7-manifesto h2 {
		font-size: clamp(2rem, 3vw, 3.2rem);
		max-width: 20ch;
	}
	.r7-manifesto > p:last-child {
		color: var(--muted);
		margin-top: 8px;
		font-size: 0.98rem;
	}
	.r7-paths {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 44px;
		margin-top: 68px;
	}
	.r7-path {
		display: grid;
		grid-template-columns: 30px 1fr;
		gap: 16px;
		padding-top: 28px;
		border-top: 1px solid var(--line);
		text-decoration: none;
	}
	.r7-path-index {
		font-size: 0.7rem;
		color: var(--cyan);
		font-family: Orbitron, sans-serif;
		padding-top: 3px;
	}
	.r7-path h3 {
		font-size: 1.3rem;
		line-height: 1.35;
		margin-bottom: 14px;
	}
	.r7-path p {
		font-size: 0.9rem;
		color: var(--muted);
		margin-bottom: 24px;
	}
	.r7-path-link {
		font-size: 0.8rem;
		display: flex;
		justify-content: space-between;
		gap: 16px;
	}
	.r7-path:hover .r7-path-link {
		color: var(--cyan);
	}
	.r7-workshop-chapter {
		background: #f3f0e8;
		color: #182238;
		position: relative;
	}
	.r7-workshop-chapter .eyebrow {
		color: #4c677b;
	}
	.r7-workshop-chapter .lede {
		color: #5b6575;
		max-width: 42ch;
	}
	.r7-workshop-grid {
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: clamp(56px, 9vw, 150px);
		align-items: center;
	}
	.r7-workshop-copy h2 {
		font-size: clamp(2.4rem, 4.2vw, 4.6rem);
		max-width: 13ch;
	}
	.r7-workshop-copy .button {
		margin-top: 20px;
	}
	.r7-pending {
		font-size: 0.78rem;
		color: #656e7b;
		max-width: 40ch;
		margin: 22px 0 0;
	}
	.r7-session {
		padding: 32px 36px;
		border-radius: 22px;
		border: 1px solid #d8d5cd;
		background: #fcfaf6;
		box-shadow: 0 12px 50px #17273e08;
		transform: rotate(1deg);
	}
	.r7-session-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 24px;
		padding-bottom: 24px;
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		color: #637184;
	}
	.r7-session-top > span:last-child {
		color: #647c74;
		font-size: 32px;
		line-height: 1;
	}
	.r7-session-step {
		display: grid;
		grid-template-columns: 30px 1fr;
		gap: 18px;
		padding: 26px 0;
		border-top: 1px solid #d8d5cd;
	}
	.r7-session-step > span {
		font-size: 0.7rem;
		color: #627286;
		padding-top: 4px;
	}
	.r7-session-step h3 {
		font-size: 1.15rem;
		letter-spacing: -0.03em;
		margin-bottom: 8px;
	}
	.r7-session-step p {
		font-size: 0.83rem;
		color: #687080;
		margin: 0;
	}
	.r7-session-bottom {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		padding-top: 16px;
		border-top: 1px solid #d8d5cd;
		font-size: 0.68rem;
		color: #687080;
	}
	.r7-library-chapter {
		background: #0e1729;
	}
	.r7-library-chapter .section-header {
		grid-template-columns: 1fr 1fr;
		gap: 140px;
	}
	.r7-library-chapter h2 {
		max-width: 14ch;
	}
	.r7-prompt-picks {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}
	.r7-prompt-picks > a {
		display: flex;
		flex-direction: column;
		padding: 30px;
		border: 1px solid var(--line);
		border-radius: 20px;
		min-height: 330px;
		background: #151f33;
		text-decoration: none;
		transition:
			background 0.2s,
			transform 0.2s;
	}
	.r7-prompt-picks > a:hover {
		background: #1a2940;
		transform: translateY(-4px);
	}
	.r7-pick-top {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		font-size: 0.66rem;
		color: #acbad0;
		letter-spacing: 0.06em;
		margin-bottom: 32px;
	}
	.r7-pick-top > span:first-child {
		color: var(--cyan);
	}
	.r7-prompt-picks h3 {
		font-size: 1.4rem;
		line-height: 1.3;
	}
	.r7-prompt-picks p {
		font-size: 0.88rem;
		color: var(--muted);
	}
	.r7-pick-action {
		display: flex;
		justify-content: space-between;
		margin-top: auto;
		padding-top: 24px;
		font-size: 0.8rem;
		color: var(--cyan);
	}
	.r7-room-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 100px;
		align-items: center;
	}
	.r7-room-grid h2 {
		font-size: clamp(2.5rem, 4.4vw, 4.6rem);
		max-width: 13ch;
	}
	.r7-room-grid :global(.concept-art picture) {
		border-radius: 48% 48% 24px 24px;
		aspect-ratio: 1.1;
	}
	.r7-room-note {
		color: var(--muted);
		font-size: 0.75rem;
		margin-top: 28px;
	}
	.r7-final-invitation {
		text-align: center;
		background: linear-gradient(135deg, #c4bbe8, #b7dcd7);
		color: #182438;
	}
	.r7-final-invitation .eyebrow {
		justify-content: center;
		color: #4e6575;
	}
	.r7-final-invitation h2 {
		max-width: 20ch;
		margin: 0 auto 34px;
		font-size: clamp(2.3rem, 4.8vw, 5rem);
	}
	.r7-final-invitation .button {
		border-color: #6c7a87;
	}
	.r7-intake {
		padding-block: 40px;
	}
	.r7-opening-copy {
		animation: arrive 0.65s ease-out;
	}
	@media (max-width: 1100px) {
		.r7-opening {
			padding-top: 80px;
		}
		.r7-scene {
			gap: 16px;
			padding: 0;
		}
		.r7-scene-card > div {
			padding: 18px;
		}
		.r7-manifesto {
			grid-template-columns: 1fr 1fr;
			gap: 30px 60px;
		}
		.r7-manifesto > .eyebrow {
			grid-column: 1/-1;
		}
		.r7-manifesto h2 {
			margin: 0;
		}
		.r7-library-chapter .section-header {
			gap: 70px;
		}
		.r7-room-grid {
			gap: 50px;
		}
		.r7-workshop-grid {
			gap: 50px;
		}
		.r7-paths {
			gap: 28px;
		}
		.r7-session {
			padding: 26px;
		}
	}
	@media (max-width: 760px) {
		.r7-opening {
			padding-top: 64px;
		}
		.r7-opening .eyebrow {
			flex-wrap: wrap;
			font-size: 0.62rem;
		}
		.r7-opening h1 {
			font-size: clamp(2.6rem, 8.7vw, 4.5rem);
			letter-spacing: -0.05em;
			line-height: 1.1;
		}
		.r7-opening .lede {
			font-size: 1rem;
			max-width: 40ch;
		}
		.r7-opening .button-row {
			gap: 14px;
			margin-top: 28px;
		}
		.r7-quiet-link {
			font-size: 0.8rem;
		}
		.r7-scene {
			grid-template-columns: 1fr 1fr;
			gap: 16px;
			margin-top: 54px;
		}
		.r7-scene-main {
			grid-column: 1/-1;
			grid-row: 1;
		}
		.r7-scene-left,
		.r7-scene-right {
			transform: none;
		}
		.r7-scene-left:hover,
		.r7-scene-right:hover {
			transform: translateY(-3px);
		}
		.r7-scene-card {
			border-radius: 16px;
		}
		.r7-scene-card :global(.concept-art picture) {
			border-radius: 15px 15px 0 0;
			aspect-ratio: 1.3;
		}
		.r7-scene-main :global(.concept-art picture) {
			aspect-ratio: 2;
		}
		.r7-scene-card > div {
			padding: 16px;
			gap: 8px;
		}
		.r7-scene-card strong {
			font-size: 0.95rem;
		}
		.r7-card-kicker {
			font-size: 0.59rem;
		}
		.r7-scene-credit {
			font-size: 0.59rem;
			margin-top: 24px;
			gap: 16px;
		}
		.r7-scene-credit > span:last-child {
			max-width: 18ch;
			text-align: right;
		}
		.r7-manifesto {
			grid-template-columns: 1fr;
			gap: 24px;
		}
		.r7-manifesto .eyebrow {
			margin: 0;
		}
		.r7-manifesto h2 {
			max-width: 21ch;
		}
		.r7-manifesto > p:last-child {
			margin: 0;
		}
		.r7-paths {
			grid-template-columns: 1fr;
			gap: 20px;
			margin-top: 40px;
		}
		.r7-path {
			padding-top: 22px;
		}
		.r7-path p {
			max-width: 48ch;
		}
		.r7-path-link {
			max-width: 320px;
		}
		.r7-workshop-grid {
			grid-template-columns: 1fr;
			gap: 44px;
		}
		.r7-workshop-copy h2 {
			max-width: 16ch;
		}
		.r7-session {
			transform: none;
			padding: 24px;
		}
		.r7-library-chapter .section-header {
			grid-template-columns: 1fr;
			gap: 28px;
		}
		.r7-library-chapter h2 {
			max-width: 20ch;
		}
		.r7-prompt-picks {
			grid-template-columns: 1fr;
			gap: 16px;
		}
		.r7-prompt-picks > a {
			min-height: 0;
			padding: 26px;
		}
		.r7-pick-top {
			margin-bottom: 20px;
		}
		.r7-room-grid {
			grid-template-columns: 1fr;
			gap: 44px;
		}
		.r7-room-grid h2 {
			max-width: 17ch;
		}
		.r7-room-grid :global(.concept-art picture) {
			aspect-ratio: 1.4;
		}
		.r7-intake {
			padding-block: 24px;
		}
		.r7-opening h1 br {
			display: none;
		}
		.r7-opening h1 > span {
			display: block;
		}
	}
	@media (max-width: 374px) {
		.r7-opening .eyebrow {
			max-width: 28ch;
			margin-inline: auto;
		}
		.r7-opening .button-row {
			flex-direction: column;
		}
		.r7-scene-card > div {
			padding: 12px;
		}
		.r7-scene-card strong {
			font-size: 0.85rem;
		}
	}
</style>
