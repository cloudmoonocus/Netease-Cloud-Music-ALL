import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const requests = axios.create({
    baseURL: 'https://neteasecloudmusic-cloudmoonocus.vercel.app/',
    timeout: 10000,
});

// 请求拦截器
requests.interceptors.request.use((config) => {
    nprogress.start();
    // config是配置对象，对象中有个属性很重要：header请求头
    // 携带token向服务器索取数据
    // if (store.state.login.token) {
    //     config.headers.token = store.state.login.token;
    // }
    return config;
});

// 响应拦截器
requests.interceptors.response.use(
    (res) => {
        nprogress.done();
        // 响应成功的回调函数
        return res.data;
    },
    (error) => {
        // 响应失败的回调函数
        return Promise.reject(new Error('faile'));
    }
);

export default requests;
