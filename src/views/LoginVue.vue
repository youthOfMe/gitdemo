<template>
    <div class="wrap">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h2>金融管理系统</h2>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model.trim="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model.trim="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%" @click="login" :loading="loading">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {setToken} from "../utils/auth"
import "../less/less.less"
import {post} from "../utils/http"
import {mapState,mapMutations} from "vuex"

    export default {
        created () {
            this.message()
            setTimeout(()=>{
                this.notice()
            },1000)
        },
        data () {

            return {
                
                loading : false,
                ruleForm : {
                    username : "",
                    password : ""
                },
                rules : {
                    username : [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { pattern:/^\w{4,8}$/,message: '用户名要求4-8位数字字母组成', trigger: 'blur' }
                    ],
                    password : [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { pattern:/^\w{4,8}$/,message: '密码要求4-8位数字字母组成', trigger: 'blur' }
                    ]
                },
            }
        },
        methods : {
            ...mapMutations("moduleAuthority",["getRole"]),
            login () {
                console.log(this.getRole)
                this.$refs.ruleForm.validate((valid)=>{
                    if(valid){
                        this.loading = true
                        post("/login",this.ruleForm).then(res=>{
                            setToken(res.token)//token
                            sessionStorage.setItem("nickname",res.nickname)//配置用户名
                            this.getRole(res.role)
                            console.log(res.role)
                            this.$message({
                                message: '欢迎您，管理员',
                                type: 'success'
                            });
                            this.loading = false
                            this.$router.push({name : "Layout"})
                            this.$notify({
                                title : "来自boss的提示",
                                message : "暮雪海星抓紧干活！",
                                duration : 10000,
                                type : "warning"
                            })
                        }).catch((error)=>{
                            this.loading = false
                            console.log(error)
                        })
                    }else{
                        this.loading = false
                        this.$message({
                            type : "error",
                            message : "请检查用户名和密码"
                        })
                    }
                })
            },
            message () {
                this.$notify.info({
                    title : "来自终端的提示",
                    message : "系统提示 : 本系统只允许管理员进行登录",
                    duration : 10000
                })
            },
            notice () {
                this.$notify.info({
                    message : "欢迎您使用xx后台管理系统",
                    title : "来自终端的提示",
                    duration : 10000
                })
            } 
        },
        computed : {
            ...mapState("moduleAuthority",["role"]),
        }
    }
</script>

<style lang="less" scoped>
    
</style>