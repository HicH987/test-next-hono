'use client'

import { addUser, fetchUsers } from '@/server-call/users.call'
import { CreateUserDTO, User } from '@/types/user.type'
import { useMutation, UseMutationResult, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

export function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
  const queryClient = useQueryClient();
  const {
    mutate: addingUser,
    isPending: isAddingUser,
    error: addingError,
  }: UseMutationResult<User, Error, CreateUserDTO> = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  }
)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="space-y-3">
      <ul>
        {data?.map((user) => (
          <li key={user.id}>{user.name}</li>
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
  const queryClient = useQueryClient();
  const {
    mutate: addingUser,
    isPending: isAddingUser,
    error: addingError,
  }: UseMutationResult<User, Error, CreateUserDTO> = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  }
)

  if (!isFetching && error) return <p>Error: {error.message}</p>

  return (
    <div className="space-y-3">
      <ul>
        {data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button className="py-2 px-3 border bg-red-400 rounded-lg" onClick={() => addingUser({ name: 'Moh MCA' })}>
        {isAddingUser ? 'Adding User...' : 'Add User'}
      </button>
    </div>
  )
}
