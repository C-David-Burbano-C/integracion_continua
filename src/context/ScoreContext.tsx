import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ScoreContextType {
  totalScore: number;
  addScore: (points: number) => void;
  resetScore: () => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

interface ScoreProviderProps {
  children: ReactNode;
}

export const ScoreProvider: React.FC<ScoreProviderProps> = ({ children }) => {
  const [totalScore, setTotalScore] = useState<number>(0);

  const addScore = (points: number) => {
    setTotalScore(prevScore => prevScore + points);
  };

  const resetScore = () => {
    setTotalScore(0);
  };

  return (
    <ScoreContext.Provider value={{ totalScore, addScore, resetScore }}>
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