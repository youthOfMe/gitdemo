import Vue from 'vue'
import Vuex from 'vuex'
import moduleDetails from './moduleDetails'
import moduleAuthority from './moduleAuthority'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        blindBoxInfo : {
            
        },
    },
    getters: {
    },
    mutations: {
        changeBlindBox (state,payload) {
            state.blindBoxInfo = payload
        },
    },
    actions: {
        
    },
    modules: {
        moduleDetails,moduleAuthority
    }
})
