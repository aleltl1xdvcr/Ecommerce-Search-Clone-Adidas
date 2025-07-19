'use client'

import { create } from 'zustand'

export const useMobileNavSearchStore = create((set, get) => ({
  searchQuery: '',
  setSearchQuery: (newQuery) => set(() => ({ searchQuery: newQuery })),
}))
