//import pages from './pages.js';

import splash from './pages/Splash.vue';
import obras from './pages/Obras.vue';

const myRoutes = {
  splash: {
    server: '/',
    local: 'index.html'
  },
  obras: {
    server: '/obras',
    local: 'index.html?l=obras'
  },
};

let myProtocol = 'server';
let filePath = '';

if (window.location.protocol === 'file:') {
  myProtocol = 'local';
  let pathName = window.location.pathname;
  filePath = pathName.substring(0, pathName.lastIndexOf('/') + 1);
}

export default {
  mode: 'history',
  routes: [
    {
      path: filePath + myRoutes['obras'][myProtocol],
      component: obras,
      name: 'obras',
      meta: {
        title: 'Obras'
      }
    },
    {
      path: filePath + myRoutes['splash'][myProtocol],
      component: splash,
      name: 'splash',
      meta: {
        title: 'Splash'
      }
    },
    { path: '*', component: splash}
  ]
}
