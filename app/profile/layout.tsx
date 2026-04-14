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

            <div className="sticky top-0! z-10 bg-white flex items-center justify-start gap-2">
              <div className="flex py-6 items-center text-black px-4">
                <SidebarTrigger />
              </div>
              <div className="text-black block items-start hidden md:flex md:flex-col">
                <h1 className="font-semibold text-md">Pefil</h1>
                <p className="text-zinc-500 text-sm">Gerencie suas informações pessoais</p>
              </div>
            </div>

            <div className="p-6 h-full w-full bg-zinc-200 rounded-ss-lg">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </AuthProvider>
  )
}
