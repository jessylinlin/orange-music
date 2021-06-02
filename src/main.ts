import { createApp } from 'vue'
import { store, key } from './store'
import router from './router'
import App from './App.vue'
import jsBridge from './util/bridge.js'

import {
  ElButton,
  ElDialog
} from 'element-plus'

const app = createApp(App)

//vue2: vue.prototype.bridge = jsBridge
app.config.globalProperties.$bridge = jsBridge

const components = [
  ElButton,
  ElDialog
]

components.forEach(component => {
  app.component(component.name, component)
})
//app.component(ElButton.name, ElButton)

app.use(store, key)
app.use(router)
app.mount('#app')