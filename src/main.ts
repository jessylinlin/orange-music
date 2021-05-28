import { createApp } from 'vue'
import { store, key } from './store'
import router from './router'
import App from './App.vue'

import { ElButton } from 'element-plus'

const app = createApp(App)

app.component(ElButton.name, ElButton)

app.use(store, key)
app.use(router)
app.mount('#app')