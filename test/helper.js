import helper from 'fastify-cli/helper.js'
import path from 'path'
import { fileURLToPath } from 'url'
import Dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const AppPath = path.join(__dirname, '..', 'app.js')

Dotenv.config({
  path: path.join(__dirname, '..', '.env.test')
})

function config () {
  return {}
}

async function build (t) {
  const argv = [AppPath]
  const app = await helper.build(argv, config())

  t.after(() => app.close())

  return app
}

export {
  config,
  build
}
