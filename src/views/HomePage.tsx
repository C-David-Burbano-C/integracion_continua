import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSun, FaMap, FaGlobeAmericas, FaRobot, FaCompass, FaSatelliteDish } from 'react-icons/fa';
import { useScore } from '../context/ScoreContext';

const moduleCards = [
  {
    title: 'Sistema Solar',
    description: 'Recorre los planetas como una nave juguetona, descubre anillos brillantes y gana chispitas de conocimiento.',
    Icon: FaSun,
    accent: 'from-amber-400 to-orange-500',
    route: '/sistema-solar',
    highlights: ['8 planetas en 3D', 'Narrador espacial travieso', 'Misiones con cuenta regresiva']
  },
  {
    title: 'Mapa de Colombia',
    description: 'Vuela sobre montañas, selvas y costas con un dron imaginario y colecciona sabores, ritmos y animales mágicos.',
    Icon: FaMap,
    accent: 'from-emerald-400 to-teal-500',
    route: '/mapa-colombia',
    highlights: ['Regiones interactivas', 'Recetas y ritmos', 'Puntos por descubrimiento']
  },
  {
    title: 'Globo Terráqueo',
    description: 'Observa el planeta completo como si fuera una canica gigante y escucha secretos de océanos, glaciares y ciudades.',
    Icon: FaGlobeAmericas,
    accent: 'from-sky-400 to-blue-500',
    route: '/globo-terraqueo',
    highlights: ['Focos de exploración', 'Trucos de cámara ninja', 'Curiosidades globales']
  },
  {
    title: 'Simulación de Robots',
    description: 'Controla robots bailarines, brazos gigantes, drones curiosos y humanoides que saludan con luces.',
    Icon: FaRobot,
    accent: 'from-violet-500 to-fuchsia-500',
    route: '/simulacion-robots',
    highlights: ['4 modelos interactivos', 'Panel táctil brillante', 'Animaciones en vivo']
  }
];

const expeditionSteps = [
  { title: 'Planifica', description: 'Elige el módulo, ponle nombre a tu misión y revisa los tips del narrador.' },
  { title: 'Explora', description: 'Interactúa con mapas, modelos 3D o robots mientras tomas notas súper secretas.' },
  { title: 'Registra', description: 'Gana puntos, desbloquea insignias brillantes y presume tus hallazgos.' }
];

const missionBadges = [
  { title: 'Capitana Curiosidad', description: 'Escucha tres relatos sin pausar y gana luz estelar extra.', gradient: 'from-pink-500 to-rose-500', emoji: '🌟' },
  { title: 'Guardiana del Planeta', description: 'Visita el Globo y el Mapa de Colombia el mismo día.', gradient: 'from-emerald-500 to-teal-500', emoji: '🌍' },
  { title: 'Piloto Galáctico', description: 'Haz zoom al Sistema Solar y cuenta cuántos anillos ves.', gradient: 'from-sky-500 to-indigo-500', emoji: '🚀' }
];

const kidTips = [
  { title: 'Haz zoom con suavidad', description: 'Usa dos dedos o la rueda del mouse lentamente para no marear a los astronautas virtuales.' },
  { title: 'Toma aire entre narraciones', description: 'Cada curiosidad suma puntos; respira hondo y disfruta la voz IA.' },
  { title: 'Inventores de historias', description: 'Después de escuchar, inventa tu propio final y compártelo con tu profe o familia.' },
  { title: 'Modo cooperativo', description: 'Exploren en parejas: una persona conduce y la otra anota descubrimientos.' }
];

export default function HomeContent() {
  const { totalScore, visitedModules } = useScore();
  const dynamicHighlights = [
    { label: 'Puntos acumulados', value: totalScore.toString(), detail: 'Cada estrella cuenta.' },
    { label: 'Módulos explorados', value: `${visitedModules.size}/4`, detail: 'Completa el set y recibe aplausos.' },
    { label: 'Desafíos activos', value: '4', detail: 'Espacio, planeta, Colombia y robots.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-14">
      <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-10 shadow-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.25),_transparent_50%)]" aria-hidden />
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative grid gap-10 lg:grid-cols-[1.1fr,0.9fr]"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.45em] text-slate-500">CENTRO DE COMANDO MINI</p>
              <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">Exploradores del Conocimiento</h1>
              <p className="mt-4 text-lg text-slate-300">
                Viaja del espacio a la biodiversidad colombiana y aterriza en un hangar de robots sin salir del navegador.
                Todo con luces de neón, stickers flotantes y un narrador IA que habla como tu profe favorito.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {dynamicHighlights.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                    <p className="text-sm font-semibold text-slate-200">{stat.label}</p>
                    <p className="text-xs text-slate-400">{stat.detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-3xl border border-cyan-500/40 bg-cyan-500/10 p-4 text-sm text-cyan-100">
                <p className="font-semibold text-white">Consejo de la tripulación:</p>
                <p>Antes de despegar, elige una música suave o ponte audífonos para sentirte dentro de la misión.</p>
              </div>
            </div>

            <div className="relative rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/30 via-sky-500/30 to-transparent blur-3xl" aria-hidden />
              <p className="text-xs uppercase tracking-[0.45em] text-slate-400">TRIPULACIÓN MINI EXPLORADORA</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Tablero de insignias</h3>
              <p className="mt-3 text-sm text-slate-200">
                Completa estas misiones para decorar tu perfil con cintas luminosas y sumar bonus secretos.
              </p>
              <div className="mt-5 space-y-3 text-sm">
                {missionBadges.map((badge) => (
                  <div
                    key={badge.title}
                    className={`flex items-start gap-3 rounded-2xl border border-white/10 bg-gradient-to-r ${badge.gradient} p-3 text-white`}
                  >
                    <div className="text-2xl">{badge.emoji}</div>
                    <div>
                      <p className="font-semibold">{badge.title}</p>
                      <p className="text-xs text-white/80">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                <FaCompass className="text-emerald-300" />
                Tu próxima misión está a un clic. Elige un módulo y presiona “Explorar”.
              </div>
            </div>
          </motion.div>
        </section>

        <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-950/70 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-slate-500">MÓDULOS DISPONIBLES</p>
              <h2 className="text-2xl font-semibold text-white">Escoge tu siguiente destino</h2>
            </div>
            <span className="text-sm text-slate-400">Todos comparten narrador IA y suman puntos.</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {moduleCards.map(({ title, description, Icon, accent, route, highlights }) => (
              <motion.div
                key={title}
                whileHover={{ y: -4 }}
                className="h-full rounded-3xl border border-white/10 bg-slate-900/70 p-6 transition"
              >
                <Link to={route} className="flex h-full flex-col">
                  <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${accent} px-4 py-2 text-sm font-semibold text-white`}>
                    <Icon size={20} />
                    {title}
                  </div>
                  <p className="mt-4 text-base text-slate-300">{description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-400">
                    {highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-cyan-400">▹</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 inline-flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
                    Ingresar al módulo
                    <span className="text-cyan-300">↗</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-slate-500">BITÁCORA</p>
              <h3 className="text-2xl font-semibold text-white">Ruta recomendada</h3>
              <p className="mt-3 text-sm text-slate-300">
                Sigue estos pasos para aprovechar al máximo cada módulo. El sistema detecta tus avances y actualiza tu puntuación.
              </p>
              <div className="mt-6 space-y-4">
                {expeditionSteps.map((step, index) => (
                  <div key={step.title} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-3xl font-black text-cyan-300">{index + 1}</div>
                    <div>
                      <p className="text-lg font-semibold text-white">{step.title}</p>
                      <p className="text-sm text-slate-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3 text-slate-300">
                <FaSatelliteDish className="text-cyan-300" />
                <p className="text-xs uppercase tracking-[0.45em] text-slate-400">TELEMETRÍA EN VIVO</p>
              </div>
              <div className="mt-4 space-y-4 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.45em] text-emerald-300">Progreso</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {visitedModules.size} de 4 módulos explorados
                  </p>
                  <p className="text-xs text-slate-400">Vuelve a cada módulo para desbloquear todas las curiosidades.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.45em] text-amber-300">Recompensa</p>
                  <p className="mt-1 text-lg font-semibold text-white">{totalScore} puntos acumulados</p>
                  <p className="text-xs text-slate-400">Cada narración completada suma automáticamente.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.45em] text-sky-300">Siguiente paso</p>
                  <p className="mt-1 text-lg font-semibold text-white">Activa un módulo y escucha las historias</p>
                  <p className="text-xs text-slate-400">La voz IA te indicará qué puntos ganaste.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-slate-500">CONSEJOS JUGUETONES</p>
              <h3 className="text-2xl font-semibold text-white">Tips para exploradores jóvenes</h3>
            </div>
            <div className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-cyan-200">
              MODO DIVER
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {kidTips.map((tip) => (
              <div key={tip.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-sm font-semibold text-white">{tip.title}</p>
                <p className="text-xs text-slate-300">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
