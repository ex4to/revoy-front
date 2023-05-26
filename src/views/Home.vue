<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore, usePostsStore, useOnlineUsersStore } from '../store'
import { PostModel, TalkModel } from '../models'

const postsStore = usePostsStore()
const userStore = useUserStore()
const onlineUserStore = useOnlineUsersStore()

const BASE_URL = 'ws://localhost:8081/'
const socket = ref<WebSocket>(new WebSocket(BASE_URL))

socket.value.addEventListener('open', () => {
  socket.value.send(
    JSON.stringify({ type: 'login', data: { nickname: userStore.userNickname } }),
  )
})

socket.value.onmessage = (event) => {
  const response = JSON.parse(event.data)

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
  <article class="p-2 w-full min-h-screen bg-[url('/bg.jpg')] bg-cover bg-no-repeat">
    <header class="bg-white bg-opacity-80 px-2">
      <nav class="w-full flex gap-2 justify-between text-cyan-600 font-bold">
        <RouterLink to="/blog">
          <p>Блог</p>
        </RouterLink>
        <RouterLink :to="`/${userStore.userNickname}`">
          <p>Моя страница</p>
        </RouterLink>
        <RouterLink :to="`/${userStore.userNickname}/private`">
          <p>ЛС</p>
        </RouterLink>
      </nav>
    </header>
    <RouterView :socket="socket" :nickname="userStore.userNickname" />
  </article>
</template>
