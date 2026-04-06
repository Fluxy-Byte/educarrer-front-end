"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth/auth-client"
import { MessageCircle, Zap } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

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
        setError(result.error.message || "Erro ao fazer login")
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (<div className="min-h-screen flex items-center justify-center bg-white p-4 relative">

    ```
    {/* Background clean */ }
    <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100"></div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl relative z-10">

      {/* Left side - Brand */}
      <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-[#061735] via-[#06264D] to-[#061735] rounded-2xl p-12 relative overflow-hidden text-white">

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">EduCarrer AI</h1>
          </div>

          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Inteligência para impulsionar sua carreira
          </h2>

          <p className="text-white/80 text-lg mb-6">
            Plataforma inteligente para gestão, análise e crescimento profissional.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white/80">
              <Zap className="w-5 h-5 text-red-400" />
              <span>Automação com IA</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Zap className="w-5 h-5 text-red-400" />
              <span>Análises inteligentes</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Zap className="w-5 h-5 text-red-400" />
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
            <p className="text-[#AE0001] text-sm font-semibold uppercase mb-2">
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
                className="bg-white! border-zinc-300 focus:border-zinc-300 focus:border-zinc-300"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-600" htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className=""
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#AE0001] hover:bg-red-700 text-white font-semibold py-6 rounded-lg transition-all duration-300"
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

            <Link
              href="/signup"
              className="block w-full text-center px-4 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
            >
              Criar nova conta
            </Link>
          </form>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          © 2026 EduCarrer AI. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </div >)
}