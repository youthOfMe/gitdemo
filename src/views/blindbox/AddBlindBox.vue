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
                        <el-form-item label="盲盒内容" prop="content" >
                            <el-input v-model="infoForm.content" placeholder="请输入盲盒内容" type="textarea" autosize></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式" prop="tel" >
                            <el-input v-model="infoForm.tel" placeholder="请输入手机号/微信号/QQ号" ></el-input>
                        </el-form-item>
                        <el-form-item label="盲盒性别" prop="boxSex" >
                            <el-radio v-model="infoForm.boxSex" :label="1">男</el-radio>
                            <el-radio v-model="infoForm.boxSex" :label="2">女</el-radio>
                        </el-form-item>
                        <el-form-item label="状态" prop="boxStatus" >
                            <el-radio v-model="infoForm.boxStatus" :label="1">已审核</el-radio>
                            <el-radio v-model="infoForm.boxStatus" :label="2">未审核</el-radio>
                            <el-radio v-model="infoForm.boxStatus" :label="3">已抽取</el-radio>
                            <el-radio v-model="infoForm.boxStatus" :label="4">未抽取</el-radio>
                        </el-form-item>
                        <el-form-item label="盲盒类别" prop="classbox" >
                            <el-radio v-model="infoForm.classbox" :label="1">免费盲盒</el-radio>
                            <el-radio v-model="infoForm.classbox" :label="2">收费盲盒</el-radio>
                        </el-form-item>
                        <el-form-item label="状态" prop="status" >
                            <el-radio v-model="infoForm.from" :label="1">官方</el-radio>
                            <el-radio v-model="infoForm.from" :label="2">代理商</el-radio>
                            <el-radio v-model="infoForm.from" :label="3">加盟商</el-radio>
                            <el-radio v-model="infoForm.from" :label="4">用户</el-radio>
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
                content : "",
                tel : "",
                boxSex : "",
                status : "",
                classbox : "",
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
                content : [
                    {required:true,message:"盲盒内容不能为空",trigger:"blur"}
                ],
                tel : [
                    {required:true,message:"联系方式不能为空",trigger:"blur"}
                ],
                boxSex : [
                    {required:true,message:"盲盒性别不能为空",trigger:"change"}
                ],
                boxStatus : [
                    {required:true,message:"状态不能为空",trigger:"change"}
                ],
                classbox : [
                    {required:true,message:"盲盒类别不能为空",trigger:"change"}
                ],
                from : [
                    {required:true,message:"盲盒来源不能为空",trigger:"input"}
                ],
            }
        };
    },
    watch : {
        visibles () {
            this.visiblesc = this.visibles
            const {uid,name,sex,personInfo,content,tel,boxSex,classbox,from,boxStatus} = this.$store.state.blindBoxInfo
            this.infoForm = {uid,name,sex,personInfo,content,tel,boxSex,boxStatus,classbox,from}
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
                    post("/addBlindBox",this.infoForm).then((res)=>{
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