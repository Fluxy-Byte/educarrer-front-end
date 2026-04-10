"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth/auth-client"
import { BookOpenText, Zap, BotMessageSquare, ChartCandlestick, Eye, EyeOff, ArrowRight } from "lucide-react"

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordSecond, setShowPasswordSecond] = useState(false);
  const [step, setStep] = useState(1);

  const nextStep = async () => {
    try {
      if (name && email) {
        setStep(2);
        setError("");
        return;
      } else {
        setError("Por favor, preencha nome e email para continuar");
        return;
      }
    } catch (e) {
      console.log(e)
      setStep(1)
      setError("Tivemos um erro previsto começe novamente");
      return;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres")
      return
    }

    setIsLoading(true)

    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      })

      console.log(result)

      if (result.error) {
        setError(result.error.message || "Erro ao criar conta")
      } else {
        router.push("/jobs")
      }
    } catch (err) {
      setError("Erro ao criar conta. Tente novamente.")
      console.log(err)
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

        {/* Right side - Signup Form */}
        <div className="flex flex-col justify-center">

          {step == 1 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-xl rounded">
              <div className="mb-8">
                <p className="text-red-400 text-md font-semibold tracking-wide uppercase mb-2">
                  Nova Conta
                </p>
                <h3 className="text-3xl font-bold text-black mb-2">
                  Criar Conta
                </h3>
                <p className="text-muted-foreground">
                  Preencha os dados abaixo para começar
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-black font-medium">
                    Nome Completo
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isLoading}
                    className="relative w-full flex items-center bg-white! border-zinc-300 focus-within:border-zinc-400 rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-black font-medium">
                    Email
                  </Label>
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

                <Button
                  onClick={() => nextStep()}
                  disabled={isLoading}
                  className="w-full bg-[#AE0001] mb-0 hover:bg-red-700 text-white font-semibold py-6 rounded-lg transition-all duration-300"
                >
                  <ArrowRight /> Proximo
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-purple-500/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-muted-foreground">
                      Já tem uma conta?
                    </span>
                  </div>
                </div>

                <Link
                  href="/login"
                  className="block w-full text-center px-4 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
                >
                  Fazer login
                </Link>
              </form>
            </div>
          )
          }

          {step == 2 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-black mb-2">
                  Ja esta quase lá!
                </h3>
                <p className="text-muted-foreground">
                  Preencha sua senha agora para finalizar o cadastro
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-black font-medium">
                    Senha
                  </Label>
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-black font-medium">
                    Confirmar Senha
                  </Label>
                  <div className="relative w-full rounded-md">
                    <Input
                      id="password"
                      type={showPasswordSecond ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="relative w-full flex items-center bg-white! border-zinc-300 focus-within:border-zinc-400 rounded-md"
                    />
                    {showPasswordSecond ? (
                      <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500" onClick={() => setShowPasswordSecond(false)} />
                    ) : (
                      <Eye className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500" onClick={() => setShowPasswordSecond(true)} />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="mb-0"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Criando conta...
                      </div>
                    ) : (
                      "Criar Conta"
                    )}
                  </Button>

                  <Button
                    onClick={() => (setStep(1), setPassword(""), setConfirmPassword(""))}
                    disabled={isLoading}
                    variant={"link"}
                    className="mt-5"
                  >
                    Voltar
                  </Button>
                </div>


                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-purple-500/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-muted-foreground">
                      Já tem uma conta?
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => router.push("/singin")}
                  variant={"link"}
                >
                  Fazer login
                </Button>
              </form>
            </div>
          )}



          <p className="text-center text-gray-400 text-xs mt-6">
            © 2026 EduCarrer AI. Todos os direitos reservados.
          </p>
        </div>
      </div >
    </div >
  )
}
