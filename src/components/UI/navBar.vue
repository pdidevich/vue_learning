<template>
  <div class="navbar">
    <div @click="$router.push(`/`)">Learning Vue 3</div>
    <div class="navbar__btns">
      <my-button @click="$router.push(`/posts`)">Посты</my-button>
      <my-button @click="$router.push(`/posts/store`)">Store</my-button>
      <my-button @click="$router.push(`/posts/composition`)">Composition</my-button>
      <my-button @click="$router.push(`/about`)">О нас</my-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'nav-bar',
}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
</style>