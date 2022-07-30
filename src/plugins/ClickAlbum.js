import { reqAlbumDetail, reqAlbumInfor } from '@/Api';
import { Toast } from 'vant';
import list from '@/store/List';
const listData = list();

export async function getAlbumList(id) {
    Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true,
        overlay: true,
        overlayStyle: {
            backgroundImage: 'linear-gradient( 135deg, #FEB692 10%, #EA5455 100%)',
        },
    });
    const albumInforResult = await reqAlbumInfor(id);
    const albumListResult = await reqAlbumDetail(id);
    if (albumInforResult.code === 200) {
        listData.albumInfor = albumInforResult.playlist;
    }
    if (albumListResult.code === 200) {
        listData.albumlist = albumListResult.songs;
        Toast.clear();
    }
}
