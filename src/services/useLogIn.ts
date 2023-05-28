import { ResponseModel } from '../models'

const acceptReg = /^[a-zA-Z_0-9]+$/

export const useLogIn = (
  socket: WebSocket,
  nickname: string,
  pass: string,
): ResponseModel => {
  const response = {
    err: false,
    message: 'Успешный вход'
  }

  if (!nickname.match(acceptReg)) {
    response.err = true
    response.message= 'Недопустимые символы в логине'
  }

  if (!pass.match(acceptReg)) {
    response.err = true
    response.message= 'Недопустимые символы в пароле'
  }

  if (nickname.length < 4) {
    response.err = true
    response.message= 'Короткий логин'
    return response
  } else if (nickname.length > 10) {
    response.err = true
    response.message= 'Длинный логин'
  }

  if (pass.length < 4) {
    response.err = true
    response.message= 'Короткий пароль'
    return response
  } else if (pass.length > 10) {
    response.err = true
    response.message= 'Длинный пароль'
  }

  const data = {
    nickname,
    pass,
  }

  if (!response.err) {
    socket.send(JSON.stringify({ type: 'auth', data }))
  }

  return response

}
