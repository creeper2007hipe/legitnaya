"use client"

import { useEffect, useState } from "react"
import ProductCard from "@/components/ProductCard"
import Link from "next/link"
import SectionTitle from "@/components/SectionTitle"

type Product = {
  id: number
  name: string
  subtitle: string
  image: string
  price: number
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch("/api/products?category=DARLING")
      .then(async res => {
        if (!res.ok) return []
        const text = await res.text()
        if (!text) return []
        try {
          return JSON.parse(text)
        } catch {
          return []
        }
      })
      .then(data => {
        const safeData = Array.isArray(data) ? data : []
        const sorted = [...safeData].sort((a: Product, b: Product) => a.id - b.id)
        setProducts(sorted.slice(0, 4))
      })
      .catch(() => setProducts([]))
  }, [])

  return (
    <section className="relative w-full min-h-screen pt-12 md:pt-16 pb-12 isolate">

      <div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center z-0 overflow-hidden"
        style={{
          backgroundImage: "url('/darlingstrfon.svg')",
        }}
      />

      <div className="absolute -top-6 md:top-0 lg:-top-6 left-0 w-full text-center z-40 overflow-visible">
        <SectionTitle text="DARLING*" color="#FF5A7A" echoColor="#FFFFFF" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto overflow-x-hidden px-4 md:px-10 pt-12 md:pt-16 pb-20">

        <div className="relative z-20 mb-8 md:mb-12">
          <Link href="/" className="inline-block p-2">
            <svg width="60" height="8" viewBox="0 0 80 10" fill="none" className="md:w-[70px] md:h-[9px]">
              <path d="M80 5H5" stroke="#FF5A7A" strokeWidth="2.5"/>
              <path d="M5 5L10 1M5 5L10 9" stroke="#FF5A7A" strokeWidth="2.5"/>
            </svg>
          </Link>
        </div>

        <div className="flex justify-center mb-4 mt-2 pb-3 md:mt-6 md:pb-5 lg:mt-8 lg:pb-6">
          <img
            src="/darling_photo.svg"
            alt="products"
            className="h-[400px] md:h-[500px] lg:h-[550px] w-auto object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
          />
        </div>

        {/* СЕТКА */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-6 mt-8 md:mt-12 max-w-[360px] md:max-w-[720px] lg:max-w-[900px] 2xl:max-w-[1100px] mx-auto">
          {products.map(product => (
            <div key={product.id}>
              <ProductCard
                productId={product.id}
                image={product.image}
                subtitle={product.subtitle}
                title={product.name}
                price={`${product.price} ₽`}
                plusColor="#2C87C5"
                priceColor="#2C87C5"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}