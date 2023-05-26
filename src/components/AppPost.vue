<script setup lang="ts">
import { PostModel } from '../models/postModel'
import { router } from '../router'
import { useOnlineUsersStore } from '../store'

defineProps<{ posts: PostModel[] }>()

const onlineUserStore = useOnlineUsersStore()

const toUserPage = (nickname: string) => {
  router.push(`/${nickname}`)
}
</script>

<template>
  <li
    v-for="post in posts"
    class="shadow rounded-lg border-cyan-600 border-2 bg-gray-200"
  >
    <header
      class="bg-cyan-600 text-white p-2 font-bold flex justify-between items-center"
    >
      <button @click="toUserPage(post.nickname)">{{ post.nickname }}</button>
      <div
        v-if="onlineUserStore.online.findIndex((e) => e === post.nickname) !== -1"
        class="w-4 h-4 bg-lime-600 rounded-full animate-pulse border border-black"
      ></div>
    </header>
    <main class="p-2">
      {{ post.text }}
    </main>
  </li>
</template>
