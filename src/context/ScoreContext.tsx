import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ScoreContextType {
  totalScore: number;
  visitedModules: Set<string>;
  addScore: (points: number) => void;
  resetScore: () => void;
  markModuleAsRead: (moduleId: string) => void;
  isModuleRead: (moduleId: string) => boolean;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

interface ScoreProviderProps {
  children: ReactNode;
}

export const ScoreProvider: React.FC<ScoreProviderProps> = ({ children }) => {
  const [totalScore, setTotalScore] = useState<number>(0);
  const [visitedModules, setVisitedModules] = useState<Set<string>>(new Set());

  const addScore = (points: number) => {
    setTotalScore(prevScore => prevScore + points);
  };

  const resetScore = () => {
    setTotalScore(0);
    setVisitedModules(new Set());
  };

  const markModuleAsRead = (moduleId: string) => {
    if (!visitedModules.has(moduleId)) {
      setVisitedModules(prev => new Set(prev).add(moduleId));
      addScore(10); // 10 puntos por cada módulo leído
    }
  };

  const isModuleRead = (moduleId: string) => {
    return visitedModules.has(moduleId);
  };

  return (
    <ScoreContext.Provider value={{ 
      totalScore, 
      visitedModules,
      addScore, 
      resetScore,
      markModuleAsRead,
      isModuleRead
    }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = (): ScoreContextType => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};