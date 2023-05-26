import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'
import { router } from './router'
import { useUserStore } from './store'

createApp(App).use(createPinia()).use(router).mount('#app')

const userStore = useUserStore()

router.beforeEach((to, from, next) => {
  if (to.matched.some((rec) => rec.meta.reqiuresAuth)) {
    !userStore.isLogIn ? next({ path: '/auth' }) : next()
  } else if (to.matched.some((rec) => rec.meta.reqiuresCurrentUser)) {
    console.log(to, from);
    next({ path: `/${userStore.userNickname}/private` })
  } else {
    next()
  }
})
