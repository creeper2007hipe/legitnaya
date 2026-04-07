import prisma from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const productId = parseInt(id, 10)

  if (isNaN(productId)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 })
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { category: true },
  })

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 })
  }

  return Response.json(product)
}
