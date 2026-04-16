"use client"

import { toast } from "sonner"

interface ToastProps {
    mensagem: string
}

export function ToastPersonalizado({ mensagem }: ToastProps) {
    toast(mensagem, { 
        position: "bottom-right",
        className: "bg-blue-20 text-white rounded-md shadow-lg p-4",
     })
}
