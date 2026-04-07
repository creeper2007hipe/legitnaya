"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useCart } from "@/contexts/CartContext"

type Product = {
  id: number
  name: string
  subtitle: string
  image: string
  price: number
  category?: {
    name: string
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = params.id
    if (!id) return

    fetch(`/api/products/${id}`)
      .then(async res => {
        if (!res.ok) return null
        const text = await res.text()
        if (!text) return null
        try {
          return JSON.parse(text)
        } catch {
          return null
        }
      })
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(() => {
        setProduct(null)
        setLoading(false)
      })
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-black/50">Загрузка...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-black/50">Товар не найден</p>
      </div>
    )
  }

  const brandColor = product.category?.name === "DARLING" 
    ? "#FF5A7A" 
    : product.category?.name === "CLARINS"
    ? "#BA2D1C"
    : product.category?.name === "KEUNE"
    ? "#4B9CC8"
    : "#2C87C5"

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      image: product.image,
      price: product.price
    })
    router.push("/korzina")
  }

  return (
    <section className="relative w-full min-h-screen py-12">
      {/* ФОН */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-pink-100 via-pink-50 to-white z-0" />

      {/* КОНТЕНТ */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-10 pt-6 pb-20">
        
        {/* КНОПКА НАЗАД */}
        <div className="relative z-20 mb-12">
          <Link href="/">
            <svg width="80" height="10" viewBox="0 0 80 10" fill="none">
              <path d="M80 5H5" stroke="#9CA3AF" strokeWidth="2"/>
              <path d="M5 5L10 1M5 5L10 9" stroke="#9CA3AF" strokeWidth="2"/>
            </svg>
          </Link>
        </div>

        {/* ОСНОВНАЯ БЕЛАЯ КАРТОЧКА */}
        <div className="bg-white/48 backdrop-blur-md rounded-[28px] p-6 md:p-8 shadow-xl max-w-[650px] mx-auto">
          
          <div className="flex flex-col md:flex-row gap-5">
            
            {/* ЛЕВАЯ ЧАСТЬ - КАРТИНКА */}
            <div className="flex-shrink-0 flex justify-center md:w-[260px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-[220px] md:max-w-[260px] h-auto object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = "/keuneSHAMPU.svg"
                }}
              />
            </div>

            {/* ПРАВАЯ ЧАСТЬ - ИНФОРМАЦИЯ */}
            <div className="flex-1 flex flex-col min-w-0">
              
              {/* ЦЕНА СПРАВА ВВЕРХУ */}
              <div className="text-right mb-3">
                <p 
                  className="text-[38px] md:text-[44px] font-bold leading-none"
                  style={{ color: brandColor }}
                >
                  {product.price.toLocaleString()} ₽
                </p>
              </div>

              {/* ПОДЗАГОЛОВОК */}
              <p className="text-[12px] md:text-[13px] text-black/70 mb-1">
                {product.subtitle}
              </p>

              {/* НАЗВАНИЕ */}
              <h1 className="text-[17px] md:text-[19px] font-bold uppercase leading-tight mb-5">
                {product.name}
              </h1>

              {/* КНОПКА В КОРЗИНУ */}
              <div className="mb-5">
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-10 rounded-full text-white text-[14px] md:text-[16px] font-semibold shadow-lg hover:scale-[1.02] active:scale-95 transition"
                  style={{ backgroundColor: brandColor }}
                >
                  В КОРЗИНУ
                </button>
              </div>

              {/* СОСТАВ */}
              <div className="max-w-full">
                <h3 
                  className="text-[12px] md:text-[13px] font-bold mb-2 uppercase"
                  style={{ color: brandColor }}
                >
                  СОСТАВ:
                </h3>
                <p className="text-[11px] md:text-[12px] leading-relaxed text-black/70" style={{ wordBreak: 'break-all' }}>
                  АКВАЦИТРИЦЕТИЛГЛИЦЕРИНЦИКЛОПЕНТАСИЛОКСАНСИЛИКАТМАГНИЯКСАНТАНОВАЯКАММИЦЕЛЛЮЛОЗААЦЕТИЛГЛЮКОЗАМИНГЛИЦИНОЕВАЯКИСЛОТАЦИТРАЛЛИБТАЛЬЗАТФИЛИПИМИЛЛИПУРТУИПУКПИМИПИПУКПИЛУКЛИАИЦИРИКА
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
