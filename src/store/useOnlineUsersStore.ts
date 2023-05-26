import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOnlineUsersStore = defineStore('onlineUsers', () => {
  const online = ref<string[]>([])

  function setOnline(users: string[]) {
    online.value = users
  }

  return { online, setOnline }
})
