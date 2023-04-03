const dragonDeFuego = [{
  nombre: 'Dragón de Fuego',
  habilidades: ['Llamarada Ardiente', 'Garra Afilada'],
  vida: 200
}];

// Función para lanzar un dado de 6 caras
function lanzarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

//función para agregar la narración en pantalla

function createNewLine(type, content, className){
    const newElement = document.createElement(type)
    newElement.className = className
    newElement.textContent = content
    document.querySelector('#role-narration-container').appendChild(newElement)
}

//función para determinar un número aleatorio

const randomNumber = (range) => {
return Math.floor(Math.random() * range)
}

function startGame(){
    document.querySelectorAll('input[type=text]').forEach((element) => element.disabled = true )
    document.querySelectorAll('select').forEach((element) => element.disabled = true )
    document.querySelector('#button-start').disabled = true
    const player1 = {
        name: document.querySelector('#player1-name').value, 
        item: document.querySelector('#player1-item').value, 
        attack: document.querySelector('#player1-attack').value, 
        spell: document.querySelector('#player1-spell').value, 
        shield: document.querySelector('#player1-shield').value
    }
    const player2 = {
        name: document.querySelector('#player2-name').value, 
        item: document.querySelector('#player2-item').value, 
        attack: document.querySelector('#player2-attack').value, 
        spell: document.querySelector('#player2-spell').value, 
        shield: document.querySelector('#player2-shield').value
    }
    const player3 = {
        name: document.querySelector('#player3-name').value, 
        item: document.querySelector('#player3-item').value, 
        attack: document.querySelector('#player3-attack').value, 
        spell: document.querySelector('#player3-spell').value, 
        shield: document.querySelector('#player3-shield').value
    }

    const personajes = [
        {
        nombre: player1.name,
        vida: 100,
        equipo: [{nombre: player1.item}],
        habilidades: [player1.attack,player1.spell,player1.shield]
        }, {
        nombre: player2.name,
        vida: 100,
        equipo: [{nombre: player2.item}],
        habilidades: [player2.attack,player2.spell,player2.shield]
        },
        {
        nombre: player3.name,
        vida: 100,
        equipo: [{nombre: player3.item}],
        habilidades: [player3.attack,player3.spell,player3.shield]
        }
];
// Definir los personajes, enemigos y elementos sagrados del juego

const ataques = [
    {
      tipo: 'ataque',
      nombre: 'ataque potente',
      daño: 30
    },
    {
      tipo: 'ataque',
      nombre: 'ataque rapido',
      daño: 15
    },
    {
      tipo: 'ataque',
      nombre: 'ataque cargado',
      daño: 50
    }]
  const conjuros = [
    {
      tipo: 'conjuro',
      nombre: 'conjuro de hielo',
      daño: 20
    },
    {
      tipo: 'conjuro',
      nombre: 'conjuro de fuego',
      daño: 15
    },
    {
      tipo: 'conjuro',
      nombre: 'conjuro de viento',
      daño: 30
    }]
    const escudos = [
    {
      tipo: 'escudo',
      nombre: 'escudo de hielo',
      defensa: 30
    },
    {
      tipo: 'escudo',
      nombre: 'escudo de fuego',
      defensa: 15
    },
    {
      tipo: 'escudo',
      nombre: 'escudo de tierra',
      defensa: 50
    }]
  
  
      
      const enemigos = [
      {
      nombre: 'Goblin',
      vida: 50,
      danio: 10
      },
      {
      nombre: 'Esqueleto',
      vida: 75,
      danio: 15
      },
      {
      nombre: 'Ogro',
      vida: 100,
      danio: 20
      },
      {
      nombre: 'Demonio',
      vida: 150,
      danio: 30
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
  
  console.log(personajes[0].equipo[0].nombre)
      
      // Iniciar el juego
      jugarJuego(personajes, enemigos, elementosSagrados);
}

document.querySelector("#player1-name").addEventListener("keyup", function(e) {
    const newValue = document.querySelector("#player1-name").value;
    console.log(newValue)
    if (newValue===''){
        document.querySelector("#player1-title").innerHTML="Jugador 1";
    } else {
        document.querySelector("#player1-title").innerHTML=newValue;
    }
  });
document.querySelector("#player2-name").addEventListener("keyup", function(e) {
    const newValue = document.querySelector("#player2-name").value;
    console.log(newValue)
    if (newValue===''){
        document.querySelector("#player2-title").innerHTML="Jugador 1";
    } else {
        document.querySelector("#player2-title").innerHTML=newValue;
    }
  });
  document.querySelector("#player3-name").addEventListener("keyup", function(e) {
    const newValue = document.querySelector("#player3-name").value;
    console.log(newValue)
    if (newValue===''){
        document.querySelector("#player3-title").innerHTML="Jugador 1";
    } else {
        document.querySelector("#player3-title").innerHTML=newValue;
    }
  });
document.querySelector("#button-start").addEventListener("click", startGame);



function playerUpdateTitle(player){
    document.querySelector(`#${player}-title`).innerHTML = document.querySelector(`#${player}-name`)
}

// Función para atacar al enemigo
function atacar(enemigo, atacante, danio) {
  enemigo.vida -= danio;
  createNewLine("div",`${atacante.nombre} atacó a ${enemigo.nombre} con ${danio} de daño.`, 'row');
  createNewLine("div",`${enemigo.nombre} ahora tiene ${enemigo.vida} puntos de vida.`, 'row');
}

// Función para que el enemigo ataque a un personaje aleatorio
function enemigoAtaca(personajes, enemigo) {
  const objetivo = personajes[randomNumber(personajes.length)];
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
      createNewLine("div",`${personaje.nombre} se curó por ${curacion} puntos de vida.`, 'row');
      createNewLine("div",`${personaje.nombre} ahora tiene ${personaje.vida} puntos de vida.`, 'row');
    } else if (habilidad.tipo === 'conjuro') {
        const danio = lanzarDado() * habilidad.daño;
        atacar(enemigo, personaje, danio);
        createNewLine("div",`${personaje.nombre} usó su habilidad "${habilidad.nombre}" y causó ${danio} de daño.`, 'row');
        createNewLine("div",`${enemigo.nombre} ahora tiene ${enemigo.vida} puntos de vida.`, 'row');
        } else if (habilidad.tipo === 'escudo') {
        personaje.equipo.push({nombre: 'Escudo de Fuego'});
        createNewLine("div",`${personaje.nombre} equipó el ${habilidad.nombre}`, 'row');
        } else if (habilidad.tipo === 'ataque') {
        const danio = lanzarDado() * habilidad.daño;
        atacar(enemigo, personaje, danio);
        createNewLine("div",`${personaje.nombre} usó su habilidad "${habilidad.nombre}" y causó ${danio} de daño.`, 'row');
        createNewLine("div",`${enemigo.nombre} ahora tiene ${enemigo.vida} puntos de vida.`, 'row');
        }
        } else {
        createNewLine("div",`${personaje.nombre} no tiene la habilidad "${habilidad.nombre}".`, 'row');
        }
        }
        
        // Función para que un personaje recolecte un elemento sagrado
        function recolectarElementoSagrado(personaje, elemento) {
        if (!personaje.equipo.includes(elemento)) {
        personaje.equipo.push(elemento);
        createNewLine("div",`${personaje.nombre} recolectó el elemento sagrado "${elemento.nombre}".`, 'row');
        } else {
        createNewLine("div",`${personaje.nombre} ya tiene el elemento sagrado "${elemento.nombre}".`, 'row');
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
        const habilidadElegida = personajesOrdenados[i].habilidades[randomNumber(personajesOrdenados[i].habilidades.length)];
        usarHabilidad(personajesOrdenados[i], enemigo, habilidadElegida);
        }
        
        // Cada personaje puede recolectar un elemento sagrado
        for (let i = 0; i < personajesOrdenados.length; i++) {
        const elementoElegido = elementosSagrados[randomNumber(elementosSagrados.length)];
        recolectarElementoSagrado(personajesOrdenados[i], elementoElegido);
        }
        
        // Mostrar el estado de los personajes y el enemigo
        createNewLine("div",`Estado de los personajes:`, 'row');
        for (let i = 0; i < personajes.length; i++) {
            const equipoNombres = []
            for (let j = 0; j<personajes[i].equipo.length; j++){
                equipoNombres.push(personajes[i].equipo[j].nombre)
            }
        createNewLine("div",`${personajes[i].nombre}: ${personajes[i].vida} puntos de vida, equipo: ${equipoNombres} `, 'row');
        }
        // Comprobar si el enemigo ha sido derrotado
if (enemigo.vida <= 0) {
    createNewLine("div",`¡${enemigo.nombre} ha sido derrotado!`, 'row');
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
    createNewLine("div",`¡Los personajes han sido derrotados!`, 'row');
    return true; // Indicar que los personajes han sido derrotados
    }
    
    return false; // Indicar que nadie ha sido derrotado aún
    }
    
    // Función principal del juego
    function jugarJuego(personajes, enemigos, elementosSagrados) {
    let ronda = 1;
    while (enemigos.length > 0 && personajes.length > 0) {
    createNewLine("h2",`Ronda ${ronda}:`, 'text-center my-3');
    const enemigo = enemigos[randomNumber(enemigos.length)];
    createNewLine("h3",`¡Un ${enemigo.nombre} salvaje apareció!`, 'text-center');
    while (!jugarRonda(personajes, enemigo, elementosSagrados)) {
        // Mientras nadie sea derrotado, seguir jugando rondas
      }
      
      // Si el enemigo ha sido derrotado, quitarlo de la lista de enemigos
      if (enemigo.vida <= 0) {
        enemigos.splice(enemigos.indexOf(enemigo), 1);
      }
      
      // Si todos los enemigos han sido derrotados, el juego termina
      if (enemigos.length === 0) {
        createNewLine("h2",`¡Felicidades, has ganado el juego!`, 'text-center my-3');
        return;
      }
      
      // Si todos los personajes han sido derrotados, el juego termina
      if (personajes.length === 0) {
        createNewLine("h2",`¡Oh no, todos tus personajes han sido derrotados! Mejor suerte la próxima vez.`, 'text-center my-3');
        return;
      }
      
      ronda++;
    }
}
