<template>
  <div>
    <div class="eyes-grid home">
      <div class="eye">
        <router-link
          :to="{ name: 'categorias'}"></router-link>
        <div class="eye-shape">
          <div class="content" style="background-image: url(dist/images/obras/joseaburto-paranoicoarcoiris-2.png);">
            <h2 class="title">Categorías</h2>
          </div>
        </div>
      </div>
      <div class="eye">
        <router-link
          active-class="active"
          class="nav-link"
          :to="{ name: 'acerca' }"></router-link>
        <div class="eye-shape">
          <div class="content"
               style="background-image: url(dist/images/obras/miltonlaufer-codigos-2.png);">
            <h2 class="title">Acerca De</h2>
          </div>
        </div>
      </div>
      <div class="eye">
        <router-link
          :to="{ name: 'autores'}"></router-link>
        <div class="eye-shape">
          <div class="content"
               style="background-image: url(dist/images/obras/marianneteixido-dialogoiterante-2.png);">
            <h2 class="title">Autores</h2>
          </div>
        </div>
      </div>
      <div class="eye">
        <router-link
          :to="{ name: 'fecha'}"></router-link>
        <div class="eye-shape">
          <div class="content"
               style="background-image: url(dist/images/obras/eduardokac-nao-2.png);">
            <h2 class="title">Año</h2>
          </div>
        </div>
      </div>

      <div class="eye">
        <div class="eye-shape">
          <router-link
            :to="{ name: 'obras'}"></router-link>
          <div class="content"
               :style="'background-image: url(dist/images/obras/ip-poetry-gustavo-romano.jpg);'">
            <h2 class="title">Obras</h2>
          </div>

        </div>

      </div>
      <div class="eye">
        <router-link
          active-class="active"
          class="nav-link"
          :to="{ name: 'obra' , params: {id: obraId}}"></router-link>
        <div class="eye-shape">
          <div class="content"
               style="background-image: url(dist/images/obras/doctorovich-aswtz-2.png);">
            <h2 class="title">Descubrir</h2>
          </div>
        </div>
      </div>
      <div class="eye">
        <router-link
          :to="{ name: 'paises'}"></router-link>
        <div class="eye-shape">
          <div class="content"
               style="background-image: url(dist/images/obras/eugeniotisselli-latiraniadecodigo-2.png);">
            <h2 class="title">País</h2>
          </div>
        </div>
      </div>
    </div>
    <h2 class="home-intro">Recorridos por el arte de la palabra electrónica (1965-2019): 81 obras, 52 autores, 6
      idiomas, 22 categorías y 10 países de América Latina y el Caribe.
    </h2>
    <div class="footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col text-right"><img src="dist/images/logo_litelat_footer.png" width="240"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "../misc/mixins";

export default {
  mixins: [mixins],
  mounted() {
    this.$nextTick(() => {
      document.body.classList.add("home");
    });
  },
  computed: {
    obraId: function () {
      return Math.ceil(Math.random() * Object.keys(this.$obras.lista).length);
    }
  }
}
</script>

<style scoped>

</style>
