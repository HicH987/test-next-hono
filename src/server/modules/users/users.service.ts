import { db } from '@/db/db'
import { usersTable } from '@/db/schema'
import { CreateUserDTO, User } from '@/types/user.type'
import { eq } from 'drizzle-orm'

// Fetch a list of all users
export const retrieveAllUsers = async (): Promise<User[]> => {
  const users = await db.select().from(usersTable)
  return users
}

// Create a new user entry in the database
export const insertNewUser = async (user: CreateUserDTO): Promise<User> => {
  const result = await db
    .insert(usersTable)
    .values({
      name: user.name,
    })
    .returning()
  return result[0]
}

// Fetch a specific user by their ID
export const findUserById = async (id: number): Promise<User> => {
  const user = await db.select().from(usersTable).where(eq(usersTable.id, id))
  return user[0]
}

// Delete a user by their ID
export const removeUserById = async (id: number): Promise<User> => {
  console.log('id', id)
  const result = await db.delete(usersTable).where(eq(usersTable.id, id)).returning()
  return result[0]
}
