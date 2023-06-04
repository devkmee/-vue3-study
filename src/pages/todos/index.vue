<template>
    <div>Todos page</div>
    <div class="container">
        <h2>TO-DO-LIST</h2>
        <input class="form-control"
               type="text"
               v-model="searchText"
               placeholder="Search"
               @keyup.enter="searchTodo"
        />
        <hr />
        <TodoSimpleForm @add-todo="addTodo" />
        <div style="color:red">
            {{error}}
        </div>
        <div v-if="!todos.length">
            There is nothing to display
        </div>
        <TodoList :todos="todos"
                  @toggle-todo="toggleTodo"
                  @delete-todo="deleteTodo" 
        />
        <hr>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <a v-if="currentPage !== 1"
                        class="page-link cursor" @click="getTodos(currentPage -1)">Previous</a>
                </li>
                <li v-for="page in numberOfPages"
                    :key="page"
                    class="page-item cursor"
                    :class="currentPage === page ? 'active' : ''"
                >
                    <a class="page-link" @click="getTodos(page)">{{ page }}</a>
                </li>
                <li class="page-item">
                    <a v-if="currentPage != numberOfPages"
                    class="page-link cursor" @click="getTodos(currentPage + 1)">Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>                    

<script>
    //import { reactive } from 'vue'; // 객체
    import { ref, computed, watch } from 'vue';    // 원시타입
    import TodoSimpleForm from '@/components/TodoSimpleForm.vue';
    import TodoList from '@/components/TodoList.vue';
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
            let limit = 5;
            const currentPage = ref(1);
            const searchText = ref('');

            const numberOfPages = computed(() => {
                return Math.ceil(numberOfTodos.value/limit);
            });

            // const a = reactivce ({
            //     b:1
            // });

            // watchEffect(() => {
            //     //console.log(currentPage.value);
            //     //console.log(numberOfTodos.value);
            //     console.log(numberOfPages.value);   //computed
            //     console.log(a.b);
            // });
            // a.b = 4;
            

            const getTodos = async (page = currentPage.value) => {
                currentPage.value = page;
                try {
                    const res = await axios.get(
                        `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
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
                    await axios.post('http://localhost:3000/todos', {
                        subject: todo.subject,
                        completed: todo.completed
                    });
                    getTodos(1);
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
                    getTodos(1);
                } catch (err) {
                    console.log(err);
                    error.value = 'Something went wrong';
                }
            };

            const toggleTodo = async (index, checked) => {
                console.log('checked : ', checked);
                error.value = '';
                const id = todos.value[index].id;
                try {
                    await axios.patch('http://localhost:3000/todos/' + id, {
                        completed: checked
                    });
                    todos.value[index].completed = checked
                } catch (err) {
                    console.log(err);
                    error.value = 'Something went wrong';
                }
                console.log(todos.value[index]);
            };
            
            //검색어 입력 시 한 글자 단위로 요청 보내서 timeout 추가
            let timeout = null;
            const searchTodo = () => {
                clearTimeout(timeout);
                getTodos(1);
            };
            
            watch(searchText, () => {
                //마지막 글자가 아니면 클리어
                clearTimeout(timeout);
                timeout = setTimeout( () => {
                    getTodos(1);
                }, 2000 );
            });

            // const filteredTodos = computed(()  => {
            //     if (searchText.value) {
            //         return todos.value.filter(todo => {
            //             return todo.subject.includes(searchText.value);
            //         });
            //     }
            //     return todos.value;
            // });

            return {
                addTodo
                , todos
                , deleteTodo
                , toggleTodo
                , searchText
                , error
                , numberOfPages
                , currentPage
                , getTodos
                , searchTodo
            };
        }
    }
</script>

<style>
    .todo {
        color: gray;
        text-decoration-line : line-through;
    }
    .cursor {
        cursor: pointer;
    }
</style>
