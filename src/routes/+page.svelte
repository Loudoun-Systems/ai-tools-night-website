<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import IntakeForm from '$lib/components/IntakeForm.svelte';
	import { images, MEETUP_URL, prompts, text } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
	let selected = $state('workshops');
	const directions = [
		{
			id: 'events',
			n: '01',
			en: 'Meet your people',
			es: 'Encuentra tu comunidad',
			tagEn: 'THE CONVERSATION',
			tagEs: 'LA CONVERSACIÓN',
			titleEn: 'One good conversation can change what you try next.',
			titleEs: 'Una buena conversación puede cambiar lo que pruebas después.',
			bodyEn:
				'See an idea in action. Ask the question you have been sitting on. Meet other people exploring practical AI, one useful experiment at a time.',
			bodyEs:
				'Ve una idea en acción. Haz esa pregunta que tienes pendiente. Conoce a otras personas explorando la IA práctica, un experimento útil a la vez.',
			statusEn: 'The next meetup date has not been announced.',
			statusEs: 'La próxima fecha de encuentro aún no se ha anunciado.',
			ctaEn: 'Explore the gatherings',
			ctaEs: 'Conoce los encuentros',
			href: '/events',
			art: images.events
		},
		{
			id: 'workshops',
			n: '02',
			en: 'Make something useful',
			es: 'Crea algo útil',
			tagEn: 'THE HANDS-ON PART',
			tagEs: 'MANOS A LA OBRA',
			titleEn: 'Bring a task. Find a new way through it.',
			titleEs: 'Trae una tarea. Encuentra otra forma de resolverla.',
			bodyEn:
				'Better prompts. Clearer workflows. A small project you can explain. We’re shaping workshops around trying things together, with room to ask, get stuck, and improve.',
			bodyEs:
				'Mejores prompts. Flujos más claros. Un proyecto pequeño que puedas explicar. Estamos preparando talleres para probar juntos, preguntar, trabarnos y mejorar.',
			statusEn: 'Dates and pricing are pending. Registration is not open.',
			statusEs: 'Fechas y precios pendientes. Las inscripciones no están abiertas.',
			ctaEn: 'Inside the workshop plan',
			ctaEs: 'Conoce el plan del taller',
			href: '/workshops',
			art: images.workshops
		},
		{
			id: 'prompts',
			n: '03',
			en: 'Follow a better prompt',
			es: 'Prueba un mejor prompt',
			tagEn: 'THE NEXT EXPERIMENT',
			tagEs: 'EL SIGUIENTE EXPERIMENTO',
			titleEn: 'Skip the blank page. Start with a real task.',
			titleEs: 'Sal de la página en blanco. Empieza con una tarea real.',
			bodyEn:
				'Detailed workflows for research, content, automation, building and more. Add your context, edit the brief, and check what comes back.',
			bodyEs:
				'Flujos detallados para investigar, crear contenido, automatizar y construir. Añade contexto, edita las instrucciones y revisa el resultado.',
			statusEn: `${prompts.length} editable templates. English + Spanish.`,
			statusEs: `${prompts.length} plantillas editables. Inglés + español.`,
			ctaEn: 'Open the prompt field guide',
			ctaEs: 'Abre la guía práctica de prompts',
			href: '/prompt-library',
			art: images.prompts
		}
	];
	const active = $derived(directions.find((d) => d.id === selected) ?? directions[1]);
	const featured = prompts.filter((p) =>
		[
			'decision-brief-with-evidence',
			'automation-opportunity-map',
			'hands-on-workshop-design'
		].includes(p.slug)
	);
</script>

<Seo
	title={{ en: 'Good ideas. Better together.', es: 'Buenas ideas. Mejor juntos.' }}
	description={{
		en: 'A community for curious people exploring practical AI. Meet, make, and find your next experiment with We’ve Got Now.',
		es: 'Una comunidad para explorar la IA práctica. Conecta, crea y descubre tu próximo experimento con We’ve Got Now.'
	}}
	path="/"
/>

<section class="r8-opening">
	<div class="shell r8-hero">
		<div class="r8-hero-light" aria-hidden="true"></div>
		<div class="r8-hero-art">
			<ConceptArt base={images.events.base} alt={images.events.alt} eager />
		</div>
		<div class="r8-hero-copy">
			<p class="eyebrow">
				<span>WE’VE GOT NOW</span><span class="r8-slash" aria-hidden="true">/</span
				>{language.locale === 'en' ? 'AI TOOLS EXPLORERS NIGHT' : 'AI TOOLS EXPLORERS NIGHT'}
			</p>
			<h1>
				{#if language.locale === 'en'}Good ideas.<br /><span>Better together.</span>{:else}Buenas
					ideas.<br /><span>Mejor juntos.</span>{/if}
			</h1>
			<p class="r8-hero-description">
				{language.locale === 'en'
					? 'Less figuring it out alone. More “wait, let’s try that.” Explore AI, make something useful, and find your people.'
					: 'Menos descubrirlo a solas. Más «espera, probemos eso». Explora la IA, crea algo útil y encuentra tu comunidad.'}
			</p>
			<div class="button-row">
				<a class="button primary" href="#find-your-spark"
					>{language.locale === 'en' ? 'Find your next spark' : 'Encuentra tu próxima idea'}<span
						aria-hidden="true">↘</span
					></a
				><a class="r8-text-link" href="/workshops"
					>{language.locale === 'en' ? 'Explore workshops' : 'Explora los talleres'}<span
						aria-hidden="true">↗</span
					></a
				>
			</div>
			<div class="r8-signature">
				<span aria-hidden="true">✳</span>
				<p>
					{language.locale === 'en'
						? 'Curious is a good place to start.'
						: 'La curiosidad es un buen comienzo.'}
				</p>
			</div>
		</div>
		<div class="r8-hero-footer">
			<span
				>{language.locale === 'en'
					? 'PRACTICAL AI. HUMAN CONNECTIONS.'
					: 'IA PRÁCTICA. CONEXIONES HUMANAS.'}</span
			><span
				>{language.locale === 'en' ? 'LEARN' : 'APRENDE'} <i>✦</i>
				{language.locale === 'en' ? 'BUILD' : 'CREA'} <i>✦</i>
				{language.locale === 'en' ? 'SHARE' : 'COMPARTE'} <i>✦</i>
				{language.locale === 'en' ? 'CONNECT' : 'CONECTA'}</span
			>
		</div>
	</div>
</section>

<section id="find-your-spark" class="r8-discover chapter">
	<div class="shell">
		<div class="section-header r8-section-heading">
			<div>
				<p class="eyebrow">
					{language.locale === 'en' ? 'CHOOSE YOUR OWN STARTING POINT' : 'ELIGE POR DÓNDE EMPEZAR'}
				</p>
				<h2>{language.locale === 'en' ? 'What brings you here?' : '¿Qué te trae por aquí?'}</h2>
			</div>
			<p>
				{language.locale === 'en'
					? 'A conversation. An experiment. That thing you have been meaning to make. Take the next step that feels like you.'
					: 'Una conversación. Un experimento. Eso que llevas tiempo queriendo crear. Da el siguiente paso a tu manera.'}
			</p>
		</div>
		<div
			class="r8-direction-buttons"
			role="group"
			aria-label={language.locale === 'en' ? 'Choose your direction' : 'Elige tu camino'}
		>
			{#each directions as d}<button
					id={`direction-${d.id}`}
					type="button"
					aria-pressed={selected === d.id}
					aria-controls="direction-preview"
					onclick={() => (selected = d.id)}
					><span>{d.n}</span><strong>{language.locale === 'en' ? d.en : d.es}</strong><span
						aria-hidden="true">↗</span
					></button
				>{/each}
		</div>
		<div
			id="direction-preview"
			class="r8-direction-preview"
			aria-labelledby={`direction-${active.id}`}
		>
			<div class="r8-direction-image">
				{#key active.id}<ConceptArt base={active.art.base} alt={active.art.alt} eager />{/key}
			</div>
			<div class="r8-direction-copy">
				<p class="eyebrow">{language.locale === 'en' ? active.tagEn : active.tagEs}</p>
				<h3>{language.locale === 'en' ? active.titleEn : active.titleEs}</h3>
				<p>{language.locale === 'en' ? active.bodyEn : active.bodyEs}</p>
				<a class="button secondary" href={active.href}
					>{language.locale === 'en' ? active.ctaEn : active.ctaEs}<span aria-hidden="true">↗</span
					></a
				>
				<p class="r8-pending">{language.locale === 'en' ? active.statusEn : active.statusEs}</p>
			</div>
		</div>
	</div>
</section>

<section class="chapter r8-field-guide">
	<div class="shell">
		<div class="section-header r8-section-heading">
			<div>
				<p class="eyebrow">
					{language.locale === 'en' ? 'THE PROMPT FIELD GUIDE' : 'LA GUÍA PRÁCTICA DE PROMPTS'}
				</p>
				<h2>
					{language.locale === 'en'
						? 'Less blank page. More possibility.'
						: 'Menos página en blanco. Más posibilidades.'}
				</h2>
			</div>
			<div class="r8-library-lead">
				<p>
					{language.locale === 'en'
						? 'Real workflows, with the missing middle filled in: what to provide, how to work, and how to check the result.'
						: 'Flujos completos: qué aportar, cómo trabajar y cómo revisar el resultado.'}
				</p>
				<a class="r8-text-link" href="/prompt-library"
					>{language.locale === 'en'
						? `Explore all ${prompts.length} prompts`
						: `Explora los ${prompts.length} prompts`}<span aria-hidden="true">↗</span></a
				>
			</div>
		</div>
		<div class="r8-prompt-grid">
			{#each featured as prompt, i}<a class="r8-prompt-pick" href={`/prompt-library/${prompt.slug}`}
					><div class="r8-pick-top">
						<span>0{i + 1}</span><span>{text(prompt.category, language.locale)}</span>
					</div>
					<h3>{text(prompt.title, language.locale)}</h3>
					<p>{text(prompt.outcome ?? prompt.usefulFor, language.locale)}</p>
					<span class="r8-pick-action"
						>{language.locale === 'en' ? 'Make it your own' : 'Hazlo tuyo'}<span aria-hidden="true"
							>↗</span
						></span
					></a
				>{/each}
		</div>
		<div class="r8-library-foot">
			<span>EN + ES</span>
			<p>
				{language.locale === 'en'
					? 'Editable. Saveable. Yours to experiment with.'
					: 'Editables. Guardables. Listos para experimentar.'}
			</p>
			<a href="/prompt-library"
				>{language.locale === 'en' ? 'Find your next workflow' : 'Encuentra tu próximo flujo'}
				<span aria-hidden="true">→</span></a
			>
		</div>
	</div>
</section>

<section class="chapter r8-people">
	<div class="shell r8-people-grid">
		<div class="r8-people-image">
			<ConceptArt base={images.about.base} alt={images.about.alt} /><span
				class="r8-image-stamp"
				aria-hidden="true"
				>{language.locale === 'en' ? 'LEARN.' : 'APRENDE.'}<br />
				{language.locale === 'en' ? 'BUILD.' : 'CREA.'}<br />
				{language.locale === 'en' ? 'SHARE.' : 'COMPARTE.'}<br /><em
					>{language.locale === 'en' ? 'CONNECT.' : 'CONECTA.'}</em
				></span
			>
		</div>
		<div class="r8-people-copy">
			<p class="eyebrow">
				{language.locale === 'en' ? 'THE PEOPLE ARE THE POINT' : 'LO IMPORTANTE SON LAS PERSONAS'}
			</p>
			<h2>
				{language.locale === 'en'
					? 'Come for the tools. Stay for the people.'
					: 'Ven por las herramientas. Quédate por las personas.'}
			</h2>
			<p>
				{language.locale === 'en'
					? 'You don’t need a perfect project or every answer. Bring the question, the rough version, the idea that won’t leave you alone. There’s a place for that here.'
					: 'No necesitas un proyecto perfecto ni todas las respuestas. Trae tu pregunta, tu primer borrador, esa idea que no te deja en paz. Aquí hay espacio para eso.'}
			</p>
			<div class="r8-people-notes">
				<span
					>{language.locale === 'en' ? 'Ask a better question.' : 'Haz una mejor pregunta.'}</span
				><span
					>{language.locale === 'en'
						? 'Build on someone’s idea.'
						: 'Crea a partir de otra idea.'}</span
				><span
					>{language.locale === 'en'
						? 'Share what you figure out.'
						: 'Comparte lo que descubras.'}</span
				>
			</div>
			<div class="button-row">
				<a class="button primary" href={MEETUP_URL} target="_blank" rel="noreferrer"
					>{language.locale === 'en' ? 'Find WGN on Meetup' : 'Encuentra WGN en Meetup'}<span
						aria-hidden="true">↗</span
					></a
				><a class="r8-text-link" href="/about"
					>{language.locale === 'en' ? 'Meet the community' : 'Conoce la comunidad'}
					<span aria-hidden="true">→</span></a
				>
			</div>
			<p class="r8-pending">
				{language.locale === 'en'
					? 'The next meetup date has not been announced.'
					: 'La próxima fecha de encuentro aún no se ha anunciado.'}
			</p>
		</div>
	</div>
</section>

<section id="join" class="chapter r8-join">
	<div class="shell r8-join-grid">
		<div>
			<p class="eyebrow">
				{language.locale === 'en'
					? 'THE NEXT THING STARTS SMALL'
					: 'LO QUE SIGUE EMPIEZA EN PEQUEÑO'}
			</p>
			<h2>{language.locale === 'en' ? 'What are you curious about?' : '¿Qué te da curiosidad?'}</h2>
			<p>
				{language.locale === 'en'
					? 'A useful question is all it takes to start a conversation.'
					: 'Una buena pregunta basta para iniciar una conversación.'}
			</p>
		</div>
		<div id="join-form"><IntakeForm formType="community" /></div>
	</div>
</section>

<style>
	.r8-opening {
		padding: 28px 0 0;
	}
	.r8-hero {
		position: relative;
		isolation: isolate;
		min-height: 590px;
		padding: 60px 44px 0;
		border: 1px solid #9b8dff42;
		border-radius: 28px;
		background: radial-gradient(ellipse at 10% 15%, #27417a30, transparent 60%), #0d1023;
		box-shadow:
			0 18px 90px #05051580,
			0 0 65px #8b4bf012;
		overflow: hidden;
	}
	.r8-hero-light {
		position: absolute;
		z-index: -1;
		inset: 0;
		background:
			radial-gradient(ellipse at 65% 40%, #ad38ff3b, transparent 55%),
			radial-gradient(ellipse at 15% 100%, #00c7d322, transparent 65%);
	}
	.r8-hero-art {
		position: absolute;
		inset: 0 0 0 28%;
		z-index: -1;
		pointer-events: none;
		mask-image: linear-gradient(90deg, transparent, #000 30%);
	}
	.r8-hero-art:after {
		content: '';
		position: absolute;
		inset: 0;
		background:
			linear-gradient(90deg, #0d1023 0%, #0d1023ed 15%, #0d10239c 38%, #0d10231a 74%),
			linear-gradient(0deg, #0d1023 0%, transparent 40%, #0d102320 80%);
	}
	.r8-hero-art :global(.concept-art) {
		height: 100%;
	}
	.r8-hero-art :global(picture) {
		height: 100%;
		aspect-ratio: auto;
		border: 0;
		border-radius: 0;
		background: transparent;
	}
	.r8-hero-art :global(img) {
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: 55% 45%;
		opacity: 0.92;
	}
	.r8-hero-art :global(figcaption) {
		position: absolute;
		right: 24px;
		bottom: 68px;
		max-width: 26ch;
		text-align: right;
		color: #d2c9e9;
		font-size: 0.65rem;
		line-height: 1.5;
		z-index: 2;
	}
	.r8-hero-copy {
		position: relative;
		max-width: 780px;
		padding-bottom: 48px;
	}
	.r8-hero-copy .eyebrow {
		font-size: 0.63rem;
		letter-spacing: 0.13em;
		gap: 12px;
		color: #a1c4e8;
	}
	.r8-hero-copy .eyebrow:before {
		display: none;
	}
	.r8-hero-copy .eyebrow > span:first-child {
		font-family: Orbitron, sans-serif;
		color: var(--cyan);
		font-size: 0.63rem;
	}
	.r8-slash {
		color: #59658e;
	}
	.r8-hero h1 {
		font-size: clamp(3.25rem, 6.7vw, 6.7rem);
		line-height: 1.02;
		letter-spacing: -0.065em;
		font-weight: 650;
		margin: 24px 0;
	}
	.r8-hero h1 > span {
		color: #edb4ff;
		background: linear-gradient(100deg, #9dfff1 0%, #c7adff 55%, #ff9ee0 100%);
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.r8-hero-description {
		font-size: 1.05rem;
		line-height: 1.7;
		max-width: 40ch;
		color: #c0c9df;
	}
	.r8-hero-copy .button-row {
		gap: 24px;
		margin-top: 24px;
	}
	.r8-text-link {
		display: inline-flex;
		align-items: center;
		gap: 18px;
		min-height: 44px;
		padding: 10px 0;
		font-size: 0.88rem;
		font-weight: 600;
		text-decoration: none;
		color: var(--ink);
	}
	.r8-text-link span {
		color: var(--cyan);
	}
	.r8-text-link:hover {
		color: var(--cyan);
	}
	.r8-signature {
		display: flex;
		gap: 12px;
		align-items: center;
		margin-top: 24px;
		color: #bec6dc;
	}
	.r8-signature > span {
		font-size: 30px;
		color: var(--pink);
		text-shadow: 0 0 24px #ff83d44d;
		animation: spark-turn 30s linear infinite;
	}
	:global([data-ambient-paused]) .r8-signature > span {
		animation-play-state: paused;
	}
	@keyframes spark-turn {
		to {
			transform: rotate(360deg);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.r8-signature > span {
			animation: none;
		}
	}
	.r8-signature p {
		font-size: 0.8rem;
		margin: 0;
	}
	.r8-hero-footer {
		position: relative;
		display: flex;
		gap: 24px;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid #a9b5ff29;
		min-height: 56px;
		font-size: 0.61rem;
		letter-spacing: 0.12em;
		color: #b4b9d3;
	}
	.r8-hero-footer i {
		font-style: normal;
		color: var(--pink);
		margin-inline: 12px;
	}
	.r8-section-heading h2 {
		font-size: clamp(2rem, 3.4vw, 3.2rem);
		max-width: 20ch;
	}
	.r8-section-heading > p,
	.r8-library-lead > p {
		font-size: 0.94rem;
		line-height: 1.7;
		color: var(--muted);
		margin-bottom: 8px;
	}
	.r8-direction-buttons {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		border: 1px solid var(--line);
		border-radius: 16px;
		background: #10152b;
		overflow: hidden;
	}
	.r8-direction-buttons button {
		display: flex;
		gap: 16px;
		align-items: center;
		text-align: left;
		padding: 22px 24px;
		min-height: 82px;
		border: 0;
		border-right: 1px solid var(--line);
		background: transparent;
		color: #b8c2da;
		transition:
			background 0.18s,
			color 0.18s;
	}
	.r8-direction-buttons button:last-child {
		border-right: 0;
	}
	.r8-direction-buttons button > span:first-child {
		font-family: Orbitron, sans-serif;
		font-size: 0.62rem;
		color: #9eaeca;
	}
	.r8-direction-buttons strong {
		font-family: Manrope, sans-serif;
		font-size: 1.04rem;
		font-weight: 600;
		flex: 1;
	}
	.r8-direction-buttons button[aria-pressed='true'] {
		color: var(--ink);
		background: linear-gradient(115deg, #2c2554, #172f43);
		box-shadow: inset 0 -2px var(--cyan);
	}
	.r8-direction-buttons button[aria-pressed='true'] > span {
		color: var(--cyan);
	}
	.r8-direction-buttons button:focus-visible {
		outline-offset: -5px;
	}
	.r8-direction-buttons button:hover {
		background: #24213f;
	}
	.r8-direction-preview {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
		align-items: center;
		padding-top: 30px;
		min-width: 0;
	}
	.r8-direction-image {
		position: relative;
		min-width: 0;
	}
	.r8-direction-image:before {
		content: '';
		position: absolute;
		inset: 8% -3%;
		background: radial-gradient(ellipse, #983cd52b, transparent 70%);
		z-index: -1;
	}
	.r8-direction-image :global(picture) {
		aspect-ratio: 1.6;
		border-radius: 18px;
		border: 1px solid #bd7aff55;
		box-shadow:
			0 0 35px #a63de01c,
			0 0 22px #21d6d61a;
	}
	.r8-direction-image :global(figcaption) {
		font-size: 0.64rem;
		line-height: 1.5;
		color: #a9b5cf;
		margin-top: 10px;
	}
	.r8-direction-copy h3 {
		font-size: clamp(1.6rem, 2.8vw, 2.7rem);
		max-width: 22ch;
		line-height: 1.15;
	}
	.r8-direction-copy > p:not(.eyebrow, .r8-pending) {
		color: var(--muted);
		font-size: 0.95rem;
		line-height: 1.7;
		max-width: 47ch;
	}
	.r8-direction-copy .button {
		margin-top: 4px;
		border-color: #7c81af;
		background: #171c36;
	}
	.r8-pending {
		font-size: 0.75rem;
		line-height: 1.6;
		color: #a9b5cf;
		margin: 16px 0 0;
		max-width: 58ch;
	}
	.r8-field-guide {
		border-block: 1px solid #b797ff26;
		background:
			radial-gradient(ellipse at 80% 20%, #6530c324, transparent 60%),
			linear-gradient(100deg, #10162bba, #111026bb);
	}
	.r8-prompt-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 18px;
	}
	.r8-prompt-pick {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 26px;
		border: 1px solid var(--line);
		border-radius: 18px;
		background: linear-gradient(135deg, #1a2444b3, #11142b);
		text-decoration: none;
		transition:
			transform 0.2s,
			border-color 0.2s,
			box-shadow 0.2s;
		min-width: 0;
	}
	.r8-prompt-pick:nth-child(2) {
		background: linear-gradient(135deg, #23374680, #11142b);
	}
	.r8-prompt-pick:nth-child(3) {
		background: linear-gradient(135deg, #38214880, #11142b);
	}
	.r8-prompt-pick:hover {
		transform: translateY(-3px);
		border-color: #ad8cff;
		box-shadow: 0 10px 34px #7844c51c;
	}
	.r8-pick-top {
		display: flex;
		gap: 16px;
		justify-content: space-between;
		align-items: start;
		font-size: 0.66rem;
		line-height: 1.5;
		color: #bbb9d8;
		margin-bottom: 22px;
	}
	.r8-pick-top > span:first-child {
		font-family: Orbitron, sans-serif;
		color: var(--cyan);
	}
	.r8-prompt-pick h3 {
		font-size: 1.35rem;
		line-height: 1.3;
		letter-spacing: -0.035em;
	}
	.r8-prompt-pick p {
		font-size: 0.87rem;
		line-height: 1.7;
		color: var(--muted);
		margin-bottom: 24px;
	}
	.r8-pick-action {
		display: flex;
		justify-content: space-between;
		gap: 14px;
		margin-top: auto;
		font-size: 0.8rem;
		color: var(--cyan);
	}
	.r8-library-foot {
		display: flex;
		gap: 16px;
		align-items: center;
		flex-wrap: wrap;
		padding-top: 24px;
		font-size: 0.78rem;
		color: #b5bed5;
	}
	.r8-library-foot > span {
		color: var(--pink);
		border: 1px solid #d27dce42;
		border-radius: 5px;
		padding: 3px 6px;
		font-size: 0.64rem;
	}
	.r8-library-foot p {
		margin: 0;
		flex: 1;
	}
	.r8-library-foot a {
		min-height: 44px;
		display: inline-flex;
		align-items: center;
		gap: 12px;
		color: #ddd7f7;
	}
	.r8-people-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
		align-items: center;
	}
	.r8-people-image {
		position: relative;
		min-width: 0;
	}
	.r8-people-image :global(picture) {
		aspect-ratio: 1.1;
		border: 1px solid #69d8dd50;
		border-radius: 22px;
		box-shadow: 0 0 50px #14b8cc1b;
	}
	.r8-people-image :global(img) {
		object-position: 55% center;
	}
	.r8-people-image :global(figcaption) {
		font-size: 0.64rem;
		line-height: 1.5;
		color: #a9b5cf;
	}
	.r8-image-stamp {
		position: absolute;
		bottom: 46px;
		left: 24px;
		font:
			750 clamp(1rem, 2.4vw, 2rem)/1.08 Manrope,
			sans-serif;
		letter-spacing: -0.04em;
		color: white;
		text-shadow:
			0 2px 14px #070b18,
			0 0 22px #070b18;
		background: linear-gradient(90deg, #11142bcc, transparent);
		padding: 12px;
	}
	.r8-image-stamp em {
		color: var(--cyan);
		font-style: normal;
	}
	.r8-people-copy h2 {
		font-size: clamp(2rem, 3.5vw, 3.5rem);
		max-width: 16ch;
	}
	.r8-people-copy > p:not(.eyebrow, .r8-pending) {
		color: var(--muted);
		font-size: 0.97rem;
		max-width: 47ch;
	}
	.r8-people-notes {
		display: grid;
		gap: 10px;
		margin-block: 22px;
		color: #d2c9ee;
		font-size: 0.87rem;
	}
	.r8-people-notes > span:before {
		content: '✦';
		color: var(--pink);
		margin-right: 12px;
	}
	.r8-people-copy .button-row {
		gap: 20px;
		margin-top: 16px;
	}
	.r8-join {
		background: radial-gradient(ellipse at 20% 20%, #92368630, transparent 65%), #15152acc;
		border-block: 1px solid #ab88d935;
	}
	.r8-join-grid {
		display: grid;
		grid-template-columns: 0.85fr 1.15fr;
		gap: 40px;
		align-items: start;
	}
	.r8-join h2 {
		font-size: clamp(2rem, 3.6vw, 3.5rem);
		max-width: 15ch;
	}
	.r8-join-grid > div > p:not(.eyebrow) {
		color: var(--muted);
	}
	.r8-join :global(.intake-card) {
		padding: 26px;
		background: #11162ce6;
		border-color: #b29be042;
		box-shadow: 0 0 28px #74378415;
	}
	.r8-join :global(.intake-card h2) {
		font-size: 1.55rem;
		letter-spacing: -0.035em;
		max-width: 25ch;
	}
	@media (min-width: 1700px) {
		.r8-hero h1 {
			font-size: 7rem;
		}
		.r8-hero {
			min-height: 630px;
		}
	}
	@media (max-width: 1100px) {
		.r8-hero {
			padding: 44px 30px 0;
			min-height: 550px;
		}
		.r8-hero h1 {
			font-size: 6.4vw;
		}
		.r8-hero-art {
			left: 20%;
		}
		.r8-direction-buttons button {
			padding: 18px 16px;
			gap: 10px;
		}
		.r8-direction-buttons strong {
			font-size: 0.92rem;
		}
		.r8-direction-preview,
		.r8-people-grid {
			gap: 28px;
		}
		.r8-people-copy .button-row {
			gap: 12px;
		}
	}
	@media (max-width: 760px) {
		.r8-opening {
			padding-top: 18px;
		}
		.r8-hero {
			padding: 34px 26px 0;
			min-height: 0;
			border-radius: 22px;
		}
		.r8-hero h1 {
			font-size: clamp(3rem, 8.7vw, 4.5rem);
			max-width: 17ch;
		}
		.r8-hero-copy {
			padding-bottom: 180px;
			max-width: 100%;
		}
		.r8-hero-description {
			max-width: 38ch;
			font-size: 0.95rem;
		}
		.r8-hero-art {
			inset: 0 0 0 10%;
			mask-image: linear-gradient(180deg, transparent, #000 45%);
		}
		.r8-hero-art:after {
			background:
				linear-gradient(180deg, #0d1023f7 0%, #0d1023e8 35%, #0d10232b 75%, #0d1023 100%),
				linear-gradient(90deg, #0d102390, transparent);
		}
		.r8-hero-art :global(img) {
			object-position: 62% bottom;
		}
		.r8-hero-art :global(figcaption) {
			bottom: 72px;
			max-width: 30ch;
			font-size: 0.6rem;
		}
		.r8-hero-footer {
			font-size: 0.55rem;
			gap: 12px;
			flex-wrap: wrap;
			justify-content: center;
			padding-block: 14px;
		}
		.r8-hero-footer > span:first-child {
			display: none;
		}
		.r8-hero-footer i {
			margin-inline: 6px;
		}
		.r8-signature {
			margin-top: 14px;
		}
		.r8-direction-buttons {
			grid-template-columns: 1fr;
		}
		.r8-direction-buttons button {
			min-height: 62px;
			border-right: 0;
			border-bottom: 1px solid var(--line);
			padding: 14px 18px;
		}
		.r8-direction-buttons button:last-child {
			border-bottom: 0;
		}
		.r8-direction-buttons strong {
			font-size: 1rem;
		}
		.r8-direction-preview {
			grid-template-columns: 1fr;
			gap: 22px;
		}
		.r8-direction-image :global(picture) {
			aspect-ratio: 1.7;
		}
		.r8-direction-copy h3 {
			max-width: 26ch;
			font-size: 1.9rem;
		}
		.r8-prompt-grid {
			grid-template-columns: 1fr;
		}
		.r8-prompt-pick {
			padding: 22px;
		}
		.r8-pick-top {
			margin-bottom: 14px;
		}
		.r8-prompt-pick p {
			margin-bottom: 20px;
		}
		.r8-people-grid {
			grid-template-columns: 1fr;
			gap: 26px;
		}
		.r8-people-image :global(picture) {
			aspect-ratio: 1.4;
		}
		.r8-people-copy h2 {
			max-width: 21ch;
		}
		.r8-join-grid {
			grid-template-columns: 1fr;
			gap: 20px;
		}
		.r8-join h2 {
			max-width: 22ch;
		}
		.r8-library-foot {
			gap: 12px;
		}
		.r8-library-foot p {
			flex-basis: calc(100% - 90px);
		}
		.r8-library-foot a {
			width: 100%;
		}
		.r8-image-stamp {
			font-size: 1.65rem;
		}
	}
	@media (max-width: 450px) {
		.r8-hero {
			padding: 28px 20px 0;
		}
		.r8-hero-copy .eyebrow {
			flex-wrap: wrap;
			gap: 8px;
			font-size: 0.55rem;
		}
		.r8-hero-copy .eyebrow > span:first-child {
			font-size: 0.55rem;
		}
		.r8-hero h1 {
			font-size: clamp(2.7rem, 10vw, 3.8rem);
			line-height: 1.05;
			letter-spacing: -0.06em;
		}
		.r8-hero-copy .button-row {
			gap: 8px;
			align-items: flex-start;
			flex-direction: column;
			margin-top: 20px;
		}
		.r8-hero-copy {
			padding-bottom: 165px;
		}
		.r8-hero-description {
			font-size: 0.91rem;
		}
		.r8-hero-art {
			left: 0;
		}
		.r8-hero-art :global(figcaption) {
			right: 16px;
			bottom: 70px;
			max-width: 30ch;
		}
		.r8-hero-footer {
			font-size: 0.5rem;
		}
		.r8-join :global(.intake-card) {
			padding: 22px;
		}
		.r8-prompt-pick h3 {
			font-size: 1.3rem;
		}
	}
</style>
