<template>
  <div id="wrapper">
    <header>
      <nav class="navbar navbar-expand-xl" v-if="showMenu">
        <router-link
          class="navbar-brand"
          :to="{ name: 'splash'}"></router-link>
        <button v-on:click="mobileMenuCollapsed=!mobileMenuCollapsed" :class="mobileMenuCollapsed?'':'open'"
                class="navbar-toggler navbar-toggler-right" type="button" aria-label="Toggle navigation">
          <span></span><span></span><span></span><span></span></button>
        <div class="collapse navbar-collapse" :class="mobileMenuCollapsed?'':'show'" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link
                active-class="active"
                class="nav-link"
                :to="{ name: 'obras'}"><span @click="mobileMenuCollapsed=true;">Obras</span>
              </router-link>
            </li>
            <li class="nav-item"><a class="nav-link" href="#">Autor</a></li>
            <li class="nav-item"><a class="nav-link" href="#">País</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Categorías</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Año</a></li>
            <li class="nav-item">
              <router-link
                active-class="active"
                class="nav-link"
                :to="{ name: 'obra' , params: {id: obraId}}"><span @click="calculateId();mobileMenuCollapsed=true;">Descubrir</span>
              </router-link>
            </li>
            <li class="nav-item"><a class="nav-link" href="#">Acerca De</a></li>
          </ul>
        </div>
      </nav>
      <nav v-else class="navbar navbar-home">
        <div class="container-fluid">
          <div class="row align-items-center justify-content-start">
            <div class="col-7 col-lg-6"><a class="navbar-brand"></a></div>
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
          <div class="col" id="generalWrapper">
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
          <div class="col text-center">Antología Litelat #1</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>

import NProgress from "nprogress";

export default {
  name: 'app',
  data() {
    return {
      showMenu: false,
      obraId: null,
      mobileMenuCollapsed: true
    }
  },
  beforeCreate() {
    NProgress.start();
  },
  created() {
    window.previousPage = null;
    window.creaMetaTags(this.$route);
  },
  mounted() {
    this.routeChanged(this.$route.name);
    NProgress.done();
  },
  methods: {
    calculateId() {
      this.obraId = Math.ceil(Math.random() * Object.keys(this.$obras.lista).length);
    },
    routeChanged(routeName) {
      this.showMenu = routeName !== 'splash';
      document.body.classList.remove(...document.body.classList);
      document.getElementById('generalWrapper').classList
        .remove(...document.getElementById('generalWrapper').classList);
      document.getElementById('generalWrapper').classList.add('col');
      this.calculateId();
    }
  },
  computed: {}
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-duration: .75s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
