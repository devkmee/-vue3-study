<template>
    <div class="card mt-2"
         v-for="(t, index) in todos"
         :key="t.id">

        <div class="card-body p-2 d-flex alighn-items-center">
            <div class="form-check flex-grow-1">
                <input class="form-check-input"
                       type="checkbox"
                       :value="t.completed"
                @change="toggleTodo(index)"/>
                <label class="form-check-label"
                       :class=" { todo: t.completed} ">
                    {{ t.subject }}
                </label>
            </div>
            <div>
                <button class="btn btn-danger btn-sm"
                        @click="deleteTodo(index)">
                    DELETE
                </button>
            </div>
        </div>

    </div>
</template>

<script>
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
        setup(props, context) {
            const toggleTodo = (index) => {
                context.emit('toggle-todo', index);
            };

            return {
                toggleTodo,
            }
        }
    };
</script>

<style></style>