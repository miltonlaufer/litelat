<template>
  <div>
    <div class="row mt-5 pt-5">
      <div class="col text-center">
        <ul class="alfabeto">
          <li v-for="categoria in categorias"><a class="letras-links" :rel="categoria">{{ categoria }}</a></li>
        </ul>
      </div>
    </div>
    <div class="row mt-5 pt-5">
      <div class="col autores">
        <div class="row mb-5" v-for="categoria in categorias">
          <div class="col">
            <h2 class="letra"><a :name="categoria" :id="categoria"></a> {{ categoria }}. </h2>
            <div class="autor-item" v-for="obra in obrasPorCategoria[categoria]">
              <div class="eye">

                <router-link
                  :to="{ name: 'obra' , params: {id: obra.id}}"></router-link>

                <div class="eye-shape">
                  <div class="content"
                       :style="'background-image: url(/dist/images/obras/' + obra.captura_chica + ');'"></div>
                </div>
              </div>
              <router-link
                :to="{ name: 'obra' , params: {id: obra.id}}"><h3 class="autor-nombre">{{ obra.titulo }}</h3>
              </router-link>
              <router-link
                :to="{ name: 'autor' , params: {id: obra.autorId}}"><h4 class="autor-nombre">({{ obra.nombre }} {{
                  obra.apellido
                }})</h4>
              </router-link>

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
  name: "Categorias.vue",
  mixins: [mixins],
  data() {
    return {
      obras: this.$obras.lista,
      obrasPorCategoria: this.$obras.obrasPorCategoria,
      categorias: this.$obras.categorias
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

            let categoria = e.target.getAttribute('rel');
            let position = document.getElementById(categoria).getBoundingClientRect().top;

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
