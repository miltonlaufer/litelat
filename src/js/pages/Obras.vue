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
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.body.classList.add("obras");
      this.eyes();
      window.addEventListener('resize', this.eyes);
    });

    // Workaround for when the page is accessed directly
    if (!window.previousPage) {
      setTimeout(() => {
        this.eyes();
      }, 3000);
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.eyes);
  },
  methods: {
    eyes() {
      let elems = document.getElementsByClassName('eye');
      let lastHeight = null;
      let odd = false;

      for (let i = 0; i < elems.length; i++) {
        let elem = elems[i];
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
      return 'font-size: ' + 3.5 / Math.log2(texto.length) + 'em';
    }
  }
}
</script>

<style scoped>

</style>
