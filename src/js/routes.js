// Page components
import splash from './pages/Splash.vue';
import obras from './pages/Obras.vue';
import obra from './pages/Obra.vue';
import acerca from './pages/Acerca.vue';
import autores from './pages/Autores.vue';
import autor from './pages/Autor.vue';
import fecha from './pages/Fecha.vue';
import paises from './pages/Paises.vue';
import categorias from './pages/Categorias.vue';
import tecnologias from './pages/Tecnologias.vue';

// Data
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
  autores: {
    server: '/autores',
    local: 'index.html?l=autores'
  },
  autor: {
    server: '/autor-:id',
    local: 'index.html?l=autor&id=:id'
  },
  fecha: {
    server: '/fecha',
    local: 'index.html?l=fecha'
  },
  paises: {
    server: '/paises',
    local: 'index.html?l=paises'
  },
  categorias: {
    server: '/categorias',
    local: 'index.html?l=categorias'
  },
  tecnologias: {
    server: '/tecnologias',
    local: 'index.html?l=tecnologias'
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
    {
      component: autores,
      name: 'autores',
    },
    {
      component: autor,
      name: 'autor',
    },
    {
      component: fecha,
      name: 'fecha',
    },
    {
      component: paises,
      name: 'paises',
    },
    {
      component: categorias,
      name: 'categorias',
    },
    {
      component: tecnologias,
      name: 'tecnologias',
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
