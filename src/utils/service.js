import axios from "axios"
import {getToken} from "./auth"
import { Message } from 'element-ui';
//把axios从核心模块中引入进行使用

const service = axios.create({
    baseURL : "http://localhost:8080",
    timeout : 5000
})

//请求拦截器是axios对象的一个方法，所以通过axios实例进行调用
service.interceptors.request.use((config)=>{
    if(getToken()){
        config.headers.token = getToken()
    }
    return config
},()=>{
    Message({
        type : 'error',
        message : "请求错误请检查网络"
    })
    return Promise.reject(new Error("请求错误请检查网络"))
})

service.interceptors.response.use((res)=>{
    const result = res.data;
    if(result.success){
        return result
    }else{
        Message({
            type : "error",
            message : result.message || "请求失败请检查用户名和密码是否正确"
        })
        return Promise.reject(new Error(result.message || "请求失败请检查用户名和密码是否正确"))
    }
},()=>{
    Message({
        type : "error",
        message : "请求错误请检查网络"
    })
    return Promise.reject(new Error("请求错误请检查网络"))
})

export default service