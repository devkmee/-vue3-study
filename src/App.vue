<template>
    <div class="container">
        <h2>TO-DO-LIST</h2>
        <form class="d-flex"
              @submit="onSubmit">
            <div class="flex-grow-1" mr-2>
                <input class="form-control"
                       type="text"
                       v-model="todo"
                       placeholder="Type new to-do" />
            </div>
            <div>
                <button class="btn btn-primary"
                        type="submit">
                    Add
                </button>
            </div>
        </form>
        <div class="card mt-2">
            <div class="card-body p-2">
                {{ todos[0].subject }}
            </div>
        </div>
        <div class="card mt-2">
            <div class="card-body p-2">
                {{ todos[1].subject }}
            </div>
        </div>
    </div>
</template>                         

<script>
    //import { reactive } from 'vue'; // 객체
    import { ref } from 'vue';    // 원시타입

    export default {
        setup() {
            const todo = ref('');
            const todos = ref([
                { id : 1, subject : '장보기' },
                { id : 2, subject : '설거지' }
            ]);

            const onSubmit = (e) => {
                e.preventDefault();
                todos.value.push({
                    id      : Date.now()
                    ,subject: todo.value
                });
            };

            return {
                todo
                , onSubmit
                , todos
            };
        }
    }
</script>

<style>
    .todo {
        color: dodgerblue;
    }
</style>
