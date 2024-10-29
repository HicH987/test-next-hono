import { Hono } from 'hono';
import { getAllUsers, addUser } from '@/server/modules/users/users.controller';
import { authMiddleware } from '@/server/middleware/auth.middleware';

const usersRoutes = new Hono();

usersRoutes.get('/', getAllUsers);
usersRoutes.post('/', authMiddleware, addUser);

export default usersRoutes;