<script setup lang="ts">
import { ref } from 'vue'
import { useTalks } from '../services'
import { useUserStore } from '../store'

const props = defineProps<{ socket: WebSocket; from: string; to: string }>()
const message = ref('')
const userStore = useUserStore()

const sendMessage = () => {
  if (message.value.length) {
    useTalks(props.socket, props.from, props.to, message.value)
    message.value = ''
  }
}

const useCurrentChat = () => {
  return userStore.userTalks.find((e) => e.interlocutor === props.to)?.messages
}
</script>

<template>
  <article class="bg-gray-200 flex flex-col h-full">
    <main class="h-full overflow-scroll">
      <ul class="flex flex-col gap-1">
        <li v-for="chat in useCurrentChat()" class="flex w-full text-white p-1 break-all">
          <p v-if="chat.sender === from" class="bg-cyan-600 w-2/3 ml-auto p-1 rounded-lg">
            {{ chat.text }}
          </p>
          <p v-else class="p-1 bg-lime-600 w-2/3 rounded-lg">
            {{ chat.text }}
          </p>
        </li>
      </ul>
    </main>
    <div class="flex gap-2 relative">
      <input v-model="message" placeholder="Сообщение" class="w-full" />
      <button @click="sendMessage">Отпр</button>
    </div>
  </article>
</template>
