<template>
  <div class="eyes-grid">
    <div v-for="(obra, index) in obras" class="eye" :key="index">
      <div class="eye-shape">
        <div class="content"
             :style="'background-image: url(../dist/images/obras/' + obra.captura_chica + ');'">
          <router-link
            :to="{ name: 'obra' , params: {id: index}}">
            <h2 class="title" :style="getFontSize(obra.titulo)">{{ obra.titulo }}</h2>
          </router-link>
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
  data() {
    return {
      obras: this.$obras.lista,
      intervalID: null,
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.body.classList.add("obras");
      this.eyes();
      window.addEventListener('resize', this.eyes);
    });

    // Workaround for certain glitches that appear from time to time
    this.intervalID = setInterval(() => {
      this.eyes();
    }, 3000);

  },
  beforeDestroy() {
    clearInterval(this.intervalID);
    window.removeEventListener('resize', this.eyes);
  },
  methods: {
    eyes() {
      let elems = document.getElementsByClassName('eye');
      let lastHeight = null;
      let odd = false;

      for (let i = 0; i < elems.length; i++) {
        let elem = elems[i];
        const style = window.getComputedStyle(elem)
        const matrix = style.transform || style.webkitTransform || style.mozTransform;

        // Workaround: si el elemento está hovered, entonces se agranda y los cálculos se distorsionan
        if (matrix !== 'none') {
          // Lo de abajo toma el valor de CSS "transform: scale"
          if (matrix.substring(7, matrix.length - 1).split(',')[0].trim() !== '1') {
            continue;
          }
        }

        let height = elem.getBoundingClientRect().top;

        if (lastHeight !== height) {
          lastHeight = height;
          odd = !odd;
        }

        elem.classList.remove('odd');
        elem.classList.remove('even');
        elem.classList.add(odd ? 'odd' : 'even');
      }
    },
    getFontSize(texto) {
      let size = window.innerWidth < 576 ? 1 : (3.5 / Math.log2(texto.length));

      return 'font-size: ' + size + 'em';
    }
  }
}
</script>

<style scoped>

</style>
