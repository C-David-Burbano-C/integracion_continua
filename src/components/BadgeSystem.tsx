// src/components/BadgeSystem.tsx
import React from 'react';
import { useScore } from '../context/ScoreContext';
import { badges, getUnlockedBadges, getNextBadge, getBadgeProgress, type Badge } from '../data/badges';
import { TrophyIcon, StarIcon, SparklesIcon } from './icons/NarratorIcons';

interface BadgeCardProps {
  badge: Badge;
  isUnlocked: boolean;
  progress: number;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge, isUnlocked, progress }) => {
  return (
    <div className={`relative group perspective-1000 ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
      <div className={`relative w-32 h-32 transform-style-preserve-3d transition-transform duration-500 group-hover:rotate-y-180 ${isUnlocked ? 'hover:scale-110' : ''}`}>
        {/* Front of badge */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl shadow-2xl">
          <div className={`w-full h-full rounded-2xl p-4 flex flex-col items-center justify-center ${
            isUnlocked
              ? `bg-gradient-to-br from-${badge.color.replace('#', '')} to-${badge.color.replace('#', '')}/80 shadow-lg`
              : 'bg-gradient-to-br from-gray-400 to-gray-600'
          }`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
              isUnlocked ? 'bg-white/20' : 'bg-gray-500/50'
            }`}>
              <svg
                className={`w-8 h-8 ${isUnlocked ? 'text-white' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d={badge.icon} />
              </svg>
            </div>
            <h3 className={`text-xs font-bold text-center leading-tight ${
              isUnlocked ? 'text-white' : 'text-gray-300'
            }`}>
              {badge.name}
            </h3>
            {!isUnlocked && (
              <div className="mt-1 w-full bg-gray-600 rounded-full h-1">
                <div
                  className="bg-yellow-400 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Back of badge */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl shadow-2xl">
          <div className={`w-full h-full rounded-2xl p-4 flex flex-col items-center justify-center ${
            isUnlocked
              ? `bg-gradient-to-br from-${badge.color.replace('#', '')}/80 to-${badge.color.replace('#', '')}`
              : 'bg-gradient-to-br from-gray-500 to-gray-700'
          }`}>
            <div className="text-center">
              <h3 className={`text-sm font-bold mb-2 ${
                isUnlocked ? 'text-white' : 'text-gray-300'
              }`}>
                {badge.name}
              </h3>
              <p className={`text-xs leading-tight ${
                isUnlocked ? 'text-white/90' : 'text-gray-400'
              }`}>
                {badge.description}
              </p>
              <div className={`mt-2 text-xs font-semibold ${
                isUnlocked ? 'text-yellow-300' : 'text-gray-400'
              }`}>
                {isUnlocked ? '¡DESBLOQUEADA!' : `${badge.pointsRequired} puntos`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isUnlocked && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
          <SparklesIcon size={12} className="text-yellow-800" />
        </div>
      )}
    </div>
  );
};

const BadgeSystem: React.FC = () => {
  const { totalScore } = useScore();
  const unlockedBadges = getUnlockedBadges(totalScore);
  const nextBadge = getNextBadge(totalScore);

  const categories = [
    { id: 'explorador', name: 'Explorador', color: 'from-green-400 to-emerald-500' },
    { id: 'aprendiz', name: 'Aprendiz', color: 'from-blue-400 to-cyan-500' },
    { id: 'experto', name: 'Experto', color: 'from-purple-400 to-pink-500' },
    { id: 'maestro', name: 'Maestro', color: 'from-yellow-400 to-orange-500' },
    { id: 'leyenda', name: 'Leyenda', color: 'from-red-400 to-rose-500' }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <TrophyIcon size={24} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Sistema de Insignias 3D
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          ¡Gana puntos escuchando narraciones y desbloquea increíbles insignias 3D!
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <StarIcon size={24} className="text-yellow-500 animate-pulse" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Tu Progreso
            </h3>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">{totalScore}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">puntos totales</div>
          </div>
        </div>

        {nextBadge && (
          <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                Próxima insignia: {nextBadge.name}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {totalScore}/{nextBadge.pointsRequired} puntos
              </span>
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getBadgeProgress(totalScore, nextBadge)}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{unlockedBadges.length}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">insignias desbloqueadas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{badges.length - unlockedBadges.length}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">insignias pendientes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {nextBadge ? nextBadge.pointsRequired - totalScore : 0}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">puntos para siguiente</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round((unlockedBadges.length / badges.length) * 100)}%
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">completado</div>
          </div>
        </div>
      </div>

      {/* Badge Categories */}
      {categories.map((category) => {
        const categoryBadges = badges.filter(badge => badge.category === category.id);

        return (
          <div key={category.id} className="mb-8">
            <div className={`bg-gradient-to-r ${category.color} rounded-xl p-6`}>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                {category.name}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categoryBadges.map((badge) => {
                  const isUnlocked = totalScore >= badge.pointsRequired;
                  const progress = getBadgeProgress(totalScore, badge);

                  return (
                    <BadgeCard
                      key={badge.id}
                      badge={badge}
                      isUnlocked={isUnlocked}
                      progress={progress}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

      {/* Achievement Celebration */}
      {unlockedBadges.length > 0 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg">
            <TrophyIcon size={20} className="text-white" />
            <span className="font-bold">
              ¡Has desbloqueado {unlockedBadges.length} insignia{unlockedBadges.length !== 1 ? 's' : ''}!
            </span>
            <SparklesIcon size={20} className="text-white animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeSystem;