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
                :to="{ name: 'obras'}">Obras
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                active-class="active"
                class="nav-link"
                :to="{ name: 'autores'}">Autoría
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                active-class="active"
                class="nav-link"
                :to="{ name: 'paises'}">País
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                active-class="active"
                class="nav-link"
                :to="{ name: 'categorias'}">Categorías
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                active-class="active"
                class="nav-link"
                :to="{ name: 'tecnologias'}">Tecnologías
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                active-class="active"
                class="nav-link"
                :to="{ name: 'fecha'}">Año
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                active-class="active"
                class="nav-link"
                :to="{ name: 'obra' , params: {id: obraId}}">Descubrir
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                active-class="active"
                class="nav-link"
                :to="{ name: 'acerca' }">Acerca De
              </router-link>
            </li>
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
    <main class="home" id="main" role="main">
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
          <div class="col text-center"><a href="http://litelat.net" target="_blank">Red de Literatura Electrónica
            Latinoamericana</a>
          </div>
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

    if (!window.previousPage) {
      this.setMenuEvents()
    }
  },
  methods: {
    setMenuEvents() {
      this.$nextTick(() => {
        document.querySelectorAll('.nav-item a').forEach(obj => obj.addEventListener('click', this.onMenuClick));
      });
    },
    onMenuClick() {
      this.calculateId();
      this.mobileMenuCollapsed = true;
    },
    calculateId() {
      this.obraId = Math.ceil(Math.random() * Object.keys(this.$obras.lista).length);
    },
    routeChanged(routeName) {
      this.showMenu = routeName !== 'splash';
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
