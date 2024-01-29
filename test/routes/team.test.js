import { test } from 'node:test'
import * as assert from 'node:assert'
import { build } from '../helper.js'

test('read all teams', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/team'
  })

  assert.equal(res.statusCode, 200)
  assert.equal(res.payload, '[{"id":1,"name":"A Team"},{"id":2,"name":"SuperTim"},{"id":3,"name":"Created from Postman"},{"id":4,"name":"Another Team Created from Postman"}]')
})
