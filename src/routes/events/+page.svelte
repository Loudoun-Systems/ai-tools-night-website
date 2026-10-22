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
			: language.locale === 'en'
				? 'Date to be confirmed'
				: 'Fecha por confirmar';
</script>

<Seo
	title={{ en: 'Community events', es: 'Encuentros comunitarios' }}
	description={{
		en: 'Practical AI demonstrations, conversations and hands-on workshops. Explore the WGN event archive and what is taking shape next.',
		es: 'Demostraciones prácticas de IA, conversaciones y talleres. Explora el archivo de WGN y lo que estamos preparando.'
	}}
	path="/events"
/>
<section class="route-event-intro chapter">
	<div class="shell">
		<div class="route-event-heading">
			<div>
				<p class="eyebrow">
					{language.locale === 'en' ? 'THE COMMUNITY CALENDAR' : 'EL CALENDARIO DE LA COMUNIDAD'}
				</p>
				<h1>
					{language.locale === 'en'
						? 'Good ideas. Better company.'
						: 'Buenas ideas. Mejor compañía.'}
				</h1>
			</div>
			<div class="route-event-intro-copy">
				<p class="lede">
					{language.locale === 'en'
						? 'A room for useful demos, unfinished ideas, and the conversation that helps you take the next step.'
						: 'Un espacio para demos útiles, ideas en proceso y conversaciones que te ayudan a dar el siguiente paso.'}
				</p>
				<a class="text-link" href="#event-directory"
					>{language.locale === 'en' ? 'Explore the calendar' : 'Explora el calendario'}
					<span aria-hidden="true">↓</span></a
				>
			</div>
		</div>
		<div class="route-event-feature">
			<ConceptArt base={images.events.base} alt={images.events.alt} eager />
			<div class="route-event-feature-copy">
				<p class="eyebrow">AI TOOLS EXPLORERS NIGHT</p>
				<h2>
					{language.locale === 'en'
						? 'Come for an idea. Stay for a connection.'
						: 'Ven por una idea. Quédate por una conexión.'}
				</h2>
				<p>
					{language.locale === 'en'
						? 'Meet people who are exploring the same questions. See an approach, ask how it works, and share something you have tried.'
						: 'Conoce a personas que exploran preguntas parecidas. Descubre cómo funciona una idea y comparte algo que hayas probado.'}
				</p>
				<p class="route-event-status">
					<span aria-hidden="true">●</span>
					{next
						? t(next.title)
						: language.locale === 'en'
							? 'The next meetup date has not been announced.'
							: 'La próxima fecha del encuentro aún no se ha anunciado.'}
				</p>
				<a class="button primary" href={MEETUP_URL} target="_blank" rel="noreferrer"
					>{language.locale === 'en'
						? 'Follow the community on Meetup'
						: 'Sigue a la comunidad en Meetup'} <span aria-hidden="true">↗</span></a
				>
			</div>
		</div>
	</div>
</section>
<section id="event-directory" class="chapter route-calendar">
	<div class="shell">
		<div class="section-header">
			<div>
				<p class="eyebrow">
					{language.locale === 'en' ? 'WHAT’S BEEN. WHAT’S NEXT.' : 'LO QUE PASÓ. LO QUE VIENE.'}
				</p>
				<h2>{language.locale === 'en' ? 'The event notebook.' : 'El cuaderno de encuentros.'}</h2>
			</div>
			<p>
				{language.locale === 'en'
					? 'Past gatherings stay in the archive. New dates appear here when confirmed. Community meetups and MyGuyGus workshops are separate formats.'
					: 'Los encuentros pasados permanecen en el archivo. Publicamos las nuevas fechas cuando se confirman. Los encuentros y talleres de MyGuyGus son formatos distintos.'}
			</p>
		</div>
		<div
			class="filter-buttons route-event-filters"
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
		<div class="event-directory route-event-directory">
			{#each visible as event}<article class="event-row route-event-row">
					<div class="route-event-date">
						<span class="chip">{eventStatusLabels[event.status][language.locale]}</span><strong
							>{dateLabel(event.dateStart)}</strong
						>
					</div>
					<div class="route-event-record">
						<p class="eyebrow">
							{event.type === 'meetup'
								? language.locale === 'en'
									? 'COMMUNITY MEETUP'
									: 'ENCUENTRO COMUNITARIO'
								: language.locale === 'en'
									? 'MYGUYGUS WORKSHOP'
									: 'TALLER DE MYGUYGUS'}
						</p>
						<h3>
							<a href={`/events/${event.slug}`}
								>{event.type === 'workshop'
									? language.locale === 'en'
										? 'Hands-on AI workshops'
										: 'Talleres prácticos de IA'
									: t(event.title)}</a
							>
						</h3>
						<p>{t(event.summary)}</p>
						<span class="route-event-place"
							>{event.status === 'past'
								? t(event.venue)
								: language.locale === 'en'
									? 'Details pending. Registration not open.'
									: 'Detalles pendientes. Sin inscripciones abiertas.'}</span
						>
					</div>
					<a
						class="route-event-arrow"
						href={`/events/${event.slug}`}
						aria-label={`${language.locale === 'en' ? 'View details:' : 'Ver detalles:'} ${t(event.title)}`}
						><span aria-hidden="true">↗</span></a
					>
				</article>{:else}<div class="empty-state" role="status">
					<h3>
						{language.locale === 'en'
							? 'No events match this filter.'
							: 'No hay eventos con este filtro.'}
					</h3>
					<p>
						{language.locale === 'en'
							? 'Explore the archive or see the workshop plan while new dates take shape.'
							: 'Revisa el archivo o el plan de talleres mientras preparamos nuevas fechas.'}
					</p>
					<button class="button dark-button" type="button" onclick={() => (filter = 'all')}
						>{language.locale === 'en' ? 'Show all events' : 'Ver todos los eventos'}</button
					>
				</div>{/each}
		</div>
	</div>
</section>

<style>
	section.chapter {
		padding-block: 56px;
	}

	.route-event-heading {
		display: grid;
		grid-template-columns: 1.25fr 1fr;
		gap: clamp(24px, 3vw, 40px);
		align-items: end;
		margin-bottom: 30px;
	}
	.route-event-heading h1 {
		max-width: 11ch;
	}
	.route-event-intro-copy {
		padding-bottom: 0.5rem;
	}
	.route-event-intro-copy .text-link {
		margin-top: 1.5rem;
	}
	.route-event-feature {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
		gap: 0;
		background: radial-gradient(ellipse at 95% 0%, #8f38cb2e, transparent 70%), #11172d;
		border: 1px solid #9682d54d;
		border-radius: 24px;
		overflow: hidden;
		box-shadow:
			0 0 72px -36px #983ae988,
			0 16px 38px -26px #000;
	}
	.route-event-feature :global(.concept-art) {
		margin: 0;
		border-radius: 0;
		align-self: stretch;
		display: flex;
		flex-direction: column;
		min-width: 0;
		background: linear-gradient(90deg, #10152a, #11172d);
	}
	.route-event-feature-copy {
		padding: clamp(24px, 3vw, 36px);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 20px;
	}
	.route-event-feature-copy h2 {
		max-width: 14ch;
		font-size: clamp(1.7rem, 3vw, 2.8rem);
	}
	.route-event-status {
		font-size: 0.875rem;
		color: var(--muted);
		display: flex;
		gap: 0.65rem;
		align-items: baseline;
	}
	.route-event-status span {
		color: var(--pink, #ff83d4);
		font-size: 0.6rem;
		text-shadow: 0 0 12px #ff83d4;
	}
	.route-event-directory {
		border-top: 1px solid var(--line);
		margin-top: 1.5rem;
	}
	.route-event-row {
		display: grid;
		grid-template-columns: minmax(150px, 0.7fr) minmax(0, 2.1fr) 3rem;
		gap: 2rem;
		padding: 26px 0;
		border-bottom: 1px solid var(--line);
		align-items: start;
	}
	.route-event-date {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-size: 0.9rem;
	}
	.route-event-date strong {
		font-weight: 500;
		max-width: 16ch;
	}
	.route-event-record h3 {
		margin: 0.65rem 0 1rem;
		font-size: clamp(1.4rem, 2vw, 1.85rem);
	}
	.route-event-record > p:not(.eyebrow) {
		max-width: 58ch;
	}
	.route-event-place {
		display: block;
		font-size: 0.85rem;
		color: var(--muted);
		margin-top: 1rem;
	}
	.route-event-arrow {
		width: 48px;
		height: 48px;
		display: grid;
		place-items: center;
		border: 1px solid #a581d86b;
		border-radius: 50%;
		background: #6b389321;
		color: var(--pink, #ff83d4);
		transition:
			background 0.18s,
			transform 0.18s;
	}
	.route-event-arrow:hover {
		background: var(--cyan);
		color: #0b0d17;
		transform: translate(2px, -2px);
	}
	.route-event-filters {
		margin-top: 2.5rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	@media (max-width: 900px) {
		.route-event-heading {
			gap: 2rem;
		}
		.route-event-feature {
			grid-template-columns: 1fr 1fr;
		}
		.route-event-feature-copy {
			padding: 2rem;
		}
		.route-event-row {
			grid-template-columns: 145px minmax(0, 1fr) 2.75rem;
			gap: 1.5rem;
		}
	}
	@media (max-width: 650px) {
		.route-event-heading,
		.route-event-feature {
			grid-template-columns: 1fr;
		}
		.route-event-heading {
			margin-bottom: 28px;
		}
		.route-event-heading h1 {
			max-width: 13ch;
		}
		.route-event-feature-copy {
			padding: 1.5rem;
		}
		.route-event-row {
			grid-template-columns: minmax(0, 1fr) 2.75rem;
			gap: 1rem;
			padding: 2rem 0;
		}
		.route-event-date {
			grid-column: 1/-1;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			gap: 0.8rem;
		}
		.route-event-date strong {
			max-width: none;
		}
		.route-event-record {
			grid-column: 1;
		}
		.route-event-arrow {
			grid-column: 2;
			grid-row: 2;
		}
		.route-event-record h3 {
			font-size: 1.4rem;
		}
		.route-event-feature-copy h2 {
			max-width: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.route-event-arrow {
			transition: none;
		}
		.route-event-arrow:hover {
			transform: none;
		}
	}

	.route-event-feature :global(.concept-art picture) {
		position: relative;
		flex: 1;
		min-height: 280px;
		border-radius: 0;
		border: 0;
	}

	.route-event-feature :global(.concept-art picture)::after {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: linear-gradient(90deg, transparent 65%, #11172d85);
	}

	.route-event-feature :global(.concept-art figcaption) {
		padding: 12px 20px;
		font-size: 0.75rem;
	}

	.route-calendar {
		border-top: 1px solid var(--line);
		background: radial-gradient(ellipse at 0 50%, #26c1c518, transparent 65%);
	}

	@media (max-width: 650px) {
		.route-event-feature :global(.concept-art picture)::after {
			background: linear-gradient(180deg, transparent 65%, #11172d85);
		}
	}

	@media (max-width: 650px) {
		section.chapter {
			padding-block: 40px;
		}
	}
</style>
