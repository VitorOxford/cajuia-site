// ARQUIVO: src/components/Footer.tsx (NOVO FICHEIRO)
'use client'

import Image from 'next/image'
import Link from 'next/link'

// --- Ícones de Social (para consistência com o Header) ---
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
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm6-10.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z"
      clipRule="evenodd"
    />
  </svg>
)
// (Adicione outros ícones sociais se necessário)

// --- Ícones de Pagamento (Placeholders SVG) ---
const VisaIcon = () => (
  <svg className="h-6 w-auto" fill="currentColor" viewBox="0 0 38 12">
    <path d="M33.606 0H4.394C1.967 0 0 1.96 0 4.38v3.24C0 10.04 1.967 12 4.394 12h29.212C36.033 12 38 10.04 38 7.62V4.38C38 1.96 36.033 0 33.606 0zM22.09 6.295c-.324 1.134-1.39 1.905-2.73 1.905-.73 0-1.42-.23-1.93-.65v.53h-2.18V.91h2.18v1.65c.48-.4 1.14-.63 1.87-.63 1.57 0 2.5 1.05 2.79 2.45h-2zM33.65 6.4c0 .87-.53 1.18-1.19 1.18-.5 0-.96-.15-1.3-.32l-.24-.1v1.6H28.7V.91h2.1v.2c.3-.18.8-.28 1.3-.28.8 0 1.55.4 1.55 1.35V6.4zM12.96 8.01H10.8V.91h2.16v7.1zM9.4 3.73c0-.82-.44-1.14-.95-1.14-.52 0-.94.32-.94 1.14v.8c0 .8.42 1.13.94 1.13.5 0 .95-.33.95-1.13v-.8zM7.5 8.01H5.32V.91h2.18v7.1zM3.48 4.2c0-1.62 1.17-2.3 2.37-2.3.6 0 1.1.2 1.48.42l.33-.36h1.9v2.73c0 .8-.42 1.13-.93 1.13-.52 0-.95-.33-.95-1.13v-1.1c0-.2-.08-.36-.2-.36-.1 0-.2.13-.2.3v1.5c0 1.6-1.16 2.3-2.35 2.3-.6 0-1.1-.2-1.48-.42l-.33.36H2.02V4.5c0-.18.06-.2.14-.2h1.32v-.1z" />
  </svg>
)
const MastercardIcon = () => (
  <svg className="h-6 w-auto" fill="currentColor" viewBox="0 0 38 24">
    <path d="M35.15 0H2.85C1.28 0 0 1.28 0 2.85v18.3C0 22.72 1.28 24 2.85 24h32.3C36.72 24 38 22.72 38 21.15V2.85C38 1.28 36.72 0 35.15 0zM12.21 17.68c-2.73 0-4.94-2.2-4.94-4.93s2.2-4.93 4.94-4.93c2.73 0 4.94 2.2 4.94 4.93s-2.2 4.93-4.94 4.93zm13.57 0c-2.73 0-4.94-2.2-4.94-4.93s2.2-4.93 4.94-4.93c2.73 0 4.94 2.2 4.94 4.93s-2.2 4.93-4.94 4.93z" />
  </svg>
)
const PixIcon = () => (
  <svg className="h-6 w-auto" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.72 1.956c-1.92 0-3.692.71-5.11 2.05L2.34 8.283c-.31.304-.31.796 0 1.1l3.32 3.23c.31.304.81.304 1.12 0L10.1 9.4c.54-.53 1.26-.81 2.01-.81.76 0 1.48.28 2.02.81l3.32 3.23c.31.304.81.304 1.12 0l3.32-3.23c.31-.304.31-.796 0-1.1l-4.27-4.276c-1.42-1.34-3.19-2.05-5.11-2.05zm-.19 8.23c-.76 0-1.38.6-1.38 1.35v1.89c0 .75.62 1.35 1.38 1.35.76 0 1.38-.6 1.38-1.35v-1.89c0-.75-.62-1.35-1.38-1.35zM21.66 12.02l-3.32 3.23c-.31.304-.81.304-1.12 0l-3.32-3.23c-.54-.53-1.26-.81-2.02-.81-.75 0-1.47.28-2.01.81l-3.32 3.23c-.31.304-.81.304-1.12 0l-3.32-3.23c-.31-.304-.31-.796 0-1.1l4.27-4.277c1.42-1.34 3.19-2.05 5.11-2.05s3.69.71 5.11 2.05l4.27 4.277c.31.304.31.796 0 1.1zM11.53 15.02c1.92 0 3.69-.71 5.11-2.05l4.27-4.277c.31-.304.31-.796 0-1.1L17.59 3.32c-.31-.304-.81-.304-1.12 0l-3.32 3.23c-.54.53-1.26.81-2.02.81-.75 0-1.47-.28-2.01-.81L5.8 3.32c-.31-.304-.81-.304-1.12 0L.41 7.597c-.31.304-.31.796 0 1.1l4.27 4.277c1.42 1.34 3.19 2.05 5.11 2.05z" />
  </svg>
)
// (Adicione outros ícones de pagamento se necessário)

export default function Footer() {
  // Paleta de cores
  const styles = {
    background: '#F7F3ED', // Fundo principal
    bottomBarBg: '#7A4E2D', // Cor de Título para o fundo da barra inferior
    bottomBarText: '#F7F3ED', // Cor de Fundo para o texto da barra inferior
    title: '#7A4E2D', // Títulos (MAPA DO SITE)
    links: '#304D45', // Links (Home, Shop...)
    socialIcons: '#56362C', // Cor dos ícones (para bater com o Header)
  }

  // Listas de Links
  const siteMapLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Páginas', href: '/pages' },
    { name: 'Blog', href: '/blog' },
  ]

  const institutionalLinks = [
    { name: 'Sobre Nós', href: '/sobre-nos' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contato', href: '/contato' },
    { name: 'Termos e Condições', href: '/termos' },
  ]

  const policyLinks = [
    { name: 'Política de Privacidade', href: '/privacidade' },
    { name: 'Política de Reembolso', href: '/reembolso' },
    { name: 'Política de Envio', href: '/envio' },
  ]

  return (
    <footer style={{ backgroundColor: styles.background }}>
      {/* --- SECÇÃO 1: PRINCIPAL (NEWSLETTER E LINKS) --- */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Lado Esquerdo: Logo, Newsletter e Social */}
          <div className="flex flex-col gap-6 lg:flex-1">
            <Link href="/">
              <Image
                src="/logocajuia.png"
                alt="Cajuia Logo"
                width={180}
                height={40}
              />
            </Link>
            <p className="text-sm" style={{ color: styles.links }}>
              Fique por dentro das novidades e receba descontos exclusivos no
              seu e-mail.
            </p>
            {/* Formulário Newsletter */}
            <form
              action="#"
              onSubmit={(e) => e.preventDefault()}
              className="mt-2"
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
                  color: styles.links,
                }}
              />
              {/* Botão de envio pode ser adicionado se necessário */}
            </form>
            {/* Ícones Sociais */}
            <div className="mt-4 flex gap-4" style={{ color: styles.socialIcons }}>
              <a href="#" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="Instagram">
                <InstagramIcon />
              </a>
              {/* Adicione mais ícones aqui */}
            </div>
          </div>

          {/* Lado Direito: Colunas de Links */}
          <div className="flex gap-12 lg:gap-16">
            {/* Coluna 1: Mapa do Site */}
            <div>
              <h4
                className="font-semibold uppercase tracking-wider"
                style={{ color: styles.title }}
              >
                Mapa do Site
              </h4>
              <ul className="mt-4 space-y-3">
                {siteMapLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:underline"
                      style={{ color: styles.links }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 2: Institucional */}
            <div>
              <h4
                className="font-semibold uppercase tracking-wider"
                style={{ color: styles.title }}
              >
                Institucional
              </h4>
              <ul className="mt-4 space-y-3">
                {institutionalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:underline"
                      style={{ color: styles.links }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 3: Políticas */}
            <div>
              <h4
                className="font-semibold uppercase tracking-wider"
                style={{ color: styles.title }}
              >
                Políticas
              </h4>
              <ul className="mt-4 space-y-3">
                {policyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:underline"
                      style={{ color: styles.links }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECÇÃO 2: BARRA INFERIOR (COPYRIGHT E PAGAMENTO) --- */}
      <div style={{ backgroundColor: styles.bottomBarBg }}>
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
            {/* Copyright */}
            <p className="text-sm" style={{ color: styles.bottomBarText }}>
              © {new Date().getFullYear()} Cajuia Store. Todos os direitos
              reservados.
            </p>
            {/* Ícones de Pagamento */}
            <div
              className="flex items-center gap-3"
              style={{ color: styles.bottomBarText }}
            >
              <VisaIcon />
              <MastercardIcon />
              <PixIcon />
              {/* Adicione outros ícones de pagamento (Elo, Amex) aqui */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}