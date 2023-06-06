<template>
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
                        ADD
                    </button>
                </div>
            </div>
            <div v-show="hasError" style="color:red">
                This field cannot be empty
            </div>
        </form>
</template>

<script>
    import { ref, getCurrentInstance } from 'vue';

    export default {
        emits: ['toggle-todo', 'delete-todo'],

        setup() {
            const { emit } = getCurrentInstance ();

            const todo = ref('');
            const hasError = ref(false);

            const onSubmit = () => {
                if (todo.value === '') {
                    hasError.value = true;
                } else {
                    //자식컴포넌트 -> 부모컴포넌트로 데이터 보내는 용
                    emit('add-todo', {
                        id: Date.now(),
                        subject: todo.value,
                        completed: false
                    });
                    hasError.value = false;
                    todo.value = '';
                }
            };

            return {
                todo,
                hasError,
                onSubmit
            }
        }
    }
</script>

<style></style>