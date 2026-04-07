"use client"

import { useCart } from "@/contexts/CartContext"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

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

export default function Header() {
  const { itemCount } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    fetch("/api/products")
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
        setAllProducts(Array.isArray(data) ? data : [])
      })
      .catch(() => setAllProducts([]))
  }, [])

  useEffect(() => {
    const handlePointerOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      if (searchRef.current && !searchRef.current.contains(target)) {
        setIsSearchFocused(false)
      }
    }

    document.addEventListener("mousedown", handlePointerOutside)
    document.addEventListener("touchstart", handlePointerOutside, { passive: true })
    return () => {
      document.removeEventListener("mousedown", handlePointerOutside)
      document.removeEventListener("touchstart", handlePointerOutside)
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchFocused(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = allProducts.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(query)
      const subtitleMatch = product.subtitle.toLowerCase().includes(query)
      const categoryMatch = product.category?.name.toLowerCase().includes(query)
      return nameMatch || subtitleMatch || categoryMatch
    })

    setSearchResults(filtered.slice(0, 6))
  }, [searchQuery, allProducts])

  const handleProductClick = (id: number) => {
    router.push(`/product/${id}`)
    setSearchQuery("")
    setIsSearchFocused(false)
  }

  return (
    <header className="w-full relative z-50 overflow-visible">

      {/* верхняя панель */}
        <div className="relative z-20 w-full overflow-visible bg-gradient-to-r from-[#f4a3a5] to-[#ff5a5a] text-white">
            <div className="max-w-[1440px] mx-auto h-[70px] md:h-[84px] flex items-center justify-between overflow-visible px-3 md:px-8 lg:px-12">

                {/* логотип */}
                <Link href="/" className="text-[15px] md:text-[22px] lg:text-[30px] font-bold tracking-[0px] md:tracking-[1px] uppercase hover:opacity-90 transition whitespace-nowrap">
                НЕЖНО О КОЖЕ
                </Link>

                {/* меню */}
                <nav className="flex gap-4 md:gap-6 lg:gap-8 text-[12px] md:text-[14px] lg:text-[16px] font-black uppercase items-center overflow-visible whitespace-nowrap">
                
                {/* ПОИСК */}
                <div className="relative ml-0.5 md:ml-4" ref={searchRef}>
                  <div className="flex items-center gap-1.5 md:gap-2 bg-white/20 hover:bg-white/30 rounded-full px-2.5 md:px-4 py-1.5 md:py-2 transition -translate-x-0.5 md:translate-x-0">
                    <Search size={15} className="text-white flex-shrink-0 max-md:-translate-y-0.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      placeholder="поиск"
                      className="bg-transparent outline-none text-white placeholder:text-white/70 w-[60px] md:w-[120px] text-[14px] md:text-[15px] max-md:-translate-y-0.5"
                    />
                  </div>

                  {isSearchFocused && searchQuery.length >= 2 && (
                    <div
                      aria-label="Результаты поиска"
                      className="fixed z-[60] max-md:left-[max(12px,env(safe-area-inset-left,0px))] max-md:right-[max(12px,env(safe-area-inset-right,0px))] max-md:top-[calc(70px+8px)] max-md:rounded-2xl max-md:pb-[max(12px,env(safe-area-inset-bottom,0px))] md:absolute md:left-auto md:right-0 md:top-full md:mt-2 md:w-[min(100vw-2rem,420px)] lg:w-[min(100vw-2rem,480px)] md:rounded-[22px] md:pb-0 bg-white shadow-2xl border border-black/[0.08] md:border-0 overflow-hidden"
                    >
                      {searchResults.length === 0 ? (
                        <div className="px-5 py-8 text-center text-[16px] leading-snug text-black/50 md:px-8 md:py-10 md:text-[17px]">
                          Ничего не найдено
                        </div>
                      ) : (
                        <div className="divide-y divide-black/5">
                          {searchResults.map(product => (
                            <button
                              type="button"
                              key={product.id}
                              onClick={() => handleProductClick(product.id)}
                              className="grid w-full grid-cols-[4rem_1fr] grid-rows-[auto_auto] gap-x-4 gap-y-1.5 px-4 py-4 text-left items-start hover:bg-[#FF7B98]/8 active:bg-[#FF7B98]/12 transition sm:px-5 sm:py-5 md:flex md:items-center md:gap-5 md:px-6 md:py-5"
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="col-start-1 row-start-1 row-span-2 h-16 w-16 object-contain self-start md:row-span-1 md:h-[72px] md:w-[72px] lg:h-20 lg:w-20"
                                onError={(e) => {
                                  e.currentTarget.onerror = null
                                  e.currentTarget.src = "/keuneSHAMPU.svg"
                                }}
                              />
                              <div className="col-start-2 row-start-1 min-w-0 md:flex-1">
                                <p className="mb-1 line-clamp-1 text-[15px] text-black/65 md:text-[16px] lg:text-[17px]">
                                  {product.subtitle}
                                </p>
                                <h3 className="line-clamp-2 text-[17px] font-bold uppercase leading-snug text-black md:text-[19px] lg:text-[21px]">
                                  {product.name.length > 44 ? product.name.substring(0, 44) + "…" : product.name}
                                </h3>
                                {product.category && (
                                  <p className="mt-0.5 line-clamp-1 text-[12px] font-bold text-[#FF7B98] md:text-[13px] lg:text-[14px]">
                                    {product.category.name}
                                  </p>
                                )}
                              </div>
                              <p className="col-start-2 row-start-2 justify-self-end text-[17px] font-bold tabular-nums text-[#FF7B98] md:justify-self-auto md:self-center md:text-[19px] lg:text-[22px] md:shrink-0">
                                {product.price.toLocaleString()} ₽
                              </p>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <Link href="/korzina" className="hover:scale-115 transition duration-300 relative whitespace-nowrap pr-5">
                  корзина
                  {itemCount > 0 && (
                    <span className="absolute top-0 -right-0.5 bg-white text-[#ff5a5a] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
                <a href="#" className="hover:scale-115 transition duration-300 whitespace-nowrap">о нас</a>
                </nav>

            </div>
        </div>

      {/* адрес доставки */}
        <div className="w-full bg-white relative z-10 border-t border-black/[0.04]">
            <div className="max-w-[1440px] mx-auto py-6 pb-7 md:pb-8 flex items-center justify-center gap-6">

            {/* линия */}
            <div className="flex-1 h-[2px] bg-red-400"></div>

            {/* текст */}
            <div className="text-center leading-tight">
                <div className="text-[16px] font-light">
                адрес доставки:
                </div>

                <div className="text-[20px] font-light">
                г. Москва, кузнецкий мост
                </div>
            </div>

            {/* линия */}
            <div className="flex-1 h-[2px] bg-[#FF6A6A]"></div>

            </div>
        </div>

    </header>
  )
}