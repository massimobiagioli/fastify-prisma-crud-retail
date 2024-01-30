import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

export default fp(async (fastify) => {
  fastify.register(swagger, {
    swagger: {
      info: {
        title: 'Fastify Prisma CRUD Retail',
        description: 'Fastify Prisma CRUD Retail API',
        version: '0.1.0'
      }
    }
  })

  fastify.register(swaggerUI)
})
