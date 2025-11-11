// Define a "forma" dos dados que esperamos do Supabase

export type ProductVariant = {
  id: number
  price: number
  compare_at_price: number | null
  sku: string | null
  inventory_quantity: number
}

export type ProductImage = {
  id: number
  src: string
  alt_text: string | null
  position: number | null 
}

export type Product = {
  id: number
  title: string
  handle: string // O "slug" da URL
  description_html: string | null
  vendor: string | null
  // Dizemos ao TypeScript que esperamos "arrays" de variantes e imagens
  product_variants: ProductVariant[]
  product_images: ProductImage[]
}