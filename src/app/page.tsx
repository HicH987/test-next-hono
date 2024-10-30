import { CommentsList, CommentsListPrefetch, CommentsListSus } from '@/components/CommentsList'
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from 'react'


// async function fetchComments() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/comments')
//   if (!response.ok) throw new Error('Network response was not ok')
//   return response.json()
// }

export default async function Home() {
  // // Create a query client instance
  // const queryClient = new QueryClient()

  // // Prefetch all the queries
  // await queryClient.prefetchQuery({
  //   queryKey: ['comments'],
  //   queryFn: fetchComments,
  // })

  // // Dehydrate the cache to pass it as initial state
  // const dehydratedState = dehydrate(queryClient)

  return (
    <main className="space-y-10">
      {/* CommentsList Component */}
      <section className='space-y-2'>
        <h2 className='text-xl font-bold text-red-400'>Fetching with UserList</h2>
        <CommentsList />
      </section>

      {/* CommentsListSus Component */}
      <section className='space-y-2'>
        <h2 className='text-xl font-bold text-red-400'>Fetching with UserListSus</h2>
        <Suspense fallback={<p>Loading from Suspense...</p>}>
          <CommentsListSus />
        </Suspense>
      </section>

      {/* CommentsListPrefetch Component */}
      {/* <section className='space-y-2'>
        <h2 className='text-xl font-bold text-red-400'>Fetching with UserListPrefetch</h2>
        <HydrationBoundary state={dehydratedState}>
          <CommentsListPrefetch />
        </HydrationBoundary>
      </section> */}
    </main>
  )
}
