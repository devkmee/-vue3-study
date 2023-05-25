<template>
    <div class="container">
        <h2>TO-DO-LIST</h2>
        <TodoSimpleFormVue/>
        
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
    import TodoSimpleFormVue from './components/TodoSimpleForm.vue';

    export default {
        components: {
            TodoSimpleFormVue
        },
        setup() {
            const todo = ref('');
            const todos = ref([]);
            const hasError = ref(false);
            const todoStyle = {
                textDecoration: 'line-through',
                color: 'gray'
            };

            const onSubmit = () => {
                if (todo.value === '') {
                    hasError.value = true;
                } else {
                    todos.value.push({
                        id: Date.now(),
                        subject: todo.value,
                        completed : false
                    });
                    hasError.value = false;
                    todo.value = '';
                }
            };

            const deleteTodo = (index) => {
                todos.value.splice(index, 1);
            };

            return {
                todo
                , onSubmit
                , todos
                , hasError
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
