import { Context } from 'hono'
import { getUsers, createUser, deleteUser } from '@/server/modules/users/users.service'
import { CreateUserDTO } from '@/types/user.type'

export const getAllUsers = async (c: Context): Promise<Response> => {
  const users = await getUsers()
  return c.json(users, 200)
}

export const addUser = async (c: Context): Promise<Response> => {
  const user: CreateUserDTO = await c.req.json()
  const newUser = await createUser(user)
  return c.json(newUser, 201)
}

export const removeUser = async (c: Context): Promise<Response> => {
  const { id } = c.req.param()
  const user = await deleteUser(Number(id))
  return c.json(user, 200)
}
