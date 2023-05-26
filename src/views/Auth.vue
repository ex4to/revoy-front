<script setup lang="ts">
import { ref } from 'vue'
import { useLogIn, useRegistation } from '../services'
import { useUserStore } from '../store'
import { watch } from 'vue'
import { router } from '../router'

const selectedTab = ref('in')
const loginNickname = ref('')
const loginPass = ref('')

const regNickname = ref('')
const regPass = ref('')
const regPassConf = ref('')

const isError = ref(false)
const errorMessage = ref('')

const userStore = useUserStore()

const handleConnection = async () => {
  isError.value = false
  errorMessage.value = ''

  if (selectedTab.value === 'in') {
    const res = await useLogIn(loginNickname.value, loginPass.value)
    if (res.err) {
      isError.value = res.err
      errorMessage.value = res.message
    } else if (res.data) {
      userStore.setLogIn(true, res.data.nickname)
      router.replace('/')
    }
  } else {
    const res = await useRegistation(regNickname.value, regPass.value, regPassConf.value)

    if (res.err) {
      isError.value = res.err
      errorMessage.value = res.message
    } else if (res.data) {
      userStore.setLogIn(true, res.data.nickname)
      router.replace('/')
    }
  }
}

watch(selectedTab, () => {
  isError.value = false
  errorMessage.value = ''
})
</script>

<template>
  <article class="w-full min-h-screen bg-[url('/bg.jpg')] bg-cover bg-no-repeat">
    <div class="flex flex-col justify-center items-center w-full min-h-screen">
      <div class="bg-white bg-opacity-90 flex flex-col gap-4 rounded">
        <nav class="flex gap-2 justify-between p-2">
          <button
            @click="selectedTab = 'in'"
            class="border-2 border-cyan-600 rounded-md shadow-md w-full transition-all p-1"
            :class="
              selectedTab === 'in' ? 'bg-cyan-600 text-white' : 'bg-white text-cyan-700'
            "
          >
            Войти
          </button>
          <button
            @click="selectedTab = 'reg'"
            class="border-2 border-cyan-600 rounded-md shadow-md w-full transition-all p-1"
            :class="
              selectedTab === 'reg' ? 'bg-cyan-600 text-white' : 'bg-white text-cyan-700'
            "
          >
            Регистрация
          </button>
        </nav>
        <div v-if="isError" class="p-1">
          <p class="bg-red-400 text-white p-2 text-center">
            {{ errorMessage }}
          </p>
        </div>
        <div v-if="selectedTab === 'in'" class="flex flex-col gap-2 p-2">
          <input
            v-model="loginNickname"
            class="p-1 bg-transparent border-b border-cyan-700 outline-none"
            placeholder="Логин"
            type="text"
          />
          <input
            v-model="loginPass"
            class="p-1 bg-transparent border-b border-cyan-700 outline-none"
            placeholder="Пароль"
            type="password"
          />
        </div>
        <div v-else class="flex flex-col gap-2 p-2">
          <input
            v-model="regNickname"
            class="p-1 bg-transparent border-b border-cyan-700 outline-none"
            placeholder="Логин"
            type="text"
          />
          <input
            v-model="regPass"
            class="p-1 bg-transparent border-b border-cyan-700 outline-none"
            placeholder="Пароль"
            type="password"
          />
          <input
            v-model="regPassConf"
            class="p-1 bg-transparent border-b border-cyan-700 outline-none"
            placeholder="Повторите пароль"
            type="password"
          />
        </div>
        <button
          @click="handleConnection"
          class="bg-cyan-600 text-white p-2 rounded-b text-lg font-bold"
        >
          Продолжить
        </button>
      </div>
    </div>
  </article>
</template>
