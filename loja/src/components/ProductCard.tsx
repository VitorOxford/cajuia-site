// ARQUIVO: src/components/ProductCard.tsx (REFEITO)
'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  HeartIcon as HeartIconOutline,
  MagnifyingGlassPlusIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useState } from 'react'
import type { Product } from '@/types'
import { formatPrice, formatInstallments } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore' // Para o "Adicionar ao Carrinho"

type ProductCardProps = {
  product: Product
  onQuickViewClick: (product: Product) => void // Para o modal "Analisar"
}

export default function ProductCard({
  product,
  onQuickViewClick,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const addItemToCart = useCartStore((state) => state.addItem)

  // Cores da paleta
  const styles = {
    title: '#7A4E2D',
    text: '#56362C',
    buttonBg: '#FFF8F4',
    buttonText: '#56362C',
  }

  // Pega a primeira variante e imagem
  const primaryVariant = product.product_variants[0]
  const primaryImage = product.product_images[0]
  const secondaryImage = product.product_images[1] || primaryImage

  // Função para "Adicionar ao Carrinho"
  const handleAddToCart = () => {
    // Adiciona a primeira variante disponível
    addItemToCart({
      variantId: primaryVariant.id || product.id, // Supabase pode não ter 'id' na variant, use 'product.id' como fallback
      productId: product.id,
      title: product.title,
      handle: product.handle,
      imageSrc: primaryImage.src,
      price: primaryVariant.price,
      quantity: 1,
    })
    // (Opcional: abrir o CartDrawer)
    // useCartStore.getState().toggleCart()
  }

  return (
    <div className="group relative text-left">
      {/* 1. Container da Imagem (Bordas Retas) */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-200">
        {/* Imagem Principal */}
        <Image
          src={primaryImage.src}
          alt={product.title}
          fill
          style={{ objectFit: 'cover' }}
          className="h-full w-full transition-opacity duration-300 ease-in-out group-hover:opacity-0"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Imagem de Hover */}
        <Image
          src={secondaryImage.src}
          alt={product.title}
          fill
          style={{ objectFit: 'cover' }}
          className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* 2. Botão Wishlist (Sempre Visível) */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 z-20 p-2 rounded-full bg-white/70 backdrop-blur-sm transition-colors hover:bg-white"
          style={{ color: styles.text }}
          aria-label="Adicionar à wishlist"
        >
          {isWishlisted ? (
            <HeartIconSolid className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIconOutline className="h-5 w-5" />
          )}
        </button>

        {/* 3. Botões de Hover (Analisar e Adicionar) */}
        <div className="absolute bottom-0 z-10 flex w-full translate-y-full flex-col gap-0.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => onQuickViewClick(product)}
            className="flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold uppercase"
            style={{
              backgroundColor: styles.buttonBg,
              color: styles.buttonText,
            }}
          >
            <MagnifyingGlassPlusIcon className="h-4 w-4" />
            Analisar
          </button>
          <button
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold uppercase"
            style={{
              backgroundColor: styles.buttonBg,
              color: styles.buttonText,
            }}
          >
            <ShoppingBagIcon className="h-4 w-4" />
            Adicionar ao carrinho
          </button>
        </div>
      </div>

      {/* 4. Conteúdo de Texto */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold" style={{ color: styles.text }}>
          <Link href={`/produtos/${product.handle}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </Link>
        </h3>
        <div className="mt-1 flex flex-col">
          <span className="font-bold" style={{ color: styles.title }}>
            {formatPrice(primaryVariant.price)}
          </span>
          <span className="text-xs" style={{ color: styles.text }}>
            {formatInstallments(primaryVariant.price, 3)}
          </span>
        </div>
      </div>
    </div>
  )
}