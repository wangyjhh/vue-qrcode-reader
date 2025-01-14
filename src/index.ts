import type { App, Plugin } from 'vue'

import type { EmittedError } from './misc/errors'
import QrcodeCapture, { type QrcodeCaptureProps } from './components/QrcodeCapture.vue'
import QrcodeDropZone, { type QrcodeDropZoneProps } from './components/QrcodeDropZone.vue'
import QrcodeStream, { type QrcodeStreamProps } from './components/QrcodeStream.vue'

// Install the components
export function install(app: App) {
    app.component('qrcode-stream', QrcodeStream)
    app.component('qrcode-capture', QrcodeCapture)
    app.component('qrcode-drop-zone', QrcodeDropZone)
}

// Expose the components:
export {
    type EmittedError,
    QrcodeCapture,
    type QrcodeCaptureProps,
    QrcodeDropZone,
    type QrcodeDropZoneProps,
    QrcodeStream,
    type QrcodeStreamProps,
}

// Expose some exports from "barcode-detector"
export {
    type BarcodeFormat,
    type DetectedBarcode,
    setZXingModuleOverrides,
} from 'barcode-detector/pure'

// Plugin definition
const plugin: Plugin = { install }

export { plugin as VueQrcodeReader }
