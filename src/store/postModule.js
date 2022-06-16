import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isPostLoading: false,
        currentPage: 0,
        postsLimit: 10,
        totalPages: 1,
        selectedSort: '',
        searchQuery: '',
        sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По содержимому'},
        ]
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((a, b) => { //????
                return a[state.selectedSort]?.localeCompare(b[state.selectedSort])
            })
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setIsPostLoading(state, isPostLoading) {
            state.isPostLoading = isPostLoading;
        },
        setCurrentPage(state, currentPage) {
            state.currentPage = currentPage;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setIsPostLoading', true);
                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/posts?_limit=10',
                    {
                        params: {
                            _limit: state.postsLimit,
                            _page: state.currentPage,
                        }
                    }
                );
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.postsLimit));
                commit('setPosts', response.data);
            } catch (e) {
                console.log(e);
            } finally {
                commit('setIsPostLoading', false);
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit('setCurrentPage', state.currentPage + 1);
                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/posts?_limit=10',
                    {
                        params: {
                            _limit: state.postsLimit,
                            _page: state.currentPage,
                        }
                    }
                );
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.postsLimit));
                commit('setPosts', [...state.posts, ...response.data]);
            } catch (e) {
                console.log(e);
            }
        },
    },
    namespaced: true,
}