'use client'

import Image from "next/image"
import './styles.css'
import { useEffect, useRef, useState } from "react"
import { CiZoomIn, CiZoomOut } from "react-icons/ci"
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6"
import { IoMdClose, IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { motion } from "motion/react"
import Lenis from "lenis"
import '@splidejs/react-splide/css/core';
import { useStoreCarousel } from "../../../../stores/store-carousel"
import Carousel from './components/ui/carousel/carousel'
import Panel from "./components/ui/panel/panel"
import ProductMeta from "./components/product-meta/product-meta"
import AuthBanner from "./components/ui/panel/components/auth-banner"
import Footer from "./components/ui/panel/components/footer"
import Carousel2 from "./components/ui/carousel/carousel2"

export default function Terrex({ data, dynamicSizesData, modelColorsData, sectionTypeData }) {
  const isZoomedRef = useRef(false)
  const zoomInRef = useRef(null)
  const zoomOutRef = useRef(null)
  const arrowsRef = useRef(null)
  const [indexMedia, setIndexMedia] = useState(0)
  const [visible, setVisible] = useState(false)
  const [mediaLength, setMediaLength] = useState(2)
  const [activateEffect, setActivateEffect] = useState(false)
  const c1Ref = useRef(null)
  const c2Ref = useRef(null)
  const cursorRef = useRef(null)
  const containerHeigthRef = useRef(null)
  const slidingModalInstanceActive = useStoreCarousel(state => state.slidingModalInstanceActive)
  const zoomInExtRef = useRef(null)
  const cursorContainerExtRef = useRef(null)

  function r(t, xy, hw) {
    if (t === 'x') {
      const vw = hw / 4
      const percent = (140 / 100) * xy
      if (percent < vw) {
        const r = percent - vw
        return r
      } else {
        const r = Math.abs((percent - vw) / 12.9)
        return r
      }
    } else if (t === 'y') {
      const vh = hw / 3.5
      const percent = (140 / 100) * xy
      if (percent < vh) {
        const r = Math.abs(percent - vh)
        return r
      } else {
        const vh = hw / 3.5
        const percent = (140 / 100) * xy
        const r = '-' + (percent - vh) / 3.9
        return r
      }
    }
  }

  function fnPosition(e, c) {
    const a = e.clientX
    const b = e.clientY
    const w = c?.offsetWidth
    const h = c?.offsetHeight
    const x = r('x', a, w)
    const y = r('y', b, h)
    const scale = isZoomedRef.current ? 1.7 : 1
    if (c) {
      if (isZoomedRef.current) {
        c.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
      } else if (!isZoomedRef.current) {
        c.style.transform = ''
      }
    }
  }

  function fnMouseMove(e) {
    const c = document.getElementById('container__image')
    if (!isZoomedRef.current) return
    fnPosition(e, c)
  }

  function manageZoomIcons(t) {
    const zoomIn = zoomInRef.current
    const zoomOut = zoomOutRef.current

    if (t === 'zoomOut') {
      if (zoomIn && zoomOut) {
        zoomIn.classList.remove('opacity-100')
        zoomIn.classList.add('opacity-0')
        zoomOut.classList.remove('opacity-0')
        zoomOut.classList.add('opacity-100')
      }
    }
    else if (t === 'zoomIn') {
      if (zoomIn && zoomOut) {
        zoomOut.classList.remove('opacity-100')
        zoomOut.classList.add('opacity-0')
        zoomIn.classList.remove('opacity-0')
        zoomIn.classList.add('opacity-100')
      }
    }
  }

  function manageZoomIconsExt(t, e) {
    const zoomIn = zoomInExtRef.current
    const cursorContainer = cursorContainerExtRef.current
    const cw = cursorContainer.getBoundingClientRect().width / 2.32

    cursorContainer.style.left = (e.clientX - cw) + "px";
    cursorContainer.style.top = (e.clientY - cw) + "px";

    if (t === 'zoomOut') {
      if (zoomIn) {
        document.body.classList.remove("no-cursor");
        zoomIn.classList.remove('opacity-100')
        zoomIn.classList.add('opacity-0')
        cursorContainer.classList.add('hidden')
      }
    }
    else if (t === 'zoomIn') {
      if (zoomIn) {
        document.body.classList.add("no-cursor");
        cursorContainer.classList.remove('hidden')
        zoomIn.classList.remove('opacity-0')
        zoomIn.classList.add('opacity-100')
      }
    }
  }

  function fnClickToActivateZoom(e, t) {
    const c = document.getElementById('container__image')
    isZoomedRef.current = !isZoomedRef.current
    if (t === 'toggle') {
      setVisible(prev => !prev)
    }

    if (!isZoomedRef.current) {
      c.style.transform = 'translate(0, 0) scale(1)'
      manageZoomIcons('zoomIn')

    } else {
      manageZoomIcons('zoomOut')
      fnPosition(e, c)
    }
  }

  const Cursor = () => {

    return (
      <div
        ref={cursorContainerExtRef}
        className="custom-cursor fixed pointer-events-none top-0 left-0 text-[50px] bg-white text-black h-[40px] w-[45px] z-30 transition-opacity duration-200 ease-in-out"
        id="cursor"
      >
        <div
          className="relative flex justify-center items-center translate-y-[20px]"
        >
          <CiZoomIn
            ref={zoomInExtRef}
            size={35}
            className="absolute opacity-0"
          />
        </div>
      </div>
    )
  }

  function fnCursor(e) {
    const cursor = cursorRef.current

    if (e.type === 'mouseover') {
      document.body.classList.add("no-cursor")
      cursor.classList.remove('opacity-0')
      cursor.classList.add('opacity-100')
      manageZoomIcons('zoomIn')

      if (!isZoomedRef.current) {
        manageZoomIcons('zoomIn')
      } else {
        manageZoomIcons('zoomOut')
      }
      return
    }

    else if (e.type === 'mouseleave') {
      cursor.classList.remove('opacity-100')
      cursor.classList.add('opacity-0')
      document.body.classList.remove("no-cursor")
      manageZoomIcons('zoomOut')

      if (!isZoomedRef.current) {
        manageZoomIcons('zoomIn')
      } else {
        manageZoomIcons('zoomOut')
      }
      return
    }

    else if (e.type === 'mousemove') {
      cursor.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`
      return
    }
  }

  useEffect(() => {
    window?.addEventListener('mousemove', e => fnMouseMove(e))
    return () => {
      window?.removeEventListener('mousemove', e => fnMouseMove(e))
    }
  }, [])

  function fnIndexMedia(t, index) {
    if (t === 'thumbnails') {
      setIndexMedia(index)
    } else if (t === 'left arrow') {
      if (indexMedia === 0) {
        const length = data?.[0]?.Media.length
        const indexValue = length - 1
        setIndexMedia(indexValue)
      } else if (indexMedia !== 0) {
        const indexValue = Math.abs(indexMedia - 1)
        setIndexMedia(indexValue)
      }
    } else if (t === 'right arrow') {
      const length = data?.[0]?.Media.length
      if (indexMedia === length - 1) {
        const indexValue = 0
        setIndexMedia(indexValue)
      } else if (indexMedia !== length - 1) {
        const indexValue = Math.abs(indexMedia + 1)
        setIndexMedia(indexValue)
      }
    }
  }

  function handleModalToggle() {
    setIndexMedia(0)
    setVisible(!visible)
  }

  function Thumbnails() {
    return (
      <div
        className="relative "
      >
        <div
          ref={cursorRef}
          className="opacity-0 fixed pointer-events-none top-0 left-0 text-[50px] bg-white text-black h-[40px] w-[45px] z-30 transition-opacity duration-200 ease-in-out"
          id="cursor"
        >
          <div
            className="relative flex justify-center items-center translate-y-[20px]"
          >
            <CiZoomIn
              ref={zoomInRef}
              size={35}
              className="absolute opacity-0"
            />
            <CiZoomOut
              ref={zoomOutRef}
              size={35}
              className="absolute opacity-0"
            />

          </div>
        </div>

        <div
          className="justify-center items-center flex bg-zinc-900 px-1 py-1 bottom-4 left-0 w-full"
        >
          <div
            className="w-fit flex flex-row items-center gap-2"
          >
            {
              sectionTypeData.Media.map((i, index) => (
                <div
                  onClick={() => fnIndexMedia('thumbnails', index)}
                  key={index}
                  className="w-fit item__image"
                >
                  <div
                    className="relative w-[70px] h-[70px]"
                  >
                    <Image
                      className="rounded-[2px]"
                      objectFit="cover"
                      fill
                      alt="x"
                      src={i.url}
                    />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }

  function ShowMoreMediaData({ fn }) {
    function handleShowMoreData() {
      const l = data?.[0]?.Media.length
      const value = l - 1 === mediaLength ? 2 : l - 1
      setActivateEffect(!activateEffect)
      setMediaLength(value)
    }

    return (
      <div
        className="w-full h-5 relative flex justify-center"
      >
        <div
          key={'x'}
          onClick={() => fn()}
          className="bg-black text-white cursor-pointer px-4 w-fit py-2 rounded-[3px] gap-3 flex flex-row items-center absolute top-[-100px]"
        >
          {
            data?.[0]?.Media.length - 1 !== mediaLength ?
              <>
                <h1
                  className="flex-nowrap flex"
                >
                  SHOW MORE
                </h1>
                <IoIosArrowDown
                  size={30}
                />
              </>
              :
              <>
                <h1
                  className="flex-nowrap flex"
                >
                  SHOW LESS
                </h1>
                <IoIosArrowUp
                  size={30}
                />
              </>
          }
        </div>
      </div>
    )
  }

  function ModalMedia() {
    return (
      <div
        id="container__"
        className="w-full flex z-40 flex-col justify-end items-center fixed top-0 bg-zinc-800 transition-opacity duration-500 ease-in h-screen"
      >
        <div
          className="flex flex-col justify-center items-center gap-1"
        >
          <div
            onMouseOver={(e) => fnCursor(e)}
            onMouseLeave={(e) => fnCursor(e)}
            onMouseMove={(e) => fnCursor(e)}
            ref={c1Ref}
            onClick={(e) => fnClickToActivateZoom(e)}
            id="container__image"
            className="transition-transform duration-300 w-[48vw] h-[90vh] ease-linear container__image relative"
          >
            <Image
              objectFit="cover"
              fill
              alt="x"
              src={sectionTypeData.Media[indexMedia]?.url}
            />
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[80px] w-full"
          >
            <Thumbnails />
          </div>
        </div>
        <div
          onClick={() => handleModalToggle()}
          className="absolute top-8 right-8 bg-black text-white p-2 border border-white/60"
        >
          <IoMdClose
            size={32}
          />
        </div>
          <div
            ref={arrowsRef}
            className="flex flex-row items-center justify-between px-10 w-full absolute top-6/12 left-0 z-40 text-white"
          >
            <div
              className="relative w-full"
            >
            {
              indexMedia !== 0 ?

                <FaArrowLeftLong
                  onClick={() => fnIndexMedia('left arrow')}
                  className="bg-black p-2 absolute left-0"
                  size={35}
                />
                : null
            }
            {
              indexMedia !== sectionTypeData.Media.length - 1 ?
                <FaArrowRightLong
                  onClick={() => fnIndexMedia('right arrow')}
                  className="bg-black p-2 absolute right-0"
                  size={35}
                />
                : null
            }
            </div>
          </div>
      </div>
    )
  }

  function MainMedia() {
    const [x, setX] = useState(4)
    const lenisRef = useRef(null)

    useEffect(() => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        prevent: (node) => node.id === slidingModalInstanceActive
      })

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
      lenisRef.current = lenis
      return () => {
        lenis.destroy()
      }
    }, [])

    function handleShowMore() {
      const l = data?.[0]?.Media.length
      const value = l - 1 === x ? 2 : l - 1
      const remainder = l % 2
      const totalRows = (l / 2) + remainder
      if (value === 2) {
        setX(p => p - (p - 2))
      } else {
        setX(value)
      }
      setActivateEffect(!activateEffect)

    }

    const media_data1 = data[0]?.Media.filter((_, index) => index < x)
    const [activateEffect, setActivateEffect] = useState(null)

    useEffect(() => {
      if (activateEffect === null) return
      manageHeight()
    }, [activateEffect])

    function manageHeight() {
      const lenis = lenisRef.current
      if (!lenis) return
      const h = document.getElementById('it-image-#1').offsetHeight
      const el = containerHeigthRef.current
      const ch = el.offsetHeight

      const l = data?.[0]?.Media.length
      const value = l - 1 === media_data1.length ? 2 : l - 1
      const distanceY = h * (l - 1)

      if (value === 2) {
        lenis.start()
        window.scrollBy({
          top: distanceY,
          behavior: 'smooth'
        })
        lenis.stop()
      } else if (value === l - 1) {
        lenis.start()
        const distanceY = h * (l - 1)
        window.scrollBy({
          top: distanceY,
          behavior: 'smooth'
        })
        lenis.stop()
      }
    }

    const Item = ({ index, i }) => {
      function onZoom(e, el, el2p) {
        manageZoomIconsExt('zoomIn', e)
        const img = document.getElementById(el)
        const el2 = document.getElementById(el2p)

        const rect = el2.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        img.style.transformOrigin = `${x}px ${y}px`
        img.style.transform = "scale(2.5)";
      }

      function offZoom(e, el) {
        manageZoomIconsExt('zoomOut', e)
        const img = document.getElementById(el)
        img.style.transformOrigin = `center center`;
        img.style.transform = "scale(1)";
      }

      return (
        <div
          onClick={(e) => fnClickToActivateZoom(e, 'toggle')}
          onMouseLeave={(e) => offZoom(e, `c-image-zoom${index}`, `czoomedn${index}`)}
          onMouseMove={(e) => onZoom(e, `c-image-zoom${index}`, `czoomedn${index}`)}
          onMouseOver={(e) => onZoom(e, `c-image-zoom${index}`, `czoomedn${index}`)}
          id={`it-image-#${index + 1}`}
          key={index}
          className="relative"
        >
          <Cursor />
          <div
            className="overflow-hidden"
          >
            <div
              id={`czoomedn${index}`}
              className="relative w-full h-[300px] flex transition-transform overflow-hidden bg-amber-800"
            >
              <Image
                id={`c-image-zoom${index}`}
                src={i.url}
                alt="i"
                key={index}
                objectFit="cover"
                className="c-img absolute"
                fill
              />
            </div>
          </div>
        </div>
      )
    }

    function LessData() {
      return (
        <div
          className="flex flex-row items-start pb-20 justify-center"
        >
          <div
            className={`grid grid-cols-2 gap-1 flex-row w-full`}
          >
            {
              sectionTypeData.Media?.map((i, index) => (
                <Item
                  i={i}
                  index={index}
                  key={index}
                />
              ))
            }
          </div>
        </div>
      )
    }

    return (
      <>
        <motion.div
          layout
          className="h-full w-full"
        >
          <motion.div
            ref={c2Ref}
            id="container2__"
            className="flex flex-row h-full w-full"
          >
            <div
              className="flex flex-col w-full lg:w-[70.8%] border-r-2 border-white"
            >
              <div
                ref={containerHeigthRef}
                id="container__height"
                className="w-full overflow-hidden relative"
              >
                <LessData />
              </div>
              <ShowMoreMediaData
                fn={handleShowMore}
              />
              <ProductMeta
                data={sectionTypeData}
              />
              <Carousel
                instanceId={1}
                data={sectionTypeData.Media.slice(0)}
                data_length={sectionTypeData.Media.length}
                title={'Complete the look'}
              />
              <Carousel2
                instanceId={'xsdfjas9i2'}
                data={sectionTypeData.Media.slice(0)}
                data_length={sectionTypeData.Media.length}
                title={'Recently viewed items'}
              />
            </div>
            <Panel
              data={sectionTypeData}
              sizesData={dynamicSizesData}
              colorsData={modelColorsData}
            />
          </motion.div>
        </motion.div>
      </>
    )
  }

  return (
    <>
      {
        visible ?
          <div
          >
            <ModalMedia />
          </div>
          : <div
            id="c-mainMedia"
            className="flex flex-col"
          >
            <MainMedia />
            <AuthBanner />
            <Footer />
          </div>
      }
    </>
  )
}