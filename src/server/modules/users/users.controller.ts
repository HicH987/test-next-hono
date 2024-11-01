import { Context } from 'hono'
import { retrieveAllUsers, insertNewUser, findUserById, removeUserById } from '@/server/modules/users/users.service';import { CreateUserDTO } from '@/types/user.type'

export const getAllUsers = async (c: Context): Promise<Response> => {
  const users = await retrieveAllUsers()
  return c.json(users, 200)
}

export const addNewUser = async (c: Context): Promise<Response> => {
  const user: CreateUserDTO = await c.req.json()
  const newUser = await insertNewUser(user)
  return c.json(newUser, 201)
}

export const getUserById = async (c: Context): Promise<Response> => {
  const { id } = c.req.param()
  const user = await findUserById(Number(id))
  return c.json(user, 200)
}

export const deleteUserById = async (c: Context): Promise<Response> => {
  const { id } = c.req.param()
  const user = await removeUserById(Number(id))
  return c.json(user, 200)
}
