<template>
    <Popup v-model:show="listShow" position="bottom" :style="{ height: '60%' }" @click-overlay="closeList" round
        style="background-color: #fff;" close-on-popstate>
        <NavBar>
            <template #left>
                <span>当前播放</span>
                <span>(32)</span>
            </template>
            <template #right>
                <Icon name="delete-o" size="20" color="#000" />
            </template>
        </NavBar>
    </Popup>
</template>

<script setup>
import { Popup, NavBar, Icon } from 'vant';
import { ref, watch } from 'vue';

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
</script>

<style lang="less" scoped>
</style>
