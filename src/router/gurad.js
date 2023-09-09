import router from "./index"
import {getToken} from "@/utils/auth"
import {Message} from "element-ui"
import { judge } from "./authorityLimits"
import store from "@/store"
router.beforeEach(async (to,from,next)=>{
    if(getToken()){
        await store.dispatch("moduleAuthority/setRole")
        if(to.path === "/login"){
            next("/")
            Message({
                type : "error",
                message : "管理员您已经登录了哦"
            })
        }else{
            if(to.name === null){
                judge()
                next({...to,replace : true})
            }
            next()
        }
    }else{
        if(to.path === "/login"){
            next()
        }else{
            next("/login")
            Message({
                type : "error",
                message : "您的身份还未认证"
            })
        }
    }
})