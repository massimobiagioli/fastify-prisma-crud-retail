import { prisma } from '../../prisma.js'

export default async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['team'],
      response: {
        200: fastify.getSchema('schema:team:list:response')
      }
    },
    handler: async function (request, reply) {
      return await prisma.team.findMany()
    }
  })

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: {
      tags: ['team'],
      response: {
        200: fastify.getSchema('schema:team'),
        404: {
          type: 'null'
        }
      }
    },
    handler: async function (request, reply) {
      const team = await prisma.team.findUnique({
        where: {
          id: parseInt(request.params.id)
        }
      })

      if (!team) {
        return reply.notFound()
      }

      return team
    }
  })

  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      tags: ['team'],
      body: fastify.getSchema('schema:team:create:body'),
      response: {
        201: fastify.getSchema('schema:team')
      }
    },
    handler: async function (request, reply) {
      const { name } = request.body
      const teams = await prisma.team.create({
        data: {
          name
        }
      })
      reply.code(201).send(teams)
    }
  })

  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: {
      tags: ['team'],
      body: fastify.getSchema('schema:team:update:body'),
      response: {
        200: fastify.getSchema('schema:team')
      }
    },
    handler: async function (request, reply) {
      const { name } = request.body
      return await prisma.team.update({
        where: {
          id: parseInt(request.params.id)
        },
        data: {
          name
        }
      })
    }
  })

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: {
      tags: ['team'],
      response: {
        204: {
          type: 'null'
        }
      }
    },
    handler: async function (request, reply) {
      await prisma.team.delete({
        where: {
          id: parseInt(request.params.id)
        }
      })
      reply.code(204).send()
    }
  })
}
