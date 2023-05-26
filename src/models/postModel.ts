export type PostModel = {
  nickname: string
  text: string
  comments: {
    nickname: string
    comment: string
  }[]
}

