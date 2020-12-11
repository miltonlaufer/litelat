<template>
  <div id="wrapper">
    <header>
      <nav class="navbar navbar-expand-xl" v-if="showMenu">
        <router-link
          class="navbar-brand"
          :to="{ name: 'splash'}"></router-link>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span></span><span></span><span></span><span></span></button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
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
      <nav v-else class="navbar navbar-home">
        <div class="container-fluid">
          <div class="row align-items-center justify-content-start">
            <div class="col-7 col-lg-6"><a class="navbar-brand" href="index.html"></a></div>
            <div class="col-5 col-lg-6 text-right">
              <h1>Literatura Electrónica<br>Latinoamericana y Caribeña</h1>
            </div>
          </div>
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
    <footer v-if="showMenu">
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
        this.showMenu = routeName !== 'splash';
      });
    },
    methods: {},
    computed: {
    }
  }
</script>

<style lang="scss">

</style>
