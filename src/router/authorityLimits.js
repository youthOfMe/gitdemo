import asyncRoutes from "./asyncRouterMap"
import router from "./index"
import store from "@/store"
export let judge = function(){
    let role = store.state.moduleAuthority.role
    let limitList = asyncRoutes.filter((item)=>item.meta.auth.includes(role))
    console.log(limitList)
    for(let i = 0;i < limitList.length;i++){
        router.addRoute(limitList[i])
    }
}
