import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import '../styles/globals.css'
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: 'EduCarrer AI',
  description: 'Aprenda a estudar para vagas de mercado reais com nossos agentes treinados para modelar seu conhecimento para o formato de vagas de emprego reais, e te ajudar a se preparar para elas.',
  generator: 'V1.0',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased dark"
        cz-shortcut-listen="true"
      >
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
