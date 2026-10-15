<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import IntakeForm from '$lib/components/IntakeForm.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { images } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
</script>

<Seo
	title={{ en: 'Hands-on AI workshops', es: 'Talleres prácticos de IA' }}
	description={{
		en: 'Explore the planned beginner-friendly MyGuyGus workshop series; date, price, capacity and registration remain pending.',
		es: 'Conoce la serie de talleres de MyGuyGus para principiantes; fecha, precio, cupos e inscripción siguen pendientes.'
	}}
	path="/workshops"
/>
<PageIntro
	eyebrow={{ en: 'Hands-on · Beginner-friendly', es: 'Práctico · Para principiantes' }}
	title={{
		en: 'Bring one real task. Leave with it done faster.',
		es: 'Trae una tarea real. Sal con una forma más rápida de hacerla.'
	}}
	body={{
		en: 'A hands-on AI workshop from MyGuyGus. Bring a task from work or daily life and explore practical ways to get it done with AI.',
		es: 'Un taller práctico de IA de MyGuyGus. Trae una tarea del trabajo o de tu vida diaria y descubre formas prácticas de hacerla con IA.'
	}}
/>

<section class="shell">
	<ConceptArt base={images.workshops.base} alt={images.workshops.alt} eager />
</section>

<section class="section shell split">
	<div>
		<p class="eyebrow">{language.locale === 'en' ? 'What you will do' : 'Qué harás'}</p>
		<h2>
			{language.locale === 'en'
				? 'Build around a task that matters to you.'
				: 'Crea una solución para una tarea que te importa.'}
		</h2>
		<ol class="feature-list">
			<li>
				{language.locale === 'en'
					? 'Choose one real task you want help with.'
					: 'Elige una tarea real en la que quieras ayuda.'}
			</li>
			<li>
				{language.locale === 'en'
					? 'Build your own AI assistant around that task.'
					: 'Crea tu propio asistente de IA para esa tarea.'}
			</li>
			<li>
				{language.locale === 'en'
					? 'See a live demonstration using attendee tasks.'
					: 'Mira una demostración en vivo con tareas de participantes.'}
			</li>
			<li>
				{language.locale === 'en'
					? 'Leave with a reusable prompt or instruction file.'
					: 'Llévate un prompt o archivo de instrucciones reutilizable.'}
			</li>
			<li>
				{language.locale === 'en'
					? 'Meet other people learning and building with AI.'
					: 'Conoce a otras personas que aprenden y crean con IA.'}
			</li>
		</ol>
	</div>
	<div class="detail-panel">
		<div class="pending-box">
			<strong
				>{language.locale === 'en'
					? 'Coming soon — details being finalized'
					: 'Próximamente — estamos finalizando los detalles'}</strong
			>
			<p>
				{language.locale === 'en'
					? 'Date, time, price, capacity and final registration are not confirmed.'
					: 'La fecha, hora, precio, cupos e inscripción final no están confirmados.'}
			</p>
		</div>
		<dl>
			<dt>{language.locale === 'en' ? 'Host' : 'Anfitrión'}</dt>
			<dd>Gus Gonzalez · MyGuyGus</dd>
			<dt>{language.locale === 'en' ? 'Planned series' : 'Serie planificada'}</dt>
			<dd>{language.locale === 'en' ? 'Monthly Sundays' : 'Domingos mensuales'}</dd>
			<dt>{language.locale === 'en' ? 'Draft venue' : 'Lugar provisional'}</dt>
			<dd>1920 Association Dr, Reston, VA 20191</dd>
			<dt>{language.locale === 'en' ? 'What to bring' : 'Qué traer'}</dt>
			<dd>
				{language.locale === 'en'
					? 'A laptop and one real task. Use sample or redacted material for anything private.'
					: 'Una laptop y una tarea real. Usa ejemplos o material sin datos privados.'}
			</dd>
		</dl>
	</div>
</section>

<section class="section shell"><IntakeForm formType="workshop_interest" /></section>
