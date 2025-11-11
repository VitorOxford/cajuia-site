'use client' // Componente de cliente, pois precisamos de useEffect, useState e onClick

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import CreateProductForm from '@/components/CreateProductForm'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // O "Guarda de Segurança"
  useEffect(() => {
    const checkUser = async () => {
      // Pega a sessão ATUAL do usuário
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Erro ao buscar sessão:', error)
        return
      }

      if (session) {
        // Se tem sessão, armazena os dados do usuário
        setUser(session.user)
      } else {
        // Se NÃO tem sessão, chuta ele para a página de login
        router.push('/')
      }
      setLoading(false)
    }

    checkUser()
  }, [router]) // O hook depende do router

  // Função de Logout
  const handleLogout = async () => {
    await supabase.auth.signOut()
    // Após o logout, manda de volta para o login
    router.push('/')
  }

  // Enquanto o "Guarda" está verificando, mostramos um loading
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Carregando...
      </main>
    )
  }

  // Se o usuário estiver logado, mostramos o painel
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Cajuia
          </h1>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Sair
          </button>
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <p className="text-gray-700">
            Bem-vindo ao seu painel,{' '}
            <strong className="text-indigo-600">{user?.email}</strong>!
          </p>
          <p className="mt-4 text-gray-600">
            Este é o primeiro passo do seu novo CMS customizado.
          </p>
        </div>

        <CreateProductForm />
        <div className="mt-8">
          {/* Em breve: <CriarProdutoForm /> */}
        </div>
      </div>
    </main>
  )
}