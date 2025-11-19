// src/data/badges.ts
export interface Badge {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  icon: string; // SVG path
  color: string;
  category: 'explorador' | 'aprendiz' | 'experto' | 'maestro' | 'leyenda';
  unlocked: boolean;
}

export const badges: Badge[] = [
  {
    id: 'primer-pasos',
    name: 'Primeros Pasos',
    description: '¡Has comenzado tu aventura educativa!',
    pointsRequired: 10,
    icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    color: '#fbbf24',
    category: 'explorador',
    unlocked: false
  },
  {
    id: 'curioso-colombiano',
    name: 'Curioso Colombiano',
    description: 'Has aprendido sobre la biodiversidad de Colombia',
    pointsRequired: 25,
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    color: '#10b981',
    category: 'aprendiz',
    unlocked: false
  },
  {
    id: 'matematico-prodigio',
    name: 'Matemático Prodigio',
    description: 'Dominas las tablas de multiplicar y operaciones matemáticas',
    pointsRequired: 30,
    icon: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h16',
    color: '#8b5cf6',
    category: 'aprendiz',
    unlocked: false
  },
  {
    id: 'fisico-curioso',
    name: 'Físico Curioso',
    description: 'Entiendes las leyes de la física y el movimiento',
    pointsRequired: 35,
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    color: '#f97316',
    category: 'aprendiz',
    unlocked: false
  },
  {
    id: 'explorador-espacial',
    name: 'Explorador Espacial',
    description: 'Conoces los secretos del sistema solar',
    pointsRequired: 50,
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    color: '#3b82f6',
    category: 'experto',
    unlocked: false
  },
  {
    id: 'quimico-joven',
    name: 'Químico Joven',
    description: 'Has aprendido sobre elementos y compuestos químicos',
    pointsRequired: 45,
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    color: '#dc2626',
    category: 'experto',
    unlocked: false
  },
  {
    id: 'biologo-naturista',
    name: 'Biólogo Naturista',
    description: 'Eres un experto en especies y ecosistemas',
    pointsRequired: 55,
    icon: 'M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM12 7a3 3 0 100 6 3 3 0 000-6z',
    color: '#16a34a',
    category: 'experto',
    unlocked: false
  },
  {
    id: 'guardian-tierra',
    name: 'Guardián de la Tierra',
    description: 'Eres un experto en geografía y medio ambiente',
    pointsRequired: 75,
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    color: '#059669',
    category: 'experto',
    unlocked: false
  },
  {
    id: 'historiador-sabio',
    name: 'Historiador Sabio',
    description: 'Conoces la historia de la robótica y la tecnología',
    pointsRequired: 65,
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    color: '#92400e',
    category: 'experto',
    unlocked: false
  },
  {
    id: 'ingeniero-robotico',
    name: 'Ingeniero Robótico',
    description: 'Dominas los secretos de la robótica moderna',
    pointsRequired: 100,
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    color: '#8b5cf6',
    category: 'maestro',
    unlocked: false
  },
  {
    id: 'cientifico-universal',
    name: 'Científico Universal',
    description: 'Has dominado múltiples ciencias y disciplinas',
    pointsRequired: 125,
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    color: '#7c3aed',
    category: 'maestro',
    unlocked: false
  },
  {
    id: 'explorador-digital',
    name: 'Explorador Digital',
    description: 'Has navegado por todos los módulos educativos',
    pointsRequired: 120,
    icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9',
    color: '#06b6d4',
    category: 'maestro',
    unlocked: false
  },
  {
    id: 'maestro-curiosidades',
    name: 'Maestro de Curiosidades',
    description: 'Has escuchado más de 20 narraciones educativas',
    pointsRequired: 200,
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    color: '#ef4444',
    category: 'leyenda',
    unlocked: false
  },
  {
    id: 'sabio-universal',
    name: 'Sabio Universal',
    description: 'Has alcanzado el conocimiento supremo',
    pointsRequired: 150,
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    color: '#f59e0b',
    category: 'leyenda',
    unlocked: false
  },
  {
    id: 'innovador-tecnologico',
    name: 'Innovador Tecnológico',
    description: 'Has explorado el futuro de la tecnología y la IA',
    pointsRequired: 175,
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    color: '#6366f1',
    category: 'leyenda',
    unlocked: false
  },
  {
    id: 'ecologista-comprometido',
    name: 'Ecologista Comprometido',
    description: 'Eres un defensor apasionado del medio ambiente',
    pointsRequired: 160,
    icon: 'M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM12 7a3 3 0 100 6 3 3 0 000-6z',
    color: '#22c55e',
    category: 'leyenda',
    unlocked: false
  },
  {
    id: 'matematico-maestro',
    name: 'Matemático Maestro',
    description: 'Has dominado conceptos matemáticos avanzados',
    pointsRequired: 140,
    icon: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h16',
    color: '#a855f7',
    category: 'maestro',
    unlocked: false
  },
  {
    id: 'fisico-cuantico',
    name: 'Físico Cuántico',
    description: 'Entiendes los misterios de la física cuántica',
    pointsRequired: 180,
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    color: '#ea580c',
    category: 'leyenda',
    unlocked: false
  },
  {
    id: 'biologo-molecular',
    name: 'Biólogo Molecular',
    description: 'Has profundizado en los secretos de la vida celular',
    pointsRequired: 170,
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    color: '#dc2626',
    category: 'leyenda',
    unlocked: false
  },
  {
    id: 'visionario-futurista',
    name: 'Visionario Futurista',
    description: 'Imaginas y entiendes el mundo del mañana',
    pointsRequired: 220,
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    color: '#0ea5e9',
    category: 'leyenda',
    unlocked: false
  },
  {
    id: 'mentor-educativo',
    name: 'Mentor Educativo',
    description: 'Has compartido conocimientos con otros estudiantes',
    pointsRequired: 190,
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    color: '#f59e0b',
    category: 'leyenda',
    unlocked: false
  },
  {
    id: 'genio-creativo',
    name: 'Genio Creativo',
    description: 'Has demostrado creatividad excepcional en tus aprendizajes',
    pointsRequired: 250,
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    color: '#ec4899',
    category: 'leyenda',
    unlocked: false
  }
];

export const getBadgesByCategory = (category: Badge['category']): Badge[] => {
  return badges.filter(badge => badge.category === category);
};

export const getUnlockedBadges = (totalScore: number): Badge[] => {
  return badges.filter(badge => totalScore >= badge.pointsRequired);
};

export const getNextBadge = (totalScore: number): Badge | null => {
  const lockedBadges = badges.filter(badge => totalScore < badge.pointsRequired);
  if (lockedBadges.length === 0) return null;
  return lockedBadges.reduce((next, current) =>
    current.pointsRequired < next.pointsRequired ? current : next
  );
};

export const getBadgeProgress = (totalScore: number, badge: Badge): number => {
  if (totalScore >= badge.pointsRequired) return 100;
  return Math.round((totalScore / badge.pointsRequired) * 100);
};