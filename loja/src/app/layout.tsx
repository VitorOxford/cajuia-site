// ARQUIVO: src/app/layout.tsx (Atualizado)

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import CartDrawer from '@/components/CartDrawer' // <--- 1. IMPORTE O DRAWER

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cajuia Store',
  description: 'Sua nova loja Cajuia',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          
          <Header />
          <CartDrawer /> {/* <--- 2. ADICIONE O DRAWER AQUI */}
          
          <main className="flex-grow">{children}</main>
          
          {/* Footer */}
        </div>
      </body>
    </html>
  )
}