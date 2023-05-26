import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error', () => {
  const isError = ref(false)
  const errorMessage = ref('')

  function setError(bool: boolean, message: string) {
    isError.value = bool
    errorMessage.value = message
  }

  return { isError, errorMessage, setError }
})
