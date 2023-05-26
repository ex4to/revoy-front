<script setup lang="ts">
import { useUserStore } from '../store'

const userStore = useUserStore()
const props = defineProps<{ socket: WebSocket }>()

props.socket.send(
  JSON.stringify({ type: 'login', data: { nickname: userStore.userNickname } }),
)

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
