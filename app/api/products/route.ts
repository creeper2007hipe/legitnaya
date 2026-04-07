import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const category = searchParams.get("category")
  const popular = searchParams.get("popular")

  const products = await prisma.product.findMany({
    where:
      popular === "true"
        ? { isPopular: true }
        : category
          ? {
              OR: [
                {
                  category: {
                    name: category,
                  },
                },
                // Fallback: support datasets where categoryId is inconsistent
                // by matching products that start with brand prefix in name.
                {
                  name: {
                    startsWith: category,
                  },
                },
              ],
            }
          : {},
  })

  return Response.json(products)
}