<script lang="ts">
	import IntakeForm from '$lib/components/IntakeForm.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { useLanguage } from '$lib/language.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const language = useLanguage();
	const event = $derived(data.event);
	const formattedDate = $derived(
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

<Seo title={event.title} description={event.summary} path={`/events/${event.slug}`} />

<PageIntro
	eyebrow={{
		en: event.type === 'meetup' ? 'Community meetup' : 'Hands-on workshop',
		es: event.type === 'meetup' ? 'Encuentro comunitario' : 'Taller práctico'
	}}
	title={event.title}
	body={event.summary}
/>

<section class="shell section" style="padding-top: 0">
	<div class="detail-panel">
		<dl class="details-grid">
			<div>
				<dt>{language.locale === 'en' ? 'Date' : 'Fecha'}</dt>
				<dd>{formattedDate}</dd>
			</div>
			<div>
				<dt>{language.locale === 'en' ? 'Venue' : 'Lugar'}</dt>
				<dd>
					{event.venue[language.locale]}{#if event.address}<br />{event.address}{/if}
				</dd>
			</div>
			<div>
				<dt>{language.locale === 'en' ? 'Registration' : 'Inscripción'}</dt>
				<dd>
					{#if event.rsvpUrl}<a href={event.rsvpUrl} target="_blank" rel="noreferrer"
							>{language.locale === 'en'
								? 'Historical Meetup listing'
								: 'Listado histórico en Meetup'}</a
						>{:else}{language.locale === 'en' ? 'Not open' : 'No disponible'}{/if}
				</dd>
			</div>
		</dl>
		{#if event.status === 'tbd'}
			<div class="pending-box" style="margin-top: 1.5rem">
				<strong
					>{language.locale === 'en'
						? 'Details are still pending.'
						: 'Los detalles siguen pendientes.'}</strong
				>
				<p>
					{language.locale === 'en'
						? 'No date, price, capacity, calendar link or reservation is confirmed.'
						: 'No hay fecha, precio, cupos, enlace de calendario ni reserva confirmados.'}
				</p>
			</div>
		{/if}
	</div>
</section>

{#if event.status === 'tbd'}<section class="section shell">
		<IntakeForm formType="event_interest" eventId={event.slug} />
	</section>{/if}
