'use server'

import { algoliasearch } from "algoliasearch"

const searchClient = algoliasearch(process.env.ALGOLIA_API_ID, process.env.ALGOLIA_API_KEY)
const client = algoliasearch(process.env.ALGOLIA_API_ID, process.env.ALGOLIA_WRITE_API_KEY)
const indexName = 'adidas-shop'

export const query = async (query, page, hits_per_page, facetFilters, customRanking, updateStoreMethod) => {
  if (customRanking) {
    const response = await client.setSettings({
      indexName,
      indexSettings: { customRanking: ['desc(createdAt)'] },
    })
     
    if (response) {
      return await searchClient.searchSingleIndex({
        indexName,
        searchParams: {
          query,
          hitsPerPage: hits_per_page,
          facetFilters,
          facets: [
            'metadata.Activity',
            'metadata.Brand',
            'metadata.Category',
            'metadata.Collection',
            'metadata.Color',
            'metadata.Features',
            'metadata.Gender',
            'metadata.Material',
            'metadata.Price',
            'metadata.ProductType',
            'metadata.Sport',
          ],
          page,
        },
      });
    }

  } else {
    const response = await searchClient.searchSingleIndex({
      indexName: indexName,
      searchParams: {
        query: query,
        hitsPerPage: hits_per_page,
        facetFilters: facetFilters,

        facets: [
          'metadata.Activity',
          'metadata.Brand',
          'metadata.Category',
          'metadata.Collection',
          'metadata.Color',
          'metadata.Features',
          'metadata.Gender',
          'metadata.Material',
          'metadata.Price',
          'metadata.ProductType',
          'metadata.Sport',
        ],
         page: page,
      },
    })
    
    return response
  }
}