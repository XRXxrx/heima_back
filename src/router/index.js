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
        },
        {
            name: 'index',
            path: '/index',
            component: () =>
                import ('@/view/index.vue')
        }
    ]
})

//添加前置守卫
router.beforeEach((to, from, next) => {
        //是否是登录页
        if (to.path !== '/login') {
            //是否有令牌
            let token = localStorage.getItem('heima_back_token')
            if (token) {
                next()
            } else {
                next({ name: 'login' })
            }
        } else {
            next()
        }
    })
    //暴露
export default router