<template>
    <Popup v-model:show="show" position="bottom" :style="{ height: '60%' }" round style="background-color: #fff;">
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
import { ref } from 'vue';
const show = ref(true)

</script>

<style lang="less" scoped>
</style>
