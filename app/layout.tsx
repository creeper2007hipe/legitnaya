import { Oswald } from "next/font/google";
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { CartProvider } from "@/contexts/CartContext"

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="h-full" suppressHydrationWarning>
      <body
        className={`${oswald.className} h-full min-h-dvh bg-white antialiased`}
        suppressHydrationWarning
      >
        <CartProvider>
          <div className="grid min-h-dvh w-full grid-rows-[auto_minmax(0,1fr)_auto]">
            <Header />

            <main className="relative z-0 flex min-h-0 min-w-0 w-full flex-col pt-6 md:pt-10">
              {children}
            </main>

            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
