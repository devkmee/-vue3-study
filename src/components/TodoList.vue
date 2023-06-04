<template>
    <div class="card mt-2"
         v-for="(t, index) in todos"
         :key="t.id">

        <div class="card-body p-2 d-flex alighn-items-center"
             @click="moveToPage(t.id)"
        >
            <div class="form-check flex-grow-1">
                <input class="form-check-input"
                       type="checkbox"
                       :checked="t.completed"
                @change="toggleTodo(index)"/>
                <label class="form-check-label"
                       :class=" { todo: t.completed} ">
                    {{ t.subject }}
                </label>
            </div>
            <div>
                <button class="btn btn-danger btn-sm"
                        @click="delTodo(index)">
                    DELETE
                </button>
            </div>
        </div>

    </div>
</template>

<script>
    //import { watchEffect } from 'vue';
    import { useRouter } from 'vue-router';

    export default {
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

        setup(props, { emit } ) {
            // watchEffect(() => {
            //     console.log(props.todos.length);
            // });
            
            const router = useRouter();

            const toggleTodo = (index) => {
                emit('toggle-todo', index);
            };

            const delTodo = (index) => {
             //부모컴포넌트로 넘기는 이벤트이름,  인덱스
                emit('delete-todo', index);
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
                moveToPage
            }
        }
    };
</script>

<style></style>