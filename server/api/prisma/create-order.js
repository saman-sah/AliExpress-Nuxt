import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = readBody(event)

  const order = await prisma.order.create({
    data: {
      userId: body.userId,
      stripId: body.stripId,
      name: body.name,
      address: body.address,
      zipcode: body.zipcode,
      city: body.city,
      country: body.country
    }
  })

  body.products.foeEach(async prdct => {
    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: Number(prdct.id)
      }
    })
  })

  return order
})