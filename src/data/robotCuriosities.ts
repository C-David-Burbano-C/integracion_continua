// src/data/robotCuriosities.ts
export interface RobotCuriosity {
  id: string;
  title: string;
  text: string;
  points: number;
  category: 'explorador' | 'industrial' | 'humanoide' | 'dron' | 'historia' | 'futuro';
  emoji: string;
}

export const robotCuriosities: RobotCuriosity[] = [
  {
    id: 'robot-curiosity',
    title: 'Curiosity, el Robot Explorador',
    text: 'Curiosity es un rover de la NASA que explora Marte desde 2012. Ha recorrido más de 25 kilómetros y ha descubierto evidencia de que Marte pudo haber tenido agua líquida en el pasado.',
    points: 12,
    category: 'explorador',
    emoji: '🚗'
  },
  {
    id: 'robot-industrial',
    title: 'Robots en la Industria',
    text: 'Los robots industriales pueden trabajar 24 horas al día, 7 días a la semana, con una precisión de hasta 0.02 milímetros. En las fábricas modernas, un solo robot puede reemplazar el trabajo de varios humanos.',
    points: 10,
    category: 'industrial',
    emoji: '🏭'
  },
  {
    id: 'robot-asimo',
    title: 'ASIMO, el Robot Humanoide',
    text: 'ASIMO, creado por Honda, puede caminar, correr, subir escaleras y servir bebidas. Es uno de los robots humanoides más avanzados y ha sido usado en investigaciones médicas y de asistencia.',
    points: 15,
    category: 'humanoide',
    emoji: '🤖'
  },
  {
    id: 'dron-entrega',
    title: 'Drones de Entrega',
    text: 'Los drones de entrega pueden llevar paquetes de hasta 2 kilogramos a distancias de 20 kilómetros. Empresas como Amazon y UPS ya los usan para entregas rápidas en áreas rurales.',
    points: 11,
    category: 'dron',
    emoji: '📦'
  },
  {
    id: 'primer-robot',
    title: 'El Primer Robot Industrial',
    text: 'Unimate, el primer robot industrial comercial, fue instalado en 1961 en una fábrica de General Motors. Podía realizar tareas repetitivas como soldadura y manipulación de piezas calientes.',
    points: 14,
    category: 'historia',
    emoji: '⚙️'
  },
  {
    id: 'robot-ia',
    title: 'Inteligencia Artificial en Robots',
    text: 'Los robots modernos usan IA para aprender de su entorno. Por ejemplo, los robots aspiradores Roomba aprenden el layout de tu casa y optimizan sus rutas de limpieza con cada uso.',
    points: 13,
    category: 'futuro',
    emoji: '🧠'
  },
  {
    id: 'robot-medico',
    title: 'Robots en la Medicina',
    text: 'Los robots quirúrgicos como el Da Vinci permiten a los cirujanos operar con precisión milimétrica a través de pequeñas incisiones. Han realizado más de 7 millones de cirugías en todo el mundo.',
    points: 16,
    category: 'industrial',
    emoji: '🏥'
  },
  {
    id: 'robot-perry',
    title: 'Perseverance en Marte',
    text: 'Perseverance, el rover más avanzado de la NASA, lleva un helicóptero llamado Ingenuity que realizó el primer vuelo controlado en otro planeta en abril de 2021.',
    points: 18,
    category: 'explorador',
    emoji: '🚁'
  },
  {
    id: 'robot-social',
    title: 'Robots Sociales',
    text: 'Robots como Pepper y NAO están diseñados para interactuar con humanos. Pueden reconocer emociones, mantener conversaciones y ayudar en la educación y terapia.',
    points: 12,
    category: 'humanoide',
    emoji: '😊'
  },
  {
    id: 'dron-inspeccion',
    title: 'Drones de Inspección',
    text: 'Los drones inspeccionan torres de energía, puentes y tuberías sin necesidad de escaladores humanos. Usan cámaras de alta resolución y sensores para detectar problemas invisibles.',
    points: 13,
    category: 'dron',
    emoji: '🔍'
  },
  {
    id: 'robot-origins',
    title: 'El Origen de la Palabra Robot',
    text: 'La palabra "robot" viene del checo "robota", que significa "trabajo forzado". Fue acuñada por el escritor Karel Čapek en su obra de teatro R.U.R. en 1920.',
    points: 9,
    category: 'historia',
    emoji: '📚'
  },
  {
    id: 'robot-nanobots',
    title: 'Nanorobots del Futuro',
    text: 'Los nanorobots podrían viajar por el torrente sanguíneo para reparar células dañadas, entregar medicamentos directamente a tumores, o incluso reconstruir tejidos orgánicos.',
    points: 20,
    category: 'futuro',
    emoji: '🔬'
  }
];

export const getCuriositiesByCategory = (category: RobotCuriosity['category']): RobotCuriosity[] => {
  return robotCuriosities.filter(curiosity => curiosity.category === category);
};

export const getRandomRobotCuriosity = (): RobotCuriosity => {
  const randomIndex = Math.floor(Math.random() * robotCuriosities.length);
  return robotCuriosities[randomIndex];
};

export const getCuriosityByRobotType = (robotType: string): RobotCuriosity | undefined => {
  const typeMap: Record<string, RobotCuriosity['category']> = {
    'Robot Explorador': 'explorador',
    'Robot Brazo': 'industrial',
    'Robot Humanoide': 'humanoide',
    'Dron Volador': 'dron'
  };

  const category = typeMap[robotType];
  if (category) {
    const curiosities = getCuriositiesByCategory(category);
    return curiosities[Math.floor(Math.random() * curiosities.length)];
  }
  return undefined;
};