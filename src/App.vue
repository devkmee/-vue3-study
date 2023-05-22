<template>
    <!--
    <div v-show="toggle">true</div>
    <div v-show="!toggle">false</div>
    -->
    <div v-if="toggle">true</div>
    <div v-else>false</div>
    <button class="btn btn-primary"
            @click="onToggle">
        TOGGLE
    </button>
    <div class="container">
        <h2>TO-DO-LIST</h2>
        <form @submit.prevent="onSubmit">
            <div class="d-flex">
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
            </div>
            <div v-show="hasError" style="color:red">
                This field cannot be empty
            </div>
        </form>
        <div class="card mt-2"
             v-for="t in todos" :key="t.id">
            <div class="card-body p-2">
                {{ t.subject }}
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
            const toggle = ref(false);
            const hasError = ref(false);

            const onToggle = () => {
                toggle.value = !toggle.value;
            };

            const onSubmit = () => {
                if (todo.value === '') {
                    hasError.value = true;
                } else {
                    hasError.value = false;
                    todos.value.push({
                        id: Date.now(),
                        subject: todo.value
                    });
                }
            };

           

            return {
                todo
                , onSubmit
                , todos
                , toggle
                , onToggle
                , hasError
            };
        }
    }
</script>

<style>
    .todo {
        color: dodgerblue;
    }
</style>
