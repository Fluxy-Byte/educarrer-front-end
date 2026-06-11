import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Poppins } from 'next/font/google'

import '../styles/globals.css'
import { Toaster } from "@/components/ui/sonner"

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'EduCarrer AI',
  description:
    'Aprenda a estudar para vagas de mercado reais com nossos agentes treinados para modelar seu conhecimento para o formato de vagas de emprego reais, e te ajudar a se preparar para elas.',
  generator: 'V1.0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} antialiased dark`}>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}