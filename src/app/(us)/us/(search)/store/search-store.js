'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { set, get, del } from 'idb-keyval'
import { manageStore } from './manage-store'

export const updateStoreMethodInternal = "internal"
export const updateStoreMethodUrl = "url"

const zustandIDBPersist = {
  getItem: async (name) => {
    const value = await get(name)
    return value ?? null
  },
  setItem: async (name, value) => {
    await set(name, value)
  },
  removeItem: async (name) => {
    await del(name)
  },
}

function convqp(t) {
  if (t === 'PRICE (LOW - HIGH)') {
    return 'price-low-high'
  }
  if (t === 'NEWEST') {
    return 'newest'
  }
  else if (t === 'PRICE(HIGH - LOW)') {
    return 'price-high-low'
  } else return t

}

export const queryParamsObj = {
  query: '',
  Category: '',
  Collection: '',
  Features: [],
  Gender: '',
  Material: [],
  Price: '',
  Activity: [],
  Brand: '',
  ProductType: '',
  Sport: '',
  Color: [],
}

const useQueryStore = create(
  persist(
    (set, get) => ({
      currentUpdateStoreMethod: 'url',
      setCurrentUpdateStoreMethod: (value) =>
        set({ currentUpdateStoreMethod: value }),
      enableApiQueries: false,
      setEnableApiQueries: (booleanValue) => set({
        enableApiQueries: booleanValue
      }),
      RESULTS: [],
      requestId: 0,
      hasHydrated: false,
      setStoreQuery: (data, id) =>
        set((state) => {
          return {
            RESULTS: data,
            requestId: id,
          }
        }),
      scrollableSt: null,
      setScrollableSt: (st) => set({ scrollableSt: st }),
      meta: { nbHits: null, query: '', page: 0, nbPages: null },
      setMeta: (metadata) => set({ meta: metadata }),
      queryValueClient: '',
      setQueryValueClient: (newValue) => set({ queryValueClient: newValue }),
      queryParams: queryParamsObj,
      updateQueryFilters: (updates) => {
        const serializeToQueryParamsEntireUpdateObj = get().serializeToQueryParamsEntireUpdateObj
        const currentUpdateStoreMethod = get().currentUpdateStoreMethod
        if (currentUpdateStoreMethod === 'url') {
          serializeToQueryParamsEntireUpdateObj()
        }
        get().setCurrentUpdateStoreMethod(updateStoreMethodInternal)
        const current = get().queryParams
        const newQueryParams = { ...current }

        for (const [key, { action, values }] of Object.entries(updates)) {
          const currentArray = current[key] || []

          if (!Array.isArray(values)) {
            if (action === 'add') {
              newQueryParams[key] = convqp(values)
            } else if (action === 'remove') {
              newQueryParams[key] = null
            }

            set({ queryParams: newQueryParams })

            continue
          }

          if (action === 'add') {
            const merged = [...new Set([...currentArray, ...values])]
            newQueryParams[key] = merged
          }

          if (action === 'remove') {
            const filtered = currentArray.filter((v) => !values.includes(v))
            newQueryParams[key] = filtered
          }
        }

        set({ queryParams: newQueryParams })
      },
      setEntireQueryParams: (entireState) => {
        set({ queryParams: entireState })
      },
      serializeToQueryParamsEntireUpdateObj() {
        const setEntireQueryParams = get().setEntireQueryParams
        const facetFilters = get().facetFilters
        const queryParamsObjCopy = { ...queryParamsObj }
        if (facetFilters.length !== 0) {
          facetFilters.forEach((i, index) => {
            const regex = /\.(\w+):(.+)/;
            const m = facetFilters[index].match(regex)
            const a = m[1]
            const b = m[2]

            queryParamsObjCopy[a] = b
          })
        }

        setEntireQueryParams(queryParamsObjCopy)
      },
      resetQueryParams: () => set({ queryParams: queryParamsObj }),
      facetFilters: [],
      setEntireFacetFilters: (entireState) => {
        set({ facetFilters: entireState })
      },
      addFacetFilter: (newItem) =>
        set((state) => ({
          facetFilters: state.facetFilters.includes(newItem)
            ? state.facetFilters
            : [...state.facetFilters, newItem],
        })),
      customRanking: null,
      setCustomRanking: (ranking) => set({ customRanking: ranking }),
      deleteFacetFilter: (key) =>
        set((state) => ({
          facetFilters: state.facetFilters.filter((item) => item !== key),
        })),
      clearAllFacetFilters: () => set({ facetFilters: [] }),
      addResultsStore: (data) =>
        set((state) => {
          return {
            RESULTS: {
              ...state.RESULTS,
              hits: data,
            },
          }
        }),
    }),
    {
      name: 'query-store',
      storage: zustandIDBPersist,
      partialize: (state) => ({
        RESULTS: state?.RESULTS,
        meta: state.meta,
        facetFilters: state.facetFilters,
        customRanking: state.customRanking,
        requestId: state?.requestId,
      }),
      merge: (persisted, current) => {
        const a = localStorage.getItem('state_query_search')
        const b = manageStore('get', 'has_passed_first_time_current_flag')
        manageStore('set', 'state_merge', 'current')
        const c = manageStore('get', 'state_merge')

        if (a?.trim() === '' && b === false) {
          manageStore('set', 'has_passed_first_time_current_flag', true)
          manageStore('set', 'state_merge', 'current')
          return { ...current }
        } else if (a?.trim() !== '' && b === true) {
          manageStore('set', 'state_merge', 'persisted')
          return { ...persisted }
        }

        return c === 'current'
          ? { ...current }
          : c === 'persisted'
            ? { ...persisted }
            : undefined
      }
    }
  )
)

export default useQueryStore
