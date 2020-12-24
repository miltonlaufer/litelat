<template>
  <div>
    <div class="row mt-5 pt-5 mb-5">
      <div class="col text-center">
        <ul class="alfabeto">
          <li v-for="tipo in tiposListaFiltradas"><a class="letras-links" :rel="tipo">{{ tipo }}</a></li>
        </ul>
        <input type="search" v-model="search" placeholder="Buscar"/>
      </div>
    </div>
    <div class="row pt-5">
      <div class="col autores" v-if="tiposListaFiltradas.length">
        <div class="row mb-5" v-for="tipo in tiposListaFiltradas">
          <div class="col">
            <h2 class="letra"><a :name="tipo" :id="tipo"></a> {{ tipo }}
              <span v-if="tieneDefiniciones"><br>{{ definiciones[tipo] }}</span></h2>
            <div class="autor-item" v-for="obra in obrasPorTipoFiltradas[tipo]">
              <div class="eye">
                <router-link
                  :to="{ name: 'obra' , params: {id: obra.id}}"></router-link>
                <div class="eye-shape">
                  <div class="content"
                       :style="'background-image: url(/dist/images/obras/' + obra.captura_chica + ');'"></div>
                </div>
              </div>
              <div class="autor-obra">
                <router-link
                  class="obra-link col-sx-12"
                  :to="{ name: 'obra' , params: {id: obra.id}}"><h3 class="autor-nombre">{{ obra.titulo }}</h3>
                </router-link>
                <router-link
                  class="link link-autor  col-sx-12"
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

        <div class="volver-wrapper"><a class="volver">⇡</a></div>
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
  name: "listadosTexto.vue",
  mixins: [mixins],
  props: {
    obrasPorTipo: {
      type: Object,
      required: true
    },
    definiciones: {
      type: Object,
      default: function () {
        return {};
      },
    },
    tiposLista: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      obras: this.$obras.lista,
      search: '',
    }
  },
  mounted() {
    this.$nextTick(() => {
        document.body.classList.add("autor");
        this.checkAnchor();
        this.setEvents();
      }
    );
  },
  watch: {
    tiposListaFiltradas: function (old, now) {
      if (old.length !== now.length) {
        this.$nextTick(() => {
          this.setEvents();
        });
      }
    }
  },
  computed: {
    tieneDefiniciones: function () {
      return Object.keys(this.definiciones).length > 0;
    },
    tiposListaFiltradas: function () {
      return Object.keys(this.obrasPorTipoFiltradas);
    },
    obrasPorTipoFiltradas: function () {
      let resultados = {};

      for (let tipo of this.tiposLista) {
        let resultadosFiltrados = this.obrasPorTipo[tipo].filter(obra => {
            if (!this.search) return true;

            let searchNormalized = this.normalizeString(this.search);

            if (
              this.normalizeString(tipo).includes(searchNormalized)
              || this.normalizeString(obra.titulo).includes(searchNormalized)
              || (
                this.tieneDefiniciones && this.definiciones.hasOwnProperty(tipo) &&
                this.normalizeString(this.definiciones[tipo]).includes(searchNormalized)
              )
            ) return true;

            for (let z = 0; z < obra.nombre.length; z++) {
              if (this.normalizeString(`${obra.nombre[z]} ${obra.apellido[z]}`).includes(searchNormalized)) {
                return true;
              }
            }
          }
        );

        if (resultadosFiltrados.length
        ) {
          resultados[tipo] = resultadosFiltrados;
        }
      }

      return resultados;
    }
  },
  methods: {
    getAutores(obra) {
      let autores = [];

      for (let z = 0; z < obra.autorId.length; z++) {
        autores.push({
          nombre: obra.nombre[z],
          apellido: obra.apellido[z],
          autorId: obra.autorId[z]
        })
      }

      return autores;
    }
  }
}
</script>

<style scoped>

</style>
