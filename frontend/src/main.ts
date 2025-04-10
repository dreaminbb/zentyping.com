import { createApp } from 'vue'
import App from '@/App.vue';
import pinia from './store/store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library, type IconPack } from '@fortawesome/fontawesome-svg-core';
import routes from './router';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { code_data } from './store/store';
import { loading_setup } from './module/loading'

library.add(fas as IconPack, far as IconPack, fab as IconPack)
const app = createApp(App)


app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)
app.use(routes)


loading_setup().then(() => {

  //run the laoding setup process
  code_data().initialize().then(() => {
    app.mount('#app')
  }).catch((error) => {
    console.error('error : some error happened during the initialization of the code data', error)
  })
})

