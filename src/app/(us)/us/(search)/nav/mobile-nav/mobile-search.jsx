'use client'

import { useCallback, useRef, useState } from 'react'
import { useInstantSearch, useSearchBox } from 'react-instantsearch'
import { useMobileNavSearchStore } from './search-store'
import useQueryStore from '../../store/search-store'
import { useMobileNavbarStore } from '../mobile-nav-store'
import { getSearchResultClientActionType, getSearchResults } from '../../lib/get-search-results'
import { HITS_PER_PAGE, resetStoreDirectionRight } from '../../config'
import qs from 'qs'
import { removeEmptyOrNull, toUrlFormat } from '../client'

export default function MobileSearch() {
  const setSearchQuery = useMobileNavSearchStore(state => state.setSearchQuery)
  const setMetadataStore = useQueryStore(state => state.setMeta)
  const addResultsStore = useQueryStore(state => state.addResultsStore)

  const queryHook = useCallback((query, search) => {
    search(query)
  }, [])

  const {
    query,
    refine,
    clear,
  } = useSearchBox({
    queryHook
  })

  const { status } = useInstantSearch()
  const [inputValue, setInputValue] = useState(query)
  const inputRef = useRef(null)

  const isSearchStalled = status === 'stalled'

  function setQuery(newQuery) {
    setInputValue(newQuery)
    setSearchQuery(newQuery)
    refine(newQuery)
  }

  function fnResetInput() {
    clear()
    setInputValue('')
  }

  function handleURL() {
    const queryParams = useQueryStore.getState().queryParams
    queryParams.query = toUrlFormat(query)
    const queryString = qs.stringify(removeEmptyOrNull(queryParams), {
      encode: false,
      addQueryPrefix: true,
      arrayFormat: 'repeat',
    })

    if (queryString) {
      window.history.pushState(null, '', queryString)
    }
  }

  async function fnSubmitSearchData() {
    const facetFilters = useQueryStore.getState().facetFilters
    const data = await getSearchResults(getSearchResultClientActionType, 0, HITS_PER_PAGE, query, facetFilters)
    const resetStore = useMobileNavbarStore.getState().resetStore

    handleURL()

    if (data) {
      const { nbHits, query, page, nbPages, facets, facets_stats } = data
      const objMeta = { nbHits: nbHits, query: query, page: page, nbPages: nbPages, facets: facets, facets_stats: facets_stats }
      setMetadataStore(objMeta)
      addResultsStore(data)
      resetStore(resetStoreDirectionRight)
    }
  }

  return (
    <div
      className='w-full'
    >
      <form
        className='w-full flex flex-row items-center h-full'
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          event.stopPropagation()

          if (inputRef.current) {
            inputRef.current.blur()
          }
        }}
        onReset={(event) => {
          event.preventDefault()
          event.stopPropagation()

          setQuery('')

          if (inputRef.current) {
            inputRef.current.focus()
          }
        }}
      >
        <label
          className='w-full'
          htmlFor='input-mobile-search'>
          <input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                fnSubmitSearchData()
              }
            }}
            id='input-mobile-search'
            className='w-full outline-none'
            ref={inputRef}
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            placeholder='Search'
            spellCheck={false}
            maxLength={512}
            value={inputValue}
            onChange={(event) => {
              setQuery(event.currentTarget.value)
            }}
            autoFocus
          />
        </label>
        <button
          onClick={() => fnResetInput()}
          className='text-[15px] text-neutral-400'
          hidden={inputValue.length === 0 || isSearchStalled}
        >
          Clear
        </button>
        <span
          className='text-[15px] text-neutral-400'
          hidden={!isSearchStalled}>Searching…</span>
      </form>
    </div>
  )

}