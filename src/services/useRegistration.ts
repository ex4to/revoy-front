import { ResponseModel } from '../models'

export const useRegistation = (
  socket: WebSocket,
  nickname: string,
  pass: string,
  passCheck: string,
): ResponseModel => {
  const response = {
    err: false,
    message: 'Успешный вход',
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

  if (pass !== passCheck) {
    response.err = true
    response.message= 'Пароли не совпадают'
    return response
  }

  const data = {
    nickname,
    pass,
  }

  socket.send(JSON.stringify({ type: 'registration', data }))
  return response
}
