'use client'

import { create } from 'zustand'

export const useModalFiltersStore = create((set, get) => ({
  filterTabs: {},
  toggleFilterTab: (key) => 
    set((state) => ({
      filterTabs: {
        ...state.filterTabs,
        [key]: !state.filterTabs[key],
      },
    })), 
}))
