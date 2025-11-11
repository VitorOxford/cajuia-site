'use client' // Componente de cliente, pois é interativo

import { useState } from 'react'
import { useCartStore } from '@/store/cartStore' // Nosso "cérebro" do carrinho
import type { Product } from '@/types' // Nossos tipos

// Função de Ajuda para formatar preço
function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}

// O componente recebe o produto inteiro como "prop"
export default function ProductForm({ product }: { product: Product }) {
  // Ação de adicionar ao carrinho, vinda do nosso store
  const addItemToCart = useCartStore((state) => state.addItem)

  // Estado para o feedback do botão
  const [added, setAdded] = useState(false)

  // Por enquanto, vamos pegar a primeira variante como padrão
  // No futuro, aqui teremos a lógica de seleção (P, M, G, Cor)
  const selectedVariant = product.product_variants[0]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Monta o objeto "CartItem"
    const itemToAdd = {
      variantId: selectedVariant.id,
      productId: product.id,
      title: product.title,
      handle: product.handle,
      imageSrc: product.product_images[0]?.src || '', // Pega a primeira imagem
      price: selectedVariant.price,
      quantity: 1, // Por enquanto, adiciona 1
    }

    // Chama a ação do nosso store!
    addItemToCart(itemToAdd)

    // Dá feedback visual
    setAdded(true)
    setTimeout(() => {
      setAdded(false) // Reseta o botão após 2 segundos
    }, 2000)
  }

  return (
    <>
      {/* Informações de Preço (Movidas para cá) */}
      <div className="mt-3">
        <p className="text-3xl tracking-tight text-gray-900">
          {formatPrice(selectedVariant.price)}
        </p>
      </div>

      {/* Preço "De" */}
      {selectedVariant.compare_at_price && (
        <div className="mt-1">
          <p className="text-xl tracking-tight text-gray-500 line-through">
            {formatPrice(selectedVariant.compare_at_price)}
          </p>
        </div>
      )}

      {/* Descrição (Movida para cá) */}
      <div className="mt-6">
        <h3 className="sr-only">Descrição</h3>
        <div
          className="space-y-6 text-base text-gray-700"
          dangerouslySetInnerHTML={{ __html: product.description_html || '' }}
        />
      </div>

      {/* Formulário de Compra */}
      <form onSubmit={handleSubmit}>
        {/* --- SELETORES (Tamanho, Cor) --- */}
        <div className="mt-10">
          {/* (Vamos implementar a lógica de seleção aqui em breve) */}
        </div>

        {/* --- BOTÃO DE ADICIONAR AO CARRINHO --- */}
        <div className="mt-10 flex">
          <button
            type="submit"
            disabled={added} // Desabilita o botão após adicionar
            className={`flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white shadow-sm transition-colors
              ${
                added
                  ? 'bg-green-600 hover:bg-green-700' // Cor de sucesso
                  : 'bg-indigo-600 hover:bg-indigo-700' // Cor padrão
              }
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full
              disabled:cursor-not-allowed`}
          >
            {added ? 'Adicionado!' : 'Adicionar ao carrinho'}
          </button>
        </div>
      </form>
    </>
  )
}