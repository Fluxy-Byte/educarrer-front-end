"use client"

import { toast } from "sonner"

interface ToastProps {
    mensagem: string
}

export function ToastPersonalizado({ mensagem }: ToastProps) {
    toast(mensagem, {
        position: "top-center",
        className: "bg-orange-400! border-none! text-white text-base! p-4! text-center! flex! justify-center! items-center!",
    })
}
