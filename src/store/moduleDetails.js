import { CHANGEISFROMDETAILS } from "./mutation-type"
export default {
    namespaced : true,
    state : {
        isFromDetails : true
    },
    getters : {

    },
    mutations : {
        [CHANGEISFROMDETAILS](state,payload){
            state.isFromDetails = payload
        }
    },
    actions : {

    }
}