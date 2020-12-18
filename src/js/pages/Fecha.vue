<template>
  <listado-texto :tipos-lista="anos" :obras-por-tipo="obrasPorAno"></listado-texto>
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
      obrasPorAno: this.$obras.obrasPorAno,
      anos: this.$obras.anos
    }
  }
}
</script>

<style scoped>

</style>
