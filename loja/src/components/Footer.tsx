// ARQUIVO: src/components/Footer.tsx (Atualizado: Layout da Barra Inferior e Espaçamento)
'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

// --- Ícones Sociais ---
const FacebookIcon = () => (
  <svg
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      clipRule="evenodd"
    />
  </svg>
)
const InstagramIcon = () => (
  <svg
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.227-1.667 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.667 4.771 4.919-4.919 1.266-.058 1.646.07 4.85.07zM12 0C8.74 0 8.333.015 7.053.072 2.695.272.273 2.69.073 7.052.015 8.333 0 8.74 0 12s.015 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.985 8.74 24 12 24s3.667-.015 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98C23.985 15.667 24 15.26 24 12s-.015-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.015 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
  </svg>
)

export default function Footer() {
  // Paleta de cores
  const styles = {
    background: '#FFF8F4', // Fundo principal
    title: '#7A4E2D', // Títulos (AJUDA, PRIVACIDADE...)
    text: '#56362C', // Texto/Links (Somos referência...)
    buttonBg: '#7A4E2D', // Fundo do botão Newsletter
    buttonText: '#FFF8F4', // Texto do botão Newsletter
  }

  // Borda subtil (baseada na cor do título)
  const borderColor = 'rgba(122, 78, 45, 0.2)'

  // Listas de Links
  const helpLinks = [
    { name: 'Rastrear Pedido', href: '/track-order' },
    { name: 'Dúvidas Frequentes', href: '/faq' },
    { name: 'Fale Conosco', href: '/contact' },
  ]

  const privacyLinks = [
    { name: 'Política de Privacidade', href: '/privacidade' },
    { name: 'Termos de Uso', href: '/termos' },
    { name: 'Política de Cookies', href: '/cookies' },
  ]

  return (
    <footer style={{ backgroundColor: styles.background }}>
      {/* --- SECÇÃO 1: PRINCIPAL (5 Colunas com mais espaço) --- */}
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8">
        {' '}
        {/* <--- ESPAÇAMENTO VERTICAL AUMENTADO */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5 lg:gap-20">
          {' '}
          {/* <--- ESPAÇAMENTO ENTRE COLUNAS AUMENTADO */}
          {/* Coluna 1: Logo e Texto */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Image
                src="/logocajuia.png"
                alt="Cajuia Logo"
                width={180}
                height={40}
              />
            </Link>
            <p className="mt-6 text-sm" style={{ color: styles.text }}>
              Somos referência em elegância e qualidade, oferecendo produtos de
              luxo com design exclusivo. Com um alto padrão de sofisticação,
              buscamos sempre superar as expectativas dos nossos clientes,
              entregando excelência em cada detalhe.
            </p>
          </div>
          {/* Coluna 2: Ajuda */}
          <div>
            <h4
              className="font-semibold uppercase tracking-wider"
              style={{ color: styles.title }}
            >
              Ajuda
            </h4>
            <ul className="mt-4 space-y-3">
              {helpLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:underline"
                    style={{ color: styles.text }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Coluna 3: Privacidade */}
          <div>
            <h4
              className="font-semibold uppercase tracking-wider"
              style={{ color: styles.title }}
            >
              Privacidade
            </h4>
            <ul className="mt-4 space-y-3">
              {privacyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:underline"
                    style={{ color: styles.text }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Coluna 4: Contatos */}
          <div>
            <h4
              className="font-semibold uppercase tracking-wider"
              style={{ color: styles.title }}
            >
              Contatos
            </h4>
            <ul className="mt-4 space-y-3" style={{ color: styles.text }}>
              <li className="flex items-center gap-2 text-sm">
                <PhoneIcon className="h-4 w-4 flex-shrink-0" />
                <span>(11) 98765-4321</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <EnvelopeIcon className="h-4 w-4 flex-shrink-0" />
                <span>contato@cajuia.com.br</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPinIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Rua Elegância, 123, São Paulo - SP</span>
              </li>
            </ul>
          </div>
          {/* Coluna 5: Newsletter */}
          <div>
            <h4
              className="font-semibold uppercase tracking-wider"
              style={{ color: styles.title }}
            >
              Torne-se um cliente ⭐ VIP ⭐
            </h4>
            <form
              action="#"
              onSubmit={(e) => e.preventDefault()}
              className="mt-4"
            >
              <label htmlFor="email-newsletter" className="sr-only">
                Seu e-mail
              </label>
              <input
                type="email"
                id="email-newsletter"
                placeholder="Insira seu e-mail"
                className="w-full appearance-none border-b-2 bg-transparent py-2 text-sm focus:outline-none"
                style={{
                  borderColor: styles.title,
                  color: styles.text,
                }}
              />
              <button
                type="submit"
                className="mt-4 w-full py-2 px-4 text-sm font-medium rounded-md"
                style={{
                  backgroundColor: styles.buttonBg,
                  color: styles.buttonText,
                }}
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* --- SECÇÃO 2: BARRA INFERIOR (Layout 3 Colunas) --- */}
      <div
        className="border-t" // <--- ADICIONADA BORDA SUPERIOR
        style={{
          backgroundColor: styles.background, // <--- FUNDO IGUAL AO RESTANTE
          borderColor: borderColor, // <--- BORDA SUTIL
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          {/* Layout de Grelha 3 Colunas (Esquerda, Centro, Direita) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-6">
            {/* Esquerda: Ícones Sociais */}
            <div
              className="flex items-center justify-center sm:justify-start gap-4"
              style={{ color: styles.text }} // <--- Cor do texto/ícone
            >
              <a href="#" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>

            {/* Centro: Copyright */}
            <div className="text-center">
              <p className="text-sm" style={{ color: styles.text }}>
                © {new Date().getFullYear()}, Cajuia Brasil. Desenvolvido por{' '}
                <Link
                  href="https://www.linkedin.com/in/joão-vitor-correia-37b9a4176"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-bold text-shadow-sm transition-all duration-200 hover:scale-105 hover:text-shadow-md"
                  style={{
                    textShadow: `
                      1px 1px 0px rgba(0,0,0,0.1),
                      -1px -1px 0px rgba(255,255,255,0.1)
                    `,
                  }}
                >
                  Vitor
                </Link>
                . CNPJ: 53.756.096/0001-89.
              </p>
            </div>

            {/* Direita: Imagem de Ícones de Pagamento */}
            <div className="flex items-center justify-center sm:justify-end">
              <Image
                src="/bandeiraspagamento.png"
                alt="Formas de Pagamento Aceitas"
                width={200} // Ajuste conforme necessário
                height={30} // Ajuste conforme necessário
                className="h-auto w-auto max-h-20" // <--- Aumentado para 40px max
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}