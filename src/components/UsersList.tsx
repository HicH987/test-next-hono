'use client'

import { addUser, fetchUsers, removeUser } from '@/server-call/users.call'
import { CreateUserDTO, User } from '@/types/user.type'
import { useMutation, UseMutationResult, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
  const queryClient = useQueryClient()
  const { mutate: addingUser, isPending: isAddingUser }: UseMutationResult<User, Error, CreateUserDTO> = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
    },
  })
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null)

  const { mutate: deleteUser, isPending: isDeletingUser }: UseMutationResult<User, Error, number> = useMutation({
    mutationFn: removeUser,

    onMutate: (userId: number) => {
      setDeletingUserId(userId)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
      setDeletingUserId(null)
    },

    onError: () => {
      setDeletingUserId(null)
    },
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <div className="space-y-3">
      <ul className="w-[20%] space-y-2">
        {data?.map((user) => (
          <li key={user.id} className="flex justify-between">
            <span>{user.name}</span>

            <b
              className="cursor-pointer font-bold text-md hover:text-red-500 transition-colors"
              onClick={() => deleteUser(user.id)}
            >
              {isDeletingUser && user.id === deletingUserId ? 'Deleting...' : 'X'}
            </b>
          </li>
        ))}
      </ul>
      <button className="py-2 px-3 border bg-red-400 rounded-lg" onClick={() => addingUser({ name: 'ahmed USMA' })}>
        {isAddingUser ? 'Adding User...' : 'Add User'}
      </button>
    </div>
  )
}

export function UserListSus() {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
  const queryClient = useQueryClient()
  const { mutate: addingUser, isPending: isAddingUser }: UseMutationResult<User, Error, CreateUserDTO> = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
    },
  })

  const [deletingUserId, setDeletingUserId] = useState<number | null>(null)

  const { mutate: deleteUser, isPending: isDeletingUser }: UseMutationResult<User, Error, number> = useMutation({
    mutationFn: removeUser,

    onMutate: (userId: number) => {
      setDeletingUserId(userId)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
      setDeletingUserId(null)
    },

    onError: () => {
      setDeletingUserId(null)
    },
  })

  if (!isFetching && error) return <p>Error: {error.message}</p>

  return (
    <div className="space-y-3">
      <ul className="w-[20%] space-y-2">
        {data?.map((user) => (
          <li key={user.id} className="flex justify-between">
            <span>{user.name}</span>

            <b
              className="cursor-pointer font-bold text-md hover:text-red-500 transition-colors"
              onClick={() => deleteUser(user.id)}
            >
              {isDeletingUser && user.id === deletingUserId ? 'Deleting...' : 'X'}
            </b>
          </li>
        ))}
      </ul>
      <button className="py-2 px-3 border bg-red-400 rounded-lg" onClick={() => addingUser({ name: 'ahmed USMA' })}>
        {isAddingUser ? 'Adding User...' : 'Add User'}
      </button>
    </div>
  )
}
