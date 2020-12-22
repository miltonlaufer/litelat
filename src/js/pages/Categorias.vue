<template>
  <listado-texto :tipos-lista="categorias" :obras-por-tipo="obrasPorCategoria" :definiciones="categoriasDefinicion"></listado-texto>
</template>

<script>
import mixins from "../misc/mixins";
import categoriasDefinicion from '../../data/categorias.json'
import listadosTexto from "../components/listadosTexto";

export default {
  name: "Categorias.vue",
  components: {
    'listado-texto': listadosTexto
  },
  data() {
    return {
      obrasPorCategoria: this.$obras.obrasPorCategoria,
      categorias: this.$obras.categorias,
      categoriasDefinicion: categoriasDefinicion['categorias']
    }
  }
}
</script>

<style scoped>

</style>
