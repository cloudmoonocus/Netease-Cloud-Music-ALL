<template>
    <Popup v-model:show="listShow" position="bottom" :style="{ paddingBottom: '5px', height: '50%' }"
        @click-overlay="closeList" round style="background-color: #fff;" close-on-popstate safe-area-inset-bottom>
        <NavBar>
            <template #left>
                <span>当前播放</span>
                <span>({{ onplayingData.playList.length }})</span>
            </template>
            <template #right>
                <Icon name="delete-o" size="20" color="#000" @click="deleteAll" />
            </template>
        </NavBar>
        <div class="list">
            <div class="card" v-for="value in onplayingData.playList">
                <span class="title">{{ value.title }}</span>
                <span class="author">- {{ value.author }}</span>
                <Icon name="cross" class="cross" @click="clearMusic(value.id)" />
            </div>
        </div>
    </Popup>
</template>

<script setup>
import { Popup, NavBar, Icon } from 'vant';
import { ref, watch } from 'vue';
import onplaying from '@/store/OnPlaying';

const onplayingData = onplaying();

const listShow = ref(false);

const props = defineProps({
    show: Boolean
})

const emits = defineEmits(['changeShow'])

watch(props, () => {
    listShow.value = props.show;
})

// 点击遮罩层关闭
function closeList() {
    listShow.value = false;
    emits('changeShow', listShow.value);
}

function clearMusic(id) {
    let playIs = onplayingData.playNow.play;
    for (let index = 0; index < onplayingData.playList.length; index++) {
        if (onplayingData.playList[index].id === id) {
            if (onplayingData.playList[index].id === onplayingData.playNow.id) {
                if (onplayingData.playList[index].index === (onplayingData.playList.length - 1)) {
                    onplayingData.playList[0].playNow = true;
                } else {
                    onplayingData.playList[index + 1].playNow = true;
                }
            }
            onplayingData.playList.splice(index, 1);
            for (let index2 = index; index2 < onplayingData.playList.length; index2++) {
                onplayingData.playList[index2].index--;
            }
        }
    }
    onplayingData.judageNow();
    onplayingData.playNow.play = playIs;
}
function deleteAll() {
    onplayingData.playList = [];
    onplayingData.judageNow();
}
</script>

<style lang="less" scoped>
.list {
    .card {
        height: 50px;
        display: flex;
        align-items: center;

        .title {
            padding-left: 20px;
            font-size: 15px;
            max-width: 120px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }

        .author {
            padding-left: 5px;
            font-size: 11px;
            color: rgb(122, 119, 119);
            max-width: 130px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }

        .cross {
            flex: 1;
            text-align: right;
            padding-right: 20px;
            font-size: 17px;
        }
    }
}
</style>
