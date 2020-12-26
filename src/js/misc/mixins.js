/**
 * Limpia las classes de cada página
 */

export default {
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
    });
  },
  methods: {
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
