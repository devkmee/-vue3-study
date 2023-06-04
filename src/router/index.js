import { createRouter, createWebHistory  } from 'vue-router';
import Home from '../pages/index.vue';
import Todos from '../pages/todos/index.vue';
import Todo from '../pages/todos/_id.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/todos',
            name: 'Todos',
            component: Todos
        },
        {
            path: '/todos/:id',
            name: 'Todo',
            component: Todo
        }
    ]
});

/**
 * 1.메    인 : /home 
 * 2.목    록 : /todos 
 * 3.등    록 : /todos/create 
 * 4.상세조회 : /todos/:id
 */

//main.js 에 등록, App.vue에서 사용
export default router;