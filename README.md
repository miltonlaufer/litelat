# Antología Litelat Número 1

> Antología de Literatura Latinoamericana y Caribeña

Este repositorio incluye la estructura de cómo está hecho el sitio de la Primera Antología de la Red Latino Americana de
Literatura Electrónica. Es accesible públicamente por motivos ideológicos y educativos. El proyecto está desarrollado
usando VUE.JS. **El punto de entrada es "src/js/main.js"**.

Puede funcionar en casi cualquier tipo de server (node.js, nginx o Apache). Para éste último es importante usar el
archivo .htaccess, al menos si se quiere compartir los links de las páginas específicas, dado que el proyecto usa SPA
(Single Page Application) y por tanto sólo se carga una vez, el resto de los links se manejan por Javascript.

Una vez corrido el BUILD que se indica acá abajo, se debe copiar el index.html y la carpeta "dist" creada al servidor.
Si se corre bajo un servidor Apache, también los archivos contenidos en src/data. El archivo "process.pho" de esa
carpeta sólo sirve para adecuar los datos, generados por el comité editorial en un excel, al formato JSON. Tal archivo
no debería estar en el servidor final.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9000
npm run server

# watch for development
npm run watch

# build for production with minification
npm run build
```

This is an example of a VUE.js SPA (Single Page Application) Project. Feel free to use it and modify it.
