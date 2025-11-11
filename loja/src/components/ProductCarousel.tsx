// ARQUIVO: src/components/ProductCarousel.tsx (NOVO FICHEIRO)
'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Product } from '@/types'
import ProductCard from './ProductCard'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

type ProductCarouselProps = {
  products: Product[]
  title: string
}

export default function ProductCarousel({
  products,
  title,
}: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: true,
  })

  // Funções para os botões de seta
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // Estilos da paleta
  const styles = {
    title: '#7A4E2D',
    arrowColor: '#56362C',
    arrowBg: 'rgba(255, 248, 244, 0.8)', // Fundo sutil (baseado no #FFF8F4)
  }

  return (
    <section className="relative w-full py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Título da Seção (Produtos em Destaque) */}
        <h2
          className="text-center text-3xl font-bold uppercase tracking-wider"
          style={{ color: styles.title }}
        >
          {title}
        </h2>

        {/* Carrossel */}
        <div className="embla mt-12 overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex gap-x-6 lg:gap-x-8">
            {products.map((product) => (
              // Cada slide do carrossel
              <div
                className="embla__slide flex-shrink-0 flex-grow-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                key={product.id}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Setas de Navegação (Opcional, mas bom para carrossel) */}
      <button
        className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full shadow-md hidden lg:block"
        onClick={scrollPrev}
        style={{ backgroundColor: styles.arrowBg }}
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-6 w-6" style={{ color: styles.arrowColor }} />
      </button>
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full shadow-md hidden lg:block"
        onClick={scrollNext}
        style={{ backgroundColor: styles.arrowBg }}
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-6 w-6" style={{ color: styles.arrowColor }} />
      </button>
    </section>
  )
}