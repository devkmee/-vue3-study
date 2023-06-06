import { computed } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => {
    const store = useStore();

    //store.index에 있는 값 불러오기
    const showToast = computed(() => store.getters.toastMessageWithSmile);
    const toastMessage = computed(() => store.state.toastMessage);
    const toastAlertType = computed(() => store.state.toastAlertType);

    const triggerToast = (msg, type = 'success') => {
        store.dispatch('triggerToast', msg, type);
    }

    return {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast
    }
};