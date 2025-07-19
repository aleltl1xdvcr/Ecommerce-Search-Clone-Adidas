'use client'

export function manageStore(wish, key, data) {
  if (wish === 'get') {
    const a = localStorage.getItem(key)
    return a ? JSON.parse(a) : null
  }

  else if (wish === 'set') {
    const a = localStorage.setItem(key, JSON.stringify(data))
  }
} 