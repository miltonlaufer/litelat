<template>
  <div>
    <div class="row mt-5 pt-5">
      <div class="col text-center">
        <ul class="alfabeto">
          <li v-for="inicial in iniciales"><a class="letras-links" :href="'#' + inicial">{{ inicial }}</a></li>
        </ul>
      </div>
    </div>
    <div class="row mt-5 pt-5">
      <div class="col autores">
        <div class="row mb-5" v-for="inicial in iniciales">
          <div class="col">
            <h2 class="letra"><a :name="inicial" :id="inicial"></a> {{ inicial }}. </h2>
            <div class="autor-item" v-for="autor in autores[inicial]">

              <div class="eye"><a href="ficha-obra.html"></a>
                <div class="eye-shape">
                  <div class="content"
                       :style="'background-image: url(/dist/images/obras/' + autor.imagen + ');'"></div>
                </div>
              </div>

              <a href="ficha-obra.html"><h3 class="autor-nombre">{{ autor.nombre }} {{ autor.apellido }}</h3></a>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Obras.vue",
  data() {
    return {
      obras: this.$obras.lista,
      autores: {},
      iniciales: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.body.classList.add("autor");
    });

    let autoresProcesados = [];

    for (let index in this.obras) {
      let obra = this.obras[index];
      let horribleID = `${obra.nombre} ${obra.apellido}`.replace(' ', '_');

      if (!autoresProcesados.includes(horribleID)) {
        autoresProcesados.push(horribleID);
        let inicial = obra.apellido[0].toUpperCase();
        this.iniciales.push(inicial);

        if (!this.autores.hasOwnProperty(inicial)) {
          this.autores[inicial] = [];
        }

        this.autores[inicial].push({
          nombre: obra.nombre,
          apellido: obra.apellido,
          imagen: obra.captura_grande,
          id: horribleID
        });
      }
    }

    this.iniciales = [...new Set(this.iniciales)].sort();

    for (let inicial of this.iniciales) {
      this.autores[inicial].sort((a, b) => (a.apellido > b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0));
    }

    this.$nextTick(() => {
        Array.from(document.getElementsByClassName('letras-links')).forEach(obj => {
          obj.addEventListener('click', () => {
            console.log('click');
            setTimeout(() => {
                window.scrollTo(0, window.scrollY - 200)
              }, 1
            );
          });
        });
      }
    );
  }
}
</script>

<style scoped>

</style>
