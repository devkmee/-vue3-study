<template>
    <div>
        <div class="d-flex justify-content-between mb-3">
            <h2>TO-DO-LIST</h2>
            <button class="btn btn-primary"
                    @click="moveToCreatePage"
            >Create Todo</button>
        </div>
        <input class="form-control"
               type="text"
               v-model="searchText"
               placeholder="Search"
               @keyup.enter="searchTodo"
        />
        <hr />

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
        <Pagination
            v-if="todos.length"
            :numberOfPages = "numberOfPages"
            :currentPage = "currentPage"
            @click="getTodos"
        />
    </div>
</template>                    

<script>
    //import { reactive } from 'vue'; // 객체
    import { ref, computed, watch } from 'vue';    // 원시타입
    import TodoList from '@/components/TodoList.vue';
    import axios from '@/axios';
    import { useToast } from '@/composables/toast';
    import { useRouter } from 'vue-router';
    import Pagination from '@/components/Pagination.vue'

    export default {
        components: {
            TodoList,
            Pagination
        },
        setup() {
            const router = useRouter();
            const todos = ref([]);
            const error = ref('');
            const numberOfTodos = ref(0);
            let limit = 5;
            const currentPage = ref(1);
            const searchText = ref('');

            const {showToast, toastMessage, toastAlertType, triggerToast} = useToast();
        
            const numberOfPages = computed(() => {
                return Math.ceil(numberOfTodos.value/limit);
            });

            const getTodos = async (page = currentPage.value) => {
                currentPage.value = page;
                try {
                    const res = await axios.get(
                        `todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
                        );
                    numberOfTodos.value = res.headers['x-total-count'];
                    todos.value = res.data;                    
                } catch (err) {
                    console.log(err);
                    triggerToast('Something went wrong', 'danger');
                }
            };

            getTodos();
                          //비동기
            const addTodo = async (todo) => {
                error.value = '';
                try {
                    //DB에 저장
                    await axios.post('todos', {
                        subject: todo.subject,
                        completed: todo.completed
                    });
                    getTodos(1);
                } catch (err) {
                    console.log(err);
                    triggerToast('Something went wrong', 'danger');
                }
            };

            const deleteTodo = async (id) => {
                error.value = '';
                try {
                    await axios.delete('todos/' + id);
                    getTodos(1);
                } catch (err) {
                    console.log(err);
                    triggerToast('Something went wrong', 'danger');
                }
            };

            const toggleTodo = async (index, checked) => {
                console.log('checked : ', checked);
                error.value = '';
                const id = todos.value[index].id;
                try {
                    await axios.patch('todos/' + id, {
                        completed: checked
                    });
                    todos.value[index].completed = checked
                } catch (err) {
                    console.log(err);
                    triggerToast('Something went wrong', 'danger');
                }
                console.log(todos.value[index]);
            };

            const moveToCreatePage = () => {
                router.push({
                    name: 'TodoCreate',
                })
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
                ,toastAlertType
                ,toastMessage
                ,showToast
                ,triggerToast
                ,moveToCreatePage
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
