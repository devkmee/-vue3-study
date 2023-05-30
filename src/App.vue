<template>
    <div class="container">
        <h2>TO-DO-LIST</h2>
        <input class="form-control"
               type="text"
               v-model="searchText"
               placeholder="Search"
        />
        <hr />
        <TodoSimpleForm @add-todo="addTodo" />
        <div style="color:red">
            {{error}}
        </div>
        <div v-if="!filteredTodos.length">
            There is nothing to display
        </div>
        <TodoList :todos="filteredTodos"
                  @toggle-todo="toggleTodo"
                  @delete-todo="deleteTodo" />
    </div>
</template>                         

<script>
    //import { reactive } from 'vue'; // 객체
    import { ref, computed} from 'vue';    // 원시타입
    import TodoSimpleForm from './components/TodoSimpleForm.vue';
    import TodoList from './components/TodoList.vue';
    import axios from 'axios';

    export default {
        components: {
            TodoSimpleForm,
            TodoList
        },
        setup() {
            const todos = ref([]);
            const error = ref('');

            const getTodos = async () => {
                try {
                    const res = await axios.get('http://localhost:3000/todos');
                    todos.value = res.data;                    
                } catch (err) {
                    console.log(err);
                    error.value = 'Something went wrong';
                }
            };

            getTodos();
                          //비동기 함수
            const addTodo = async (todo) => {
                error.value = '';
                try {
                    //DB에 저장
                    const res = await axios.post('http://localhost:3000/todos', {
                        subject: todo.subject,
                        completed: todo.completed
                    });
                    todos.value.push(res.data);
                } catch (err) {
                    console.log(err);
                    error.value = 'Something went wrong';
                }
/*                await res = axios.post('http://localhost:3000/todos', {
                    subject: todo.subject,
                    completed: todo.completed
                }).then(res => {
                    console.log(res);
                    todos.value.push(res.data);
                }).catch(err => {
                    console.log(err);
                    error.value = 'Something went wrong';
                });*/
            };

            const deleteTodo = (index) => {
                todos.value.splice(index, 1);
            };

            const toggleTodo = (index) => {
                console.log(todos.value[index]);
                todos.value[index].completed = !todos.value[index].completed;
            };

            const searchText = ref('');
            const filteredTodos = computed(()  => {
                if (searchText.value) {
                    return todos.value.filter(todo => {
                        return todo.subject.includes(searchText.value);
                    });
                }
                return todos.value;
            });

            return {
                addTodo
                , todos
                , deleteTodo
                , toggleTodo
                , searchText
                , filteredTodos
                , error
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
