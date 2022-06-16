<template>
  <div>
    <my-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск..."
        v-focus>
    </my-input>
    <div class="app_btns">
      <my-button @click="showDialog">
        Создать пост
      </my-button>
      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>

    <posts-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostsList from "@/components/postsList";
import PostForm from "@/components/postForm";
import MyPagination from "@/components/UI/myPagination";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  components: {
    MyPagination,
    PostsList,
    PostForm,
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setCurrentPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    showDialog(event) {
      this.dialogVisible = true;
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostLoading: state => state.post.isPostLoading,
      currentPage: state => state.post.currentPage,
      postsLimit: state => state.post.postsLimit,
      totalPages: state => state.post.totalPages,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPost: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    })
  },
  watch() {
    this.fetchPosts();
  }
}
</script>

<style>

.app_btns {
  display: flex;
  justify-content: space-between;
}

.observer {
  height: 30px;
  visibility: hidden;
}

</style>