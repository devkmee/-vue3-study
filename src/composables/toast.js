import { computed } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => {
    const store = useStore();
    const toasts = computed(() => store.state.toast.toasts);

    //store.index에 있는 값 불러오기
    // const toastMessage = computed(() => store.getters['toast/toastMessageWithSmile']);
    // const toastAlertType = computed(() => store.state.toast.toastAlertType);
    // const showToast = computed(() => store.state.toast.showToast);

    const triggerToast = (msg, type = 'success') => {
        store.dispatch('toast/triggerToast', msg, type);
    }

    return {
        toasts,
        triggerToast
    }
};