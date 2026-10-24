import type { PromptRecord } from "./types";

// Original WGN editorial workflows. Model output and compatibility are not guaranteed.
export const extendedPrompts: PromptRecord[] = [
  {
    categoryKey: "research",
    slug: "decision-brief-with-evidence",
    title: {
      en: "Build an evidence-backed decision brief",
      es: "Prepara una decisión con evidencia",
    },
    usefulFor: {
      en: "Compare a consequential decision using traceable evidence, assumptions and explicit tradeoffs.",
      es: "Compara una decisión importante con evidencia rastreable, supuestos y alternativas claras.",
    },
    inputs: [
      {
        en: "Decision and decision-maker",
        es: "Decisión y responsable",
      },
      {
        en: "Options and constraints",
        es: "Opciones y restricciones",
      },
      {
        en: "Source excerpts, links and dates",
        es: "Extractos, enlaces y fechas de las fuentes",
      },
    ],
    outcome: {
      en: "A recommendation whose reasoning and uncertainty can be inspected.",
      es: "Una recomendación con razonamiento e incertidumbre que se pueden revisar.",
    },
    tags: ["evidence", "decision", "strategy"],
    difficulty: "advanced",
    category: {
      en: "Research & Strategy",
      es: "Investigación y estrategia",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nDecision and decision-maker: [provide relevant, redacted material]\nOptions and constraints: [provide relevant, redacted material]\nSource excerpts, links and dates: [provide relevant, redacted material]\n\nWORKFLOW\n1. Define the decision, evaluation criteria and non-negotiable constraints before comparing any options.\n2. Create an evidence table linking each claim to its source, date and limitations. Mark unsupported claims as unknown.\n3. Compare options against the same criteria. Explain where a preference depends on an untested assumption.\n4. Recommend one option conditionally, state what would reverse the recommendation, and propose a small validation step.\n\nDELIVERABLE\nReturn a one-page brief: decision, evidence table, comparison, recommendation, counterargument, and next validation action with an owner placeholder.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nDecisión y responsable: [añade material pertinente sin datos privados]\nOpciones y restricciones: [añade material pertinente sin datos privados]\nExtractos, enlaces y fechas de las fuentes: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Define la decisión, los criterios de evaluación y las restricciones esenciales antes de comparar opciones.\n2. Crea una tabla que relacione cada afirmación con su fuente, fecha y límites. Marca lo no respaldado como desconocido.\n3. Compara las opciones con los mismos criterios. Explica qué preferencias dependen de supuestos sin comprobar.\n4. Recomienda una opción con condiciones, indica qué cambiaría la recomendación y propone una validación pequeña.\n\nENTREGABLE\nEntrega una página: decisión, tabla de evidencia, comparación, recomendación, contraargumento y siguiente validación con responsable por definir.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a one-page brief: decision, evidence table, comparison, recommendation, counterargument, and next validation action with an owner placeholder.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega una página: decisión, tabla de evidencia, comparación, recomendación, contraargumento y siguiente validación con responsable por definir.",
    },
  },
  {
    categoryKey: "research",
    slug: "customer-interview-synthesis",
    title: {
      en: "Find patterns in customer interviews",
      es: "Encuentra patrones en entrevistas",
    },
    usefulFor: {
      en: "Turn interview notes into grounded themes without converting isolated comments into market facts.",
      es: "Convierte notas de entrevistas en temas fundamentados sin presentar comentarios aislados como hechos del mercado.",
    },
    inputs: [
      {
        en: "Research question and audience",
        es: "Pregunta de investigación y audiencia",
      },
      {
        en: "Redacted interview notes with anonymous IDs",
        es: "Notas sin datos privados e identificadores anónimos",
      },
      {
        en: "Known sampling limitations",
        es: "Límites conocidos de la muestra",
      },
    ],
    outcome: {
      en: "Research themes traceable to the actual interviews.",
      es: "Temas de investigación rastreables a las entrevistas reales.",
    },
    tags: ["interviews", "synthesis", "customer-research"],
    difficulty: "advanced",
    category: {
      en: "Research & Strategy",
      es: "Investigación y estrategia",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nResearch question and audience: [provide relevant, redacted material]\nRedacted interview notes with anonymous IDs: [provide relevant, redacted material]\nKnown sampling limitations: [provide relevant, redacted material]\n\nWORKFLOW\n1. Read each interview separately and extract observed behavior, stated need, workaround and direct supporting quote.\n2. Cluster similar needs while preserving participant IDs and contradictory examples; distinguish frequency from intensity.\n3. Separate participant language from your interpretation. Identify missing perspectives and leading-question risks.\n4. Translate the strongest patterns into testable opportunity statements and questions for the next interview.\n\nDELIVERABLE\nReturn an evidence matrix, themes with supporting IDs, contradictions, sampling caveats, and three prioritized follow-up questions.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nPregunta de investigación y audiencia: [añade material pertinente sin datos privados]\nNotas sin datos privados e identificadores anónimos: [añade material pertinente sin datos privados]\nLímites conocidos de la muestra: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Lee cada entrevista por separado y extrae conducta observada, necesidad, solución actual y cita de apoyo.\n2. Agrupa necesidades similares conservando identificadores y ejemplos contradictorios; distingue frecuencia de intensidad.\n3. Separa las palabras de los participantes de tu interpretación. Identifica perspectivas ausentes y preguntas que inducen respuestas.\n4. Convierte los patrones más sólidos en oportunidades comprobables y preguntas para la próxima entrevista.\n\nENTREGABLE\nEntrega una matriz de evidencia, temas con identificadores de apoyo, contradicciones, límites de la muestra y tres preguntas de seguimiento priorizadas.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return an evidence matrix, themes with supporting IDs, contradictions, sampling caveats, and three prioritized follow-up questions.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega una matriz de evidencia, temas con identificadores de apoyo, contradicciones, límites de la muestra y tres preguntas de seguimiento priorizadas.",
    },
  },
  {
    categoryKey: "research",
    slug: "competitive-positioning-map",
    title: {
      en: "Map positioning without guessing",
      es: "Compara posicionamientos sin adivinar",
    },
    usefulFor: {
      en: "Analyze supplied competitor material to discover a credible positioning angle and proof gaps.",
      es: "Analiza material de competidores para encontrar un posicionamiento creíble y la evidencia que falta.",
    },
    inputs: [
      {
        en: "Our audience, offer and verified capabilities",
        es: "Nuestra audiencia, oferta y capacidades verificadas",
      },
      {
        en: "Competitor page excerpts with URLs and dates",
        es: "Extractos de competidores con enlaces y fechas",
      },
      {
        en: "Buyer priorities and comparison boundaries",
        es: "Prioridades del comprador y límites de comparación",
      },
    ],
    outcome: {
      en: "Positioning grounded in verified differences rather than generic superlatives.",
      es: "Un posicionamiento basado en diferencias verificadas y no en superlativos genéricos.",
    },
    tags: ["positioning", "competitive-research", "messaging"],
    difficulty: "advanced",
    category: {
      en: "Research & Strategy",
      es: "Investigación y estrategia",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nOur audience, offer and verified capabilities: [provide relevant, redacted material]\nCompetitor page excerpts with URLs and dates: [provide relevant, redacted material]\nBuyer priorities and comparison boundaries: [provide relevant, redacted material]\n\nWORKFLOW\n1. Extract each competitor’s intended buyer, promised outcome, mechanism, proof and call to action from the supplied text.\n2. Build a common comparison map. Use not stated when a page omits a detail; do not infer absence of capability.\n3. Identify crowded claims and plausible differences our verified evidence can support. Include a skeptical buyer’s objection.\n4. Draft a positioning statement and two messaging angles, each paired with the proof required before publication.\n\nDELIVERABLE\nReturn a comparison table, defensible differentiation, draft positioning, unsupported-claim register, and a focused research next step.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nNuestra audiencia, oferta y capacidades verificadas: [añade material pertinente sin datos privados]\nExtractos de competidores con enlaces y fechas: [añade material pertinente sin datos privados]\nPrioridades del comprador y límites de comparación: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Extrae de cada texto el comprador, resultado prometido, mecanismo, pruebas y llamada a la acción.\n2. Construye una comparación común. Escribe no indicado cuando falte información; no supongas que una capacidad no existe.\n3. Identifica mensajes repetidos y diferencias que nuestra evidencia pueda sostener. Incluye una objeción de un comprador escéptico.\n4. Redacta un posicionamiento y dos enfoques de mensaje, cada uno con la evidencia necesaria antes de publicarlo.\n\nENTREGABLE\nEntrega una tabla comparativa, diferenciación defendible, posicionamiento preliminar, afirmaciones sin respaldo y una investigación siguiente concreta.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a comparison table, defensible differentiation, draft positioning, unsupported-claim register, and a focused research next step.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega una tabla comparativa, diferenciación defendible, posicionamiento preliminar, afirmaciones sin respaldo y una investigación siguiente concreta.",
    },
  },
  {
    categoryKey: "research",
    slug: "assumption-test-plan",
    title: {
      en: "Turn assumptions into a test plan",
      es: "Convierte supuestos en un plan de pruebas",
    },
    usefulFor: {
      en: "Design a small validation plan that distinguishes what a team believes from what evidence supports.",
      es: "Diseña una validación pequeña que distinga las creencias del equipo de la evidencia disponible.",
    },
    inputs: [
      {
        en: "Proposed idea and intended outcome",
        es: "Idea propuesta y resultado buscado",
      },
      {
        en: "Assumptions and existing evidence",
        es: "Supuestos y evidencia actual",
      },
      {
        en: "Available time, access and ethical limits",
        es: "Tiempo disponible, acceso y límites éticos",
      },
    ],
    outcome: {
      en: "A bounded experiment linked to a real decision.",
      es: "Un experimento acotado relacionado con una decisión real.",
    },
    tags: ["experiments", "assumptions", "validation"],
    difficulty: "advanced",
    category: {
      en: "Research & Strategy",
      es: "Investigación y estrategia",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nProposed idea and intended outcome: [provide relevant, redacted material]\nAssumptions and existing evidence: [provide relevant, redacted material]\nAvailable time, access and ethical limits: [provide relevant, redacted material]\n\nWORKFLOW\n1. List the assumptions about desirability, usability, feasibility and delivery; label each as evidenced or untested.\n2. Rank assumptions by consequence if wrong and uncertainty. Explain the ranking without invented scoring precision.\n3. For the riskiest assumption, propose the smallest test, observable signal, participant criteria and stop condition.\n4. Define what each possible result would justify, leave unresolved or require changing before a larger commitment.\n\nDELIVERABLE\nReturn an assumption register and one executable experiment brief with method, evidence capture, decision rule and limitations.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nIdea propuesta y resultado buscado: [añade material pertinente sin datos privados]\nSupuestos y evidencia actual: [añade material pertinente sin datos privados]\nTiempo disponible, acceso y límites éticos: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Enumera supuestos de utilidad, usabilidad, viabilidad y entrega; marca cada uno como respaldado o sin comprobar.\n2. Ordena los supuestos según las consecuencias de equivocarse y su incertidumbre. Explica el orden sin falsa precisión numérica.\n3. Para el supuesto más arriesgado, propone la prueba mínima, señal observable, participantes y condición de parada.\n4. Define qué permitiría concluir cada resultado, qué seguiría sin resolverse y qué habría que cambiar antes de avanzar.\n\nENTREGABLE\nEntrega un registro de supuestos y un experimento ejecutable con método, captura de evidencia, regla de decisión y límites.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return an assumption register and one executable experiment brief with method, evidence capture, decision rule and limitations.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega un registro de supuestos y un experimento ejecutable con método, captura de evidencia, regla de decisión y límites.",
    },
  },
  {
    categoryKey: "operations",
    slug: "automation-opportunity-map",
    title: {
      en: "Find the right work to automate",
      es: "Encuentra qué trabajo automatizar",
    },
    usefulFor: {
      en: "Map repetitive work and choose a sensible automation candidate before selecting tools or building a workflow.",
      es: "Mapea trabajo repetitivo y elige una automatización adecuada antes de escoger herramientas o construir un flujo.",
    },
    inputs: [
      {
        en: "Current process and example records",
        es: "Proceso actual y registros de ejemplo",
      },
      {
        en: "People, tools and handoffs",
        es: "Personas, herramientas y traspasos",
      },
      {
        en: "Failure costs and available measurements",
        es: "Consecuencias de fallos y mediciones disponibles",
      },
    ],
    outcome: {
      en: "A pilot chosen for usefulness and reliability, not novelty.",
      es: "Un piloto elegido por utilidad y confiabilidad, no por novedad.",
    },
    tags: ["automation", "process-mapping", "operations"],
    difficulty: "advanced",
    category: {
      en: "Automation & Operations",
      es: "Automatización y operaciones",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nCurrent process and example records: [provide relevant, redacted material]\nPeople, tools and handoffs: [provide relevant, redacted material]\nFailure costs and available measurements: [provide relevant, redacted material]\n\nWORKFLOW\n1. Map the process from trigger to final outcome, naming inputs, decisions, transformations and human handoffs.\n2. Separate deterministic steps from judgment-heavy work. Identify missing data, duplicate entry and exception paths.\n3. Compare candidates using observed repetition, impact, error consequences and integration readiness; do not invent savings.\n4. Recommend one pilot with an approval boundary, success signal, rollback and a case that must remain manual.\n\nDELIVERABLE\nReturn a process map in text, opportunity table, recommended pilot, exception checklist and questions required before implementation.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nProceso actual y registros de ejemplo: [añade material pertinente sin datos privados]\nPersonas, herramientas y traspasos: [añade material pertinente sin datos privados]\nConsecuencias de fallos y mediciones disponibles: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Mapea el proceso desde el inicio hasta el resultado, identificando entradas, decisiones, transformaciones y traspasos humanos.\n2. Separa pasos deterministas del trabajo que requiere criterio. Identifica datos ausentes, doble registro y excepciones.\n3. Compara candidatos según repetición observada, impacto, consecuencias de errores y preparación técnica; no inventes ahorros.\n4. Recomienda un piloto con límite de aprobación, señal de éxito, reversión y un caso que deba seguir manual.\n\nENTREGABLE\nEntrega un mapa textual, tabla de oportunidades, piloto recomendado, lista de excepciones y preguntas necesarias antes de implementar.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a process map in text, opportunity table, recommended pilot, exception checklist and questions required before implementation.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega un mapa textual, tabla de oportunidades, piloto recomendado, lista de excepciones y preguntas necesarias antes de implementar.",
    },
  },
  {
    categoryKey: "operations",
    slug: "workflow-failure-investigation",
    title: {
      en: "Investigate a workflow failure",
      es: "Investiga un fallo de automatización",
    },
    usefulFor: {
      en: "Diagnose a broken integration from evidence while protecting a working production flow and its data.",
      es: "Diagnostica una integración con evidencia mientras proteges el flujo de producción y sus datos.",
    },
    inputs: [
      {
        en: "Expected behavior and observed failure",
        es: "Comportamiento esperado y fallo observado",
      },
      {
        en: "Redacted logs, inputs and recent changes",
        es: "Registros sin secretos, entradas y cambios recientes",
      },
      {
        en: "Environment and permitted diagnostic actions",
        es: "Entorno y acciones de diagnóstico permitidas",
      },
    ],
    outcome: {
      en: "An evidence-based repair plan that avoids a speculative rebuild.",
      es: "Un plan de reparación con evidencia que evita reconstrucciones especulativas.",
    },
    tags: ["debugging", "integrations", "reliability"],
    difficulty: "advanced",
    category: {
      en: "Automation & Operations",
      es: "Automatización y operaciones",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nExpected behavior and observed failure: [provide relevant, redacted material]\nRedacted logs, inputs and recent changes: [provide relevant, redacted material]\nEnvironment and permitted diagnostic actions: [provide relevant, redacted material]\n\nWORKFLOW\n1. Build a factual timeline and locate the last confirmed successful boundary in the flow.\n2. Separate transport, authentication, schema, mapping, business-rule and retry hypotheses; cite evidence for each.\n3. Propose read-only checks first, then the smallest reversible reproduction using synthetic data in an appropriate environment.\n4. Describe a narrowly scoped repair, validation cases and rollback. State where access prevents a conclusion.\n\nDELIVERABLE\nReturn known facts, ranked hypotheses, next diagnostic action, proposed patch boundary, regression cases and a concise handoff.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nComportamiento esperado y fallo observado: [añade material pertinente sin datos privados]\nRegistros sin secretos, entradas y cambios recientes: [añade material pertinente sin datos privados]\nEntorno y acciones de diagnóstico permitidas: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Construye una cronología factual y localiza el último punto del flujo cuyo éxito esté confirmado.\n2. Separa hipótesis de transporte, autenticación, esquema, mapeo, reglas y reintentos; cita evidencia para cada una.\n3. Propón primero comprobaciones de lectura y después la reproducción mínima reversible con datos ficticios en un entorno adecuado.\n4. Describe una reparación acotada, casos de validación y reversión. Indica qué conclusiones impide la falta de acceso.\n\nENTREGABLE\nEntrega hechos conocidos, hipótesis priorizadas, siguiente diagnóstico, alcance de la corrección, regresiones y un traspaso breve.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return known facts, ranked hypotheses, next diagnostic action, proposed patch boundary, regression cases and a concise handoff.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega hechos conocidos, hipótesis priorizadas, siguiente diagnóstico, alcance de la corrección, regresiones y un traspaso breve.",
    },
  },
  {
    categoryKey: "operations",
    slug: "sop-from-rough-process",
    title: {
      en: "Build an SOP someone can actually follow",
      es: "Crea un procedimiento que se pueda seguir",
    },
    usefulFor: {
      en: "Convert scattered process knowledge into a usable procedure with exceptions, checks and clear ownership.",
      es: "Convierte conocimiento disperso en un procedimiento usable con excepciones, comprobaciones y responsabilidades claras.",
    },
    inputs: [
      {
        en: "Process goal and intended operator",
        es: "Objetivo del proceso y persona que lo ejecuta",
      },
      {
        en: "Rough notes or demonstration transcript",
        es: "Notas iniciales o transcripción de una demostración",
      },
      {
        en: "Prerequisites, permissions and known exceptions",
        es: "Requisitos, permisos y excepciones conocidas",
      },
    ],
    outcome: {
      en: "A procedure tested against a normal path and an exception.",
      es: "Un procedimiento revisado con un caso normal y una excepción.",
    },
    tags: ["documentation", "sop", "handoff"],
    difficulty: "intermediate",
    category: {
      en: "Automation & Operations",
      es: "Automatización y operaciones",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nProcess goal and intended operator: [provide relevant, redacted material]\nRough notes or demonstration transcript: [provide relevant, redacted material]\nPrerequisites, permissions and known exceptions: [provide relevant, redacted material]\n\nWORKFLOW\n1. Extract the trigger, required inputs, prerequisites and completion evidence before writing the procedure.\n2. Write ordered steps with one concrete action and expected result per step; preserve exact names supplied.\n3. Add decision branches for missing data, rejection, duplicates and partial failure; assign an owner placeholder where unknown.\n4. Walk through a normal example and an exception using the draft, and identify instructions that cannot yet be executed.\n\nDELIVERABLE\nReturn a quickstart, detailed procedure, exception table, completion checklist, open questions and a version-change note.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nObjetivo del proceso y persona que lo ejecuta: [añade material pertinente sin datos privados]\nNotas iniciales o transcripción de una demostración: [añade material pertinente sin datos privados]\nRequisitos, permisos y excepciones conocidas: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Extrae el inicio, entradas necesarias, requisitos y evidencia de finalización antes de redactar el procedimiento.\n2. Redacta pasos ordenados con una acción concreta y resultado esperado por paso; conserva los nombres exactos proporcionados.\n3. Añade decisiones para datos ausentes, rechazos, duplicados y fallos parciales; deja responsable por definir cuando corresponda.\n4. Recorre un ejemplo normal y una excepción con el borrador e identifica instrucciones que aún no se puedan ejecutar.\n\nENTREGABLE\nEntrega inicio rápido, procedimiento detallado, tabla de excepciones, lista de finalización, dudas y nota de cambios de versión.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a quickstart, detailed procedure, exception table, completion checklist, open questions and a version-change note.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega inicio rápido, procedimiento detallado, tabla de excepciones, lista de finalización, dudas y nota de cambios de versión.",
    },
  },
  {
    categoryKey: "operations",
    slug: "integration-handoff-contract",
    title: {
      en: "Write an integration handoff contract",
      es: "Define un contrato de integración",
    },
    usefulFor: {
      en: "Translate a desired system connection into an implementation contract that exposes missing decisions early.",
      es: "Convierte una conexión entre sistemas en un contrato de implementación que revele decisiones pendientes.",
    },
    inputs: [
      {
        en: "Systems, intended event and business outcome",
        es: "Sistemas, evento previsto y resultado operativo",
      },
      {
        en: "Example redacted payloads and field meanings",
        es: "Ejemplos sin datos privados y significado de campos",
      },
      {
        en: "Access, volume and failure constraints",
        es: "Acceso, volumen y restricciones ante fallos",
      },
    ],
    outcome: {
      en: "An integration brief a builder can implement and a reviewer can verify.",
      es: "Una especificación que se puede implementar y verificar.",
    },
    tags: ["api", "contracts", "idempotency"],
    difficulty: "advanced",
    category: {
      en: "Automation & Operations",
      es: "Automatización y operaciones",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nSystems, intended event and business outcome: [provide relevant, redacted material]\nExample redacted payloads and field meanings: [provide relevant, redacted material]\nAccess, volume and failure constraints: [provide relevant, redacted material]\n\nWORKFLOW\n1. Define source of truth, trigger, destination, required fields and ownership without assuming undocumented API behavior.\n2. Map each field’s type, nullability, transformation and validation. Mark unanswered mappings explicitly.\n3. Specify idempotency, duplicate policy, retries, rate handling, privacy boundaries and a dead-letter or review path.\n4. Define synthetic test cases, expected receipts, readback verification and rollback before enabling the connection.\n\nDELIVERABLE\nReturn a field contract, event sequence, failure matrix, acceptance cases and a list of access or product decisions.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nSistemas, evento previsto y resultado operativo: [añade material pertinente sin datos privados]\nEjemplos sin datos privados y significado de campos: [añade material pertinente sin datos privados]\nAcceso, volumen y restricciones ante fallos: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Define fuente oficial, disparador, destino, campos obligatorios y responsables sin asumir comportamientos de API no documentados.\n2. Mapea tipo, nulabilidad, transformación y validación de cada campo. Marca expresamente los mapeos pendientes.\n3. Especifica idempotencia, duplicados, reintentos, límites, privacidad y una ruta de revisión para fallos.\n4. Define pruebas ficticias, comprobantes esperados, lectura de verificación y reversión antes de activar la conexión.\n\nENTREGABLE\nEntrega contrato de campos, secuencia de eventos, matriz de fallos, casos de aceptación y decisiones de acceso o producto.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a field contract, event sequence, failure matrix, acceptance cases and a list of access or product decisions.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega contrato de campos, secuencia de eventos, matriz de fallos, casos de aceptación y decisiones de acceso o producto.",
    },
  },
  {
    categoryKey: "sales",
    slug: "discovery-call-plan",
    title: {
      en: "Design a useful discovery conversation",
      es: "Diseña una conversación de descubrimiento útil",
    },
    usefulFor: {
      en: "Prepare an evidence-seeking customer conversation that clarifies the problem before proposing a solution.",
      es: "Prepara una conversación que busque evidencia y aclare el problema antes de proponer una solución.",
    },
    inputs: [
      {
        en: "Customer context and verified prior notes",
        es: "Contexto del cliente y notas previas verificadas",
      },
      {
        en: "Hypothesis about the problem",
        es: "Hipótesis del problema",
      },
      {
        en: "Meeting goal and time available",
        es: "Objetivo de la reunión y tiempo disponible",
      },
    ],
    outcome: {
      en: "A discovery plan built to learn rather than force agreement.",
      es: "Un plan para aprender y no para forzar un acuerdo.",
    },
    tags: ["discovery", "customer", "sales"],
    difficulty: "intermediate",
    category: {
      en: "Sales & Customer Work",
      es: "Ventas y clientes",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nCustomer context and verified prior notes: [provide relevant, redacted material]\nHypothesis about the problem: [provide relevant, redacted material]\nMeeting goal and time available: [provide relevant, redacted material]\n\nWORKFLOW\n1. Distinguish known facts from assumptions about the customer’s work, current workaround and desired outcome.\n2. Sequence open questions from recent real examples to consequences, stakeholders, constraints and decision process.\n3. Add follow-up probes for vague answers and a neutral way to test the problem hypothesis without leading.\n4. Plan a closing recap that confirms understanding and proposes a next step only if the evidence supports it.\n\nDELIVERABLE\nReturn a conversation outline, prioritized questions, listening signals, disconfirming evidence and a structured notes template.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nContexto del cliente y notas previas verificadas: [añade material pertinente sin datos privados]\nHipótesis del problema: [añade material pertinente sin datos privados]\nObjetivo de la reunión y tiempo disponible: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Distingue hechos conocidos de supuestos sobre el trabajo, solución actual y resultado deseado del cliente.\n2. Ordena preguntas abiertas sobre ejemplos recientes, consecuencias, participantes, restricciones y proceso de decisión.\n3. Añade preguntas para respuestas vagas y una forma neutral de comprobar la hipótesis sin inducir respuestas.\n4. Prepara un cierre que confirme lo entendido y proponga un siguiente paso solo si la evidencia lo justifica.\n\nENTREGABLE\nEntrega una guía de conversación, preguntas priorizadas, señales que escuchar, evidencia contraria y plantilla de notas.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a conversation outline, prioritized questions, listening signals, disconfirming evidence and a structured notes template.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega una guía de conversación, preguntas priorizadas, señales que escuchar, evidencia contraria y plantilla de notas.",
    },
  },
  {
    categoryKey: "sales",
    slug: "proposal-scope-builder",
    title: {
      en: "Turn discovery into a clear scope",
      es: "Convierte el descubrimiento en un alcance claro",
    },
    usefulFor: {
      en: "Draft a proposal scope that ties deliverables to the customer’s problem and makes unresolved commitments visible.",
      es: "Redacta un alcance que conecte entregables con el problema del cliente y muestre compromisos pendientes.",
    },
    inputs: [
      {
        en: "Confirmed discovery notes and desired outcome",
        es: "Notas confirmadas y resultado deseado",
      },
      {
        en: "Approved service capabilities and pricing source",
        es: "Capacidades aprobadas y fuente de precios",
      },
      {
        en: "Delivery constraints and customer dependencies",
        es: "Restricciones de entrega y dependencias del cliente",
      },
    ],
    outcome: {
      en: "A reviewable scope with clear boundaries and no invented commitments.",
      es: "Un alcance revisable, con límites claros y sin compromisos inventados.",
    },
    tags: ["proposals", "scope", "delivery"],
    difficulty: "advanced",
    category: {
      en: "Sales & Customer Work",
      es: "Ventas y clientes",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nConfirmed discovery notes and desired outcome: [provide relevant, redacted material]\nApproved service capabilities and pricing source: [provide relevant, redacted material]\nDelivery constraints and customer dependencies: [provide relevant, redacted material]\n\nWORKFLOW\n1. Summarize the customer problem using their evidence and separate confirmed needs from optional ideas.\n2. Define deliverables, acceptance evidence, exclusions and customer responsibilities for each workstream.\n3. Identify dependencies, sequencing risks and change-control triggers. Use placeholders for unapproved dates, prices or terms.\n4. Write a concise proposal narrative and test it for ambiguous promises or outcomes outside the team’s control.\n\nDELIVERABLE\nReturn an executive scope, deliverable table, acceptance criteria, exclusions, dependencies and the decisions required before sending.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nNotas confirmadas y resultado deseado: [añade material pertinente sin datos privados]\nCapacidades aprobadas y fuente de precios: [añade material pertinente sin datos privados]\nRestricciones de entrega y dependencias del cliente: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Resume el problema con evidencia del cliente y separa necesidades confirmadas de ideas opcionales.\n2. Define entregables, evidencia de aceptación, exclusiones y responsabilidades del cliente por cada área.\n3. Identifica dependencias, riesgos de secuencia y cambios de alcance. Deja pendientes fechas, precios o condiciones sin aprobar.\n4. Redacta una propuesta breve y revisa promesas ambiguas o resultados fuera del control del equipo.\n\nENTREGABLE\nEntrega alcance ejecutivo, tabla de entregables, criterios de aceptación, exclusiones, dependencias y decisiones previas al envío.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return an executive scope, deliverable table, acceptance criteria, exclusions, dependencies and the decisions required before sending.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega alcance ejecutivo, tabla de entregables, criterios de aceptación, exclusiones, dependencias y decisiones previas al envío.",
    },
  },
  {
    categoryKey: "sales",
    slug: "objection-response-evidence",
    title: {
      en: "Answer objections with useful evidence",
      es: "Responde objeciones con evidencia útil",
    },
    usefulFor: {
      en: "Develop credible objection responses that address the buyer’s concern without pressure or unsupported guarantees.",
      es: "Desarrolla respuestas creíbles que atiendan la preocupación del comprador sin presión ni garantías sin respaldo.",
    },
    inputs: [
      {
        en: "Buyer’s actual words and conversation context",
        es: "Palabras reales del comprador y contexto",
      },
      {
        en: "Verified offer facts and proof available",
        es: "Hechos verificados de la oferta y pruebas disponibles",
      },
      {
        en: "Claims or commitments we cannot make",
        es: "Afirmaciones o compromisos que no podemos hacer",
      },
    ],
    outcome: {
      en: "An objection response that earns clarity instead of manufacturing urgency.",
      es: "Una respuesta que aporta claridad sin fabricar urgencia.",
    },
    tags: ["objections", "evidence", "conversation"],
    difficulty: "advanced",
    category: {
      en: "Sales & Customer Work",
      es: "Ventas y clientes",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nBuyer’s actual words and conversation context: [provide relevant, redacted material]\nVerified offer facts and proof available: [provide relevant, redacted material]\nClaims or commitments we cannot make: [provide relevant, redacted material]\n\nWORKFLOW\n1. Identify whether the concern is about relevance, trust, risk, timing, budget or missing understanding; allow multiple causes.\n2. Write a clarifying question that tests your interpretation before attempting to overcome the objection.\n3. Draft a short empathetic response using only supplied evidence, with a transparent limit where proof is missing.\n4. Offer an appropriate next step, a lower-risk way to evaluate, or a respectful no-fit conclusion.\n\nDELIVERABLE\nReturn a concern map, clarification, short response, evidence reference, claims to avoid and a follow-up decision.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nPalabras reales del comprador y contexto: [añade material pertinente sin datos privados]\nHechos verificados de la oferta y pruebas disponibles: [añade material pertinente sin datos privados]\nAfirmaciones o compromisos que no podemos hacer: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Identifica si la preocupación trata de relevancia, confianza, riesgo, momento, presupuesto o comprensión; admite varias causas.\n2. Escribe una pregunta aclaratoria que compruebe tu interpretación antes de responder a la objeción.\n3. Redacta una respuesta breve y empática solo con evidencia proporcionada, indicando los límites cuando falte respaldo.\n4. Ofrece un siguiente paso adecuado, una evaluación de menor riesgo o una conclusión respetuosa de que no encaja.\n\nENTREGABLE\nEntrega mapa de preocupaciones, aclaración, respuesta breve, referencia de evidencia, afirmaciones que evitar y decisión de seguimiento.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a concern map, clarification, short response, evidence reference, claims to avoid and a follow-up decision.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega mapa de preocupaciones, aclaración, respuesta breve, referencia de evidencia, afirmaciones que evitar y decisión de seguimiento.",
    },
  },
  {
    categoryKey: "sales",
    slug: "customer-handoff-brief",
    title: {
      en: "Create a sales-to-delivery handoff",
      es: "Prepara el traspaso de ventas a entrega",
    },
    usefulFor: {
      en: "Prepare a delivery brief that separates what was agreed from sales discussion, assumptions and unresolved questions.",
      es: "Prepara una entrega que distinga acuerdos de conversaciones comerciales, supuestos y preguntas pendientes.",
    },
    inputs: [
      {
        en: "Approved scope and customer commitments",
        es: "Alcance aprobado y compromisos del cliente",
      },
      {
        en: "Discovery notes and relevant correspondence",
        es: "Notas de descubrimiento y correspondencia pertinente",
      },
      {
        en: "Delivery owners, access status and dependencies",
        es: "Responsables, estado de accesos y dependencias",
      },
    ],
    outcome: {
      en: "A shared starting point that prevents promises from getting lost.",
      es: "Un punto de partida común que evita perder compromisos.",
    },
    tags: ["customer-success", "handoff", "scope"],
    difficulty: "intermediate",
    category: {
      en: "Sales & Customer Work",
      es: "Ventas y clientes",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nApproved scope and customer commitments: [provide relevant, redacted material]\nDiscovery notes and relevant correspondence: [provide relevant, redacted material]\nDelivery owners, access status and dependencies: [provide relevant, redacted material]\n\nWORKFLOW\n1. Extract the customer’s goal, agreed deliverables and acceptance evidence, citing the supplied agreement or notes.\n2. List every discussed item as agreed, proposed, excluded or unresolved so informal ideas cannot become silent scope.\n3. Map owners, required access, source materials, dependencies and first milestones using only confirmed information.\n4. Identify delivery risks and draft a kickoff agenda focused on validating assumptions before work begins.\n\nDELIVERABLE\nReturn a one-page handoff, scope-status table, access checklist, risk register and kickoff questions with owner placeholders.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nAlcance aprobado y compromisos del cliente: [añade material pertinente sin datos privados]\nNotas de descubrimiento y correspondencia pertinente: [añade material pertinente sin datos privados]\nResponsables, estado de accesos y dependencias: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Extrae objetivo, entregables acordados y evidencia de aceptación, citando el acuerdo o las notas proporcionadas.\n2. Clasifica cada punto como acordado, propuesto, excluido o pendiente para evitar convertir ideas informales en alcance.\n3. Mapea responsables, accesos, materiales, dependencias e hitos iniciales solo con información confirmada.\n4. Identifica riesgos de entrega y redacta una agenda inicial para validar supuestos antes de comenzar.\n\nENTREGABLE\nEntrega un traspaso de una página, tabla de alcance, lista de accesos, riesgos y preguntas iniciales con responsables por definir.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a one-page handoff, scope-status table, access checklist, risk register and kickoff questions with owner placeholders.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega un traspaso de una página, tabla de alcance, lista de accesos, riesgos y preguntas iniciales con responsables por definir.",
    },
  },
  {
    categoryKey: "content",
    slug: "expert-interview-to-content",
    title: {
      en: "Turn expert knowledge into a content series",
      es: "Convierte conocimiento experto en una serie",
    },
    usefulFor: {
      en: "Develop distinct content pieces from a subject-matter interview while preserving the expert’s meaning and evidence.",
      es: "Desarrolla piezas distintas desde una entrevista especializada conservando su significado y evidencia.",
    },
    inputs: [
      {
        en: "Redacted interview transcript or expert notes",
        es: "Transcripción sin datos privados o notas de la persona experta",
      },
      {
        en: "Audience, channel and communication goal",
        es: "Audiencia, canal y objetivo de comunicación",
      },
      {
        en: "Approved claims, voice and publication boundaries",
        es: "Afirmaciones aprobadas, voz y límites de publicación",
      },
    ],
    outcome: {
      en: "A source-grounded series with genuinely different reader value.",
      es: "Una serie fundamentada que aporta valor distinto en cada pieza.",
    },
    tags: ["interviews", "content", "editorial"],
    difficulty: "advanced",
    category: {
      en: "Content & Media",
      es: "Contenido y medios",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nRedacted interview transcript or expert notes: [provide relevant, redacted material]\nAudience, channel and communication goal: [provide relevant, redacted material]\nApproved claims, voice and publication boundaries: [provide relevant, redacted material]\n\nWORKFLOW\n1. Extract useful observations, examples, tensions and lessons, attaching a transcript reference to each candidate idea.\n2. Choose distinct audience questions for a short series; avoid repeating the same argument with different headlines.\n3. Draft one complete piece and outlines for the others, preserving the expert’s meaning and separating paraphrase from quotation.\n4. Audit factual claims, confidential material, unsupported promises and unclear references before suggesting publication.\n\nDELIVERABLE\nReturn an idea evidence map, series plan, one complete draft, supporting excerpts and an editorial review checklist.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nTranscripción sin datos privados o notas de la persona experta: [añade material pertinente sin datos privados]\nAudiencia, canal y objetivo de comunicación: [añade material pertinente sin datos privados]\nAfirmaciones aprobadas, voz y límites de publicación: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Extrae observaciones, ejemplos, tensiones y lecciones, vinculando cada idea con una referencia de la transcripción.\n2. Elige preguntas distintas de la audiencia para una serie breve; evita repetir el argumento con títulos diferentes.\n3. Redacta una pieza completa y esquemas del resto, conservando el significado y distinguiendo paráfrasis de citas.\n4. Revisa hechos, material confidencial, promesas sin respaldo y referencias confusas antes de proponer publicación.\n\nENTREGABLE\nEntrega mapa de ideas y evidencia, plan de serie, un borrador completo, extractos de apoyo y lista de revisión editorial.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return an idea evidence map, series plan, one complete draft, supporting excerpts and an editorial review checklist.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega mapa de ideas y evidencia, plan de serie, un borrador completo, extractos de apoyo y lista de revisión editorial.",
    },
  },
  {
    categoryKey: "content",
    slug: "campaign-creative-system",
    title: {
      en: "Build a campaign creative system",
      es: "Construye un sistema creativo de campaña",
    },
    usefulFor: {
      en: "Create a coherent campaign with varied messages and visuals instead of unrelated social posts or repeated slogans.",
      es: "Crea una campaña coherente con mensajes y visuales variados en lugar de publicaciones aisladas o eslóganes repetidos.",
    },
    inputs: [
      {
        en: "Campaign objective and audience insight",
        es: "Objetivo de campaña y conocimiento de la audiencia",
      },
      {
        en: "Verified offer, approved assets and brand rules",
        es: "Oferta verificada, recursos aprobados y reglas de marca",
      },
      {
        en: "Channels, formats and review constraints",
        es: "Canales, formatos y restricciones de revisión",
      },
    ],
    outcome: {
      en: "A consistent campaign with purposeful variety.",
      es: "Una campaña coherente con variedad intencional.",
    },
    tags: ["campaigns", "creative-direction", "brand"],
    difficulty: "advanced",
    category: {
      en: "Content & Media",
      es: "Contenido y medios",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nCampaign objective and audience insight: [provide relevant, redacted material]\nVerified offer, approved assets and brand rules: [provide relevant, redacted material]\nChannels, formats and review constraints: [provide relevant, redacted material]\n\nWORKFLOW\n1. Define the audience tension, useful promise and proof available; distinguish a creative idea from a factual claim.\n2. Develop a campaign concept with a message hierarchy, visual motif and boundaries for language and imagery.\n3. Map distinct executions to awareness, explanation and action without inventing deadlines, scarcity or customer results.\n4. Draft production briefs containing composition, exact text, asset references and accessibility considerations for each format.\n\nDELIVERABLE\nReturn a creative platform, message map, execution matrix, sample copy and asset-specific production briefs ready for review.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nObjetivo de campaña y conocimiento de la audiencia: [añade material pertinente sin datos privados]\nOferta verificada, recursos aprobados y reglas de marca: [añade material pertinente sin datos privados]\nCanales, formatos y restricciones de revisión: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Define tensión de la audiencia, propuesta útil y pruebas disponibles; distingue una idea creativa de una afirmación factual.\n2. Desarrolla un concepto con jerarquía de mensajes, motivo visual y límites para lenguaje e imágenes.\n3. Diseña ejecuciones distintas para descubrir, comprender y actuar sin inventar plazos, escasez ni resultados de clientes.\n4. Redacta briefs con composición, texto exacto, referencias de recursos y accesibilidad para cada formato.\n\nENTREGABLE\nEntrega plataforma creativa, mapa de mensajes, matriz de piezas, textos de muestra y briefs por recurso listos para revisar.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a creative platform, message map, execution matrix, sample copy and asset-specific production briefs ready for review.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega plataforma creativa, mapa de mensajes, matriz de piezas, textos de muestra y briefs por recurso listos para revisar.",
    },
  },
  {
    categoryKey: "content",
    slug: "video-edit-story-plan",
    title: {
      en: "Plan an edit from the story backward",
      es: "Planifica una edición desde la historia",
    },
    usefulFor: {
      en: "Turn available footage and a communication goal into an edit plan that a video editor can execute and review.",
      es: "Convierte material disponible y un objetivo de comunicación en un plan que un editor pueda ejecutar y revisar.",
    },
    inputs: [
      {
        en: "Audience, purpose and approved message",
        es: "Audiencia, propósito y mensaje aprobado",
      },
      {
        en: "Footage inventory with timecodes or descriptions",
        es: "Inventario de material con códigos de tiempo o descripciones",
      },
      {
        en: "Format, duration target and approved assets",
        es: "Formato, duración objetivo y recursos aprobados",
      },
    ],
    outcome: {
      en: "A practical edit blueprint tied to real material.",
      es: "Un plan de edición práctico vinculado al material real.",
    },
    tags: ["video", "storytelling", "production"],
    difficulty: "advanced",
    category: {
      en: "Content & Media",
      es: "Contenido y medios",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nAudience, purpose and approved message: [provide relevant, redacted material]\nFootage inventory with timecodes or descriptions: [provide relevant, redacted material]\nFormat, duration target and approved assets: [provide relevant, redacted material]\n\nWORKFLOW\n1. Identify the central story and viewer question, then classify available footage by evidence, explanation and transition function.\n2. Build a sequence using actual available shots. Mark missing coverage rather than inventing footage or interview statements.\n3. Specify cuts, voiceover needs, graphics, captions and sound purpose; distinguish confirmed audio from proposed production.\n4. Check story clarity, pacing, readable text and vertical/horizontal framing before writing the editor’s final checklist.\n\nDELIVERABLE\nReturn a beat sheet and edit table with shot source, timecode, on-screen text, audio, transition and unresolved production need.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nAudiencia, propósito y mensaje aprobado: [añade material pertinente sin datos privados]\nInventario de material con códigos de tiempo o descripciones: [añade material pertinente sin datos privados]\nFormato, duración objetivo y recursos aprobados: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Identifica historia y pregunta del espectador; clasifica el material según evidencia, explicación y función de transición.\n2. Construye una secuencia con tomas existentes. Marca material faltante sin inventar imágenes ni declaraciones.\n3. Especifica cortes, voz necesaria, gráficos, subtítulos y función del sonido; distingue audio confirmado de producción propuesta.\n4. Revisa claridad, ritmo, legibilidad y encuadres verticales u horizontales antes de preparar la lista final del editor.\n\nENTREGABLE\nEntrega estructura narrativa y tabla con toma, código de tiempo, texto, audio, transición y necesidad de producción pendiente.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a beat sheet and edit table with shot source, timecode, on-screen text, audio, transition and unresolved production need.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega estructura narrativa y tabla con toma, código de tiempo, texto, audio, transición y necesidad de producción pendiente.",
    },
  },
  {
    categoryKey: "content",
    slug: "editorial-fact-check",
    title: {
      en: "Audit a draft before publication",
      es: "Audita un borrador antes de publicarlo",
    },
    usefulFor: {
      en: "Review a content draft for unsupported claims, weak attribution, hidden assumptions and mismatched source meaning.",
      es: "Revisa afirmaciones sin respaldo, atribución débil, supuestos y diferencias respecto a las fuentes.",
    },
    inputs: [
      {
        en: "Draft and intended audience",
        es: "Borrador y audiencia prevista",
      },
      {
        en: "Sources or approved evidence packet",
        es: "Fuentes o paquete de evidencia aprobado",
      },
      {
        en: "Publication rules and claims to avoid",
        es: "Reglas de publicación y afirmaciones que evitar",
      },
    ],
    outcome: {
      en: "A clearer draft whose claims can be checked.",
      es: "Un borrador más claro cuyas afirmaciones se pueden comprobar.",
    },
    tags: ["fact-checking", "editorial", "quality"],
    difficulty: "intermediate",
    category: {
      en: "Content & Media",
      es: "Contenido y medios",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nDraft and intended audience: [provide relevant, redacted material]\nSources or approved evidence packet: [provide relevant, redacted material]\nPublication rules and claims to avoid: [provide relevant, redacted material]\n\nWORKFLOW\n1. Extract every checkable assertion, number, quotation, comparison and implied guarantee into a claim register.\n2. Match each claim to supplied evidence. Assess whether the source actually supports the wording, date and scope.\n3. Flag missing context, exaggerated certainty, misleading images and statements that require a subject-matter review.\n4. Suggest the smallest accurate rewrite for each issue while preserving the draft’s useful argument and voice.\n\nDELIVERABLE\nReturn a claim-by-claim audit, publication blockers, suggested edits and a clean draft with unresolved items visibly marked.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nBorrador y audiencia prevista: [añade material pertinente sin datos privados]\nFuentes o paquete de evidencia aprobado: [añade material pertinente sin datos privados]\nReglas de publicación y afirmaciones que evitar: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Extrae afirmaciones verificables, cifras, citas, comparaciones y garantías implícitas a un registro.\n2. Relaciona cada afirmación con evidencia y evalúa si respalda exactamente su redacción, fecha y alcance.\n3. Señala contexto faltante, certeza exagerada, imágenes engañosas y afirmaciones que requieran revisión especializada.\n4. Propón la corrección precisa más pequeña para cada problema conservando argumento y voz útiles.\n\nENTREGABLE\nEntrega auditoría por afirmación, bloqueos de publicación, cambios sugeridos y borrador corregido con pendientes visibles.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a claim-by-claim audit, publication blockers, suggested edits and a clean draft with unresolved items visibly marked.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega auditoría por afirmación, bloqueos de publicación, cambios sugeridos y borrador corregido con pendientes visibles.",
    },
  },
  {
    categoryKey: "product",
    slug: "website-journey-blueprint",
    title: {
      en: "Design a website around the visitor’s job",
      es: "Diseña un sitio alrededor del visitante",
    },
    usefulFor: {
      en: "Build an information architecture and page narrative from visitor goals instead of assembling generic feature sections.",
      es: "Construye arquitectura y narrativa de páginas desde los objetivos del visitante, no desde secciones genéricas.",
    },
    inputs: [
      {
        en: "Primary visitors and their real tasks",
        es: "Visitantes principales y sus tareas reales",
      },
      {
        en: "Verified content, assets and working features",
        es: "Contenido, recursos y funciones verificadas",
      },
      {
        en: "Current pain points and reference qualities",
        es: "Problemas actuales y cualidades de referencia",
      },
    ],
    outcome: {
      en: "A website plan whose structure follows visitor needs.",
      es: "Un sitio cuya estructura responde a las necesidades del visitante.",
    },
    tags: ["web-design", "ux", "information-architecture"],
    difficulty: "advanced",
    category: {
      en: "Product & Web Development",
      es: "Producto y desarrollo web",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nPrimary visitors and their real tasks: [provide relevant, redacted material]\nVerified content, assets and working features: [provide relevant, redacted material]\nCurrent pain points and reference qualities: [provide relevant, redacted material]\n\nWORKFLOW\n1. Define the primary visitor journey, successful next action and questions each stage must answer.\n2. Create a route map and a distinct narrative for each page, assigning verified content and meaningful interactions.\n3. Describe section composition, typography hierarchy, image purpose and mobile reading order; avoid repeating one card grid everywhere.\n4. Specify empty, unavailable, translated and error states, then define concrete screenshot-based visual acceptance criteria.\n\nDELIVERABLE\nReturn a journey map, route inventory, page-by-page blueprint, component needs and responsive visual acceptance checklist.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nVisitantes principales y sus tareas reales: [añade material pertinente sin datos privados]\nContenido, recursos y funciones verificadas: [añade material pertinente sin datos privados]\nProblemas actuales y cualidades de referencia: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Define recorrido principal, siguiente acción útil y preguntas que debe responder cada etapa.\n2. Crea mapa de rutas y narrativa distinta por página, asignando contenido verificado e interacciones útiles.\n3. Describe composición, jerarquía tipográfica, función de imágenes y orden móvil; evita repetir la misma cuadrícula en todo.\n4. Especifica estados vacíos, no disponibles, traducidos y de error; define criterios visuales verificables mediante capturas.\n\nENTREGABLE\nEntrega recorrido, inventario de rutas, plan por página, componentes necesarios y criterios de aceptación visual adaptable.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a journey map, route inventory, page-by-page blueprint, component needs and responsive visual acceptance checklist.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega recorrido, inventario de rutas, plan por página, componentes necesarios y criterios de aceptación visual adaptable.",
    },
  },
  {
    categoryKey: "product",
    slug: "implementation-ready-feature",
    title: {
      en: "Turn a feature idea into a buildable spec",
      es: "Convierte una idea en una especificación construible",
    },
    usefulFor: {
      en: "Define a feature’s behavior, boundaries and acceptance evidence before asking a developer or coding agent to implement it.",
      es: "Define comportamiento, límites y aceptación antes de pedir a un desarrollador o agente que implemente una función.",
    },
    inputs: [
      {
        en: "User problem and desired behavior",
        es: "Problema del usuario y comportamiento deseado",
      },
      {
        en: "Existing application contracts and constraints",
        es: "Contratos actuales de la aplicación y restricciones",
      },
      {
        en: "Known data, states and dependencies",
        es: "Datos, estados y dependencias conocidos",
      },
    ],
    outcome: {
      en: "A feature spec that exposes ambiguity before coding starts.",
      es: "Una especificación que revela ambigüedades antes de programar.",
    },
    tags: ["specifications", "development", "acceptance"],
    difficulty: "advanced",
    category: {
      en: "Product & Web Development",
      es: "Producto y desarrollo web",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nUser problem and desired behavior: [provide relevant, redacted material]\nExisting application contracts and constraints: [provide relevant, redacted material]\nKnown data, states and dependencies: [provide relevant, redacted material]\n\nWORKFLOW\n1. Write the user scenario and distinguish the required outcome from one possible implementation choice.\n2. Define inputs, state transitions, outputs, permission boundaries and validation rules using actual existing contracts.\n3. Walk through normal, empty, invalid, duplicate and interrupted paths. Identify unanswered product decisions.\n4. Break work into small implementation steps and write acceptance cases that observe behavior rather than mirror code.\n\nDELIVERABLE\nReturn problem statement, scope/non-scope, interaction contract, data needs, acceptance cases, dependencies and an implementation sequence.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nProblema del usuario y comportamiento deseado: [añade material pertinente sin datos privados]\nContratos actuales de la aplicación y restricciones: [añade material pertinente sin datos privados]\nDatos, estados y dependencias conocidos: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Describe el escenario del usuario y distingue el resultado necesario de una posible implementación.\n2. Define entradas, transiciones, salidas, permisos y validaciones usando los contratos reales existentes.\n3. Recorre casos normales, vacíos, inválidos, duplicados e interrumpidos. Identifica decisiones de producto pendientes.\n4. Divide el trabajo en pasos pequeños y redacta casos de aceptación que observen comportamiento sin copiar la implementación.\n\nENTREGABLE\nEntrega problema, alcance y exclusiones, contrato de interacción, datos, aceptación, dependencias y secuencia de implementación.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return problem statement, scope/non-scope, interaction contract, data needs, acceptance cases, dependencies and an implementation sequence.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega problema, alcance y exclusiones, contrato de interacción, datos, aceptación, dependencias y secuencia de implementación.",
    },
  },
  {
    categoryKey: "product",
    slug: "accessibility-review-plan",
    title: {
      en: "Review an interface beyond a score",
      es: "Revisa una interfaz más allá de una puntuación",
    },
    usefulFor: {
      en: "Plan and document an accessibility review using real user tasks, observable behavior and explicit verification limits.",
      es: "Planifica una revisión de accesibilidad con tareas reales, conductas observables y límites de verificación explícitos.",
    },
    inputs: [
      {
        en: "Interface routes and primary tasks",
        es: "Rutas de interfaz y tareas principales",
      },
      {
        en: "Screenshots, markup or observed behavior",
        es: "Capturas, marcado o comportamiento observado",
      },
      {
        en: "Available tools and test environment",
        es: "Herramientas disponibles y entorno de prueba",
      },
    ],
    outcome: {
      en: "An accessibility review with inspectable evidence and honest limits.",
      es: "Una revisión de accesibilidad con evidencia revisable y límites honestos.",
    },
    tags: ["accessibility", "qa", "interfaces"],
    difficulty: "advanced",
    category: {
      en: "Product & Web Development",
      es: "Producto y desarrollo web",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nInterface routes and primary tasks: [provide relevant, redacted material]\nScreenshots, markup or observed behavior: [provide relevant, redacted material]\nAvailable tools and test environment: [provide relevant, redacted material]\n\nWORKFLOW\n1. Identify critical journeys, interactive elements, content hierarchy and information conveyed only through color, sound or motion.\n2. Define keyboard, focus, zoom/reflow, labels, error feedback and reduced-motion checks with reproducible steps.\n3. Use automated findings as leads and distinguish confirmed issues from assumptions requiring assistive-technology testing.\n4. Prioritize fixes by task impact and provide acceptance evidence for each, without claiming universal compliance.\n\nDELIVERABLE\nReturn a task-based test matrix, issue register, reproducible steps, proposed fixes and a clearly labeled untested list.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nRutas de interfaz y tareas principales: [añade material pertinente sin datos privados]\nCapturas, marcado o comportamiento observado: [añade material pertinente sin datos privados]\nHerramientas disponibles y entorno de prueba: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Identifica recorridos críticos, controles, jerarquía e información transmitida solo mediante color, sonido o movimiento.\n2. Define comprobaciones reproducibles de teclado, foco, zoom, etiquetas, errores y movimiento reducido.\n3. Usa hallazgos automáticos como pistas y distingue problemas confirmados de supuestos que requieren tecnología de asistencia.\n4. Prioriza correcciones por impacto en la tarea y define evidencia de aceptación sin afirmar cumplimiento universal.\n\nENTREGABLE\nEntrega matriz por tareas, incidencias, pasos reproducibles, correcciones propuestas y lista explícita de aspectos no probados.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a task-based test matrix, issue register, reproducible steps, proposed fixes and a clearly labeled untested list.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega matriz por tareas, incidencias, pasos reproducibles, correcciones propuestas y lista explícita de aspectos no probados.",
    },
  },
  {
    categoryKey: "product",
    slug: "release-risk-review",
    title: {
      en: "Review a release before it ships",
      es: "Revisa un cambio antes del lanzamiento",
    },
    usefulFor: {
      en: "Assess a release using the actual diff, test evidence and rollout constraints rather than a generic launch checklist.",
      es: "Evalúa un lanzamiento con cambios reales, pruebas y restricciones de despliegue, no con una lista genérica.",
    },
    inputs: [
      {
        en: "Change summary or diff and intended behavior",
        es: "Resumen o diff y comportamiento previsto",
      },
      {
        en: "Test results and known limitations",
        es: "Resultados de pruebas y limitaciones conocidas",
      },
      {
        en: "Deployment, data and rollback constraints",
        es: "Despliegue, datos y restricciones de reversión",
      },
    ],
    outcome: {
      en: "A release decision tied to the actual change and evidence.",
      es: "Una decisión de lanzamiento vinculada al cambio y su evidencia.",
    },
    tags: ["release", "risk", "engineering"],
    difficulty: "advanced",
    category: {
      en: "Product & Web Development",
      es: "Producto y desarrollo web",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nChange summary or diff and intended behavior: [provide relevant, redacted material]\nTest results and known limitations: [provide relevant, redacted material]\nDeployment, data and rollback constraints: [provide relevant, redacted material]\n\nWORKFLOW\n1. Explain the change in user terms, identify affected routes/contracts and note what evidence confirms the intended behavior.\n2. Review failure modes involving data changes, configuration, permissions, compatibility and unavailable dependencies.\n3. Identify missing verification proportional to the change, separating blockers from follow-up improvements.\n4. Propose an ordered rollout, observable health checks, rollback triggers and the exact review artifact to approve.\n\nDELIVERABLE\nReturn a release decision brief, evidence table, material risks, missing checks, rollout steps and rollback conditions.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nResumen o diff y comportamiento previsto: [añade material pertinente sin datos privados]\nResultados de pruebas y limitaciones conocidas: [añade material pertinente sin datos privados]\nDespliegue, datos y restricciones de reversión: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Explica el cambio para el usuario, identifica rutas o contratos afectados y la evidencia del comportamiento previsto.\n2. Revisa fallos posibles en datos, configuración, permisos, compatibilidad y dependencias no disponibles.\n3. Identifica verificación faltante proporcional al cambio, distinguiendo bloqueos de mejoras posteriores.\n4. Propón despliegue ordenado, controles observables, condiciones de reversión y el artefacto exacto que se debe aprobar.\n\nENTREGABLE\nEntrega decisión de lanzamiento, tabla de evidencia, riesgos materiales, pruebas faltantes, despliegue y condiciones de reversión.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a release decision brief, evidence table, material risks, missing checks, rollout steps and rollback conditions.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega decisión de lanzamiento, tabla de evidencia, riesgos materiales, pruebas faltantes, despliegue y condiciones de reversión.",
    },
  },
  {
    categoryKey: "data",
    slug: "dataset-quality-investigation",
    title: {
      en: "Investigate a dataset before analyzing it",
      es: "Investiga los datos antes de analizarlos",
    },
    usefulFor: {
      en: "Assess data quality, grain and missingness so an analysis does not turn inconsistent records into confident conclusions.",
      es: "Evalúa calidad, nivel de detalle y datos ausentes para no convertir registros inconsistentes en conclusiones seguras.",
    },
    inputs: [
      {
        en: "Dataset sample or schema with definitions",
        es: "Muestra o esquema del conjunto con definiciones",
      },
      {
        en: "Analysis question and expected population",
        es: "Pregunta de análisis y población esperada",
      },
      {
        en: "Collection process and known limitations",
        es: "Proceso de recopilación y límites conocidos",
      },
    ],
    outcome: {
      en: "A documented basis for deciding whether the data can answer the question.",
      es: "Una base documentada para decidir si los datos responden la pregunta.",
    },
    tags: ["data-quality", "analysis", "validation"],
    difficulty: "advanced",
    category: {
      en: "Data & Analysis",
      es: "Datos y análisis",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nDataset sample or schema with definitions: [provide relevant, redacted material]\nAnalysis question and expected population: [provide relevant, redacted material]\nCollection process and known limitations: [provide relevant, redacted material]\n\nWORKFLOW\n1. Identify what one row represents, keys, time coverage, units and relationships; flag ambiguous field meanings.\n2. Inspect missingness, duplicates, invalid values, inconsistent categories and joins that might multiply or drop records.\n3. Separate confirmed defects from suspicious patterns and suggest checks that can distinguish them.\n4. Propose a reversible cleaning plan, preserving raw data and documenting how each change affects the analysis.\n\nDELIVERABLE\nReturn a data-quality register, grain/key definitions, diagnostic queries or formulas, cleaning plan and analysis limitations.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nMuestra o esquema del conjunto con definiciones: [añade material pertinente sin datos privados]\nPregunta de análisis y población esperada: [añade material pertinente sin datos privados]\nProceso de recopilación y límites conocidos: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Identifica qué representa una fila, claves, período, unidades y relaciones; señala campos ambiguos.\n2. Revisa ausencias, duplicados, valores inválidos, categorías inconsistentes y uniones que multipliquen o pierdan registros.\n3. Separa defectos confirmados de patrones sospechosos y propone comprobaciones que permitan distinguirlos.\n4. Propón una limpieza reversible, conservando datos originales y documentando cómo afecta cada cambio al análisis.\n\nENTREGABLE\nEntrega registro de calidad, definiciones de detalle y claves, consultas o fórmulas de diagnóstico, limpieza y límites analíticos.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a data-quality register, grain/key definitions, diagnostic queries or formulas, cleaning plan and analysis limitations.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega registro de calidad, definiciones de detalle y claves, consultas o fórmulas de diagnóstico, limpieza y límites analíticos.",
    },
  },
  {
    categoryKey: "data",
    slug: "metric-definition-contract",
    title: {
      en: "Define a metric people can agree on",
      es: "Define una métrica que todos puedan entender",
    },
    usefulFor: {
      en: "Create a precise metric definition that prevents teams from reporting different numbers under the same label.",
      es: "Crea una definición precisa para evitar que distintos equipos usen el mismo nombre para cifras diferentes.",
    },
    inputs: [
      {
        en: "Business question and intended decision",
        es: "Pregunta operativa y decisión prevista",
      },
      {
        en: "Available fields and source systems",
        es: "Campos disponibles y sistemas de origen",
      },
      {
        en: "Existing metric definitions or disagreements",
        es: "Definiciones actuales o desacuerdos",
      },
    ],
    outcome: {
      en: "A reproducible metric with explicit business meaning.",
      es: "Una métrica reproducible con significado operativo explícito.",
    },
    tags: ["metrics", "analytics", "definitions"],
    difficulty: "advanced",
    category: {
      en: "Data & Analysis",
      es: "Datos y análisis",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nBusiness question and intended decision: [provide relevant, redacted material]\nAvailable fields and source systems: [provide relevant, redacted material]\nExisting metric definitions or disagreements: [provide relevant, redacted material]\n\nWORKFLOW\n1. Clarify the metric’s purpose, entity grain, numerator, denominator and whether it describes a stock, flow or rate.\n2. Define inclusion/exclusion rules, event time, timezone, attribution window, duplicate handling and late-arriving data treatment.\n3. Create small synthetic edge cases and calculate expected values step by step to reveal ambiguity.\n4. Describe source lineage, refresh cadence and limitations; identify decisions the available data cannot support.\n\nDELIVERABLE\nReturn a metric contract, formula or pseudocode, field mapping, worked edge cases and a reconciliation checklist.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nPregunta operativa y decisión prevista: [añade material pertinente sin datos privados]\nCampos disponibles y sistemas de origen: [añade material pertinente sin datos privados]\nDefiniciones actuales o desacuerdos: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Aclara propósito, unidad de análisis, numerador, denominador y si mide existencia, movimiento o proporción.\n2. Define inclusiones, exclusiones, fecha del evento, zona horaria, atribución, duplicados y datos que llegan tarde.\n3. Crea casos ficticios pequeños y calcula valores esperados paso a paso para revelar ambigüedades.\n4. Describe origen, frecuencia de actualización y límites; identifica decisiones que los datos no permiten sostener.\n\nENTREGABLE\nEntrega contrato de métrica, fórmula o pseudocódigo, mapeo de campos, casos límite resueltos y lista de conciliación.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a metric contract, formula or pseudocode, field mapping, worked edge cases and a reconciliation checklist.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega contrato de métrica, fórmula o pseudocódigo, mapeo de campos, casos límite resueltos y lista de conciliación.",
    },
  },
  {
    categoryKey: "data",
    slug: "experiment-readout",
    title: {
      en: "Write an honest experiment readout",
      es: "Redacta resultados de un experimento con rigor",
    },
    usefulFor: {
      en: "Interpret an experiment without confusing correlation, statistical uncertainty or an inconclusive result with a success claim.",
      es: "Interpreta un experimento sin confundir correlación, incertidumbre o resultados inconclusos con éxito.",
    },
    inputs: [
      {
        en: "Hypothesis, method and original decision rule",
        es: "Hipótesis, método y regla de decisión original",
      },
      {
        en: "Observed results, sample and exclusions",
        es: "Resultados observados, muestra y exclusiones",
      },
      {
        en: "Known implementation or measurement issues",
        es: "Problemas conocidos de implementación o medición",
      },
    ],
    outcome: {
      en: "An experiment conclusion proportionate to the evidence.",
      es: "Una conclusión proporcional a la evidencia del experimento.",
    },
    tags: ["experiments", "evaluation", "uncertainty"],
    difficulty: "advanced",
    category: {
      en: "Data & Analysis",
      es: "Datos y análisis",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nHypothesis, method and original decision rule: [provide relevant, redacted material]\nObserved results, sample and exclusions: [provide relevant, redacted material]\nKnown implementation or measurement issues: [provide relevant, redacted material]\n\nWORKFLOW\n1. Restate the original hypothesis, assignment method, primary outcome and intended decision before examining the result.\n2. Summarize observations with denominators, units and relevant uncertainty; do not invent statistical significance or compute unsupported precision.\n3. Assess validity threats, exclusions, subgroup exploration and whether the outcome matches the original decision rule.\n4. Recommend proceed, revise, repeat or stop, explaining what the evidence does and does not justify.\n\nDELIVERABLE\nReturn a concise readout: design, observations, uncertainty, validity issues, decision, unresolved questions and next experiment.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nHipótesis, método y regla de decisión original: [añade material pertinente sin datos privados]\nResultados observados, muestra y exclusiones: [añade material pertinente sin datos privados]\nProblemas conocidos de implementación o medición: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Repite hipótesis original, asignación, resultado principal y decisión prevista antes de interpretar los datos.\n2. Resume observaciones con denominadores, unidades e incertidumbre; no inventes significancia estadística ni precisión no respaldada.\n3. Evalúa amenazas de validez, exclusiones, análisis de subgrupos y cumplimiento de la regla de decisión original.\n4. Recomienda avanzar, ajustar, repetir o detener, explicando qué justifica y qué no justifica la evidencia.\n\nENTREGABLE\nEntrega resumen con diseño, observaciones, incertidumbre, problemas de validez, decisión, preguntas pendientes y próximo experimento.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a concise readout: design, observations, uncertainty, validity issues, decision, unresolved questions and next experiment.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega resumen con diseño, observaciones, incertidumbre, problemas de validez, decisión, preguntas pendientes y próximo experimento.",
    },
  },
  {
    categoryKey: "data",
    slug: "spreadsheet-model-review",
    title: {
      en: "Audit the logic of a spreadsheet model",
      es: "Audita la lógica de una hoja de cálculo",
    },
    usefulFor: {
      en: "Review a spreadsheet’s assumptions, formulas and reconciliation points before relying on its outputs.",
      es: "Revisa supuestos, fórmulas y conciliaciones de una hoja de cálculo antes de confiar en sus resultados.",
    },
    inputs: [
      {
        en: "Workbook structure and formula excerpts",
        es: "Estructura del libro y extractos de fórmulas",
      },
      {
        en: "Purpose, units and approved assumptions",
        es: "Propósito, unidades y supuestos aprobados",
      },
      {
        en: "Expected totals or known sample outcomes",
        es: "Totales esperados o resultados de muestra conocidos",
      },
    ],
    outcome: {
      en: "A spreadsheet review that explains why each correction matters.",
      es: "Una revisión que explica la importancia de cada corrección.",
    },
    tags: ["spreadsheets", "formulas", "quality"],
    difficulty: "advanced",
    category: {
      en: "Data & Analysis",
      es: "Datos y análisis",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nWorkbook structure and formula excerpts: [provide relevant, redacted material]\nPurpose, units and approved assumptions: [provide relevant, redacted material]\nExpected totals or known sample outcomes: [provide relevant, redacted material]\n\nWORKFLOW\n1. Map inputs, calculations and outputs, distinguishing editable assumptions from derived values and manual overrides.\n2. Inspect formula consistency, ranges, references, date logic, units, rounding and error propagation using supplied evidence.\n3. Create small synthetic boundary cases for blanks, zero, negative values and period changes where relevant.\n4. Propose targeted corrections and reconciliation checks, preserving the original workbook and labeling unverified cells.\n\nDELIVERABLE\nReturn a model map, issue register with cell references when supplied, diagnostic cases, proposed formulas and verification checklist.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nEstructura del libro y extractos de fórmulas: [añade material pertinente sin datos privados]\nPropósito, unidades y supuestos aprobados: [añade material pertinente sin datos privados]\nTotales esperados o resultados de muestra conocidos: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Mapea entradas, cálculos y salidas, separando supuestos editables, valores calculados y ajustes manuales.\n2. Revisa coherencia de fórmulas, rangos, referencias, fechas, unidades, redondeo y propagación de errores.\n3. Crea casos ficticios pequeños para vacíos, cero, valores negativos y cambios de período cuando corresponda.\n4. Propón correcciones puntuales y conciliaciones, conservando el libro original y marcando celdas no verificadas.\n\nENTREGABLE\nEntrega mapa del modelo, incidencias con referencias disponibles, casos de diagnóstico, fórmulas propuestas y lista de verificación.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a model map, issue register with cell references when supplied, diagnostic cases, proposed formulas and verification checklist.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega mapa del modelo, incidencias con referencias disponibles, casos de diagnóstico, fórmulas propuestas y lista de verificación.",
    },
  },
  {
    categoryKey: "learning",
    slug: "hands-on-workshop-design",
    title: {
      en: "Design a workshop around a real task",
      es: "Diseña un taller alrededor de una tarea real",
    },
    usefulFor: {
      en: "Build a hands-on learning experience with a useful task, clear scope and evidence of learner progress.",
      es: "Construye una experiencia práctica con una tarea útil, alcance claro y evidencia del progreso de participantes.",
    },
    inputs: [
      {
        en: "Learner starting point and task they care about",
        es: "Punto de partida y tarea importante para participantes",
      },
      {
        en: "Available format, time and tools",
        es: "Formato, tiempo y herramientas disponibles",
      },
      {
        en: "Learning goal and known constraints",
        es: "Objetivo de aprendizaje y restricciones conocidas",
      },
    ],
    outcome: {
      en: "A workshop where participation produces something useful to review.",
      es: "Un taller donde la práctica produce algo útil que revisar.",
    },
    tags: ["workshops", "learning-design", "facilitation"],
    difficulty: "advanced",
    category: {
      en: "Learning & Workshops",
      es: "Aprendizaje y talleres",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nLearner starting point and task they care about: [provide relevant, redacted material]\nAvailable format, time and tools: [provide relevant, redacted material]\nLearning goal and known constraints: [provide relevant, redacted material]\n\nWORKFLOW\n1. Define what learners should be able to do afterward and the smallest artifact that could demonstrate it.\n2. Break the task into a short demonstration, guided practice and independent variation, using sample data.\n3. Anticipate common misconceptions, access problems and different starting levels; provide a non-blocking fallback.\n4. Design check questions and feedback criteria, then adjust scope to the supplied time without promising mastery.\n\nDELIVERABLE\nReturn learning outcomes, session sequence, materials, facilitator notes, fallback path and an artifact-based feedback rubric.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nPunto de partida y tarea importante para participantes: [añade material pertinente sin datos privados]\nFormato, tiempo y herramientas disponibles: [añade material pertinente sin datos privados]\nObjetivo de aprendizaje y restricciones conocidas: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Define qué podrán hacer después y el artefacto mínimo que demostraría ese aprendizaje.\n2. Divide la tarea en demostración breve, práctica guiada y variación independiente con datos de muestra.\n3. Anticipa errores de comprensión, problemas de acceso y niveles distintos; prepara una alternativa que permita continuar.\n4. Diseña preguntas y criterios de retroalimentación; ajusta alcance al tiempo disponible sin prometer dominio completo.\n\nENTREGABLE\nEntrega objetivos, secuencia, materiales, notas de facilitación, alternativa y rúbrica basada en el trabajo realizado.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return learning outcomes, session sequence, materials, facilitator notes, fallback path and an artifact-based feedback rubric.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega objetivos, secuencia, materiales, notas de facilitación, alternativa y rúbrica basada en el trabajo realizado.",
    },
  },
  {
    categoryKey: "learning",
    slug: "practice-lab-with-rubric",
    title: {
      en: "Create a practice lab with a rubric",
      es: "Crea una práctica con una rúbrica útil",
    },
    usefulFor: {
      en: "Build a practice exercise that tests a real skill and gives actionable feedback beyond a correct-answer checklist.",
      es: "Crea un ejercicio que evalúe una habilidad real y dé comentarios útiles más allá de marcar respuestas correctas.",
    },
    inputs: [
      {
        en: "Skill, learner level and prerequisites",
        es: "Habilidad, nivel y requisitos previos",
      },
      {
        en: "Realistic task and permitted resources",
        es: "Tarea realista y recursos permitidos",
      },
      {
        en: "Time boundary and desired evidence",
        es: "Límite de tiempo y evidencia buscada",
      },
    ],
    outcome: {
      en: "A skill exercise with feedback learners can act on.",
      es: "Un ejercicio con comentarios que permiten mejorar la habilidad.",
    },
    tags: ["practice", "rubrics", "learning"],
    difficulty: "advanced",
    category: {
      en: "Learning & Workshops",
      es: "Aprendizaje y talleres",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nSkill, learner level and prerequisites: [provide relevant, redacted material]\nRealistic task and permitted resources: [provide relevant, redacted material]\nTime boundary and desired evidence: [provide relevant, redacted material]\n\nWORKFLOW\n1. Define the skill in observable terms and choose a task that requires the learner to demonstrate it.\n2. Write a synthetic scenario, input materials, constraints and deliverable without revealing a complete solution upfront.\n3. Create a rubric distinguishing incomplete, workable and strong performance through concrete evidence, not vague adjectives.\n4. Add graduated hints, reflection questions and an instructor key that explains tradeoffs and acceptable alternatives.\n\nDELIVERABLE\nReturn learner brief, sample inputs, rubric, hint ladder and a separate instructor guide with verification steps.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nHabilidad, nivel y requisitos previos: [añade material pertinente sin datos privados]\nTarea realista y recursos permitidos: [añade material pertinente sin datos privados]\nLímite de tiempo y evidencia buscada: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Define la habilidad mediante acciones observables y elige una tarea que permita demostrarla.\n2. Escribe escenario ficticio, materiales, restricciones y entregable sin revelar toda la solución al inicio.\n3. Crea una rúbrica que distinga desempeño incompleto, funcional y sólido con evidencia concreta y no adjetivos vagos.\n4. Añade pistas progresivas, reflexión y una guía docente que explique decisiones y alternativas aceptables.\n\nENTREGABLE\nEntrega instrucciones, entradas de muestra, rúbrica, pistas progresivas y guía docente separada con pasos de verificación.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return learner brief, sample inputs, rubric, hint ladder and a separate instructor guide with verification steps.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega instrucciones, entradas de muestra, rúbrica, pistas progresivas y guía docente separada con pasos de verificación.",
    },
  },
  {
    categoryKey: "learning",
    slug: "concept-to-teachable-demo",
    title: {
      en: "Turn a concept into a teachable demo",
      es: "Convierte un concepto en una demo didáctica",
    },
    usefulFor: {
      en: "Explain an unfamiliar technical concept through a small demonstration whose limits and failure modes stay visible.",
      es: "Explica un concepto técnico mediante una demostración pequeña con límites y fallos posibles visibles.",
    },
    inputs: [
      {
        en: "Concept and audience’s existing knowledge",
        es: "Concepto y conocimientos de la audiencia",
      },
      {
        en: "Tools or materials actually available",
        es: "Herramientas o materiales disponibles",
      },
      {
        en: "What the demonstration should clarify",
        es: "Qué debe aclarar la demostración",
      },
    ],
    outcome: {
      en: "A demonstration that teaches a mechanism rather than a magic trick.",
      es: "Una demostración que enseña el mecanismo y no un truco mágico.",
    },
    tags: ["demonstrations", "teaching", "technical-explanation"],
    difficulty: "intermediate",
    category: {
      en: "Learning & Workshops",
      es: "Aprendizaje y talleres",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nConcept and audience’s existing knowledge: [provide relevant, redacted material]\nTools or materials actually available: [provide relevant, redacted material]\nWhat the demonstration should clarify: [provide relevant, redacted material]\n\nWORKFLOW\n1. State the confusing idea in plain language and identify the specific mental model the audience needs.\n2. Design the smallest concrete example that reveals the mechanism, using synthetic inputs and observable intermediate steps.\n3. Write a facilitation script with prediction questions, pauses and one deliberate failure or counterexample.\n4. Explain where the analogy or demo stops being accurate and give a transfer task to check understanding.\n\nDELIVERABLE\nReturn the plain-language model, demo setup, step-by-step script, counterexample, limitations and one transfer exercise.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nConcepto y conocimientos de la audiencia: [añade material pertinente sin datos privados]\nHerramientas o materiales disponibles: [añade material pertinente sin datos privados]\nQué debe aclarar la demostración: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Explica la dificultad con palabras sencillas e identifica el modelo mental que necesita la audiencia.\n2. Diseña el ejemplo mínimo que revele el mecanismo con entradas ficticias y pasos intermedios observables.\n3. Redacta un guion con preguntas de predicción, pausas y un fallo deliberado o contraejemplo.\n4. Explica dónde deja de ser precisa la analogía o demo y añade una tarea distinta para comprobar comprensión.\n\nENTREGABLE\nEntrega modelo sencillo, preparación, guion paso a paso, contraejemplo, límites y un ejercicio de transferencia.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return the plain-language model, demo setup, step-by-step script, counterexample, limitations and one transfer exercise.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega modelo sencillo, preparación, guion paso a paso, contraejemplo, límites y un ejercicio de transferencia.",
    },
  },
  {
    categoryKey: "learning",
    slug: "personal-learning-feedback-loop",
    title: {
      en: "Build a learning loop from your own work",
      es: "Crea un ciclo de aprendizaje con tu trabajo",
    },
    usefulFor: {
      en: "Turn a real work sample and feedback into a focused practice plan with evidence of improvement.",
      es: "Convierte trabajo real y retroalimentación en una práctica enfocada con evidencia de mejora.",
    },
    inputs: [
      {
        en: "Target skill and current work sample",
        es: "Habilidad objetivo y muestra de trabajo actual",
      },
      {
        en: "Feedback or difficulties encountered",
        es: "Comentarios o dificultades encontradas",
      },
      {
        en: "Available practice time and resources",
        es: "Tiempo de práctica y recursos disponibles",
      },
    ],
    outcome: {
      en: "A small practice loop linked to observable work, not a generic course list.",
      es: "Un ciclo pequeño vinculado a trabajo observable y no a una lista genérica de cursos.",
    },
    tags: ["learning", "feedback", "deliberate-practice"],
    difficulty: "intermediate",
    category: {
      en: "Learning & Workshops",
      es: "Aprendizaje y talleres",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nTarget skill and current work sample: [provide relevant, redacted material]\nFeedback or difficulties encountered: [provide relevant, redacted material]\nAvailable practice time and resources: [provide relevant, redacted material]\n\nWORKFLOW\n1. Assess the sample against the target skill, citing observable strengths and gaps rather than judging the person.\n2. Select one high-leverage gap and design a short exercise that isolates it from unrelated difficulty.\n3. Define a baseline, feedback method and next attempt so progress can be compared using the same criteria.\n4. Create a review loop that adjusts difficulty only when the work shows readiness, with a reflection question.\n\nDELIVERABLE\nReturn a focused diagnosis, one practice task, comparison rubric, feedback questions and a realistic next-attempt plan.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nHabilidad objetivo y muestra de trabajo actual: [añade material pertinente sin datos privados]\nComentarios o dificultades encontradas: [añade material pertinente sin datos privados]\nTiempo de práctica y recursos disponibles: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Evalúa la muestra según la habilidad, citando fortalezas y carencias observables sin juzgar a la persona.\n2. Selecciona una carencia importante y diseña una práctica breve que la aísle de dificultades ajenas.\n3. Define punto de partida, método de retroalimentación y siguiente intento para comparar con los mismos criterios.\n4. Crea un ciclo que ajuste la dificultad solo cuando el trabajo lo justifique e incluya una pregunta de reflexión.\n\nENTREGABLE\nEntrega diagnóstico enfocado, una tarea de práctica, rúbrica comparativa, preguntas de feedback y plan del próximo intento.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a focused diagnosis, one practice task, comparison rubric, feedback questions and a realistic next-attempt plan.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega diagnóstico enfocado, una tarea de práctica, rúbrica comparativa, preguntas de feedback y plan del próximo intento.",
    },
  },
  {
    categoryKey: "careers",
    slug: "portfolio-case-study",
    title: {
      en: "Turn a project into a credible case study",
      es: "Convierte un proyecto en un caso creíble",
    },
    usefulFor: {
      en: "Explain a real project’s decisions and contribution without inventing outcomes, ownership or client results.",
      es: "Explica decisiones y aportes de un proyecto real sin inventar resultados, autoría ni logros de clientes.",
    },
    inputs: [
      {
        en: "Project evidence and current status",
        es: "Evidencia del proyecto y estado actual",
      },
      {
        en: "Your actual contribution and constraints",
        es: "Tu aporte real y restricciones",
      },
      {
        en: "Audience and available outcome evidence",
        es: "Audiencia y evidencia disponible de resultados",
      },
    ],
    outcome: {
      en: "A project story that demonstrates your actual work and judgment.",
      es: "Una historia que demuestra tu trabajo y criterio reales.",
    },
    tags: ["portfolio", "case-study", "career"],
    difficulty: "intermediate",
    category: {
      en: "Careers & Portfolio",
      es: "Carreras y portafolio",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nProject evidence and current status: [provide relevant, redacted material]\nYour actual contribution and constraints: [provide relevant, redacted material]\nAudience and available outcome evidence: [provide relevant, redacted material]\n\nWORKFLOW\n1. Identify the original problem, users, constraints and what you personally contributed versus work done by others.\n2. Select decisions that reveal judgment, explaining alternatives, tradeoffs and the evidence that shaped your approach.\n3. Describe the artifact and validation honestly; distinguish a prototype, local test, deployment and measured user outcome.\n4. Draft a concise narrative with useful screenshots or code references and a reflection on what you would change.\n\nDELIVERABLE\nReturn a case-study outline, polished draft, evidence map, missing-proof list and a short portfolio summary.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nEvidencia del proyecto y estado actual: [añade material pertinente sin datos privados]\nTu aporte real y restricciones: [añade material pertinente sin datos privados]\nAudiencia y evidencia disponible de resultados: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Identifica problema, usuarios, restricciones y tu contribución frente al trabajo de otras personas.\n2. Elige decisiones que muestren criterio, explicando alternativas, compensaciones y evidencia que influyó en tu enfoque.\n3. Describe artefacto y validación con precisión; distingue prototipo, prueba local, despliegue y resultado medido en usuarios.\n4. Redacta una historia breve con capturas o referencias útiles y una reflexión sobre qué cambiarías.\n\nENTREGABLE\nEntrega estructura del caso, borrador pulido, mapa de evidencia, pruebas faltantes y resumen breve para portafolio.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a case-study outline, polished draft, evidence map, missing-proof list and a short portfolio summary.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega estructura del caso, borrador pulido, mapa de evidencia, pruebas faltantes y resumen breve para portafolio.",
    },
  },
  {
    categoryKey: "careers",
    slug: "role-skill-gap-map",
    title: {
      en: "Map your skills to a real role",
      es: "Compara tus habilidades con un rol real",
    },
    usefulFor: {
      en: "Use an actual role description and work evidence to plan skill development without unsupported hiring predictions.",
      es: "Usa una descripción real de un rol y evidencia de trabajo para planificar habilidades sin predecir contrataciones.",
    },
    inputs: [
      {
        en: "Role description and date of source",
        es: "Descripción del rol y fecha de la fuente",
      },
      {
        en: "Your work samples and experience",
        es: "Muestras de trabajo y experiencia",
      },
      {
        en: "Learning constraints and preferred direction",
        es: "Restricciones de aprendizaje y dirección preferida",
      },
    ],
    outcome: {
      en: "A skill plan based on a sourced role and your evidence.",
      es: "Un plan basado en un rol documentado y tu evidencia.",
    },
    tags: ["skills", "career-planning", "evidence"],
    difficulty: "advanced",
    category: {
      en: "Careers & Portfolio",
      es: "Carreras y portafolio",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nRole description and date of source: [provide relevant, redacted material]\nYour work samples and experience: [provide relevant, redacted material]\nLearning constraints and preferred direction: [provide relevant, redacted material]\n\nWORKFLOW\n1. Translate the role description into observable responsibilities and distinguish required skills from preferences or ambiguous wording.\n2. Map each responsibility to evidence from your work; mark adjacent experience and missing evidence without exaggeration.\n3. Prioritize skill gaps by relevance to the role and design a small project that could demonstrate one gap.\n4. Suggest a focused learning sequence and questions to ask a practitioner, without promising a job or salary.\n\nDELIVERABLE\nReturn a responsibility-to-evidence matrix, prioritized gaps, one demonstration project and a bounded learning plan.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nDescripción del rol y fecha de la fuente: [añade material pertinente sin datos privados]\nMuestras de trabajo y experiencia: [añade material pertinente sin datos privados]\nRestricciones de aprendizaje y dirección preferida: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Convierte la descripción en responsabilidades observables y distingue requisitos de preferencias o redacción ambigua.\n2. Relaciona cada responsabilidad con tu trabajo; identifica experiencia cercana y evidencia faltante sin exagerar.\n3. Prioriza carencias por relevancia para el rol y diseña un proyecto pequeño que demuestre una de ellas.\n4. Propón una secuencia de aprendizaje y preguntas para un profesional, sin prometer empleo ni salario.\n\nENTREGABLE\nEntrega matriz de responsabilidades y evidencia, carencias priorizadas, un proyecto demostrable y plan de aprendizaje acotado.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a responsibility-to-evidence matrix, prioritized gaps, one demonstration project and a bounded learning plan.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega matriz de responsabilidades y evidencia, carencias priorizadas, un proyecto demostrable y plan de aprendizaje acotado.",
    },
  },
  {
    categoryKey: "careers",
    slug: "technical-interview-practice",
    title: {
      en: "Practice explaining technical decisions",
      es: "Practica cómo explicar decisiones técnicas",
    },
    usefulFor: {
      en: "Rehearse a technical conversation that tests reasoning and communication instead of memorizing polished answers.",
      es: "Practica una conversación técnica que evalúe razonamiento y comunicación en lugar de memorizar respuestas.",
    },
    inputs: [
      {
        en: "Role focus and topics to practice",
        es: "Enfoque del rol y temas de práctica",
      },
      {
        en: "A real project or synthetic scenario",
        es: "Proyecto real o escenario ficticio",
      },
      {
        en: "Your answer and desired feedback style",
        es: "Tu respuesta y estilo de comentarios deseado",
      },
    ],
    outcome: {
      en: "Practice that strengthens reasoning and clear explanation.",
      es: "Una práctica que mejora razonamiento y explicación clara.",
    },
    tags: ["interviews", "technical-communication", "practice"],
    difficulty: "intermediate",
    category: {
      en: "Careers & Portfolio",
      es: "Carreras y portafolio",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nRole focus and topics to practice: [provide relevant, redacted material]\nA real project or synthetic scenario: [provide relevant, redacted material]\nYour answer and desired feedback style: [provide relevant, redacted material]\n\nWORKFLOW\n1. Choose one scenario relevant to the role and ask a focused question without giving the model answer first.\n2. After my answer, probe assumptions, tradeoffs, failure modes and how I would verify the proposed approach.\n3. Evaluate the reasoning using evidence from my words, separating technical gaps from unclear explanation.\n4. Offer targeted feedback, an improved answer outline and a follow-up question that tests transfer to a different constraint.\n\nDELIVERABLE\nRun one question at a time. Finish each round with strengths, improvement points, reasoning rubric and the next practice focus.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nEnfoque del rol y temas de práctica: [añade material pertinente sin datos privados]\nProyecto real o escenario ficticio: [añade material pertinente sin datos privados]\nTu respuesta y estilo de comentarios deseado: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Elige un escenario pertinente y plantea una pregunta concreta sin mostrar primero una respuesta modelo.\n2. Después de mi respuesta, pregunta por supuestos, decisiones, fallos y cómo verificaría el enfoque.\n3. Evalúa el razonamiento con evidencia de mis palabras, separando carencias técnicas de problemas de explicación.\n4. Da comentarios concretos, un esquema de respuesta mejorada y una pregunta que añada una restricción distinta.\n\nENTREGABLE\nHaz una pregunta a la vez. Cierra cada ronda con fortalezas, mejoras, rúbrica de razonamiento y siguiente foco de práctica.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Run one question at a time. Finish each round with strengths, improvement points, reasoning rubric and the next practice focus.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Haz una pregunta a la vez. Cierra cada ronda con fortalezas, mejoras, rúbrica de razonamiento y siguiente foco de práctica.",
    },
  },
  {
    categoryKey: "careers",
    slug: "contribution-project-brief",
    title: {
      en: "Scope a project you can contribute",
      es: "Define un proyecto con el que puedas aportar",
    },
    usefulFor: {
      en: "Shape a manageable contribution around a real community need, available skills and a reviewable artifact.",
      es: "Define una colaboración manejable según una necesidad real, habilidades disponibles y un resultado revisable.",
    },
    inputs: [
      {
        en: "Community need and intended beneficiary",
        es: "Necesidad de la comunidad y beneficiario previsto",
      },
      {
        en: "Your skills, time and available resources",
        es: "Tus habilidades, tiempo y recursos disponibles",
      },
      {
        en: "Existing materials and permission boundaries",
        es: "Materiales actuales y límites de permiso",
      },
    ],
    outcome: {
      en: "A realistic contribution that can be finished, reviewed and maintained.",
      es: "Una colaboración realista que se puede terminar, revisar y mantener.",
    },
    tags: ["community", "projects", "contribution"],
    difficulty: "intermediate",
    category: {
      en: "Careers & Portfolio",
      es: "Carreras y portafolio",
    },
    source: "WGN original editorial template · 2026-10-20",
    reviewStatus: {
      en: "Editorial template; not benchmarked against an AI model",
      es: "Plantilla editorial; no evaluada con un modelo de IA",
    },
    reviewedAt: "2026-10-20",
    prompt: {
      en: "Use the supplied material to prepare a useful draft for [audience]. Work from the inputs below. Flag missing facts that would change the recommendation before making an assumption.\n\nCONTEXT AND INPUTS\nCommunity need and intended beneficiary: [provide relevant, redacted material]\nYour skills, time and available resources: [provide relevant, redacted material]\nExisting materials and permission boundaries: [provide relevant, redacted material]\n\nWORKFLOW\n1. Clarify the need and who can validate it; distinguish a useful contribution from an impressive but unnecessary feature.\n2. Define the smallest deliverable, acceptance evidence and exclusions that fit the actual time and resources.\n3. Plan the work in reviewable steps, including source access, feedback and a handoff someone else can understand.\n4. Identify what needs an owner’s permission, what can be done independently and how to document limitations.\n\nDELIVERABLE\nReturn a contribution brief, task sequence, acceptance checklist, permission questions and a concise handoff template.\n\nQUALITY CHECK\nSeparate evidence, inference and open questions. Do not invent results, approval, dates or access. End with the smallest useful human review.",
      es: "Usa el material proporcionado para preparar un borrador útil para [audiencia]. Trabaja con las entradas de abajo. Señala los datos ausentes que cambiarían la recomendación antes de suponerlos.\n\nCONTEXTO Y ENTRADAS\nNecesidad de la comunidad y beneficiario previsto: [añade material pertinente sin datos privados]\nTus habilidades, tiempo y recursos disponibles: [añade material pertinente sin datos privados]\nMateriales actuales y límites de permiso: [añade material pertinente sin datos privados]\n\nMÉTODO\n1. Aclara la necesidad y quién puede validarla; distingue un aporte útil de una función llamativa pero innecesaria.\n2. Define entregable mínimo, evidencia de aceptación y exclusiones que encajen con tiempo y recursos reales.\n3. Organiza pasos revisables con acceso a fuentes, comentarios y una entrega que otra persona pueda comprender.\n4. Identifica qué necesita permiso del responsable, qué puedes hacer de forma independiente y cómo documentar límites.\n\nENTREGABLE\nEntrega brief de colaboración, secuencia, criterios de aceptación, preguntas de permisos y plantilla breve de traspaso.\n\nREVISIÓN\nSepara evidencia, inferencias y dudas. No inventes resultados, aprobaciones, fechas ni accesos. Termina con la revisión humana mínima que sea útil.",
    },
    example: {
      en: "Output shape (illustrative, not a model result): Return a contribution brief, task sequence, acceptance checklist, permission questions and a concise handoff template.",
      es: "Forma de salida (ilustrativa, no es un resultado probado): Entrega brief de colaboración, secuencia, criterios de aceptación, preguntas de permisos y plantilla breve de traspaso.",
    },
  },
];
