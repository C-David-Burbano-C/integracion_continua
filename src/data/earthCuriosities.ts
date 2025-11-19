// src/data/earthCuriosities.ts
export interface EarthCuriosity {
  id: string;
  title: string;
  text: string;
  points: number;
  category: 'oceano' | 'continente' | 'clima' | 'biodiversidad' | 'historia' | 'geografia';
  emoji: string;
}

export const earthCuriosities: EarthCuriosity[] = [
  {
    id: 'oceano-pacifico',
    title: 'El Océano Pacífico',
    text: 'El Océano Pacífico es el más grande del mundo, cubre más de un tercio de la superficie terrestre y contiene más de la mitad del agua líquida del planeta.',
    points: 8,
    category: 'oceano',
    emoji: '🌊'
  },
  {
    id: 'continente-africa',
    title: 'África, el Continente de la Vida',
    text: 'África es el segundo continente más grande y alberga la mayor diversidad de vida salvaje del mundo, incluyendo los Cinco Grandes: elefante, león, búfalo, leopardo y rinoceronte.',
    points: 10,
    category: 'continente',
    emoji: '🦁'
  },
  {
    id: 'clima-antartida',
    title: 'La Antártida Fría',
    text: 'La Antártida es el lugar más frío de la Tierra, con temperaturas que pueden bajar hasta menos 89 grados Celsius. Contiene el 70% del agua dulce del planeta en forma de hielo.',
    points: 12,
    category: 'clima',
    emoji: '❄️'
  },
  {
    id: 'biodiversidad-amazonas',
    title: 'La Amazonía, Pulmón del Mundo',
    text: 'La selva amazónica produce el 20% del oxígeno del planeta y alberga más de 2.5 millones de especies de insectos, además de miles de especies de plantas y animales.',
    points: 15,
    category: 'biodiversidad',
    emoji: '🌿'
  },
  {
    id: 'historia-continentes',
    title: 'Los Continentes se Mueven',
    text: 'Hace 250 millones de años, todos los continentes formaban un supercontinente llamado Pangea. La tectónica de placas continúa moviendo los continentes a razón de pocos centímetros por año.',
    points: 18,
    category: 'historia',
    emoji: '🌍'
  },
  {
    id: 'geografia-everest',
    title: 'El Monte Everest',
    text: 'El Monte Everest, la montaña más alta del mundo con 8,848 metros sobre el nivel del mar, continúa creciendo aproximadamente 4 milímetros por año debido a la tectónica de placas.',
    points: 14,
    category: 'geografia',
    emoji: '🏔️'
  },
  {
    id: 'oceano-mariana',
    title: 'La Fosa de las Marianas',
    text: 'La Fosa de las Marianas es el punto más profundo de los océanos, con 11 kilómetros de profundidad. Es tan profunda que el Monte Everest cabría entero dentro de ella.',
    points: 16,
    category: 'oceano',
    emoji: '🌊'
  },
  {
    id: 'continente-australia',
    title: 'Australia, Continente Isla',
    text: 'Australia es el continente más pequeño y el único que también es una isla. Alberga especies únicas como el canguro, el koala y el ornitorrinco.',
    points: 11,
    category: 'continente',
    emoji: '🦘'
  },
  {
    id: 'clima-sahara',
    title: 'El Desierto del Sahara',
    text: 'El Sahara es el desierto más grande del mundo, cubre 9.2 millones de kilómetros cuadrados. Antiguamente fue una región fértil con ríos y lagos hace miles de años.',
    points: 13,
    category: 'clima',
    emoji: '🏜️'
  },
  {
    id: 'biodiversidad-corales',
    title: 'La Gran Barrera de Coral',
    text: 'La Gran Barrera de Coral en Australia es el sistema de arrecifes de coral más grande del mundo, visible desde el espacio. Alberga más de 1,500 especies de peces y 400 tipos de corales.',
    points: 17,
    category: 'biodiversidad',
    emoji: '🐠'
  }
];

export const getCuriositiesByCategory = (category: EarthCuriosity['category']): EarthCuriosity[] => {
  return earthCuriosities.filter(curiosity => curiosity.category === category);
};

export const getRandomEarthCuriosity = (): EarthCuriosity => {
  const randomIndex = Math.floor(Math.random() * earthCuriosities.length);
  return earthCuriosities[randomIndex];
};

export const getCuriosityByContinent = (continent: string): EarthCuriosity | undefined => {
  const continentMap: Record<string, EarthCuriosity['category']> = {
    'África': 'continente',
    'América': 'continente',
    'Antártida': 'clima',
    'Asia': 'continente',
    'Europa': 'continente',
    'Oceanía': 'continente',
    'Pacífico': 'oceano',
    'Atlántico': 'oceano',
    'Índico': 'oceano',
    'Ártico': 'oceano',
    'Antártico': 'oceano'
  };

  const category = continentMap[continent];
  if (category) {
    const curiosities = getCuriositiesByCategory(category);
    return curiosities[Math.floor(Math.random() * curiosities.length)];
  }
  return undefined;
};