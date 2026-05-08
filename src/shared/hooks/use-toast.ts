import { useSyncExternalStore } from 'react'

type ToastVariant = 'default' | 'success' | 'destructive'

export interface ToastMessage {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
}

type ToastInput = Omit<ToastMessage, 'id'>

let toasts: ToastMessage[] = []
const listeners = new Set<() => void>()

const emitChange = () => {
  listeners.forEach((listener) => listener())
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = () => toasts

export function toast(input: ToastInput) {
  const id = crypto.randomUUID()

  toasts = [{ id, ...input }, ...toasts].slice(0, 4)
  emitChange()

  window.setTimeout(() => {
    dismissToast(id)
  }, 3500)

  return id
}

export function dismissToast(id: string) {
  toasts = toasts.filter((toastItem) => toastItem.id !== id)
  emitChange()
}

export function useToast() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
