import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

interface ImportMetaEnv {
  [key: string]: string | boolean | undefined
}

// Extend the ImportMeta interface
interface ImportMeta {
  readonly env: ImportMetaEnv
}


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [
      vue(),
      svgLoader(),
    ],
    server: {
      port: 8000
    },
    build: {
      outDir: '../server/static'
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'vue': 'vue/dist/vue.esm-bundler.js'
      }
    },
    define: {
      VITE_PRODUCTION: JSON.stringify(process.env.VITE_PRODUCTION === 'true' ? true : false),
      VITE_TEST_WITH_SERVER: JSON.stringify(process.env.VITE_TEST_WITH_SERVER === 'true' ? true : false),
      VITE_SITE_NAME: JSON.stringify(process.env.VITE_SITE_NAME),
      VITE_DEV_KEY_ID: JSON.stringify(process.env.VITE_DEV_KEY_ID),
      VITE_DEV_KEY_SECRET: JSON.stringify(process.env.VITE_DEV_KEY_SECRET),
      VITE_API_URL: JSON.stringify(process.env.VITE_API_URL),
      VITE_API_URL_RETURN_CODE_DATA: JSON.stringify(process.env.VITE_API_URL_RETURN_CODE_DATA),
      VITE_JWT_TOKEN: JSON.stringify(process.env.VITE_JWT_TOKEN),
      VITE_DEV_TOKEN: JSON.stringify(process.env.VITE_DEV_TOKEN),
      VITE_FETCH_JWT_URL: JSON.stringify(process.env.VITE_FETCH_JWT_URL),
      VITE_FIREBASE_API_KEY: JSON.stringify(process.env.VITE_FIREBASE_API_KEY),
      VITE_AUTH_ADMIN: JSON.stringify(process.env.VITE_AUTH_ADMIN),
      VITE_PROJECT_ID: JSON.stringify(process.env.VITE_PROJECT_ID),
      VITE_STORAGE_BUCKET: JSON.stringify(process.env.VITE_STORAGE_BUCKET),
      VITE_MESSAGING_SENDER_ID: JSON.stringify(process.env.VITE_MESSAGING_SENDER_ID),
      VITE_APP_ID: JSON.stringify(process.env.VITE_APP_ID),
      VITE_MEASUREMENT_ID: JSON.stringify(process.env.VITE_MEASUREMENT_ID),
      VITE_SIGNUP_URL: JSON.stringify(process.env.VITE_SIGNUP_URL),
    }
  }
})