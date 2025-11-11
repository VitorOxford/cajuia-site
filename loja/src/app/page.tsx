// ARQUIVO: src/app/page.tsx (Modo Cliente - CORRIGIDO)
'use client' 

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient' 
import type { Product } from '@/types' 

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      console.log("HOME: Buscando produtos...") 

      const { data, error } = await supabase
        .from('products')
        .select(
          `
          id, title, handle, description_html, vendor,
          product_variants!left(price, compare_at_price),
          product_images!left(src)
        `
        ) // <--- A CORREÇÃO ESTÁ AQUI (adicionei description_html, vendor)
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (error) {
        console.error("ERRO AO BUSCAR PRODUTOS (HOME):", error.message) 
        setLoading(false)
        return
      }

      const validProducts = data.filter(
        (p: any) => p.product_variants.length > 0 && p.product_images.length > 0
      )
      
      console.log("HOME: Produtos encontrados:", validProducts) 
      setProducts(validProducts as Product[]) // Agora o tipo bate!
      setLoading(false)
    }

    getProducts()
  }, []) 

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <h1 className="text-3xl font-bold text-gray-900">Carregando produtos...</h1>
      </main>
    )
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
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
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <div className="mt-1 flex items-baseline gap-2">
                {product.product_variants[0].compare_at_price && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(
                      product.product_variants[0].compare_at_price
                    )}
                  </span>
                )}
                <span className="text-lg font-medium text-gray-900">
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