<template>
  <div id='app'>
    {{msg}}
    <img src="./assets/login.png" alt>
    <test></test>
  </div>
</template>

<script>
import Test from './test.jsx'
export default {
  name: 'App',
  data() {
    return {
      msg: 'Hello world'
    }
  },
  components: {
    Test,
  },
}
</script>

<style lang="scss" scoped>
#app {
  color: salmon;
}
</style>