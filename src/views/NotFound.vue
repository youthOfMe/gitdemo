<template>
    <div>
        <el-empty>
            <el-button type="primary" @click="back">返回首页</el-button>
        </el-empty>
    </div>
</template>

<script>
    export default {
        methods : {
            back () {
                this.$router.push("/")
            }
        }
    }
</script>

<style lang="less" scoped>

</style>