import { UserList, UserListSus } from '@/components/UsersList'
import { Suspense } from 'react'

export default async function Test() {

  return (
    <main className="space-y-10">
      {/* UsersList Component */}
      <section className='space-y-2'>
        <h2 className='text-xl font-bold text-red-400'>Fetching with UserList</h2>
        <UserList />
      </section>

      {/* UserListSus Component */}
      {/* <section className='space-y-2'>
        <h2 className='text-xl font-bold text-red-400'>Fetching with UserListSus</h2>
        <Suspense fallback={<p>Loading from Suspense...</p>}>
          <UserListSus />
        </Suspense>
      </section> */}


    </main>
  )
}
