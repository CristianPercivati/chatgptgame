const resultadosDiv = document.getElementById("resultados");

console.log = function (message) {
  resultadosDiv.innerHTML += "<p>" + message + "</p>";
}

const dragonDeFuego = [{
  nombre: 'Dragón de Fuego',
  habilidades: ['Llamarada Ardiente', 'Garra Afilada'],
  vida: 200
}];

// Función para lanzar un dado de 6 caras
function lanzarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

// Función para atacar al enemigo
function atacar(enemigo, atacante, danio) {
  enemigo.vida -= danio;
  console.log(`${atacante.emoji} ${atacante.nombre} : atacó a ${enemigo.emoji} ${enemigo.nombre} con ${danio} de daño 🗡️.`);
  console.log(`${enemigo.emoji} ${enemigo.nombre} ahora tiene ${enemigo.vida} puntos de vida ❤️.`);
}

// Función para que el enemigo ataque a un personaje aleatorio
function enemigoAtaca(personajes, enemigo) {
  const objetivo = personajes[Math.floor(Math.random() * personajes.length)];
  const danio = lanzarDado() * 10;
  atacar(objetivo, enemigo, danio);
}

// Función para que un personaje ataque al enemigo
function personajeAtaca(personaje, enemigo) {
  const danio = lanzarDado() * 10 + personaje.equipo.length * 5;
  atacar(enemigo, personaje, danio);
}

// Función para que un personaje use una habilidad especial
function usarHabilidad(personaje, enemigo, habilidad) {
  if (personaje.habilidades.includes(habilidad)) {
    if (habilidad === 'Curación') {
      const curacion = lanzarDado() * 5 + personaje.equipo.length * 2;
      personaje.vida += curacion;
      console.log(`${personaje.emoji} ${personaje.nombre} se curó por ${curacion} puntos de vida.`);
      console.log(`${personaje.emoji} ${personaje.nombre} ahora tiene ${personaje.vida} puntos de vida.`);
    } else if (habilidad === 'Conjuro de Hielo') {
      const danio = lanzarDado() * 20;
      atacar(enemigo, personaje, danio);
      console.log(`${personaje.emoji} ${personaje.nombre} usó su habilidad "${habilidad}" y causó ${danio} de daño.`);
      console.log(`${enemigo.emoji} ${enemigo.nombre} ahora tiene ${enemigo.vida} puntos de vida.`);
    } else if (habilidad === 'Escudo de Fuego') {
      personaje.equipo.push('Escudo de Fuego');
      console.log(`${personaje.emoji} ${personaje.nombre} equipó el Escudo de Fuego.`);
    } else if (habilidad === 'Ataque Potente') {
      const danio = lanzarDado() * 30;
      atacar(enemigo, personaje, danio);
      console.log(`${personaje.emoji} ${personaje.nombre} usó su habilidad "${habilidad}" y causó ${danio} de daño.`);
      console.log(`${enemigo.emoji} ${enemigo.nombre} ahora tiene ${enemigo.vida} puntos de vida.`);
    }
  } else {
    console.log(`${personaje.emoji} ${personaje.nombre} no tiene la habilidad "${habilidad}".`);
  }
}

// Función para que un personaje recolecte un elemento sagrado
function recolectarElementoSagrado(personaje, elemento) {
  if (!personaje.equipo.includes(elemento)) {
    personaje.equipo.push(elemento);
    console.log(`${personaje.emoji} ${personaje.nombre} recolectó el elemento sagrado "${elemento}".`);
  } else {
    console.log(`${personaje.emoji} ${personaje.nombre} ya tiene el elemento sagrado "${elemento}".`);
  }
}

// Función para jugar una ronda
function jugarRonda(personajes, enemigo, elementosSagrados) {
  // Ordenar a los personajes aleatoriamente
  const personajesOrdenados = personajes.sort(() => Math.random() - 0.5);

  // Cada personaje ataca al enemigo
  for (let i = 0; i < personajesOrdenados.length; i++) {
    personajeAtaca(personajesOrdenados[i], enemigo);
  }

  // El enemigo ataca a un personaje aleatorio
  enemigoAtaca(personajes, enemigo);

  // Cada personaje puede usar una habilidad especial
  for (let i = 0; i < personajesOrdenados.length; i++) {
    const habilidadElegida = personajesOrdenados[i].habilidades[Math.floor(Math.random() * personajesOrdenados[i].habilidades.length)];
    usarHabilidad(personajesOrdenados[i], enemigo, habilidadElegida);
  }

  // Cada personaje puede recolectar un elemento sagrado
  for (let i = 0; i < personajesOrdenados.length; i++) {
    const elementoElegido = elementosSagrados[Math.floor(Math.random() * elementosSagrados.length)];
    recolectarElementoSagrado(personajesOrdenados[i], elementoElegido);
  }

  // Mostrar el estado de los personajes y el enemigo
  console.log(`Estado de los personajes:`);
  for (let i = 0; i < personajes.length; i++) {
    console.log(`❤️ ${personajes[i].emoji} ${personajes[i].nombre}: ${personajes[i].vida} puntos de vida, equipo: ${personajes[i].equipo.join(', ')}`);
  }
  // Comprobar si el enemigo ha sido derrotado
  if (enemigo.vida <= 0) {
    console.log(`¡${enemigo.emoji} ${enemigo.nombre} ha sido derrotado!`);
    return true; // Indicar que el enemigo ha sido derrotado
  }

  // Comprobar si todos los personajes han sido derrotados
  let personajesDerrotados = true;
  for (let i = 0; i < personajes.length; i++) {
    if (personajes[i].vida > 0) {
      personajesDerrotados = false;
      break;
    }
  }

  if (personajesDerrotados) {
    console.log(`¡Los personajes han sido derrotados!`);
    return true; // Indicar que los personajes han sido derrotados
  }

  return false; // Indicar que nadie ha sido derrotado aún
}

// Función principal del juego
function jugarJuego(personajes, enemigos, elementosSagrados) {
  let ronda = 1;
  while (enemigos.length > 0 && personajes.length > 0) {
    console.log(`Ronda ${ronda}:`);
    const enemigo = enemigos[Math.floor(Math.random() * enemigos.length)];
    console.log(`¡Un${enemigo.emoji} ${enemigo.nombre} salvaje apareció!`);
    while (!jugarRonda(personajes, enemigo, elementosSagrados)) {
      // Mientras nadie sea derrotado, seguir jugando rondas
    }

    // Si el enemigo ha sido derrotado, quitarlo de la lista de enemigos
    if (enemigo.vida <= 0) {
      enemigos.splice(enemigos.indexOf(enemigo), 1);
    }

    // Si todos los enemigos han sido derrotados, el juego termina
    if (enemigos.length === 0) {
      console.log(`¡Felicidades, has ganado el juego!`);
      return;
    }

    // Si todos los personajes han sido derrotados, el juego termina
    if (personajes.length === 0) {
      console.log(`¡Oh no, todos tus personajes han sido derrotados! Mejor suerte la próxima vez.`);
      return;
    }

    ronda++;
  }
}
// Definir los personajes, enemigos y elementos sagrados del juego
const personajes = [
  {
    nombre: 'Perci',
    vida: 100,
    equipo: ['Espada de Fuego'],
    habilidades: ['Conjuro de Hielo', 'Escudo de Fuego', 'Ataque Potente'],
    emoji: '🧔🏻'
  },
  {
    nombre: 'Manu',
    vida: 100,
    equipo: ['Vara de Rayos'],
    habilidades: ['Conjuro de Fuego', 'Escudo de Hielo', 'Ataque Rápido'],
    emoji: '💁‍♂️'
  },
  {
    nombre: 'Sergio',
    vida: 100,
    equipo: ['Arco de Viento'],
    habilidades: ['Conjuro de Viento', 'Escudo de Tierra', 'Ataque Cargado'],
    emoji: '🧔‍♂️'
  }
];

const enemigos = [
  {
    nombre: 'Goblin',
    vida: 50,
    danio: 10,
    emoji: '🧟'
  },
  {
    nombre: 'Esqueleto',
    vida: 75,
    danio: 15,
    emoji: '🧟'
  },
  {
    nombre: 'Ogro',
    vida: 100,
    danio: 20,
    emoji: '🧟'
  },
  {
    nombre: 'Demonio',
    vida: 150,
    danio: 30,
    emoji: '🧟'
  }
];

const elementosSagrados = [
  {
    nombre: 'Cáliz de la Luz',
    efecto: 'restaura 50 puntos de vida a todos los personajes'
  },
  {
    nombre: 'Espada de la Oscuridad',
    efecto: 'aumenta el daño de las habilidades en un 25% durante una ronda'
  },
  {
    nombre: 'Escudo Sagrado',
    efecto: 'otorga inmunidad a un personaje durante una ronda'
  }
];

// Iniciar el juego
jugarJuego(personajes, enemigos, elementosSagrados);