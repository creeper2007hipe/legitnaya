"use client"

import { useCart } from "@/contexts/CartContext"
import Link from "next/link"
import { X } from "lucide-react"

export default function CartPage() {
  const { items, removeItem } = useCart()

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <section className="relative w-full min-h-screen py-12">
      {/* ФОН */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-pink-100 via-pink-50 to-white z-0" />

      {/* КОНТЕНТ */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-10 pt-6 pb-20">
        
        {/* КНОПКА НАЗАД */}
        <div className="relative z-20 mb-8 md:mb-12">
          <Link href="/">
            <svg width="60" height="8" viewBox="0 0 80 10" fill="none" className="md:w-[80px] md:h-[10px]">
              <path d="M80 5H5" stroke="#9CA3AF" strokeWidth="2"/>
              <path d="M5 5L10 1M5 5L10 9" stroke="#9CA3AF" strokeWidth="2"/>
            </svg>
          </Link>
        </div>

        {/* ЗАГОЛОВОК КОРЗИНА С ЛИНИЯМИ */}
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-10 md:mb-16">
          <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#FF7B98] to-[#FF7B98]" />
          <h1 className="text-[28px] md:text-[40px] lg:text-[48px] font-bold text-[#FF7B98] uppercase whitespace-nowrap">
            КОРЗИНА
          </h1>
          <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#FF7B98] to-[#FF7B98]" />
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[18px] md:text-[24px] text-black/50">Корзина пуста</p>
          </div>
        ) : (
          <>
            {/* КАРТОЧКИ ТОВАРОВ */}
            <div className="flex flex-col gap-4 md:gap-6 mb-8 md:mb-12">
              {items.map(item => (
                <div 
                  key={item.id}
                  className="bg-white/48 backdrop-blur-md rounded-[24px] md:rounded-[32px] p-4 md:p-6 lg:p-8 shadow-xl relative"
                >
                  {/* КНОПКА УДАЛИТЬ */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 left-3 md:top-4 md:left-4 w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#FF7B98] flex items-center justify-center text-white hover:bg-[#FF5A7A] transition active:scale-95 z-10"
                    aria-label="Удалить из корзины"
                  >
                    <X size={14} strokeWidth={2.5} className="md:w-4 md:h-4" />
                  </button>

                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                    {/* КАРТИНКА СЛЕВА */}
                    <div className="w-full md:w-[220px] lg:w-[280px] flex-shrink-0 flex justify-center relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-[180px] md:max-w-[220px] lg:max-w-[280px] h-auto object-contain"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = "/keuneSHAMPU.svg"
                        }}
                      />
                      {item.quantity > 1 && (
                        <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-[#FF7B98] text-white text-[13px] md:text-[16px] font-bold w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg">
                          {item.quantity}
                        </div>
                      )}
                    </div>

                    {/* ИНФОРМАЦИЯ СПРАВА */}
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-[13px] md:text-[15px] lg:text-[16px] text-black/70 mb-1 md:mb-2">
                        {item.subtitle}
                      </p>
                      <h2 className="text-[19px] md:text-[24px] lg:text-[28px] font-bold uppercase leading-tight mb-2 md:mb-4">
                        {item.name}
                      </h2>
                      <div className="flex flex-col md:flex-row md:items-baseline md:gap-3">
                        <p className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#FF7B98]">
                          {item.price.toLocaleString()} ₽
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-[14px] md:text-[16px] lg:text-[18px] text-black/60">
                            × {item.quantity} = {(item.price * item.quantity).toLocaleString()} ₽
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ИТОГО */}
            <div className="flex justify-center md:justify-end items-center gap-3 md:gap-4 max-w-[600px] md:ml-auto mb-5 md:mb-6 px-4">
              <span className="text-[28px] md:text-[35px] lg:text-[40px] font-bold text-black/70 uppercase">
                ИТОГО:
              </span>
              <span className="text-[28px] md:text-[36px] lg:text-[40px] font-bold text-[#FF7B98]">
                {total.toLocaleString()} ₽
              </span>
            </div>

            {/* КНОПКА ЗАКАЗАТЬ */}
            <div className="flex justify-center md:justify-end">
              <Link
                href="/checkout"
                className="bg-[#FFA8BA] hover:bg-[#FF8BA0] text-white text-[16px] md:text-[20px] lg:text-[24px] font-semibold px-12 md:px-20 lg:px-24 py-3.5 md:py-4 lg:py-5 rounded-full shadow-2xl hover:scale-[1.02] active:scale-95 transition uppercase inline-block"
              >
                ЗАКАЗАТЬ
              </Link>
            </div>
          </>
        )}

      </div>
    </section>
  )
}
