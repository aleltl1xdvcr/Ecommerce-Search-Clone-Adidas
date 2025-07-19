import { query } from "./query";

export const ssr_internal_method = 'ssr-internal-method'
export const getSearchResultClientActionType = "client"
export const getSearchResultSSRtActionType = "ssr"

export function getSearchResults(type, page, hitsPerPage, queryValue, facetFilters, customRanking) {
  if (type === ssr_internal_method) {
    console.log(ssr_internal_method)

    return query(queryValue, page, hitsPerPage, facetFilters, customRanking, type)
      .then(res => {
        return res
      })
      .catch(error => console.error(error))
  } else if (type === getSearchResultSSRtActionType) {
    console.log(getSearchResultSSRtActionType)
    const q = ''
    
    return query(q, page, hitsPerPage, null, null, type)
      .then(res => {
        return res
      })
      .catch(error => console.error(error))
  } else if (type === getSearchResultClientActionType) {
    console.log(getSearchResultClientActionType)
    const qx = queryValue
    const q = !qx || typeof qx !== 'string' ? '' : qx
    const p = !page || typeof page !== 'number' ? 0 : page
    const hpp = !hitsPerPage || typeof hitsPerPage !== 'number' ? 10 : hitsPerPage

    return query(q, page, hitsPerPage, facetFilters, customRanking, type)
      .then((res) => {
        return res
      })
      .catch(error => console.error(error))
  }
}