import qs from 'qs'
import { getSearchResults, ssr_internal_method } from '../lib/get-search-results';
import Client from './client';
import { getHasSsrInternalMethodExecutedFlag, setHasSsrInternalMethodExecutedFlag } from '../lib/redis';
import { HITS_PER_PAGE } from '../config';

export const dynamic = 'force-static' 

export default async function Page({ searchParams: searchParamsInstance }) {
  let facetFilters
  let data

  function getQuery(params) {
    const searchParams = new URLSearchParams(params)
    const q = searchParams.get('query')
    return q || ''
  }

  function getFacetFilters(params) {
    const searchParams = new URLSearchParams(params)
    searchParams.delete('page')
    searchParams.delete('query')
    const stringSearchParams = searchParams.toString()
    const metadataPrefix = 'metadata.'
    const options = {
      decoder: (str, defaultEncoder, charset, type) => {
        if (typeof str === 'string' && str.length > 0 && type === 'key') {
          const newStr = metadataPrefix + str.charAt(0).toUpperCase() + str.slice(1)

          return defaultEncoder(newStr, defaultEncoder, charset, type)
        } else if (typeof str === 'string' && str.length > 0 && type === 'value') {
          const newStr = str.charAt(0).toUpperCase() + str.slice(1)

          return defaultEncoder(newStr, defaultEncoder, charset, type)
        }

        return str
      },
      encode: false,
      addQueryPrefix: false,
      arrayFormat: 'repeat',
      skipNulls: true,
    }

    let arr = []

    const queryParsed = qs.parse(stringSearchParams, options)

    for (const [key, value] of Object.entries(queryParsed)) {
      const item = key + ':' + value
      arr.push(item)
    }

    return arr
  }

  function getPage(usp) {
    const key = 'page'
    const regex = new RegExp(`${key}=([^;]+)`)
    const match = usp.match(regex)
    const page = match?.[1] ? match?.[1] - 1 : 0

    return page
  }

  const hasSsrInternalMethodExecutedFlag = getHasSsrInternalMethodExecutedFlag()

  async function handleFetch(usp) {
    const query = getQuery(usp)
    facetFilters = getFacetFilters(usp)
    const page = getPage(usp)

    console.log('FF', facetFilters, 'p', page)

    return await getSearchResults(ssr_internal_method, page, HITS_PER_PAGE, query, facetFilters, null)
  }

  async function handleSubmit() {
    return await searchParamsInstance
      .then(searchParams => {
        setHasSsrInternalMethodExecutedFlag(ssr_internal_method)
        const instance = new URLSearchParams(searchParams)
        const instanceString = instance.toString()
        const response = handleFetch(instanceString)

        return response
      })
  }

  if (hasSsrInternalMethodExecutedFlag !== ssr_internal_method) {
    data = await handleSubmit()
  }

  return (
    <>
      <Client
        ssrData={data}
        facetFilters={facetFilters}
      />
    </>
  )
}