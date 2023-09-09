<template>
    <div >
        <el-dialog
            title="处理订单"
            :visible="visiblesc"
            width="40%"
            :before-close="handleClose"
        >
            <el-form ref="allForm" :model="infoForm" :rules="rules"  label-width="80px" >
                <el-row :gutter="20" >
                    <el-col :span="24">
                        <el-form-item label="状态" prop="orderStatus" >
                            <el-radio v-model="infoForm.orderStatus" label="1">待处理</el-radio>
                            <el-radio v-model="infoForm.orderStatus" label="2">打包中</el-radio>
                            <el-radio v-model="infoForm.orderStatus" label="3">发货中</el-radio>
                            <el-radio v-model="infoForm.orderStatus" label="4">已发货</el-radio>
                            <el-radio v-model="infoForm.orderStatus" label="5">处理完毕</el-radio>
                            <el-radio v-model="infoForm.orderStatus" label="6">已退款</el-radio>
                            <el-radio v-model="infoForm.orderStatus" label="7">投诉中</el-radio>
                        </el-form-item>
                        <el-form-item label="处理进度" prop="schedule" >
                            <el-input placeholder="请输入处理进度" v-model="infoForm.schedule"></el-input>
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
                orderStatus : "",
                schedule : ""
            },
            rules : {
                orderStatus : [
                    {required:true,message:"请选择订单状态",triggle:"change"}
                ],
                schedule : [
                    {required:true,message:"请输入订单的处理进度",triggle:"schedule"},
                    {pattern:/^([0-9][0-9]{0,1}|100)$/,message:"订单进度必须处于0-100",triggle:"change"}
                ]
            }
        };
    },
    watch : {
        visibles () {
            this.visiblesc = this.visibles
            const {orderStatus,schedule} = this.$store.state.blindBoxInfo
            this.infoForm = {orderStatus,schedule}
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
                    post("/schedule",this.infoForm).then((res)=>{
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