<template>
  <div>
    <div class="eyes-grid home">
      <div class="eye"><a href="#"></a>
        <div class="eye-shape">
          <div class="content" style="background-image: url(dist/images/obras/joseaburto-paranoicoarcoiris-2.png);">
            <h2 class="title">Categorías</h2>
          </div>
        </div>
      </div>
      <div class="eye"><a href="#"></a>
        <div class="eye-shape">
          <div class="content"
               style="background-image: url(dist/images/obras/miltonlaufer-codigos-2.png);">
            <h2 class="title">Acerca De</h2>
          </div>
        </div>
      </div>
      <div class="eye"><a href="autor.html"></a>
        <div class="eye-shape">
          <div class="content"
               style="background-image: url(dist/images/obras/marianneteixido-dialogoiterante-2.png);">
            <h2 class="title">Autor</h2>
          </div>
        </div>
      </div>
      <div class="eye"><a href="#"></a>
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
      <div class="eye"> <router-link
        active-class="active"
        class="nav-link"
        :to="{ name: 'obra' , params: {id: obraId}}"> </router-link>
        <div class="eye-shape">
          <div class="content"
               style="background-image: url(dist/images/obras/doctorovich-aswtz-2.png);">
              <h2 class="title">Descubrir</h2>
          </div>
        </div>
      </div>
      <div class="eye"><a href="#"></a>
        <div class="eye-shape">
          <div class="content"
               style="background-image: url(dist/images/obras/eugeniotisselli-latiraniadecodigo-2.png);">
            <h2 class="title">País</h2>
          </div>
        </div>
      </div>
    </div>
    <h2 class="home-intro">Recorridos por el arte de la palabra electrónica (1965-2019): 65 obras, 52 autores, 5 idiomas
      20 categorías y 15 países de América Latina y el Caribe.</h2>
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
export default {
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
