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
  tecnologias: [],
  autoresPorLetra: {},
  obrasPorAno: {},
  obrasPorPais: {},
  obrasPorCategoria: {},
  obrasPorTecnologia: {},
  autores: {}
}

let autoresProcesados = [];

for (let index in obras.lista) {
  let obra = obras.lista[index];
  let horribleIDs = [];

  for (let z = 0; z < obra.nombre.length; z++) {
    obra.nombre[z] = obra.nombre[z].trim();
    obra.apellido[z] = obra.apellido[z].trim();
    horribleIDs.push(`${obra.nombre[z]}_${obra.apellido[z]}`.replaceAll(/[. ]/gi, '_'));
  }

  obra.id = index;
  obra.autorId = horribleIDs;

  let autorIndex = 0;

  for (let horribleID of horribleIDs) {
    if (!autoresProcesados.includes(horribleID)) {
      autoresProcesados.push(horribleID);
      let inicial = obra.apellido[autorIndex][0].toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

      if (!obras.autoresPorLetra.hasOwnProperty(inicial)) {
        obras.autoresPorLetra[inicial] = [];
      }

      obras.autoresPorLetra[inicial].push({
        nombre: obra.nombre[autorIndex],
        apellido: obra.apellido[autorIndex],
        imagen: obra.captura_grande,
        id: horribleID
      });

      obras.iniciales.push(inicial);

      obras.autores[horribleID] = {
        nombre: obra.nombre[autorIndex],
        apellido: obra.apellido[autorIndex],
        biografia: obra.biografia[autorIndex],
        obras: []
      }
    }

    obras.autores[horribleID].obras.push({
      id: index,
      titulo: obra.titulo
    });

    autorIndex++;
  }
  // Fin for

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

  // Categorías y tecnologías
  for (let tipo of ['categorias', 'tecnologias']) {
    for (let nombre of obra[tipo]) {
      nombre = nombre.trim();
      obras[tipo].push(nombre);

      let objColector = obras.obrasPorTecnologia;

      if (tipo === 'categorias') {
        objColector = obras.obrasPorCategoria;
      }

      if (!objColector.hasOwnProperty(nombre)) {
        objColector[nombre] = [];
      }

      objColector[nombre].push(obra);
    }
  }
}
// Ordenemos toda la información
obras.anos = [...new Set(obras.anos)].sort();
obras.iniciales = [...new Set(obras.iniciales)].sort();
obras.categorias = [...new Set(obras.categorias)].sort();
obras.tecnologias = [...new Set(obras.tecnologias)].sort();
obras.paises = [...new Set(obras.paises)].sort((a, b) => {
  let A = a.toUpperCase();
  let B = b.toUpperCase();

  return (A < B) ? -1 : (A > B) ? 1 : 0;
});

for (let inicial of obras.iniciales) {
  obras.autoresPorLetra[inicial].sort((a, b) => (a.apellido > b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0));
}

const ordenPorTitulo = (a, b) => {
  let A = a.titulo.toUpperCase();
  let B = b.titulo.toUpperCase();

  return (A < B) ? -1 : (A > B) ? 1 : 0;
}

for (let ano of obras.anos) {
  obras.obrasPorAno[ano].sort(ordenPorTitulo);
}

for (let pais of obras.paises) {
  obras.obrasPorPais[pais].sort(ordenPorTitulo);
}

for (let categoria of obras.categorias) {
  obras.obrasPorCategoria[categoria].sort(ordenPorTitulo);
}

for (let tecnologia of obras.tecnologias) {
  obras.obrasPorTecnologia[tecnologia].sort(ordenPorTitulo);
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
