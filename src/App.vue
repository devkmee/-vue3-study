<template>
    <div class="container">
        <h2>TO-DO-LIST</h2>
        <TodoSimpleForm @add-todo="addTodo"/>
        
        <div v-if="!todos.length">
            할 일을 추가해주세요
        </div>
        <TodoList :todos="todos"/>
    </div>
</template>                         

<script>
    //import { reactive } from 'vue'; // 객체
    import { ref } from 'vue';    // 원시타입
    import TodoSimpleForm from './components/TodoSimpleForm.vue';
    import TodoList from './components/TodoList.vue';

    export default {
        components: {
            TodoSimpleForm,
            TodoList
        },
        setup() {
            const todos = ref([]);
            const todoStyle = {
                textDecoration: 'line-through',
                color: 'gray'
            };

            const addTodo = (todo) => {
                todos.value.push(todo);
            };

            const deleteTodo = (index) => {
                todos.value.splice(index, 1);
            };

            return {
                addTodo
                , todos
                , todoStyle
                , deleteTodo
            };
        }
    }
</script>

<style>
    .todo {
        color: gray;
        text-decoration-line : line-through;
    }
</style>
