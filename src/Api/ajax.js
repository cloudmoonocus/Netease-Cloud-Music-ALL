import axios from 'axios';
import { handleNetworkError, handleAuthError } from './errorHandle';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const requests = axios.create({
    baseURL: 'https://neteasecloudmusic-cloudmoonocus.vercel.app/',
    timeout: 10000,
});

// 请求拦截器
requests.interceptors.request.use((config) => {
    nprogress.start();
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
        return res.data;
    },
    (error) => {
        handleNetworkError(error.response.status);
        return Promise.reject(new Error('请求失败'));
    }
);

export default requests;
