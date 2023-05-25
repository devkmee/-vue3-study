<template>
    <div class="container">
        <h2>TO-DO-LIST</h2>
        <TodoSimpleForm @add-todo="addTodo"/>
        
        <div v-if="!todos.length">
            할 일을 추가해주세요
        </div>
        <div class="card mt-2"
             v-for="(t, index) in todos"
             :key="t.id">

            <div class="card-body p-2 d-flex alighn-items-center">
                <div class="form-check flex-grow-1">
                    <input class="form-check-input"
                           type="checkbox"
                           v-model="t.completed"
                    />
                    <label class="form-check-label"
                           :class=" { todo: t.completed} "
                           >
                        {{ t.subject }}
                    </label>
                </div>
                <div>
                    <button class="btn btn-danger btn-sm"
                            @click="deleteTodo(index)"
                     >DELETE</button>
                </div>
            </div>

        </div>
    </div>
</template>                         

<script>
    //import { reactive } from 'vue'; // 객체
    import { ref } from 'vue';    // 원시타입
    import TodoSimpleForm from './components/TodoSimpleForm.vue';

    export default {
        components: {
            TodoSimpleForm
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
