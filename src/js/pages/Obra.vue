<template>
  <div>
    <div class="row">
      <div class="col-md-6"><img class="image w-100" :src="'dist/images/obras/' + obra.captura_grande">
      </div>
      <div class="col-md-6">
        <h1 class="main-title">{{ obra.titulo }}</h1>

        <div>
          <h2 class="subtitle" v-if="obra.enlace.length">Link{{ obra.enlace.length > 1 ? 's' : '' }} a la obra</h2>

          <template v-for="enlace in obra.enlace"><a class="link" :href="enlace.link" target="_blank">{{
              enlace.text
            }}</a><br>
          </template>
        </div>
        <!--
        <p><strong>Descripción:</strong></p>
        <p>Aliquam bibendum ac massa eget sodales. Vestibulum rhoncus neque quis magna aliquam blandit.</p>

        <p><a class="link" href="#">Ver más</a></p>-->
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <h2 class="subtitle">Comentario Editorial</h2>
        <div v-html="addLinks(obra.comentario)"></div>
      </div>
      <div class="col-md-6 detalle-obra">
        <h2 class="subtitle">Autoría</h2>
        <p>{{ obra.autor ? obra.autor : obra.nombre + ' ' + obra.apellido }}</p><a class="link" href="#">Ver más</a>
        <h2 class="subtitle">Metadata</h2>
        <p class="mb-0"><strong>Año:</strong> {{ obra.ano }}</p>
        <p class="mb-0"><strong>Idioma:</strong> <span v-for="idioma in obra.idioma">{{ idioma }}</span></p>
        <p class="mb-0"><strong>Categorías:</strong> <span v-for="categoria in obra.categorias">{{ categoria }}</span>
        </p>
        <p class="mb-0"><strong>Detalles técnicos:</strong> <span v-for="tecnologia in obra.tecnologias">{{
            tecnologia
          }}</span></p>
        <div v-if="obra.descargable">
          <h2 class="subtitle">Descarga</h2>
          <p class="mb-1"><a class="link text-left" :href="'descargables/' + obra.descargable">Obra Descargable</a></p>
        </div>
        <!-- <p class="mb-0"><strong>Descripción:</strong> Archivos</p>
         <p class="mb-0"><strong>Requerimientos:</strong> Java</p>-->
      </div>
    </div>
  </div>
</template>

<script>
import obrasData from '../../data/obras.json'

export default {
  name: "Obras.vue",
  data() {
    return {
      obras: obrasData["obras"],
    }
  },
  mounted() {
    this.$nextTick( () => {
      document.body.classList.add("ficha");
      document.getElementById('generalWrapper').classList.add('ficha-wrapper', 'mt-5', 'pt-5');
    });
  },
  methods: {
    addLinks(html) {
      let div = document.createElement('div');
      div.innerHTML = html;

      for (let myA of div.getElementsByTagName('a')) {
        myA.classList.add('link');
      }

      return div.innerHTML;
    }
  },
  computed: {
    obra() {
      return this.obras[this.$route.params.id];
    }
  }
}
</script>

<style scoped>

</style>
