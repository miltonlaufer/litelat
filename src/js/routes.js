import splash from './pages/Splash.vue';
import obras from './pages/Obras.vue';
import obra from './pages/Obra.vue';
import acerca from './pages/Acerca.vue';

import metadata from '../data/metadata/metadata.json';

const myRoutes = {
  splash: {
    server: '/',
    local: 'index.html'
  },
  obras: {
    server: '/obras',
    local: 'index.html?l=obras'
  },
  obra: {
    server: '/obra-:id',
    local: 'index.html?l=obra&id=:id'
  },
  acerca: {
    server: '/acerca',
    local: 'index.html?l=acerca'
  },
};

let myProtocol = 'server';
let filePath = '';

if (window.location.protocol === 'file:') {
  myProtocol = 'local';
  let pathName = window.location.pathname;
  filePath = pathName.substring(0, pathName.lastIndexOf('/') + 1);
}

let routes = {
  mode: 'history',
  routes: [
    {
      component: obras,
      name: 'obras',
      meta: {}
    },
    {
      component: obra,
      name: 'obra',
    },
    {
      component: splash,
      name: 'splash',
    },
    {
      component: acerca,
      name: 'acerca',
    },
    {path: '*', component: splash}
  ]
}

for (let routeIndex in routes.routes) {
  if (routes.routes[routeIndex].name) {
    let name = routes.routes[routeIndex].name;
    routes.routes[routeIndex].meta = metadata.metadata[name];
    routes.routes[routeIndex].path = filePath + myRoutes[name][myProtocol];
  }
}


export default routes;
