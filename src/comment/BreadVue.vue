<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in breadlist.data" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>

    export default {
        created () {
            console.log(this.breadlist)
        },
        props : ['breadlist']
    }
</script>

<style lang="less" scoped>

</style>