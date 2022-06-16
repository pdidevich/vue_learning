import axios from "axios";
import {ref, onMounted} from "vue";

export function usePosts(limit) {
    const posts = ref([]);
    const totalPages = ref(0);
    const isPostLoading = ref(true);
    const fetching = async () => {
        try {
            isPostLoading.value = true;
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/posts',
                {
                    params: {
                        _limit: limit,
                        _page: 0,
                    }
                },
            );
            console.log('response', response.data);
            posts.value = response.data;
            console.log('posts.value 1', posts.value);
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
        } catch (e) {
            alert('Ошибка');
        } finally {
            isPostLoading.value = false;
        }
    }
    console.log('posts.value 2', posts.value);
    onMounted(fetching());
    return {
        posts, isPostLoading, totalPages
    }

}