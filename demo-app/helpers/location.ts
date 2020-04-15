import qs from 'querystring'

function decodeUrlSearch(url: string) {
  const search = url.replace('/?', '')
  const o = qs.decode(search)
  if (o) {
    Object.entries(o).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value = value.filter(s => s)
        if (value.length === 0) {
          delete o[key]
        } else if (value.length === 1) {
          o[key] = value[0]
        }
      }
    })
  }
  return o
}

function getHashFromSearch(search: any, defaultValue: string): string {
  if (typeof search.hash === 'string') {
    return search.hash
  }
  if (Array.isArray(search.hash)) {
    return search.hash[search.hash.length - 1]
  }
  return defaultValue
}

export function getHash(url: string): string {
  const search = decodeUrlSearch(url)
  const hash = getHashFromSearch(search, '#/')
  if (hash.startsWith('#')) {
    return hash
  }
  return '#' + hash
}
