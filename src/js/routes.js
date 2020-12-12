import splash from './pages/Splash.vue';
import obras from './pages/Obras.vue';
import obra from './pages/Obra.vue';


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
      path: filePath + myRoutes['obra'][myProtocol],
      component: obra,
      name: 'obra',
      meta: {
        title: 'Obra'
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
    {path: '*', component: splash}
  ]
}
