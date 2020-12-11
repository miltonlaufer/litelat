<template>
  <div class="eyes-grid" style="text-align: center">
    <router-link
      :to="{ name: 'obras'}">
    <div class="eye">

      <div class="eye-shape">

        <div class="content"
             :style="'background-image: url(https://ip-poetry.findelmundo.com.ar/grafica/01.jpg);'">
          <h2 class="title">Obras</h2>
        </div>

      </div>

    </div></router-link>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$parent.$emit('routeChanged', this.$route.name);
    }
  }
</script>

<style scoped>

</style>
