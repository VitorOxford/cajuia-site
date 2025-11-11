'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function CreateProductForm() {
  // Estados para o produto principal
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [handle, setHandle] = useState('') // O "slug" da URL
  const [vendor, setVendor] = useState('Cajuia')

  // Estados para a primeira variante (SKU, Preço, etc.)
  const [price, setPrice] = useState('')
  const [compareAtPrice, setCompareAtPrice] = useState('')
  const [sku, setSku] = useState('')
  const [inventory, setInventory] = useState('')

  // Estado para a imagem
  const [imageFile, setImageFile] = useState<File | null>(null)

  // Estados de feedback
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  // A MÁGICA ACONTECE AQUI
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage('Salvando produto...')

    if (!imageFile) {
      setMessage('Erro: Por favor, selecione uma imagem.')
      setLoading(false)
      return
    }

    try {
      // --- 1. FAZ UPLOAD DA IMAGEM ---
      // Cria um nome de arquivo único
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${handle}-${Date.now()}.${fileExt}`
      const filePath = `public/${fileName}` // Caminho no bucket

      const { error: uploadError } = await supabase.storage
        .from('product-images') // O bucket que criamos
        .upload(filePath, imageFile)

      if (uploadError) {
        throw new Error('Erro no Upload da Imagem: ' + uploadError.message)
      }

      // --- 2. PEGA A URL PÚBLICA DA IMAGEM ---
      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      if (!publicUrlData.publicUrl) {
        throw new Error('Não foi possível obter a URL pública da imagem.')
      }

      const imageUrl = publicUrlData.publicUrl

      // --- 3. SALVA O PRODUTO NO BANCO DE DADOS ---
      const { data: productData, error: productError } = await supabase
        .from('products')
        .insert({
          title: title,
          description_html: description,
          handle: handle,
          vendor: vendor,
          status: 'active', // Define como ativo por padrão
        })
        .select('id') // Pede para o Supabase retornar o ID do produto criado
        .single() // Esperamos apenas um resultado

      if (productError) {
        throw new Error('Erro ao salvar produto: ' + productError.message)
      }

      const newProductId = productData.id

      // --- 4. SALVA A VARIANTE DO PRODUTO ---
      const { error: variantError } = await supabase
        .from('product_variants')
        .insert({
          product_id: newProductId,
          title: 'Default Title', // Simplificado por enquanto
          price: parseFloat(price),
          compare_at_price: compareAtPrice
            ? parseFloat(compareAtPrice)
            : null,
          sku: sku,
          inventory_quantity: parseInt(inventory),
          available_for_sale: parseInt(inventory) > 0,
        })

      if (variantError) {
        throw new Error('Erro ao salvar variante: ' + variantError.message)
      }

      // --- 5. SALVA A IMAGEM DO PRODUTO ---
      const { error: imageError } = await supabase
        .from('product_images')
        .insert({
          product_id: newProductId,
          src: imageUrl, // A URL pública que pegamos
          position: 1,
        })

      if (imageError) {
        throw new Error('Erro ao salvar imagem do produto: ' + imageError.message)
      }

      // --- SUCESSO! ---
      setMessage('Produto cadastrado com sucesso!')
      
      // Limpa o formulário
      setTitle('')
      setDescription('')
      setHandle('')
      setPrice('')
      setCompareAtPrice('')
      setSku('')
      setInventory('')
      setImageFile(null)
      // Limpa o input de arquivo (jeito um pouco "hacky", mas funciona)
      const fileInput = document.getElementById('imageFile') as HTMLInputElement
      if (fileInput) fileInput.value = ''

    } catch (error: any) {
      console.error(error)
      setMessage('Erro: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // JSX/HTML do formulário
  return (
    <div className="mt-10 rounded-lg bg-white p-8 shadow">
      <h2 className="text-2xl font-bold text-gray-800">Criar Novo Produto</h2>
      <p className="mt-2 text-sm text-gray-600">
        Preencha as informações abaixo para adicionar um novo produto ao
        catálogo.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* --- DADOS PRINCIPAIS --- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título do Produto
            </label>
            <input
              type="text" id="title" value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="handle" className="block text-sm font-medium text-gray-700">
              URL (ex: vestido-azul-manga-longa)
            </label>
            <input
              type="text" id="handle" value={handle}
              onChange={(e) => setHandle(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            id="description" value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* --- PREÇO E ESTOQUE (Variante) --- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Preço (ex: 199.90)
            </label>
            <input
              type="number" id="price" value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01" required
              className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="compareAtPrice" className="block text-sm font-medium text-gray-700">
              Preço "De" (Opcional)
            </label>
            <input
              type="number" id="compareAtPrice" value={compareAtPrice}
              onChange={(e) => setCompareAtPrice(e.target.value)}
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
              SKU (Código)
            </label>
            <input
              type="text" id="sku" value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="inventory" className="block text-sm font-medium text-gray-700">
              Estoque
            </label>
            <input
              type="number" id="inventory" value={inventory}
              onChange={(e) => setInventory(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* --- UPLOAD DE IMAGEM --- */}
        <div>
          <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">
            Imagem Principal do Produto
          </label>
          <input
            type="file"
            id="imageFile"
            onChange={handleImageChange}
            required
            accept="image/png, image/jpeg, image/webp"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        {/* --- BOTÃO DE SALVAR --- */}
        <div className="flex items-center justify-end space-x-4">
          {message && (
            <p className="text-sm text-gray-600">{message}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Salvando...' : 'Salvar Produto'}
          </button>
        </div>
      </form>
    </div>
  )
}