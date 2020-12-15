<template>
  <div>
    <div class="row mt-5 pt-5">
      <div class="col text-center">
        <ul class="alfabeto">
          <li v-for="inicial in iniciales"><a class="letras-links" :href="'#' + inicial">{{ inicial }}</a></li>
        </ul>
      </div>
    </div>
    <div class="row mt-5 pt-5">
      <div class="col autores">
        <div class="row mb-5" v-for="inicial in iniciales">
          <div class="col">
            <h2 class="letra"><a :name="inicial" :id="inicial"></a> {{ inicial }}. </h2>
            <div class="autor-item" v-for="autor in autores[inicial]">

              <div class="eye"><a href="ficha-obra.html"></a>
                <div class="eye-shape">
                  <div class="content"
                       :style="'background-image: url(/dist/images/obras/' + autor.imagen + ');'"></div>
                </div>
              </div>

              <a href="ficha-obra.html"><h3 class="autor-nombre">{{ autor.nombre }} {{ autor.apellido }}</h3></a>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Obras.vue",
  data() {
    return {
      obras: this.$obras.lista,
      autores: this.$obras.autores,
      iniciales: this.$obras.iniciales
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.body.classList.add("autor");
    });

    this.$nextTick(() => {
        Array.from(document.getElementsByClassName('letras-links')).forEach(obj => {
          obj.addEventListener('click', () => {
            console.log('click');
            setTimeout(() => {
                window.scrollTo(0, window.scrollY - 200)
              }, 1
            );
          });
        });
      }
    );
  }
}
</script>

<style scoped>

</style>
