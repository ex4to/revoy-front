<script setup lang="ts">
import { ref } from 'vue'
import { PostModel, TalkModel, AuthModel } from './models'
import { useErrorStore, useOnlineUsersStore, usePostsStore, useUserStore } from './store'

const userStore = useUserStore()
const onlineUserStore = useOnlineUsersStore()
const postsStore = usePostsStore()
const errorStore = useErrorStore()

const BASE_URL = 'ws://localhost:8020/'
const socket = ref<WebSocket>(new WebSocket(BASE_URL))

socket.value.onmessage = (event) => {
  const response = JSON.parse(event.data)

  if (response.type === 'registration' || response.type === 'auth') {
    const credentials: AuthModel = response.data

    if (credentials.err) {
      errorStore.setError(credentials.err, credentials.message)
    } else {
      userStore.setLogIn(true, credentials.data.nickname)
    }
  }

  if (response.type === 'post') {
    const posts: PostModel[] = response.data
    postsStore.setPosts(posts)
  }

  if (response.type === 'talks') {
    const talks: TalkModel[] = response.data
    userStore.setTalks(talks)
  }

  if (response.type === 'online') {
    onlineUserStore.setOnline(response.data)
  }
}
</script>

<template>
  <RouterView :socket="socket" />
</template>
