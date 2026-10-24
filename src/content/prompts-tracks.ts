import type { PromptRecord, TrackRecord } from "./types";
import { extendedPrompts } from "./prompt-catalog";

export const tracks: TrackRecord[] = [
  {
    id: "web-app",
    title: { en: "Web & App Development", es: "Desarrollo Web y de Aplicaciones" },
    build: {
      en: "Accessible pages, useful forms, clear interfaces and reliable integrations.",
      es: "Páginas accesibles, formularios útiles, interfaces claras e integraciones confiables.",
    },
    share: {
      en: "A live project, repository, prototype or short explanation of a problem you solved.",
      es: "Un proyecto, repositorio, prototipo o una explicación breve de un problema que resolviste.",
    },
  },
  {
    id: "ai-automation",
    title: { en: "AI & Automation", es: "IA y Automatización" },
    build: {
      en: "Repeatable workflows that reduce manual work, with clear checks and documentation.",
      es: "Flujos repetibles que reduzcan el trabajo manual, con controles y documentación claros.",
    },
    share: {
      en: "A workflow example, a small demo or a task you would like to automate.",
      es: "Un ejemplo de automatización, una pequeña demostración o una tarea que te gustaría automatizar.",
    },
  },
  {
    id: "content-media",
    title: { en: "Content & Media", es: "Contenido y Producción de Medios" },
    build: {
      en: "Helpful explainers, event graphics, video edits and stories people can understand.",
      es: "Explicaciones útiles, imágenes para eventos, edición de video e historias fáciles de entender.",
    },
    share: {
      en: "A writing sample, design, video or creative portfolio.",
      es: "Un texto, diseño, video o portafolio creativo.",
    },
  },
  {
    id: "community-events",
    title: { en: "Community & Events", es: "Comunidad y Eventos" },
    build: {
      en: "Welcoming events, attendee support, organized materials and practical follow-up.",
      es: "Eventos acogedores, apoyo a participantes, materiales organizados y seguimiento práctico.",
    },
    share: {
      en: "An event you helped with, an organizing example or your ideas for the community.",
      es: "Un evento en el que ayudaste, un ejemplo de organización o ideas para la comunidad.",
    },
  },
  {
    id: "research-enablement",
    title: { en: "Research & AI Enablement", es: "Investigación y Capacitación en IA" },
    build: {
      en: "Tested prompt examples, useful guides and beginner-friendly learning materials.",
      es: "Ejemplos de prompts, guías útiles y materiales fáciles de seguir para principiantes.",
    },
    share: {
      en: "A guide, comparison, lesson or example of how you helped someone learn.",
      es: "Una guía, comparación, lección o ejemplo de cómo ayudaste a alguien a aprender.",
    },
  },
];

const starterPrompts: PromptRecord[] = [
  {
    slug: "notes-to-next-steps",
    title: { en: "Turn notes into next steps", es: "Convierte notas en próximos pasos" },
    category: { en: "Work & Planning", es: "Trabajo y planificación" },
    usefulFor: {
      en: "Meeting notes, project updates and rough task lists.",
      es: "Notas de reuniones, avances de proyectos y listas de tareas.",
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
Termina con los tres próximos pasos más útiles.`,
    },
    example: {
      en: "Synthetic input: “Goal: publish a workshop page. Notes: mobile review needed; date and price not approved.” Output shape: Summary; Decisions: none; Actions: mobile review — unassigned, due date unconfirmed; Open questions: approved date and price.",
      es: "Entrada ficticia: “Objetivo: publicar la página del taller. Notas: falta revisar móvil; fecha y precio no aprobados.” Forma de salida: Resumen; Decisiones: ninguna; Acciones: revisión móvil — sin asignar, fecha sin confirmar; Preguntas: fecha y precio aprobados.",
    },
    source: "R5 bilingual content draft",
    reviewStatus: {
      en: "Editorially reviewed; no model test claimed",
      es: "Revisión editorial; sin afirmar pruebas con modelos",
    },
    reviewedAt: "2026-10-14",
  },
  {
    slug: "clear-email",
    title: { en: "Write a clear email", es: "Escribe un correo claro" },
    category: { en: "Writing & Communication", es: "Redacción y comunicación" },
    usefulFor: {
      en: "Follow-ups, requests and concise status updates.",
      es: "Seguimientos, solicitudes y actualizaciones de estado concisas.",
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
Limita el borrador a [límite] palabras.`,
    },
    example: {
      en: "Synthetic input: recipient is a community member; purpose is to explain project sharing; confirmed fact: submission starts a conversation; requested step: use the project form; limit: 90 words. Output shape: subject, two short paragraphs and one clear link request—without promising a slot.",
      es: "Entrada ficticia: destinatario de la comunidad; propósito: explicar cómo compartir un proyecto; hecho: el envío inicia una conversación; paso: usar el formulario; límite: 90 palabras. Forma de salida: asunto, dos párrafos breves y una solicitud clara, sin prometer un cupo.",
    },
    source: "R5 bilingual content draft",
    reviewStatus: {
      en: "Editorially reviewed; no model test claimed",
      es: "Revisión editorial; sin afirmar pruebas con modelos",
    },
    reviewedAt: "2026-10-14",
  },
  {
    slug: "repetitive-workflow",
    title: { en: "Plan a repetitive workflow", es: "Planifica un flujo repetitivo" },
    category: { en: "AI & Automation", es: "IA y automatización" },
    usefulFor: {
      en: "Understanding a repeated task before building automation.",
      es: "Entender una tarea repetida antes de automatizarla.",
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
Propón una prueba pequeña con datos ficticios.`,
    },
    example: {
      en: "Synthetic input: copy a labelled test inquiry from a website form into a QA queue after schema validation; require human review; never retry an uncertain append. Output shape: simpler manual checklist, then trigger, validation, actions, reviewer, failure states and one synthetic-data test.",
      es: "Entrada ficticia: copiar una consulta de prueba etiquetada desde un formulario a una cola QA después de validarla; exigir revisión humana; no repetir un envío incierto. Forma de salida: lista manual, inicio, validación, acciones, revisión, fallos y una prueba ficticia.",
    },
    source: "R5 bilingual content draft",
    reviewStatus: {
      en: "Editorially reviewed; no model test claimed",
      es: "Revisión editorial; sin afirmar pruebas con modelos",
    },
    reviewedAt: "2026-10-14",
  },
  {
    slug: "compare-with-evidence",
    title: { en: "Compare options with evidence", es: "Compara opciones con evidencia" },
    category: { en: "Research & Decisions", es: "Investigación y decisiones" },
    usefulFor: {
      en: "Choosing between tools, approaches or project options.",
      es: "Elegir entre herramientas, enfoques u opciones de proyecto.",
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
Recomienda una opción solo si la evidencia la respalda; si no, identifica el dato que falta para decidir.`,
    },
    example: {
      en: "Synthetic input: compare Workflow A and Workflow B; requirements are scoped access, audit logs and easy rollback; evidence confirms access controls but includes no current pricing. Output shape: evidence table, tradeoffs, labelled pricing unknown and “no recommendation until cost is verified.”",
      es: "Entrada ficticia: comparar Flujo A y B; requisitos: acceso limitado, registro y reversión sencilla; la evidencia confirma controles pero no precios. Forma de salida: tabla, ventajas, precio marcado como desconocido y “sin recomendación hasta verificar el costo”.",
    },
    source: "R5 bilingual content draft",
    reviewStatus: {
      en: "Editorially reviewed; no model test claimed",
      es: "Revisión editorial; sin afirmar pruebas con modelos",
    },
    reviewedAt: "2026-10-14",
  },
  {
    slug: "learn-by-doing",
    title: { en: "Learn by doing", es: "Aprende haciendo" },
    category: { en: "Learning & AI Practice", es: "Aprendizaje y práctica con IA" },
    usefulFor: {
      en: "Learning a concept through a small practical task.",
      es: "Aprender un concepto mediante una tarea práctica pequeña.",
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
Termina con una lista reutilizable y algo que deba verificar por mi cuenta.`,
    },
    example: {
      en: "Synthetic input: learn structured prompting; starting level is beginner; task is turning sample notes into actions; time is 20 minutes. Output shape: one plain-language explanation, one worked sample, a single next step, a check question and a reusable final checklist.",
      es: "Entrada ficticia: aprender prompts estructurados; nivel principiante; tarea: convertir notas de muestra en acciones; tiempo: 20 minutos. Forma de salida: explicación sencilla, ejemplo, un paso siguiente, pregunta de comprensión y lista final reutilizable.",
    },
    source: "R5 bilingual content draft",
    reviewStatus: {
      en: "Editorially reviewed; no model test claimed",
      es: "Revisión editorial; sin afirmar pruebas con modelos",
    },
    reviewedAt: "2026-10-14",
  },
];

export const prompts: PromptRecord[] = [...starterPrompts, ...extendedPrompts];
