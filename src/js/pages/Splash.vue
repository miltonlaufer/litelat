<template>
  <div>
    <div class="eyes-grid home">
      <router-link
        :to="{ name: 'obras'}">
        <div class="eye">

          <div class="eye-shape">

            <div class="content"
                 :style="'background-image: url(https://ip-poetry.findelmundo.com.ar/grafica/01.jpg);'">
              <h2 class="title">Obras</h2>
            </div>

          </div>

        </div>
      </router-link>
      <div class="eye"><a href="#"></a>
        <div class="eye-shape">
          <div class="content" style="background-image: url(https://hacks.mozilla.org/files/2017/06/omega.jpg);">
            <h2 class="title">Categorías</h2>
          </div>
        </div>
      </div>
      <div class="eye"><a href="#"></a>
        <div class="eye-shape">
          <div class="content"
               style="background-image: url(https://images.unsplash.com/photo-1593145134471-e91fe115022e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80);">
            <h2 class="title">Acerca De</h2>
          </div>
        </div>
      </div>
      <div class="eye"><a href="autor.html"></a>
        <div class="eye-shape">
          <div class="content"
               style="background-image: url(https://images.unsplash.com/photo-1593094588728-5090e1f1b115?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80);">
            <h2 class="title">Autor</h2>
          </div>
        </div>
      </div>
      <div class="eye"><a href="#"></a>
        <div class="eye-shape">
          <div class="content"
               style="background-image: url(https://images.unsplash.com/photo-1593105293524-123b7e48249d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80);">
            <h2 class="title">Año</h2>
          </div>
        </div>
      </div>
      <div class="eye"><a href="obras.html"></a>
        <div class="eye-shape">
          <div class="content"
               style="background-image: url(https://images.unsplash.com/photo-1586573561341-91205527a9dd?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80);">
            <h2 class="title">Descubrir</h2>
          </div>
        </div>
      </div>
      <div class="eye"><a href="#"></a>
        <div class="eye-shape">
          <div class="content"
               style="background-image: url(https://images.unsplash.com/photo-1592915890225-401b284bd21d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80);">
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
          <div class="col text-right"><img src="images/logo_litelat_footer.png" width="240"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$parent.$emit('routeChanged', this.$route.name);

    document.body.classList.add("home");
  }
}
</script>

<style scoped>

</style>
