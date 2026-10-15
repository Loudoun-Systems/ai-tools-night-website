<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { tracks } from '$lib/content';
	import { useLanguage } from '$lib/language.svelte';

	type FormType =
		| 'workshop_interest'
		| 'event_interest'
		| 'community'
		| 'careers_interest'
		| 'project_submission';
	type StoredReceipt = { key: string; receipt: string; mode: string; duplicate: boolean };

	let { formType, eventId = '' }: { formType: FormType; eventId?: string } = $props();
	const language = useLanguage();
	const storageKey = $derived(`wgn-form-state:${formType}:${eventId}`);
	let formStatus = $state<'idle' | 'submitting' | 'accepted' | 'error'>('idle');
	let error = $state('');
	let fieldErrors = $state<Record<string, string>>({});
	let receipt = $state('');
	let mode = $state('');
	let duplicate = $state(false);
	let idempotencyKey = $state('');
	let resultElement = $state<HTMLDivElement>();

	const titles: Record<FormType, { en: string; es: string }> = {
		workshop_interest: { en: 'Join the workshop interest list', es: 'Únete a la lista de interés' },
		event_interest: { en: 'Ask about this event', es: 'Consulta sobre este evento' },
		community: { en: 'Join the community conversation', es: 'Únete a la conversación' },
		careers_interest: { en: 'Share your interest', es: 'Comparte tu interés' },
		project_submission: { en: 'Share a project or demo', es: 'Comparte un proyecto o demo' }
	};

	onMount(() => {
		try {
			const saved = window.localStorage.getItem(storageKey);
			if (!saved) return;
			const value = JSON.parse(saved) as Partial<StoredReceipt>;
			if (typeof value.key === 'string') idempotencyKey = value.key;
			if (typeof value.receipt === 'string' && typeof value.mode === 'string') {
				receipt = value.receipt;
				mode = value.mode;
				duplicate = value.duplicate === true;
				formStatus = 'accepted';
			}
		} catch {
			window.localStorage.removeItem(storageKey);
		}
	});

	function remember(value: StoredReceipt | { key: string }) {
		window.localStorage.setItem(storageKey, JSON.stringify(value));
	}

	function localizedError(code: string): string {
		const uncertain = code === 'provider_outcome_uncertain' || code === 'provider_unavailable';
		const conflict = code === 'idempotency_conflict' || code === 'submission_in_progress';
		if (language.locale === 'es') {
			if (uncertain)
				return 'El proveedor no confirmó el resultado. Tus datos siguen aquí; el servidor no reenviará esta solicitud automáticamente.';
			if (conflict)
				return 'Esta solicitud ya está en curso o cambió después de enviarse. No se volvió a enviar.';
			return 'Aún no pudimos aceptar el formulario. Revisa los campos indicados e inténtalo de nuevo.';
		}
		if (uncertain)
			return 'The provider did not confirm the result. Your fields are still here; the server will not automatically send this request again.';
		if (conflict)
			return 'This request is already in progress or changed after it was sent. It was not sent again.';
		return 'We could not accept this yet. Review the indicated fields and try again.';
	}

	async function focusResult(form: HTMLFormElement) {
		await tick();
		if (Object.keys(fieldErrors).length > 0) {
			const first = Object.keys(fieldErrors)[0];
			(form.elements.namedItem(first) as HTMLElement | null)?.focus();
		} else {
			resultElement?.focus();
		}
	}

	async function submit(event: SubmitEvent) {
		formStatus = 'submitting';
		error = '';
		fieldErrors = {};
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);
		const payload: Record<string, unknown> = {
			formType,
			locale: language.locale,
			name: data.get('name'),
			email: data.get('email'),
			contactConsent: data.get('contactConsent') === 'on',
			marketingConsent: data.get('marketingConsent') === 'on'
		};
		if (formType === 'workshop_interest') {
			payload.task = data.get('task');
			payload.aiComfort = data.get('aiComfort');
		}
		if (formType === 'event_interest') payload.eventId = eventId;
		if (formType === 'community') {
			payload.role = data.get('role');
			payload.interest = data.get('interest');
		}
		if (formType === 'careers_interest') {
			payload.tracks = data.getAll('tracks');
			payload.workInterest = data.get('workInterest');
			payload.portfolioUrl = data.get('portfolioUrl');
			payload.learning = data.get('learning');
			payload.availability = data.get('availability');
		}
		if (formType === 'project_submission') {
			payload.projectName = data.get('projectName');
			payload.description = data.get('description');
			payload.projectUrl = data.get('projectUrl');
			payload.tools = data.get('tools');
			payload.sharingPreference = data.get('sharingPreference');
		}
		idempotencyKey ||= crypto.randomUUID();
		remember({ key: idempotencyKey });
		try {
			const response = await fetch('/api/forms', {
				method: 'POST',
				headers: { 'content-type': 'application/json', 'idempotency-key': idempotencyKey },
				body: JSON.stringify(payload)
			});
			const body = (await response.json()) as {
				receiptId?: string;
				mode?: string;
				error?: string;
				duplicate?: boolean;
				fields?: Record<string, string>;
			};
			if (!response.ok) {
				fieldErrors = body.fields ?? {};
				throw new Error(body.error ?? 'submission_failed');
			}
			receipt = body.receiptId ?? '';
			mode = body.mode ?? '';
			duplicate = body.duplicate === true;
			formStatus = 'accepted';
			remember({ key: idempotencyKey, receipt, mode, duplicate });
		} catch (caught) {
			formStatus = 'error';
			error = localizedError(caught instanceof Error ? caught.message : 'submission_failed');
		}
		await focusResult(form);
	}

	function newSubmission() {
		window.localStorage.removeItem(storageKey);
		idempotencyKey = '';
		receipt = '';
		mode = '';
		duplicate = false;
		fieldErrors = {};
		error = '';
		formStatus = 'idle';
	}
</script>

<section class="intake-card" aria-labelledby={`${formType}-title`}>
	<div class="form-heading">
		<p class="eyebrow">
			{language.locale === 'en' ? 'Secure website intake' : 'Formulario seguro'}
		</p>
		<h2 id={`${formType}-title`}>{titles[formType][language.locale]}</h2>
		{#if formType === 'workshop_interest'}
			<p>
				{language.locale === 'en'
					? 'Submitting interest does not reserve a seat.'
					: 'Enviar interés no reserva un cupo.'}
			</p>
		{:else if formType === 'careers_interest'}
			<p>
				{language.locale === 'en'
					? 'This is not an application to a confirmed vacancy or an offer of work.'
					: 'Esto no es una solicitud para una vacante confirmada ni una oferta de trabajo.'}
			</p>
		{:else if formType === 'project_submission'}
			<p>
				{language.locale === 'en'
					? 'A submission is an inquiry, not an accepted presentation slot.'
					: 'Enviar un proyecto es una consulta, no un cupo de presentación confirmado.'}
			</p>
		{/if}
	</div>

	{#if formStatus !== 'accepted'}
		<form
			aria-describedby={formStatus === 'error' ? `${formType}-result` : undefined}
			onsubmit={(event) => {
				event.preventDefault();
				submit(event);
			}}
			novalidate={false}
		>
			<div class="field-grid">
				<label>
					<span>{language.locale === 'en' ? 'Name' : 'Nombre'} *</span>
					<input name="name" autocomplete="name" minlength="2" maxlength="100" required />
				</label>
				<label>
					<span>{language.locale === 'en' ? 'Email' : 'Correo'} *</span>
					<input name="email" type="email" autocomplete="email" maxlength="254" required />
				</label>
			</div>

			{#if formType === 'workshop_interest'}
				<label>
					<span
						>{language.locale === 'en'
							? 'Task you want help with (optional)'
							: 'Tarea en la que deseas ayuda (opcional)'}</span
					>
					<textarea name="task" maxlength="1000" rows="4"></textarea>
					<small
						>{language.locale === 'en'
							? 'Do not include private information.'
							: 'No incluyas información privada.'}</small
					>
				</label>
				<label>
					<span
						>{language.locale === 'en'
							? 'Current comfort with AI (optional)'
							: 'Experiencia actual con IA (opcional)'}</span
					>
					<select name="aiComfort">
						<option value="">{language.locale === 'en' ? 'Choose one' : 'Elige una opción'}</option>
						<option value="new"
							>{language.locale === 'en' ? 'New to AI' : 'Soy principiante'}</option
						>
						<option value="some"
							>{language.locale === 'en' ? 'Some experience' : 'Tengo algo de experiencia'}</option
						>
						<option value="regular"
							>{language.locale === 'en' ? 'Use it regularly' : 'La uso con frecuencia'}</option
						>
					</select>
				</label>
			{:else if formType === 'community'}
				<label>
					<span
						>{language.locale === 'en' ? 'Role or area (optional)' : 'Rol o área (opcional)'}</span
					>
					<input name="role" maxlength="120" />
				</label>
				<label>
					<span
						>{language.locale === 'en'
							? 'What would you like to learn, build or share?'
							: '¿Qué te gustaría aprender, crear o compartir?'} *</span
					>
					<textarea name="interest" minlength="2" maxlength="1000" rows="4" required></textarea>
				</label>
			{:else if formType === 'careers_interest'}
				<fieldset>
					<legend>{language.locale === 'en' ? 'Tracks of interest' : 'Áreas de interés'} *</legend>
					<div class="choice-grid">
						{#each tracks as track}
							<label class="choice"
								><input type="checkbox" name="tracks" value={track.id} />
								<span>{track.title[language.locale]}</span></label
							>
						{/each}
					</div>
				</fieldset>
				<label>
					<span
						>{language.locale === 'en'
							? 'What would you like to work on?'
							: '¿En qué te gustaría trabajar?'} *</span
					>
					<textarea name="workInterest" minlength="2" maxlength="1000" rows="4" required></textarea>
				</label>
				<label>
					<span
						>{language.locale === 'en'
							? 'Project or portfolio URL (optional)'
							: 'Enlace a proyecto o portafolio (opcional)'}</span
					>
					<input name="portfolioUrl" type="url" maxlength="500" placeholder="https://" />
				</label>
				<div class="field-grid">
					<label>
						<span
							>{language.locale === 'en'
								? 'What can you bring or learn? (optional)'
								: '¿Qué puedes aportar o aprender? (opcional)'}</span
						>
						<textarea name="learning" maxlength="1000" rows="3"></textarea>
					</label>
					<label>
						<span
							>{language.locale === 'en'
								? 'Rough availability (optional)'
								: 'Disponibilidad aproximada (opcional)'}</span
						>
						<textarea name="availability" maxlength="200" rows="3"></textarea>
					</label>
				</div>
			{:else if formType === 'project_submission'}
				<label>
					<span>{language.locale === 'en' ? 'Project name' : 'Nombre del proyecto'} *</span>
					<input name="projectName" minlength="2" maxlength="120" required />
				</label>
				<label>
					<span
						>{language.locale === 'en'
							? 'Problem, demo and what you learned'
							: 'Problema, demo y lo que aprendiste'} *</span
					>
					<textarea name="description" minlength="20" maxlength="2000" rows="6" required></textarea>
				</label>
				<div class="field-grid">
					<label>
						<span
							>{language.locale === 'en'
								? 'Project or demo URL (optional)'
								: 'Enlace al proyecto o demo (opcional)'}</span
						>
						<input name="projectUrl" type="url" maxlength="500" placeholder="https://" />
					</label>
					<label>
						<span
							>{language.locale === 'en'
								? 'Tools used (optional)'
								: 'Herramientas usadas (opcional)'}</span
						>
						<input name="tools" maxlength="500" />
					</label>
				</div>
				<label>
					<span
						>{language.locale === 'en'
							? 'Would you like to share it at a meetup?'
							: '¿Te gustaría compartirlo en un encuentro?'} *</span
					>
					<select name="sharingPreference" required>
						<option value="">{language.locale === 'en' ? 'Choose one' : 'Elige una opción'}</option>
						<option value="yes">{language.locale === 'en' ? 'Yes' : 'Sí'}</option>
						<option value="maybe"
							>{language.locale === 'en'
								? 'Maybe — tell me more'
								: 'Tal vez — quiero más información'}</option
						>
						<option value="no">{language.locale === 'en' ? 'Not right now' : 'Ahora no'}</option>
					</select>
				</label>
			{/if}

			<label class="consent">
				<input type="checkbox" name="contactConsent" required />
				<span
					>{language.locale === 'en'
						? 'You may contact me about this inquiry.'
						: 'Pueden contactarme sobre esta consulta.'} *</span
				>
			</label>
			<label class="consent">
				<input type="checkbox" name="marketingConsent" />
				<span
					>{language.locale === 'en'
						? 'Also send me occasional community updates (optional).'
						: 'También quiero recibir novedades ocasionales (opcional).'}</span
				>
			</label>

			<button class="button primary" type="submit" disabled={formStatus === 'submitting'}>
				{formStatus === 'submitting'
					? language.locale === 'en'
						? 'Submitting…'
						: 'Enviando…'
					: language.locale === 'en'
						? 'Submit securely'
						: 'Enviar de forma segura'}
			</button>
		</form>
	{/if}

	{#if formStatus === 'accepted'}
		<div
			bind:this={resultElement}
			id={`${formType}-result`}
			class="notice success"
			role="status"
			tabindex="-1"
		>
			<strong
				>{duplicate
					? language.locale === 'en'
						? 'Existing receipt found'
						: 'Comprobante existente'
					: language.locale === 'en'
						? 'Receipt created'
						: 'Comprobante creado'}</strong
			>
			<p>
				{mode === 'fixture'
					? language.locale === 'en'
						? 'This is a fixture receipt. No Google Sheet, email, CRM or other external system was contacted.'
						: 'Este es un comprobante de prueba. No se contactó Google Sheets, correo, CRM ni otro sistema externo.'
					: language.locale === 'en'
						? 'The configured QA provider acknowledged this labelled test record.'
						: 'El proveedor de QA confirmó este registro de prueba etiquetado.'}
			</p>
			<code>{receipt}</code>
			<p>
				<button class="button secondary" type="button" onclick={newSubmission}
					>{language.locale === 'en' ? 'Start a new submission' : 'Iniciar un envío nuevo'}</button
				>
			</p>
		</div>
	{:else if formStatus === 'error'}
		<div
			bind:this={resultElement}
			id={`${formType}-result`}
			class="notice error"
			role="alert"
			tabindex="-1"
		>
			<strong>{language.locale === 'en' ? 'Not confirmed' : 'No confirmado'}</strong>
			<p>{error}</p>
			{#if Object.keys(fieldErrors).length}
				<ul>
					{#each Object.entries(fieldErrors) as [field, code]}
						<li>
							<button
								class="error-link"
								type="button"
								onclick={() =>
									(document.querySelector(`[name="${field}"]`) as HTMLElement | null)?.focus()}
								>{field}: {code}</button
							>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</section>
