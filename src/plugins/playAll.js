import { reqMusicLyric, reqMusicUrl } from '@/Api';
import onplaying from '@/store/OnPlaying';
const onplayingData = onplaying();
import { Toast, Notify } from 'vant';

export function playAll(data) {
    onplayingData.playList = [];
    Toast.loading({
        message: '添加中...',
        forbidClick: true,
    });
    var num = 0;
    data.map(async (m) => {
        let urlResult = await reqMusicUrl(m.id);
        let lyricResult = await reqMusicLyric(m.id);
        let newLyricArray = lyricResult.lrc.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
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
        let data = {
            playNow: false,
            index: num,
            id: m.id,
            imageUrl: m.al.picUrl,
            title: m.al.name,
            musicUrl: urlResult.data[0].url,
            lyricDetail: [newLyricArray],
        };
        onplayingData.playList.push(data);
        num++;
    });
    Notify({
        message: '添加成功',
        type: 'success',
    });
    onplayingData.judageNow();
}