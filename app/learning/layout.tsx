"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/sonner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1 flex flex-col min-h-screen">

            <div className="sticky top-0! z-10 bg-white flex items-center justify-start px-4">
              <div className="flex py-4 items-center text-black mr-2">
                <SidebarTrigger size={"lg"} className="text-blue-600"/>
              </div>
              <div className="text-black block items-start md:flex md:flex-col">
                <h1 className="font-semibold text-md">Aprendizado inteligente</h1>
                <p className="text-zinc-500 hidden lg:block text-sm">Descubra novas habilidades e avance na sua carreira com conteúdos personalizados</p>

                <p className="text-zinc-500 block lg:hidden text-sm">Descubra novas habilidades e avance na sua carreira</p>
              </div>
            </div>

            <div className="p-6 h-full w-full bg-sky-50 border-t border-zinc-300">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </AuthProvider>
  )
}
