import { ResponseModel } from '../models'

export const useRegistation = async (
  nickname: string,
  pass: string,
  passCheck: string,
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

  if (pass !== passCheck) {
    response = { err: true, message: 'Пароли не совпадают' }
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
    const raw = await fetch('http://localhost:8080/register', {
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
