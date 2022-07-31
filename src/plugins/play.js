import { reqMusicLyric, reqMusicUrl } from '@/Api';
import onplaying from '@/store/OnPlaying';
const onplayingData = onplaying();
import { Toast } from 'vant';

export async function play(id, imageUrl, title, author) {
    Toast.loading({
        message: '添加中...',
        forbidClick: true,
    });
    // 获取点击歌曲的Url
    const urlResult = await reqMusicUrl(id);
    // 获取点击歌曲的歌词
    const lyricResult = await reqMusicLyric(id);
    if (urlResult.code === 200) {
        let newLyricArray = lyricResult.lrc.lyric.split(/[(\r\n)\r\n]+/).map((item) => {
            let minute = item.slice(1, 3);
            let second = item.slice(4, 6);
            let millisecond = item.slice(7, 10);
            let lyric = item.slice(11, item.length);

            if (isNaN(Number(millisecond))) {
                millisecond = item.slice(7, 9);
                lyric = item.slice(10, item.length);
            }

            return { minute, second, millisecond, lyric };
        });
        let data = {};
        if (onplayingData.playList.length) {
            let newPlayList = onplayingData.playList.map((m) => {
                m.index++;
                return m;
            });
            onplayingData.playList = newPlayList;
            data = {
                play: true,
                playNow: true,
                index: 0,
                id: id,
                imageUrl: imageUrl,
                title: title,
                author: author,
                musicUrl: urlResult.data[0].url,
                lyricDetail: [newLyricArray],
            };
        } else {
            data = {
                play: true,
                playNow: true,
                index: 0,
                id: id,
                imageUrl: imageUrl,
                title: title,
                author: author,
                musicUrl: urlResult.data[0].url,
                lyricDetail: [newLyricArray],
            };
        }
        onplayingData.playList.push(data);
        onplayingData.judageNow();
    }
}
