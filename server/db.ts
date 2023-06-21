export interface User {
  id: string
  name: string
}

// Imaginary database
let users: User[] = [
  { id: '1', name: '黎明' },
  { id: '2', name: '刘德华' },
  { id: '3', name: '张学友' },
  { id: '4', name: '郭富城' }
]

export const db = {
  user: {
    findMany: async () => users,
    findById: async (id: string) => users.find((user) => user.id === id),
    create: async (data: { name: string }) => {
      const user = { id: String(users.length + 1), ...data }
      users.push(user)
      return user
    },
    deleteById: async (id: string) => {
      const reslut = users.filter((user) => user.id !== id)
      users = [...reslut]
      return users
    }
  }
}
