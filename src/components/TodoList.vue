<template>
    <!-- <div class="card mt-2"
         v-for="(t, index) in todos"
         :key="t.id"> -->
        <List :items="todos"
        >
            <template #default="{ item, index }">
                <div class="card-body p-2 d-flex alighn-items-center"
                    style="cursor: pointer"
                    @click="moveToPage(item.id)"
                >
                    <div class="flex-grow-1">
                        <input class="ml-2 mr-2"
                            type="checkbox"
                            :checked="item.completed"
                        @change="toggleTodo(index, $event)"
                        @click.stop
                        />
                        <span :class=" { todo: item.completed} ">
                            {{ item.subject }}
                        </span>
                    </div>
                    <div>
                        <button class="btn btn-danger btn-sm"
                                @click.stop="openModal(item.id)">
                            DELETE
                        </button>
                    </div>
                </div>
            </template>
        </List>
        <teleport to="#modal" >
            <Modal v-if="showModal"
               @close="closeModal"
               @delete="delTodo"
        />
        </teleport>
    <!-- </div> -->
</template>

<script>
    //import { watchEffect } from 'vue';
    import { useRouter } from 'vue-router';
    import Modal from '@/components/DeleteModal.vue';
    import { ref, getCurrentInstance } from 'vue';
    import List from '@/components/List.vue';


    export default {
        components:{
            Modal,
            List
        },
        //부모 컴포넌트에서 바인딩한 이름으로 받아옴 
        //props: ['todos']
        //부모 컴포넌트에서 바인딩한 todos 객체로 받아서 정의
        props: {
            todos: {
                type: Array,
                required : true
            }
        },
        emits: ['toggle-todo', 'delete-todo'],

        setup( ) {
            const { emit } = getCurrentInstance ();

            // watchEffect(() => {
            //     console.log(props.todos.length);
            // });
            
            const router = useRouter();
            const showModal = ref(false);
            const todoDeleteId = ref(null);

            const toggleTodo = (index, event) => {
                emit('toggle-todo', index, event.target.checked);
            };

            const openModal = (id) => {
                todoDeleteId.value = id;
                showModal.value = true;
            };
            const closeModal = () => {
                todoDeleteId.value = null;
                showModal.value = false;
            };

            const delTodo = () => {
             //부모컴포넌트로 넘기는 이벤트이름,  인덱스
                emit('delete-todo', todoDeleteId.value);
                showModal.value = false;
                todoDeleteId.value = null;
            };

            const moveToPage = (todoId) => {
                console.log(todoId);
                router.push({
                    name: 'Todo',
                    params: { id:todoId }
                });
                // 쿼리스트링 하드코딩 --> name 시 유지관리 어려우므로 위의 방법 사용 권장 
               // router.push('/todos/' + todoId);
            };

            return {
                toggleTodo,
                delTodo,
                moveToPage,
                showModal,
                openModal,
                closeModal
            }
        }
    };
</script>

<style></style>