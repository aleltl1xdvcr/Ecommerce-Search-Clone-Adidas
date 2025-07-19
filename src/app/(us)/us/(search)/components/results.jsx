'use client'

import Image from "next/image"
import useQueryStore from "../store/search-store"
import { useRef, useState } from "react"
import { useShallow } from 'zustand/react/shallow'

export default function Results({ ssrData }) {
  const RESULTS = useQueryStore(useShallow(
    (state) => state?.RESULTS
  ))
  const HITS_RESULTS = Array.isArray(RESULTS?.hits) && RESULTS?.hits?.length !== 0 
  ? RESULTS?.hits : RESULTS?.hits?.hits 
  || ssrData?.hits 
  || []

  const Item = ({ i, n0, }) => {
    const [currentTabColor, setCurrentTabColor] = useState(null)
    const hasSettedCurrentColor = useRef(false)
    const flagCurrentColor = useRef(false)
    let obj0ImagePreviews = [1, 0]
    let obj0TabColorsPerItem = []

    i?.ModelColors?.forEach((i, n) => {
      obj0TabColorsPerItem.push(false)
    })

    if (obj0TabColorsPerItem.length !== 0 && !flagCurrentColor.current) {
      setCurrentTabColor(obj0TabColorsPerItem)
      flagCurrentColor.current = true
      hasSettedCurrentColor.current = !hasSettedCurrentColor.current
    }

    const [imagePreview, setImagePreview] = useState(obj0ImagePreviews)
    const [isHiddenTabColors, setIsHiddenTabColors] = useState(true)

    function toggleTabColors(e) {
      if (e.type === 'mouseover') {
        setIsHiddenTabColors(false)
      } else if (e.type === 'mouseleave') {
        setIsHiddenTabColors(true)
      }
    }

    return (
      <div
        onMouseOver={(e) => toggleTabColors(e)}
        onMouseLeave={(e) => toggleTabColors(e)}
        key={n0}
        className="w-full hover:outline relative h-fit"
      >
        <div
          onMouseOver={(e) => fnHoverChangeImagePreview(e, setImagePreview)}
          onMouseLeave={(e) => fnHoverChangeImagePreview(e, setImagePreview)}
          className="relative w-full h-[40vw] sm:h-[32vw] md:h-[30vw] lg:h-[23vw] xl:h-[300px]"
          id={`containerImg${n0}_itemShop`}
        >
          <ImageItem
            imagePreview={imagePreview}
            currentTabColor={currentTabColor}
            src={
              i?.ModelColors?.length !== 0 ? i.ModelColors : i.metadata?.Media
            }
            index={n0}
            type={
              i?.ModelColors?.length !== 0 ? 'MODELCOLORS' : 'METADATA'
            }
          />

        </div>
        <div
          id="bridge-search-results"
          className="bg-transparent w-full h-[7px]"
        >

        </div>
        <div
          className="relative h-fit"
        >
          <div
            className={`top-0 w-full outline-white h-fit`}
          >
            {i?.ModelColors.length > 1 && !isHiddenTabColors ?
              <div
                className="flex flex-row gap-3.5 items-center"
              >
                {
                  i?.ModelColors.sort((a, b) => {
                    if (a.currentColor === true) {
                      return -1
                    } else return 0
                  })?.map((i, n1) => (
                    <div
                      key={`item#${n1}_thumbnail#${currentTabColor?.indexOf(true)}`}
                    >
                      <div
                        className={`relative w-[70px] h-[70px] group`}
                      >
                        <Image
                          onMouseLeave={(e) => fnHoverSetTabColorPerItem(e, n0, n1, setCurrentTabColor)}
                          onMouseOver={(e) => fnHoverSetTabColorPerItem(e, n0, n1, setCurrentTabColor)}
                          src={i.ModelImage[0]?.url}
                          fill
                          objectFit="cover"
                          alt="x"
                        />
                        <div
                          className={
                            `${currentTabColor?.indexOf(true) === n1 ? 'border-b-5' : null} dark:border-yellow-600 border-black w-full absolute bottom-0`
                          }
                        />
                      </div>
                    </div>
                  ))
                }
              </div>
              : null
            }
            <div
              className="px-2 py-1"
            >
              <h1
                className="font-bold mb-1"
              >
                ${i.metadata?.Price}
              </h1>
              <h1
                className="text-[14px]"
              >
                {i.metadata?.Name}
              </h1>
              <div
                className="flex flex-row gap-x-2 pt-0.5 items-center text-[13px] text-neutral-800 dark:text-neutral-300"
              >
                {
                  i.metadata?.Categories?.[0]
                }
              </div>
              {
                i.ModelColors.length !== 0 ?
                  <div
                    className="flex flex-row gap-x-1 pt-0.5 items-center text-[13px] text-neutral-800 dark:text-neutral-300"
                  >
                    <span>
                      {i.ModelColors.length}
                    </span>
                    <span>colors</span>
                  </div>
                  : null
              }
              <h1
                className="text-[13px] pt-0.5"
              >
                New
              </h1>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const ImageItem = ({ src, index, type, imagePreview, currentTabColor, }) => {
    const url =
      type === 'MODELCOLORS'
        ? (
          src?.[currentTabColor?.indexOf(true)]?.ModelImage[imagePreview.indexOf(1) || 0]?.url
          || src.find(i => i.currentColor === true)?.ModelImage[imagePreview.indexOf(1) || 0]?.url
        )
        : type === 'METADATA'
          ? (
            src?.[imagePreview.indexOf(1) || 0]?.url || src?.[0].url
          )
          : null

    return (
      <Image
        priority
        id={`img${index}_itemShop`}
        src={url}
        fill
        objectFit="cover"
        alt="x"
      />
    );
  };

  function fnHoverChangeImagePreview(e, setter) {
    if (e.type === 'mouseover') {
      setter(prev => {
        const newState = [...prev]
        newState[1] = 1
        newState[0] = 0
        return newState
      })
    } else if (e.type === 'mouseleave') {
      setter(prev => {
        const newState = [...prev]
        newState[1] = 0
        newState[0] = 1
        return newState
      })
    }
  }

  function fnHoverSetTabColorPerItem(e, _, index, setter) {
    if (e.type === 'mouseover') {
      setter(prev => {
        const newState = [...prev]
        newState[index] = true
        return newState
      })
    } else if (e.type === 'mouseleave') {
      const ert = e.relatedTarget.id
      const copyert = `img${index}_itemShop`
      if (ert === copyert || ert === 'bridge-search-results') return
      setter(prev => {
        const newState = [...prev]
        newState[index] = false
        return newState
      })
    }
  }

  return (
    <div
      className="w-full"
    >
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-5 w-full border-t border-black/15 pt-6 mt-3"
      >
        {
          HITS_RESULTS?.map((i, n0) => (
            <Item
              key={n0}
              i={i}
              n0={n0}
            />
          ))
        }
      </div>
    </div>
  )
}