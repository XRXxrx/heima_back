//工程化
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


//配置路由参数
const router = new VueRouter({
        routes: [{
            name: 'login',
            path: '/login',
            component: () =>
                import ('@/view/login.vue')
        }]
    })
    //暴露
export default router