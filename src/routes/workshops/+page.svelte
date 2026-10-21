<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import IntakeForm from '$lib/components/IntakeForm.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { images, text, MEETUP_URL } from '$lib/content';
	import copy from '$lib/r6-copy.json';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
	const areas = [
		{
			n: '01',
			en: 'Make your thinking clearer.',
			es: 'Dale claridad a tus ideas.',
			bodyEn:
				'Frame a useful question. Add context, examples and constraints. Learn what to ask next when an answer misses the point.',
			bodyEs:
				'Plantea una pregunta útil. Añade contexto, ejemplos y límites. Aprende qué preguntar cuando una respuesta no da en el punto.'
		},
		{
			n: '02',
			en: 'Make the repetitive part easier.',
			es: 'Simplifica lo repetitivo.',
			bodyEn:
				'Break an everyday task into steps. Explore where AI can help and where your own judgment still matters.',
			bodyEs:
				'Divide una tarea cotidiana en pasos. Explora dónde ayuda la IA y dónde sigue importando tu propio criterio.'
		},
		{
			n: '03',
			en: 'Make something you can explain.',
			es: 'Crea algo que puedas explicar.',
			bodyEn:
				'Work on a small prototype, a draft, or a workflow. Compare versions, check assumptions, and share the useful part.',
			bodyEs:
				'Trabaja en un prototipo, borrador o flujo pequeño. Compara versiones, revisa supuestos y comparte lo útil.'
		}
	];
</script>

<Seo
	title={{ en: 'Workshops for curious people', es: 'Talleres para personas curiosas' }}
	description={copy.workshops.lead}
	path="/workshops"
/>
<section class="ws-opening">
	<div class="shell">
		<div class="ws-topline">
			<p class="eyebrow">
				{language.locale === 'en' ? 'MYGUYGUS × WE’VE GOT NOW' : 'MYGUYGUS × WE’VE GOT NOW'}
			</p>
			<span class="ws-status"
				><i aria-hidden="true"></i>{language.locale === 'en'
					? 'In the making'
					: 'En preparación'}</span
			>
		</div>
		<div class="ws-heading">
			<h1>
				{language.locale === 'en'
					? 'Get your hands on a good idea.'
					: 'Pon manos a una buena idea.'}
			</h1>
			<div>
				<p class="lede">
					{language.locale === 'en'
						? 'A workshop should give you room to try, ask, get stuck, and try again. We’re building ours around the work you actually want to do.'
						: 'Un taller debe darte espacio para probar, preguntar, trabarte y volver a intentarlo. Estamos creando los nuestros alrededor de tareas que de verdad te interesan.'}
				</p>
				<a class="text-link" href="#the-plan"
					>{language.locale === 'en' ? 'Explore the draft plan' : 'Explora el plan inicial'}
					<span aria-hidden="true">↓</span></a
				>
			</div>
		</div>
		<div class="ws-visual">
			<ConceptArt base={images.workshops.base} alt={images.workshops.alt} eager />
			<div class="ws-art-note">
				<span>{language.locale === 'en' ? 'LEARN BY DOING' : 'APRENDE HACIENDO'}</span><strong
					>{language.locale === 'en'
						? 'Your task.\nYour next step.'
						: 'Tu tarea.\nTu siguiente paso.'}</strong
				>
			</div>
		</div>
		<p class="status-line">{text(copy.workshops.status, language.locale)}</p>
	</div>
</section>
<section class="chapter ws-practice" id="the-plan">
	<div class="shell">
		<div class="section-header">
			<div>
				<p class="eyebrow">
					{language.locale === 'en' ? 'THE PLAN TAKING SHAPE' : 'EL PLAN QUE ESTAMOS CREANDO'}
				</p>
				<h2>
					{language.locale === 'en'
						? 'A useful task changes the conversation.'
						: 'Una tarea útil cambia la conversación.'}
				</h2>
			</div>
			<p>
				{language.locale === 'en'
					? 'These are the learning areas we’re exploring. Final sessions, tools and requirements will be announced with each confirmed workshop.'
					: 'Estas son las áreas de aprendizaje que estamos explorando. Publicaremos sesiones, herramientas y requisitos con cada taller confirmado.'}
			</p>
		</div>
		<div class="ws-practice-list">
			{#each areas as area}<article>
					<span class="ws-number">{area.n}</span>
					<h3>{language.locale === 'en' ? area.en : area.es}</h3>
					<p>{language.locale === 'en' ? area.bodyEn : area.bodyEs}</p>
				</article>{/each}
		</div>
	</div>
</section>
<section class="chapter ws-how">
	<div class="shell ws-how-grid">
		<div>
			<p class="eyebrow">
				{language.locale === 'en'
					? 'NOT A TEST. A PLACE TO TRY.'
					: 'NO ES UN EXAMEN. ES UN ESPACIO PARA PROBAR.'}
			</p>
			<h2>
				{language.locale === 'en'
					? 'Start where you are. Bring what makes you curious.'
					: 'Empieza donde estés. Trae lo que te da curiosidad.'}
			</h2>
			<p class="lede">
				{language.locale === 'en'
					? 'The draft series is beginner-friendly. You don’t need the perfect project or every tool figured out. A question and a manageable example are a good place to begin.'
					: 'La serie inicial está pensada para principiantes. No necesitas el proyecto perfecto ni conocer todas las herramientas. Una pregunta y un ejemplo manejable son un buen comienzo.'}
			</p>
			<a class="text-link" href="/prompt-library"
				>{language.locale === 'en'
					? 'Try a workflow before you come'
					: 'Prueba un flujo antes de venir'} <span aria-hidden="true">↗</span></a
			>
		</div>
		<ol class="ws-flow">
			{#each [{ en: 'Choose one real task', es: 'Elige una tarea real', noteEn: 'Something small enough to explore.', noteEs: 'Algo suficientemente pequeño para explorar.' }, { en: 'Try an approach together', es: 'Prueben una idea juntos', noteEn: 'Ask questions. Compare what happens.', noteEs: 'Haz preguntas. Compara lo que pasa.' }, { en: 'Keep your own judgment', es: 'Mantén tu propio criterio', noteEn: 'Check the result. Decide what is useful.', noteEs: 'Revisa el resultado. Decide qué sirve.' }, { en: 'Take the next step', es: 'Da el siguiente paso', noteEn: 'Leave with something you can keep working on.', noteEs: 'Sal con algo que puedas seguir trabajando.' }] as step, i}<li
				>
					<span>0{i + 1}</span>
					<div>
						<h3>{language.locale === 'en' ? step.en : step.es}</h3>
						<p>{language.locale === 'en' ? step.noteEn : step.noteEs}</p>
					</div>
				</li>{/each}
			<li class="ws-flow-disclosure">{text(copy.workshops.flowNote, language.locale)}</li>
		</ol>
	</div>
</section>
<section class="chapter">
	<div class="shell ws-details-grid">
		<aside class="planning-note">
			<p class="eyebrow">
				{language.locale === 'en' ? 'THE PRACTICAL DETAILS' : 'LOS DETALLES PRÁCTICOS'}
			</p>
			<h2>{language.locale === 'en' ? 'Still taking shape.' : 'Seguimos dándole forma.'}</h2>
			<dl>
				<div>
					<dt>{language.locale === 'en' ? 'Dates & times' : 'Fechas y horarios'}</dt>
					<dd>{language.locale === 'en' ? 'To be announced' : 'Por anunciar'}</dd>
				</div>
				<div>
					<dt>{language.locale === 'en' ? 'Pricing' : 'Precio'}</dt>
					<dd>{language.locale === 'en' ? 'To be announced' : 'Por anunciar'}</dd>
				</div>
				<div>
					<dt>{language.locale === 'en' ? 'Registration' : 'Inscripciones'}</dt>
					<dd>{language.locale === 'en' ? 'Not open yet' : 'Aún no disponibles'}</dd>
				</div>
			</dl>
			<p>
				{language.locale === 'en'
					? 'Confirmed details will appear here. This page does not accept payments or reserve seats.'
					: 'Publicaremos aquí los detalles confirmados. Esta página no acepta pagos ni reserva cupos.'}
			</p>
			<a class="button secondary" href={MEETUP_URL} target="_blank" rel="noreferrer"
				>{language.locale === 'en' ? 'Explore the community' : 'Conoce la comunidad'}<span
					aria-hidden="true">↗</span
				></a
			>
		</aside>
		<div id="workshop-faq">
			<p class="eyebrow">
				{language.locale === 'en' ? 'A FEW GOOD QUESTIONS' : 'ALGUNAS BUENAS PREGUNTAS'}
			</p>
			<h2>{language.locale === 'en' ? 'Before you jump in.' : 'Antes de empezar.'}</h2>
			<div class="faq-list">
				{#each copy.workshopFaq as faq}<details>
						<summary>{text(faq.q, language.locale)}</summary>
						<p>{text(faq.a, language.locale)}</p>
					</details>{/each}
			</div>
		</div>
	</div>
</section>
<section class="section shell"><IntakeForm formType="workshop_interest" /></section>

<style>
	.ws-opening {
		padding: 90px 0 48px;
	}
	.ws-topline {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		margin-bottom: 42px;
	}
	.ws-topline .eyebrow {
		margin: 0;
	}
	.ws-status {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		padding: 8px 14px;
		border: 1px solid var(--line);
		border-radius: 100px;
		font-size: 0.74rem;
		color: #d0c3f4;
	}
	.ws-status i {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: currentColor;
	}
	.ws-heading {
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		align-items: end;
		gap: 100px;
		margin-bottom: 54px;
	}
	.ws-heading h1 {
		font-size: clamp(3rem, 5.8vw, 6.2rem);
		max-width: 13ch;
		margin: 0;
		letter-spacing: -0.055em;
	}
	.ws-heading .lede {
		font-size: 1.1rem;
		max-width: 43ch;
	}
	.ws-visual {
		position: relative;
	}
	.ws-visual :global(.concept-art picture) {
		aspect-ratio: 2.8;
		border-radius: 24px;
	}
	.ws-visual :global(.concept-art img) {
		object-position: center 47%;
	}
	.ws-visual :global(figcaption) {
		max-width: 60ch;
	}
	.ws-art-note {
		position: absolute;
		right: 36px;
		top: 36px;
		background: #f4f1e9;
		color: #19243b;
		border-radius: 16px;
		padding: 22px 26px;
		transform: rotate(3deg);
		box-shadow: 0 10px 30px #060a1f40;
	}
	.ws-art-note > span {
		font:
			600 0.63rem/1.5 Orbitron,
			sans-serif;
		letter-spacing: 0.08em;
	}
	.ws-art-note strong {
		display: block;
		font:
			600 1.6rem/1.2 Manrope,
			sans-serif;
		letter-spacing: -0.04em;
		white-space: pre-line;
		margin-top: 12px;
	}
	.status-line {
		margin: 26px 0 0;
		font-size: 0.85rem;
		color: var(--muted);
		padding-top: 24px;
		border-top: 1px solid var(--line);
	}
	.ws-practice {
		background: #f4f1e9;
		color: #172238;
	}
	.ws-practice .eyebrow {
		color: #50697e;
	}
	.ws-practice .section-header > p {
		color: #626b79;
	}
	.ws-practice-list {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 48px;
		margin-top: 64px;
	}
	.ws-practice-list article {
		border-top: 1px solid #d1d3d4;
		padding-top: 26px;
	}
	.ws-number {
		display: block;
		font:
			0.7rem Orbitron,
			sans-serif;
		color: #64788a;
		margin-bottom: 44px;
	}
	.ws-practice-list h3 {
		font-size: 1.5rem;
		max-width: 18ch;
		line-height: 1.25;
	}
	.ws-practice-list p {
		font-size: 0.95rem;
		color: #626b79;
	}
	.ws-how {
		background: #111c30;
	}
	.ws-how-grid {
		display: grid;
		grid-template-columns: 1fr 0.8fr;
		gap: 150px;
		align-items: start;
	}
	.ws-how-grid h2 {
		max-width: 17ch;
	}
	.ws-how-grid .lede {
		max-width: 43ch;
		font-size: 1.1rem;
	}
	.ws-flow {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.ws-flow li {
		display: grid;
		grid-template-columns: 32px 1fr;
		gap: 24px;
		border-top: 1px solid var(--line);
		padding: 28px 0;
	}
	.ws-flow li > span {
		font-size: 0.74rem;
		color: var(--cyan);
	}
	.ws-flow h3 {
		font-size: 1.3rem;
		margin-bottom: 8px;
	}
	.ws-flow p {
		font-size: 0.9rem;
		color: var(--muted);
		margin: 0;
	}
	.ws-flow li.ws-flow-disclosure {
		display: block;
		color: var(--muted);
		font-size: 0.73rem;
		padding-top: 20px;
	}
	.ws-details-grid {
		display: grid;
		grid-template-columns: 0.75fr 1.25fr;
		gap: 120px;
		align-items: start;
	}
	.planning-note {
		padding: 36px;
		border: 1px solid var(--line);
		border-radius: 24px;
		background: #172037;
	}
	.planning-note h2 {
		font-size: 2rem;
		max-width: 15ch;
	}
	.planning-note dl {
		margin: 28px 0;
	}
	.planning-note dl > div {
		padding: 16px 0;
		border-top: 1px solid var(--line);
	}
	.planning-note dt {
		color: var(--muted);
		font-size: 0.75rem;
		margin-bottom: 4px;
	}
	.planning-note dd {
		margin: 0;
		font-size: 0.95rem;
	}
	.planning-note > p:not(.eyebrow) {
		font-size: 0.82rem;
		color: var(--muted);
	}
	.planning-note .button {
		font-size: 0.8rem;
		padding-inline: 18px;
	}
	.ws-details-grid > .planning-note {
		position: sticky;
		top: 30px;
	}
	.ws-details-grid .faq-list {
		margin-top: 30px;
	}
	@media (max-width: 1100px) {
		.ws-heading {
			gap: 50px;
		}
		.ws-how-grid {
			gap: 70px;
		}
		.ws-details-grid {
			gap: 60px;
		}
		.ws-practice-list {
			gap: 32px;
		}
	}
	@media (max-width: 760px) {
		.ws-opening {
			padding-top: 60px;
		}
		.ws-topline {
			align-items: start;
			gap: 14px;
			flex-wrap: wrap;
			margin-bottom: 32px;
		}
		.ws-status {
			font-size: 0.65rem;
			padding: 6px 10px;
		}
		.ws-topline .eyebrow {
			font-size: 0.6rem;
		}
		.ws-heading {
			grid-template-columns: 1fr;
			gap: 28px;
			margin-bottom: 36px;
		}
		.ws-heading h1 {
			font-size: clamp(2.8rem, 11vw, 4.2rem);
			max-width: 15ch;
		}
		.ws-heading .lede {
			font-size: 1.02rem;
		}
		.ws-visual :global(.concept-art picture) {
			aspect-ratio: 1.4;
			border-radius: 18px;
		}
		.ws-art-note {
			position: relative;
			inset: auto;
			width: fit-content;
			margin: 18px 0 0 auto;
			transform: none;
			padding: 14px 20px;
		}
		.ws-art-note strong {
			font-size: 1.2rem;
			margin-top: 6px;
			white-space: normal;
		}
		.ws-art-note > span {
			font-size: 0.58rem;
		}
		.status-line {
			font-size: 0.78rem;
		}
		.ws-practice-list {
			grid-template-columns: 1fr;
			gap: 28px;
			margin-top: 36px;
		}
		.ws-practice-list article {
			display: grid;
			grid-template-columns: 32px 1fr;
			gap: 0 18px;
			padding-top: 24px;
		}
		.ws-number {
			grid-row: 1/3;
			margin: 3px 0 0;
			font-size: 0.65rem;
		}
		.ws-practice-list h3 {
			font-size: 1.35rem;
			max-width: none;
		}
		.ws-practice-list p {
			grid-column: 2;
			font-size: 0.9rem;
			margin: 0;
		}
		.ws-how-grid {
			grid-template-columns: 1fr;
			gap: 40px;
		}
		.ws-how-grid .lede {
			font-size: 1rem;
		}
		.ws-details-grid {
			grid-template-columns: 1fr;
			gap: 54px;
		}
		.ws-details-grid > .planning-note {
			position: static;
			padding: 26px;
		}
		.ws-flow li {
			gap: 16px;
			padding: 24px 0;
		}
		.ws-flow h3 {
			font-size: 1.15rem;
		}
		.ws-art-note {
			max-width: 90%;
		}
	}
</style>
