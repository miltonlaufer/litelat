<template>
  <div class="eyes-grid">
    <div v-for="(obra, index) in obras" class="eye" :key="index"><a href="#"></a>
      <div class="eye-shape">
        <div class="content"
             :style="'background-image: url(' + getBg(index) + ');'">
          <h2 class="title">{{ obra.titulo }}</h2>
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
      fondos: [
        'https://images.unsplash.com/photo-1586573561341-91205527a9dd?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80',
        'https://images.unsplash.com/photo-1593094588728-5090e1f1b115?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80',
        'https://images.unsplash.com/photo-1592915890225-401b284bd21d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80',
        'https://images.unsplash.com/photo-1593105293524-123b7e48249d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80',
        'https://hacks.mozilla.org/files/2017/06/omega.jpg',
        'https://images.unsplash.com/photo-1593145134471-e91fe115022e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80'
      ]
    }
  },
  created() {
    document.body.classList.add("obras");
  },
  mounted() {
    console.log(this.obras);

    this.$nextTick(function () {
      this.eyes();
      window.addEventListener('resize', this.eyes);
    });
    this.$parent.$emit('routeChanged', this.$route.name);
    console.log()
  },
  methods: {
    getBg(index) {
      return this.fondos[index % this.fondos.length];
    },
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
