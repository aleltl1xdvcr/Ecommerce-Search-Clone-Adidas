'use client'

import { create } from 'zustand'
import { resetStoreDirectionRight, resetStoreDirectionLeft } from '../config'

const transformStyles = {
  open: '0%',
  closeLeft: '-100%',
  closeRight: '100%'
}

export const useMobileNavbarStore = create((set, get) => ({
  currentLevel: null,
  dataKey: {
    prevIndexKey: null,
    key: null,
    data: null
  },
  setDataKey: (newDataKey, newKey, newPrevIndexKey, newCurrentLevel) =>
    set((state) => ({
      dataKey: {
        prevIndexKey: newPrevIndexKey,
        key: newKey,
        data: newDataKey,
      },
    })),
  dataKeyLevel1: {
    prevIndexKey: null,
    key: null,
    data: null
  },
  setDataKeyLevel1: (newDataKey, newKey, newPrevIndexKey, newCurrentLevel) =>
    set((state) => ({
      dataKeyLevel1: {
        prevIndexKey: newPrevIndexKey,
        key: newKey,
        data: newDataKey,
      },
    })),
  dataKeyLevel2: {
    prevIndexKey: null,
    key: null,
    data: null
  },
  setDataKeyLevel2: (newDataKey, newKey, newPrevIndexKey, newCurrentLevel) =>
    set((state) => ({
      dataKeyLevel2: {
        prevIndexKey: newPrevIndexKey,
        key: newKey,
        data: newDataKey,
      },
    })),
  isOpenWrapperLeftLevel0: transformStyles.closeLeft,
  setIsOpenWrapperLeftLevel0: (type) => {
    let value

    switch (type) {
      case 'both':
        value = get().isOpenWrapperLeftLevel0 === transformStyles.closeRight ? transformStyles.open : transformStyles.closeRight
        break
      case 'open':
        document.body.style.overflow = 'hidden'
        value = transformStyles.open
        break
      case 'close':
        document.body.style.overflow = ''
        value = transformStyles.closeRight
        break
      default:
        value = null
    }

    if (type === 'open') {
      set({ isOpenWrapperLeftLevel0: value, currentLevel: 0 })
    } else if (type === 'close') {
      set({ isOpenWrapperLeftLevel0: value, currentLevel: null })
    } else if (type === 'both') {
      const newCurrentLevel = get().isOpenWrapperLeftLevel0 === transformStyles.closeRight ? 1 : null
      set({ isOpenWrapperLeftLevel0: value, currentLevel: newCurrentLevel })
    }

  },
  isOpenWrapperLeftLevel1: transformStyles.closeRight,
  setIsOpenWrapperLeftLevel1: (type) => {
    let value

    switch (type) {
      case 'both':
        value = get().isOpenWrapperLeftLevel1 === transformStyles.closeRight ? transformStyles.open : transformStyles.closeRight
        break
      case 'open':
        value = transformStyles.open
        break
      case 'close':
        value = transformStyles.closeRight
        break
      default:
        value = null
    }

    if (type === 'open') {
      set({ isOpenWrapperLeftLevel1: value, currentLevel: 1 })
    } else if (type === 'close') {
      set({ isOpenWrapperLeftLevel1: value, currentLevel: 0 })
    } else if (type === 'both') {
      const newCurrentLevel = get().isOpenWrapperLeftLevel1 === transformStyles.closeRight ? 1 : 0
      set({ isOpenWrapperLeftLevel1: value, currentLevel: newCurrentLevel })
    }
  },
  isOpenWrapperLeftLevel2: transformStyles.closeRight,
  setIsOpenWrapperLeftLevel2: (type) => {
    let value

    switch (type) {
      case 'both':
        value = get().isOpenWrapperLeftLevel2 === transformStyles.closeRight ? transformStyles.open : transformStyles.closeRight
        break
      case 'open':
        value = transformStyles.open
        break
      case 'close':
        value = transformStyles.closeRight
        break
      default:
        value = null
    }

    if (type === 'open') {
      set({ isOpenWrapperLeftLevel2: value, currentLevel: 2 })
    } else if (type === 'close') {
      set({ isOpenWrapperLeftLevel2: value, currentLevel: 1 })
    } else if (type === 'both') {
      const newCurrentLevel = get().isOpenWrapperLeftLevel2 === transformStyles.closeRight ? 2 : 1
      set({ isOpenWrapperLeftLevel2: value, currentLevel: newCurrentLevel })
    }
  },
  isOpenWrapperLeftLevel3: transformStyles.closeRight,
  setIsOpenWrapperLeftLevel3: (type) => {
    let value

    switch (type) {
      case 'both':
        value = get().isOpenWrapperLeftLevel3 === transformStyles.closeRight ? transformStyles.open : transformStyles.closeRight
        break
      case 'open':
        value = transformStyles.open
        break
      case 'close':
        value = transformStyles.closeRight
        break
      default:
        value = null
    }

    if (type === 'open') {
      set({ isOpenWrapperLeftLevel3: value, currentLevel: 3 })
    } else if (type === 'close') {
      set({ isOpenWrapperLeftLevel3: value, currentLevel: 2 })
    } else if (type === 'both') {
      const newCurrentLevel = get().isOpenWrapperLeftLevel3 === transformStyles.closeRight ? 3 : 2
      set({ isOpenWrapperLeftLevel3: value, currentLevel: newCurrentLevel })
    }
  },
  isOpenSearchWrapperRightLevel0: transformStyles.closeRight,
  setIsOpenSearchWrapperRightLevel0: (type) => {
    let value

    switch (type) {
      case 'open':
        document.body.style.overflow = 'hidden'
        value = transformStyles.open
        break
      case 'close':
        document.body.style.overflow = ''
        value = transformStyles.closeRight
        break
      default:
        value = null
    }

    set({ isOpenSearchWrapperRightLevel0: value })
  },
  resetStore: (type) => {
    if (type === resetStoreDirectionRight) {
      get().setIsOpenSearchWrapperRightLevel0('close')
    } else if (type === resetStoreDirectionLeft) {
      document.body.style.overflow = ''
      set(() => ({
        currentLevel: null,
        dataKey: {
          prevIndexKey: null,
          key: null,
          data: null
        },
        dataKeyLevel1: {
          prevIndexKey: null,
          key: null,
          data: null
        },
        dataKeyLevel2: {
          prevIndexKey: null,
          key: null,
          data: null
        },
        isOpenWrapperLeftLevel0: transformStyles.closeLeft,
        isOpenWrapperLeftLevel1: transformStyles.closeLeft,
        isOpenWrapperLeftLevel2: transformStyles.closeLeft,
        isOpenWrapperLeftLevel3: transformStyles.closeLeft,
      }))
    }
  }

}))
