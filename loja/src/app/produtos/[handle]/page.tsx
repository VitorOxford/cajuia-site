// ARQUIVO: src/app/produtos/[handle]/page.tsx (Modo Cliente)
'use client' // MUITO IMPORTANTE

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation' // Hook para pegar o 'handle' da URL
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient' // O cliente SIMPLES
import type { Product, ProductImage } from '@/types'
import ProductForm from '@/components/ProductForm'

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams() // Pega os parâmetros da URL

  useEffect(() => {
    const getProduct = async (handle: string) => {
      setLoading(true)
      console.log(`PRODUTO: Buscando handle: "${handle}"`) // LOG NO F12

      const { data, error } = await supabase
        .from('products')
        .select(
          `
          *,
          product_variants!left(*),
          product_images!left(*)
        `
        )
        .eq('handle', handle)
        .eq('status', 'active')
        .single()

      if (error || !data) {
        console.error(`ERRO AO BUSCAR PRODUTO (PÁGINA):`, error?.message) // LOG NO F12
        setProduct(null)
        setLoading(false)
        return
      }

      // Ordena as imagens
      if (data.product_images && data.product_images.length > 0) {
        data.product_images.sort((a: ProductImage, b: ProductImage) => {
          const posA = a.position || 0
          const posB = b.position || 0
          return posA - posB
        })
      }

      console.log("PRODUTO: Encontrado:", data) // LOG NO F12
      setProduct(data as Product)
      setLoading(false)
    }

    // Pega o 'handle' e inicia a busca
    const handle = params.handle as string
    if (handle) {
      getProduct(handle)
    }
  }, [params.handle]) // Roda de novo se o 'handle' mudar

  // --- TELA DE LOADING ---
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <h1 className="text-3xl font-bold text-gray-900">Carregando produto...</h1>
      </main>
    )
  }

  // --- TELA DE NÃO ENCONTRADO ---
  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <h1 className="text-3xl font-bold text-gray-900">Produto não encontrado.</h1>
      </main>
    )
  }

  // --- PÁGINA RENDERIZADA ---
  const mainImage = product.product_images[0]
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">

          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
            {mainImage ? (
              <Image
                src={mainImage.src}
                alt={mainImage.alt_text || product.title}
                width={800}
                height={1000}
                className="h-full w-full object-cover object-center"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">
                Sem imagem
              </div>
            )}
          </div>

          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.title}
            </h1>
            <ProductForm product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}