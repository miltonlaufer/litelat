// Page components
import splash from './pages/Splash.vue'
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

// Excepciones de url
const paginasConId = ['obra', 'autor'];

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
  let name = routes.routes[routeIndex].name;

  if (name) {
    routes.routes[routeIndex].name = name;
    routes.routes[routeIndex].meta = metadata.metadata[name];
    let path = {
      server: '/',
      local: 'index.html'
    }

    if (name !== 'splash') {
      path.server += name;
      path.local += `?l=${name}` + paginasConId.hasOwnProperty(name) ? '&id=:id' : '';
    }

    routes.routes[routeIndex].path = filePath + path[myProtocol];
  }
}

export default routes;
