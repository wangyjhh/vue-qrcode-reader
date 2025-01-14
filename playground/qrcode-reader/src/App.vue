<script setup lang="ts">
import { ref } from 'vue'
import Qrcode from './components/qrcode.vue'

const code = ref('')

const decode = async (res: string) => {
    code.value = res
    // eslint-disable-next-line no-console
    console.log(res)
}

const close = () => {
    // eslint-disable-next-line no-console
    console.log('close')
}
</script>

<template>
    <div>
        <Qrcode @decode="decode" @close="close" />
    </div>
</template>

<style scoped>

</style>
