import { useHits } from 'react-instantsearch'
import { useMobileNavSearchStore } from './search-store'
import { useMobileNavbarStore } from '../mobile-nav-store'
import useQueryStore from '../../store/search-store'
import { getSearchResultClientActionType, getSearchResults } from '../../lib/get-search-results'
import { HITS_PER_PAGE, resetStoreDirectionRight } from '../../config'
import './styles.css'

export default function CustomHits() {
  const searchQuery = useMobileNavSearchStore(state => state.searchQuery)
  const { items, sendEvent } = useHits()

  function handleClickHit(clickedHitValue, hit) {
    sendEvent('click', hit, 'Hit Clicked')
    fnFetchSearchData(clickedHitValue)
  }

  function handleURL(query) {
    const params = new URLSearchParams(window.location.search)
    const keyValueSet = 'query'
    params.set(keyValueSet, query)
    const stringParams = params.toString()
    const url = '/us/search?' + stringParams
    if (stringParams) {
      window.history.pushState(null, '', url)
    }
  }

  async function fnFetchSearchData(query) {
    const setMetadataStore = useQueryStore.getState().setMeta
    const addResultsStore = useQueryStore.getState().addResultsStore
    const facetFilters = useQueryStore.getState().facetFilters
    const data = await getSearchResults(getSearchResultClientActionType, 0, HITS_PER_PAGE, query, facetFilters)
    const resetStore = useMobileNavbarStore.getState().resetStore
    handleURL(query)

    if (data) {
      const { nbHits, query, page, nbPages, facets, facets_stats } = data
      const objMeta = { nbHits: nbHits, query: query, page: page, nbPages: nbPages, facets: facets, facets_stats: facets_stats }
      setMetadataStore(objMeta)
      addResultsStore(data)
      resetStore(resetStoreDirectionRight)
    }
  }

  return (
    <ol
      className='flex flex-col gap-4 px-10 my-8 overflow-y-auto scrollable'
    >
      {items.map((hit) => (
        <li
          key={hit.objectID}
          onClick={() => handleClickHit(hit.metadata.Name, hit)}
          onAuxClick={() => sendEvent('click', hit, 'Hit Clicked')}
          className='cursor-pointer'
        >
          <div style={{ wordBreak: 'break-all' }}>
            <h1
              dangerouslySetInnerHTML={{
                __html: hit._highlightResult.metadata.Name.value
                .replace(
                  /<\/?mark>/g, (tag) =>
                  tag === '<mark>' ? '<b>' : '</b>'
                )
              }}
              className='text-[15px]'
            />
          </div>
        </li>
      ))}
      {
        items.length !== 0 && searchQuery.trim() !== ''
          ?
          <li
            className='mt-2'
          >
            See all '{searchQuery}'
          </li>
          : null
      }
    </ol>
  )
}