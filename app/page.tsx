import Popular from "@/components/Popular"
import Darling from "@/components/Darling"
import Clarins from "@/components/Clarins"
import Keune from "@/components/Keune"


export default function Home() {
  return (
    <div className="mt-4 flex min-h-0 w-full flex-1 flex-col gap-16 md:mt-12 md:gap-24 lg:gap-32">
      <Popular />
      <Darling />
      <Clarins />
      <Keune />
    </div>
  )
}
