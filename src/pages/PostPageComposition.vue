<template>
  <div>
    <h2>Страница с постами</h2>
    <my-input v-model="searchQuery" placeholder="Поиск..." v-focus>
    </my-input>
    <div class="app_btns">
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>

    <posts-list
        :posts="sortedAndSearchedPosts"
        v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<script>
import PostsList from "@/components/postsList";
import PostForm from "@/components/postForm";
import axios from 'axios';
import MyInput from "@/components/UI/myInput";
import MyPagination from "@/components/UI/myPagination";
import {ref} from "vue";
import {usePosts} from "@/hooks/usePosts";
import useSortedAndPosts from "@/hooks/useSortedPost";
import useSortedAndFindedPosts from "@/hooks/useSortedAndFindedPosts";

export default {
  components: {
    MyPagination,
    PostsList,
    PostForm,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'},
      ]
    }
  },
  setup(props) {
    const {posts, totalPages, isPostLoading} = usePosts(10);
    const {selectedSort, sortedPosts} = useSortedAndPosts(posts);
    console.log('sortedPosts', sortedPosts);
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndFindedPosts(sortedPosts);

    return {
      posts,
      totalPages,
      isPostLoading,
      selectedSort,
      sortedPosts,
      searchQuery,
      sortedAndSearchedPosts,
    }
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