import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import routes from './js/routes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import obras from './js/misc/data.js';
import {creaMetaTags, normalizeString} from './js/misc/helpers';

window.creaMetaTags = creaMetaTags;
window.normalizeString = normalizeString;

window.previousPage = null;

Vue.use(obras);
Vue.use(Router);

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
        window.litelat.$children[0].routeChanged(to.name);

        // Como la portada (splash) no tiene menú, los eventos asociados se borran y hay que volver a asignarlos
        if (from.name === 'splash') {
          window.litelat.$children[0].setMenuEvents();
        }
      }, 760);
    }
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
