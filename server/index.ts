import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { z } from 'zod'
import type { User } from './db'
import { db } from './db'
import { publicProcedure, router } from './trpc'

const appRouter = router({
  userList: publicProcedure.query(async () => {
    const users = await db.user.findMany()
    return users
  }),
  userById: publicProcedure.input(z.string()).query(async ({ input }: { input: string }) => {
    const user = await db.user.findById(input)
    return user
  }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }: { input: Pick<User, 'name'> }) => {
      const user = await db.user.create(input)
      return user
    }),
})

export type AppRouter = typeof appRouter

const server = createHTTPServer({
  router: appRouter,
})
server.listen(3000)
