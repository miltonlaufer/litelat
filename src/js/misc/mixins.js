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

    let mainObj = document.getElementById('main');

    if (mainObj) mainObj.classList.remove(...mainObj.classList);

    if (this.$route.name === 'splash') {
      mainObj.classList.add('home');
    }
  },
  methods: {
    getAutores(obra) {
      let autores = [];

      for (let z = 0; z < obra.autorId.length; z++) {
        autores.push({
          nombre: obra.nombre[z],
          apellido: obra.apellido[z],
          autorId: obra.autorId[z]
        })
      }

      return autores;
    }
  }
}