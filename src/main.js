import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import routes from './js/routes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(Router);
const router = new Router(routes);

window.litelat = new Vue({
  el: '#app',
  render: h => h(App),
  router
})

router.beforeResolve((to, from, next) => {
  // Emite el evento que lee App.vue. Tiene que coordinar el transition delay (en App.vue, css)

  if (to.name) {
    // Start the route progress bar.
    NProgress.start()

    if (to.name !== from.name) {
      setTimeout(() => {
        window.litelat.$children[0].routeChanged(to.name);
      }, 750);
    }
  }

  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
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

    console.log('crea ', tagName, nearestWithTitle.meta.content);
    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));

  next();
});

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})
