import { test } from 'node:test'
import * as assert from 'node:assert'
import { build } from '../helper.js'

test('read all teams', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/team'
  })

  assert.equal(res.statusCode, 200)
  const data = JSON.parse(res.payload)
  assert.ok(data.length > 0)
})

test('read team by id', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/team/1'
  })

  assert.equal(res.statusCode, 200)
  const data = JSON.parse(res.payload)
  assert.equal(data.name, 'Test Team 1')
})

test('create team', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'POST',
    url: '/team',
    payload: {
      name: 'Test Team 3'
    }
  })

  assert.equal(res.statusCode, 201)
  const data = JSON.parse(res.payload)
  assert.ok(data.id > 0)
  assert.equal(data.name, 'Test Team 3')
})

test('update team', async (t) => {
  const app = await build(t)

  const resInsert = await app.inject({
    method: 'POST',
    url: '/team',
    payload: {
      name: 'Team to Update'
    }
  })

  const inserted = JSON.parse(resInsert.payload)

  const resUpdate = await app.inject({
    method: 'PUT',
    url: `/team/${inserted.id}`,
    payload: {
      name: 'Updated Team'
    }
  })

  assert.equal(resUpdate.statusCode, 200)
  const updated = JSON.parse(resUpdate.payload)
  assert.equal(updated.name, 'Updated Team')
})

test('delete team', async (t) => {
  const app = await build(t)

  const resInsert = await app.inject({
    method: 'POST',
    url: '/team',
    payload: {
      name: 'Team to Delete'
    }
  })

  const inserted = JSON.parse(resInsert.payload)

  const resDelete = await app.inject({
    method: 'DELETE',
    url: `/team/${inserted.id}`
  })

  assert.equal(resDelete.statusCode, 204)
})
