<template>
    <div>
        <h1>{{text}}</h1>
    </div>
</template>

<script>
    export default {
        destroyed () {
            console.log("动态组件2进行卸载")
        },
        computed : {
            text () {
                return "这是动态组件二号666"
            } 
        }       
    }
</script>

<style lang="less" scoped>
    
</style>