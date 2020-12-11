import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import routes from './js/routes';

Vue.use(Router);
const router = new Router(routes);

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
