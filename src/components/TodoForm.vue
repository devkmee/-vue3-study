<template>
    <div v-if="loading">
      Loading..
    </div>
    <form 
      v-else
      @submit.prevent="onSave"
    >
      <div class="row">
        <div class="col-6">
          <Input label="Subject" 
                v-model:subject="todo.subject"
                :error="subjectError"/>
        </div>
        <div v-if="editing" class="col-6">
          <div class="form-group">
            <label>Status</label>
            <div>
              <button 
                class="btn"
                type="button"
                :class="todo.completed ? 'btn-success' : 'btn-danger'"
                @click="toggleTodoStatus"
              >
                {{ todo.completed ? 'Completed' : 'Incomplete' }}
              </button>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>Body</label>
            <textarea v-model="todo.body" class="form-control" cols="30" rows="10"></textarea>
          </div>
        </div>
      </div>
  
      <button 
        type="submit" 
        class="btn btn-primary"
        :disabled="!todoUpdated"
      >
        {{ editing? 'Save' : 'Create' }}
      </button>
      <button 
        class="btn btn-outline-dark ml-2"
        @click="moveToTodoListPage"
      >
        Cancel
      </button>
    </form>
  </template>
  
  <script>
  import { useRoute, useRouter } from 'vue-router';
  import axios from '@/axios';
  import { ref, computed} from 'vue';
  import _ from 'lodash';
  import { useToast } from '@/composables/toast';
  import Input from '@/components/input.vue';

  export default {
    components: {
      Input
    },
    props: {
        editing: {
            type: Boolean,
            default: false
        }
    },
      setup(props) {
          const route = useRoute();
          const router = useRouter();
          const todo = ref({
              subject: '',
              completed: false,
              body: ''
          });

          const subjectError = ref('');
          const originalTodo = ref(null);
          const loading = ref(false);
          const {
            toastMessage,
            toastAlertType,
            showToast,
            triggerToast
          } = useToast();

          const todoId = route.params.id

          const getTodo = async () => {
              loading.value = true;
            try {
              const res = await axios.get(`todos/${todoId}`);
              todo.value = { ...res.data };
              originalTodo.value = { ...res.data };
              loading.value = false;
            } catch (error) {
              loading.value = false;
              console.log(error);
              triggerToast('Something went wrong', 'danger');
            }
          };
          const todoUpdated = computed(() => {
            return !_.isEqual(todo.value, originalTodo.value)
          });
          const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
          };
          const moveToTodoListPage = () => {
            router.push({
              name: 'Todos'
            })
          };
          if (props.editing) {
              getTodo();
          }
          const onSave = async () => {
          subjectError.value = '';
          if (!todo.value.subject) {
            subjectError.value = 'Subject is required!';
            return;
          }
          try {
            let res;
            const data = {
              subject: todo.value.subject,
              completed: todo.value.completed,
              body: todo.value.body,
            };
            //수정
            if (props.editing) {
              res = await axios.put(`todos/${todoId} `, data);
              originalTodo.value = {...res.data};
            
            //등록
            } else {
              res = await axios.post('todos', data);
              todo.value.subject = '';
              todo.value.body = '';
            }
            
            const message = 'Successfully ' + (props.editing ? 'Updated!' : 'Created!');
            triggerToast(message);

            if(!props.editing){
              router.push({
                name: 'Todos'
              })
            }

          } catch (error) {
            console.log(error);
            triggerToast('Something went wrong', 'danger')
          }
        };

          return {
            todo,
            loading,
            toggleTodoStatus,
            moveToTodoListPage,
            onSave,
            todoUpdated,
            showToast,
            toastMessage,
            toastAlertType,
            subjectError,
          };
      }
  }
  </script>

<!--이 컴포넌트에만 적용되는 style-->
  <style scoped>
  .text-red {
    color: red;
  }
  
  .fade-enter-active, .fade-leave-active{
    transition:  all 0.5s ease;
  }

  .fade-enter-from, .fade-leave-to{
    transform:  translateY(-30px);
    opacity: 0;
  }

  .fade-enter-to, .fade-leave-from{
    transform:  translateY(0px);
    opacity: 1;
  }
  </style>

<!-- 모든 컴포넌트에 적용되는 style-->
  <style>

</style>