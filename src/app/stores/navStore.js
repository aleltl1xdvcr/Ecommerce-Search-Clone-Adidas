
'use client'

import { create } from 'zustand'

export const useNavStore = create((set, get) => ({
  navData: [],
  setNavData: (data) => set({ data: data }),
  dataActive: null,
  setDataActive: (data) => ({ dataActive: data }),
  sectionNames: null,
  setSectionNames: (data) => set({ sectionNames: data }),
  sectionNamesData: null,
  setSectionNamesData: (data) => set({ sectionNamesData: data }),
  sectionsModalMenu: null,
  setSectionsModalMenu: (data) => set({ sectionsModalMenu: data }),
  })
)
