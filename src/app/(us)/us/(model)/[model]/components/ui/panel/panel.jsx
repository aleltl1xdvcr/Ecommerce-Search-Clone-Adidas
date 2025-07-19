// 'use client'

// import { useEffect } from 'react'
// import AddToBag from './components/addToBag'
// import ModelColors from './components/modelColors'
// import Rest from './components/rest'
// import Sizes from './components/sizes'

// let heightFlag = false
// let hasAppliedMtcu = false

// export default function Panel({ data, sizesData, colorsData }) {

//   let obj = {
//     scrollY: {
//       prev: 0,
//       current: 0,
//       prevType: null,
//       currentType: null,
//     }
//   }

//   useEffect(() => {
//     const authBannerContainerEl = document.getElementById('auth-banner-div1')
//     const navEl = document.getElementById('container_navAndadTop')
//     const z = document.getElementById('z')
//     const subStickyEl = document.getElementById('sub-sticky-container')
//     const stickyElHeight = z.getBoundingClientRect().height

//     function setStickyElementBaseHeight() {
//       if (heightFlag === true) return
//       z.style.height = `${stickyElHeight}px`
//       heightFlag = true
//     }

//     function fnSubScrollFixer(y) {
//       obj.scrollY.prev = obj.scrollY.current
//       obj.scrollY.current = y
//       obj.scrollY.prevType = obj.scrollY.currentType

//       if (obj.scrollY.current > obj.scrollY.prev) {
//         obj.scrollY.currentType = 'down'
//       } else if (obj.scrollY.current < obj.scrollY.prev) {
//         obj.scrollY.currentType = 'up'
//       }
//     }

//     function fnSubScrollFixer2(el, mtd, mtcu, ht, y, hc, hiddenTop, hb, wh) {
//       const prevType = obj.scrollY.prevType
//       const currentType = obj.scrollY.currentType

//       if (0 <= navEl.getBoundingClientRect().bottom) {
//         el.style.marginTop = '0px'
//         subStickyEl.style.position = ''
//         subStickyEl.style.top = ''
//         subStickyEl.style.bottom = ''
//       } else if (currentType === 'down' && hb <= wh) {
//         if (subStickyEl.getBoundingClientRect().bottom <= authBannerContainerEl.getBoundingClientRect().top) {
//           if (Math.abs(subStickyEl.getBoundingClientRect().bottom) >= authBannerContainerEl.getBoundingClientRect().top) return
//           if (hasAppliedMtcu) return
//           subStickyEl.style.position = 'fixed'
//           subStickyEl.style.top = ''
//           subStickyEl.style.bottom = '0px'
//         } else if (subStickyEl.getBoundingClientRect().bottom >= Math.abs(authBannerContainerEl.getBoundingClientRect().top)) {
//           if (hasAppliedMtcu) return
//           const custom_mtcu = Math.abs((y - (y / 16.8)) - hiddenTop) + 'px'
//           el.style.marginTop = custom_mtcu
//           subStickyEl.style.position = ''
//           subStickyEl.style.top = ''
//           subStickyEl.style.bottom = ''
//           hasAppliedMtcu = true
//         }
//       } else if (
//         currentType === 'up' && prevType === 'down' ||
//         (currentType === 'down' && subStickyEl.style.position === 'fixed' && hb >= wh)
//       ) {
//         if (hasAppliedMtcu) return
//         el.style.marginTop = mtcu
//         subStickyEl.style.position = ''
//         subStickyEl.style.top = ''
//         subStickyEl.style.bottom = ''
//       }
//       if (currentType === 'up' && y <= ht && 0
//         > navEl.getBoundingClientRect().bottom) {
//         subStickyEl.style.position = 'fixed'
//         subStickyEl.style.top = '0px'
//         hasAppliedMtcu = false
//       }
//     }

//     function fnScrollFixer(e) {
//       const y = window.scrollY
//       const hb = z.getBoundingClientRect().bottom
//       const ht = Math.abs(z.offsetTop)
//       const wh = window.innerHeight
//       const hiddenTop = Math.max(0, -subStickyEl.getBoundingClientRect().top)
//       const marginTopCaseDown = Math.abs((y / 1) - 180) + 'px'
//       const marginTopCaseUp = Math.abs((y - 180) - hiddenTop) + 'px'
//       fnSubScrollFixer(y)
//       fnSubScrollFixer2(z, marginTopCaseDown, marginTopCaseUp, ht, y, stickyElHeight, hiddenTop, hb, wh)
//     }

//     window.addEventListener('scroll', (e) => fnScrollFixer(e))
//     setStickyElementBaseHeight()

//     return () => {
//       window.removeEventListener('scroll', (e) => fnScrollFixer(e))
//     }
//   }, [])

//   function FinalPart() {
//     return (
//       <div
//       >
//         {
//           !data[0]?.description ?
//             null
//             : <div
//               className="flex flex-col gap-1"
//             >
//               <h1
//                 className="font-bold text-[17px]"
//               >
//                 {data?.[0].ShortDescription.Title}
//               </h1>
//               <p
//                 className="text-[15px] text-neutral-200"
//               >
//                 {data[0].ShortDescription.ShortDescription}
//               </p>
//             </div>
//         }
//         <Sizes
//           dataSizes={sizesData}
//         />
//         <AddToBag />
//         <Rest />


//         {/* FILL start */}


//         <AddToBag />
//         <Rest />

//         {/* FILL end */}

//       </div>
//     )
//   }

//   return (
//     <div
//       className='w-[31.3%]= w-full'
//     >
//       <div
//         id='z'
//         className="w-full relative"
//       >
//         <div
//           id='z2'
//           className='relative'
//         >
//           <div
//             id='sticky-container2'
//             className=' bg-transparent'
//           >
//             <div
//               id='sub-sticky-container'
//               className='px-8'
//             >
//               <ul
//                 id='topRef'
//                 className="flex flex-row items-center"
//               >
//                 {
//                   data[0].Categories.map((i, index) => (
//                     <li
//                       key={index}
//                       className="text-[14px]"
//                     >
//                       {i}
//                     </li>
//                   ))
//                 }
//               </ul>
//               <h1
//                 className="text-[30px] font-bold leading-tight"
//               >
//                 {data[0].Name}
//               </h1>
//               <span>
//                 <data value={data[0].Price}>${data[0].Price}</data>
//               </span>
//               <ModelColors
//                 data={colorsData}
//               />
//               <FinalPart />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }















'use client'

import { useEffect } from 'react'
import AddToBag from './components/addToBag'
import ModelColors from './components/modelColors'
import Rest from './components/rest'
import Sizes from './components/sizes'

let heightFlag = false
let hasAppliedMtcu = false

export default function Panel({ data, sizesData, colorsData }) {

  let obj = {
    scrollY: {
      prev: 0,
      current: 0,
      prevType: null,
      currentType: null,
    }
  }

  useEffect(() => {
    const authBannerContainerEl = document.getElementById('auth-banner-div1')
    const navEl = document.getElementById('container_navAndadTop')
    const z = document.getElementById('z')
    const subStickyEl = document.getElementById('sub-sticky-container')
    const stickyElHeight = z.getBoundingClientRect().height

    function setStickyElementBaseHeight() {
      if (heightFlag === true) return
      z.style.height = `${stickyElHeight}px`
      heightFlag = true
    }

    function fnSubScrollFixer(y) {
      obj.scrollY.prev = obj.scrollY.current
      obj.scrollY.current = y
      obj.scrollY.prevType = obj.scrollY.currentType

      if (obj.scrollY.current > obj.scrollY.prev) {
        obj.scrollY.currentType = 'down'
      } else if (obj.scrollY.current < obj.scrollY.prev) {
        obj.scrollY.currentType = 'up'
      }
    }

    function fnSubScrollFixer2(el, mtd, mtcu, ht, y, hc, hiddenTop, hb, wh) {
      const prevType = obj.scrollY.prevType
      const currentType = obj.scrollY.currentType

      if (0 <= navEl.getBoundingClientRect().bottom) {
        el.style.marginTop = '0px'
        subStickyEl.style.position = ''
        subStickyEl.style.top = ''
        subStickyEl.style.bottom = ''
      } else if (currentType === 'down' && hb <= wh) {
        if (subStickyEl.getBoundingClientRect().bottom <= authBannerContainerEl.getBoundingClientRect().top) {
          if (Math.abs(subStickyEl.getBoundingClientRect().bottom) >= authBannerContainerEl.getBoundingClientRect().top) return
          if (hasAppliedMtcu) return
          subStickyEl.style.position = 'fixed'
          subStickyEl.style.top = ''
          subStickyEl.style.bottom = '0px'
        } else if (subStickyEl.getBoundingClientRect().bottom >= Math.abs(authBannerContainerEl.getBoundingClientRect().top)) {
          if (hasAppliedMtcu) return
          // 16.8
          const custom_mtcu = Math.abs((y - (y / 20.8)) - hiddenTop) + 'px'
          el.style.marginTop = custom_mtcu
          subStickyEl.style.position = ''
          subStickyEl.style.top = ''
          subStickyEl.style.bottom = ''
          hasAppliedMtcu = true
        }
      } else if (
        currentType === 'up' && prevType === 'down' ||
        (currentType === 'down' && subStickyEl.style.position === 'fixed' && hb >= wh)
      ) {
        if (hasAppliedMtcu) return
        el.style.marginTop = mtcu
        subStickyEl.style.position = ''
        subStickyEl.style.top = ''
        subStickyEl.style.bottom = ''
      }
      if (currentType === 'up' && y <= ht && 0
        > navEl.getBoundingClientRect().bottom) {
        subStickyEl.style.position = 'fixed'
        subStickyEl.style.top = '0px'
        hasAppliedMtcu = false
      }
    }

    function fnScrollFixer(e) {
      const y = window.scrollY
      const hb = z.getBoundingClientRect().bottom
      const ht = Math.abs(z.offsetTop)
      const wh = window.innerHeight
      const hiddenTop = Math.max(0, -subStickyEl.getBoundingClientRect().top)
      const marginTopCaseDown = Math.abs((y / 1) - 180) + 'px'
      const marginTopCaseUp = Math.abs((y - 180) - hiddenTop) + 'px'
      fnSubScrollFixer(y)
      fnSubScrollFixer2(z, marginTopCaseDown, marginTopCaseUp, ht, y, stickyElHeight, hiddenTop, hb, wh)
    }

    window.addEventListener('scroll', (e) => fnScrollFixer(e))
    setStickyElementBaseHeight()

    return () => {
      window.removeEventListener('scroll', (e) => fnScrollFixer(e))
    }
  }, [])

  function FinalPart() {
    return (
      <div
      >
        {
          !data?.description ?
            null
            : <div
              className="flex flex-col gap-1"
            >
              <h1
                className="font-bold text-[17px]"
              >
                {data?.Name}
              </h1>
              <p
                className="text-[15px] text-neutral-200"
              >
                {data.ShortDescription}
              </p>
            </div>
        }
        <Sizes
          dataSizes={sizesData}
        />
        <AddToBag />
        <Rest />


        {/* FILL start */}


       
        {/* FILL end */}

      </div>
    )
  }

  return (
    <div
      className='hidden lg:w-[29.2%]'
    >
      <div
        id='z'
        className="w-full relative"
      >
        <div
          id='z2'
          className='relative'
        >
          <div
            id='sticky-container2'
            className='bg-transparent'
          >
            <div
              id='sub-sticky-container'
              className='px-8'
            >
              <ul
                id='topRef'
                className="flex flex-row items-center"
              >
                {
                  data.Categories?.map((i, index) => (
                    <li
                      key={index}
                      className="text-[14px]"
                    >
                      {i}
                    </li>
                  ))
                }
              </ul>
              <h1
                className="text-[30px] font-bold leading-tight"
              >
                {data.Name}
              </h1>
              <span>
                <data value={data.Price}>${data.Price}</data>
              </span>
              <ModelColors
                data={colorsData}
              />
              <FinalPart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}