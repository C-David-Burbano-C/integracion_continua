// src/data/colombiaCuriosities.ts
export interface ColombiaCuriosity {
  id: string;
  title: string;
  text: string;
  category: 'animales' | 'lugares' | 'comida' | 'tradiciones' | 'biodiversidad' | 'historia';
  points: number;
  emoji: string;
}

export const colombiaCuriosities: ColombiaCuriosity[] = [
  {
    id: 'condor',
    title: '¡El Cóndor Andino Gigante! 🦅',
    text: '¿Sabías que el cóndor andino tiene alas tan grandes que pueden medir hasta 3 metros de ancho? Es el ave voladora más grande del mundo y puede volar durante horas sin mover las alas. ¡Es como un avión natural!',
    category: 'animales',
    points: 15,
    emoji: '🦅'
  },
  {
    id: 'quetzal',
    title: 'El Quetzal: Ave de Colores Mágicos 🐦',
    text: 'El quetzal tiene plumas rojas, verdes y azules brillantes que parecen joyas voladoras. Los antiguos pueblos mayas lo consideraban sagrado. ¡Sus plumas de la cola pueden medir hasta 60 centímetros!',
    category: 'animales',
    points: 12,
    emoji: '🐦'
  },
  {
    id: 'cocodrilo',
    title: 'Cocodrilos en la Ciudad 🐊',
    text: 'En Cartagena hay cocodrilos que viven en las murallas de la ciudad. ¡Se llaman "caimanes" y pueden medir hasta 6 metros! Son como guardianes antiguos de la ciudad colonial.',
    category: 'animales',
    points: 10,
    emoji: '🐊'
  },
  {
    id: 'colibri',
    title: 'Colibríes Súper Veloces 🐝',
    text: 'Los colibríes pueden volar hacia atrás y detenerse en el aire. Su corazón late 1,200 veces por minuto y sus alas se mueven tan rápido que hacen un zumbido. ¡Son como helicópteros diminutos!',
    category: 'animales',
    points: 10,
    emoji: '🐝'
  },
  {
    id: 'salto_tequendama',
    title: 'El Salto del Tequendama: ¡Wooooosh! 🌊',
    text: 'Es una cascada gigante de 157 metros de altura, más alta que una torre de 50 pisos. Los indígenas chibchas creían que era la entrada al inframundo. ¡El agua cae tan fuerte que hace temblar la tierra!',
    category: 'lugares',
    points: 15,
    emoji: '🌊'
  },
  {
    id: 'ciudad_perdida',
    title: 'La Ciudad Perdida Mágica 🏰',
    text: 'Es una ciudad antigua escondida en la selva, construida por indígenas hace 1,500 años. Tiene 169 terrazas de piedra y fue descubierta en 1975. ¡Es como un castillo encantado en la jungla!',
    category: 'lugares',
    points: 18,
    emoji: '🏰'
  },
  {
    id: 'desierto_tatacoa',
    title: 'El Desierto Rojo y Gris 🏜️',
    text: 'Tatacoa es el único desierto de Colombia. Tiene dunas rojas como Marte y grises como la Luna. Por la noche puedes ver miles de estrellas porque no hay luces de ciudad. ¡Es como estar en otro planeta!',
    category: 'lugares',
    points: 12,
    emoji: '🏜️'
  },
  {
    id: 'volcan_purace',
    title: 'Volcán Puracé: Montaña de Fuego 🌋',
    text: 'Es un volcán activo que hace erupciones y lanza lava al cielo. Pero también tiene lagunas termales calientes donde puedes bañarte. ¡Es como una montaña que respira fuego!',
    category: 'lugares',
    points: 14,
    emoji: '🌋'
  },
  {
    id: 'bandeja_paisa',
    title: 'Bandeja Paisa: ¡Comida Gigante! 🍽️',
    text: 'Es un plato enorme con carne, arroz, frijoles, plátano, chorizo, huevo, arepa y chicharrón. ¡Tiene tantos ingredientes que parece un banquete real! Los paisas dicen que es comida para todo el día.',
    category: 'comida',
    points: 10,
    emoji: '🍽️'
  },
  {
    id: 'arepas',
    title: 'Arepas: Pan de Maíz Mágico 🫓',
    text: 'Las arepas son el pan de Colombia hecho de maíz. Puedes comerlas con queso, jamón, huevo o solo con mantequilla. ¡Hay más de 40 tipos diferentes! Son como tortillas pero más gruesas y deliciosas.',
    category: 'comida',
    points: 8,
    emoji: '🫓'
  },
  {
    id: 'lulo',
    title: 'Lulo: Fruta con Cara 👀',
    text: 'El lulo parece tener una carita con ojos y boca. Es ácido por fuera pero dulce por dentro. Se usa para hacer jugos deliciosos. ¡Es como una fruta que te mira mientras la comes!',
    category: 'comida',
    points: 8,
    emoji: '👀'
  },
  {
    id: 'guanabana',
    title: 'Guanábana: Fruta de las Estrellas ⭐',
    text: 'La guanábana tiene una cáscara verde con púas y carne blanca dulce. Los científicos dicen que puede ayudar a combatir células malas. ¡Es como una fruta extraterrestre con poderes mágicos!',
    category: 'comida',
    points: 10,
    emoji: '⭐'
  },
  {
    id: 'feria_flores',
    title: 'Feria de las Flores: Caballos y Flores 🎪',
    text: 'En Medellín hay una fiesta gigante con desfiles de caballos adornados con flores. Miles de personas bailan y celebran. ¡Los caballos parecen unicornios cubiertos de colores!',
    category: 'tradiciones',
    points: 12,
    emoji: '🎪'
  },
  {
    id: 'carnaval_barranquilla',
    title: 'Carnaval de Barranquilla: Fiesta Loca 🎭',
    text: 'Es la fiesta más grande de Colombia con disfraces, música y bailes. La Reina del Carnaval lleva vestidos enormes con miles de plumas. ¡Es como un sueño de colores y alegría!',
    category: 'tradiciones',
    points: 15,
    emoji: '🎭'
  },
  {
    id: 'dia_muertos',
    title: 'Día de los Muertos en San Andrés 🕯️',
    text: 'En la isla de San Andrés celebran el Día de los Muertos con velas, flores y comida. Es una mezcla de tradiciones africanas, indígenas y europeas. ¡Es como una fiesta mágica con los espíritus!',
    category: 'tradiciones',
    points: 10,
    emoji: '🕯️'
  },
  {
    id: 'biodiversidad',
    title: 'Colombia: País de Súper Biodiversidad 🌍',
    text: 'Colombia tiene más especies de aves que cualquier otro país: ¡1,950 tipos diferentes! También tiene 60,000 especies de plantas. ¡Es como un jardín gigante del mundo entero!',
    category: 'biodiversidad',
    points: 18,
    emoji: '🌍'
  },
  {
    id: 'ranas',
    title: 'Ranas Venenosas de Colores 💎',
    text: 'Las ranas venenosas de Colombia tienen colores brillantes: rojo, azul, amarillo. Su veneno puede matar a 10 personas, pero los indígenas lo usan en dardos para cazar. ¡Son joyas vivientes!',
    category: 'biodiversidad',
    points: 14,
    emoji: '💎'
  },
  {
    id: 'amazonas',
    title: 'Amazonas: Selva Mágica 🌳',
    text: 'El Amazonas colombiano tiene árboles tan altos como rascacielos. Hay tribus indígenas que viven allí desde hace miles de años. ¡Es como un mundo secreto lleno de aventuras!',
    category: 'biodiversidad',
    points: 16,
    emoji: '🌳'
  },
  {
    id: 'simon_bolivar',
    title: 'Simón Bolívar: El Libertador 🐎',
    text: 'Simón Bolívar liberó a Colombia, Venezuela, Ecuador, Perú, Panamá y Bolivia de España. Cabalgó miles de kilómetros en su caballo Palomo. ¡Fue como un superhéroe real!',
    category: 'historia',
    points: 12,
    emoji: '🐎'
  },
  {
    id: 'el_dorado',
    title: 'La Leyenda de El Dorado 🏆',
    text: 'Los indígenas contaban historias de una ciudad cubierta de oro. Los conquistadores españoles buscaron durante años esta ciudad mágica. ¡Fue como una búsqueda del tesoro gigante!',
    category: 'historia',
    points: 10,
    emoji: '🏆'
  },
  {
    id: 'cafe',
    title: 'Colombia: País del Café ☕',
    text: 'Colombia produce el mejor café del mundo. Los granos crecen en las montañas y los recogen a mano. ¡El 12% del café mundial viene de Colombia!',
    category: 'historia',
    points: 8,
    emoji: '☕'
  }
];

export const getRandomColombiaCuriosity = (): ColombiaCuriosity => {
  const randomIndex = Math.floor(Math.random() * colombiaCuriosities.length);
  return colombiaCuriosities[randomIndex];
};

export const getCuriositiesByCategory = (category: ColombiaCuriosity['category']): ColombiaCuriosity[] => {
  return colombiaCuriosities.filter(curiosity => curiosity.category === category);
};

export const getColombiaCuriosityById = (id: string): ColombiaCuriosity | undefined => {
  return colombiaCuriosities.find(curiosity => curiosity.id === id);
};