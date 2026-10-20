<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import {
		events,
		eventStatusLabels,
		images,
		MEETUP_URL,
		nextConfirmedEvent,
		text
	} from '$lib/content';
	import copy from '$lib/r6-copy.json';
	import { useLanguage } from '$lib/language.svelte';
	import type { Localized } from '$lib/types';
	const language = useLanguage();
	const t = (v: Localized) => text(v, language.locale);
	const next = nextConfirmedEvent(events);
	let filter = $state('all');
	const visible = $derived(
		events.filter((e) => filter === 'all' || e.status === filter || e.type === filter)
	);
	const filters = [
		['all', { en: 'All', es: 'Todos' }],
		['upcoming', { en: 'Upcoming', es: 'Próximos' }],
		['tbd', { en: 'Date TBD', es: 'Fecha por confirmar' }],
		['past', { en: 'Past', es: 'Pasados' }],
		['cancelled', { en: 'Cancelled', es: 'Cancelados' }],
		['meetup', { en: 'Meetups', es: 'Encuentros' }],
		['workshop', { en: 'Workshops', es: 'Talleres' }]
	] as const;
	const dateLabel = (date: string | null) =>
		date
			? new Intl.DateTimeFormat(language.locale === 'en' ? 'en-US' : 'es-US', {
					dateStyle: 'long',
					timeZone: 'America/New_York'
				}).format(new Date(date))
			: t(copy.events.pending);
</script>

<Seo
	title={{ en: 'Community events', es: 'Encuentros comunitarios' }}
	description={copy.events.lead}
	path="/events"
/>
<section class="chapter dark event-opening">
	<div class="shell split">
		<div>
			<p class="eyebrow">AI TOOLS EXPLORERS NIGHT</p>
			<h1>{t(copy.events.title)}</h1>
			<p class="lede">{t(copy.events.lead)}</p>
			<div class="event-next">
				<span class="status-dot" aria-hidden="true"></span>
				<p>{next ? t(next.title) : t(copy.events.pending)}</p>
			</div>
			<a class="button primary" href={MEETUP_URL} target="_blank" rel="noreferrer"
				>{language.locale === 'en'
					? 'Follow the community on Meetup'
					: 'Sigue a la comunidad en Meetup'} <span aria-hidden="true">↗</span></a
			>
		</div>
		<ConceptArt base={images.events.base} alt={images.events.alt} eager />
	</div>
</section>
<section id="event-directory" class="chapter">
	<div class="shell">
		<div class="section-header">
			<div>
				<p class="eyebrow">
					{language.locale === 'en' ? 'THE COMMUNITY CALENDAR' : 'EL CALENDARIO DE LA COMUNIDAD'}
				</p>
				<h2>
					{language.locale === 'en'
						? 'Past gatherings. Future possibilities.'
						: 'Encuentros pasados. Nuevas posibilidades.'}
				</h2>
			</div>
			<p>
				{language.locale === 'en'
					? 'A clear view of what happened and what is still taking shape. Meetups and MyGuyGus workshops are separate formats.'
					: 'Consulta lo que pasó y lo que seguimos preparando. Los encuentros y los talleres de MyGuyGus son formatos distintos.'}
			</p>
		</div>
		<div
			class="filter-buttons"
			aria-label={language.locale === 'en' ? 'Filter events' : 'Filtrar eventos'}
		>
			{#each filters as option}<button
					type="button"
					class:active={filter === option[0]}
					aria-pressed={filter === option[0]}
					onclick={() => (filter = option[0])}>{t(option[1])}</button
				>{/each}
		</div>
		<p class="results-note" role="status">
			{visible.length}
			{language.locale === 'en' ? 'records shown' : 'registros visibles'}
		</p>
		<div class="event-directory">
			{#each visible as event}<article class="event-row">
					<div class="record-status">
						<span class="chip">{eventStatusLabels[event.status][language.locale]}</span><span
							>{event.type === 'meetup'
								? language.locale === 'en'
									? 'Community meetup'
									: 'Encuentro comunitario'
								: language.locale === 'en'
									? 'MyGuyGus workshop'
									: 'Taller de MyGuyGus'}</span
						>
					</div>
					<div>
						<h3>
							<a href={`/events/${event.slug}`}
								>{event.type === 'workshop'
									? language.locale === 'en'
										? 'Hands-on AI workshops'
										: 'Talleres prácticos de IA'
									: t(event.title)}</a
							>
						</h3>
						<p>{event.type === 'workshop' ? t(copy.workshops.lead) : t(event.summary)}</p>
					</div>
					<div class="record-when">
						<strong
							>{event.dateStart
								? dateLabel(event.dateStart)
								: language.locale === 'en'
									? 'Date to be confirmed'
									: 'Fecha por confirmar'}</strong
						><small
							>{event.status === 'past'
								? t(event.venue)
								: language.locale === 'en'
									? 'Details pending. Registration not open.'
									: 'Detalles pendientes. Sin inscripciones abiertas.'}</small
						>
					</div>
					<a
						class="record-arrow"
						href={`/events/${event.slug}`}
						aria-label={`${language.locale === 'en' ? 'View details:' : 'Ver detalles:'} ${t(event.title)}`}
						>↗</a
					>
				</article>{:else}<div class="empty-state" role="status">
					<span class="empty-mark" aria-hidden="true">—</span>
					<h3>
						{language.locale === 'en'
							? 'No events match this filter.'
							: 'No hay eventos con este filtro.'}
					</h3>
					<p>
						{language.locale === 'en'
							? 'New confirmed dates will appear here. In the meantime, explore the archive or the planned workshop.'
							: 'Las nuevas fechas confirmadas aparecerán aquí. Mientras tanto, revisa el archivo o el plan del taller.'}
					</p>
					<button class="button dark-button" type="button" onclick={() => (filter = 'all')}
						>{language.locale === 'en' ? 'Show all events' : 'Ver todos los eventos'}</button
					>
				</div>{/each}
		</div>
	</div>
</section>
