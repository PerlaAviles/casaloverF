document.addEventListener('DOMContentLoaded', () => {
    setInterval(fetchUltimosComandos, 1000); // Consulta la API cada segundo
});

let ultimoComandoId = null; // Guarda el ID del último comando procesado
let alarmaActiva = false; // Estado inicial de la alarma

function fetchUltimosComandos() {
  fetch('https://6669e8182e964a6dfed713ee.mockapi.io/casa')
    .then(response => response.json())
    .then(data => {
      const ultimoComando = data[data.length - 1];
      if (!ultimoComandoId || ultimoComandoId !== ultimoComando.id) {
        ultimoComandoId = ultimoComando.id;
        procesarComando(ultimoComando);
      }
    })
    .catch(error => console.error('Error al obtener comandos:', error));
}

function procesarComando(comando) {
  actualizarImagenes(comando);
}

function actualizarImagenes(comando) {
  const accion = comando.comando.includes("enciende");

  // Ventilador
  if (comando.comando.includes("ventilador")) {
    document.getElementById('ventilador').src = accion ? 'img/ventilador2.gif' : 'img/ventilador.png';
  }




//PERSIANAS
function procesarComando(comando) {
    const accion = comando.comando.includes("enciende"); // true = abrir, false = cerrar
    console.log('Procesar comando:', comando.comando, 'Accion:', accion);
    if (comando.comando.includes("cortinas")) {
        controlarPersianas(accion);
    }
}

function controlarPersianas(accion) {
    const persianas = ['persiana1', 'persiana2', 'persiana3'];
    console.log('Controlando persianas, Acción:', accion ? 'Abrir' : 'Cerrar');
    persianas.forEach(id => {
        const persiana = document.getElementById(id);
        if (accion && !persianasAbiertas) {
            persiana.src = 'img/persiana2.gif'; // Muestra el GIF de abrir
            console.log('Abriendo persiana:', id);
        } else if (!accion && persianasAbiertas) {
            persiana.src = 'img/persiana1.png'; // Cambia a la imagen de cerradas
            console.log('Cerrando persiana:', id);
        }
    });
    persianasAbiertas = accion; // Actualiza el estado global de las persianas
}




  // Cámaras
  ['camara1', 'camara2', 'camara3'].forEach(id => {
    if (comando.comando.includes("cámaras de seguridad")) {
      document.getElementById(id).src = accion ? 'img/camara2.png' : 'img/camara1.png';
    }
  });

  
  // Focos
  // Focos del Jardín
  const focosJardin = ['foco1', 'foco2', 'foco3', 'foco4', 'foco7'];
  if (comando.comando.includes("luz del jardín")) {
    focosJardin.forEach(id => {
      document.getElementById(id).src = accion ? 'img/foco2.png' : 'img/foco1.png';
      console.log('Cambiando luz del jardín, Foco', id, 'a', accion ? 'Encendido' : 'Apagado');
    });
  }
  
  const focos = {
    //'jardín': ['foco1', 'foco2', 'foco3', 'foco4', 'foco7'],
    'recámara': ['foco5'],
    'sala': ['foco6']
  };
  
  Object.entries(focos).forEach(([seccion, ids]) => {
    if (comando.comando.includes("luz de la " + seccion)) {
      ids.forEach(id => {
        document.getElementById(id).src = accion ? 'img/foco2.png' : 'img/foco1.png';
        console.log('Cambiando luz de la', seccion, ', Foco', id, 'a', accion ? 'Encendido' : 'Apagado');
      });
    }
  });

  
  // Alarma
  if (comando.comando.includes("alarma de la casa")) {
    document.getElementById('alarma').src = accion ? 'img/alarma2.png' : 'img/alarma1.png';
    manejarAlarma(accion);
  }
}

function manejarAlarma(activar) {
  const alarmaSound = document.getElementById('alarmaSound');
  if (activar && !alarmaActiva) {
    alarmaSound.play();
    alarmaActiva = true;
  } else if (!activar && alarmaActiva) {
    alarmaSound.pause();
    alarmaSound.currentTime = 0; // Reinicia el audio
    alarmaActiva = false;
  }
}
