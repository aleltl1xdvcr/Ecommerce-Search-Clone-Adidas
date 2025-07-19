'use client'

import { create } from 'zustand'

export const useStoreCarousel = create((set, get) => ({
  slidingModalData: [],
  setSlidingModalData: (data) => set({ slidingModalData: data }),
  slidingModalInstanceActive: null,
  setSlidingModalInstanceActive: (instanceId) => set({ slidingModalInstanceActive: instanceId }),
  lenis: null,
  setLenis: (lenisInstance) => set({ lenis: lenisInstance }),
  })
)
