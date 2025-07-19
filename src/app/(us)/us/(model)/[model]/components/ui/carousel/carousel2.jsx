'use client'

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { FaArrowRightLong } from "react-icons/fa6"
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io"
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import { useStoreCarousel } from "../../../../../../../stores/store-carousel"
import Link from "next/link"
import { MdClose } from "react-icons/md"
import { FaHeart } from "react-icons/fa";
import './styles.css'

export default function Carousel2({ instanceId, data, data_length, title }) {
  const splideRef = useRef(null)
  const arrowPrevRef = useRef(null)
  const arrowNextRef = useRef(null)
  const isOpenSlidingModal = useRef(false)
  const [isOpenSlidingModalState, setIsOpenSlidingModalState] = useState(false)
  const [translateSlidingModal, setTranslateSlidingModal] = useState(500)
  const slidingModalRef = useRef(null)
  const slidingModalData = useStoreCarousel(state => state.slidingModalData)
  const setSlidingModalData = useStoreCarousel(state => state.setSlidingModalData)

  function detectVisibleItems(type, firstItemRight, lastItemLeft, containerLeft, containerRight) {
    if (type === 'last-item') {
      return lastItemLeft <= containerRight
    } else if (type === 'first-item') {
      console.log('first item condition', firstItemRight, '>=', containerLeft, '=', firstItemRight >= containerLeft)

      return firstItemRight >= containerLeft
    } else if (type === 'both') {
      return lastItemLeft <= containerRight && firstItemRight >= containerLeft
    }
  }

  // useEffect(() => {
  //   console.log('SLIDING MODAL DATA', slidingModalData, '')
  // }, [slidingModalData])

  useEffect(() => {
    const firstEl = document.getElementById(`item-splide-slide#${instanceId}#first`)
    const lastEl = document.getElementById(`item-splide-slide#${instanceId}#last`)
    const container = document.getElementById(`container__carousel#${instanceId}`)
    const firstElB = firstEl?.getBoundingClientRect()
    const lastElB = lastEl?.getBoundingClientRect()

    const containerB = container?.getBoundingClientRect()
    const containerL = containerB?.left
    const containerR = containerB?.right
    const firstElL = firstElB?.left
    const firstElR = firstElB?.right

    const lastElL = lastElB?.left
    const lastElR = lastElB?.right

    function u() {
      // console.log('first', detectVisibleItems('first-item', firstElR, lastElL, containerL, containerR),
      //   'last', detectVisibleItems('last-item', firstElR, lastElL, containerL, containerR),
      //   'both', detectVisibleItems('both', firstElR, lastElL, containerL, containerR)

      // )
    }

    function fnSlidingHoverModalWindow(e) {
      const sm = document.getElementById(`sliding-modal#${instanceId}`)
      // console.log('isOpenSlidingModal.current || false && (sm.style.transform.includes(translateX(0px)))', isOpenSlidingModal.current === false || (sm.style.transform.includes('translateX(0px)')))
      if (isOpenSlidingModal.current === false || (sm.style.transform.includes('translateX(0px)'))) return
      const target = e.target
      if (!sm.contains(target)) {
        //console.log('!sm.contains(target)', !sm.contains(target))
        //  console.log('sm.style.transform.includes("translateX(0px)")', sm.style.transform.includes('translateX(0px)'), sm.style.transform)
        // if (sm.style.transform.includes('translateX(0px)')) {
        isOpenSlidingModal.current = false
        sm.style.transition = 'transform 0.8s cubic-bezier(0.42, 0, 0.58, 1)'
        sm.style.transform = `translateX(500px)`
        //   }
      } else if (sm.contains(target)) {
        // console.log('sm.contains(target))', sm.contains(target))
        return
      }
    }

    // window.addEventListener('click', (e) => fnSlidingHoverModalWindow(e))

    container.addEventListener('mouseover', () => u())
    //container.addEventListener('mouseleave', () => u())

    return () => {
      window.removeEventListener('click', (e) => fnSlidingHoverModalWindow(e))
      container.removeEventListener('mouseover', () => u())
      container.removeEventListener('mouseleave', () => u())
    }

  }, [])

  function Arrows({ arrowPrevRef, arrowNextRef }) {
    return (
      <div
        className="flex flex-row justify-between items-center w-full absolute top-6/12 px-5 splide__arrows"
      >
        <div
          ref={arrowPrevRef}
          className="bg-black p-2 splide__arrow splide__arrow--prev transition-opacity duration-600 ease-in border border-white/50 hover:text-neutral-500"
        >
          <IoMdArrowDropleft
            size={30}
          />
        </div>
        <div
          ref={arrowNextRef}
          className="bg-black p-2 splide__arrow splide__arrow--next transition-opacity duration-600 ease-in border border-white/50 hover:text-neutral-500"
        >
          <IoMdArrowDropright
            size={30}
          />
        </div>
      </div>
    )
  }

  function handleFetchSlidingModal(id) {
    setIsOpenSlidingModalState(state => !state)
    console.log('flag hover fetch', isOpenSlidingModal.current)
    if (isOpenSlidingModal.current) return
    const item = data.find((i, _) => i.id === id)
    setSlidingModalData(item)
    console.log('data founded', item.id)
  }

  useEffect(() => {
    handleClickSlidingModal()
  }, [isOpenSlidingModalState])

  function handleClickSlidingModal() {
    const el = slidingModalRef.current
    if (isOpenSlidingModalState) {
      setTimeout(() => {
        isOpenSlidingModal.current = true
        el.style.transition = 'transform 0.8s cubic-bezier(0.42, 0, 0.58, 1)'
        el.style.transform = `translateX(0px)`
      }, 100)
    } else if (!isOpenSlidingModalState) {
      setTimeout(() => {
        isOpenSlidingModal.current = false
        el.style.transition = 'transform 0.8s cubic-bezier(0.42, 0, 0.58, 1)'
        el.style.transform = `translateX(500px)`
      }, 100)
    }
  }

  function SlidingModal() {
    const data = slidingModalData
    const splideRef = useRef(null)

    function CloseModal() {
      return (
        <div
          className="w-full flex justify-end fixed z-40 right-4 top-4"
        >
          <div
            className="p-2 bg-black rounded-[2px] hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            <MdClose
              size={28}
            />
          </div>
        </div>
      )
    }

    return (
      <div
        ref={slidingModalRef}
        style={{
          transform: 'translateX(500px)'
        }}
        id={`sliding-modal-images#${instanceId}`}
        className="fixed w-[50px] h-screen bg-black right-0 top-0 z-50 overflow-y-auto"
      >
        <div
          className="w-[100px] overflow-hidden"
        >
          <Splide
            ref={splideRef}
            options={{
              type: 'splide',
              label: 'Carrusel de Projectos',
              rewind: false,
              speed: 750,
              rewindByDrag: false,
              rewindSpeed: 750,
              width: '70%',
              perPage: 1,
              start: 0,
              perMove: 1,
              paginationKeyboard: true,
              preloadPages: 1,
              drag: true,
              focus: 'start',
              snap: true,
              wheel: false,
              cover: false,
              arrows: true,
              pagination: false,
              mediaQuery: 'min',
              fixedHeight: '50px',
              fixedWidth: '50px'
            }}
            hasTrack={false}
            autoFocus={true}
            aria-label='Carousel cars'
          >
            <SplideTrack
              id={`container__carousel#${instanceId}`}
            >
                {
                  [0, 0, 0, 0, 0, 0,].map((i, index) => (
                    <SplideSlide
                      key={index}
                    >
                      <div
                        className="relative"
                      >
                        <div
                          className="w-[50px] h-full relative shrink-0"
                        >

                          <Image
                            src={data.url || '/x'}
                            fill
                            alt={data.name || 'x'}
                            objectFit="cover"
                          />
                        </div>
                      </div>
                    </SplideSlide>
                  ))
                }
            </SplideTrack>
            <CloseModal />
            <Arrows
              arrowPrevRef={arrowPrevRef}
              arrowNextRef={arrowNextRef}
            />
          </Splide>
        </div>
        <div
          className="p-8 flex flex-col gap-y-2"
        >
          <h1
            className="text-[20px] font-bold uppercase"
          >
            Own the run shorts
          </h1>
          <data
            className="font-bold"
            value={'$99'}>${'99'}</data>
          <data value={'$35 Original price -45%'}>
            {'$35 Original price -45%'}
          </data>
          <p
            className="text-neutral-100"
          >
            Essential running shorts made in part with recycled materials.
          </p>
          <Link
            href={'/x'}
            className="uppercase text-[25px] font-bold underline hover:no-underline"
          >
            MORE DETAILS
          </Link>
          <button
            className="flex flex-row items-center justify-between p-4 rounded-[4px] border-b border-r border-white/80 hover:text-neutral-400 transition-colors duration-300 ease-in-out"
          >
            <span>
              Add to bag
            </span>
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <SlidingModal />
      <div
        className="flex flex-col gap-y-5 my-12"
      >

        <div>
          <h1
            className="text-[40px] font-bold"
          >
            {title}
          </h1>
        </div>
        <div
          className="relative overflow-hidden"
        >
          <Splide
            ref={splideRef}
            options={{
              type: 'splide',
              label: 'Carrusel de Projectos',
              rewind: true,
              speed: 850,
              rewindSpeed: 650,
              rewindByDrag: true,
              width: '100%',
              gap: 15,
              perPage: 6,
              start: 0,
              perMove: 6,
              paginationKeyboard: true,
              preloadPages: 4,
              drag: 'free',
              focus: 'start',
              snap: true,
              wheel: false,
              cover: false,
              arrows: true,
              pagination: false,
              mediaQuery: 'min',
              autoplay: 'pause',
            }}
            className='cancel slide'
            hasTrack={false}
            autoFocus={true}
            aria-label='Carousel cars'
          >
            <SplideTrack
              id={`container__carousel#${instanceId}`}
            >
              {
                data.map((i, index) => (
                  <SplideSlide
                    className='relative'
                    key={index}
                  >
                    <div
                      id={`slide-item#${index}-sliding-modal#${instanceId}`}
                      onClick={() => handleFetchSlidingModal(i.id)}
                      className={`group w-[250px]¿ w-fit gap-y-2 flex flex-col hover:scale-105 transition-transform duration-300 ease-in slide__item__sliding__modal#id${instanceId}`}
                    >
                      <div
                        id={`item-splide-slide#${instanceId}#${index === data_length - 1 ? 'last' : index === 0 ? 'first' : index}`}
                        className="relative w-full h-[180px]"
                      >
                        <Image
                          src={i.url}
                          fill
                          alt="x"
                          objectFit="cover"
                        />
                      </div>
                      <div
                        className="px-3"
                      >
                        <h1>$99</h1>
                        <p>
                          Anthony Edwards Favorite Hooper Tee
                        </p>
                        <span
                          className="text-neutral-600"
                        >
                          Performance
                        </span>
                      </div>
                    </div>
                    <FaHeart
                      className="absolute top-4 right-4 z-40 overflow-hidden text-white/60 hover:text-red-500 transition-colors duration-400 ease-in-out"
                      size={20}
                    />
                  </SplideSlide>
                ))
              }
            </SplideTrack>
            <Arrows
              arrowPrevRef={arrowPrevRef}
              arrowNextRef={arrowNextRef}
            />
          </Splide>
        </div>
      </div>
    </>
  )
}