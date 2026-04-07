import ProductCard from "@/components/ProductCard"
import Link from "next/link"
import SectionTitle from "@/components/SectionTitle"

export default function Clarins() {
  return (
    <section className="relative w-full min-h-[560px] pt-12 md:pt-16">

      {/* ФОН */}
      <div
        className="
          absolute 
          inset-0
          w-full 
          h-full
          bg-no-repeat 
          bg-cover 
          bg-center
          z-0
        "
        style={{
          backgroundImage: "url('/fon_clarins.svg')",
        }}
      />

      {/* ЗАГОЛОВОК (поверх всего, вылезает наружу) */}
      <div className="absolute -top-6 left-0 w-full text-center z-30">
        <SectionTitle text="CLARINS" color="#BA2D1C" echoColor="#FFFFFF" />
      </div>

      {/* КОНТЕНТ */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-10 pt-12 md:pt-16 pb-12 md:pb-16 lg:pb-20">

        {/* ОСНОВНОЙ БЛОК */}
        <div className="flex flex-col items-center mt-6 xl:flex-row xl:justify-center xl:gap-10 lg:mt-8">

          {/* КАРТИНКА */}
          <img
            src="/clarins_photo.svg"
            alt="products"
            className="w-[240px] mb-6 md:w-[350px] lg:w-[340px] xl:w-[380px] lg:mb-0"
          />

          {/* ПРАВАЯ ЧАСТЬ */}
          <div className="flex flex-col items-center gap-5 md:gap-6 lg:flex-row lg:items-center lg:gap-6 xl:gap-8">

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-7 max-w-[360px] md:max-w-[500px] lg:max-w-none">
              <ProductCard
                image="/clarinsBLESKK.svg"
                subtitle="блеск для губ"
                title="CLARINS Lip Perfector"
                price="2 295 ₽"
                plusColor="#FF7463"
                priceColor="#FF7463"
                productId={6}
              />

              <ProductCard
                image="/clarinsCREAM.svg"
                subtitle="крем для лица"
                title="CLARINS Paris"
                price="7 650 ₽"
                plusColor="#FF7463"
                priceColor="#FF7463"
                productId={7}
              />
            </div>

            {/* КНОПКА */}
            <Link href="/clarinsstr" className="bg-[#FF7463] hover:bg-[#FF5C48]
              hover:scale-105 transition duration-300 text-white
              px-6 py-2.5 md:px-8 md:py-3 rounded-full text-[13px] md:text-[14px] font-semibold
              shadow-xl whitespace-nowrap inline-block">
                СМОТРЕТЬ ЕЩЕ
            </Link>

          </div>

        </div>
      </div>
    </section>
  )
}