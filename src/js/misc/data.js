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
  paises: [],
  categorias: [],
  autoresPorLetra: {},
  obrasPorAno: {},
  obrasPorPais: {},
  obrasPorCategoria: {},
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

  // Años
  let ano = obra.ano.match(/\D/) ? obra.ano.split(/\D/)[0] : obra.ano;
  obras.anos.push(ano);

  if (!obras.obrasPorAno.hasOwnProperty(ano)) {
    obras.obrasPorAno[ano] = [];
  }

  obras.obrasPorAno[ano].push(obra);

  // Países
  let pais = obra.pais;
  obras.paises.push(pais);

  if (!obras.obrasPorPais.hasOwnProperty(pais)) {
    obras.obrasPorPais[pais] = [];
  }

  obras.obrasPorPais[pais].push(obra);

  // Categorias
  for (let categoria of obra.categorias) {
    categoria = categoria.trim();
    obras.categorias.push(categoria);

    if (!obras.obrasPorCategoria.hasOwnProperty(categoria)) {
      obras.obrasPorCategoria[categoria] = [];
    }

    obras.obrasPorCategoria[categoria].push(obra);
  }
}

// Ordenemos toda la información
obras.anos = [...new Set(obras.anos)].sort();
obras.iniciales = [...new Set(obras.iniciales)].sort();
obras.categorias = [...new Set(obras.categorias)].sort();
obras.paises = [...new Set(obras.paises)].sort((a, b) => {
  let A = a.toUpperCase();
  let B = b.toUpperCase();

  return (A < B) ? -1 : (A > B) ? 1 : 0;
});

for (let inicial of obras.iniciales) {
  obras.autoresPorLetra[inicial].sort((a, b) => (a.apellido > b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0));
}

const ordenPorTitulo = (a, b) => (a.titulo > b.titulo) ? 1 : ((b.titulo > a.titulo) ? -1 : 0);

for (let ano of obras.anos) {
  obras.obrasPorAno[ano].sort(ordenPorTitulo);
}

for (let pais of obras.paises) {
  obras.obrasPorPais[pais].sort(ordenPorTitulo);
}

for (let categoria of obras.categorias) {
  obras.obrasPorCategoria[categoria].sort(ordenPorTitulo);
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
