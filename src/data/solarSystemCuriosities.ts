// src/data/solarSystemCuriosities.ts
export interface Curiosity {
  id: string;
  title: string;
  text: string;
  planet?: string;
  points: number;
}

export const solarSystemCuriosities: Curiosity[] = [
  {
    id: 'sun',
    title: '¡El Sol es una Estrella Gigante!',
    text: '¿Sabías que el Sol es tan grande que cabrían dentro de él un millón de Tierras? Es una estrella que brilla con energía nuclear y nos da luz y calor a todos los planetas. Sin el Sol, la Tierra sería un lugar muy frío y oscuro.',
    points: 15
  },
  {
    id: 'mercury',
    title: 'Mercurio: El Planeta Veloz',
    text: 'Mercurio es el planeta más cercano al Sol y también el más pequeño. Un día en Mercurio dura 59 días terrestres, pero un año solo dura 88 días. Imagina tener cumpleaños cada 3 meses pero días que duran casi 2 meses.',
    planet: 'Mercurio',
    points: 10
  },
  {
    id: 'venus',
    title: 'Venus: El Planeta Ardiente',
    text: 'Venus es el planeta más caliente de nuestro sistema solar, más caliente que Mercurio aunque está más lejos del Sol. Su temperatura puede llegar a 460 grados Celsius. Es como un horno gigante cubierto de nubes ácidas.',
    planet: 'Venus',
    points: 10
  },
  {
    id: 'earth',
    title: 'La Tierra: Nuestro Hogar Azul',
    text: 'La Tierra es el único planeta conocido con vida. Tiene océanos, continentes, animales y plantas. Gira sobre sí misma en 24 horas y alrededor del Sol en 365 días. Es el planeta perfecto para nosotros.',
    planet: 'Tierra',
    points: 12
  },
  {
    id: 'mars',
    title: 'Marte: El Planeta Rojo',
    text: 'Marte es conocido como el planeta rojo por su color. Tiene el volcán más grande del sistema solar, el Monte Olimpo, que es 3 veces más alto que el Everest. Los científicos creen que pudo haber tenido agua hace millones de años.',
    planet: 'Marte',
    points: 10
  },
  {
    id: 'jupiter',
    title: 'Júpiter: El Rey de los Planetas',
    text: 'Júpiter es el planeta más grande de nuestro sistema solar. Podrían caber dentro de él todos los demás planetas juntos. Tiene una gran mancha roja que es una tormenta gigante que ha estado rugiendo por cientos de años.',
    planet: 'Júpiter',
    points: 15
  },
  {
    id: 'saturn',
    title: 'Saturno: El Planeta de los Anillos',
    text: 'Saturno es famoso por sus hermosos anillos hechos de hielo y roca. Es menos denso que el agua, por lo que si tuviéramos un océano lo suficientemente grande, ¡Saturno flotaría! Tiene más de 80 lunas.',
    planet: 'Saturno',
    points: 15
  },
  {
    id: 'uranus',
    title: 'Urano: El Planeta que Gira de Lado',
    text: 'Urano es único porque gira de lado, como si rodara por el espacio. Es el planeta más frío del sistema solar con temperaturas de -224 grados Celsius. Su color azul verdoso viene de metano en su atmósfera.',
    planet: 'Urano',
    points: 12
  },
  {
    id: 'neptune',
    title: 'Neptuno: El Planeta Lejano',
    text: 'Neptuno es el planeta más lejano del Sol. Tiene vientos supersónicos que pueden llegar a 2,100 kilómetros por hora, los vientos más rápidos del sistema solar. Un año en Neptuno dura 165 años terrestres.',
    planet: 'Neptuno',
    points: 12
  },
  {
    id: 'asteroids',
    title: 'El Cinturón de Asteroides',
    text: 'Entre Marte y Júpiter hay un cinturón de asteroides, como rocas espaciales gigantes. El asteroide más grande, Ceres, es tan grande que es considerado un planeta enano. ¡Hay millones de asteroides esperando ser descubiertos!',
    points: 10
  },
  {
    id: 'pluto',
    title: 'Plutón: El Planeta Enano',
    text: 'Aunque ya no es considerado un planeta, Plutón es un mundo fascinante. Está muy lejos del Sol y hace mucho frío allí. Un día en Plutón dura 6 días terrestres, pero un año dura 248 años. ¡Es más pequeño que nuestra Luna!',
    points: 8
  }
];

export const getRandomCuriosity = (): Curiosity => {
  const randomIndex = Math.floor(Math.random() * solarSystemCuriosities.length);
  return solarSystemCuriosities[randomIndex];
};

export const getCuriosityByPlanet = (planetName: string): Curiosity | undefined => {
  return solarSystemCuriosities.find(curiosity =>
    curiosity.planet?.toLowerCase() === planetName.toLowerCase()
  );
};