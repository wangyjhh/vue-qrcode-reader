<script setup lang="ts">
import type { BarcodeFormat, DetectedBarcode } from 'barcode-detector/pure'
import { processFile } from '../misc/scanner'

export interface QrcodeCaptureProps {
    formats?: BarcodeFormat[]
}

const props = withDefaults(defineProps<QrcodeCaptureProps>(), {
    formats: () => ['qr_code'],
})

const emit = defineEmits<{
    (e: 'detect', detectedCodes: DetectedBarcode[]): void
}>()

// methods
const onChangeInput = (event: Event) => {
    if (!(event.target instanceof HTMLInputElement) || !event.target.files)
        return

    for (const file of Array.from(event.target.files)) {
        processFile(file, props.formats).then((detectedCodes) => {
            emit('detect', detectedCodes)
        })
    }
}
</script>

<template>
    <input
        type="file"
        name="image"
        accept="image/*"
        multiple
        @change="onChangeInput"
    >
</template>
