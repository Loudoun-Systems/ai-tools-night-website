<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import IntakeForm from '$lib/components/IntakeForm.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { events, images, LINKEDIN_URL, MEETUP_URL, nextConfirmedEvent } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';

	const language = useLanguage();
	const nextEvent = nextConfirmedEvent(events);
</script>

<Seo
	title={{ en: 'AI Tools Explorers Night', es: 'Noche de exploración de herramientas de IA' }}
	description={{
		en: 'Learn practical AI workflows, share what you build and connect through honest community events and hands-on learning.',
		es: 'Aprende flujos prácticos de IA, comparte lo que creas y conecta mediante eventos y aprendizaje práctico.'
	}}
	path="/"
/>

<section class="hero">
	<div class="hero-media">
		<picture>
			<source srcset="/assets/derived/wgn-hero-1536.webp" type="image/webp" />
			<img
				src="/assets/originals/wgn-hero-original.jpg"
				alt="Neon skyline with the We've Got Now explorer figure and meetup wordmark"
				width="1536"
				height="1024"
				fetchpriority="high"
			/>
		</picture>
	</div>
	<div class="shell hero-content">
		<div class="hero-copy">
			<p class="hero-status">
				{#if nextEvent}
					{language.locale === 'en'
						? `Next confirmed: ${nextEvent.title.en}`
						: `Próximo confirmado: ${nextEvent.title.es}`}
				{:else}
					{language.locale === 'en'
						? 'No next date is confirmed yet'
						: 'Aún no hay una próxima fecha confirmada'}
				{/if}
			</p>
			<p class="eyebrow">
				{language.locale === 'en'
					? 'Learn · Build · Share · Connect'
					: 'Aprende · Crea · Comparte · Conecta'}
			</p>
			<h1>
				{language.locale === 'en' ? 'Practical AI starts with ' : 'La IA práctica empieza con '}
				<span class="gradient-text"
					>{language.locale === 'en' ? 'one real task.' : 'una tarea real.'}</span
				>
			</h1>
			<p class="lede">
				{language.locale === 'en'
					? 'AI Tools Explorers Night brings curious people together to learn useful workflows, share what they are building and make real connections.'
					: 'AI Tools Explorers Night reúne a personas curiosas para aprender flujos útiles, compartir lo que crean y formar conexiones reales.'}
			</p>
			<div class="button-row">
				<a class="button primary" href="/events"
					>{language.locale === 'en' ? 'Explore events' : 'Explorar eventos'}</a
				>
				<a class="button secondary" href="#join"
					>{language.locale === 'en' ? 'Join the community' : 'Únete a la comunidad'}</a
				>
			</div>
		</div>
	</div>
</section>

<section class="section shell">
	<div class="section-header">
		<div>
			<p class="eyebrow">
				{language.locale === 'en' ? 'Two ways to participate' : 'Dos formas de participar'}
			</p>
			<h2>{language.locale === 'en' ? 'Meet up. Work hands-on.' : 'Conecta. Aprende haciendo.'}</h2>
		</div>
		<p>
			{language.locale === 'en'
				? 'Community meetups and MyGuyGus workshops are distinct experiences with separate interest and registration records.'
				: 'Los encuentros y talleres de MyGuyGus son experiencias distintas con registros separados.'}
		</p>
	</div>
	<div class="card-grid">
		<article class="card">
			<span class="chip"
				>{language.locale === 'en' ? 'Community meetup' : 'Encuentro comunitario'}</span
			>
			<h3>
				{language.locale === 'en'
					? 'See useful demos and meet builders'
					: 'Mira demos útiles y conoce a personas que crean'}
			</h3>
			<p>
				{language.locale === 'en'
					? 'A structured space for practical ideas, questions and real connections.'
					: 'Un espacio estructurado para ideas prácticas, preguntas y conexiones reales.'}
			</p>
			<a href="/events"
				>{language.locale === 'en'
					? 'View event history and updates →'
					: 'Ver historial y novedades →'}</a
			>
		</article>
		<article class="card">
			<span class="chip">{language.locale === 'en' ? 'Hands-on workshop' : 'Taller práctico'}</span>
			<h3>
				{language.locale === 'en'
					? 'Bring one task and build around it'
					: 'Trae una tarea y crea una solución'}
			</h3>
			<p>
				{language.locale === 'en'
					? 'Beginner-friendly monthly Sunday sessions are planned. Dates and pricing are pending.'
					: 'Se planean sesiones mensuales los domingos para principiantes. Fecha y precio pendientes.'}
			</p>
			<a href="/workshops"
				>{language.locale === 'en'
					? 'See the planned workshop →'
					: 'Ver el taller planificado →'}</a
			>
		</article>
		<article class="card">
			<span class="chip">{language.locale === 'en' ? 'Anytime' : 'Cuando quieras'}</span>
			<h3>
				{language.locale === 'en'
					? 'Start with a practical prompt'
					: 'Empieza con un prompt práctico'}
			</h3>
			<p>
				{language.locale === 'en'
					? 'Edit and copy five bilingual templates built for everyday work.'
					: 'Edita y copia cinco plantillas bilingües para el trabajo diario.'}
			</p>
			<a href="/prompt-library"
				>{language.locale === 'en' ? 'Open the prompt library →' : 'Abrir la biblioteca →'}</a
			>
		</article>
	</div>
</section>

<section class="section shell split">
	<ConceptArt base={images.about.base} alt={images.about.alt} />
	<div>
		<p class="eyebrow">
			{language.locale === 'en'
				? 'Built for people doing the work'
				: 'Para personas que hacen el trabajo'}
		</p>
		<h2>
			{language.locale === 'en'
				? 'Curiosity is useful when it becomes action.'
				: 'La curiosidad sirve cuando se convierte en acción.'}
		</h2>
		<ul class="feature-list">
			<li>
				{language.locale === 'en'
					? 'Learn one practical idea without needing to know every tool.'
					: 'Aprende una idea práctica sin conocer todas las herramientas.'}
			</li>
			<li>
				{language.locale === 'en'
					? 'Build something small enough to finish and explain.'
					: 'Crea algo pequeño que puedas terminar y explicar.'}
			</li>
			<li>
				{language.locale === 'en'
					? 'Share lessons honestly, including what still needs checking.'
					: 'Comparte lo aprendido con honestidad, incluso lo que falta verificar.'}
			</li>
			<li>
				{language.locale === 'en'
					? 'Connect with respect, substance and clear expectations.'
					: 'Conecta con respeto, sustancia y expectativas claras.'}
			</li>
		</ul>
		<div class="button-row">
			<a class="button secondary" href={MEETUP_URL} target="_blank" rel="noreferrer">Meetup</a>
			<a class="button secondary" href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
		</div>
	</div>
</section>

<section id="join" class="section shell">
	<div id="join-form"><IntakeForm formType="community" /></div>
</section>
