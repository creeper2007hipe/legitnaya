"use client"

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useState } from 'react'

type Props = {
  image: string
  title: string
  subtitle: string
  price: string
  plusColor?: string
  priceColor?: string
  onPlusClick?: () => void
  productId?: number
}

export default function ProductCard({
  image,
  title,
  subtitle,
  price,
  plusColor,
  priceColor,
  onPlusClick,
  productId
}: Props) {
  const router = useRouter()
  const { addItem } = useCart()
  const [justAdded, setJustAdded] = useState(false)

  const handleCardClick = () => {
    if (productId) {
      router.push(`/product/${productId}`)
    }
  }

  const handlePlusClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (onPlusClick) {
      onPlusClick()
    } else if (productId) {
      const priceNum = parseInt(price.replace(/\s/g, '').replace('₽', ''))
      addItem({
        id: productId,
        name: title,
        subtitle: subtitle,
        image: image,
        price: priceNum
      })
      
      setJustAdded(true)
      setTimeout(() => setJustAdded(false), 1000)
    }
  }

  return (
    <div
      onClick={handleCardClick}
      className="
        relative 
        h-[240px] w-[160px]
        md:h-[330px] md:w-[220px]
        lg:h-[349px] lg:w-[238px]
        bg-white/48 backdrop-blur-md
        rounded-[20px] md:rounded-[24px] lg:rounded-[28px]
        px-2.5 md:px-4 lg:px-5 py-2.5 md:py-4 lg:py-5
        flex flex-col
        items-stretch
        text-left
        shadow-[0_8px_24px_rgba(0,0,0,0.06)]
        hover:scale-[1.02] hover:bg-white/58 transition duration-300
        cursor-pointer
      "
    >
      <button
        onClick={handlePlusClick}
        className={`
          absolute top-2.5 left-2.5 md:top-3 md:left-3
          w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10
          rounded-full 
          flex items-center justify-center 
          text-white
          transition
          z-10
          ${justAdded ? 'scale-125 rotate-90' : 'active:scale-95'}
        `}
        style={{ backgroundColor: plusColor }}
        aria-label={`Добавить ${title} в корзину`}
      >
        <Plus size={18} strokeWidth={1.5} className="md:hidden" />
        <Plus size={20} strokeWidth={1.5} className="hidden md:block" />
      </button>

      {justAdded && (
        <div className="absolute top-12 md:top-14 lg:top-16 left-2 bg-white/72 backdrop-blur-md text-[#FF5A7A] text-[9px] md:text-[10px] lg:text-[11px] font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-full z-20 shadow-lg animate-fade-in">
          ✓ В КОРЗИНЕ
        </div>
      )}

      <div className="flex-1 min-h-0 min-w-0 overflow-hidden flex flex-col justify-end items-center pb-1 md:pb-1.5">
        {image ? (
          <img
            src={image}
            alt={title}
            className="block h-auto w-full max-h-full max-w-full object-contain object-bottom"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = "/keuneSHAMPU.svg"
            }}
          />
        ) : (
          <span className="text-[10px] md:text-[11px] lg:text-[14px] text-black/45 uppercase tracking-wide pb-2">
            Product
          </span>
        )}
      </div>

      <div className="shrink-0 leading-tight w-full pt-1">
        <p className="text-[11px] md:text-[12px] lg:text-[13px] mb-0.5 text-black/75 line-clamp-1">
          {subtitle}
        </p>

        <h3 className="font-bold uppercase text-[14px] md:text-[17px] lg:text-[18px] leading-[1.05] line-clamp-2 min-h-[29px] md:min-h-[36px] lg:min-h-[42px] mb-0.5">
          {title}
        </h3>

        <p
          className="text-[17px] md:text-[23px] lg:text-[32px] font-bold"
          style={{ color: priceColor }}
        >
          {price}
        </p>
      </div>
    </div>
  )
}