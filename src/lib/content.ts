import type { EventRecord, Localized, Locale, PromptRecord, TrackRecord } from './types';

export const SITE_NAME = "We've Got Now";
export const EVENT_NAME = 'AI Tools Explorers Night';
export const MEETUP_URL = 'https://www.meetup.com/weve_got_now/';
export const LINKEDIN_URL = 'https://www.linkedin.com/groups/13007016/';

export function text(value: Localized, locale: Locale): string {
	return value[locale];
}

export const images = {
	workshops: {
		base: '2026-10-14_wgn-workshop-hands-on__ChatGPT@Team-Haytham',
		alt: {
			en: 'AI-generated concept of three learners working together with a laptop and notebook at night.',
			es: 'Concepto generado con IA de tres personas aprendiendo juntas con una computadora portátil y un cuaderno de noche.'
		}
	},
	events: {
		base: '2026-10-14_wgn-community-live-demo__ChatGPT@Team-Haytham',
		alt: {
			en: 'AI-generated concept of a presenter demonstrating an idea to a small group at night.',
			es: 'Concepto generado con IA de una presentadora mostrando una idea a un grupo pequeño de noche.'
		}
	},
	careers: {
		base: '2026-10-14_wgn-careers-builders__ChatGPT@Team-Haytham',
		alt: {
			en: 'AI-generated concept of three collaborators discussing a prototype beside a laptop.',
			es: 'Concepto generado con IA de tres personas colaborando en un prototipo junto a una computadora portátil.'
		}
	},
	prompts: {
		base: '2026-10-14_wgn-prompt-library__ChatGPT@Team-Haytham',
		alt: {
			en: 'AI-generated concept of a laptop and a planning notebook in a neon-lit workspace.',
			es: 'Concepto generado con IA de una computadora portátil y un cuaderno de planificación en un espacio iluminado con neón.'
		}
	},
	projects: {
		base: '2026-10-14_wgn-project-sharing__ChatGPT@Team-Haytham',
		alt: {
			en: 'AI-generated concept of three collaborators sharing a project around a laptop.',
			es: 'Concepto generado con IA de tres personas compartiendo un proyecto alrededor de una computadora portátil.'
		}
	},
	about: {
		base: '2026-10-14_wgn-learn-build-share-connect__ChatGPT@Team-Haytham',
		alt: {
			en: 'AI-generated concept of four people collaborating around a table beneath a neon skyline.',
			es: 'Concepto generado con IA de cuatro personas colaborando en una mesa frente a una ciudad iluminada con neón.'
		}
	}
} as const;

export const events: EventRecord[] = [
	{
		slug: 'ai-tools-explorers-night-april-22-2026',
		type: 'meetup',
		status: 'past',
		title: {
			en: 'AI Tools Explorers Night — April 22, 2026',
			es: 'AI Tools Explorers Night — 22 de abril de 2026'
		},
		summary: {
			en: 'A builder-focused meetup for students, founders and curious operators exploring practical AI tools, workflows and automation.',
			es: 'Un encuentro para estudiantes, fundadores y personas curiosas que exploran herramientas, flujos y automatización con IA.'
		},
		dateStart: '2026-04-22T18:00:00-04:00',
		dateEnd: '2026-04-22T20:00:00-04:00',
		timezone: 'America/New_York',
		venue: { en: 'Aslin Beer Company — Herndon', es: 'Aslin Beer Company — Herndon' },
		address: '767 Elden St, Herndon, VA',
		rsvpUrl: 'https://meetu.ps/e/PVW3M/1dT7c7/i',
		source: 'legacy WGN event record at baseline 7dfd583',
		reviewedAt: '2026-10-14'
	},
	{
		slug: 'ai-tools-explorers-night-april-1-2026',
		type: 'meetup',
		status: 'past',
		title: {
			en: 'AI Tools Explorers Night — April 1, 2026',
			es: 'AI Tools Explorers Night — 1 de abril de 2026'
		},
		summary: {
			en: 'An evening of practical AI conversations, demonstrations and builder-focused discussion.',
			es: 'Una noche de conversaciones prácticas, demostraciones y diálogo entre personas que crean con IA.'
		},
		dateStart: '2026-04-01T18:00:00-04:00',
		dateEnd: null,
		timezone: 'America/New_York',
		venue: { en: 'Aslin Beer Company — Herndon', es: 'Aslin Beer Company — Herndon' },
		address: '767 Elden St, Herndon, VA',
		rsvpUrl: null,
		source: 'legacy WGN event record at baseline 7dfd583',
		reviewedAt: '2026-10-14'
	},
	{
		slug: 'ai-workshops',
		type: 'workshop',
		status: 'tbd',
		title: {
			en: 'Bring one real task. Leave with it done faster.',
			es: 'Trae una tarea real. Sal con una forma más rápida de hacerla.'
		},
		summary: {
			en: 'A planned beginner-friendly, hands-on workshop series from MyGuyGus. Monthly Sunday sessions are being prepared.',
			es: 'Una serie de talleres prácticos de MyGuyGus para principiantes. Se preparan sesiones mensuales los domingos.'
		},
		dateStart: null,
		dateEnd: null,
		timezone: 'America/New_York',
		venue: {
			en: 'Office and studio in Reston — draft venue',
			es: 'Oficina y estudio en Reston — lugar provisional'
		},
		address: '1920 Association Dr, Reston, VA 20191',
		rsvpUrl: null,
		source: 'R5 workshop schema and bilingual content',
		reviewedAt: '2026-10-14'
	}
];

export const eventStatusLabels: Record<EventRecord['status'], Localized> = {
	upcoming: { en: 'Upcoming', es: 'Próximo' },
	past: { en: 'Past', es: 'Pasado' },
	cancelled: { en: 'Cancelled', es: 'Cancelado' },
	tbd: { en: 'Date to be confirmed', es: 'Fecha por confirmar' }
};

export function nextConfirmedEvent(records: EventRecord[], now = new Date()): EventRecord | null {
	return (
		records
			.filter(
				(record) =>
					record.status === 'upcoming' &&
					record.dateStart !== null &&
					new Date(record.dateStart).getTime() > now.getTime()
			)
			.sort(
				(left, right) =>
					new Date(left.dateStart as string).getTime() -
					new Date(right.dateStart as string).getTime()
			)[0] ?? null
	);
}

export function publicSiteKnowledge(locale: Locale): string {
	const eventFacts = events
		.map((event) => {
			const date = event.dateStart ?? eventStatusLabels[event.status][locale];
			return `${event.title[locale]} — ${eventStatusLabels[event.status][locale]}; ${date}; ${event.venue[locale]}.`;
		})
		.join(' ');
	const trackNames = tracks.map((track) => track.title[locale]).join(', ');
	const promptNames = prompts.map((prompt) => prompt.title[locale]).join(', ');
	return locale === 'en'
		? `We've Got Now hosts AI Tools Explorers Night for practical AI learning, building and sharing. Public event records: ${eventFacts} Meetups and MyGuyGus workshops are separate event types. The workshop date, time, price, capacity and registration are pending; interest does not reserve a seat. Contribution tracks are ${trackNames}; these are expressions of interest, not confirmed paid openings. The five editable prompt starters are ${promptNames}. Project submissions are inquiries and do not promise a presentation slot.`
		: `We've Got Now organiza AI Tools Explorers Night para aprender, crear y compartir usos prácticos de IA. Registros públicos de eventos: ${eventFacts} Los encuentros y talleres de MyGuyGus son tipos de evento distintos. La fecha, hora, precio, cupos e inscripción del taller están pendientes; mostrar interés no reserva un cupo. Las áreas de colaboración son ${trackNames}; son expresiones de interés, no vacantes pagadas confirmadas. Los cinco prompts editables son ${promptNames}. Enviar un proyecto es una consulta y no promete un cupo de presentación.`;
}

export const tracks: TrackRecord[] = [
	{
		id: 'web-app',
		title: { en: 'Web & App Development', es: 'Desarrollo Web y de Aplicaciones' },
		build: {
			en: 'Accessible pages, useful forms, clear interfaces and reliable integrations.',
			es: 'Páginas accesibles, formularios útiles, interfaces claras e integraciones confiables.'
		},
		share: {
			en: 'A live project, repository, prototype or short explanation of a problem you solved.',
			es: 'Un proyecto, repositorio, prototipo o una explicación breve de un problema que resolviste.'
		}
	},
	{
		id: 'ai-automation',
		title: { en: 'AI & Automation', es: 'IA y Automatización' },
		build: {
			en: 'Repeatable workflows that reduce manual work, with clear checks and documentation.',
			es: 'Flujos repetibles que reduzcan el trabajo manual, con controles y documentación claros.'
		},
		share: {
			en: 'A workflow example, a small demo or a task you would like to automate.',
			es: 'Un ejemplo de automatización, una pequeña demostración o una tarea que te gustaría automatizar.'
		}
	},
	{
		id: 'content-media',
		title: { en: 'Content & Media', es: 'Contenido y Producción de Medios' },
		build: {
			en: 'Helpful explainers, event graphics, video edits and stories people can understand.',
			es: 'Explicaciones útiles, imágenes para eventos, edición de video e historias fáciles de entender.'
		},
		share: {
			en: 'A writing sample, design, video or creative portfolio.',
			es: 'Un texto, diseño, video o portafolio creativo.'
		}
	},
	{
		id: 'community-events',
		title: { en: 'Community & Events', es: 'Comunidad y Eventos' },
		build: {
			en: 'Welcoming events, attendee support, organized materials and practical follow-up.',
			es: 'Eventos acogedores, apoyo a participantes, materiales organizados y seguimiento práctico.'
		},
		share: {
			en: 'An event you helped with, an organizing example or your ideas for the community.',
			es: 'Un evento en el que ayudaste, un ejemplo de organización o ideas para la comunidad.'
		}
	},
	{
		id: 'research-enablement',
		title: { en: 'Research & AI Enablement', es: 'Investigación y Capacitación en IA' },
		build: {
			en: 'Tested prompt examples, useful guides and beginner-friendly learning materials.',
			es: 'Ejemplos de prompts, guías útiles y materiales fáciles de seguir para principiantes.'
		},
		share: {
			en: 'A guide, comparison, lesson or example of how you helped someone learn.',
			es: 'Una guía, comparación, lección o ejemplo de cómo ayudaste a alguien a aprender.'
		}
	}
];

export const prompts: PromptRecord[] = [
	{
		slug: 'notes-to-next-steps',
		title: { en: 'Turn notes into next steps', es: 'Convierte notas en próximos pasos' },
		category: { en: 'Work & Planning', es: 'Trabajo y planificación' },
		usefulFor: {
			en: 'Meeting notes, project updates and rough task lists.',
			es: 'Notas de reuniones, avances de proyectos y listas de tareas.'
		},
		prompt: {
			en: `Turn these notes into a short summary and a practical action list.
Goal: [what this work should achieve]
Notes: [paste redacted notes]

Use only the notes. Separate decisions, actions, and open questions.
For each action, show the owner and due date only if stated; otherwise mark them as unassigned or unconfirmed.
Flag conflicting information. Do not invent commitments.
End with the three most useful next steps.`,
			es: `Convierte estas notas en un resumen breve y una lista práctica de acciones.
Objetivo: [qué debe lograr este trabajo]
Notas: [pega notas sin datos privados]

Usa solo las notas. Separa decisiones, acciones y preguntas pendientes.
En cada acción, indica responsable y fecha solo si aparecen; de lo contrario, márcalos como sin asignar o sin confirmar.
Señala la información contradictoria. No inventes compromisos.
Termina con los tres próximos pasos más útiles.`
		},
		example: {
			en: 'Synthetic input: “Goal: publish a workshop page. Notes: mobile review needed; date and price not approved.” Output shape: Summary; Decisions: none; Actions: mobile review — unassigned, due date unconfirmed; Open questions: approved date and price.',
			es: 'Entrada ficticia: “Objetivo: publicar la página del taller. Notas: falta revisar móvil; fecha y precio no aprobados.” Forma de salida: Resumen; Decisiones: ninguna; Acciones: revisión móvil — sin asignar, fecha sin confirmar; Preguntas: fecha y precio aprobados.'
		},
		source: 'R5 bilingual content draft',
		reviewStatus: {
			en: 'Editorially reviewed; no model test claimed',
			es: 'Revisión editorial; sin afirmar pruebas con modelos'
		},
		reviewedAt: '2026-10-14'
	},
	{
		slug: 'clear-email',
		title: { en: 'Write a clear email', es: 'Escribe un correo claro' },
		category: { en: 'Writing & Communication', es: 'Redacción y comunicación' },
		usefulFor: {
			en: 'Follow-ups, requests and status updates.',
			es: 'Seguimientos, solicitudes y avances.'
		},
		prompt: {
			en: `Draft an email I can review before sending.
Recipient and relationship: [who and how we know each other]
Purpose: [one outcome]
Facts to include: [confirmed facts]
Requested next step: [what I want the recipient to do]
Tone sample: [optional short example of my own writing]

Use plain language and short paragraphs. Include a subject line.
Do not invent a shared history, deadline, result, or promise.
Use a clear placeholder for missing information.
Keep the draft under [word limit] words.`,
			es: `Redacta un correo que pueda revisar antes de enviarlo.
Destinatario y relación: [quién es y cómo nos conocemos]
Propósito: [un resultado]
Datos que debe incluir: [hechos confirmados]
Próximo paso solicitado: [qué quiero que haga la persona]
Ejemplo de tono: [ejemplo breve y opcional de mi escritura]

Usa palabras sencillas y párrafos cortos. Incluye un asunto.
No inventes una relación previa, plazo, resultado ni promesa.
Usa un marcador claro para la información que falte.
Limita el borrador a [límite] palabras.`
		},
		example: {
			en: 'Synthetic input: recipient is a community member; purpose is to explain project sharing; confirmed fact: submission starts a conversation; requested step: use the project form; limit: 90 words. Output shape: subject, two short paragraphs and one clear link request—without promising a slot.',
			es: 'Entrada ficticia: destinatario de la comunidad; propósito: explicar cómo compartir un proyecto; hecho: el envío inicia una conversación; paso: usar el formulario; límite: 90 palabras. Forma de salida: asunto, dos párrafos breves y una solicitud clara, sin prometer un cupo.'
		},
		source: 'R5 bilingual content draft',
		reviewStatus: {
			en: 'Editorially reviewed; no model test claimed',
			es: 'Revisión editorial; sin afirmar pruebas con modelos'
		},
		reviewedAt: '2026-10-14'
	},
	{
		slug: 'repetitive-workflow',
		title: { en: 'Plan a repetitive workflow', es: 'Planifica un flujo repetitivo' },
		category: { en: 'AI & Automation', es: 'IA y automatización' },
		usefulFor: {
			en: 'Understanding a repeated task before building automation.',
			es: 'Entender una tarea repetida antes de automatizarla.'
		},
		prompt: {
			en: `Help me plan this repeated task before automating it.
Task: [what I do]
Current steps: [steps in order]
Inputs and outputs: [what comes in and what should come out]
Tools already available: [tools]
Constraints: [privacy, budget, approvals, timing]

Show a simpler manual process first, then an automation plan.
Identify the trigger, validation, actions, human review, and error handling.
Distinguish verified capabilities from items that need checking.
Do not assume a tool has an API or that an integration already exists.
Suggest one small test using synthetic data.`,
			es: `Ayúdame a planificar esta tarea repetitiva antes de automatizarla.
Tarea: [qué hago]
Pasos actuales: [pasos en orden]
Entradas y resultados: [qué llega y qué debe salir]
Herramientas disponibles: [herramientas]
Restricciones: [privacidad, presupuesto, aprobaciones, horario]

Primero muestra un proceso manual más sencillo y luego un plan de automatización.
Identifica el inicio, la validación, las acciones, la revisión humana y el manejo de errores.
Separa las capacidades verificadas de lo que necesita revisión.
No supongas que una herramienta tiene API ni que una integración ya existe.
Propón una prueba pequeña con datos ficticios.`
		},
		example: {
			en: 'Synthetic input: copy a labelled test inquiry from a website form into a QA queue after schema validation; require human review; never retry an uncertain append. Output shape: simpler manual checklist, then trigger, validation, actions, reviewer, failure states and one synthetic-data test.',
			es: 'Entrada ficticia: copiar una consulta de prueba etiquetada desde un formulario a una cola QA después de validarla; exigir revisión humana; no repetir un envío incierto. Forma de salida: lista manual, inicio, validación, acciones, revisión, fallos y una prueba ficticia.'
		},
		source: 'R5 bilingual content draft',
		reviewStatus: {
			en: 'Editorially reviewed; no model test claimed',
			es: 'Revisión editorial; sin afirmar pruebas con modelos'
		},
		reviewedAt: '2026-10-14'
	},
	{
		slug: 'compare-with-evidence',
		title: { en: 'Compare options with evidence', es: 'Compara opciones con evidencia' },
		category: { en: 'Research & Decisions', es: 'Investigación y decisiones' },
		usefulFor: {
			en: 'Choosing between tools, approaches or project options.',
			es: 'Elegir entre herramientas, enfoques u opciones de proyecto.'
		},
		prompt: {
			en: `Compare these options for my situation.
Decision: [what I need to choose]
Options: [options]
Requirements: [must-haves]
Preferences: [nice-to-haves]
Evidence: [links, excerpts, or documents I can share]

Make a compact comparison table. Explain tradeoffs in plain language.
Label unknowns. Do not invent prices, capabilities, or test results.
If browsing is available, verify facts likely to change and cite primary sources.
If it is unavailable, state what needs verification.
Recommend an option only when the evidence supports it; otherwise identify the missing fact that would decide it.`,
			es: `Compara estas opciones para mi situación.
Decisión: [qué necesito elegir]
Opciones: [opciones]
Requisitos: [lo indispensable]
Preferencias: [lo deseable]
Evidencia: [enlaces, fragmentos o documentos que puedo compartir]

Haz una tabla breve. Explica las ventajas y desventajas con palabras sencillas.
Marca lo desconocido. No inventes precios, funciones ni resultados de pruebas.
Si puedes navegar, verifica los datos que puedan cambiar y cita fuentes primarias.
Si no puedes, indica qué necesita verificarse.
Recomienda una opción solo si la evidencia la respalda; si no, identifica el dato que falta para decidir.`
		},
		example: {
			en: 'Synthetic input: compare Workflow A and Workflow B; requirements are scoped access, audit logs and easy rollback; evidence confirms access controls but includes no current pricing. Output shape: evidence table, tradeoffs, labelled pricing unknown and “no recommendation until cost is verified.”',
			es: 'Entrada ficticia: comparar Flujo A y B; requisitos: acceso limitado, registro y reversión sencilla; la evidencia confirma controles pero no precios. Forma de salida: tabla, ventajas, precio marcado como desconocido y “sin recomendación hasta verificar el costo”.'
		},
		source: 'R5 bilingual content draft',
		reviewStatus: {
			en: 'Editorially reviewed; no model test claimed',
			es: 'Revisión editorial; sin afirmar pruebas con modelos'
		},
		reviewedAt: '2026-10-14'
	},
	{
		slug: 'learn-by-doing',
		title: { en: 'Learn by doing', es: 'Aprende haciendo' },
		category: { en: 'Learning & AI Practice', es: 'Aprendizaje y práctica con IA' },
		usefulFor: {
			en: 'Learning a concept through a small practical task.',
			es: 'Aprender un concepto mediante una tarea práctica pequeña.'
		},
		prompt: {
			en: `Teach me [concept] by helping me complete a small practical task.
My starting level: [what I already know]
Task I care about: [real task]
Time available: [time]

Explain the concept in plain language with one concrete example.
Give me one short step at a time and let me try before continuing.
Use synthetic examples rather than asking for private data.
Ask one question to check my understanding and explain mistakes kindly.
Finish with a reusable checklist and one thing I should verify myself.`,
			es: `Enséñame [concepto] mientras me ayudas a completar una tarea práctica pequeña.
Mi nivel actual: [qué sé]
Tarea que me interesa: [tarea real]
Tiempo disponible: [tiempo]

Explica el concepto con palabras sencillas y un ejemplo concreto.
Dame un paso breve a la vez y déjame intentarlo antes de continuar.
Usa ejemplos ficticios en lugar de pedir datos privados.
Haz una pregunta para comprobar mi comprensión y explica los errores con amabilidad.
Termina con una lista reutilizable y algo que deba verificar por mi cuenta.`
		},
		example: {
			en: 'Synthetic input: learn structured prompting; starting level is beginner; task is turning sample notes into actions; time is 20 minutes. Output shape: one plain-language explanation, one worked sample, a single next step, a check question and a reusable final checklist.',
			es: 'Entrada ficticia: aprender prompts estructurados; nivel principiante; tarea: convertir notas de muestra en acciones; tiempo: 20 minutos. Forma de salida: explicación sencilla, ejemplo, un paso siguiente, pregunta de comprensión y lista final reutilizable.'
		},
		source: 'R5 bilingual content draft',
		reviewStatus: {
			en: 'Editorially reviewed; no model test claimed',
			es: 'Revisión editorial; sin afirmar pruebas con modelos'
		},
		reviewedAt: '2026-10-14'
	}
];
