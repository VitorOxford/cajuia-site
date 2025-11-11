// ARQUIVO: src/app/page.tsx (Atualizado com Banner + Lista de Produtos)
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient'
import type { Product } from '@/types'
import BannerCarousel from '@/components/BannerCarousel' // <--- 1. IMPORTA O BANNER
import { Josefin_Sans } from 'next/font/google' // <--- 2. IMPORTA A FONTE

// Configura a fonte para o título
const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
})

// Função de formatação de preço
function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // 3. Define as imagens do banner
  const bannerImages = [
    '/banner1.jpg', // Certifique-se que estão em /loja/public/banner1.jpg
    '/banner2.jpg', // Certifique-se que estão em /loja/public/banner2.jpg
    '/banner3.jpg', // Certifique-se que estão em /loja/public/banner3.jpg
  ]

  // Lógica de carregamento de produtos (do seu código)
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      console.log('HOME: Buscando produtos...')

      const { data, error } = await supabase
        .from('products')
        .select(
          `
          id, title, handle, description_html, vendor,
          product_variants!left(price, compare_at_price),
          product_images!left(src)
        `
        )
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('ERRO AO BUSCAR PRODUTOS (HOME):', error.message)
        setLoading(false)
        return
      }

      const validProducts = data.filter(
        (p: any) => p.product_variants.length > 0 && p.product_images.length > 0
      )

      console.log('HOME: Produtos encontrados:', validProducts)
      setProducts(validProducts as Product[])
      setLoading(false)
    }

    getProducts()
  }, [])

  // Ecrã de Carregamento
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <h1 className="text-3xl font-bold text-gray-900">
          Carregando produtos...
        </h1>
      </main>
    )
  }

  // Página completa
  return (
    <main className="bg-white">
      {/* 4. ADICIONA O BANNER AQUI (LARGURA TOTAL) */}
      <BannerCarousel images={bannerImages} />

      {/* 5. SEÇÃO DE PRODUTOS (com o seu código) */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mb-12 border-b border-gray-200 pb-8">
          {/* 6. APLICA A FONTE JOSEFIN NO TÍTULO */}
          <h1
            className={`text-5xl font-bold tracking-tight text-gray-900 ${josefin.className}`}
            style={{ color: '#7A4E2D' }} // Aplica a cor do título
          >
            Cajuia Store
          </h1>
        </div>

        {products.length === 0 && (
          <div className="text-center">
            <h2 className="text-2xl font-medium text-gray-900">
              Nenhum produto encontrado.
            </h2>
          </div>
        )}

        {/* Grelha de Produtos (Layout 4 - a implementar) */}
        {/* Por agora, usamos a grelha padrão */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/produtos/${product.handle}`}
              className="group"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <Image
                  src={product.product_images[0].src}
                  alt={product.title}
                  width={400}
                  height={500}
                  className="h-full w-full object-cover object-center transition-opacity duration-300 group-hover:opacity-75"
                />
              </div>
              <h3
                className="mt-4 text-sm"
                style={{ color: '#304D45' }} // Cor subtítulo
              >
                {product.title}
              </h3>
              <div className="mt-1 flex items-baseline gap-2">
                {product.product_variants[0].compare_at_price && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(
                      product.product_variants[0].compare_at_price
                    )}
                  </span>
                )}
                <span
                  className="text-lg font-medium"
                  style={{ color: '#7A4E2D' }} // Cor título/preço
                >
                  {formatPrice(product.product_variants[0].price)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}