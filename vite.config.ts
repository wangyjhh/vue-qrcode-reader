import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
    esbuild: {
        supported: {
            'optional-catch-binding': false,
        },
    },
    build: {
        target: ['es2020', 'edge88', 'firefox68', 'chrome75', 'safari13'],
        lib: {
            entry: {
                'vue-qrcode-reader': resolve(__dirname, 'src/index.ts'),
            },
            formats: ['es', 'umd'],
            name: 'VueQrcodeReader',
            fileName: (format, entryName) =>
                format === 'es' ? `${entryName}.js` : `${entryName}.${format}.js`,
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    plugins: [
        vue(),
        dts(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})
