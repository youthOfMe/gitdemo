export default {
    created () {
        this.getBreadCrumb()
    },
    data () {
        return {
            breadList : {}
        }
    },
    methods : {
        getBreadCrumb () {
            this.breadList = this.$route.meta.bread || {}
        }
    },
    watch : {
        $route(){
            this.getBreadCrumb()
        }
    }

}