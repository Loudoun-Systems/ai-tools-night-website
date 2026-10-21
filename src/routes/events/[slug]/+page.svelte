<script lang="ts">
	import ConceptArt from '$lib/components/ConceptArt.svelte';
	import IntakeForm from '$lib/components/IntakeForm.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { images, eventStatusLabels, text } from '$lib/content';
	import copy from '$lib/r6-copy.json';
	import { useLanguage } from '$lib/language.svelte';
	import type { PageData } from './$types';
	import type { Localized } from '$lib/types';
	let { data }: { data: PageData } = $props();
	const language = useLanguage();
	const event = $derived(data.event);
	const t = (v: Localized) => text(v, language.locale);
	const title = $derived(
		event.type === 'workshop'
			? {
					en: 'Hands-on AI workshops. In planning.',
					es: 'Talleres prácticos de IA. En preparación.'
				}
			: event.title
	);
	const body = $derived(event.type === 'workshop' ? copy.workshops.lead : event.summary);
	const formatted = $derived(
		event.dateStart
			? new Intl.DateTimeFormat(language.locale === 'en' ? 'en-US' : 'es-US', {
					dateStyle: 'full',
					timeStyle: 'short',
					timeZone: event.timezone
				}).format(new Date(event.dateStart))
			: language.locale === 'en'
				? 'Date to be confirmed — details being finalized'
				: 'Fecha por confirmar — estamos finalizando los detalles'
	);
</script>

<Seo {title} description={body} path={`/events/${event.slug}`} />
<section class="chapter route-record-opening">
	<div class="shell">
		<a class="back-link" href="/events"
			>← {language.locale === 'en' ? 'All events' : 'Todos los eventos'}</a
		>
		<div class="route-record-heading">
			<p class="eyebrow">
				{eventStatusLabels[event.status][language.locale]} / {event.type === 'meetup'
					? 'AI TOOLS EXPLORERS NIGHT'
					: 'MYGUYGUS'}
			</p>
			<h1>{t(title)}</h1>
			<p class="lede">{t(body)}</p>
		</div>
		<div class="route-record-layout">
			<div class="route-record-image">
				<ConceptArt
					base={event.type === 'workshop' ? images.workshops.base : images.events.base}
					alt={event.type === 'workshop' ? images.workshops.alt : images.events.alt}
					eager
				/>
				<p class="route-record-context">
					{event.status === 'past'
						? language.locale === 'en'
							? 'From the community archive.'
							: 'Del archivo de la comunidad.'
						: language.locale === 'en'
							? 'An idea taking shape. Confirmed details will appear here.'
							: 'Una idea en preparación. Los detalles confirmados aparecerán aquí.'}
				</p>
			</div>
			<aside class="route-record-facts">
				<p class="eyebrow">{language.locale === 'en' ? 'THE DETAILS' : 'LOS DETALLES'}</p>
				<dl>
					<div>
						<dt>{language.locale === 'en' ? 'Date & time' : 'Fecha y hora'}</dt>
						<dd>{formatted}</dd>
					</div>
					<div>
						<dt>{language.locale === 'en' ? 'Venue' : 'Lugar'}</dt>
						<dd>
							{#if event.status === 'past'}{t(event.venue)}{#if event.address}<br
									/>{event.address}{/if}{:else}{language.locale === 'en'
									? 'Final venue not confirmed'
									: 'Lugar final sin confirmar'}{/if}
						</dd>
					</div>
					<div>
						<dt>{language.locale === 'en' ? 'Registration' : 'Inscripción'}</dt>
						<dd>
							{event.status === 'past'
								? language.locale === 'en'
									? 'Closed — this is a historical record'
									: 'Cerrada — este es un registro histórico'
								: language.locale === 'en'
									? 'Not open. No seats reserved.'
									: 'No disponible. No hay cupos reservados.'}
						</dd>
					</div>
				</dl>
				{#if event.status === 'past'}<p class="small muted">
						{language.locale === 'en'
							? 'This page preserves a past gathering. It is not an invitation to a new date.'
							: 'Esta página conserva un encuentro pasado. No es una invitación a una nueva fecha.'}
					</p>
					{#if event.rsvpUrl}<a
							class="text-link"
							href={event.rsvpUrl}
							target="_blank"
							rel="noreferrer"
							>{language.locale === 'en'
								? 'Historical Meetup listing'
								: 'Listado histórico en Meetup'} ↗</a
						>{/if}{:else}<p class="small muted">
						{language.locale === 'en'
							? 'Date, price, capacity and registration remain pending. Community meetups and workshops are separate formats.'
							: 'La fecha, precio, cupos e inscripción siguen pendientes. Los encuentros y talleres son formatos distintos.'}
					</p>
					<a class="text-link" href="/workshops"
						>{language.locale === 'en' ? 'Explore the workshop plan' : 'Conoce el plan del taller'} ↗</a
					>{/if}
			</aside>
		</div>
	</div>
</section>
{#if event.status === 'tbd'}<section class="section shell route-record-interest">
		<h2>{language.locale === 'en' ? 'Stay close to the idea.' : 'Sigue de cerca la idea.'}</h2>
		<IntakeForm formType="event_interest" eventId={event.slug} />
	</section>{/if}

<style>
	.route-record-heading {
		max-width: 1000px;
		margin: 3rem 0 4rem;
	}
	.route-record-heading h1 {
		max-width: 18ch;
		margin: 1rem 0 1.5rem;
	}
	.route-record-heading .lede {
		max-width: 56ch;
	}
	.route-record-layout {
		display: grid;
		grid-template-columns: minmax(0, 1.65fr) minmax(280px, 1fr);
		gap: clamp(2rem, 5vw, 5rem);
		align-items: start;
	}
	.route-record-image :global(.concept-art) {
		margin: 0;
	}
	.route-record-context {
		font-size: 0.9rem;
		color: var(--muted);
		margin-top: 1.5rem;
	}
	.route-record-facts {
		padding: 2.25rem;
		border: 1px solid var(--line);
		border-radius: 1.5rem;
		background: var(--surface);
	}
	.route-record-facts dl {
		margin: 1.5rem 0 2rem;
	}
	.route-record-facts dl > div {
		padding: 1.25rem 0;
		border-bottom: 1px solid var(--line);
	}
	.route-record-facts dt {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--muted);
		margin-bottom: 0.5rem;
	}
	.route-record-facts dd {
		margin: 0;
		font-size: 1rem;
	}
	.route-record-facts .text-link {
		margin-top: 1.5rem;
	}
	.route-record-interest h2 {
		margin-bottom: 2rem;
	}
	@media (max-width: 800px) {
		.route-record-layout {
			grid-template-columns: 1fr;
		}
		.route-record-heading {
			margin: 2rem 0 2.5rem;
		}
		.route-record-facts {
			padding: 1.5rem;
		}
		.route-record-heading h1 {
			max-width: none;
		}
	}
</style>
