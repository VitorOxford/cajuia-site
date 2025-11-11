// ARQUIVO: src/components/Header.tsx (Atualizado)
'use client' 

import { useCartStore } from '@/store/cartStore' // <--- 1. IMPORTA O STORE
import Link from 'next/link'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

export default function Header() {
  const items = useCartStore((state) => state.items)
  const toggleCart = useCartStore((state) => state.toggleCart) // <--- 2. PEGA A AÇÃO

  const [itemCount, setItemCount] = useState(0)
  useEffect(() => {
    // Calcula a quantidade total de itens (ex: 2 camisas + 1 calça = 3)
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
    setItemCount(totalItems)
  }, [items])


  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Logo (link para a Home) */}
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Cajuia
        </Link>

        {/* Ícone do Carrinho */}
        <div className="flow-root">
          <button
            onClick={toggleCart} // <--- 3. USA A AÇÃO AQUI
            className="group -m-2 flex items-center p-2"
          >
            <ShoppingBagIcon
              className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
              {itemCount}
            </span>
            <span className="sr-only">itens no carrinho</span>
          </button>
        </div>
      </nav>
    </header>
  )
}