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
    // Dado que es SPA, hay que llevar el scroll arriba (particularmente en mobiles)
    window.scrollTo(0, 0);

    let mainObj = document.getElementById('main');

    if (mainObj) mainObj.classList.remove(...mainObj.classList);
  },
  methods: {
    // Este método sólo es usado por algunos componentes (los que tienen listados)
    setEvents: function () {
      Array.from(document.getElementsByClassName('volver')).forEach(obj => obj.addEventListener('click', _ => {
        console.log('back listados');
        window.scrollTo(0, 0);
      }));

      Array.from(document.getElementsByClassName('letras-links')).forEach(obj =>
        obj.addEventListener('click', e => {
          e.preventDefault();

          let inicial = e.target.getAttribute('rel');
          let position = document.getElementById(inicial).getBoundingClientRect().top;
          window.history.pushState(null, document.title, `${window.location.href.split("#")[0]}#${inicial}`);

          setTimeout(() => {
              window.scrollTo(0, position + window.scrollY - (window.innerHeight / 5))
            }, 1
          );
        })
      );
    },
    normalizeString(string) {
      return string.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    },
    checkAnchor() {
      let anchor = decodeURI(this.$route.hash.substring(1));

      if (anchor) {
        setTimeout(() => {
            let position = document.getElementById(anchor).getBoundingClientRect().top;
            window.scrollTo(0, position - 200)
          }, 1000
        );
      }
    }
  },
}
