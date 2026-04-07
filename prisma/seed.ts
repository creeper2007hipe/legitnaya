import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seed начался...")

  // 1. создаём категории
  const keune = await prisma.productCategory.create({
    data: { name: "KEUNE" },
  })

  const darling = await prisma.productCategory.create({
    data: { name: "DARLING" },
  })

  const clarins = await prisma.productCategory.create({
    data: { name: "CLARINS" },
  })

  // 2. создаём товары с привязкой к категориям
  await prisma.product.createMany({
    data: [
      // KEUNE
      {
        name: "KEUNE shampoo",
        subtitle: "шампунь для волос",
        price: 2650,
        image: "/keuneSHAMPU.svg",
        categoryId: keune.id,
        isPopular: true,
      },
      {
        name: "KEUNE spray",
        subtitle: "спрей для волос",
        price: 3650,
        image: "/keuneSPRAYY.svg",
        categoryId: keune.id,
        isPopular: true,
      },

      // DARLING
      {
        name: "DARLING wet kiss",
        subtitle: "помада для губ",
        price: 896,
        image: "/darlingpomada.svg",
        categoryId: darling.id,
        isPopular: true,
      },
      {
        name: "DARLING lumi lip",
        subtitle: "блеск для губ",
        price: 1152,
        image: "/darlingSHINE.svg",
        categoryId: darling.id,
        isPopular: true,
      },

      // CLARINS
      {
        name: "CLARINS Lip Perfector",
        subtitle: "блеск для губ",
        price: 2295,
        image: "/clarinsBLESKK.svg",
        categoryId: clarins.id,
        isPopular: true,
      },
      {
        name: "CLARINS Paris",
        subtitle: "крем для лица",
        price: 7650,
        image: "/clarinsCREAM.svg",
        categoryId: clarins.id,
        isPopular: true,
      },
    ],
  })

  console.log("Seed завершён")
}

main()
  .catch((e) => {
    console.error("Ошибка:", e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())