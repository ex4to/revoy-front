import { ResponseModel } from '../models'

export const useLogIn = (
  socket: WebSocket,
  nickname: string,
  pass: string,
): ResponseModel => {
  const response = {
    err: false,
    message: 'Успешный вход'
  }

  if (nickname.length < 4) {
    response.err = true
    response.message= 'Короткий логин'
    return response
  }

  if (pass.length < 4) {
    response.err = true
    response.message= 'Короткий пароль'
    return response
  }

  const data = {
    nickname,
    pass,
  }

  socket.send(JSON.stringify({ type: 'auth', data }))
  return response

}
