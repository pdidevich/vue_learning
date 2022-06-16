import {computed, ref} from "vue";

export default function useSortedAndPosts(posts) {
    const selectedSort = ref('');
    console.log('posts', posts.value)
    const sortedPosts = computed(() => {
        return [...posts.value].sort((a, b) => {
            return a[selectedSort.value]?.localeCompare(b[selectedSort.value])
        })
    });
console.log('sortedPosts.value 0', sortedPosts.value);
console.log(sortedPosts);
    return {
        selectedSort, sortedPosts
    }
}