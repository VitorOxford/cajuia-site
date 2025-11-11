// ARQUIVO: src/app/page.tsx (Atualizado com o novo ProductCarousel)
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { Product } from '@/types'
import BannerCarousel from '@/components/BannerCarousel'
import ProductCarousel from '@/components/ProductCarousel' // <--- 1. IMPORTAR O NOVO CARROSSEL

// A função 'formatPrice' foi removida daqui, pois foi movida
// para 'src/lib/utils.ts' e é usada pelo 'ProductCard.tsx'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Define as imagens do banner
  const bannerImages = [
    '/banner1.jpg', // /loja/public/banner1.jpg
    '/banner2.jpg', // /loja/public/banner2.jpg
    '/banner3.jpg', // /loja/public/banner3.jpg
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
      <main
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: '#FFF8F4' }} // Cor de fundo
      >
        <h1
          className="text-3xl font-bold"
          style={{ color: '#7A4E2D' }} // Cor do título
        >
          Carregando...
        </h1>
      </main>
    )
  }

  // Página completa
  return (
    <main style={{ backgroundColor: '#FFF8F4' }}>
      {/* 1. O BANNER FICA AQUI (LARGURA TOTAL) */}
      <BannerCarousel images={bannerImages} />

      {/* 2. SUBSTITUI A GRELHA ANTIGA PELO NOVO CARROSSEL DE PRODUTOS */}
      {products.length > 0 ? (
        <ProductCarousel products={products} title="Produtos em Destaque" />
      ) : (
        // Mensagem de "Nenhum produto" se o array estiver vazio
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-2xl font-medium" style={{ color: '#7A4E2D' }}>
            Nenhum produto encontrado.
          </h2>
        </div>
      )}

      {/* A grelha de produtos antiga (<div className="grid grid-cols-1...">) 
        e o título "Cajuia do Brasil" foram removidos, 
        pois o <ProductCarousel /> já contém o seu próprio título e layout.
      */}
    </main>
  )
}