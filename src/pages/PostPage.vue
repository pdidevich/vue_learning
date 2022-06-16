<template>
  <div>
    <h2>Страница с постами</h2>
    <my-input v-model="searchQuery" placeholder="Поиск..." v-focus>
    </my-input>
    <div class="app_btns">
      <my-button @click="showDialog">
        Создать пост
      </my-button>
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
        @remove="removePost"
        v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>
    <!--    <my-pagination-->
    <!--        v-model:currentPage="currentPage"-->
    <!--        v-model:totalPages="totalPages"-->
    <!--        @pageChanged="changePage"-->
    <!--    >-->
    <!--    </my-pagination>-->
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostsList from "@/components/postsList";
import PostForm from "@/components/postForm";
import axios from 'axios';
import MyInput from "@/components/UI/myInput";
import MyPagination from "@/components/UI/myPagination";

export default {
  components: {
    MyPagination,
    PostsList,
    PostForm,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      currentPage: 1,
      postsLimit: 10,
      totalPages: 1,
      selectedSort: '',
      searchQuery: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'},
      ]
    }
  },
  methods: {
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
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts?_limit=10',
            {
              params: {
                _limit: this.postsLimit,
                _page: this.currentPage,
              }
            }
        );
        this.posts = response.data;
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.postsLimit);
      } catch (e) {
        alert('Ошибка');
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.currentPage += 1;
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts?_limit=10',
            {
              params: {
                _limit: this.postsLimit,
                _page: this.currentPage,
              }
            }
        );
        this.posts = [...this.posts, ...response.data];
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.postsLimit);
      } catch (e) {
        alert('Ошибка');
      }
    },
  },
  mounted() {
    this.fetchPosts();

  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) => { //????
        return a[this.selectedSort]?.localeCompare(b[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    // currentPage() {
    //   this.fetchPosts();
    // }
    //   selectedSort(newValue) {
    //     this.posts.sort((a, b) => {
    //       return a[newValue]?.localeCompare(b[newValue])
    //     })
    //   },
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