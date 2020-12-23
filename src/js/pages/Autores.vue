<template>
  <div>
    <div class="row mt-5 pt-5">
      <div class="col text-center">
        <ul class="alfabeto">
          <li v-for="inicial in iniciales"><a class="letras-links" :rel="inicial">{{ inicial }}</a></li>
          <br/><input type="search" v-model="search" placeholder="Buscar"/>
        </ul>
      </div>
    </div>
    <div class="row mt-5 pt-5">
      <div class="col autores" v-if="iniciales.length">
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
        Array.from(document.getElementsByClassName('volver'))[0].addEventListener('click', _ => {
          window.scrollTo(0, 0);
        });

        this.setEvents();
      }
    );
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
  computed: {
    iniciales: function () {
      return Object.keys(this.autores);
    },
    autores: function () {
      let autores = {};

      for (let inicial of this.inicialesComienzo) {
        let autoresFiltrados = this.autoresComienzo[inicial].filter(autor => !this.search ||
          `${autor.nombre} ${autor.apellido}`
            .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            .includes(this.search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
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
