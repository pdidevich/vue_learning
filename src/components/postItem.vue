<template>
  <div class="post">
    <div>
      <div><strong>Id: </strong> {{ post.id }}</div>
      <div><strong>Название: </strong> {{ post.title }}</div>
      <div><strong>Описание: </strong> {{ post.body }}</div>
    </div>
    <div class="post__buttons">
      <my-button
          @click="$router.push(`/post/${post.id}`)">
        Открыть
      </my-button>
      <my-button
          @click="$emit('remove', post)">
        Удалить
      </my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      requestId: true,
    }
  }
}
</script>

<style scoped>
.post {
  margin-top: 15px;
  padding: 15px;
  border: 2px solid teal;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>