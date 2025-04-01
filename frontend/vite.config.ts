import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { exit } from 'node:process'


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd());
  const custom_env = process.env.CUSTOM_ENV;

  if (!custom_env) {
    exit(1)
  }

  console.log(`building with ${custom_env} environment`)

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
      'process.env.CUSTOM_ENV': JSON.stringify(custom_env), // JSON.stringify used
      'process.env.PRODUCTION': JSON.stringify(env[`PRODUCTION_${custom_env.toUpperCase()}`] === 'true'), // boolean
      'process.env.SITE_NAME': JSON.stringify(env[`SITE_NAME_${custom_env.toUpperCase()}`] || ''),
      'process.env.API_URL': JSON.stringify(env[`API_URL_${custom_env.toUpperCase()}`] as string),
      'process.env.VITE_API_URL_RETURN_CODE_DATA': JSON.stringify(env[`VITE_API_URL_RETURN_CODE_DATA_${custom_env.toUpperCase()}`] as string),
      'process.env.VITE_JWT_TOKEN': JSON.stringify(env[`VITE_API_URL_JWT_TOKEN_${custom_env.toUpperCase()}`] as string),
      'process.env.VITE_FETCH_JWT_URL': JSON.stringify(env[`VITE_FETCH_JWT_URL_${custom_env.toUpperCase()}`] as string),
      'process.env.VITE_FIREBASE_API_KEY': JSON.stringify(env[`VITE_FIREBASE_API_KEY_${custom_env.toUpperCase()}`] as string),
      'process.env.VITE_AUTH_ADMIN': JSON.stringify(env[`VITE_AUTH_ADMIN_${custom_env.toUpperCase()}`] as string),
      'process.env.VITE_PROJECT_ID': JSON.stringify(env[`VITE_PROJECT_ID_${custom_env.toUpperCase()}`] as string),
      'process.env.VITE_STORAGE_BUCKET': JSON.stringify(env[`VITE_STORAGE_BUCKET_${custom_env.toUpperCase()}`] as string),
      'process.env.VITE_MESSAGING_SENDER_ID': JSON.stringify(env[`VITE_MESSAGING_SENDER_ID_${custom_env.toUpperCase()}`] as string),
      'process.env.VITE_APP_ID': JSON.stringify(env[`VITE_APP_ID_${custom_env.toUpperCase()}`] as string),
      'process.env.VITE_MEASUREMENT_ID': JSON.stringify(env[`VITE_MEASUREMENT_ID_${custom_env.toUpperCase()}`] as string),
      'process.env.VITE_SIGNUP_URL': JSON.stringify(env[`VITE_SIGNUP_URL_${custom_env.toUpperCase()}`] as string),
    }
  }
})