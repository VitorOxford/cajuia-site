// ARQUIVO: src/components/Header.tsx (Atualizado com Efeitos de Hover)
'use client'

import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

// --- Ícones para Redes Sociais ---
const FacebookIcon = () => (
  <svg
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      clipRule="evenodd"
    />
  </svg>
)
const InstagramIcon = () => (
  <svg
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm6-10.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z"
      clipRule="evenodd"
    />
  </svg>
)
// --- Fim dos Ícones ---

export default function Header() {
  const items = useCartStore((state) => state.items)
  const toggleCart = useCartStore((state) => state.toggleCart)

  const [itemCount, setItemCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(4) // Exemplo

  useEffect(() => {
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
    setItemCount(totalItems)
  }, [items])

  const navigationLinks = [
    { name: 'INÍCIO', href: '/' },
    { name: 'ATACADO', href: '/wholesale' },
    { name: 'CATÁLOGO', href: '/catalog' },
    { name: 'ENTRAR EM CONTATO', href: '/contact' },
    { name: 'NOSSAS COLEÇÕES', href: '/collections' },
    { name: 'RASTREAR PEDIDO', href: '/track-order' },
  ]

  // Paleta de Cores Base
  const styles = {
    background: '#FFF8F4',
    topBarBg: '#AC6231',
    topBarText: '#FFFFFF',
    title: '#7A4E2D',
    icons: '#56362C',
    badgeBg: '#7A4E2D',
    badgeText: '#FFFFFF',
    badgeBorder: '#FFF8F4',
  }

  const borderColor = 'rgba(122, 78, 45, 0.2)'
  const strokeWidth = 2.5

  return (
    <header
      className="sticky top-0 z-10 border-b"
      style={{
        backgroundColor: styles.background,
        borderColor: borderColor,
      }}
    >
      {/* 1. BARRA DE TOPO */}
      <div style={{ backgroundColor: styles.topBarBg }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 lg:px-8">
          <div className="flex-1 justify-start">
            <p className="text-xs" style={{ color: styles.topBarText }}>
              FRETE GRÁTIS PARA COMPRAS ACIMA DE R$100,00
            </p>
          </div>
          <div className="flex flex-1 justify-end gap-x-3">
            <a href="#" style={{ color: styles.topBarText }}>
              <FacebookIcon />
            </a>
            <a href="#" style={{ color: styles.topBarText }}>
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>

      {/* 2. BARRA MÉDIA (Logo e Ícones) */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-8 pb-5 lg:px-8">
        {/* Esquerda: Telefone ou Menu Mobile */}
        <div className="flex flex-1 justify-start">
          <p
            className="hidden lg:block text-sm font-medium"
            style={{ color: styles.title }}
          >
            +(800) 888 9999
          </p>
          <div className="lg:hidden">
            <button style={{ color: styles.icons }}>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={strokeWidth}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Centro: Logo */}
        <div className="flex flex-1 justify-center">
          <Link href="/">
            <Image
              src="/logocajuia.png"
              alt="Cajuia Logo"
              width={180}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Direita: Ícones (com Efeito de Hover) */}
        <div
          className="flex flex-1 items-center justify-end gap-x-4"
          style={{ color: styles.icons }}
        >
          {/* Lupa */}
          <button
            className="hidden lg:block p-2 relative rounded-full transition-colors duration-200 hover:bg-black/5" // <--- HOVER
          >
            <MagnifyingGlassIcon className="h-5 w-5" strokeWidth={strokeWidth} />
          </button>
          {/* Usuário */}
          <button
            className="hidden lg:block p-2 relative rounded-full transition-colors duration-200 hover:bg-black/5" // <--- HOVER
          >
            <UserIcon className="h-5 w-5" strokeWidth={strokeWidth} />
          </button>
          {/* Heart/Wishlist */}
          <button
            className="hidden lg:block p-2 relative rounded-full transition-colors duration-200 hover:bg-black/5" // <--- HOVER
          >
            <HeartIcon className="h-5 w-5" strokeWidth={strokeWidth} />
            {wishlistCount > 0 && (
              <span
                className="absolute -bottom-0.5 -right-0.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: styles.badgeBg,
                  color: styles.badgeText,
                  border: `1px solid ${styles.badgeBorder}`,
                }}
              >
                {wishlistCount}
              </span>
            )}
          </button>
          {/* Carrinho de Compras */}
          <button
            onClick={toggleCart}
            className="group flex items-center p-2 relative rounded-full transition-colors duration-200 hover:bg-black/5" // <--- HOVER
          >
            <ShoppingBagIcon
              className="h-5 w-5 flex-shrink-0"
              strokeWidth={strokeWidth}
            />
            {itemCount > 0 && (
              <span
                className="absolute -bottom-0.5 -right-0.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: styles.badgeBg,
                  color: styles.badgeText,
                  border: `1px solid ${styles.badgeBorder}`,
                }}
              >
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 3. BARRA INFERIOR (Navegação com Efeito de Hover) */}
      <div className="mx-auto hidden max-w-7xl justify-center px-6 pb-4 lg:flex lg:gap-x-16">
        {navigationLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="relative group pt-1 pb-4 text-sm font-medium uppercase tracking-wide" // 1. Adiciona 'relative group' e 'pb-4'
            style={{ color: styles.title }}
          >
            {link.name}
            {/* 2. A LINHA DE HOVER */}
            <span
              className="absolute bottom-2 left-0 h-[2px] w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"
              style={{ backgroundColor: styles.title }}
            ></span>
          </Link>
        ))}
      </div>
    </header>
  )
}