<template>
  <div>
    <div class="row mt-5 pt-5">
      <div class="col text-center">
        <ul class="alfabeto">
          <li v-for="tecnologia in tecnologias"><a class="letras-links" :rel="tecnologia">{{ tecnologia }}</a></li>
        </ul>
      </div>
    </div>
    <div class="row mt-5 pt-5">
      <div class="col autores">
        <div class="row mb-5" v-for="tecnologia in tecnologias">
          <div class="col">
            <h2 class="letra"><a :name="tecnologia" :id="tecnologia"></a> {{ tecnologia }}</h2>
            <div class="autor-item" v-for="obra in obrasPorTecnologia[tecnologia]">
              <div class="eye">

                <router-link
                  :to="{ name: 'obra' , params: {id: obra.id}}"></router-link>
                <div class="eye-shape">
                  <div class="content"
                       :style="'background-image: url(/dist/images/obras/' + obra.captura_chica + ');'"></div>
                </div>
              </div>
              <div class="d-flex justify-content-start">
                <router-link
                  class="obra-link"
                  :to="{ name: 'obra' , params: {id: obra.id}}"><h3 class="autor-nombre">{{ obra.titulo }}</h3>
                </router-link>
                <router-link
                  class="link link-autor"
                  v-for="autor in getAutores(obra)"
                  :key="autor.autorId"
                  :to="{ name: 'autor' , params: {id: autor.autorId}}"><h4 class="autor-nombre">{{ autor.nombre }} {{
                    autor.apellido
                  }}</h4>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="volver-wrapper"><a class="volver">⇡ </a></div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "../misc/mixins";

export default {
  name: "Tecnologias.vue",
  mixins: [mixins],
  data() {
    return {
      obras: this.$obras.lista,
      obrasPorTecnologia: this.$obras.obrasPorTecnologia,
      tecnologias: this.$obras.tecnologias,
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

            let tecnologia = e.target.getAttribute('rel');
            let position = document.getElementById(tecnologia).getBoundingClientRect().top;

            window.history.pushState(null, document.title, `${window.location.href.split("#")[0]}#${tecnologia}`);

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
