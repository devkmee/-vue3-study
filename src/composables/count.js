import { reactive, toRefs } from "vue";

export const useCount = () => {
    const state = reactive({
        count : 0
    });

    //state 리액티브하게 변경
    return toRefs(state);
}