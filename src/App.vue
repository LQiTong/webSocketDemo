<template>
  <div id='app'>
    <!-- {{msg}} -->
    <!-- <img src="./assets/login.png" alt>
    <test></test> -->
    <!-- <router-link to="/socket_client">socket 聊天室</router-link> -->
    <router-view>

    </router-view>
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
</style>