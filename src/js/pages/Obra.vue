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
          <router-link
            class="link"
            v-for="autor in autores"
            :key="autor.autorId"
            :to="{ name: 'autor' , params: {id: autor.autorId}}">{{ autor.nombre }} {{ autor.apellido }}
          </router-link>
        </div>
        <div class="metadata">
          <h2 class="subtitle">Metadata</h2>
          <p class="mb-0"><strong>Año:</strong>
            <router-link :to="{ name: 'fecha', hash: `#${obra.ano.split(/\D/)[0]}`}">{{ obra.ano }}
            </router-link>
          </p>
          <p class="mb-0"><strong>Idioma:</strong> <span v-for="idioma in obra.idioma">{{ idioma }}</span></p>
          <p class="mb-0"><strong>Categorías:</strong>
            <router-link v-for="categoria in obra.categorias"
                         :to="{ name: 'categorias', hash: `#${categoria}`}"
                         :key="categoria">{{ categoria }}</router-link>
          </p>
          <p class="mb-0"><strong>Tecnologías:</strong>
            <router-link v-for="tecnologia in obra.tecnologias"
                         :to="{ name: 'tecnologias', hash: `#${tecnologia}`}"
                         :key="tecnologia">{{
                tecnologia
              }}</router-link>
          </p>
          <p class="mb-0"><strong>País:</strong>
            <router-link :to="{ name: 'paises', hash: `#${obra.pais}`}">{{
                obra.pais
              }}</router-link>
          </p>
        </div>
        <div v-if="obra.descargable">
          <h2 class="subtitle">Descarga</h2>
          <p class="mb-1">
            <template v-for="enlace in obra.descargable"><a :href="'/dist/descargables/' + enlace.link" target="_blank">{{
                enlace.text
              }}</a><br>
            </template>
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
      this.cloneTitle();
    });
  },
  watch: {
    '$route.params.id': function () {
      this.setTitulo();
      this.cloneTitle();
    }
  },
  methods: {
    cloneTitle() {
      this.$nextTick(() => {
        Array.from(document.querySelectorAll('.clonedClass')).map(el => el.parentNode.removeChild(el));
        let obj = document.getElementById('tituloObra').cloneNode(true);
        document.getElementById('imageObra').after(obj);
        obj.classList.add('clonedClass');
      });
    },
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
        return `/dist/descargables/${this.obra.descargable[0].link}`;
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
