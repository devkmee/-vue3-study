<template>
    <div class="container">
        <h4>count : {{ count }} </h4>
        <h4>doubleCountComputed : {{ doubleCountComputed }} </h4>
        <h4>doubleCountComputed : {{ doubleCountComputed }} </h4>
        <h4>doubleCountMethod : {{ doubleCountMethod() }} </h4>
        <h4>doubleCountMethod : {{ doubleCountMethod() }} </h4>
        <button @click="count++">Add One</button>
        <h2>TO-DO-LIST</h2>
        <TodoSimpleForm @add-todo="addTodo" />

        <div v-if="!todos.length">
            할 일을 추가해주세요
        </div>
        <TodoList :todos="todos"
                  @toggle-todo="toggleTodo"
                  @delete-todo="deleteTodo" />
    </div>
</template>                         

<script>
    //import { reactive } from 'vue'; // 객체
    import { ref, computed } from 'vue';    // 원시타입
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

            const toggleTodo = (index) => {
                console.log(todos.value[index]);
                todos.value[index].completed = !todos.value[index].completed;
            };

            const count = ref(1);
            const doubleCountComputed = computed(() => {
                console.log('computed');
                return count.value * 2;
            });

            const doubleCountMethod = () => {
                console.log('Method');
                return count.value * 2;
            };

            return {
                addTodo
                , todos
                , todoStyle
                , deleteTodo
                , toggleTodo
                , count
                , doubleCountComputed
                , doubleCountMethod
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
