<template>
  <div id="wrapper">
    <header>
      <nav class="navbar navbar-expand-xl">
        <router-link
          class="navbar-brand"
          :to="{ name: 'splash'}"></router-link>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span></span><span></span><span></span><span></span></button>
        <div class="collapse navbar-collapse" id="navbarCollapse" v-if="showMenu">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link
                active-class="active"
                class="nav-link"
                :to="{ name: 'obras'}">Obras
              </router-link>
            </li>
            <li class="nav-item"><a class="nav-link" href="#">Autor</a></li>
            <li class="nav-item"><a class="nav-link" href="#">País</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Categorías</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Año</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Descubrir</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Acerca De</a></li>
          </ul>
        </div>
      </nav>
    </header>
    <main class="home" role="main">
      <div class="container-fluid">
        <div class="row no-gutters">
          <div class="col">
            <transition
              name="fade"
              mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div class="container-fluid">
        <div class="row">
          <div class="col text-center">Footer</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        showMenu: false
      }
    },
    created() {
      this.$on('routeChanged', routeName => {

        if (routeName !== 'splash') {
          this.showMenu = true;
        } else {
          this.showMenu = false;
        }
      });
    },
    methods: {},
    computed: {
    }
  }
</script>

<style lang="scss">

</style>
