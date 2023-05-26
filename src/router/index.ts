import { createRouter, createWebHistory } from 'vue-router'

import Auth from '../views/Auth.vue'
import Home from '../views/Home.vue'
import Blog from '../views/Blog.vue'
import UserPage from '../views/UserPage.vue'
import UserPrivate from '../views/UserPrivate.vue'
import UserPrivateChat from '../views/UserPrivateChat.vue'

const routes = [
  {
    path: '/',
    component: Home,
    meta: { reqiuresAuth: true },
    children: [
      {
        path: 'blog',
        component: Blog,
        props: {
          socket: WebSocket,
        },
      },
      {
        path: ':nickname',
        component: UserPage,
        props: {
          socket: WebSocket,
        },
      },
      {
        path: ':nickname/private',
        component: UserPrivate,
        props: {
          socket: WebSocket,
        },
        meta: { reqiuresCurrentUser: true },
        children: [
          {
            path: ':recipient',
            component: UserPrivateChat,
            props: {
              socket: WebSocket,
            },
          }
        ]
      },
    ],
  },
  { path: '/auth', component: Auth },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
