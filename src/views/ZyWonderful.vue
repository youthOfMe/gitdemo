<template>
    <div>
        <input type="text" v-model.trim="mq">
        <h1>{{mq}}</h1>
        <input type="text" :qm="666">
        <keep-alive>
            <component :is="me"></component>
        </keep-alive>
    </div>
</template>

<script>
import DongTai from "./DongTai.vue"
import DongTaiOne from "./DongTaiOne.vue"
    export default {
        components : {
            DongTai,DongTaiOne
        },
        props : {
            'qm' : Boolean
        },
        created () {
            let num = 1
            num = num.toString()
            console.log(num)
        },
        data () {
            return {
                mq : "",
                mw : "DongTai",
                me : "DongTaiOne"
            }
        }
    }
</script>

<style lang="less" scoped>

</style>