<script lang="ts">
	import { tick } from 'svelte';
	import { useLanguage } from '$lib/language.svelte';

	let { mode }: { mode: string } = $props();
	const language = useLanguage();
	let open = $state(false);
	let pending = $state(false);
	let draft = $state('');
	let inputElement = $state<HTMLInputElement>();
	let launcherElement = $state<HTMLButtonElement>();
	let activeRequest: AbortController | null = null;
	let requestGeneration = 0;
	let messages = $state<Array<{ role: 'user' | 'assistant'; content: string; links?: string[] }>>(
		[]
	);
	const allowedLinks = new Set([
		'/events',
		'/workshops',
		'/prompt-library',
		'/careers',
		'/projects',
		'/about',
		'/code-of-conduct'
	]);

	async function toggle() {
		if (open) {
			open = false;
			await tick();
			launcherElement?.focus();
			return;
		}
		open = true;
		if (open) {
			await tick();
			inputElement?.focus();
		}
	}

	async function send() {
		if (mode === 'disabled') return;
		const content = draft.trim();
		if (!content || pending) return;
		messages.push({ role: 'user', content });
		draft = '';
		pending = true;
		const generation = ++requestGeneration;
		activeRequest?.abort();
		activeRequest = new AbortController();
		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					locale: language.locale,
					messages: messages.slice(-8).map(({ role, content: text }) => ({ role, content: text }))
				}),
				signal: activeRequest.signal
			});
			const body = (await response.json()) as { answer?: string; links?: string[] };
			if (generation !== requestGeneration) return;
			messages.push({
				role: 'assistant',
				content:
					response.ok && body.answer
						? body.answer
						: language.locale === 'en'
							? 'The assistant is unavailable right now. Please use the site navigation or try again later.'
							: 'El asistente no está disponible ahora. Usa la navegación del sitio o inténtalo más tarde.',
				links: response.ok ? body.links?.filter((link) => allowedLinks.has(link)).slice(0, 3) : []
			});
		} catch (caught) {
			if (
				generation !== requestGeneration ||
				(caught instanceof DOMException && caught.name === 'AbortError')
			)
				return;
			messages.push({
				role: 'assistant',
				content:
					language.locale === 'en'
						? 'The assistant is unavailable right now. No action was taken.'
						: 'El asistente no está disponible ahora. No se realizó ninguna acción.'
			});
		} finally {
			if (generation === requestGeneration) pending = false;
		}
	}

	function reset() {
		requestGeneration += 1;
		activeRequest?.abort();
		activeRequest = null;
		pending = false;
		messages = [];
		draft = '';
		void tick().then(() => inputElement?.focus());
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			event.preventDefault();
			void toggle();
		}
	}
</script>

<svelte:window onkeydown={onKeydown} />

<button
	bind:this={launcherElement}
	class="chat-launcher"
	type="button"
	aria-expanded={open}
	aria-controls="wgn-chat"
	onclick={toggle}
>
	<span aria-hidden="true">✦</span>
	<span
		>{open
			? language.locale === 'en'
				? 'Close'
				: 'Cerrar'
			: mode === 'disabled'
				? language.locale === 'en'
					? 'Chat unavailable'
					: 'Chat no disponible'
				: language.locale === 'en'
					? 'Ask WGN'
					: 'Pregunta a WGN'}</span
	>
</button>

{#if open}
	<div
		id="wgn-chat"
		class="chat-panel"
		role="dialog"
		aria-modal="false"
		aria-labelledby="chat-title"
	>
		<header>
			<div>
				<p class="eyebrow">
					{mode === 'disabled' ? 'WGN' : mode === 'fixture' ? 'FIXTURE' : 'ASSISTANT'}
				</p>
				<h2 id="chat-title">
					{language.locale === 'en' ? 'Public WGN guide' : 'Guía pública de WGN'}
				</h2>
			</div>
			{#if mode !== 'disabled'}<button type="button" onclick={reset}
					>{language.locale === 'en' ? 'Reset' : 'Reiniciar'}</button
				>{/if}
		</header>
		{#if mode === 'disabled'}
			<p class="chat-disclosure" role="status">
				{language.locale === 'en'
					? 'The assistant is temporarily unavailable. Please use the site navigation; no AI answer or action has been generated.'
					: 'El asistente está temporalmente no disponible. Usa la navegación del sitio; no se ha generado ninguna respuesta de IA ni realizado ninguna acción.'}
			</p>
			<div class="chat-links">
				<a href="/events">{language.locale === 'en' ? 'Events' : 'Eventos'}</a><a href="/workshops"
					>{language.locale === 'en' ? 'Workshops' : 'Talleres'}</a
				>
			</div>
		{:else}
			<p class="chat-disclosure">
				{mode === 'fixture'
					? language.locale === 'en'
						? 'Fixture mode uses local public facts and makes zero model calls.'
						: 'El modo de prueba usa datos públicos locales y no llama a ningún modelo.'
					: language.locale === 'en'
						? 'Public site facts only. Do not share private information.'
						: 'Solo datos públicos del sitio. No compartas información privada.'}
			</p>
			<div class="chat-log" aria-live="polite">
				{#if messages.length === 0}
					<p class="chat-empty">
						{language.locale === 'en'
							? 'Ask about workshops, prompts, careers, projects or events.'
							: 'Pregunta sobre talleres, prompts, carreras, proyectos o eventos.'}
					</p>
				{/if}
				{#each messages as message}
					<div class:assistant={message.role === 'assistant'} class="chat-message">
						<strong
							>{message.role === 'assistant'
								? 'WGN'
								: language.locale === 'en'
									? 'You'
									: 'Tú'}</strong
						>
						<p>{message.content}</p>
						{#if message.links?.length}
							<div class="chat-links">
								{#each message.links as link}<a href={link}>{link}</a>{/each}
							</div>
						{/if}
					</div>
				{/each}
				{#if pending}<p class="chat-pending">
						{language.locale === 'en' ? 'Checking public facts…' : 'Consultando datos públicos…'}
					</p>{/if}
			</div>
			<form
				onsubmit={(event) => {
					event.preventDefault();
					send();
				}}
			>
				<label class="sr-only" for="chat-question"
					>{language.locale === 'en' ? 'Your question' : 'Tu pregunta'}</label
				>
				<input
					id="chat-question"
					bind:this={inputElement}
					bind:value={draft}
					maxlength="1000"
					autocomplete="off"
				/>
				<button type="submit" disabled={pending || !draft.trim()}
					>{language.locale === 'en' ? 'Send' : 'Enviar'}</button
				>
			</form>
		{/if}
	</div>
{/if}
