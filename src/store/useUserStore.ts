import { defineStore } from 'pinia'
import { ref } from 'vue'
import { TalkModel } from '../models'

export const useUserStore = defineStore('user', () => {
  const isLogIn = ref(false)
  const userNickname = ref('')
  const userTalks = ref<TalkModel[]>([])

  function setLogIn(state: boolean, nickname: string) {
    isLogIn.value = state
    userNickname.value = nickname
  }

  function setTalks(talks: TalkModel[]) {
    userTalks.value = talks
  }

  return { isLogIn, userNickname, userTalks, setLogIn, setTalks }
})
