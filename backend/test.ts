import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const g = await prisma.grievance.findMany({})
  console.log(g)
}
main()
