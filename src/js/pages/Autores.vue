<template>
  <div>
    <div class="row mt-5 pt-5">
      <div class="col text-center">
        <ul class="alfabeto">
          <li v-for="inicial in iniciales"><a class="letras-links" :rel="inicial">{{ inicial }}</a></li>
        </ul>
      </div>
    </div>
    <div class="row mt-5 pt-5">
      <div class="col autores">
        <div class="row mb-5" v-for="inicial in iniciales">
          <div class="col">
            <h2 class="letra"><a :name="inicial" :id="inicial"></a> {{ inicial }}. </h2>
            <div class="autor-item" v-for="autor in autores[inicial]">
              <div class="eye">
                <router-link
                  :to="{ name: 'autor' , params: {id: autor.id}}"></router-link>
                <div class="eye-shape">
                  <div class="content"
                       :style="'background-image: url(/dist/images/obras/' + autor.imagen + ');'"></div>
                </div>
              </div>

              <router-link
                :to="{ name: 'autor' , params: {id: autor.id}}"><h3 class="autor-nombre">{{ autor.nombre }} {{
                  autor.apellido
                }}</h3></router-link>

            </div>
          </div>
        </div>

        <div class="volver-wrapper"><a class="volver">⇡ subir</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "../misc/mixins";

export default {
  name: "Autores.vue",
  mixins: [mixins],
  data() {
    return {
      autores: this.$obras.autoresPorLetra,
      iniciales: this.$obras.iniciales
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.body.classList.add("autor");
    });

    this.$nextTick(() => {
        Array.from(document.getElementsByClassName('volver'))[0].addEventListener('click', _ => {
          window.scrollTo(0, 0);
        });

        Array.from(document.getElementsByClassName('letras-links')).forEach(obj => {
          obj.addEventListener('click', e => {
            e.preventDefault();

            let inicial = e.target.getAttribute('rel');
            let position = document.getElementById(inicial).getBoundingClientRect().top;

            setTimeout(() => {
                window.scrollTo(0, position + window.scrollY - (window.innerHeight / 5))
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
