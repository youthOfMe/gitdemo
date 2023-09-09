<template>
    <div>
        <el-submenu v-if="menu.children" :index="menu.url" class="mitem">
            <template slot="title">
                <i :class="menu.icon"></i>
                <span slot="title">{{menu.name}}</span>
            </template>
            <nav-menu v-for="(item,index) in menu.children" :key="index" :menu="item"></nav-menu>
        </el-submenu>
        <el-menu-item v-else :index="menu.url" class="mitem">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.name}}</span>
        </el-menu-item>
    </div>
</template>

<script>
    export default {
        name : "NavMenu",
        props : {
            menu : {
                type : Object,
                required : true
            }
        },
        data () {
            return {
            }
        }
    }
</script>

<style lang="less" scoped>
    .mitem {
        width: 200px;
    }
</style>