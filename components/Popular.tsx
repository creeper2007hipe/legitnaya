"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import ProductCard from "@/components/ProductCard"
import SectionTitle from "@/components/SectionTitle"

type Product = {
  id: number
  name: string
  subtitle: string
  image: string
  price: number
}

export default function Popular() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch("/api/products?popular=true")
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data) ? data : []
        const sorted = [...list].sort((a: Product, b: Product) => a.id - b.id)
        setProducts(sorted.slice(0, 2))
      })
      .catch(() => setProducts([]))
  }, [])

  const fallbackProducts: Product[] = [
    {
      id: 10001,
      name: "DARLING Red Vita-Acid",
      subtitle: "крем для лица",
      image: "",
      price: 1791,
    },
    {
      id: 10002,
      name: "CLARINS Skin Remodelant",
      subtitle: "крем для тела",
      image: "",
      price: 5525,
    },
  ]

  const displayProducts = products.length > 0 ? products : fallbackProducts

  return (
    <section className="relative w-full min-h-[560px] pt-12 md:pt-16">

      {/* ФОН */}
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/fon_popular.svg')",
        }}
      />

      {/* ЗАГОЛОВОК (поверх всего, вылезает наружу) */}
      <div className="absolute -top-3 md:top-0 lg:top-0 xl:-top-4 2xl:-top-6 left-0 w-full text-center z-30">
        <SectionTitle text="ПОПУЛЯРНОЕ" color="#FF5E5E" echoColor="#FFFFFF" />
      </div>

      {/* КОНТЕНТ */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-10 pt-12 md:pt-16 pb-12 md:pb-16 lg:pb-20">

        {/* ОСНОВНОЙ БЛОК */}
        <div className="flex flex-col items-center mt-6 xl:flex-row xl:justify-center xl:gap-10 lg:mt-8">

          {/* КАРТИНКА */}
          <img
            src="/popular_photo.svg"
            alt="products"
            className="w-[240px] mb-6 md:w-[350px] lg:w-[340px] xl:w-[380px] lg:mb-0"
          />

          {/* ПРАВАЯ ЧАСТЬ */}
          <div className="flex flex-col items-center gap-5 md:gap-6 lg:flex-row lg:items-center lg:gap-6 xl:gap-8">

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-7 max-w-[360px] md:max-w-[500px] lg:max-w-none">
              {displayProducts.map(product => (
                <ProductCard
                  key={product.id}
                  productId={product.id}
                  image={product.image}
                  subtitle={product.subtitle}
                  title={product.name}
                  price={`${product.price} ₽`}
                  plusColor="#2C87C5"
                  priceColor="#2C87C5"
                />
              ))}
            </div>
            
            <Link href="/populyarnie" className="bg-[#5aa2d6] hover:bg-[#4a92c6]
              hover:scale-105 transition duration-300 text-white
              px-6 py-2.5 md:px-8 md:py-3 rounded-full text-[13px] md:text-[14px] font-semibold
              shadow-xl whitespace-nowrap inline-block"
            >СМОТРЕТЬ ЕЩЕ</Link>

          </div>

        </div>
      </div>
    </section>
  )
}