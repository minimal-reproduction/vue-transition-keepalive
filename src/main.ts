import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createPinia } from 'pinia'
import useKeepAliveStore from './pinia/keepAlive'
import { createRouter, createWebHashHistory } from 'vue-router'

const pinia = createPinia()

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'one', component: () => import('./components/one.vue'), meta: { keepAlive: 'two' } },
    { path: '/two', name: 'two', component: () => import('./components/two.vue'), meta: { keepAlive: true, cancelKeepAlive: true } },
  ],
})
router.afterEach((to, from) => {
  const keepAliveStore = useKeepAliveStore()
  if(to.meta.keepAlive){
    const componentName = to.matched.at(-1)?.components?.default.name
    if (componentName) {
      keepAliveStore.add(componentName)
    }
  }
  if (from.meta.keepAlive) {
    const componentName = from.matched.at(-1)?.components?.default.name
    if (componentName) {
      if (from.meta.cancelKeepAlive) {
        keepAliveStore.remove(componentName)
      }
    }
  }
})

createApp(App).use(pinia).use(router).mount('#app')
