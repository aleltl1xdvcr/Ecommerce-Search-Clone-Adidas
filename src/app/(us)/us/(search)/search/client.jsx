'use client'

import { useEffect } from "react"
import GetMoreItems from "../components/get-more-items"
import Part1 from "../components/part1"
import Results from "../components/results"
import useQueryStore from "../store/search-store"

export default function Search({ ssrData, facetFilters }) {
  const setMetadataStore = useQueryStore(state => state.setMeta)
  const setEntireFacetFilters = useQueryStore(state => state.setEntireFacetFilters)

  useEffect(() => {
    if (!document.cookie.includes("userId")) {
      const newId = crypto.randomUUID()
      document.cookie = `userId=${newId}; path=/; max-age=31536000`
    }

    const handleUnload = () => {
      navigator.sendBeacon("/api/delete-ssr-internal-method-flag");
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);

  }, [])

  if (ssrData) {
    const { nbHits, query, page, nbPages, facets, facets_stats } = ssrData
    const objMeta = { nbHits: nbHits, query: query, page: page, nbPages: nbPages, facets: facets, facets_stats: facets_stats }
    setMetadataStore(objMeta)
  }

  if (facetFilters) {
    setEntireFacetFilters(facetFilters)
  }

  return (
    <div
      className="mt-[110px] w-full flex flex-col justify-center items-center"
    >
      <div
        className="w-[91vw] xl:w-[1200px]"
      >
        <div
        >
          <Part1
            meta={ssrData?.meta}
          />
        </div>
        <Results
          ssrData={ssrData}
        />
        <GetMoreItems />
      </div>
    </div>
  )
}