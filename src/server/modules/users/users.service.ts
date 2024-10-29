import { CreateUserDTO, User } from '@/types/user.type'

const users: User[] = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Doe' },
  { id: '3', name: 'Alice' },
  { id: '4', name: 'Bob' },
]

export const getUsers = async (): Promise<User[]> => {
  return users
}

export const createUser = async (user: CreateUserDTO): Promise<User> => {
  const newUser: User = { id: Math.random().toString(36).substring(2, 11), ...user }
  users.push(newUser)
  return newUser
}
