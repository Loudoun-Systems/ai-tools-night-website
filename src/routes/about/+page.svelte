<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import CommunityInvite from '$lib/components/CommunityInvite.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { images, MEETUP_URL, LINKEDIN_URL, text } from '$lib/content';
	import copy from '$lib/r6-copy.json';
	import { useLanguage } from '$lib/language.svelte';
	import type { Localized } from '$lib/types';
	const language = useLanguage();
	const t = (v: Localized) => text(v, language.locale);
	const values = [
		{
			title: { en: 'Make room.', es: 'Haz espacio.' },
			body: {
				en: 'Listen actively. Welcome different starting points, backgrounds, and levels of experience.',
				es: 'Escucha con atención. Recibe distintos puntos de partida, historias y niveles de experiencia.'
			}
		},
		{
			title: { en: 'Try with care.', es: 'Prueba con cuidado.' },
			body: {
				en: 'Use practical examples. Protect private information and check the result before relying on it.',
				es: 'Usa ejemplos prácticos. Protege la información privada y revisa el resultado antes de utilizarlo.'
			}
		},
		{
			title: { en: 'Share honestly.', es: 'Comparte con honestidad.' },
			body: {
				en: 'Show what you learned, not just what looks impressive. Say what is still uncertain.',
				es: 'Muestra lo que aprendiste, no solo lo que impresiona. Explica qué sigue sin estar claro.'
			}
		},
		{
			title: { en: 'Build a connection.', es: 'Crea una conexión.' },
			body: {
				en: 'Be kind. Ask a thoughtful question. Leave space for a perspective other than your own.',
				es: 'Sé amable. Haz una pregunta útil. Da espacio a una perspectiva distinta a la tuya.'
			}
		}
	];
</script>

<Seo
	title={{ en: 'Our community', es: 'Nuestra comunidad' }}
	description={copy.about.lead}
	path="/about"
/>
<section class="chapter dark about-opening">
	<div class="shell">
		<p class="eyebrow">
			{language.locale === 'en'
				? 'WE’VE GOT NOW / OUR COMMUNITY'
				: 'WE’VE GOT NOW / NUESTRA COMUNIDAD'}
		</p>
		<div class="about-heading">
			<h1>{t(copy.about.title)}</h1>
			<p class="lede">{t(copy.about.lead)}</p>
		</div>
		<ConceptArt base={images.about.base} alt={images.about.alt} eager />
	</div>
</section>
<section class="chapter">
	<div class="shell about-manifesto">
		<p class="eyebrow">
			{language.locale === 'en'
				? 'THE PEOPLE AROUND THE TOOLS'
				: 'LAS PERSONAS QUE USAN LAS HERRAMIENTAS'}
		</p>
		<h2>
			{language.locale === 'en'
				? 'You can start with a question.'
				: 'Puedes empezar con una pregunta.'}
		</h2>
		<div class="about-prose">
			<p>
				{language.locale === 'en'
					? 'AI Tools Explorers Night makes room for practical demonstrations, thoughtful questions, and conversations with people who are doing the work. You do not have to arrive with all the answers.'
					: 'AI Tools Explorers Night crea espacio para demostraciones prácticas, preguntas útiles y conversaciones con personas que están haciendo el trabajo. No necesitas llegar con todas las respuestas.'}
			</p>
			<p>
				{language.locale === 'en'
					? 'Bring something you want to understand. Share something you tried. Listen to a different way of looking at the same task. That is where useful connections begin.'
					: 'Trae algo que quieras entender. Comparte algo que hayas probado. Escucha otra forma de ver la misma tarea. Así empiezan las conexiones que sirven.'}
			</p>
		</div>
	</div>
</section>
<section class="chapter alt">
	<div class="shell">
		<div class="section-header">
			<div>
				<p class="eyebrow">{language.locale === 'en' ? 'HOW WE SHOW UP' : 'CÓMO PARTICIPAMOS'}</p>
				<h2>
					{language.locale === 'en'
						? 'Curious, practical, and kind.'
						: 'Con curiosidad, práctica y amabilidad.'}
				</h2>
			</div>
			<p>
				{language.locale === 'en'
					? 'A useful community is something we make together. These are the habits we want to bring into the room.'
					: 'Una comunidad útil se construye entre todos. Estos son los hábitos que queremos compartir.'}
			</p>
		</div>
		<div class="values-list">
			{#each values as value, index}<article>
					<span class="index">0{index + 1}</span>
					<h3>{t(value.title)}</h3>
					<p>{t(value.body)}</p>
				</article>{/each}
		</div>
		<a class="text-link" href="/code-of-conduct"
			>{language.locale === 'en' ? 'Read the community guidelines' : 'Lee el código de conducta'} ↗</a
		>
	</div>
</section>
<section class="chapter">
	<div class="shell about-formats">
		<div>
			<p class="eyebrow">
				{language.locale === 'en' ? 'COME FOR THE CONVERSATION' : 'VEN A CONVERSAR'}
			</p>
			<h2>AI Tools Explorers Night</h2>
			<p class="muted">
				{language.locale === 'en'
					? 'Community meetups bring together demos, questions, and practical connection. Follow the community for confirmed event details.'
					: 'Los encuentros de la comunidad reúnen demos, preguntas y conexiones prácticas. Sigue a la comunidad para conocer los eventos confirmados.'}
			</p>
			<div class="button-row">
				<a class="button dark-button" href={MEETUP_URL} target="_blank" rel="noreferrer">Meetup ↗</a
				><a class="text-link" href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn ↗</a>
			</div>
		</div>
		<div>
			<p class="eyebrow">
				{language.locale === 'en' ? 'STAY FOR THE PRACTICE' : 'QUÉDATE A PRACTICAR'}
			</p>
			<h2>{language.locale === 'en' ? 'MyGuyGus workshops' : 'Talleres de MyGuyGus'}</h2>
			<p class="muted">
				{language.locale === 'en'
					? 'A separate hands-on format is being planned around useful everyday tasks. The date, pricing, capacity, and registration remain pending.'
					: 'Se prepara un formato práctico y distinto para trabajar con tareas cotidianas. La fecha, precio, cupos e inscripción siguen pendientes.'}
			</p>
			<a class="text-link" href="/workshops"
				>{language.locale === 'en' ? 'Explore the workshop plan' : 'Conoce el plan del taller'} ↗</a
			>
		</div>
	</div>
</section>
<CommunityInvite />
