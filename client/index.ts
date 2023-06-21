import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../server'
import './polyfill'

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000'
    })
  ]
})

async function main() {
  /**
   * Inferring types
   */
  const users = await trpc.userList.query()
  //    ^?
  console.log('Users:', users)

  const createdUser = await trpc.userCreate.mutate({ name: 'bobby' })
  //    ^?
  console.log('Created user:', createdUser)

  const user1 = await trpc.userById.query('1')
  //    ^?
  console.log('Query User 1:', user1)

  const newUsers = await trpc.userDelete.mutate('2')
  //    ^?
  console.log('Delete User 2:', newUsers)
}

main().catch(console.error)
