import { createApp } from 'vue'
import App from '@/App.vue';
import pinia from './store/store';
import { createRouter, createWebHistory } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library, type IconPack } from '@fortawesome/fontawesome-svg-core';
import routes from './router';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { code_data } from './store/store';
import { loading_setup } from './module/loading'

const router = createRouter({
  history: createWebHistory(),
  routes
})
library.add(fas as IconPack, far as IconPack, fab as IconPack)
const app = createApp(App)

if (import.meta.env.PROD === true) {
  console.log('api url', import.meta.env.VITE_API_URL)
}

app.use(pinia)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)


loading_setup().then(() => {

  //run the laoding setup process
  code_data().initialize().then(() => {
    app.mount('#app')
  }).catch((error) => {
    console.log(error)
  })
})

