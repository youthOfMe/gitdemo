<template>
    <div >
        <el-dialog
            title="新增盲盒"
            :visible="visiblesc"
            width="40%"
            :before-close="handleClose"
        >
            <el-form ref="allForm" :model="infoForm" :rules="rules"  label-width="80px" >
                <el-row :gutter="20" >
                    <el-col :span="12">
                        <el-form-item label="用户ID" prop="uid" >
                            <el-input v-model="infoForm.uid" placeholder="请输入用户ID"></el-input>
                        </el-form-item>
                        <el-form-item label="用户名字" prop="name" >
                            <el-input v-model="infoForm.name" placeholder="请输入用户名字"></el-input>
                        </el-form-item>
                        <el-form-item label="用户性别" prop="sex" >
                            <el-radio v-model="infoForm.sex" :label="1">男</el-radio>
                            <el-radio v-model="infoForm.sex" :label="2">女</el-radio>
                        </el-form-item>
                        <el-form-item label="实名信息" prop="personInfo" >
                            <el-input v-model="infoForm.personInfo" placeholder="请输入用户实名信息" type="textarea" autosize></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户成就" prop="achievement" >
                            <el-input v-model="infoForm.achievement" placeholder="请输入用户成就" type="textarea" autosize></el-input>
                        </el-form-item>
                        <el-form-item label="收费币" prop="pay" >
                            <el-input v-model="infoForm.pay" placeholder="请输入收费币" ></el-input>
                        </el-form-item>
                        <el-form-item label="签到币" prop="check" >
                            <el-input v-model="infoForm.pay" placeholder="请输入签到币" ></el-input>
                        </el-form-item>
                        <el-form-item label="缘分点" prop="soul" >
                            <el-input v-model="infoForm.soul" placeholder="请输入缘分点" ></el-input>
                        </el-form-item>
                        <el-form-item label="用户类别" prop="userClass" >
                            <el-radio v-model="infoForm.userClass" :label="1">新用户</el-radio>
                            <el-radio v-model="infoForm.userClass" :label="2">老用户</el-radio>
                            <el-radio v-model="infoForm.userClass" :label="3">已违规</el-radio>
                        </el-form-item>
                        <el-form-item label="会员服务" prop="vip" >
                            <el-radio v-model="infoForm.vip" :label="1">已开通</el-radio>
                            <el-radio v-model="infoForm.vip" :label="2">未开通</el-radio>
                        </el-form-item>
                        <el-form-item label="会员时间" prop="vipTime" >
                            <el-input v-model="infoForm.vipTime" placeholder="请输入会员时间" ></el-input>
                        </el-form-item>
                        <el-form-item label="用户来源" prop="from" >
                            <el-radio v-model="infoForm.from" :label="1">官方注册</el-radio>
                            <el-radio v-model="infoForm.from" :label="2">代理商</el-radio>
                            <el-radio v-model="infoForm.from" :label="3">加盟商</el-radio>
                            <el-radio v-model="infoForm.from" :label="4">B站链接</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="buttonClose">取 消</el-button>
                <el-button type="primary" @click="addPost" ref="addpostb">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {mapMutations} from "vuex"
import {post} from "@/utils/http"
export default {
    props: ["visibles"],
    // created () {
    //     this.visiblesc = this.visibles
    // },
    // mounted () {
    //     console.log(this.$refs)
    //     this.$refs.addpostb.addEventListener("click",this.addPost,false)
    // },
    data() {
        return {
            visiblesc: this.visibles,
            infoForm : {
                uid : "",
                name : "",
                sex : "",
                personInfo : "",
                achievement : "",
                pay : "",
                check : "",
                soul : "",
                userClass : "",
                vip : "",
                vipTime : "",
                from : ""
            },
            rules : {
                uid : [
                    {required:true,message:"用户ID不能为空,无则输入管理员ID",trigger:"blur"},
                    {pattern:/^[1-9][0-9]{4,9}$/,message:"用户ID必须在10000-100000000000之间",triggle:"change"}
                ],
                name : [
                    {required:true,message:"用户名不能为空,无则输入管理员名字",trigger:"blur"}
                ],
                sex : [
                    {required:true,message:"用户性别不能为空",trigger:"blur"}
                ],
                personInfo : [
                    {required:true,message:"用户实名信息不能为空",trigger:"blur"}
                ],
                achievement : [
                    {required:true,message:"盲盒内容不能为空",trigger:"blur"}
                ],
                pay : [
                    {required:true,message:"收费币不能为空",trigger:"blur"},
                    {pattern:/^[1-9][0-9]{0,9}$/,message:"收费币必须在0-100000000000之间",triggle:"change"}
                ],
                check : [
                    {required:true,message:"签到币不能为空",trigger:"blur"},
                    {pattern:/^[1-9][0-9]{0,9}$/,message:"收费币必须在0-100000000000之间",triggle:"change"}
                ],
                soul : [
                    {required:true,message:"签到币不能为空",trigger:"blur"},
                    {pattern:/^[1-9][0-9]{0,9}$/,message:"缘分点必须在0-100000000000之间",triggle:"change"}
                ],
                userClass : [
                    {required:true,message:"用户类别不能为空",trigger:"change"}
                ],
                vip : [
                    {required:true,message:"会员服务不能为空",trigger:"change"}
                ],
                vipTime : [
                    {required:true,message:"会员时间不能为空",trigger:"blur"},
                    {pattern:/^[1-9][0-9]{0,9}$/,message:"会员时间必须在0-100000000000之间",triggle:"change"}
                ],
                from : [
                    {required:true,message:"用户来源不能为空",trigger:"input"}
                ],
            }
        };
    },
    watch : {
        visibles () {
            this.visiblesc = this.visibles
            const {uid,name,sex,personInfo,achievement,pay,check,soul,userClass,vip,vipTime,from} = this.$store.state.blindBoxInfo
            this.infoForm = {uid,name,sex,personInfo,achievement,pay,check,soul,userClass,vip,vipTime,from}
        }
    },
    methods: {
        ...mapMutations(["changeBlindBox"]),
        handleClose() {
            this.$confirm("确认关闭?未保存数据将清空")
                .then(() => {
                    this.clear()
                    this.visiblesc = false
                    this.$emit("abc", false);
                })
                .catch(() => {})
        },
        buttonClose() {
            this.visiblesc = false
            this.$emit("abc", false)
            this.clear()
        },
        addPost () {
            this.$refs.allForm.validate((valid)=>{
                if(valid){
                    post("/addUser",this.infoForm).then((res)=>{
                        this.$message({
                            type : "success",
                            message : res.message
                        })
                    
                    }).catch((error)=>{
                        this.$message({
                            type : "error",
                            message : error
                        })
                    })
                    this.clear()
                    this.buttonClose()
                }else{
                    console.log("未通过")
                }
            })
        },
        clear(){
            this.$refs.allForm.resetFields()
            this.changeBlindBox({})
            console.log(this.$store.state.blindBoxInfo)
        }
    },
};
</script>

<style lang="less" scoped>
</style>