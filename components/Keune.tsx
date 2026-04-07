import ProductCard from "@/components/ProductCard"
import Link from "next/link"
import SectionTitle from "@/components/SectionTitle"

export default function Keune() {
  return (
    <section
      className="relative flex min-h-[600px] w-full flex-1 flex-col bg-cover bg-center bg-no-repeat pt-12 pb-0 md:min-h-[620px] md:pt-16"
      style={{
        backgroundImage: "url('/fon_keune.svg')",
        backgroundColor: "#7ebfe6",
      }}
    >

      <div className="absolute -top-6 left-0 w-full text-center z-30">
        <SectionTitle text="KEUNE" color="#25739D" echoColor="#FFFFFF" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col min-h-0 px-4 pt-12 pb-12 md:px-10 md:pt-16 md:pb-16 lg:pb-20">

        <div className="flex min-h-0 w-full flex-1 flex-col items-center mt-6 xl:flex-row xl:justify-center xl:gap-10 lg:mt-8">

          <img
            src="/keune_photo.svg"
            alt="products"
            className="w-[240px] mb-6 md:w-[350px] lg:w-[340px] xl:w-[380px] lg:mb-0"
          />

          <div className="flex flex-col items-center gap-5 md:gap-6 lg:flex-row lg:items-center lg:gap-6 xl:gap-8">

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-7 max-w-[360px] md:max-w-[500px] lg:max-w-none">
              <ProductCard
                image="/keuneSHAMPU.svg"
                subtitle="шампунь для волос"
                title="KEUNE shampoo"
                price="2 650 ₽"
                plusColor="#4B9CC8"
                priceColor="#4B9CC8"
                productId={10}
              />

              <ProductCard
                image="/keuneSPRAYY.svg"
                subtitle="спрей для волос"
                title="KEUNE spray"
                price="3 650 ₽"
                plusColor="#4B9CC8"
                priceColor="#4B9CC8"
                productId={11}
              />
            </div>

            <Link href="/keunestr" className="bg-[#4B9CC8] hover:bg-[#2F96CF]
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
