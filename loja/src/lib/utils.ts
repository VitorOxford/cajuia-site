// ARQUIVO: src/lib/utils.ts (NOVO FICHEIRO)
'use client'

/**
 * Formata um número para a moeda BRL (ex: R$ 159,90)
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}

/**
 * Calcula e formata o preço das parcelas (ex: ou 3x de R$ 53,30)
 */
export function formatInstallments(
  price: number,
  installments: number = 3
): string {
  if (price <= 0) return ''
  const installmentPrice = price / installments
  return `ou ${installments}x de ${formatPrice(installmentPrice)}`
}