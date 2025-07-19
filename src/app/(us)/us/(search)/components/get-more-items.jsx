import { useEffect } from 'react'
import { HITS_PER_PAGE } from '../config'
import { getSearchResults } from '../lib/get-search-results'
import useQueryStore from '../store/search-store'

export default function GetMoreItems() {
  const addResultsStore = useQueryStore(state => state.addResultsStore)
  const setMetadataStore = useQueryStore(state => state.setMeta)
  const meta = useQueryStore(state => state.meta)
  const facetFilters = useQueryStore(state => state.facetFilters)

  useEffect(() => {
    console.log('FF EFFECT', facetFilters)
  }, [facetFilters])

  function handleURL(page) {
    const params = new URLSearchParams()
    params.set('page', page + 1)
    const query = new URLSearchParams().toString()
    const url = query ? `/us/search?${query}&page=${params}` : `/us/search?${params}`

    window.history.pushState(null, '', url)
  }

  async function fnFetchSearchData(type) {
    const facetFilters = useQueryStore.getState().facetFilters
    if (type === 'prev') {
      const page = meta?.page > 0 ? Math.abs(meta?.page - 1) : 0
      const query = meta?.query || ''
      const data = await getSearchResults('client', page, HITS_PER_PAGE, query, facetFilters)
      if (data) {
        handleURL(page)
        addResultsStore(data)
        const { nbHits, query, page: pageApi, nbPages, facets } = data
        const objMeta = { nbHits: nbHits, query: query, page: pageApi, nbPages: nbPages, facets: facets }
        setMetadataStore(objMeta)
        window.scrollTo({
          top: 0,
        })
      }
    } else if (type === 'next') {
      const page = Math.abs(meta?.page + 1) || 0
      const query = meta?.query || ''
      const data = await getSearchResults('client', page, HITS_PER_PAGE, query, facetFilters)

      if (data) {
        handleURL(page)
        addResultsStore(data)
        const { nbHits, query, page: pageApi, nbPages, facets } = data
        const objMeta = { nbHits: nbHits, query: query, page: pageApi, nbPages: nbPages, facets: facets }
        setMetadataStore(objMeta)
        window.scrollTo({
          top: 0,
        })
      }
    }
  }

  useEffect(() => {
    console.log('meta.page', meta.page)
  }, [meta.page])

  return (
  <>
      {

        meta?.nbPages > 1 ?

        <div
          className='flex flex-row w-full items-center justify-between my-10 relative'
        >

          <button
            onClick={() => fnFetchSearchData('prev')}
            className={`${meta?.page === 0 ? 'opacity-0 pointer-events-none' : null} px-10 py-2 text-[17px] font-bold uppercase bg-black text-white hover:text-neutral-500`}
          >
            prev
          </button>

          <span>
            Page: {meta?.page + 1} of {meta?.nbPages}
          </span>

          <div
            className='absolute w-full flex justify-center items-end h-full pointer-events-none'
          >
            <div
              className='relative border border-gray-400'
              style={{
                width: `30%`,
                maxWidth: '100%'

              }}
            >
              <div
                className='bg-black border border-black absolute translate-[-1px] left-0'
                style={{
                  width: `${((meta?.page + 1) / meta?.nbPages) * 100}%`,
                }}
              />
            </div>
          </div>


          <button
            onClick={() => fnFetchSearchData('next')}
            className={`${meta?.page + 1 === meta?.nbPages ? 'opacity-0 pointer-events-none' : null} px-10 py-2 text-[17px] font-bold uppercase hover:text-neutral-500 bg-black  text-white`}
          >
            Next
          </button>
        </div>

        : null
      }
  </>

  )
}