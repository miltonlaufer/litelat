<template>
  <div>
    <div class="row mt-5 pt-5 mb-5">
      <div class="col text-center">
        <ul class="alfabeto">
          <li v-for="inicial in iniciales"><a class="letras-links" :rel="inicial">{{ inicial }}</a></li>
        </ul>
        <input type="search" v-model="search" placeholder="Buscar"/>
      </div>
    </div>
    <div class="row pt-5">
      <div class="col autores" v-if="iniciales.length">
        <div class="row mb-5" v-for="inicial in iniciales">
          <div class="col">
            <h2 class="letra"><a :name="normalizeString(inicial)" :id="normalizeString(inicial)"></a> {{ inicial }}.
            </h2>
            <div class="autor-item" v-for="autor in autores[inicial]">
              <div class="eye">
                <router-link
                  :to="{ name: 'autor' , params: {id: autor.id}}"></router-link>
                <div class="eye-shape">
                  <div class="content"
                       :style="'background-image: url(dist/images/obras/' + autor.imagen + ');'"></div>
                </div>
              </div>

              <router-link
                :to="{ name: 'autor' , params: {id: autor.id}}"><h3 class="autor-nombre">{{ autor.nombre }} {{
                  autor.apellido
                }}</h3></router-link>

            </div>
          </div>
        </div>

        <div class="volver-wrapper"><a class="volver">⇡ </a></div>
      </div>
      <div class="col autores" v-else>
        <h2 class="letra">No hay resultados para su búsqueda</h2>
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
      autoresComienzo: this.$obras.autoresPorLetra,
      inicialesComienzo: this.$obras.iniciales,
      search: '',
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.body.classList.add("autor");
    });
  },
  watch: {
    iniciales: function (old, now) {
      if (old.length !== now.length) {
        this.$nextTick(() => {
          this.setEvents();
        });
      }
    }
  },
  methods: {
    afterScroll() {
      this.setEvents();
    }
  },
  computed: {
    iniciales: function () {
      return Object.keys(this.autores);
    },
    autores: function () {
      let autores = {};

      for (let inicial of this.inicialesComienzo) {
        let autoresFiltrados = this.autoresComienzo[inicial].filter(autor => !this.search ||
          window.normalizeString(`${autor.nombre} ${autor.apellido}`).includes(window.normalizeString(this.search))
        );

        if (autoresFiltrados.length) {
          autores[inicial] = autoresFiltrados;
        }
      }

      return autores;
    }
  }
}
</script>

<style scoped>

</style>
