

export default {
    created () {
        this.breadCrumb()
    },
    data () {
        return {
            breadList : {}
        }
    },
    methods : {
        breadCrumb () {
            this.breadList = this.$route.meta.bread ? this.$route.meta.bread : {}
            console.log(this.breadList)
        }
    },
    watch : {
        $route () {
            this.breadCrumb()
        }
    }
}