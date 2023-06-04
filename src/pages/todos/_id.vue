<template>
  <h1>To-Do Page</h1>
  <div v-if="loading">Loading...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
        <div class="col-6">
            <div class="form-group">
                <labe>Subject</labe>
                <input v-model="todo.subject" type="text" class="form-control">
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <labe>Status</labe>
                <div>
                    <button type="button"
                            class="btn"
                            :class="todo.completed ? 'btn-success' : 'btn-danger'"
                            @click="toggleTodoStatus"
                    >
                    {{ todo.completed ? 'Completed' : 'Incomplete' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">Save</button>
    <button class="btn btn-outline-dark ml-2" @click="moveToToListPage">Cancel</button>
  </form>
  <Toast v-if="showToast"
        :message="toastMessage"
        :type="toastAlertType"
    />
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref, computed } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';

export default {
    components: {
        Toast
    },
    setup(){
        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const orginalTodo = ref(null);
        const loading = ref(true);
        const showToast = ref(false);
        const toastMessage = ref('');
        const toastAlertType = ref('');
        const todoId = route.params.id;

        const getTodo = async() => {
            try{
                const res = await axios.get(`http://localhost:3000/todos/${todoId}`)
    
                todo.value = { ...res.data };
                orginalTodo.value = { ...res.data };
    
                loading.value = false;
            }catch (error) {
                triggerToast('Something went wrong', 'danger');
                console.log(error);
            }
        };

        const todoUpdated = computed ( () => {
            return !_.isEqual(todo.value, orginalTodo.value)
        });

        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        };

        const moveToToListPage = () => {
            router.push({
                name: 'Todos'
            })
        };

        getTodo();

        const triggerToast = (msg, type = 'success') => {
            toastMessage.value = msg;
            toastAlertType.value = type;
            showToast.value = true;
            setTimeout( () => {
                toastMessage.value = '';
                toastAlertType.value = '';
                showToast.value = false;
            }, 1000 )
        };

        const onSave = async () => {
            try{
                const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
                    subject: todo.value.subject,
                    completed: todo.value.completed
                });
                orginalTodo.value = {...res.data};
                triggerToast('Succesfully saved!');
            }catch (error) {
                triggerToast('Something went wrong', 'danger');
                console.log(error);
            }
        };

        return {
            todo,
            loading,
            toggleTodoStatus,
            moveToToListPage,
            onSave,
            todoUpdated,
            showToast,
            triggerToast,
            toastMessage,
            toastAlertType
        };
    }
}
</script>

<style>

</style>