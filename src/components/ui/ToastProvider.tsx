"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { cn } from "@/lib/utils"

type ToastType = 'success' | 'error'

interface Toast {
  id: string
  message: string
  type: ToastType
  visible: boolean
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type, visible: true }])

    setTimeout(() => {
      setToasts((prev) => prev.map(t => t.id === id ? { ...t, visible: false } : t))
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 300)
    }, 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md text-sm font-medium transition-all duration-300 pointer-events-auto",
              t.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
              t.type === 'success' 
                ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-200" 
                : "bg-red-500/20 border-red-500/30 text-rose-200"
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within ToastProvider")
  return context
}
