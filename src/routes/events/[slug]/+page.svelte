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
<section class="record-opening dark">
	<div class="shell">
		<a class="back-link" href="/events"
			>← {language.locale === 'en' ? 'All events' : 'Todos los eventos'}</a
		>
		<div class="record-heading">
			<p class="eyebrow">
				{eventStatusLabels[event.status][language.locale]} / {event.type === 'meetup'
					? 'AI TOOLS EXPLORERS NIGHT'
					: 'MYGUYGUS'}
			</p>
			<h1>{t(title)}</h1>
			<p class="lede">{t(body)}</p>
		</div>
	</div>
</section>
<section class="chapter">
	<div class="shell record-layout">
		<div>
			<p class="eyebrow">{language.locale === 'en' ? 'THE RECORD' : 'EL REGISTRO'}</p>
			<h2>
				{event.status === 'past'
					? language.locale === 'en'
						? 'An evening in the archive.'
						: 'Una noche en nuestro archivo.'
					: language.locale === 'en'
						? 'Still taking shape.'
						: 'Todavía en preparación.'}
			</h2>
			<dl class="record-facts">
				<div>
					<dt>{language.locale === 'en' ? 'Date & time' : 'Fecha y hora'}</dt>
					<dd>{formatted}</dd>
				</div>
				<div>
					<dt>{language.locale === 'en' ? 'Venue' : 'Lugar'}</dt>
					<dd>
						{#if event.status === 'past'}{t(event.venue)}<br
							/>{event.address}{:else}{language.locale === 'en'
								? 'Final venue not confirmed'
								: 'Lugar final sin confirmar'}{/if}
					</dd>
				</div>
				<div>
					<dt>{language.locale === 'en' ? 'Registration' : 'Inscripción'}</dt>
					<dd>
						{#if event.status === 'past'}{language.locale === 'en'
								? 'Closed — this is a historical record'
								: 'Cerrada — este es un registro histórico'}{:else}{language.locale === 'en'
								? 'Not open. No seats reserved.'
								: 'No disponible. No hay cupos reservados.'}{/if}
					</dd>
				</div>
			</dl>
			{#if event.status === 'past'}<p class="muted">
					{language.locale === 'en'
						? 'This page preserves a past gathering. It is not an invitation to a new date, and the concept illustration is not a photograph of that event.'
						: 'Esta página conserva un encuentro pasado. No es una invitación a una nueva fecha y la ilustración conceptual no es una fotografía del evento.'}
				</p>
				{#if event.rsvpUrl}<a
						class="text-link"
						href={event.rsvpUrl}
						target="_blank"
						rel="noreferrer"
						>{language.locale === 'en'
							? 'Historical Meetup listing'
							: 'Listado histórico en Meetup'} ↗</a
					>{/if}{:else}<div class="pending-box">
					<strong
						>{language.locale === 'en'
							? 'Details are still pending.'
							: 'Los detalles siguen pendientes.'}</strong
					>
					<p>
						{language.locale === 'en'
							? 'No date, price, capacity, calendar link or reservation is confirmed. The meetup and workshop are distinct formats.'
							: 'No hay fecha, precio, cupos, enlace de calendario ni reserva confirmados. El encuentro y el taller son formatos distintos.'}
					</p>
					<a class="text-link" href="/workshops"
						>{language.locale === 'en' ? 'Explore the workshop plan' : 'Conoce el plan del taller'} ↗</a
					>
				</div>{/if}
		</div>
		<ConceptArt
			base={event.type === 'workshop' ? images.workshops.base : images.events.base}
			alt={event.type === 'workshop' ? images.workshops.alt : images.events.alt}
			eager
			format="portrait"
		/>
	</div>
</section>
{#if event.status === 'tbd'}<section class="section shell">
		<IntakeForm formType="event_interest" eventId={event.slug} />
	</section>{/if}
