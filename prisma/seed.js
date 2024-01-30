import { prisma } from '../prisma.js'

async function main () {
  await prisma.team.create({
    data: {
      name: 'Test Team 1'
    }
  })

  await prisma.team.create({
    data: {
      name: 'Test Team 2'
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
