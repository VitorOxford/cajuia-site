// ARQUIVO: src/app/page.tsx (Atualizado)
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { Product } from '@/types'
import BannerCarousel from '@/components/BannerCarousel'
import ProductCarousel from '@/components/ProductCarousel' // <--- Já estava importado

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const bannerImages = [
    '/banner1.jpg',
    '/banner2.jpg',
    '/banner3.jpg',
  ]

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      console.log('HOME: Buscando produtos...')

      const { data, error } = await supabase
        .from('products')
        .select(
          `
          id, title, handle, description_html, vendor,
          product_variants!left(id, price, compare_at_price),
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
        style={{ backgroundColor: '#FFF8F4' }}
      >
        <h1 className="text-3xl font-bold" style={{ color: '#7A4E2D' }}>
          Carregando...
        </h1>
      </main>
    )
  }

  // Página completa
  return (
    <main style={{ backgroundColor: '#FFF8F4' }}>
      {/* 1. Banner (Largura Total) */}
      <BannerCarousel images={bannerImages} />

      {/* 2. Carrossel de Produtos "Coleção de Outono" */}
      {products.length > 0 && (
        <ProductCarousel
          products={products}
          title="Coleção de Outono"
          subtitle="Confira nossa coleção de vestidos com estampas exclusivas para o Outono"
          viewMoreLink="/collections/outono" // Ajuste este link se necessário
        />
      )}

      {/* Pode adicionar mais secções/carrosseis aqui */}
    </main>
  )
}