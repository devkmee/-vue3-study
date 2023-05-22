<template>
    <div class="container">
        <h2>TO-DO-LIST</h2>
        <form 
              class="d-flex"
              @submit="onSubmit"
        >
            <div class="flex-grow-1" mr-2>
                <input class="form-control"
                       type="text"
                       v-model="todo"
                       placeholder="Type new to-do"/>
            </div>
            <div>
                <button class="btn btn-primary"
                        type="submit"
                >Add
                </button>
            </div>
        </form>
        {{ todos }}
    </div>
</template>                         

<script>

    //import { reactive } from 'vue'; // 객체
    import { ref } from 'vue';    // 원시타입

    export default {
        setup() {
            const todo = ref('');
            const todos = ref([]);

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
