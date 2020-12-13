/**
 * Plugin para almacenar la información de las obras
 * Disponible en todos los componentes a través de this.$obras.lista
 */

import obrasData from '../../data/obras.json'
import Vue from 'vue';

const obras = {
  lista: obrasData['obras']
}

obras.install = function () {
  Object.defineProperty(Vue.prototype, '$obras', {
    get() {
      return obras
    }
  })
}

export default obras;
