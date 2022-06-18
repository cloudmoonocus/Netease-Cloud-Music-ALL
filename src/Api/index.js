// 该文件的作用：统一管理API
import requests from './ajax';

// export const reqCategoryList = () =>
//     requests({
//         url: '/product/getBaseCategoryList',
//         method: 'get',
//     });

// export const reqGetSearchInfo = (params) =>
//     requests({
//         url: '/list',
//         method: 'post',
//         data: params,
//     });

// !登录(验证码)
export const reqSignIn = (phone) =>
    requests({
        url: `/captcha/sent?phone=${phone}`,
        method: 'post',
        withCredentials: true,
    });

// !验证手机号是否注册
export const reqIfPhoneExist = (phone) =>
    requests({
        url: `/cellphone/existence/check?phone=${phone}`,
        method: 'post',
        withCredentials: true,
    });

// !登录
export const reqSignInFinal = (phone, captcha) =>
    requests({
        url: `/login/cellphone?phone=${phone}&captcha=${captcha}`,
        method: 'post',
        withCredentials: true,
    });

// !游客登录
export const reqFriendsSignIn = () =>
    requests({
        url: `/register/anonimous`,
        method: 'get',
        withCredentials: true,
    });
