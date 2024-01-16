import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import nightwatchPlugin from 'vite-plugin-nightwatch'
import Components from 'unplugin-vue-components/vite'
import VueIconsResolver from '@kalimahapps/vue-icons/resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true, // enabled by default if `typescript` is installed
      resolvers: [
        VueIconsResolver,
      ],
    }),
    nightwatchPlugin({
      renderPage: './nightwatch/index.html'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: { devSourcemap: true },
server:{
  port:8080
},
build: {
  target: 'esnext'
}
})
