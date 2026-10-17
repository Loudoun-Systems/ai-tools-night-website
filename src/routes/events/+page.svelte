<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { events, eventStatusLabels, images } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';

	const language = useLanguage();
	let filter = $state<'all' | 'tbd' | 'upcoming' | 'past' | 'cancelled' | 'meetup' | 'workshop'>(
		'all'
	);
	const visible = $derived(
		events.filter((event) => filter === 'all' || event.status === filter || event.type === filter)
	);

	function dateLabel(value: string | null): string {
		if (!value) return language.locale === 'en' ? 'Date to be confirmed' : 'Fecha por confirmar';
		return new Intl.DateTimeFormat(language.locale === 'en' ? 'en-US' : 'es-US', {
			dateStyle: 'long',
			timeZone: 'America/New_York'
		}).format(new Date(value));
	}
</script>

<Seo
	title={{ en: 'Events', es: 'Eventos' }}
	description={{
		en: 'Browse confirmed history and honestly labelled pending plans for AI Tools Explorers Night meetups and workshops.',
		es: 'Consulta el historial confirmado y los planes pendientes de encuentros y talleres de AI Tools Explorers Night.'
	}}
	path="/events"
/>

<PageIntro
	eyebrow={{ en: 'AI Tools Explorers Night', es: 'AI Tools Explorers Night' }}
	title={{
		en: 'Walk in curious. Leave with something useful.',
		es: 'Llega con curiosidad. Llévate algo útil.'
	}}
	body={{
		en: 'Meetups make room for practical demonstrations, questions and structured connection. Workshops are listed separately so expectations stay clear.',
		es: 'Los encuentros ofrecen demostraciones prácticas, preguntas y conexiones estructuradas. Los talleres se muestran por separado para mantener expectativas claras.'
	}}
/>

<section class="shell">
	<ConceptArt base={images.events.base} alt={images.events.alt} eager />
</section>

<section class="section shell">
	<div
		class="filter-buttons"
		aria-label={language.locale === 'en' ? 'Filter events' : 'Filtrar eventos'}
	>
		{#each [['all', language.locale === 'en' ? 'All' : 'Todos'], ['upcoming', language.locale === 'en' ? 'Upcoming' : 'Próximos'], ['tbd', language.locale === 'en' ? 'Date TBD' : 'Fecha por confirmar'], ['past', language.locale === 'en' ? 'Past' : 'Pasados'], ['cancelled', language.locale === 'en' ? 'Cancelled' : 'Cancelados'], ['meetup', language.locale === 'en' ? 'Meetups' : 'Encuentros'], ['workshop', language.locale === 'en' ? 'Workshops' : 'Talleres']] as option}
			<button
				class:active={filter === option[0]}
				type="button"
				onclick={() => (filter = option[0] as typeof filter)}>{option[1]}</button
			>
		{/each}
	</div>
	<div class="card-grid" style="margin-top: 1.5rem">
		{#each visible as event}
			<article class="card">
				<div class="meta">
					<span class="chip"
						>{event.type === 'meetup'
							? language.locale === 'en'
								? 'Meetup'
								: 'Encuentro'
							: language.locale === 'en'
								? 'Workshop'
								: 'Taller'}</span
					><span class="chip">{eventStatusLabels[event.status][language.locale]}</span>
				</div>
				<h2 style="font-size: 1.55rem; margin-top: 1rem">{event.title[language.locale]}</h2>
				<p>{event.summary[language.locale]}</p>
				<p><strong>{dateLabel(event.dateStart)}</strong><br />{event.venue[language.locale]}</p>
				<a href={`/events/${event.slug}`}
					>{language.locale === 'en' ? 'View details →' : 'Ver detalles →'}</a
				>
			</article>
		{:else}
			<div class="pending-box">
				<strong
					>{language.locale === 'en'
						? 'No events match this filter.'
						: 'No hay eventos con este filtro.'}</strong
				>
				<p>
					{language.locale === 'en'
						? 'Try another category. New confirmed dates will appear here.'
						: 'Prueba otra categoría. Las fechas confirmadas aparecerán aquí.'}
				</p>
			</div>
		{/each}
	</div>
</section>
