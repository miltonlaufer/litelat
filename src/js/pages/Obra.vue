<template>
  <div>
    <div class="row">
      <div class="col-md-6 primera-columna">
        <component :is="getFirstLink()?'a':'span'" :href="getFirstLink() || ''" target="_blank"
                   :title="getFirstLink()?'Ver obra':''"
                   id="imageObra">
          <div class="obra-imagen">
            <img class="image w-100"
                 :src="'dist/images/obras/' + obra.captura_grande">
          </div>
        </component>
        <h2 class="subtitle">Comentario Editorial</h2>
        <div v-html="addLinks(obra.comentario)"></div>
      </div>
      <div class="col-md-6 segunda-columna">
        <div id="tituloObra" class="titulo-obra">
          <h1 class="main-title">{{ obra.titulo }}</h1>
          <div>
            <h2 class="subtitle" v-if="obra.enlace.length">Enlace{{ obra.enlace.length > 1 ? 's' : '' }} a la obra</h2>

            <template v-for="enlace in obra.enlace"><a :href="enlace.link" target="_blank">{{
                enlace.text
              }}</a><br>
            </template>
          </div>
          <h2 class="subtitle">Autoría</h2>
          <p v-html="obra.autor"></p>
          <router-link
            class="link"
            v-for="autor in autores"
            :key="autor.autorId"
            :to="{ name: 'autor' , params: {id: autor.autorId}}">Ver más sobre {{ autor.nombre }} {{ autor.apellido }}
          </router-link>
        </div>
        <h2 class="subtitle">Metadata</h2>
        <p class="mb-0"><strong>Año:</strong> {{ obra.ano }}</p>
        <p class="mb-0"><strong>Idioma:</strong> <span v-for="idioma in obra.idioma">{{ idioma }}</span></p>
        <p class="mb-0"><strong>Categorías:</strong> <span v-for="categoria in obra.categorias">{{ categoria }}</span>
        </p>
        <p class="mb-0"><strong>Tecnologías:</strong> <span v-for="tecnologia in obra.tecnologias">{{
            tecnologia
          }}</span></p>
        <div v-if="obra.descargable">
          <h2 class="subtitle">Descarga</h2>
          <p class="mb-1"><a class="link text-left" :href="'descargables/' + obra.descargable">Obra Descargable</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "../misc/mixins";

export default {
  name: "Obras.vue",
  mixins: [mixins],
  created() {
    this.setTitulo();
  },
  mounted() {
    this.$nextTick(() => {
      document.body.classList.add("ficha");
      document.getElementById('generalWrapper').classList.add('ficha-wrapper', 'mt-5', 'pt-5');
      document.getElementById('imageObra').after(document.getElementById('tituloObra').cloneNode(true));
    });
  },
  watch: {
    '$route.params.id': function () {
      this.setTitulo();
    }
  },
  methods: {
    setTitulo() {
      document.title = this.obra.titulo + ' | ' + document.title;
    },
    addLinks(html) {
      let div = document.createElement('div');
      div.innerHTML = html;

      for (let myA of div.getElementsByTagName('a')) {
        myA.setAttribute('target', '_blank');
      }

      return div.innerHTML;
    },
    getFirstLink() {
      if (this.obra.enlace.length) {
        return this.obra.enlace[0].link;
      } else if (this.obra.descargable) {
        return this.obra.descargable;
      }

      return '';
    }
  },
  computed: {
    obra() {
      return this.$obras.lista[this.$route.params.id];
    },
    autores() {
      let autores = [];

      for (let z = 0; z < this.obra.autorId.length; z++) {
        autores.push({
          nombre: this.obra.nombre[z],
          apellido: this.obra.apellido[z],
          autorId: this.obra.autorId[z]
        })
      }

      return autores;
    }
  }
}
</script>

<style scoped>

</style>
