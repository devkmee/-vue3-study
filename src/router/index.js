import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/index.vue';
import Todos from '../pages/todos/index.vue';

const router = createRouter ({
    history: createWebHashHistory(),
    //{객체} = 1개의 라우츠
    routes: [
        {
            path: '/',
            name: 'HOME',
            COMPONET: Home
        },
        {
            path: '/todos',
            name: 'Todos',
            COMPONET: Todos
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