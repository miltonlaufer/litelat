# Antología litElat Número 1

> Antología de Literatura Latinoamericana y Caribeña

Este repositorio incluye la estructura de cómo está hecho el sitio de la Primera Antología de la Red Latino Americana de
Literatura Electrónica. Es accesible públicamente por razones ideológicas y educativas. El proyecto está desarrollado
usando VUE.JS. **El punto de entrada es "src/js/main.js"**.

Para ver el sitio, [Antología litElat](http://antologia.litelat.net)

##Versión web

Puede funcionar en casi cualquier tipo de server (node.js, nginx o Apacmotivoshe). Para éste último es importante usar el
archivo .htaccess, al menos si se quiere compartir los links de las páginas específicas, dado que el proyecto usa SPA
(Single Page Application) y por tanto sólo se carga una vez, el resto de los links se manejan por Javascript.

Una vez corrido el BUILD que se indica acá abajo, se debe copiar el index.html y la carpeta "dist" creada al servidor.
Si se corre bajo un servidor Apache, también los archivos contenidos en src/data. El archivo "process.pho" de esa
carpeta sólo sirve para adecuar los datos, generados por el comité editorial en un excel, al formato JSON. Tal archivo
no debería estar en el servidor final.

##Versión local (stand alone version)

Este desarrollo está pensando para correr también en versiones offline.
Sólo copie index y la carpeta dist a un pendrive o CD-ROM y el sitio funcionará igual que la versión web.

#Datos técnicos
## Entry point JS
src/js/main.js
##Vue Version
2.6.12 (at the time of starting the project vue 3 wasn't officially launched)
##SPA (_single page application_) using vue router
##Nota: al correr el build la carpeta src/descargables debe tener al menos un zip

#Cómo compilar
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

#Créditos
*Diseño*: [José Aburtu](http://entalpia.pe)

*Base del maquetado HTML*: [Inés Sotomayor](http://www.eikondesign.com.ar/)

*Programación, setup y coordinación*: [Milton Läufer](http://www.miltonlaufer.com.ar/) | [Github](https://www.github.com/miltonlaufer)

