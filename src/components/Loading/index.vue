<template>
    <div>
        <i class="iconfont icon-wangyiyunyinyueclick" id="icon"></i>
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
    width: 100vw;
    background-image: radial-gradient(circle, #fbe7e8, #ffcfd1, #ffb8b9, #ffa0a0, #ff8787);
}

#icon {
    margin-bottom: 80px;
    font-size: 85px;
    color: rgb(230, 0, 38);
    animation: 1.5s cubic-bezier(0.3, 0.6, 0.9, 1.0) infinite iconAni;
}

@keyframes iconAni {
    from {
        font-size: 85px;
        transform: rotate(0deg);
    }

    50% {
        font-size: 95px;
        transform: rotate(180deg);
    }

    to {
        font-size: 85px;
        transform: rotate(360deg);
    }
}
</style>
