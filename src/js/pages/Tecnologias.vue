<template>
  <listado-texto :tipos-lista="tecnologias" :obras-por-tipo="obrasPorTecnologia"></listado-texto>
</template>

<script>
import mixins from "../misc/mixins";
import listadosTexto from "../components/listadosTexto";

export default {
  name: "Categorias.vue",
  mixins: [mixins],
  components: {
    'listado-texto': listadosTexto
  },
  data() {
    return {
      obrasPorTecnologia: this.$obras.obrasPorTecnologia,
      tecnologias: this.$obras.tecnologias
    }
  }
}
</script>

<style scoped>

</style>
