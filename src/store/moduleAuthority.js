import {get} from "@/utils/http"
export default {
    namespaced : true,
    state : {
        role : ""
    },
    mutations : {
        getRole(state,payload){
            state.role = payload
        }
    },
    actions : {
        async setRole({commit}){
            let {role} = await get("/getRole")
            commit("getRole",role)
        }
    },
}