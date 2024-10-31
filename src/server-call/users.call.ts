import { getApiUrl } from '@/lib/utils'
import { User, CreateUserDTO } from '@/types/user.type'

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(getApiUrl('/api/users'))
  if (!response.ok) throw new Error('Network response was not ok')
  const data = await response.json()
  return data
}

export async function addUser(newUser: CreateUserDTO): Promise<User> {
  const response = await fetch(getApiUrl('/api/users'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN_SECRET}`,
    },
    body: JSON.stringify(newUser),
  })
  if (!response.ok) throw new Error('Network response was not ok')
  const data = await response.json()
  return data
}

export async function removeUser(id: number): Promise<User> {
  const response = await fetch(getApiUrl(`/api/users/${id}`), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN_SECRET}`,
    },
  })

  if (!response.ok) throw new Error('Network response was not ok')
  const data = await response.json()
  return data
}
