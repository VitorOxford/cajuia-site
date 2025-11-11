'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

type BannerCarouselProps = {
  images: string[]
}

export default function BannerCarousel({ images }: BannerCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true }, // Ativa o loop
    [Autoplay({ delay: 5000, stopOnInteraction: false })] // Plugin de Autoplay
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const styles = {
    arrowColor: '#56362C',
    arrowBg: 'rgba(255, 255, 255, 0.7)',
  }

  return (
    // 1. Container principal com largura total
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div
              className="relative flex-shrink-0 flex-grow-0 basis-full"
              key={index}
            >
              {/* 2. Div de "aspect-ratio" (1920x800) 
                   (800 / 1920) * 100 = 41.666%
                   Isto força a altura correta do container.
              */}
              <div
                className="relative w-full"
                style={{ paddingTop: '41.666%' }}
              >
                {/* 3. Imagem com 'fill' e 'objectFit: contain' */}
                <Image
                  src={src}
                  alt={`Banner ${index + 1}`}
                  fill
                  style={{ objectFit: 'contain' }} // <--- ADAPTAR (sem cortes)
                  priority={index === 0} // Carrega a primeira imagem mais rápido
                  sizes="100vw" // Informa o Next.js que a imagem ocupa 100% da largura
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Setas de Navegação */}
      <button
        className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full shadow-md"
        onClick={scrollPrev}
        style={{ backgroundColor: styles.arrowBg }}
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-6 w-6" style={{ color: styles.arrowColor }} />
      </button>
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full shadow-md"
        onClick={scrollNext}
        style={{ backgroundColor: styles.arrowBg }}
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-6 w-6" style={{ color: styles.arrowColor }} />
      </button>
    </div>
  )
}