<template>
  <div class="pagination">
    <div
        v-for="page in totalPages"
        :key="page"
        class="pagination__page"
        :class="{
            'pagination__page_current': page === currentPage
        }"
        @click="changePage(page)"
    >
      {{ page }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-pagination',
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    changePage(page) {
      if (page !== this.currentPage)
        this.$emit('pageChanged', page)
    }
  }
}
</script>

<style scoped>

.pagination {
  display: flex;
  margin-top: 15px;
}

.pagination__page {
  border: 1px solid teal;
  padding: 10px 15px;
  margin-left: 5px;
  cursor: pointer;
}

.pagination__page_current {
  border: 2px solid black;
  cursor: default;
}
</style>