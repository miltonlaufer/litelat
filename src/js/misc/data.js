/**
 * Plugin para almacenar la información de las obras
 * Disponible en todos los componentes a través de this.$obras.lista
 */

import obrasData from '../../data/obras.json'
import Vue from 'vue';

const obras = {
  lista: obrasData['obras'],
  iniciales: [],
  anos: [],
  autoresPorLetra: {},
  obrasPorAno: {},
  autores: {}
}

let autoresProcesados = [];

for (let index in obras.lista) {
  let obra = obras.lista[index];
  let horribleID = `${obra.nombre}_${obra.apellido}`.replaceAll(/[\. ]/gi, '_');
  obra.id = index;
  obra.autorId = horribleID;

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

  let ano = obra.ano.match(/\D/) ? obra.ano.split(/\D/)[0] : obra.ano;
  obras.anos.push(ano);

  if (!obras.obrasPorAno.hasOwnProperty(ano)) {
    obras.obrasPorAno[ano] = [];
  }

  obras.obrasPorAno[ano].push(obra);
}

// Ordenemos todo
obras.anos = [...new Set(obras.anos)].sort();
obras.iniciales = [...new Set(obras.iniciales)].sort();

for (let inicial of obras.iniciales) {
  obras.autoresPorLetra[inicial].sort((a, b) => (a.apellido > b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0));
}

for (let ano of obras.anos) {
  obras.obrasPorAno[ano].sort((a, b) => (a.titulo > b.titulo) ? 1 : ((b.titulo > a.titulo) ? -1 : 0));
}

// Esto convierte al objeto en un plugin de VUE
obras.install = function () {
  Object.defineProperty(Vue.prototype, '$obras', {
    get() {
      return obras
    }
  })
}

export default obras;
