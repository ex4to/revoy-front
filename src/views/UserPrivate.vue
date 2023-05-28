<script setup lang="ts">
import { ref } from 'vue'
import { router } from '../router'
import { useUserStore } from '../store'

const props = defineProps<{ socket: WebSocket; nickname: string }>()

const userStore = useUserStore()
const interlocutor = ref('')

const handleChatNav = (to: string) => {
  interlocutor.value = to
  router.replace(`/${props.nickname}/private/${to}`)
}
</script>

<template>
  <main class="min-h-[90vh] grid grid-cols-5 gap-2 p-2">
    <aside :class="$route.path === `/${nickname}/private` ? 'col-span-5' : 'hidden'">
      <ul class="flex flex-col gap-4">
        <li v-for="talk in userStore.userTalks" class="shadow-md text-cyan-600 font-bold">
          <button
            @click="handleChatNav(talk.interlocutor)"
            class="bg-white rounded-md p-2 w-full"
          >
            {{ talk.interlocutor }}
          </button>
        </li>
      </ul>
    </aside>
    <section
      class="h-full"
      :class="$route.path === `/${nickname}/private` ? 'hidden' : 'col-span-5'"
    >
      <RouterView :socket="socket" :from="nickname" :to="interlocutor" />
    </section>
  </main>
</template>
