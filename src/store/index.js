import { createStore } from "vuex";

export default createStore ({
    state: {
        toastMessage  : '' ,
        toastAlertType: '' ,
        showToast     : false ,
        timeout       : null 
    },
    mutations: {
        UPDATE_TOAST_MESSAGE (state, payload) {
            state.toastMessage = payload;
        },
        UPDATE_TOAST_ALERT_TYPE (state, payload) {
            state.toastAlertType = payload;
        },
        UPDATE_TOAST_STATUS (state, payload) {
            state.showToast = payload;
        },
        UPDATE_TOAST_TIMEOUT (state, payload) {
            state.timeout = payload;
        }
    },
    actions : {
        triggerToast = ( { commit }, msg, type = 'success') => {
            //toastMessage.value = msg;
            //toastAlertType.value = type;
            //showToast.value = true;           
            commit('UPDATE_TOAST_MESSAGE', msg)
            commit('UPDATE_TOAST_ALERT_TYPE', type)
            commit('UPDATE_TOAST_STATUS', true)

            //초기화
            timeout.value = setTimeout( () => {
                commit('UPDATE_TOAST_MESSAGE', '')
                commit('UPDATE_TOAST_ALERT_TYPE', '')
                commit('UPDATE_TOAST_STATUS', false)
            }, 5000 )
    }
})