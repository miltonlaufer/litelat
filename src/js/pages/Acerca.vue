<template>
  <div class="row">
    <div class="col">
      <h1 class="subtitle">Acerca de </h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dictum tincidunt quam, vel fermentum urna cursus
        ut. Etiam non quam dictum, accumsan arcu non, euismod augue. Nunc aliquam egestas purus sed rhoncus. Etiam
        turpis eros, euismod sit amet mauris sed, venenatis tincidunt enim. Quisque venenatis bibendum sem nec
        fringilla. Cras elementum lacus neque, nec laoreet urna varius nec. Sed vitae est a tellus faucibus aliquam in
        eget sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean dapibus nibh purus, tempus
        sollicitudin purus placerat id.

        Fusce fringilla nulla sed nibh condimentum bibendum. Morbi a cursus metus, sit amet pharetra odio. Duis nec
        velit magna. Quisque erat augue, tempus pulvinar augue vel, tincidunt rutrum nunc. Donec feugiat eu quam
        tincidunt interdum. Nunc tristique, eros et pretium volutpat, leo velit varius nisl, eu laoreet lectus tellus
        eget nulla. Sed ac pellentesque velit. Nunc rhoncus lacus id ante auctor, eu posuere sapien volutpat. Etiam
        laoreet finibus magna, a porttitor purus dapibus a. Curabitur at pulvinar velit, id semper ex. Nulla non arcu ac
        felis gravida viverra vel a libero. Morbi quis ligula sed sapien maximus ultrices. Proin ut posuere neque.
        Curabitur congue enim enim, id pretium ligula auctor sit amet.

        Aliquam sit amet ex est. Pellentesque lobortis nisi ut nunc egestas tristique. Fusce convallis orci a ante
        aliquet fringilla. Donec feugiat nunc bibendum, dictum eros non, faucibus nulla. Mauris sit amet mauris ac nibh
        sollicitudin sollicitudin eget sed erat. Vivamus vestibulum, lectus sit amet hendrerit vehicula, nibh quam
        tempus nisl, ac pellentesque eros augue quis velit. Mauris vitae metus suscipit, euismod felis vitae, commodo
        diam. Integer quis dolor neque. Aliquam eros turpis, pellentesque id mauris quis, luctus volutpat dui. Quisque
        mattis odio sit amet tellus interdum, at pulvinar odio volutpat. Donec vel ligula pellentesque ex sagittis
        tempor quis nec odio. Cras pretium nisi non lacus facilisis, et sagittis odio mollis. Nunc vitae dictum est.
        Donec tincidunt tellus sit amet tincidunt lobortis. Phasellus imperdiet, sem euismod placerat cursus, metus erat
        vestibulum risus, suscipit pretium erat odio nec tortor.

        Vivamus eu justo pretium, ultrices dui ultricies, venenatis sem. Aenean interdum auctor posuere. Praesent ac
        vulputate diam. Nulla facilisi. Phasellus at fermentum tellus. Curabitur eu porta lorem. Vestibulum nec pharetra
        justo, in porttitor orci. Morbi tristique tristique metus id tempor. Duis auctor metus eget augue tristique, nec
        gravida purus placerat. Vivamus porttitor dictum nisl, id rutrum mi lacinia non.

        Mauris at justo at turpis tristique scelerisque. Maecenas et interdum ipsum. Pellentesque ac nibh et orci
        interdum interdum a non nisi. Nam malesuada sit amet ex venenatis bibendum. Morbi diam urna, blandit eu augue
        sit amet, sodales scelerisque magna. Maecenas auctor ut nunc iaculis finibus. Morbi consectetur, odio ac maximus
        rhoncus, felis ante congue risus, id feugiat felis felis id elit.</p>

      <h1 class="subtitle">Comité editorial </h1>
      <p>
        Leonardo Flores <br>
        Claudia Kozak <br>
        Rodolfo Mata
      </p>

      <h1 class="subtitle">Desarrollo </h1>
      <p>
        <strong>Diseño</strong>: José Aburto<br>
        <strong>Maquetado HTML</strong>: Inés Sotomayor<br>
        <strong>Programación</strong>: Milton Läufer
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: "Acerca.vue",
  mounted() {
    this.$nextTick(() => {
      document.body.classList.add("ficha");
      document.getElementById('generalWrapper').classList.add('ficha-wrapper');
    });
  },
}
</script>

<style scoped>

</style>
