import axios from 'axios'
//添加默认配置
axios.defaults.baseURL = 'http://157.122.54.189:9083'

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    let token = localStorage.getItem('heima_back_token')
    if (token) {
        config.headers['Authorization'] = token
    }
    // 在发送请求之前做些什么
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default axios