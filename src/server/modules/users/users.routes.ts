import { Hono } from 'hono'
import { getAllUsers, addUser, removeUser } from '@/server/modules/users/users.controller'
import { authMiddleware } from '@/server/middleware/auth.middleware'

const usersRoutes = new Hono()

usersRoutes.get('/', getAllUsers)
usersRoutes.post('/', authMiddleware, addUser)
usersRoutes.delete('/:id', authMiddleware, removeUser)

export default usersRoutes
