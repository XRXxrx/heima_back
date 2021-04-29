import Vue from 'vue'
import App from './App.vue'

//引入路由
import router from '@/router/index'
//引入样式
import '@/style/index.less'
import '@/style/reset.less'

//全局引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    //注册路由
    router,
    render: h => h(App),
}).$mount('#app')