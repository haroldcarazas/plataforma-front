import { create } from 'zustand'

export const userStore = create((set) => ({
  user: {},
  updateUser: (newUser) => set({ user: newUser }),
}))