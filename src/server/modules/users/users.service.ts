import { db } from '@/db/db'
import { usersTable } from '@/db/schema'
import { CreateUserDTO, User } from '@/types/user.type'
import { eq } from 'drizzle-orm'

export const getUsers = async (): Promise<User[]> => {
  const users = await db.select().from(usersTable)
  return users
}
export const createUser = async (user: CreateUserDTO): Promise<User> => {
  const result = await db
    .insert(usersTable)
    .values({
      name: user.name,
    })
    .returning()
  return result[0]
}

export const deleteUser = async (id: number): Promise<User> => {
  console.log('id', id)
  const result = await db.delete(usersTable).where(eq(usersTable.id, id)).returning()
  return result[0]
}
