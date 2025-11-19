import { useMemo, useState, useCallback } from 'react';
import { GlobeIcon } from '../components/icons';
import CesiumGlobe from '../components/CesiumGlobe';
import { useNarrator } from '../hooks/useNarrator';
import { getRandomEarthCuriosity, getCuriositiesByCategory, type EarthCuriosity } from '../data/earthCuriosities';
import { MicrophoneIcon, StarIcon, SpeakerIcon, DiceIcon, StopIcon, LightbulbIcon } from '../components/icons/NarratorIcons';

const heroStats = [
  { value: '71%', label: 'Superficie azul', detail: 'Océanos y mares que abrazan el planeta' },
  { value: '8.04B', label: 'Habitantes', detail: 'Personas distribuidas en 195 países' },
  { value: '4.54B años', label: 'Edad aproximada', detail: 'Formada junto al Sol' },
  { value: '510.1M km²', label: 'Superficie total', detail: 'Entre continentes e inmensos océanos' }
];

const explorationTips = [
  { title: 'Rotar la Tierra', description: 'Haz clic y arrastra el globo para girarlo en cualquier dirección.', emoji: '🌀' },
  { title: 'Zoom suave', description: 'Acércate con la rueda del mouse o pellizcando la pantalla.', emoji: '🔍' },
  { title: 'Buscar lugares', description: 'Escribe un país o ciudad en el buscador integrado.', emoji: '📍' },
  { title: 'Vuelos cinemáticos', description: 'Haz doble clic sobre un punto para viajar con animación.', emoji: '✈️' }
];

const planetInfoCards = [
  {
    title: 'Océanos y agua',
    emoji: '🌊',
    bullets: [
      'El 97% del agua es salada; solo 3% es dulce.',
      'Las corrientes marinas distribuyen calor y nutrientes.',
      'Más de 3 millones de naufragios descansan bajo las olas.'
    ]
  },
  {
    title: 'Capas de la Tierra',
    emoji: '🪨',
    bullets: [
      'La corteza (5-70 km) es nuestro suelo y se fragmenta en placas.',
      'El manto fluye lentamente y alimenta volcanes y cordilleras.',
      'El núcleo externo, de hierro líquido, genera el campo magnético.'
    ]
  },
  {
    title: 'Atmósfera protectora',
    emoji: '🌤️',
    bullets: [
      '78% nitrógeno y 21% oxígeno sostienen la vida.',
      'La capa de ozono nos protege de la radiación ultravioleta.',
      'Auroras y vientos alisios muestran su energía en movimiento.'
    ]
  }
];

const continents = [
  { name: 'África', area: '30.3M km²', colorClass: 'bg-yellow-400' },
  { name: 'América del Norte', area: '24.7M km²', colorClass: 'bg-blue-500' },
  { name: 'América del Sur', area: '17.8M km²', colorClass: 'bg-emerald-500' },
  { name: 'Antártida', area: '14.2M km²', colorClass: 'bg-white border border-slate-300' },
  { name: 'Asia', area: '44.6M km²', colorClass: 'bg-red-500' },
  { name: 'Europa', area: '10.2M km²', colorClass: 'bg-green-500' },
  { name: 'Oceanía', area: '8.5M km²', colorClass: 'bg-purple-500' }
];

const oceans = [
  {
    name: 'Pacífico',
    area: '168.7M km²',
    description: 'El océano más extenso de la Tierra; su fosa de las Marianas supera los 11 000 metros y conecta Asia con América.'
  },
  {
    name: 'Atlántico',
    area: '85.1M km²',
    description: 'Un corredor histórico de corrientes y rutas marítimas dominado por la dorsal mesoatlántica.'
  },
  {
    name: 'Índico',
    area: '70.6M km²',
    description: 'Baña costas tropicales y sus corrientes monzónicas regulan el clima de Asia y África oriental.'
  },
  {
    name: 'Ártico',
    area: '14.1M km²',
    description: 'Océano helado gran parte del año, hogar de narvales y base del fenómeno del sol de medianoche.'
  },
  {
    name: 'Antártico',
    area: '20.3M km²',
    description: 'Circunda el continente blanco y crea el Frente Polar Antártico, una barrera térmica crucial.'
  }
];

type OceanInfo = (typeof oceans)[number];

const curiosityCategories: Array<{
  value: EarthCuriosity['category'];
  label: string;
  description: string;
  emoji: string;
  gradient: string;
}> = [
  { value: 'oceano', label: 'Océanos', description: 'Fosas, corrientes y mareas impresionantes', emoji: '🌊', gradient: 'from-sky-500 to-cyan-500' },
  { value: 'continente', label: 'Continentes', description: 'Superficies gigantes llenas de culturas', emoji: '🗺️', gradient: 'from-emerald-500 to-lime-500' },
  { value: 'clima', label: 'Clima extremo', description: 'Desiertos, huracanes y tormentas glaciares', emoji: '🌪️', gradient: 'from-indigo-500 to-slate-500' },
  { value: 'biodiversidad', label: 'Biodiversidad', description: 'Selvas, arrecifes y especies increíbles', emoji: '🦜', gradient: 'from-amber-500 to-rose-500' },
  { value: 'historia', label: 'Historia geológica', description: 'Placas tectónicas y eras ancestrales', emoji: '⏳', gradient: 'from-orange-500 to-pink-500' },
  { value: 'geografia', label: 'Geografía épica', description: 'Montañas, valles y paisajes únicos', emoji: '⛰️', gradient: 'from-purple-500 to-blue-500' }
];

export default function GloboTerraqueo() {
  const { speak, stop, isSpeaking, currentText } = useNarrator();
  const [selectedCategory, setSelectedCategory] = useState<EarthCuriosity['category'] | null>('oceano');
  const [selectedOcean, setSelectedOcean] = useState<string | null>(null);

  const curiosities = useMemo(() => {
    if (!selectedCategory) return [];
    return getCuriositiesByCategory(selectedCategory);
  }, [selectedCategory]);

  const activeCategoryMeta = curiosityCategories.find((category) => category.value === selectedCategory);

  const handleNarrateCuriosity = (curiosity: EarthCuriosity) => {
    speak(curiosity.text, {
      points: curiosity.points,
      onComplete: () => {
        console.log(`¡Narración completada! Ganaste ${curiosity.points} puntos por aprender sobre ${curiosity.title}`);
      }
    });
  };

  const handleRandomCuriosity = () => {
    const curiosity = getRandomEarthCuriosity();
    handleNarrateCuriosity(curiosity);
  };

  const handleOceanNarration = useCallback(
    (ocean: OceanInfo) => {
      stop();
      setSelectedOcean(ocean.name);
      const narration = `Océano ${ocean.name}. ${ocean.description} Su superficie aproximada es de ${ocean.area}.`;
      speak(narration, {
        onComplete: () => setSelectedOcean(null)
      });
    },
    [speak, stop]
  );

  const toggleCategory = (categoryValue: EarthCuriosity['category']) => {
    setSelectedCategory((prev) => (prev === categoryValue ? null : categoryValue));
  };

  const scrollToPoints = useCallback(() => {
    const target = document.getElementById('puntos-globo-terraqueo');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-10">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6">
        <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 shadow-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.35),_transparent_50%)]" aria-hidden />
          <div className="relative grid gap-10 md:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-3 text-slate-300">
                <div className="rounded-full bg-sky-500/20 p-3">
                  <GlobeIcon size={32} className="text-sky-300" />
                </div>
                <p className="text-xs font-semibold tracking-[0.3em] text-slate-400">EXPEDICIÓN DIGITAL</p>
              </div>
              <h1 className="text-4xl font-black text-white sm:text-5xl">Globo Terráqueo Interactivo</h1>
              <p className="mt-4 text-lg text-slate-300">
                Viaja alrededor del planeta con un globo 3D alimentado por CesiumJS y acompaña cada vista con curiosidades narradas en español.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                  >
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                    <p className="text-sm font-semibold text-slate-200">{stat.label}</p>
                    <p className="text-xs text-slate-400">{stat.detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-sm text-slate-400">¿Quieres ir directo a la sección de puntos?</span>
                <button
                  onClick={scrollToPoints}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:scale-105 transition"
                >
                  Ir a puntos
                </button>
              </div>
            </div>

            <div className="relative h-full rounded-3xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-500/20 via-cyan-500/20 to-transparent blur-3xl" aria-hidden />
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">PLAN DE VUELO</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Tu mapa de exploración</h3>
              <p className="mt-3 text-sm text-slate-400">
                Sube al satélite, visita nuevas ciudades y desbloquea datos increíbles mientras acumulas puntos.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Modo</p>
                    <p className="text-lg font-semibold text-white">Exploración inmersiva</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <StarIcon size={16} className="text-amber-400" />
                    Gana puntos por cada historia
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Escala</p>
                    <p className="text-lg font-semibold text-white">Global</p>
                  </div>
                  <p className="text-sm text-slate-300">Desde la estratósfera hasta el suelo urbano</p>
                </div>
                <div className="rounded-2xl border border-cyan-500/40 bg-cyan-500/10 p-4">
                  <p className="text-xs uppercase tracking-wide text-cyan-400">Consejo</p>
                  <p className="text-sm text-cyan-100">
                    Alterna entre continentes y océanos para que el narrador te cuente historias diferentes cada vez.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-2xl lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[3fr,2fr] lg:items-start">
            <div className="relative h-[600px] rounded-3xl border border-slate-800 bg-black/50 shadow-inner">
              <CesiumGlobe />

              <div className="pointer-events-none absolute left-6 top-6 rounded-full border border-emerald-400/60 bg-emerald-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-200 shadow-lg">
                En vivo
              </div>
              <div className="pointer-events-none absolute right-6 top-6 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-200 shadow-lg backdrop-blur">
                Usa el buscador incorporado para saltar de ciudad en ciudad.
              </div>
              <div className="pointer-events-auto absolute bottom-6 left-6 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-100 shadow-lg backdrop-blur">
                <p className="font-semibold text-white">Controles rápidos</p>
                <ul className="mt-2 space-y-1 text-xs text-slate-200">
                  <li>• Rueda del mouse para hacer zoom.</li>
                  <li>• Mantén presionado el botón derecho para inclinar la cámara.</li>
                  <li>• Doble clic para viajar automáticamente hacia el punto.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Centro de exploración</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Configura tu misión</h3>
                <p className="mt-3 text-sm text-slate-400">
                  Desde este panel puedes planear rutas, conocer el clima e inspirarte con trucos visuales antes de iniciar la narración.
                </p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3">
                    <dt className="text-slate-300">Modo de cámara</dt>
                    <dd className="font-semibold text-white">Orbital</dd>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3">
                    <dt className="text-slate-300">Detalle del terreno</dt>
                    <dd className="font-semibold text-white">Alta definición</dd>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3">
                    <dt className="text-slate-300">Tiempo de viaje</dt>
                    <dd className="font-semibold text-white">Instantáneo</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-sky-500/20 via-cyan-500/20 to-transparent p-5">
                <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">Trucos en CesiumJS</p>
                <h4 className="mt-2 text-xl font-semibold text-white">Domina el globo</h4>
                <div className="mt-4 space-y-3">
                  {explorationTips.map((tip) => (
                    <div key={tip.title} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 p-3">
                      <span className="text-xl">{tip.emoji}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{tip.title}</p>
                        <p className="text-xs text-slate-200">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 lg:p-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Datos del planeta</p>
              <h3 className="text-2xl font-semibold text-white">Conoce la escala de la Tierra</h3>
            </div>
            <span className="text-sm text-slate-400">Todo listo para contrastar con lo que ves en el globo.</span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-blue-500/40 bg-blue-500/10 p-4 text-center">
              <p className="text-2xl font-bold text-blue-300">510.1</p>
              <p className="font-semibold text-slate-200">Millones de km²</p>
              <p className="text-xs text-slate-400">Superficie total</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center">
              <p className="text-2xl font-bold text-emerald-300">8.04</p>
              <p className="font-semibold text-slate-200">Mil millones</p>
              <p className="text-xs text-slate-400">Habitantes</p>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-center">
              <p className="text-2xl font-bold text-amber-300">4.54</p>
              <p className="font-semibold text-slate-200">Mil millones de años</p>
              <p className="text-xs text-slate-400">Edad aproximada</p>
            </div>
            <div className="rounded-2xl border border-purple-500/40 bg-purple-500/10 p-4 text-center">
              <p className="text-2xl font-bold text-purple-300">71%</p>
              <p className="font-semibold text-slate-200">Superficie azul</p>
              <p className="text-xs text-slate-400">Cubierta por agua</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {planetInfoCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-2xl">{card.emoji}</span>
                  <h4 className="text-lg font-semibold text-white">{card.title}</h4>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="text-cyan-400">▹</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h4 className="text-lg font-semibold text-white">Continentes en cifras</h4>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {continents.map((continent) => (
                  <div key={continent.name} className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-900/40 p-3">
                    <span className={`h-3 w-3 rounded-full ${continent.colorClass}`} />
                    <div>
                      <p className="font-semibold text-white">{continent.name}</p>
                      <p className="text-xs text-slate-400">{continent.area}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h4 className="text-lg font-semibold text-white">Los cinco océanos</h4>
                <p className="mt-1 text-xs text-slate-400">Toca uno para escuchar datos narrados del océano elegido.</p>
                <div className="mt-4 space-y-3 text-sm">
                  {oceans.map((ocean) => {
                    const isActiveOcean = selectedOcean === ocean.name;
                    return (
                      <button
                        key={ocean.name}
                        type="button"
                        onClick={() => handleOceanNarration(ocean)}
                        className={`flex w-full items-start justify-between gap-3 rounded-xl border px-4 py-3 text-left transition ${
                          isActiveOcean
                            ? 'border-cyan-400/70 bg-cyan-500/15 text-white shadow-lg'
                            : 'border-white/5 bg-slate-900/40 text-slate-200 hover:border-cyan-500/40 hover:bg-slate-900/60'
                        }`}
                      >
                        <div>
                          <p className="font-semibold">{ocean.name}</p>
                          <p className="text-xs text-slate-400">{ocean.description}</p>
                        </div>
                        <span className="text-[11px] uppercase tracking-widest text-slate-400">
                          {isActiveOcean ? 'Narrando…' : ocean.area}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
          </div>
        </section>

        <section id="puntos-globo-terraqueo" className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 lg:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
                <MicrophoneIcon size={26} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Narrador terrestre mágico</h3>
                <p className="text-sm text-slate-400">Escucha historias épicas sobre nuestro planeta y gana puntos.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-300">
              <StarIcon size={16} className="text-yellow-400" />
              BONUS DE PUNTOS
            </div>
          </div>

          {(isSpeaking || currentText) && (
            <div className="rounded-2xl border border-cyan-500/40 bg-cyan-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">Narrando ahora</p>
              <p className="mt-2 text-sm text-cyan-100">{currentText || 'Prepara tus oídos para una nueva historia.'}</p>
            </div>
          )}

          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Categorías disponibles</p>
            <p className="text-sm text-slate-400">
              {selectedCategory ? `Explorando: ${activeCategoryMeta?.label ?? 'categoría seleccionada'}` : 'Activa una categoría para cargar sus curiosidades.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {curiosityCategories.map((category) => {
                const isActive = selectedCategory === category.value;
                return (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => toggleCategory(category.value)}
                    className={`flex min-w-[220px] flex-1 items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                      isActive
                        ? `border-transparent bg-gradient-to-r ${category.gradient} text-white shadow-xl`
                        : 'border-white/10 bg-white/5 text-slate-200 hover:border-white/30'
                    }`}
                  >
                    <span className="text-2xl">{category.emoji}</span>
                    <div>
                      <p className="text-base font-semibold">{category.label}</p>
                      <p className="text-xs text-white/80">{category.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedCategory ? (
            <div className="grid gap-4 md:grid-cols-2">
              {curiosities.map((curiosity) => (
                <button
                  key={curiosity.id}
                  onClick={() => handleNarrateCuriosity(curiosity)}
                  disabled={isSpeaking}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-3xl">{curiosity.emoji}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 text-xs font-bold text-white">
                      <StarIcon size={12} className="text-white" />
                      +{curiosity.points}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-white">{curiosity.title}</p>
                  <p className="mt-2 flex items-center gap-1 text-xs font-medium text-cyan-300">
                    <SpeakerIcon size={14} className="text-cyan-300" />
                    Escuchar historia
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-slate-400">
              Selecciona una categoría para desbloquear las tarjetas y escuchar sus relatos.
            </div>
          )}

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onClick={handleRandomCuriosity}
              disabled={isSpeaking}
              className="flex-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 p-5 text-left text-white shadow-lg transition hover:scale-[1.01] hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <DiceIcon size={32} className="text-white" />
                <div>
                  <p className="text-xl font-bold">¡Sorpresa global!</p>
                  <p className="text-sm text-white/80">Activa una curiosidad aleatoria (8-20 puntos).</p>
                </div>
              </div>
            </button>

            {isSpeaking && (
              <button
                onClick={stop}
                className="rounded-2xl border border-red-500/60 bg-gradient-to-r from-red-500 to-pink-500 px-6 py-4 text-white shadow-lg transition hover:scale-105"
              >
                <div className="flex items-center justify-center gap-2 font-semibold">
                  <StopIcon size={20} className="text-white" />
                  Detener narración
                </div>
              </button>
            )}
          </div>

          <div className="text-center text-sm text-slate-400">
            <p className="flex items-center justify-center gap-2">
              <LightbulbIcon size={16} className="text-yellow-400" />
              <strong className="text-cyan-300">Consejo:</strong> Escucha todas las categorías y suma puntos extra como si
              estuvieras viajando alrededor del mundo.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
