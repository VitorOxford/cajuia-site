// ARQUIVO: src/components/BannerCarousel.tsx
'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

type BannerCarouselProps = {
  images: string[] // Array de URLs das imagens
}

export default function BannerCarousel({ images }: BannerCarouselProps) {
  // Configurações do Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, skipSnaps: false }, // loop infinito, sem pular snaps
    [Autoplay({ delay: 5000, stopOnInteraction: false })] // Autoplay a cada 5 segundos, não para ao interagir
  )

  // Funções para navegar com as setas
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // Estilos da paleta para as setas (pode ajustar)
  const styles = {
    arrowColor: '#56362C', // Cor dos ícones das setas
    arrowBg: 'rgba(255, 255, 255, 0.7)', // Fundo sutil das setas
  }

  return (
    <div className="relative overflow-hidden w-full max-w-[1920px] mx-auto">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex">
          {images.map((src, index) => (
            <div className="embla__slide flex-shrink-0 flex-grow-0 basis-full" key={index}>
              <Image
                src={src}
                alt={`Banner ${index + 1}`}
                width={1920} // Largura original
                height={800} // Altura original
                layout="responsive" // Garante que a imagem seja responsiva
                objectFit="cover" // Corta a imagem para cobrir a área se necessário
                priority={index === 0} // Carrega o primeiro banner com prioridade
                className="w-full h-auto" // Para Next.js 13+ com layout="responsive"
              />
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