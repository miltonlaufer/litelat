/**
 * Limpia las classes de cada página
 */

export default {
  data() {
    return {
      closingEyesId: null
    }
  },
  created() {
    document.body.classList.remove(...document.body.classList);

    if (document.getElementById('generalWrapper')) {
      document.getElementById('generalWrapper').classList
        .remove(...document.getElementById('generalWrapper').classList);
      document.getElementById('generalWrapper').classList.add('col');
    }
  },
  mounted() {
    this.$nextTick(() => {
      let mainObj = document.getElementById('main');

      if (mainObj) mainObj.classList.remove(...mainObj.classList);

      if (typeof this['afterScroll'] == "function") {
        setTimeout(this['afterScroll'], 100);
      }

      this.closingEyesId = setInterval(() => {
        this.closeSomeEyes();
      }, 3000);
    });
  },
  beforeDestroy() {
    clearInterval(this.closingEyesId);
  },
  methods: {
    isHovered(elem) {
      const style = window.getComputedStyle(elem)
      const matrix = style.transform || style.webkitTransform || style.mozTransform;

      // Workaround: si el elemento está hovered, entonces se agranda y los cálculos se distorsionan
      if (matrix !== 'none') {
        // Lo de abajo toma el valor de CSS "transform: scale"
        return (matrix.substring(7, matrix.length - 1).split(',')[0].trim() !== '1');
      }

      return false;
    },
    closeSomeEyes() {
      let elems = document.getElementsByClassName('eye');

      if (!elems.length) return false;

      let numeroDeOjos = this.dameUnNumeroAlAzar(elems.length *.04);
      let delay = 0;

      while (numeroDeOjos) {
        let isAvailable = false;
        let elem = null;

        while (!isAvailable) {
          elem = elems[this.dameUnNumeroAlAzar(elems.length)];
          isAvailable = !elem.classList.contains('closing') && !this.isHovered(elem);
        }

        setTimeout(() => {
          elem.classList.add('closing');
          setTimeout(() => elem.classList.remove('closing'), 300);
        }, delay += this.dameUnNumeroAlAzar(3000));

        numeroDeOjos--;
      }
    },
    dameUnNumeroAlAzar(maximo) {
      return Math.floor(Math.random() * maximo)
    },
    // Este método sólo es usado por algunos componentes (los que tienen listados)
    setEvents: function () {
      Array.from(document.getElementsByClassName('volver')).forEach(obj => obj.addEventListener('click', (s) => {
        window.scrollTo(0, 0);
      }));

      Array.from(document.getElementsByClassName('letras-links')).forEach(obj =>
        obj.addEventListener('click', e => {
          e.preventDefault();

          let tipo = e.target.getAttribute('rel');
          window.history.pushState(null, document.title, `${window.location.href.split("#")[0]}#${tipo}`);
          this.goToAnchor(tipo);
        })
      );
    },
    normalizeString(string) {
      return string.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    },
    goToAnchor(tipo) {
      setTimeout(() => {
        let position = document.getElementById(tipo).getBoundingClientRect().top;
        window.scrollTo(0, position - (window.innerHeight / 5));
      }, 1);
    }
  }
}
