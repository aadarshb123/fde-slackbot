import { useState } from 'react'
import type { Toast } from '../types'

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([])

  function showToast(title: string, category: string) {
    const id = Math.random().toString(36).substring(7)
    setToasts(prev => [...prev, { id, title, category }])

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 4000)
  }

  function dismissToast(id: string) {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return {
    toasts,
    showToast,
    dismissToast
  }
}
