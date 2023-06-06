import { computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => {
    const store = useStore();

    const showToast = computed(() => store.state.toastMessage);
    const timeout = computed(() => store.state.timeout);
    const toastMessage = computed(() => store.state.toastMessage);
    const toastAlertType = computed(() => store.state.toastAlertType);

    const triggerToast = (msg, type = 'success') => {
        toastMessage.value = msg;
        toastAlertType.value = type;
        showToast.value = true;
        timeout.value = setTimeout( () => {
            toastMessage.value = '';
            toastAlertType.value = '';
            showToast.value = false;
        }, 3000 )
    }

    onUnmounted ( () => {
        clearTimeout(timeout.value);
    }); 

    return {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast
    }
};