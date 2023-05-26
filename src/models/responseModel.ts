export type ResponseModel = {
  err: boolean
  message: string
  data?: {
    nickname: string
    text: string
  }
}
