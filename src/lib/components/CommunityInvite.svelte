<script lang="ts">
	import { MEETUP_URL } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';
	const language = useLanguage();
</script>

<section class="community-invite chapter dark">
	<div class="shell">
		<p class="eyebrow">
			{language.locale === 'en'
				? 'THERE’S ROOM FOR YOUR CURIOSITY'
				: 'HAY ESPACIO PARA TU CURIOSIDAD'}
		</p>
		<h2>
			{language.locale === 'en'
				? 'Your next idea could start with a conversation.'
				: 'Tu próxima idea puede empezar con una conversación.'}
		</h2>
		<p>
			{language.locale === 'en'
				? 'Find the WGN community, explore what we’re working on, and take the next step when you’re ready.'
				: 'Conoce la comunidad WGN, descubre lo que estamos explorando y da el siguiente paso cuando quieras.'}
		</p>
		<a class="button primary" href={MEETUP_URL} target="_blank" rel="noreferrer"
			>{language.locale === 'en' ? 'Find WGN on Meetup' : 'Encuentra WGN en Meetup'}
			<span aria-hidden="true">↗</span></a
		>
	</div>
</section>
