/**
 * Plugin para almacenar la información de las obras
 * Disponible en todos los componentes a través de this.$obras.lista
 */

import obrasData from '../../data/obras.json'
import Vue from 'vue';

const obras = {
  lista: obrasData['obras'],
  iniciales: [],
  autoresPorLetra: {},
  autores: {}
}

let autoresProcesados = [];

for (let index in obras.lista) {
  let obra = obras.lista[index];
  let horribleID = `${obra.nombre}_${obra.apellido}`.replaceAll(' ', '_');

  if (!autoresProcesados.includes(horribleID)) {
    autoresProcesados.push(horribleID);
    let inicial = obra.apellido[0].toUpperCase();
    obras.iniciales.push(inicial);

    if (!obras.autoresPorLetra.hasOwnProperty(inicial)) {
      obras.autoresPorLetra[inicial] = [];
    }

    obras.autoresPorLetra[inicial].push({
      nombre: obra.nombre,
      apellido: obra.apellido,
      imagen: obra.captura_grande,
      id: horribleID
    });

    obras.autores[horribleID] = {
      nombre: obra.nombre,
      apellido: obra.apellido,
      biografia: obra.biografia,
      obras: []
    }
  }

  obras.autores[horribleID].obras.push({
    id: index,
    titulo: obra.titulo
  })
}

obras.iniciales = [...new Set(obras.iniciales)].sort();

for (let inicial of obras.iniciales) {
  obras.autoresPorLetra[inicial].sort((a, b) => (a.apellido > b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0));
}

obras.install = function () {
  Object.defineProperty(Vue.prototype, '$obras', {
    get() {
      return obras
    }
  })
}

export default obras;
