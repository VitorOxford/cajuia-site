// ARQUIVO: src/components/ProductCarousel.tsx (REFEITO)
'use client'

import React, { useCallback, useState, Fragment } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Product } from '@/types'
import ProductCard from './ProductCard'
import { Dialog, Transition } from '@headlessui/react' // Para o Modal
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, formatInstallments } from '@/lib/utils'
// NOTA: O ProductForm.tsx teria de ser adaptado para funcionar aqui
// Por agora, vamos mostrar os detalhes e um link para a página do produto.

type ProductCarouselProps = {
  products: Product[]
  title: string
  subtitle: string
  viewMoreLink: string
}

export default function ProductCarousel({
  products,
  title,
  subtitle,
  viewMoreLink,
}: ProductCarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: false, // O design não parece ter loop
  })

  // State para o Modal "Analisar"
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  // Estilos da paleta
  const styles = {
    title: '#7A4E2D',
    text: '#56362C',
  }

  return (
    <section className="relative w-full py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* 1. Bloco de Título (Alinhado à Esquerda) */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              className="text-3xl font-bold uppercase tracking-wider"
              style={{ color: styles.title }}
            >
              {title}
            </h2>
            <p className="mt-2 text-sm" style={{ color: styles.text }}>
              {subtitle}
            </p>
          </div>
          <Link
            href={viewMoreLink}
            className="text-sm font-semibold uppercase underline"
            style={{ color: styles.title }}
          >
            Ver +
          </Link>
        </div>

        {/* 2. Carrossel */}
        <div className="embla mt-12 overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex gap-x-6 lg:gap-x-8">
            {products.map((product) => (
              <div
                className="embla__slide flex-shrink-0 flex-grow-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                key={product.id}
              >
                <ProductCard
                  product={product}
                  onQuickViewClick={setQuickViewProduct}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Modal "Analisar" (Quick View) */}
      <Transition.Root show={Boolean(quickViewProduct)} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          onClose={() => setQuickViewProduct(null)}
        >
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          {/* Conteúdo do Modal */}
          <div className="fixed inset-0 z-40 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="relative w-full max-w-4xl transform overflow-hidden"
                  style={{ backgroundColor: styles.background }}
                >
                  <button
                    onClick={() => setQuickViewProduct(null)}
                    className="absolute top-4 right-4 z-10"
                    style={{ color: styles.text }}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                  {quickViewProduct && (
                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                      {/* Imagem */}
                      <div className="aspect-[4/5] sm:col-span-4 lg:col-span-5">
                        <Image
                          src={quickViewProduct.product_images[0].src}
                          alt={quickViewProduct.title}
                          width={500}
                          height={625}
                          style={{ objectFit: 'cover' }}
                          className="h-full w-full"
                        />
                      </div>
                      {/* Detalhes */}
                      <div className="p-6 sm:col-span-8 lg:col-span-7">
                        <h2
                          className="text-2xl font-bold"
                          style={{ color: styles.title }}
                        >
                          {quickViewProduct.title}
                        </h2>
                        <div className="mt-3 flex flex-col">
                          <span
                            className="text-2xl font-bold"
                            style={{ color: styles.title }}
                          >
                            {formatPrice(
                              quickViewProduct.product_variants[0].price
                            )}
                          </span>
                          <span
                            className="text-sm"
                            style={{ color: styles.text }}
                          >
                            {formatInstallments(
                              quickViewProduct.product_variants[0].price,
                              3
                            )}
                          </span>
                        </div>
                        <div
                          className="mt-6 text-sm"
                          style={{ color: styles.text }}
                          dangerouslySetInnerHTML={{
                            __html:
                              quickViewProduct.description_html ||
                              'Sem descrição.',
                          }}
                        />
                        
                        {/* AQUI ENTRARIA O <ProductForm /> 
                          (Por agora, um link para a página completa) 
                        */}
                        <Link
                          href={`/produtos/${quickViewProduct.handle}`}
                          className="mt-6 inline-block text-sm font-semibold underline"
                          style={{ color: styles.title }}
                          onClick={() => setQuickViewProduct(null)}
                        >
                          Ver detalhes completos
                        </Link>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </section>
  )
}