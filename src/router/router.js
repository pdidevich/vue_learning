import MainPage from "@/pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import PostPage from "@/pages/PostPage";
import About from "@/pages/About";
import SinglePost from "@/pages/SinglePost";
import PostPageWithStore from "@/pages/PostPageWithStore";
import PostPageComposition from "@/pages/PostPageComposition";

const routes = [
    {path: '/', component: MainPage},
    {path: '/posts', component: PostPage},
    {path: '/posts/store', component: PostPageWithStore},
    {path: '/posts/composition', component: PostPageComposition},
    {path: '/post/:id', component: SinglePost},
    {path: '/about', component: About},
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;