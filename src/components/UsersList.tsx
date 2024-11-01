'use client'

import { createNewUser, fetchAllUsers, fetchPostById, deleteUserById, fetchUserById } from '@/server-call/users.call'
import { CreateUserDTO, User } from '@/types/user.type'
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult, useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function UserList() {
  // /users -> ["users"]
  // /users/{id} -> ["users", userId]
  // /users?postId={postId} -> ["users", {postId}]
  // /users/{id}/posts -> ["users", userId, "posts"]
  // /users/{id}/posts/{postId} -> ["users", userId, "posts", postId]

  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
  })
  const queryClient = useQueryClient()
  const { mutate: addingUser, isPending: isAddingUser }: UseMutationResult<User, Error, CreateUserDTO> = useMutation({
    mutationFn: createNewUser,
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
      queryClient.setQueryData<User[]>(['users'], (oldData) => {
        return oldData ? [...oldData, newUser] : [newUser]
      })
    },
  })
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null)

  const { mutate: deleteUser, isPending: isDeletingUser }: UseMutationResult<User, Error, number> = useMutation({
    mutationFn: deleteUserById,

    onMutate: (userId: number) => {
      setDeletingUserId(userId)
    },

    onSuccess: (deletedUser) => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
      queryClient.setQueryData<User[]>(['users'], (oldUsers) => {
        // Return a new array without the deleted user
        return oldUsers ? oldUsers.filter((user) => user.id !== deletedUser.id) : []
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

export function Post({ postId }: { postId: number }) {
  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
  })

  const userQuery = useQuery({
    queryKey: ['user', postQuery.data?.userId],
    queryFn: () => fetchUserById(postQuery.data!.userId),
    enabled: !!postQuery.data?.userId,
  })

  if (postQuery.isLoading) return <p>Loading...</p>
  if (postQuery.error) return <p>Error: {postQuery.error.message}</p>
  return (
    <div>
      <h2>
        <b className="font-bold">title:</b> {postQuery.data?.title}
      </h2>
      <p>
        <b className="font-bold">user:</b> {userQuery.data?.name}
      </p>
    </div>
  )
}
