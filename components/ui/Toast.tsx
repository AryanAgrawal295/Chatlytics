"use client"

import { useEffect, useState } from "react"

export type ToastType = "success" | "error" | "info"

interface Toast {
  id: string
  message: string
  type: ToastType
}

let toastIdCounter = 0
let listeners: ((toast: Toast | null) => void)[] = []

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null)

  useEffect(() => {
    const listener = (t: Toast | null) => setToast(t)
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }, [])

  const showToast = (message: string, type: ToastType = "info", duration = 3000) => {
    const id = String(toastIdCounter++)
    const newToast = { id, message, type }

    listeners.forEach((listener) => listener(newToast))

    setTimeout(() => {
      listeners.forEach((listener) => listener(null))
    }, duration)
  }

  return { toast, showToast }
}

export function ToastContainer() {
  const { toast } = useToast()

  if (!toast) return null

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[toast.type]

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slideIn">
      <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2`}>
        {toast.type === "success" && <span>✓</span>}
        {toast.type === "error" && <span>✕</span>}
        {toast.type === "info" && <span>ℹ</span>}
        <span>{toast.message}</span>
      </div>
    </div>
  )
}
