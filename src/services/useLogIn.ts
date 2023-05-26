import { ResponseModel } from '../models'

export const useLogIn = async (
  nickname: string,
  pass: string,
): Promise<ResponseModel> => {
  let response

  if (nickname.length < 4) {
    response = { err: true, message: 'Короткий логин' }
    return response
  }
  
  if (pass.length < 4) {
    response = { err: true, message: 'Короткий пароль' }
    return response
  }

  const data = {
    nickname,
    pass,
  }

  const headers: HeadersInit = [
    ['Access-Control-Allow-Origin', '*'],
    ['Accept', 'application/json'],
    ['Content-Type', 'application/json'],
  ]

  try {
    const raw = await fetch('http://localhost:8080/login', {
      headers,
      method: 'POST',
      body: JSON.stringify(data),
    })

    response = await raw.json()
  } catch (err) {
    response = { err: true, message: 'Ошибка сервера' }
    console.error(err)
  }

  return response
}
