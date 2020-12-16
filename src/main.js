import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import routes from './js/routes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import obras from './js/misc/data.js';
import creaMetaTags from './js/misc/createMetatags';

window.creaMetaTags = creaMetaTags;

Vue.use(obras);
Vue.use(Router);

Vue.mixin({
  beforeCreate() {
    window.loading = true;
  },
  mounted() {
    window.loading = false;
    let mainObj =  document.getElementById('main');

    mainObj.classList.remove(...mainObj.classList);

    if (this.$route.name === 'splash') {
      mainObj.classList.add('home');
    }

  }
});

const router = new Router(routes);

if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true;
}

window.litelat = new Vue({
  el: '#app',
  render: h => h(App),
  router
})

router.beforeEach((to, from, next) => {
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()

    // Emite el evento que lee App.vue. Tiene que coordinar el transition delay (en App.vue, css)
    if (to.name !== from.name) {
      clearTimeout(window.changePageTimeut);

      window.changePageTimeut = setTimeout(() => {
        if (window.loading) {
          window.litelat.$children[0].routeChanged(to.name);
        }

        // Como la portada (splash) no tiene menú, los eventos asociados se borran y hay que volver a asignarlos
        if (from.name === 'splash') {
          window.litelat.$children[0].setMenuEvents();
        }
      }, 750);
    }
  }

  if (window.previousPage) {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }

  if (from.name) {
    window.previousPage = from.name;
  }

  creaMetaTags(to);

  next();
});

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

