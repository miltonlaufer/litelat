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

      this.closeSomeEyes();
      this.closingEyesId = setInterval(() => {
        this.closeSomeEyes();
      }, 5000);
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
      if (matrix !== 'none' && matrix) {
        // Lo de abajo toma el valor de CSS "transform: scale"
        return (matrix.substring(7, matrix.length - 1).split(',')[0].trim() !== '1');
      }

      return false;
    },
    closeSomeEyes() {
      let elems = Array.from(document.getElementsByClassName('eye')).filter(obj => this.estaEnPantalla(obj));

      if (!elems.length) return false;

      let numeroDeOjos = this.dameUnNumeroAlAzar(Math.pow((elems.length * .01) + 1.5, 2));
      let delay = 0;

      while (numeroDeOjos) {
        let isAvailable = false;
        let elem = null;

        while (!isAvailable) {
          elem = elems[this.dameUnNumeroAlAzar(elems.length)];
          isAvailable = !elem.classList.contains('closing') && !this.isHovered(elem);
        }

        setTimeout(() => {
          if (this.isHovered(elem)) return false;

          elem.classList.add('closing');
          setTimeout(() => elem.classList.remove('closing'), 350);
        }, delay += this.dameUnNumeroAlAzar(1500) + 600);

        numeroDeOjos--;
      }
    },
    dameUnNumeroAlAzar(maximo) {
      return Math.floor(Math.random() * maximo)
    },
    // Este método sólo es usado por algunos componentes (los que tienen listados)
    setEvents: function () {
      Array.from(document.getElementsByClassName('volver')).forEach(obj => obj.addEventListener('click', () => {
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
    goToAnchor(tipo) {
      setTimeout(() => {
        let position = document.getElementById(window.normalizeString(tipo)).getBoundingClientRect().top;
        window.scrollTo(0, position - (window.innerWidth < 1200 ? (window.innerHeight / 5) : 0));
      }, 1);
    },
    estaEnPantalla(elem) {
      const rect = elem.getBoundingClientRect();
      const height = (window.innerHeight || document.documentElement.clientHeight);

      return (
        (rect.top >= 0 && rect.top <= height) ||
        (rect.bottom >= 0 && rect.bottom <= height)
      );
    },
    normalizeString(string) {
      return window.normalizeString(string);
    }
  }
}
