<template>
  <nav-bar></nav-bar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/UI/navBar";
export default {
  components: {NavBar}
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app {
  margin: 10px;
}
</style>