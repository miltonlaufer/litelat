<template>
  <div>
    <router-link
      active-class="is-active"
      class="link"
      :to="{ name: 'splash'}">Go to bla
    </router-link>
  </div>
</template>

<script>
  export default {
    created() {
      console.log('Got into the dashboard');
    }
  }
</script>

<style scoped>

</style>
