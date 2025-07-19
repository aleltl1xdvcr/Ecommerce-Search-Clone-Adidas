'use client'

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import qs from 'qs'

import './styles.css'

import { MdOutlineArrowDropDown, MdOutlineArrowDropUp, MdArrowRightAlt } from 'react-icons/md';
import { IoReturnUpBackSharp } from 'react-icons/io5';
import { IoMdClose, IoMdCheckmark } from 'react-icons/io';
import { VscSettings } from 'react-icons/vsc';

import { getSearchResultClientActionType, getSearchResults, ssr_internal_method } from '../lib/get-search-results';
import { useModalFiltersStore } from './modal-filters-store';
import useQueryStore, { queryParamsObj, updateStoreMethodInternal } from '../store/search-store';
import { usePathname, useSearchParams } from 'next/navigation';
import { removeEmptyOrNull, toUrlFormat } from '../nav/client';
import { HITS_PER_PAGE } from '../config';

export default function Part1() {
  const pathname = usePathname()
  const searchParamsInstance = useSearchParams()
  const searchParams = searchParamsInstance.toString()
  const addFacetFilter = useQueryStore(state => state.addFacetFilter)
  const deleteFacetFilter = useQueryStore(state => state.deleteFacetFilter)
  const facetFilters = useQueryStore(state => state.facetFilters)
  const setMetadataStore = useQueryStore(state => state.setMeta)
  const clearAllFacetFilters = useQueryStore(state => state.clearAllFacetFilters)
  const resetQueryParams = useQueryStore(state => state.resetQueryParams)
  const customRanking = useQueryStore(state => state.customRanking)
  const setCustomRanking = useQueryStore(state => state.setCustomRanking)
  const enableApiQueries = useQueryStore(state => state.enableApiQueries)
  const setEnableApiQueries = useQueryStore(state => state.setEnableApiQueries)
  const updateQueryFilters = useQueryStore(state => state.updateQueryFilters)
  const addResultsStore = useQueryStore(state => state.addResultsStore)
  const metadataStore = useQueryStore(state => state.meta)
  const [isOpenModalFilters, setIsOpenModalFilters] = useState(false)

  async function fnFetchSearchData() {
    const query = getQuery()
    const data = await getSearchResults(getSearchResultClientActionType, 0, HITS_PER_PAGE, query, facetFilters, customRanking)

    if (data) {
      const { nbHits, query, page, nbPages, facets, facets_stats } = data
      const objMeta = { nbHits: nbHits, query: query, page: page, nbPages: nbPages, facets: facets, facets_stats: facets_stats }
      setMetadataStore(objMeta)
      addResultsStore(data)
    }
  }

  function FN3_x0({ searchParams }) {
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

    const queryParsed = qs.parse(searchParams, options)

    for (const [key, value] of Object.entries(queryParsed)) {
      const item = key + ':' + value
      arr.push(item)
    }

    return arr
  }

  function handleResetFacetFilters() {
    clearAllFacetFilters()
    resetQueryParams()
    handleURL()
    fnFetchSearchData()
  }

  function setScrollableScrollTop() {
    return
    const scrollableSt = useQueryStore.getState().scrollableSt
    const setScrollableSt = useQueryStore.getState().setScrollableSt
    const scrollable = document.getElementById('container-scrollable')
    const st = scrollable.scrollTop
    setScrollableSt(st)
    scrollable.scrollTop = scrollableSt
  }

  useEffect(() => {
    if (isOpenModalFilters) {
      setEnableApiQueries(true)
    } else {
      setEnableApiQueries(false)
    }
  }, [isOpenModalFilters])

  useEffect(() => {
    const currentUpdateStoreMethod = useQueryStore.getState().currentUpdateStoreMethod
    
    if (currentUpdateStoreMethod === updateStoreMethodInternal) {
      handleURL()
    }

  }, [facetFilters])

  function getQuery() {
    const searchParams = new URLSearchParams(window.location.search)
    const q = searchParams.get('query')
    return q || ''
  }


  function handleURL() {
    const queryParams = useQueryStore.getState().queryParams
    const queryValueClient = useQueryStore.getState().queryValueClient
    const query = getQuery()
    queryParams.query = toUrlFormat(query)

    const queryString = qs.stringify(removeEmptyOrNull(queryParams), {
      encode: false,
      addQueryPrefix: true,
      arrayFormat: 'repeat',
    })

    if (queryString) {
      window.history.pushState(null, '', queryString)
    } else {
      const newUrl = window.location.pathname + window.location.hash;
      window.history.pushState(null, '', newUrl)
    } 
  }

  useEffect(() => {
    const currentUpdateStoreMethod = useQueryStore.getState().currentUpdateStoreMethod

    if (enableApiQueries && currentUpdateStoreMethod === updateStoreMethodInternal) {
      fnFetchSearchData()
    } 
  }, [facetFilters, customRanking])

  const obj =
    [
      'PRICE (LOW - HIGH)', 'NEWEST', 'TOP SELLERS', 'PRICE (HIGH - LOW)',
    ]

  if (metadataStore?.facets) {
    metadataStore.facets['SORT BY'] = obj
  }
  const mergedMetadata = metadataStore

  function fnOpenModalFilters() {
    setIsOpenModalFilters(true)
  }

  function ModalFilters() {
    const filterTabs = useModalFiltersStore(state => state.filterTabs)
    const toggleFilterTab = useModalFiltersStore(state => state.toggleFilterTab)

    function fnCloseModalFilters() {
      setIsOpenModalFilters(false)
    }

    const arr = ['SORT BY', 'Gender', 'Category', 'Activity', 'ProductType', 'Size', 'MoreSizes', 'Sport', 'Features', 'Color', 'Collection', 'Material', 'Brand', 'Price']
    const arr0 = Object.entries(mergedMetadata?.facets || {})?.map(i => ({ [i[0].replace(/\metadata./g, '')]: i[1] }))
    const ordenado = [...arr0].sort((a, b) => arr.indexOf(Object.keys(a)[0]) - arr.indexOf(Object.keys(b)[0]))

    const ModalItemFilterInfo = ({ i0, n0 }) => {
      function handleClick() {
        const key = Object.keys(i0)[0]
        toggleFilterTab(key)
      }

      function handleClickItemModalItemFilterInfo(name, i1) {
        if (!facetFilters.find(i => i === name)) {
          addFacetFilter(name)
          updateQueryFilters({
            [Object.keys(i0)[0]]: { action: 'add', values: i1[0] }
          })
        } else {
          deleteFacetFilter(name)
          updateQueryFilters({
            [Object.keys(i0)[0]]: { action: 'remove', values: i1[0] }
          })
        }
      }

      const ItemInfo = ({ i0, n1, i1 }) => {
        function setFacetFilters() {
          handleClickItemModalItemFilterInfo(
            'metadata.' + Object.keys(i0)[0] + ':' + i1[0],
              i1
          )
        }

        function handleClickSetCustomRanking(i1, i) {
          updateQueryFilters({
            sort: { action: 'add', values: i1[0]}
          })

          setCustomRanking(
            i1[1] === 'PRICE (LOW - HIGH)' 
            ? 'asc(metadata.Price)' 
            : i1[1] === 'PRICE (HIGH - LOW)' 
            ? 'desc(metadata.Price)' 
            : null
          )
        }

        return (
          Object.keys(i0)[0] === 'SORT BY' ?
            <label
              onClick={() => handleClickSetCustomRanking(i1, i1[1])}
              key={n1}
              className={`
                ${customRanking === 'asc(metadata.Price)' && i1[1] === 'PRICE (LOW - HIGH)' ? 'border-l-4 border-black' : null} 
                ${customRanking === 'desc(metadata.Price)' && i1[1] === 'PRICE (HIGH - LOW)' ? 'border-l-4 border-black' : null} 
                flex flex-row gap-2 items-center label hover:bg-neutral-200/80 w-full py-2 px-4 cursor-pointer
              `}
            >
              <div
                className={`flex flex-row items-center translate-y-[-3px] gap-3`}
              >                
                <span
                  className='text-neutral-900 dark:text-neutral-300 text-[16px]'
                >
                  {i1[1]}
                </span>
              </div>
            </label>
            :
            <label
              data-checked='sku-10293'
              onClick={(e) => setFacetFilters()}
              key={n1}
              className={`flex flex-row gap-2 items-center hover:bg-neutral-200/80 w-full py-2 px-4 cursor-pointer`}
            >
              <IoMdCheckmark
                size={30}
                className={
                  facetFilters.find(i => i === 'metadata.' + Object.keys(i0)[0] + ':' + i1[0]) ?
                    'bg-black text-white peer-has-checked:opacity-100 translate-y-[-3px] pointer-events-none'
                    : 'bg-white border border-black text-white translate-y-[-3px] pointer-events-none'
                }
              />
              <div
                className='flex flex-row items-center translate-y-[-3px] gap-3'
              >
                <h1
                  className='text-[18px]'
                >
                  {i1[0]}
                </h1>
                <span
                  className='text-neutral-900 dark:text-neutral-300 text-[13px]'
                >
                  ({i1[1]})
                </span>
              </div>
            </label>
        )
      }

      let metadataOverview = {}

      const metadataPrefix = 'metadata.'
      const itemsInfoRefsById = useRef({});
      const isFilterTabVisible = filterTabs[Object.keys(i0)[0]]

      const currentKey = Object.keys(i0)[0]
      const currentValue = Object.keys(Object.values(i0)[0])[0]

      const targetFind = metadataPrefix + currentKey + ':' + currentValue
      const finded = facetFilters.find(i => i === targetFind)


      if (finded) {
        const regex = /\.(\w+):(.+)/;
        const match = finded.match(regex);

        if (match) {
          const match1 = match[1]
          const match2 = match[2]
          metadataOverview.match1 = match1
          metadataOverview.match2 = match2
        }
      }

      return (
        <div
          key={n0}
          className='flex flex-col'
        >
          <div
            onClick={() => handleClick()}
            className='w-full flex flex-row items-center justify-between border-b border-black/15 dark:border-white/15 cursor-pointer'
          >
            <div
              className={`
                 ${metadataOverview?.match2 ? 'border-l-4 border-black dark:border-white' : null}
                 px-4 py-4 
                `}
            >
              <h1
                className='text-[15px] uppercase font-bold'
              >
                {
                  Object.keys(i0)[0]
                }
              </h1>
              {
                isFilterTabVisible 
                ?
                  null
                : 
                  <span
                    className='pt-1'
                  >
                    {
                      metadataOverview?.match2
                    }
                  </span>
              }
            </div>
            <MdOutlineArrowDropDown
              className={isFilterTabVisible ? 'hidden' : null}
              id='MdOutlineArrowDropDown'
              size={30}
            />
            <MdOutlineArrowDropUp
              id='MdOutlineArrowDropUp'
              size={30}
              className={isFilterTabVisible ? null : 'hidden'}
            />
          </div>
          <div
            id={`modalFilterInfo${Object.keys(i0)[0]}`}
            className={isFilterTabVisible ? 'flex flex-col w-full' : 'hidden'}
          >
            {
              Object.entries(Object.values(i0)[0])
                .map((i1, n1) => {
                  const keyr = i1[0]
                  if (!itemsInfoRefsById.current[keyr]) {
                    itemsInfoRefsById.current[keyr] = React.createRef();
                  }

                  return (
                    <div
                      key={n1}
                    >
                      <ItemInfo
                        key={n0}
                        i0={i0}
                        n1={n1}
                        i1={i1}
                        ref={itemsInfoRefsById.current[keyr]}
                      />
                    </div>
                  )
                })
            }
          </div>
        </div>
      )
    }

    useEffect(() => {
      const scrollable = document.getElementById('container-scrollable')

      scrollable.addEventListener('scroll', () => setScrollableScrollTop())

      return () => {
        scrollable.removeEventListener('scroll', () => setScrollableScrollTop())
      }
    }, [])

    function handleClickModal(e) {
      const el = document.getElementById('modalFilters-450')
      if (e.target.contains(el)) {
        setIsOpenModalFilters(false)
      }
      setScrollableScrollTop()
    }

    function handleDeleteFacetFilter(n2) {
      const facetFilterKey = facetFilters[n2]
      const regex = /metadata\.([A-Za-z0-9_]+):/;
      const queryFilterKey = facetFilterKey.match(regex)[1]

      updateQueryFilters({
        [queryFilterKey]: { action: 'remove' }
      })
      deleteFacetFilter(facetFilterKey)
    }

    return (
      <div
        onClick={(e) => handleClickModal(e)}
        className={`${isOpenModalFilters ? null : 'hidden'} w-full h-screen fixed z-50 bg-black/30 top-0 left-0`}
      >
        <div
          id='modalFilters-450'
          className={`${isOpenModalFilters ? null : 'hidden'} bg-white dark:bg-black dark:text-white  border border-white h-screen w-[450px] fixed z-50 right-0 top-0`}
        >
          <div
            className='w-full flex flex-row items-center'
          >
            <div
              className='py-2 flex flex-row items-center justify-between w-full px-4'
            >
              <h1
                className='text-[18px] font-bold'
              >
                Filter & Sort
              </h1>
              <button
                onClick={() => handleResetFacetFilters()}
                className='text-neutral-400 text-[17px] underline cursor-pointer'
              >
                Clear All
              </button>
            </div>
            <div
              className='relative pt-1 pr-4'
            >
              <div
                onClick={() => fnCloseModalFilters()}
                className=''
              >
                <IoMdClose
                  size={30}
                />
              </div>
            </div>
          </div>
          <div
            id='container-scrollable'
            className='w-full h-full overflow-y-auto scrollable py-3'
          >
            <div
              className='flex flex-col mb-20'
            >

              {
                facetFilters.length !== 0
                  ?
                  <div
                    className='px-4 flex flex-col gap-5 mb-4'
                  >
                    <h1
                      className='uppercase font-bold text-[15px]'
                    >
                      Applied filters
                    </h1>
                    <div
                      className='flex flex-row gap-2 flex-wrap'
                    >
                      {/* descoment */}
                      {
                        (Object.entries(facetFilters)
                          .map(i => [i[1].replace(/^[^:]*:/, '')]))
                          .map((i2, n2) => (
                          <div
                            onClick={() => handleDeleteFacetFilter(n2, i2)}
                            className='flex flex-row items-center gap-2 bg-neutral-200/70 px-2.5 py-1 cursor-pointer'
                            key={n2}
                          >
                            <IoMdClose
                              size={20}
                            />
                            <span
                            >
                              {i2}
                            </span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  : null
              }
              <div
                className='mb-24'
              >
                {
                  ordenado?.map((i, n0) => (
                    <ModalItemFilterInfo
                      i0={i}
                      n0={n0}
                      key={n0}
                    />
                  ))
                }
              </div>
            </div>
          </div>
          <div
            className='w-full'
          >
            <div
              id='bounding-bottom'
              className='absolute flex justify-center bottom-0 w-full py-4 bg-white dark:bg-black'
            >
              <button
                onClick={() => fnCloseModalFilters()}
                className='w-[90%] flex flex-row items-center justify-between dark:bg-white dark:text-black bg-black text-white p-3'
              >
                <span
                  className='font-bold'
                >
                  APPLY
                </span>
                <MdArrowRightAlt
                  size={30}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className='w-full flex flex-row justify-between items-baseline-last mt-9'
      >
        <div
          className='flex flex-col'
        >
          <div
            className='flex flex-row items-center gap-x-4'
          >
            <Link
              className='font-bold underline flex flex-row items-center gap-2'
              href={'/x'}
            >
              <IoReturnUpBackSharp 
                className='text-[23px]'
              />
              <span>
                Back
              </span>
            </Link>
            <Link
              className='underline'
              href={'/x'}
            >
              Home
            </Link>
          </div>
          <div
            className='mb-5 mt-6'
          >
            <div
              className='flex flex-row items-baseline-last gap-x-3'
            >
              <div
                className='flex flex-col'
              >
                <span
                  className='text-[16px] text-neutral-900'
                >
                  search for:
                </span>
                <h1
                  className='text-[29px] xl:text-[43px] font-bold leading-none uppercase'
                >
                  {mergedMetadata?.query?.trim() === '' ? 'All products' : mergedMetadata?.query}
                </h1>
              </div>
              <span
                className='text-[10px] xl:text-[16px] translate-y-[-1px]'
              >
                ({mergedMetadata?.nbHits})
              </span>
            </div>
          </div>
        </div>
        <div
          onClick={() => fnOpenModalFilters()}
          className='lg:border lg:border-black font-bold flex flex-row items-end gap-2 px-4 py-2 cursor-pointer'
        >
          <span
            className='text-[12px] xl:text-[15px] translate-y-[-2px] hidden lg:flex'
          >
            FILTER AND SORT
          </span>
          <VscSettings
            className='text-[27px] lg:text-[20px] xl:text-[28px]'
          />
        </div>
      </div>
      <ModalFilters />
    </>
  )
}