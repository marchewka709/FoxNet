import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ProductDetail } from '@/components/ProductDetail'
import { productQuery } from '@/lib/products'

export const Route = createFileRoute('/drukarki/$slug')({
  head: () => ({
    meta: [
      { title: 'Produkt – Foxnet' },
      { name: 'description', content: 'Szczegóły produktu' },
    ],
  }),
  loader: ({ context, params }) => context.queryClient.ensureQueryData(productQuery(params.slug)),
  component: ProductPage,
})

function ProductPage() {
  return (
    <Suspense fallback={<div className="h-40" />}>
      <ProductLoader />
    </Suspense>
  )
}

function ProductLoader() {
  const { data: product } = useSuspenseQuery(productQuery(Route.useParams().slug))
  return <ProductDetail product={product} />
}