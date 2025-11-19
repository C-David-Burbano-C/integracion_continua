// src/components/ScoreDisplay.tsx
import React, { useContext } from 'react';
import { ScoreContext } from '../context/ScoreContext';
import { StarIcon } from './icons/NarratorIcons';

const ScoreDisplay: React.FC = () => {
  const context = useContext(ScoreContext);

  if (!context) {
    console.error('❌ ScoreDisplay: No hay contexto disponible');
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-full shadow-lg">
        <span className="font-bold text-lg">ERROR</span>
      </div>
    );
  }

  const { totalScore } = context;

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-white rounded-full shadow-lg">
      <StarIcon size={20} className="text-white animate-pulse" />
      <span className="font-bold text-lg">{totalScore}</span>
      <span className="text-sm opacity-90">puntos</span>
    </div>
  );
};

export default ScoreDisplay;