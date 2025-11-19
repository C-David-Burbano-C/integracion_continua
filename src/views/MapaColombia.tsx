import { useMemo, useState, useCallback } from 'react';
import { MapIcon } from '../components/icons';
import { useNarrator } from '../hooks/useNarrator';
import { getRandomColombiaCuriosity, getCuriositiesByCategory, type ColombiaCuriosity } from '../data/colombiaCuriosities';
import { MicrophoneIcon, StarIcon, SpeakerIcon, DiceIcon, StopIcon, LightbulbIcon } from '../components/icons/NarratorIcons';
import { useScore } from '../context/ScoreContext';

const colombiaHeroStats = [
  { value: '32', label: 'Departamentos', detail: 'Una red diversa de territorios' },
  { value: '6', label: 'Regiones naturales', detail: 'Caribe, Andina, Pacífica, Orinoquía, Amazonía, Insular' },
  { value: '50+', label: 'Parques naturales', detail: 'Hábitats que protegen flora y fauna' },
  { value: '2°', label: 'País más biodiverso', detail: 'Variedad única de especies' }
];

const territoryInsights = [
  { title: 'Altiplano andino', text: 'Bogotá, Tunja y Pasto elevan la cultura cafetera más de 2,500 msnm.', emoji: '⛰️' },
  { title: 'Costa Caribe', text: 'Cartagena, Santa Marta y La Guajira mezclan desierto, mar y murallas coloniales.', emoji: '🌅' },
  { title: 'Amazonía', text: 'Leticia conecta con Brasil y Perú en una selva respirando humedad y colores.', emoji: '🌳' }
];

const gastronomyHighlights = [
  { label: 'Bandeja paisa', detail: 'Un festín paisa que reúne todo en un plato gigante.', emoji: '🍽️' },
  { label: 'Ajiaco bogotano', detail: 'Sopa espesa que combina papas, pollo y guascas.', emoji: '🥣' },
  { label: 'Arepa de choclo', detail: 'Dulce y tostada, perfecta con quesito.', emoji: '🌽' }
];

const colombiaCategories: Array<{
  value: ColombiaCuriosity['category'];
  label: string;
  description: string;
  gradient: string;
  emoji: string;
}> = [
  { value: 'animales', label: 'Fauna legendaria', description: 'Cóndor, colibríes y especies únicas.', emoji: '🦜', gradient: 'from-emerald-500 to-lime-500' },
  { value: 'lugares', label: 'Lugares mágicos', description: 'Ciudad Perdida, Tatacoa, Puracé.', emoji: '🏞️', gradient: 'from-sky-500 to-blue-500' },
  { value: 'comida', label: 'Sabores gigantes', description: 'Bandejas, jugos y recetas ancestrales.', emoji: '🍲', gradient: 'from-amber-500 to-orange-500' },
  { value: 'tradiciones', label: 'Fiestas que brillan', description: 'Carnaval, Feria de las Flores, leyendas.', emoji: '🎉', gradient: 'from-fuchsia-500 to-rose-500' },
  { value: 'biodiversidad', label: 'Selvas infinitas', description: 'Amazonas, ranas venenosas, orquídeas.', emoji: '🌿', gradient: 'from-teal-500 to-green-500' },
  { value: 'historia', label: 'Héroes y mitos', description: 'Bolívar, El Dorado, café y oro.', emoji: '📜', gradient: 'from-yellow-500 to-orange-500' }
];

export default function MapaColombia() {
  const { speak, stop, isSpeaking, currentText } = useNarrator();
  const [selectedCategory, setSelectedCategory] = useState<ColombiaCuriosity['category']>('animales');
  const { totalScore } = useScore();

  const curiosities = useMemo(() => getCuriositiesByCategory(selectedCategory), [selectedCategory]);

  const handleNarrateCuriosity = (curiosity: ColombiaCuriosity) => {
    speak(curiosity.text, {
      points: curiosity.points,
      onComplete: () => {
        console.log(`¡Narración completada! Ganaste ${curiosity.points} puntos por aprender sobre ${curiosity.title}`);
      }
    });
  };

  const handleRandomCuriosity = () => {
    const curiosity = getRandomColombiaCuriosity();
    handleNarrateCuriosity(curiosity);
  };

  const scrollToPoints = useCallback(() => {
    const target = document.getElementById('puntos-mapa-colombia');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6">
        <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-10 shadow-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.25),_transparent_55%)]" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <div className="mb-4 flex items-center gap-3 text-slate-300">
                <div className="rounded-full bg-amber-500/20 p-3">
                  <MapIcon size={32} className="text-amber-300" />
                </div>
                <p className="text-xs font-semibold tracking-[0.45em] text-slate-500">EXPEDICIÓN COLOMBIA</p>
              </div>
              <h1 className="text-4xl font-black text-white sm:text-5xl">Mapa Interactivo de Colombia</h1>
              <p className="mt-4 text-lg text-slate-300">
                Vuela con vista satelital, descubre regiones naturales y deja que nuestro narrador IA te cuente historias
                sobre fauna, gastronomía y cultura.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {colombiaHeroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                    <p className="text-sm font-semibold text-slate-200">{stat.label}</p>
                    <p className="text-xs text-slate-400">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.45em] text-amber-200">BRIEF CULTURAL</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Bitácora viajera</h3>
              <p className="mt-3 text-sm text-slate-200">
                Colombia ofrece océanos, cordilleras y selvas comunicadas por más de 1,100 ríos. Cada curiosidad narrada suma puntos y desbloquea nuevos relatos.
              </p>
              <div className="mt-5 space-y-4 text-sm text-slate-200">
                {territoryInsights.map((insight) => (
                  <div key={insight.title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3">
                    <span className="text-2xl">{insight.emoji}</span>
                    <div>
                      <p className="font-semibold text-white">{insight.title}</p>
                      <p className="text-xs text-slate-300">{insight.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                <StarIcon size={16} className="mr-2 inline text-yellow-300" />
                Puntuación actual: <span className="font-bold text-white">{totalScore}</span> puntos.
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-sm text-slate-400">¿Listo para sumar puntos colombianos?</span>
              <button
                onClick={scrollToPoints}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:scale-105 transition"
              >
                Ir a puntos
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[3fr,2fr]">
            <div className="relative rounded-3xl border border-slate-800 bg-black/40 p-4 shadow-inner">
              <div className="h-[540px] overflow-hidden rounded-2xl border border-slate-800">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16308341.36384882!2d-82.31524843749997!3d4.101778799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e15a43aae1594a3%3A0x9a0d9a04eff2a340!2sColombia!5e0!3m2!1ses!2sco!4v1699999999999!5m2!1ses!2sco"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de Colombia"
                />
              </div>
              <div className="pointer-events-none absolute left-6 top-6 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-200 shadow">
                En vivo
              </div>
              <div className="pointer-events-auto absolute bottom-6 left-6 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-100 backdrop-blur">
                <p className="font-semibold text-white">Tips rápidos</p>
                <ul className="mt-2 space-y-1 text-xs text-slate-200">
                  <li>• Con el mouse, arrastra para rotar y usa el scroll para hacer zoom.</li>
                  <li>• Mantén presionado Shift + arrastre para girar el mapa en 45°.</li>
                  <li>• Haz clic en el ícono de marcador para medir distancias.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.45em] text-slate-400">GASTRONOMÍA</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Sabores que verás desde el cielo</h3>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  {gastronomyHighlights.map((item) => (
                    <div key={item.label} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-slate-900/40 p-3">
                      <span className="text-2xl">{item.emoji}</span>
                      <div>
                        <p className="font-semibold text-white">{item.label}</p>
                        <p className="text-xs text-slate-400">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                <p className="text-xs uppercase tracking-[0.45em] text-emerald-300">Modo explorador</p>
                <p className="mt-2 text-sm text-emerald-100">
                  Cambia de región en el mapa, luego activa una categoría del narrador para escuchar historias del mismo territorio.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="puntos-mapa-colombia" className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 lg:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-slate-500">NARRADOR COLOMBIANO</p>
              <h3 className="text-2xl font-semibold text-white">Historias vivas del territorio</h3>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-100">
              <StarIcon size={16} className="text-yellow-300" />
              Gana puntos con cada historia
            </div>
          </div>

          {(isSpeaking || currentText) && (
            <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.45em] text-yellow-200">Narrando ahora</p>
              <p className="mt-2 text-sm text-yellow-50">{currentText || 'Alista tus oídos para la próxima curiosidad.'}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {colombiaCategories.map((category) => {
              const isActive = selectedCategory === category.value;
              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex min-w-[220px] flex-1 items-start gap-3 rounded-2xl border p-4 text-left transition ${
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

          <div className="grid gap-4 md:grid-cols-2">
            {curiosities.map((curiosity) => (
              <button
                key={curiosity.id}
                onClick={() => handleNarrateCuriosity(curiosity)}
                disabled={isSpeaking}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:-translate-y-1 hover:border-amber-400/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-3xl">{curiosity.emoji}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-bold text-white">
                    <StarIcon size={12} className="text-white" />
                    +{curiosity.points}
                  </span>
                </div>
                <p className="text-lg font-semibold text-white">{curiosity.title}</p>
                <p className="mt-2 flex items-center gap-1 text-xs font-medium text-amber-100">
                  <SpeakerIcon size={14} className="text-amber-200" />
                  Escuchar historia
                </p>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onClick={handleRandomCuriosity}
              disabled={isSpeaking}
              className="flex-1 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 p-5 text-left text-white shadow-lg transition hover:scale-[1.01] hover:from-fuchsia-400 hover:via-pink-400 hover:to-rose-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <DiceIcon size={32} className="text-white" />
                <div>
                  <p className="text-xl font-bold">¡Sorpresa tropical!</p>
                  <p className="text-sm text-white/80">Activa una curiosidad aleatoria (8-18 puntos).</p>
                </div>
              </div>
            </button>

            {isSpeaking && (
              <button
                onClick={stop}
                className="rounded-2xl border border-red-500/60 bg-gradient-to-r from-red-500 to-orange-500 px-6 py-4 text-white shadow-lg transition hover:scale-105"
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
              <strong className="text-amber-300">Consejo:</strong> Escucha todas las regiones y lleva un registro de sabores, animales y tradiciones que quieras visitar.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
