<script setup lang="ts">
import { ref } from 'vue'
import { useTalks } from '../services'
import { useUserStore } from '../store'
import { router } from '../router'

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

const handleNavBack = () => {
  router.replace(`/${props.from}/private`)
}
</script>

<template>
  <article class="bg-gray-200 flex flex-col">
    <header class="flex gap-4 justify-between p-2 bg-cyan-600 shadow items-center">
      <button
        @click="handleNavBack"
        class="w-6 h-6 bg-white rounded-full text-cyan-600 font-bold"
      >
        &lt;
      </button>
      <p class="text-white font-bold text-lg">{{ to }}</p>
    </header>
    <main>
      <ul class="flex flex-col gap-1 h-[80vh] overflow-y-scroll scroll-hide">
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
    <footer class="flex border-t-2 border-t-cyan-700 p-1">
      <input v-model="message" placeholder="Сообщение" class="w-full p-1 outline-none bg-transparent border-b border-cyan-700" />
      <button @click="sendMessage" class="bg-cyan-600 text-white rounded-r-md font-bold p-1">Отпр</button>
    </footer>
  </article>
</template>
