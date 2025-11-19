import { useCallback } from 'react';
import { FaRobot, FaCogs, FaSatelliteDish, FaBolt } from 'react-icons/fa';
import RobotSimulator from '../components/RobotSimulator';

const robotProfiles = [
  {
    title: 'Explorador XR-4',
    description: 'Recorre terrenos rocosos y analiza muestras con sensores múltiples.',
    emoji: '🛰️',
    stats: ['6 ruedas independientes', 'Panel solar posterior']
  },
  {
    title: 'Brazo Atlas',
    description: 'Opera piezas de precisión, soldadura ligera y tareas repetitivas.',
    emoji: '🦾',
    stats: ['4 articulaciones', 'Capacidad 200 kg']
  },
  {
    title: 'Humanoide Ada',
    description: 'Demostraciones educativas, interacción con voz y gestos naturales.',
    emoji: '🤖',
    stats: ['36 grados de libertad', 'Sensores hápticos']
  },
  {
    title: 'Dron Nimbus',
    description: 'Explora desde el aire, crea mapas y detecta obstáculos.',
    emoji: '🚁',
    stats: ['Vuelo autónomo', 'Cámara 4K gimbal']
  }
];

const controlTips = [
  { title: 'Panel táctil', detail: 'Cambia entre modelos y activa animaciones desde la barra lateral.' },
  { title: 'Luces y materiales', detail: 'Ajusta colores o texturas para destacar cada robot durante una presentación.' },
  { title: 'Modo foto', detail: 'Usa la cámara libre para obtener tomas cenitales y capturas con profundidad.' },
  { title: 'Acciones combinadas', detail: 'Prueba secuencias de movimientos para simular misiones completas.' }
];

export default function SimulacionRobots() {
  const scrollToPoints = useCallback(() => {
    const target = document.getElementById('puntos-robots');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-10 shadow-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.3),_transparent_50%)]" aria-hidden />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <p className="text-xs font-semibold tracking-[0.45em] text-slate-500">HANGAR VIRTUAL</p>
              <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">Simulación de Robots</h1>
              <p className="mt-4 text-lg text-slate-300">
                Cambia entre robots exploradores, brazos industriales, humanoides y drones. Todos comparten un hangar
                oscuro iluminado con neón para resaltar cada movimiento.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Modelos disponibles', value: '4', detail: 'Explorador, brazo, humanoide y dron.' },
                  { label: 'Controles', value: 'Tiempo real', detail: 'Rotación, desplazamiento y cámara libre.' },
                  { label: 'Experiencia', value: 'Interacción 3D', detail: 'Compatible con mouse y pantallas táctiles.' }
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                    <p className="text-sm font-semibold text-slate-200">{stat.label}</p>
                    <p className="text-xs text-slate-400">{stat.detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-sm text-slate-400">¿Quieres saltar directo a la zona donde se ganan puntos?</span>
                <button
                  onClick={scrollToPoints}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
                >
                  Ir a puntos
                </button>
              </div>
            </div>
            <div className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3 text-slate-300">
                <FaRobot className="text-violet-300" />
                <p className="text-xs uppercase tracking-[0.45em] text-slate-400">MODO DEMO</p>
              </div>
              <h3 className="mt-2 text-2xl font-semibold text-white">Cómo presentar este módulo</h3>
              <p className="mt-3 text-sm text-slate-200">
                Utiliza el narrador integrado para contar historias sobre cada robot y combina los movimientos con los
                botones de animación del simulador.
              </p>
              <div className="mt-5 space-y-3 text-sm text-slate-200">
                <div className="flex items-start gap-3 rounded-2xl border border-violet-500/30 bg-violet-500/10 p-4">
                  <FaCogs className="mt-1 text-violet-300" />
                  <p>Activa los modos de ingeniería para mostrar piezas internas y sensores.</p>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4">
                  <FaSatelliteDish className="mt-1 text-cyan-300" />
                  <p>Combina la simulación con el mapa o el globo para explicar misiones reales.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
            <div className="relative rounded-3xl border border-slate-800 bg-black/50 p-4 shadow-inner">
              <RobotSimulator />
              <div className="pointer-events-none absolute left-6 top-6 flex items-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-200">
                <FaBolt size={12} />
                En ejecución
              </div>
              <div className="pointer-events-auto absolute bottom-6 left-6 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-100 backdrop-blur">
                <p className="font-semibold text-white">Controles rápidos</p>
                <ul className="mt-2 space-y-1 text-xs text-slate-200">
                  <li>• Mouse izquierdo: rotar la escena.</li>
                  <li>• Mouse derecho: desplazar el escenario.</li>
                  <li>• Scroll: acercar/alejar para mostrar detalles.</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.45em] text-slate-400">Instrucciones</p>
                <p className="mt-2 text-sm text-slate-200">
                  Selecciona un robot y sigue la secuencia de botones dentro del simulador para activar giros, luces y
                  desplazamientos. Puedes pausar en cualquier momento para explicar partes importantes.
                </p>
              </div>
              <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-5">
                <p className="text-xs uppercase tracking-[0.45em] text-violet-200">Sugerencia</p>
                <p className="mt-2 text-sm text-violet-100">
                  Combina este módulo con el narrador del Globo Terráqueo para contar misiones interplanetarias con robots.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-slate-500">PERFILES</p>
              <h3 className="text-2xl font-semibold text-white">Conoce a cada robot</h3>
            </div>
            <span className="text-sm text-slate-400">Todos listos para misiones educativas.</span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {robotProfiles.map((robot) => (
              <div key={robot.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="text-2xl">{robot.emoji}</span>
                  <h4 className="text-lg font-semibold text-white">{robot.title}</h4>
                </div>
                <p className="mt-2 text-sm text-slate-300">{robot.description}</p>
                <ul className="mt-3 space-y-1 text-xs text-slate-400">
                  {robot.stats.map((stat) => (
                    <li key={stat} className="flex items-center gap-2">
                      <span className="text-cyan-400">▹</span>
                      {stat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-slate-500">CONSEJOS DE CONTROL</p>
              <h3 className="text-2xl font-semibold text-white">Domina la simulación</h3>
            </div>
            <div className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-xs uppercase tracking-[0.45em] text-violet-100">
              MODO EXPERTO
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {controlTips.map((tip) => (
              <div key={tip.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-sm font-semibold text-white">{tip.title}</p>
                <p className="text-xs text-slate-300">{tip.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
