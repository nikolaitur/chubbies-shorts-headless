import cookie from 'cookie'

export const splitArrayToChunks = (array: any[], size = 2) => {
  const length = array.length
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size))
  }

  return result
}

export const batchArray = (arr: any[], size: number) => {
  const batched = []
  for (let i = 0; i < arr.length; i += size) {
    batched.push(arr.slice(i, i + size))
  }
  return batched
}

export const parseCookie = (request: Request, name: string) => {
  const cookieString = request.headers.get('Cookie') || ''
  const cookies = cookie.parse(cookieString)
  return cookies[name]
}

export const capitalizeWord = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
