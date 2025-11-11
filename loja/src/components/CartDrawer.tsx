// ARQUIVO: src/components/CartDrawer.tsx (Atualizado com updateQuantity e Estilo)
'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cartStore' // Nosso "cérebro"
import Image from 'next/image'
import Link from 'next/link'

// Função de Ajuda para formatar preço
function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}

export default function CartDrawer() {
  const isCartOpen = useCartStore((state) => state.isCartOpen)
  const toggleCart = useCartStore((state) => state.toggleCart)
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity) // <--- 1. IMPORTA A AÇÃO

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    variantId: number
  ) => {
    const newQuantity = parseInt(e.target.value, 10)
    updateQuantity(variantId, newQuantity) // <--- 2. CHAMA A AÇÃO
  }

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={toggleCart}>
        {/* Overlay (fundo escuro) */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        {/* O Painel Lateral */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                {/* --- 3. APLICA AS CORES DA PALETA --- */}
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  {/* BG do Fundo (F7F3ED) */}
                  <div
                    className="flex h-full flex-col overflow-y-scroll shadow-xl"
                    style={{ backgroundColor: '#F7F3ED' }}
                  >
                    {/* Header do Carrinho */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        {/* Cor do Título (7A4E2D) */}
                        <Dialog.Title
                          className="text-lg font-medium"
                          style={{ color: '#7A4E2D' }}
                        >
                          Carrinho de Compras
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2"
                            onClick={toggleCart} // Ação de fechar
                            style={{ color: '#304D45' }} // Cor Subtítulo
                          >
                            <XMarkIcon className="h-6 w-6" />
                          </button>
                        </div>
                      </div>

                      {/* Lista de Produtos */}
                      <div className="mt-8">
                        <div className="flow-root">
                          {items.length === 0 ? (
                            <p
                              className="text-center"
                              style={{ color: '#304D45' }}
                            >
                              Seu carrinho está vazio.
                            </p>
                          ) : (
                            <ul className="-my-6 divide-y divide-gray-200">
                              {items.map((item) => (
                                <li key={item.variantId} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                      src={item.imageSrc}
                                      alt={item.title}
                                      width={96}
                                      height={96}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium">
                                        <h3 style={{ color: '#7A4E2D' }}>
                                          <Link
                                            href={`/produtos/${item.handle}`}
                                            onClick={toggleCart}
                                          >
                                            {item.title}
                                          </Link>
                                        </h3>
                                        <p
                                          className="ml-4"
                                          style={{ color: '#304D45' }}
                                        >
                                          {formatPrice(
                                            item.price * item.quantity
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      {/* --- 4. SELETOR DE QUANTIDADE --- */}
                                      <div className="flex items-center">
                                        <label
                                          htmlFor={`quantity-${item.variantId}`}
                                          className="mr-2 text-sm"
                                          style={{ color: '#304D45' }}
                                        >
                                          Qtd:
                                        </label>
                                        <select
                                          id={`quantity-${item.variantId}`}
                                          name="quantity"
                                          value={item.quantity}
                                          onChange={(e) =>
                                            handleQuantityChange(
                                              e,
                                              item.variantId
                                            )
                                          }
                                          className="rounded border border-gray-300 py-1 px-2 text-sm"
                                          style={{
                                            backgroundColor: 'white',
                                            color: '#304D45',
                                          }}
                                        >
                                          {/* Criar 10 opções */}
                                          {Array.from(
                                            { length: 10 },
                                            (_, i) => i + 1
                                          ).map((qty) => (
                                            <option key={qty} value={qty}>
                                              {qty}
                                            </option>
                                          ))}
                                        </select>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium"
                                          onClick={() =>
                                            removeItem(item.variantId)
                                          }
                                          style={{ color: '#7A4E2D' }}
                                        >
                                          Remover
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer do Carrinho (Subtotal e Checkout) */}
                    {items.length > 0 && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium">
                          <p style={{ color: '#7A4E2D' }}>Subtotal</p>
                          <p style={{ color: '#304D45' }}>
                            {formatPrice(subtotal)}
                          </p>
                        </div>
                        <p
                          className="mt-0.5 text-sm"
                          style={{ color: '#304D45' }}
                        >
                          Frete e taxas serão calculados no checkout.
                        </p>
                        <div className="mt-6">
                          <a
                            href="#" // No futuro: '/checkout'
                            className="flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium shadow-sm"
                            style={{
                              backgroundColor: '#7A4E2D', // Cor Botão
                              color: '#F7F3ED', // Cor Texto Botão
                            }}
                          >
                            Finalizar Compra
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm">
                          <p style={{ color: '#304D45' }}>
                            ou{' '}
                            <button
                              type="button"
                              className="font-medium"
                              onClick={toggleCart} // Ação de fechar
                              style={{ color: '#7A4E2D' }}
                            >
                              Continuar comprando
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}