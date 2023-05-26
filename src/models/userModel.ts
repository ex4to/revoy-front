export type UserModel = {
  nickname: string
  talks: TalkModel[]
}

export type TalkModel = {
  interlocutor: string
  messages: MessageModel[]
}

export type MessageModel = {
  text: string
  sender: string
}
