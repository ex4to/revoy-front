<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore, usePostsStore } from '../store'
import AppPost from '../components/AppPost.vue'
import { usePosts } from '../services'

const props = defineProps<{ socket: WebSocket }>()
const postsStore = usePostsStore()
const userStore = useUserStore()

const text = ref('')

const sendPost = () => {
  const post = { nickname: userStore.userNickname, text: text.value, comments: [] }
  usePosts(props.socket, post)
  text.value = ''
}
</script>

<template>
  <main class="max-w-lg mx-auto">
    <div class="flex gap-2 justify-between py-2 px-4">
      <input
        placeholder="Введите сообщение"
        class="p-1 bg-white border-b-2 border-cyan-700 outline-none w-full rounded-t"
        v-model="text"
      />
      <button
        @click="sendPost"
        class="bg-gray-200 text-cyan-700 border-2 border-cyan-600 px-2 font-bold shadow rounded"
      >
        Пост
      </button>
    </div>
    <ul class="flex flex-col-reverse gap-4 p-2">
      <AppPost :posts="postsStore.posts" />
    </ul>
  </main>
</template>
