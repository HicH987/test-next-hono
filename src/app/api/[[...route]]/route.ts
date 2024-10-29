import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import usersRoutes from '@/server/modules/users/users.routes'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!'
  })
})

app.route('/users', usersRoutes);



export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)