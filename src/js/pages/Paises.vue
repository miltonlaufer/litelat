<template>
  <listado-texto :tipos-lista="paises" :obras-por-tipo="obrasPorPais"></listado-texto>
</template>

<script>
import mixins from "../misc/mixins";
import listadosTexto from "../components/listadosTexto";

export default {
  name: "Categorias.vue",
  components: {
    'listado-texto': listadosTexto
  },
  data() {
    return {
      obrasPorPais: this.$obras.obrasPorPais,
      paises: this.$obras.paises
    }
  }
}
</script>

<style scoped>

</style>
