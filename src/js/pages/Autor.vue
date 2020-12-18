<template>
  <div class="row ficha-autor">
    <div class="col">
      <h1 class="subtitle">{{ autor.nombre }} {{ autor.apellido }}</h1>
      <p v-html="bio"></p>

      <h1 class="subtitle">Obras en la antología</h1>
      <router-link v-for="obra in autor.obras" :key="obra.id"
                   :to="{ name: 'obra' , params: {id: obra.id}}">{{ obra.titulo }} <br></router-link>

    </div>
  </div>
</template>

<script>
import mixins from "../misc/mixins";

export default {
  name: "Autor.vue",
  mixins: [mixins],
  mounted() {
    this.$nextTick(() => {
      document.body.classList.add("ficha");
      document.getElementById('generalWrapper').classList.add('ficha-wrapper');
    });
  },
  computed: {
    autor() {
      return this.$obras.autores[this.$route.params.id]
    },
    bio() {
      let div = document.createElement('div');
      div.innerHTML = this.autor.biografia;

      for (let myA of div.getElementsByTagName('a')) {
        myA.setAttribute('target', '_blank');
      }

      return div.innerHTML;
    }
  }
}
</script>

<style scoped>

</style>
