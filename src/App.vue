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
                  @delete-todo="deleteTodo" 
        />
        <hr>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <a v-if="currentPage !== 1"
                        class="page-link" href="#">Previous</a>
                </li>
                <li v-for="page in numberOfPages"
                    :key="page"
                    class="page-item"
                    :class="currentPage === page ? 'active' : ''"
                >
                    <a class="page-link" href="#">{{ page }}</a>
                </li>
                <li class="page-item">
                    <a v-if="currentPage != numberOfPages"
                    class="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>
        {{ numberOfPages }}
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
            const numberOfTodos = ref(0);
            const limit = 5;
            const currentPage = ref(1);

            const numberOfPages = computed(() => {
                return Math.ceil(numberOfTodos.value/limit);
            });

            const getTodos = async () => {
                try {
                    const res = await axios.get(
                        `http://localhost:3000/todos?_page=${currentPage.value}&_limit=${limit}`
                        );
                    numberOfTodos.value = res.headers['x-total-count'];
                    todos.value = res.data;                    
                } catch (err) {
                    console.log(err);
                    error.value = 'Something went wrong';
                }
            };

            getTodos();
                          //비동기
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

            const deleteTodo = async (index) => {
                error.value = '';
                const id = todos.value[index].id;
                try {
                    await axios.delete('http://localhost:3000/todos/' + id);
                    todos.value.splice(index, 1);
                } catch (err) {
                    console.log(err);
                    error.value = 'Something went wrong';
                }
            };

            const toggleTodo = async (index) => {
                error.value = '';
                const id = todos.value[index].id;
                try {
                    await axios.patch('http://localhost:3000/todos/' + id, {
                        completed: !todos.value[index].completed
                    });
                    todos.value[index].completed = !todos.value[index].completed;
                } catch (err) {
                    console.log(err);
                    error.value = 'Something went wrong';
                }
                console.log(todos.value[index]);
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
                , numberOfPages
                , currentPage
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
