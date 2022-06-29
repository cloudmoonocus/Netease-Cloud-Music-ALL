import requests from './ajax';

// 时间戳，用来标记无需缓存
let timeNow = Date.now();

// *登录相关API
// #region
// !登录(验证码)
export const reqSignIn = (phone) =>
    requests({
        url: `/captcha/sent?phone=${phone}&timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !验证手机号是否注册
export const reqIfPhoneExist = (phone) =>
    requests({
        url: `/cellphone/existence/check?phone=${phone}&timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !登录
export const reqSignInFinal = (phone, captcha) =>
    requests({
        url: `/login/cellphone?phone=${phone}&captcha=${captcha}&timestamp=${timeNow}`,
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
// !退出登录
export const reqLogOut = () =>
    requests({
        url: `/logout?timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !获取登录状态
export const reqSignInState = () =>
    requests({
        url: `/login/status?timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// #endregion

// *发现页API
// #region
// #region
// !首页banner图
export const reqBanner = () =>
    requests({
        url: `/banner?type=2`,
        method: 'get',
        withCredentials: true,
    });
// !每日推荐歌单
export const reqDailyList = () =>
    requests({
        url: `/recommend/resource`,
        method: 'get',
        withCredentials: true,
    });
// !每日推荐歌曲
export const reqDailyRecMusic = () =>
    requests({
        url: `/recommend/songs`,
        method: 'get',
        withCredentials: true,
    });
// !新歌（华语）
export const reqNewMusic = () =>
    requests({
        url: `/top/song?type=7`,
        method: 'get',
        withCredentials: true,
    });
// !新碟（华语）
export const reqNewAlbum = () =>
    requests({
        url: `/album/new?area=ZH&limit=50`,
        method: 'get',
        withCredentials: true,
    });
// !数字专辑
export const reqDigitalAlbum = () =>
    requests({
        url: `/album/list?limit=50`,
        method: 'get',
        withCredentials: true,
    });
// !榜单（原榜单接口失效，采用数字单曲榜单）
export const reqRankingList = () =>
    requests({
        url: `/album/songsaleboard?albumType=1`,
        method: 'get',
        withCredentials: true,
    });
// !热门话题
export const reqHotTopic = () =>
    requests({
        url: `/hot/topic`,
        method: 'get',
        withCredentials: true,
    });
// #endregion

// *歌单页
// #region
// !精品歌单
export const reqHighQuality = (tag, num) =>
    requests({
        url: `/top/playlist/highquality?cat=${tag}&limit=${num}&timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !专辑/单曲榜单
export const reqAllRankingList = (type, albumType) =>
    requests({
        url: `/album/songsaleboard?type=${type}&albumType=${albumType}&timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !风格馆
export const reqLanguage = (language) =>
    requests({
        url: `/album/list/style?area=${language}&limit=50&timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !关注新歌
export const reqNewAirtistMusic = () =>
    requests({
        url: `/artist/new/song?timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// #endregion
// #endregion

// *播客页API
// #region
// !全部分类
export const reqAllCategory = (type) =>
    requests({
        url: `/dj/radio/hot?cateId=${type}&timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !电台banner
export const reqDjBanner = () =>
    requests({
        url: `/dj/banner`,
        method: 'get',
        withCredentials: true,
    })
// !猜你喜欢
export const reqDjRecom = () =>
    requests({
        url: `/dj/personalize/recommend`,
        method: 'get',
        withCredentials: true,
    })
// #endregion

// *我的页API
// #region
// !用户信息
export const reqUserInfor = () =>
    requests({
        url: `/user/account`,
        method: 'get',
        withCredentials: true,
    })
// !关注列表
export const reqFollowList = (id) =>
    requests({
        url: `/user/follows?uid=${id}&timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !粉丝列表
export const reqFansList = (id) =>
    requests({
        url: `/user/followeds?uid=${id}&timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !等级信息
export const reqUserLV = () =>
    requests({
        url: `/user/level`,
        method: 'get',
        withCredentials: true,
    })
// !最近播放歌曲
export const reqRencentSong = () =>
    requests({
        url: `/record/recent/song?timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !已购单曲
export const reqBuy = () =>
    requests({
        url: `/song/purchased?timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !取消/关注用户
export const reqIsFollow = (id, kind) =>
    requests({
        url: `/follow?id=${id}&t=${kind}&timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !收藏的专辑
export const reqAlbumList = () =>
    requests({
        url: `/album/sublist?timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !收藏的视频
export const reqMv = () =>
    requests({
        url: `/mv/sublist?timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !获取喜欢的音乐
export const reqLikeMusic = (id) =>
    requests({
        url: `/likelist?uid=${id}&timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !获取用户创建的歌单
export const reqLikeList = (id) =>
    requests({
        url: `/user/playlist?uid=${id}&timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !删除歌单
export const reqDeleteList = (id) =>
    requests({
        url: `/playlist/delete?id=${id}&timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !创建歌单
export const reqCreateList = (name, privacy) =>
    requests({
        url: `/playlist/create?name=${name}&privacy=${privacy}&timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// #endregion

// *!获取歌曲详情接口
export const reqMusicDetail = (id) =>
    requests({
        url: `/song/detail?ids=${id}&timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
