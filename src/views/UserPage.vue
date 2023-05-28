<script setup lang="ts">
import AppPost from '../components/AppPost.vue'
import { router } from '../router'
import { useTalks } from '../services'
import { usePostsStore } from '../store'

const props = defineProps<{ socket: WebSocket; nickname: string }>()
const postsStore = usePostsStore()

const handleChat = (from: string, to: string) => {
  useTalks(props.socket, from, to)
  router.push(`/${from}/private`)
}
</script>

<template>
  <main class="max-w-lg mx-auto p-2 flex flex-col gap-4">
    <p class="text-cyan-600 font-bold text-center bg-black bg-opacity-75 p-2">
      {{ $route.params.nickname }}
    </p>
    <div v-if="nickname !== $route.params.nickname">
      <button
        @click="handleChat(nickname, $route.params.nickname as string)"
        class="bg-gray-200 text-cyan-700 border-2 border-cyan-600 px-2 font-bold shadow rounded w-full"
      >
        Написать
      </button>
    </div>
    <section>
      <ul class="flex flex-col gap-4 h-[70vh] max-h-[70vh] overflow-scroll scroll-hide">
        <AppPost
          :posts="postsStore.posts.filter((e) => e.nickname === $route.params.nickname)"
        />
      </ul>
    </section>
  </main>
</template>
