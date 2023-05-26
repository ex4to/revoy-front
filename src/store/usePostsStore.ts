import { defineStore } from 'pinia'
import { ref } from 'vue'
import { PostModel } from '../models/postModel'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<PostModel[]>([])

  function setPosts(newPosts: PostModel[]) {
    posts.value = newPosts
  }

  function pushPost(newPost: PostModel) {
    posts.value.push(newPost)
  }

  return { posts, setPosts, pushPost }
})
