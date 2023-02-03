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
