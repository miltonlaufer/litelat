import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import routes from './js/routes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import obrasData from './data/obras.json'

// Agrega la info de obras a la instancia de VUE
const obras = {
  lista: obrasData['obras']
}

obras.install = function(){
  Object.defineProperty(Vue.prototype, '$obras', {
    get () { return obras }
  })
}
Vue.use(obras);
// Fin info de obras

/**
 * Helper para crear los metatags
 * @param to
 */
window.creaMetaTags = function (to){
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title + ' | Antología Litelat #1';

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  let metaTags = ['og:description', 'description'];

  // Turn the meta tag definitions into actual elements in the head.
  metaTags.map(tagName => {
    const tag = document.createElement('meta');
    tag.setAttribute(tagName, nearestWithTitle.meta.content);
    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));
}
// Fin helper para crear metatags

Vue.use(Router);
const router = new Router(routes);

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
      setTimeout(() => {
        window.litelat.$children[0].routeChanged(to.name);
      }, 750);
    }
  }

  if (from.name){
    window.previousPage = from.name;
  }

  creaMetaTags(to);

  next();
});

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

