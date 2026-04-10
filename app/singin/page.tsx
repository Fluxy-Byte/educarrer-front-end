"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth/auth-client"
import { BookOpenText, Zap, BotMessageSquare, ChartCandlestick, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const filterErrorMessage = (message: string) => {
    if (message === "Invalid email or password") {
      return "Email ou senha inválidos"
    } else if (message === "User not found") {
      return "Usuário não encontrado"
    } else if (message === "Invalid email") {
      return "Email inválido"
    } else {
      return message || "Erro ao fazer login"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      const result = await authClient.signIn.email({
        email,
        password,
      })

      if (result.error) {
        setError(filterErrorMessage(result.error.message ?? ""))
      } else {
        router.push("/jobs")
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 overflow-hidden relative">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-600 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-red-500 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl relative z-10">

        {/* Left side - Brand */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-[#002C85] via-[#0B3875] to-[#061735] rounded-2xl p-12 relative overflow-hidden text-white">

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <BookOpenText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">EduCarrer AI</h1>
            </div>

            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Inteligência Artificial para impulsionar sua carreira.
            </h2>

            <p className="text-white/80 text-lg mb-6">
              Plataforma personalizada para gestão, análise e crescimento profissional.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <BotMessageSquare className="w-5 h-5 text-white/80" />
                <span>Automação com IA</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <ChartCandlestick className="w-5 h-5 text-white/80" />
                <span>Análises inteligentes</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Zap className="w-5 h-5 text-white/80" />
                <span>Escalabilidade profissional</span>
              </div>
            </div>
          </div>

          <div className="text-white/60 text-sm">
            Transformando dados em oportunidades
          </div>
        </div>

        {/* Right side - Login */}
        <div className="flex flex-col justify-center">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-xl">

            <div className="mb-8">
              <p className="text-[#AE0001] text-md font-semibold mb-2">
                Bem-vindo
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Acesse sua conta
              </h3>
              <p className="text-gray-500">
                Entre para continuar na plataforma
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-zinc-600" htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="relative w-full flex items-center bg-white! border-zinc-300 focus-within:border-zinc-400 rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-600" htmlFor="password">Senha</Label>
                <div className="relative w-full rounded-md">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="relative w-full flex items-center bg-white! border-zinc-300 focus-within:border-zinc-400 rounded-md"
                  />
                  {showPassword ? (
                    <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500" onClick={() => setShowPassword(false)} />
                  ) : (
                    <Eye className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500" onClick={() => setShowPassword(true)} />
                  )}
                </div>

              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="mb-0"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Não tem uma conta?
                  </span>
                </div>
              </div>

              <Button
                onClick={() => router.push("/singup")}
                variant={"link"}
              >
                Criar nova conta
              </Button>
            </form>
          </div>

          <p className="text-center text-gray-400 text-xs mt-6">
            © 2026 EduCarrer AI. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div >)
}