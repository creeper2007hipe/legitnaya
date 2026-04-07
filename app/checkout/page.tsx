"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCart()
  
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "courier">("pickup")
  const [address, setAddress] = useState("")
  const [recipient, setRecipient] = useState("")
  const [payment, setPayment] = useState("")

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = deliveryMethod === "courier" ? 888 : 0
  const discount = -999
  const total = subtotal + delivery + discount

  const handleSubmit = () => {
    alert("Заказ оформлен!")
    clearCart()
    router.push("/")
  }

  return (
    <section className="relative w-full min-h-screen py-12">
      {/* ФОН */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-pink-100 via-pink-50 to-white z-0" />

      {/* КОНТЕНТ */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-10 pt-6 pb-20">
        
        {/* КНОПКА НАЗАД */}
        <div className="relative z-20 mb-8 md:mb-12">
          <Link href="/korzina">
            <svg width="60" height="8" viewBox="0 0 80 10" fill="none" className="md:w-[80px] md:h-[10px]">
              <path d="M80 5H5" stroke="#9CA3AF" strokeWidth="2"/>
              <path d="M5 5L10 1M5 5L10 9" stroke="#9CA3AF" strokeWidth="2"/>
            </svg>
          </Link>
        </div>

        {/* ЗАГОЛОВОК ЗАКАЗ С ЛИНИЯМИ */}
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-10 md:mb-16">
          <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#FF7B98] to-[#FF7B98]" />
          <h1 className="text-[28px] md:text-[40px] lg:text-[48px] font-bold text-[#FF7B98] uppercase whitespace-nowrap">
            ЗАКАЗ
          </h1>
          <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#FF7B98] to-[#FF7B98]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-[1200px] mx-auto lg:items-start">
          
          {/* ЛЕВАЯ КОЛОНКА - ФОРМА */}
          <div className="bg-white/60 backdrop-blur-sm rounded-[20px] md:rounded-[24px] p-5 md:p-6 lg:p-8 space-y-5 md:space-y-6 h-fit">
            
            {/* СПОСОБ ПОЛУЧЕНИЯ */}
            <div>
              <h2 className="text-[16px] md:text-[20px] lg:text-[22px] font-bold text-[#FF7B98] uppercase mb-3 md:mb-4">
                СПОСОБ ПОЛУЧЕНИЯ
              </h2>
              <div className="flex gap-3 md:gap-4">
                <button
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`flex-1 py-2.5 md:py-3 px-4 md:px-6 rounded-full text-[13px] md:text-[15px] lg:text-[16px] font-semibold uppercase transition ${
                    deliveryMethod === "pickup" 
                      ? "bg-[#FFA8BA] text-white" 
                      : "bg-white/70 text-[#FF7B98] hover:bg-white/90"
                  }`}
                >
                  САМОВЫВОЗ
                </button>
                <button
                  onClick={() => setDeliveryMethod("courier")}
                  className={`flex-1 py-2.5 md:py-3 px-4 md:px-6 rounded-full text-[13px] md:text-[15px] lg:text-[16px] font-semibold uppercase transition ${
                    deliveryMethod === "courier" 
                      ? "bg-[#FFA8BA] text-white" 
                      : "bg-white/70 text-[#FF7B98] hover:bg-white/90"
                  }`}
                >
                  КУРЬЕР
                </button>
              </div>
            </div>

            {/* АДРЕС ДОСТАВКИ */}
            <div>
              <h3 className="text-[15px] md:text-[17px] lg:text-[18px] font-bold text-[#FF7B98] uppercase mb-2 md:mb-3">
                АДРЕС ДОСТАВКИ
              </h3>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-5 md:px-6 py-3 md:py-4 rounded-[18px] md:rounded-[20px] bg-white border border-[#FF7B98]/20 outline-none focus:border-[#FF7B98]/50 text-[13px] md:text-[15px] lg:text-[16px] text-black placeholder:text-black/40 transition"
                placeholder="Введите адрес"
              />
            </div>

            {/* ПОЛУЧАТЕЛЬ */}
            <div>
              <h3 className="text-[15px] md:text-[17px] lg:text-[18px] font-bold text-[#FF7B98] uppercase mb-2 md:mb-3">
                ПОЛУЧАТЕЛЬ
              </h3>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-5 md:px-6 py-3 md:py-4 rounded-[18px] md:rounded-[20px] bg-white border border-[#FF7B98]/20 outline-none focus:border-[#FF7B98]/50 text-[13px] md:text-[15px] lg:text-[16px] text-black placeholder:text-black/40 transition"
                placeholder="ФИО получателя"
              />
            </div>

            {/* ОПЛАТА */}
            <div>
              <h3 className="text-[15px] md:text-[17px] lg:text-[18px] font-bold text-[#FF7B98] uppercase mb-2 md:mb-3">
                ОПЛАТА
              </h3>
              <input
                type="text"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="w-full px-5 md:px-6 py-3 md:py-4 rounded-[18px] md:rounded-[20px] bg-white border border-[#FF7B98]/20 outline-none focus:border-[#FF7B98]/50 text-[13px] md:text-[15px] lg:text-[16px] text-black placeholder:text-black/40 transition"
                placeholder="Способ оплаты"
              />
            </div>

          </div>

          {/* ПРАВАЯ КОЛОНКА - ИТОГИ */}
          <div className="h-fit">
            <div className="bg-[#FFB3C3]/60 backdrop-blur-sm rounded-[20px] md:rounded-[24px] p-5 md:p-6 lg:p-8">
              
              <h2 className="text-[16px] md:text-[20px] lg:text-[22px] font-bold text-white uppercase mb-5 md:mb-6">
                СУММА ЗАКАЗА
              </h2>

              <div className="space-y-2.5 md:space-y-3 mb-6 md:mb-8">
                <div className="flex justify-between items-center text-white">
                  <span className="text-[13px] md:text-[15px] lg:text-[16px] uppercase font-semibold">
                    СТОИМОСТЬ ПРОДУКТОВ
                  </span>
                  <span className="text-[15px] md:text-[17px] lg:text-[18px] font-bold">
                    {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-white">
                  <span className="text-[13px] md:text-[15px] lg:text-[16px] uppercase font-semibold">
                    ДОСТАВКА
                  </span>
                  <span className="text-[15px] md:text-[17px] lg:text-[18px] font-bold">
                    {delivery}
                  </span>
                </div>

                <div className="flex justify-between items-center text-white">
                  <span className="text-[13px] md:text-[15px] lg:text-[16px] uppercase font-semibold">
                    СКИДКА
                  </span>
                  <span className="text-[15px] md:text-[17px] lg:text-[18px] font-bold">
                    {discount}
                  </span>
                </div>
              </div>

              <div className="border-t-2 border-white/40 pt-3 md:pt-4 mb-5 md:mb-6">
                <div className="flex justify-between items-center text-white">
                  <span className="text-[15px] md:text-[17px] lg:text-[18px] uppercase font-bold">
                    ИТОГО
                  </span>
                  <span className="text-[28px] md:text-[36px] lg:text-[40px] font-bold">
                    {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* КНОПКА ОПЛАТИТЬ */}
              <button
                onClick={handleSubmit}
                className="w-full bg-white text-[#FF7B98] text-[15px] md:text-[18px] lg:text-[20px] font-bold py-3.5 md:py-4 rounded-full shadow-xl hover:bg-white/90 hover:scale-[1.02] active:scale-95 transition uppercase"
              >
                ОПЛАТИТЬ
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
