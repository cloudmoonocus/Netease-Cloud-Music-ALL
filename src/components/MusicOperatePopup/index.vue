<template>
    <Popup v-model:show="show" round position="bottom" :style="{ height: '18%', backgroundColor: '#fff' }"
        @click-overlay="emits('closePopup')">
        <CellGroup class="group" :border="false">
            <Cell title="&nbsp;&nbsp;下一首播放" :border="false" icon="play-circle-o" />
            <Cell title="&nbsp;&nbsp;收藏到歌单" :border="false" icon="sign" id="no" />
        </CellGroup>
    </Popup>
</template>

<script setup>
import { Popup, Cell, CellGroup } from 'vant';
import { ref } from 'vue';

const props = defineProps({
    show: Boolean,
    id: Number,
})
const emits = defineEmits(['closePopup'])
const show = ref(false);

show.value = props.show;
</script>

<style lang="less" scoped>
.group {
    margin-top: 2%;

    #no {
        text-decoration: line-through;
    }
}
</style>
