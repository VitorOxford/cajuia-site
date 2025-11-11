// ARQUIVO: src/components/ProductCard.tsx (NOVO FICHEIRO)
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { HeartIcon } from '@heroicons/react/24/outline'
import type { Product } from '@/types'
import { formatPrice, formatInstallments } from '@/lib/utils'

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  // Cores da paleta
  const styles = {
    title: '#7A4E2D',
    text: '#56362C',
    buttonBg: '#7A4E2D',
    buttonText: '#FFF8F4',
  }

  // Pega a primeira variante e imagem
  const primaryVariant = product.product_variants[0]
  const primaryImage = product.product_images[0]

  // Tenta encontrar uma segunda imagem para o hover (comum em temas Shopify)
  const secondaryImage = product.product_images[1] || primaryImage

  return (
    <div className="group relative text-left">
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-md bg-gray-200">
        {/* Imagem Principal (some no hover) */}
        <Image
          src={primaryImage.src}
          alt={product.title}
          fill
          style={{ objectFit: 'cover' }}
          className="h-full w-full transition-opacity duration-300 ease-in-out group-hover:opacity-0"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority // Opcional: carregar as primeiras imagens mais rápido
        />
        {/* Imagem de Hover (aparece no hover) */}
        <Image
          src={secondaryImage.src}
          alt={product.title}
          fill
          style={{ objectFit: 'cover' }}
          className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Botões de Hover (COMPRAR e Wishlist) */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            className="py-2 px-5 text-sm font-medium transition-colors rounded-sm"
            style={{
              backgroundColor: styles.buttonBg,
              color: styles.buttonText,
            }}
          >
            COMPRAR
          </button>
          <button
            className="rounded-full bg-white p-2 shadow-md transition-colors hover:text-red-500"
            style={{ color: styles.text }}
            aria-label="Adicionar à wishlist"
          >
            <HeartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Conteúdo de Texto */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold" style={{ color: styles.text }}>
          <Link href={`/produtos/${product.handle}`}>
            {/* O Link cobre todo o card para ser clicável */}
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