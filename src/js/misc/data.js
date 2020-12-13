import obrasData from '../../data/obras.json'
import Vue from 'vue';

const data = {
  lista: obrasData['obras']
}

data.install = function () {
  Object.defineProperty(Vue.prototype, '$obras', {
    get() {
      return data
    }
  })
}

export default data;
