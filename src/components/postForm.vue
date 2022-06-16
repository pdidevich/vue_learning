<template>
  <form class="form" @submit.prevent >
    <h4>Создание поста</h4>
    <my-input v-model="post.title" placeholder="Название"/>
    <my-input v-model="post.body" placeholder="Описание"/>
    <my-button style="margin-top: 15px; align-self: flex-end;" @click="createPost">Создать</my-button>
  </form>
</template>

<script>
import MyInput from "@/components/UI/myInput";
export default {
  components: {MyInput},
  data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: '',
      }
    }
  },
}
</script>

<style scoped>

.form {
  display: flex;
  flex-direction: column;
}

</style>