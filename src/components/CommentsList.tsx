'use client'

import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }

async function fetchComments(): Promise<Comment[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments')
  if (!response.ok) throw new Error('Network response was not ok')

  return await response.json()
}

export function CommentsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['comments'],
    queryFn: fetchComments,
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {data?.slice(0,5).map((comment) => (
        <li key={comment.id}>{comment.email}</li>
      ))}
    </ul>
  )
}
export function CommentsListSus() {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ['comments'],
    queryFn: fetchComments,
  })
  if (!isFetching && error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {data?.slice(0,5).map((comment) => (
        <li key={comment.id}>{comment.email}</li>
      ))}
    </ul>
  )
}