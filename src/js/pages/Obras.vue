<template>
  <div class="eyes-grid">
    <div v-for="(obra, index) in obras" class="eye" :key="index">
      <div class="eye-shape">
        <div class="content"
             :style="'background-image: url(../dist/images/obras/' + obra.captura_chica + ');'">
          <router-link
            active-class="active"
            class="nav-link"
            :to="{ name: 'obra' , params: {id: index}}">
            <h2 class="title">{{ obra.titulo }}</h2>
          </router-link>
        </div>
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
    this.$parent.$emit('routeChanged', this.$route.name);

    document.body.classList.add("obras");

    this.$nextTick(function () {
      this.eyes();
      window.addEventListener('resize', this.eyes);
    });
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
        //elem.getElementsByClassName('content')[0].innerText =
        //  (odd ? 'odd' : 'even') + ' ' + height;
      }
    }
  }
}
</script>

<style scoped>

</style>
