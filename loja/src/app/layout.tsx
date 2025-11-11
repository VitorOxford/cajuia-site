// ARQUIVO: src/app/layout.tsx (Atualizado para incluir o Footer)

import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import CartDrawer from '@/components/CartDrawer'
import Footer from '@/components/Footer' // <--- 1. IMPORTE O FOOTER

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

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
      <body className={josefin.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <CartDrawer />

          <main className="flex-grow">{children}</main>

          <Footer /> {/* <--- 2. ADICIONE O FOOTER AQUI */}
        </div>
      </body>
    </html>
  )
}