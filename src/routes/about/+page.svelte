<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { images, LINKEDIN_URL, MEETUP_URL } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
</script>

<Seo
	title={{ en: 'About', es: 'Nosotros' }}
	description={{
		en: "Learn how We've Got Now makes room for practical AI demonstrations, beginner-friendly practice and respectful connection.",
		es: 'Conoce cómo We’ve Got Now crea espacios para demostraciones, práctica para principiantes y conexiones respetuosas.'
	}}
	path="/about"
/>
<PageIntro
	eyebrow={{ en: 'Learn · Build · Share · Connect', es: 'Aprende · Crea · Comparte · Conecta' }}
	title={{
		en: 'A practical community for curious people.',
		es: 'Una comunidad práctica para personas curiosas.'
	}}
	body={{
		en: "We've Got Now hosts AI Tools Explorers Night: a place to explore useful AI workflows, share honest lessons and meet people who are doing the work.",
		es: 'We’ve Got Now organiza AI Tools Explorers Night: un espacio para explorar flujos útiles de IA, compartir aprendizajes honestos y conocer a personas que hacen el trabajo.'
	}}
/>

<section class="shell">
	<ConceptArt base={images.about.base} alt={images.about.alt} eager />
</section>

<section class="section shell split">
	<div>
		<p class="eyebrow">{language.locale === 'en' ? 'Our purpose' : 'Nuestro propósito'}</p>
		<h2>
			{language.locale === 'en'
				? 'Turn exploration into something useful.'
				: 'Convertir la exploración en algo útil.'}
		</h2>
		<p class="lede">
			{language.locale === 'en'
				? 'We make room for live demonstrations, thoughtful questions, beginner-friendly practice and structured connection. Meetups and workshops serve different needs, but both begin with real tasks and honest expectations.'
				: 'Creamos espacio para demostraciones, preguntas, práctica para principiantes y conexiones estructuradas. Los encuentros y talleres sirven necesidades distintas, pero ambos empiezan con tareas reales y expectativas honestas.'}
		</p>
	</div>
	<div class="detail-panel">
		<h3>{language.locale === 'en' ? 'Community values' : 'Valores de la comunidad'}</h3>
		<ul class="feature-list">
			<li>
				{language.locale === 'en'
					? 'Listen actively and make room for different experience levels.'
					: 'Escucha con atención y da espacio a distintos niveles de experiencia.'}
			</li>
			<li>
				{language.locale === 'en'
					? 'Be kind to all kinds of people and perspectives.'
					: 'Sé amable con todo tipo de personas y perspectivas.'}
			</li>
			<li>
				{language.locale === 'en'
					? 'Build with ambition, then explain results with humility.'
					: 'Crea con ambición y explica los resultados con humildad.'}
			</li>
			<li>
				{language.locale === 'en'
					? 'Protect private information and label unknowns clearly.'
					: 'Protege la información privada y marca claramente lo desconocido.'}
			</li>
		</ul>
		<div class="button-row">
			<a class="button primary" href={MEETUP_URL} target="_blank" rel="noreferrer">Meetup</a><a
				class="button secondary"
				href={LINKEDIN_URL}
				target="_blank"
				rel="noreferrer">LinkedIn</a
			>
		</div>
	</div>
</section>

<section class="section shell">
	<div class="detail-panel">
		<p class="eyebrow">
			{language.locale === 'en' ? 'Related practical learning' : 'Aprendizaje práctico relacionado'}
		</p>
		<h2>{language.locale === 'en' ? 'MyGuyGus workshops' : 'Talleres de MyGuyGus'}</h2>
		<p>
			{language.locale === 'en'
				? 'The planned hands-on series helps beginners build around one real task. It is separate from the community meetup and its first date, price and capacity are still pending.'
				: 'La serie práctica planificada ayuda a principiantes a crear alrededor de una tarea real. Es distinta del encuentro comunitario y la primera fecha, precio y cupos siguen pendientes.'}
		</p>
		<a href="/workshops"
			>{language.locale === 'en' ? 'See workshop details →' : 'Ver detalles del taller →'}</a
		>
	</div>
</section>
