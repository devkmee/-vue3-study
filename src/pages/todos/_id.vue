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
    <div id="devKmee">coder</div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref, computed } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';

export default {
    components: {
        Toast
    },
    setup(){
        // //DOM 마운트 전 실행
        // onBeforeMount ( () => {
        //     console.log('onBeforeMount : ', document.querySelector('#devKmee'));
        // });
        
        // //DOM 마운트 후 실행
        // onMounted ( () => {
        //     console.log('onMounted : ', document.querySelector('#devKmee'));
        // }); 

        // //값 uppdate 전 실행 
        // onBeforeUpdate ( () => {
        //     console.log('onBeforeUpdate : ');
        // }); 

        // //값 uppdate 후 실행 
        // onUpdated ( () => {
        //     console.log('onUpdated : ');
        // }); 
        
        // //DOM 언마운트 전 실행  
        // onBeforeUnmount ( () => {
            //     console.log('onBeforeUnmount : ');
            // }); 

        // //DOM 언마운트 후 실행 (주로 메모리 정리를 위해 사용)
        // onUnmounted ( () => {
        //     console.log('onUnmounted : ');
        // }); 

        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const orginalTodo = ref(null);
        const loading = ref(true);
        const todoId = route.params.id;
        
        const {showToast, toastMessage, toastAlertType, triggerToast} = useToast();

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