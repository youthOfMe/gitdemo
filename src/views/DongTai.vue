<template>
    <div>
        <h1>这是动态组件一号</h1>
    </div>
</template>

<script>
    export default {
        destroyed () {
            console.log("动态组件1进行卸载")
        },
    }
</script>

<style lang="less" scoped>

</style>