import fp from 'fastify-plugin'
import TeamSchema from '../schemas/TeamSchema.json' assert { type: "json" }
import CreateTeamSchemaBody from '../schemas/CreateTeamSchemaBody.json' assert { type: "json" }
import UpdateTeamSchemaBody from '../schemas/UpdateTeamSchemaBody.json' assert { type: "json" }
import ListTeamSchemaResponse from '../schemas/ListTeamSchemaResponse.json' assert { type: "json" }

export default fp(async (fastify) => {
  fastify.addSchema(TeamSchema)
  fastify.addSchema(CreateTeamSchemaBody)  
  fastify.addSchema(UpdateTeamSchemaBody)
  fastify.addSchema(ListTeamSchemaResponse)
})