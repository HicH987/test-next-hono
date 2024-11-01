import { Hono } from 'hono'
import { getAllUsers, addNewUser, getUserById, deleteUserById } from '@/server/modules/users/users.controller'
import { authMiddleware } from '@/server/middleware/auth.middleware'

const usersRoutes = new Hono()

usersRoutes.get('/', getAllUsers)
usersRoutes.post('/', authMiddleware, addNewUser)

usersRoutes.get('/:id', getUserById)
usersRoutes.delete('/:id', authMiddleware, deleteUserById)

export default usersRoutes
