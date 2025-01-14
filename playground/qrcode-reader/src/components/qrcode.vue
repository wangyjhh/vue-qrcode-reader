<script lang="ts" setup>
import type { DetectedBarcode } from '../../../../src'
import { ref } from 'vue'
import { QrcodeCapture, QrcodeStream } from '../../../../src'

const emit = defineEmits<{
    (e: 'decode', value: string): void
    (e: 'close'): void
}>()

// 二维码识别结果
const result = ref('')
// 相机调用错误
const error = ref('')
// 相机闪光灯开关
const torch = ref(false)

// 控制相机闪光灯开关
const torchChanged = () => {
    torch.value = !torch.value
}

// 二维码识别
const decoder = (res: any) => {
    emit('decode', res)
}

const onDetect = async (detectedCodes: DetectedBarcode[]) => {
    try {
        const content = detectedCodes[0].rawValue

        if (content === null) {
            // eslint-disable-next-line no-alert
            alert('未识别到二维码')
        }
        else {
            decoder(content)
        }
    }
    catch (error) {
        // eslint-disable-next-line no-alert
        alert('识别错误')
        // eslint-disable-next-line no-console
        console.log(`识别错误:${error}`)
    }
}

// 相机初始化
const onError = async (err: any) => {
    error.value = `[${err.name}]: `
    if (err.name === 'NotAllowedError') {
        error.value += '错误: 你需要相机授予访问权限'
    }
    else if (err.name === 'NotFoundError') {
        error.value += '错误: 这个设备上没有相机'
    }
    else if (err.name === 'NotSupportedError') {
        error.value += '错误: 安全环境要求(HTTPS, localhost)'
    }
    else if (err.name === 'NotReadableError') {
        error.value += '错误: 确定相机已经在使用了吗?'
    }
    else if (err.name === 'OverconstrainedError') {
        error.value += '错误: 没有安装合适的摄像头'
    }
    else if (err.name === 'StreamApiNotSupportedError') {
        error.value += '错误: 流API不支持当前浏览器'
    }
    else if (err.name === 'InsecureContextError') {
        error.value += '错误: 相机只允许访问的安全上下文。使用HTTPS或本地主机而不是HTTP。'
    }
    else {
        error.value += `错误: 相机错误 (${err.name})`
    }
}

// 二位码追踪
const paintBoundingBox = (detectedCodes: any, ctx: any) => {
    for (const detectedCode of detectedCodes) {
        const {
            boundingBox: { x, y, width, height },
        } = detectedCode
        ctx.lineWidth = 2
        ctx.strokeStyle = 'green'
        ctx.strokeRect(x, y, width, height)
    }
}

const close = () => {
    emit('close')
}
</script>

<template>
    <div>
        <p class="error">
            {{ error }}
        </p>
        <p v-show="result" class="decode-result">
            读取结果: <b>{{ result }}</b>
        </p>
        <QrcodeStream camera="auto" :torch="torch" :track="paintBoundingBox" @detect="onDetect" @error="onError" />
    </div>
    <div class="select">
        <QrcodeCapture @detect="onDetect" />
    </div>
    <div class="btn">
        <button size="small" color="#3aa675" @click="torchChanged">
            开灯/关灯
        </button>
        <button size="small" color="#3aa675" @click="close">
            取消
        </button>
    </div>
</template>

<style lang="scss">
.select {
    display: flex;
    justify-content: center;

    input[type="file" i] {
        appearance: none;
        background-color: initial;
        cursor: default;
        align-items: baseline;
        color: inherit;
        text-overflow: ellipsis;
        text-align: start !important;
        padding: initial;
        border: initial;
        overflow: hidden !important;
        font-size: smaller;
    }

    input[type="file" i]::-webkit-file-upload-button {
        width: 40%;
        height: var(--van-button-small-height);
        background-color: #3aa675;
        color: #fff;
        border: inherit;
        border-color: var(--van-black);
        border-radius: var(--van-button-radius);
        padding: var(--van-button-small-padding);
        font-size: var(--van-button-small-font-size);
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        text-align: center;
        cursor: pointer;
        transition: opacity var(--van-duration-fast);
        -webkit-appearance: none;
        -webkit-font-smoothing: auto;
    }
}

.error {
    font-weight: bold;
    color: red;
    text-align: center;
}

.select {
    margin: 1rem auto;
}

.btn {
    margin: 1rem auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .van-button {
        width: 40%;
    }
}
</style>
