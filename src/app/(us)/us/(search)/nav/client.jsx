// 'use client'

// import { useEffect, useRef, useState } from "react"
// import { usePathname } from "next/navigation"
// import { motion, useAnimate } from "motion/react"
// import qs from 'qs'

// import { SiAdidas } from "react-icons/si"
// import { CiShoppingCart } from "react-icons/ci"
// import { RiArrowLeftSLine } from "react-icons/ri"
// import { IoMenu } from "react-icons/io5"
// import { IoMdClose, IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io"
// import { MdOutlineKeyboardArrowRight, MdDarkMode, MdLightMode } from "react-icons/md"
// import { FaUserCircle } from "react-icons/fa"
// import { BiWorld } from "react-icons/bi"
// import { MdOutlineSearch } from "react-icons/md"

// import { InstantSearch } from "react-instantsearch"
// import { algoliasearch } from "algoliasearch"

// import { useThemeStore } from '../../../../store-theme'
// import useQueryStore from "../store/search-store"
// import { useMobileNavbarStore } from "./mobile-nav-store"

// import { getSearchResults } from "../lib/get-search-results"

// import { mobileNavData } from "./mobile-nav-data"
// import './client.css'
// import { generalNavArr } from './data'

// import CustomHits from './mobile-nav/custom-hits'
// import MobileSearch from './mobile-nav/mobile-search'
// import { HITS_PER_PAGE, resetStoreDirectionLeft } from "../config"

// export function removeEmptyOrNull(obj) {
//   return Object.fromEntries(
//     Object.entries(obj)
//       .filter(([_, value]) => value !== '' && value !== null)
//       .map(([key, value]) => {
//         if (typeof value === 'string' && /[A-Z]/.test(value)) {
//           return [key.toLowerCase(), value.toLowerCase()]
//         }
//         return [key, value]
//       })
//   )
// }


// export function removeWord(text, word) {
//   const regex = new RegExp(word, 'gi')
//   return text.replace(regex, '')
// }

// export function toUrlFormat(text) {
//   return text?.split(' ').map(encodeURIComponent).join('+')
// }

// const searchClient = algoliasearch('ORDMAH8987', '2f51aa0a00f8de9929565a76555c1536')
// const indexName = 'adidas-shop'

// export default function Client({ data0 }) {
//   console.log('render')
//   const containerRef = useRef(null)
//   const [_, animate] = useAnimate()
//   const { theme, toggleTheme } = useThemeStore();
//   const [isOpen, setIsOpen] = useState(false)
//   const [tabs, setTabs] = useState({
//     MensSection: false,
//     WomenSection: false,
//     KidsSection: false,
//     SaleSection: false,
//     NewAndtrendingSection: false,
//   })

//   const dataActive = `${Object.entries(tabs).find(i => i[1] === true)?.[0]}_data`
//   const subDataActive = `${Object.entries(tabs).find(i => i[1] === true)?.[0]}`
//   const excludeKeysData0 = Object.keys(data0 || {}).filter(key => key !== 'id' && key !== 'documentId' && key !== 'locale' && key !== 'createdAt' && key !== 'publishedAt' && key !== 'updatedAt')
//   const sectionNamesData = excludeKeysData0.map(i => i + '_data')
//   const sectionNames = sectionNamesData?.map(i => removeWord(i, 'Section_data'))
//   const arr0 = Object.fromEntries(
//     Object.entries(data0 || {}).filter(([key, value]) => excludeKeysData0.includes(key)) || {})
//     ?.[subDataActive]

//   const arr3 = [
//     ['NewAndTrending', 'Shoes', 'Clothing', 'Accesories', 'ShopBySport'],
//     ['NewAndTrending', 'Shoes', 'Clothing', 'Accesories', 'ShopByCollection'],
//     ['NewAndTrending', 'BoysShoes', 'BoysClothing', 'GirlsShoes', 'GirlsClothing', 'BabiesAndToddlers', 'ShopByAge', 'ShopByColor', 'Accesories', 'ShopBySport'],
//     ['FeaturedSale', 'Men', 'Women', 'Kids'],
//     ['NewAndTrending', 'Collaborations', 'OurWorld', 'Sports', 'Originals', 'Collections'],
//   ]

//   const arr2 = Object.keys(tabs).map((i, n) => ({
//     [i]: arr3[n]
//   }))

//   const desiredOrder = arr2
//     .filter(i => Object.keys(i)[0] === subDataActive)?.[0]?.[subDataActive]

//   const navData = Object.entries(arr0 || {}).sort(
//     ([keyA], [keyB]) => {
//       const indexA = desiredOrder.indexOf(keyA)
//       const indexB = desiredOrder.indexOf(keyB)
//       return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB)
//     }
//   )

//   let scrollTimeStamp = { prev: { timeStamp: 0, scrollY: 0 }, current: { timeStamp: 0, scrollY: 0 } }

















//   useEffect(() => {
//     const div1_backnavbar = document.getElementById('div1_backnavbar')
//     const nav = document.getElementById('nav')
//     function fnBacknavbar() {
//       const scrollY = window.scrollY
//       const heightNav = nav.offsetHeight * 1.5
//       if (scrollY > heightNav) {
//         if (div1_backnavbar?.classList.contains('hidden')) {
//           div1_backnavbar?.classList.remove('hidden')
//         }
//       } else if (scrollY <= heightNav) {
//         if (!(div1_backnavbar?.classList.contains('hidden'))) {
//           div1_backnavbar?.classList.add('hidden')
//         }
//       }
//     }

//     const translateNavAnimateTransitionConfig =
//       { duration: 0.5, delay: 0.08, ease: "easeInOut" }

//     async function fnTranslateNav(e) {
//       const currentTimeStamp = scrollTimeStamp.current.timeStamp
//       const currentScrollY = scrollTimeStamp.current.scrollY
//       const prevTimeStamp = scrollTimeStamp.prev.timeStamp
//       const prevScrollY = scrollTimeStamp.prev.scrollY

//       scrollTimeStamp.prev.timeStamp = currentTimeStamp
//       scrollTimeStamp.prev.scrollY = currentScrollY
//       scrollTimeStamp.current.timeStamp = e.timeStamp
//       scrollTimeStamp.current.scrollY = window.scrollY

//       if (currentTimeStamp > prevTimeStamp) {
//         if (currentScrollY > prevScrollY && containerRef.current) {
//           await animate(containerRef.current, { y: -400 }, translateNavAnimateTransitionConfig)
//         } else if (currentScrollY < prevScrollY && containerRef.current) {
//           animate(containerRef.current, { y: 0 }, translateNavAnimateTransitionConfig)
//         }
//       }
//     }

//     const object_modal_nav = {
//       MensSection: false,
//       WomenSection: false,
//       KidsSection: false,
//       SaleSection: false,
//       NewAndtrendingSection: false,
//     }

//     function modal_nav(e) {
//       if (containerRef.current && containerRef.current?.contains(e.target)) return
//       setTabs(object_modal_nav)
//     }


//     if (div1_backnavbar) {
//       window.addEventListener('scroll', () => fnBacknavbar())
//     }

//     window.addEventListener('scroll', (e) => fnTranslateNav(e))
//     window.addEventListener('mouseover', (e) => modal_nav(e))

//     return () => {
//       window.removeEventListener('mouseover', (e) => modal_nav(e))
//       window.removeEventListener('scroll', () => fnBacknavbar())
//       window.removeEventListener('scroll', (e) => fnTranslateNav(e))
//     }
//   }, [])

//   useEffect(() => {
//     return
//     if (theme) {
//       document.documentElement.setAttribute('data-theme', theme)
//       document.documentElement.className = theme
//     }
//   }, [theme])

//   function activateOnly(keyToActivate, type) {
//     if (type === 'CLEAR') {
//       const newTabs = {
//         MensSection: false,
//         WomenSection: false,
//         KidsSection: false,
//         SaleSection: false,
//         NewAndtrendingSection: false,
//       }
//       setTabs(newTabs)
//       return
//     }
//     const newTabs = Object.fromEntries(Object.entries(tabs)
//       .map(([key, _]) => [key, key === keyToActivate ? true : false]))
//       console.log('newtabs', newTabs)
//     if (newTabs) {
//       setTabs(newTabs)
//     }
//   }

//   async function mouseEnterFn(e, type) {
//     const id = e.target.id
//     activateOnly(id, type)
//     // setIsOpen(!isOpen)
//   }

//   const pathname = usePathname().slice(1)

//   const classNamesArrDiv2 = {
//     "default": "bg-white dark:bg-black flex w-full h-fit py-2 items-center flex-col justify-center group transition-colors duration-300",
//   }

//   const classNameDataDiv2 = classNamesArrDiv2[pathname] || classNamesArrDiv2['default']

//   function AdTop() {
//     const [scope, animate] = useAnimate()
//     const placeholdersData = ['FREE STANDARD SHIPING WITH ADICLUB', 'UP TO 40% OFF', 'Don´t FORGET DAD´S GIFT']
//     const [placeholder, setPlaceholder] = useState(0)

//     useEffect(() => {
//       const interval = setInterval(() => {
//         setPlaceholder(prev => (prev + 1) % placeholdersData.length)
//       }, 4000)

//       return () => clearInterval(interval)
//     }, [])

//     return (
//       <div
//         ref={scope}
//         className="w-full h-fit flex justify-center items-center py-2 bg-black text-white dark:bg-white dark:text-black"
//       >
//         <div
//           className="w-fit flex items-center"
//         >
//           <div
//             className={`placeholder__item`}
//             id={placeholdersData[placeholder]}
//           >
//             {
//               placeholdersData?.map((i, n) => (
//                 placeholdersData[n] === placeholdersData[placeholder] ?
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 1.8, delay: 0.2, }}
//                     key={`${n}___${i}__${0}`}
//                     className={`dark:text-black/80 text-neutral-100 text-[12px] flex flex-row gap-5 items-center`}
//                   >
//                     <h1>
//                       {placeholdersData[placeholder]}
//                     </h1>
//                     <IoMdArrowDropdown size={23} className="translate-y-[-1.4px]" />
//                   </motion.div>
//                   : null
//               ))
//             }
//           </div>
//         </div>
//       </div>
//     )
//   }

//   function Search() {
//     const addResultsStore = useQueryStore(state => state.addResultsStore)
//     const setMetadataStore = useQueryStore(state => state.setMeta)
//     const setQueryValueClient = useQueryStore(state => state.setQueryValueClient)
//     const queryValueClient = useQueryStore(state => state.queryValueClient)
//     const queryParams = useQueryStore(state => state.queryParams)
//     const inputRef = useRef(null)

//     function setQuery(newQuery) {
//       setQueryValueClient(newQuery)
//     }

//     function handleURL() {
//       queryParams.query = toUrlFormat(queryValueClient)
//       const queryString = qs.stringify(removeEmptyOrNull(queryParams), {
//         encode: false,
//         addQueryPrefix: true,
//         arrayFormat: 'repeat',
//       })

//       if (queryString) {
//         window.history.pushState(null, '', queryString)
//       }
//     }

//     async function fnSubmitSearchBox() {
//       const data = await getSearchResults('client', 0, HITS_PER_PAGE, queryValueClient)
//       handleURL()

//       if (data) {
//         const { nbHits, query, page, nbPages, facets, facets_stats } = data
//         const objMeta = { nbHits: nbHits, query: query, page: page, nbPages: nbPages, facets: facets, facets_stats: facets_stats }
//         setMetadataStore(objMeta)
//         addResultsStore(data)
//       }
//     }

//     return (
//       <div
//         className="relative w-fit"
//       >
//         <div
//           className="relative w-[200px]"
//         >
//           <form
//             className="flex flex-row bg-gray-300 items-center w-full h-7.5 rounded-[3px] focus-within:border-black focus-within:border-2 dark:border-white absolute z-40 left-0 top-0 translate-y-[-3px]"
//             action=""
//             role="search"
//             noValidate
//             onSubmit={(event) => {
//               event.preventDefault()
//               event.stopPropagation()

//               if (inputRef.current) {
//                 inputRef.current.blur()
//               }
//             }}
//             onReset={(event) => {
//               event.preventDefault()
//               event.stopPropagation()

//               setQuery('')

//               if (inputRef.current) {
//                 inputRef.current.focus()
//               }
//             }}
//           >
//             <label
//               htmlFor="input-client-nav-search"
//             >
//               <input
//                 id='input-client-nav-search'
//                 ref={inputRef}
//                 autoComplete="off"
//                 autoCorrect="off"
//                 autoCapitalize="off"
//                 placeholder="Search"
//                 spellCheck={false}
//                 maxLength={512}
//                 value={queryValueClient}
//                 onChange={(event) => {
//                   setQuery(event.currentTarget.value)
//                 }}
//                 autoFocus
//                 className="outline-none p-2 w-full placeholder:text-[15px] placeholder:text-black/70"
//               />
//             </label>
//             <button
//               onClick={() => fnSubmitSearchBox()}
//             >
//               <MdOutlineSearch
//                 className="pr-1"
//                 size={30}
//               />
//             </button>
//           </form>
//         </div>
//       </div>
//     )
//   }

//   function getDynamicClassNames() {
//     const p = pathname
//     if (p === 'us/x') {
//       return "flex flex-col z-40 fixed top-0 w-full"
//     } else {
//       return "flex flex-col z-40 fixed top-0 w-full"
//     }
//   }

//   const classNamesEl2 = getDynamicClassNames()

//   const cycleTheme = () => {
//     const nextTheme =
//       theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
//     toggleTheme(nextTheme);
//   };

//   const DesktopNav = () => {
  
//     return (
//       <motion.div
//         className="lg:flex justify-center items-start w-full flex-col relative hidden"
//       >
//         <div
//           id="nav"
//           className={classNameDataDiv2}

//         >
//           <div
//             className="flex flex-row items-end w-[93vw] justify-between relative"
//           >
//             <div
//               className="tab"
//             >
//               <SiAdidas
//                 size={58}
//               />
//             </div>
//             <div
//               className="flex flex-row items-end w-fit gap-x-40"
//             >
//               <div
//                 className="absolute w-full left-0 flex justify-center items-center"
//               >
//                 <div
//                   className="flex flex-col w-fit translate-x-[-20px]"
//                 >
//                   <ul
//                     className="flex flex-row items-center"
//                   >
//                     {
//                       sectionNames?.map((i, n) => (
//                         <li
//                           id={`${sectionNames[n]}Section`}
//                           onMouseEnter={(e) => mouseEnterFn(e)}
//                           key={`${i}_${n}`}
//                           className={`${i === 'NewAndTrending' ? 'mr-[250px] lg:mr-[200px] xl:mr-[150px]' : 'pr-6'} cursor-pointer uppercase text-[14px] xl:text-[16px] hover:underline decoration-black dark:decoration-white`}
//                         >
//                           {
//                             i === 'Mens' ? 'Men' : i === 'NewAndTrending' ? 'NEW & TRENDING' : i
//                           }
//                         </li>
//                       ))
//                     }
//                   </ul>
//                 </div>
//               </div>

//               <div
//                 className="flex flex-col items-start"
//               >
//                 <div>
//                   <ul
//                     className="flex flex-row items-center pb-4 py-1 gap-5 text-[12px]"
//                   >
//                     <li
//                       className="hover:underline"
//                     >help</li>
//                     <li
//                       className="hover:underline"
//                     >orders and return</li>
//                     <li
//                       className="hover:underline"
//                     >gift cards</li>
//                     <li
//                       className="hover:underline"
//                     >join adiClub</li>
//                   </ul>
//                 </div>
//                 <div
//                   className="flex flex-row gap-x-5"
//                 >
//                   <InstantSearch
//                     future={{
//                       preserveSharedStateOnUnmount: true,
//                     }}
//                     indexName={indexName}
//                     stalledSearchDelay={500}
//                     searchClient={searchClient}
//                   >
//                     <Search />
//                   </InstantSearch>
            
//                   <div
//                     className="flex flex-row items-center gap-x-5"
//                   >
//                     <span
//                       className="cursor-pointer relative w-[20px] h-full"
//                     >
//                       <span
//                         className="absolute z-40 flex items-start"
//                       >
//                         {theme === 'dark'
//                           ? <MdDarkMode
//                             onClick={() => cycleTheme('light')}
//                             size={23}
//                           />
//                           : theme === 'light'
//                             ? <MdLightMode
//                               onClick={() => cycleTheme('light')}
//                               size={23}
//                             />
//                             : <MdLightMode
//                               onClick={() => cycleTheme('light')}

//                               size={23}
//                             />
//                         }
//                       </span>
//                     </span>
//                     <BiWorld
//                       size={22}
//                     />
//                     <FaUserCircle
//                       size={22}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div
//           id="target2"
//           className="relative top-0 w-[100vw]"
//         >
//           <motion.div
//             className="absolute w-full left-0 top-0 flex justify-center z-40"
//           >
//             <motion.div
//               layout
//               key={'+asd32'}
//               className="flex flex-row flex-wrap gap-3 items-center justify-center bg-white dark:bg-black dark:group-hover:bg-neutral-900¿ w-[100vw] shrink-0 border-b-2 border-white dark:border-b-2 dark:border-black"
//             >
//               {sectionNames && sectionNames?.map((i, n) => (
//                 `${Object.entries(tabs || null)?.find(i => i?.[1] === true)?.[0]}_data` === sectionNamesData?.[n] ?
//                   <motion.div
//                     layout
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.2, delay: 0.1 }}
//                     exit={{ y: 0, opacity: 0 }}
//                     key={`${i}___${n}__${dataActive}`}
//                     className="flex flex-col items-start pt-5 justify-center"
//                   >

//                     <div
//                       className={`gap-6 flex-wrap flex flex-row w-full`}
//                     >
//                       {
//                         navData?.map((i, n) => (
//                           i[0] === 'NewAndTrending' ?
//                             <div
//                               key={`${i}__${n}`}
//                               className={`flex flex-row pl-4 border-r border-white/40 pr-[120px]`}
//                             >
//                               <div
//                                 className="w-full flex flex-col gap-1"
//                               >
//                                 <h1
//                                   className="font-bold"
//                                 >
//                                   {i[1].SectionName}
//                                 </h1>
//                                 <ul
//                                   className="flex flex-col"
//                                 >
//                                   {
//                                     i[1]?.list
//                                       ? i[1]?.list.map((item, index) => (
//                                         <li
//                                           key={`${item}_${index}_`}
//                                         >{item}</li>
//                                       ))
//                                       : i[1]?.listOfSections
//                                         ? i[1]?.listOfSections.map((item, index) => (
//                                           <li
//                                             key={`${item}__${index}_`}
//                                           >{item}</li>
//                                         ))
//                                         : i[1]?.list
//                                           ? i[1]?.list.map((item, index) => (
//                                             <li
//                                               key={`${item}___${index}_`}
//                                             >{item}</li>
//                                           ))
//                                           : null
//                                   }
//                                 </ul>
//                               </div>
//                             </div>
//                             :
//                             <div
//                               key={n}
//                               className={`flex flex-row px-5 pb-5`}
//                             >
//                               <div
//                                 className="w-full gap-1 flex flex-col"
//                               >
//                                 <h1
//                                   className="font-bold"
//                                 >
//                                   {i[1].SectionName}
//                                 </h1>
//                                 <ul
//                                   className="flex flex-col text-[14px]"
//                                 >
//                                   {
//                                     i[1]?.ListOfSections?.map((item, index) => (
//                                       <li
//                                         key={`${item}__${index}_`}
//                                       >{item}</li>
//                                     ))
//                                   }
//                                 </ul>
//                               </div>
//                             </div>
//                         ))
//                       }
//                     </div>
//                     <div
//                       className="w-full flex justify-center items-center border-t border-white/40 py-4"
//                     >
//                       <ul
//                         className="flex flex-row justify-between w-11/12"
//                       >
//                         {
//                           generalNavArr.find(i => i.name === subDataActive.slice(0, -8) || i.name === subDataActive.slice(0, -7)).list.map((i, index) => (
//                             <li
//                               key={index}
//                             >
//                               {i}
//                             </li>
//                           ))
//                         }
//                       </ul>
//                     </div>
//                   </motion.div>
//                   : null
//               ))}
//             </motion.div>
//           </motion.div>
//         </div>
//       </motion.div>
//     )
//   }

//   const MobileNav = () => {
//     const transitionConfig = 'transform 0.6s ease'
//     const containerMenuModalRef = useRef(null)
//     const containerSearchModal = useRef(null)
//     const slideLeftWrapperRef = useRef(null)
//     const setIsOpenWrapperLeftLevel0 = useMobileNavbarStore(state => state.setIsOpenWrapperLeftLevel0)
//     const resetStore = useMobileNavbarStore(state => state.resetStore)
//     const setIsOpenSearchWrapperRightLevel0 = useMobileNavbarStore(state => state.setIsOpenSearchWrapperRightLevel0)

//     function isLevelChangeAllowed(targetKey) {
//       const dataKeyLevel0 = useMobileNavbarStore.getState().dataKey
//       const dataKeyLevel1 = useMobileNavbarStore.getState().dataKeyLevel1
//       const dataKeyLevel2 = useMobileNavbarStore.getState().dataKeyLevel2
//       const currentLevel = useMobileNavbarStore.getState().currentLevel

//       let level
//       const level0 = dataKeyLevel0.prevIndexKey
//       const level1 = dataKeyLevel1.prevIndexKey
//       const keyLevel1 = dataKeyLevel1.key
//       const keyLevel2 = dataKeyLevel2.key
//       level0 ? level = level0 : level1 ? level = level1 : level = null

//       if (currentLevel === 0) {
//         const result = Object.values(mobileNavData)[level]?.[targetKey] !== null
//         return result
//       } else if (currentLevel === 1) {
//         const result = Object.values(mobileNavData)[dataKeyLevel0.prevIndexKey][targetKey] !== null
//         return result
//       } else if (currentLevel === 2) {
//         const result = Object.values(mobileNavData)[dataKeyLevel0.prevIndexKey][keyLevel1][targetKey] !== null
//         return result
//       } else if (currentLevel === 3) {
//         const result = Object.values(mobileNavData)[dataKeyLevel0.prevIndexKey][keyLevel1][keyLevel2][targetKey] !== null
//         return result
//       } else return null
//     }

//     const SlideLeftWrapper = () => {
//       const setIsOpenWrapperLeftLevel1 = useMobileNavbarStore(state => state.setIsOpenWrapperLeftLevel1)
//       const isOpenWrapperLeftLevel1 = useMobileNavbarStore(state => state.isOpenWrapperLeftLevel1)
//       const dataKey = useMobileNavbarStore(state => state.dataKey)
//       const setDataKeyLevel1 = useMobileNavbarStore(state => state.setDataKeyLevel1)
//       const setIsOpenWrapperLeftLevel2 = useMobileNavbarStore(state => state.setIsOpenWrapperLeftLevel2)

//       function localToggle(index, typeLevel1, typeLevel2, targetKey) {
//         if (!isLevelChangeAllowed(targetKey)) return
//         setIsOpenWrapperLeftLevel1(typeLevel1)
//         setIsOpenWrapperLeftLevel2(typeLevel2)

//         const newDataKey = Object.keys(Object.values(mobileNavData)[dataKey.prevIndexKey][dataKey.data[index]] || {})
//         const key = dataKey.data[index]
//         const prevIndexKey = dataKey.prevIndexKey
//         setDataKeyLevel1(newDataKey, key, prevIndexKey)
//       }

//       return (
//         <div
//           id="SlideLeftWrapperEl"
//           ref={slideLeftWrapperRef}
//           style={{
//             transform: `translateX(${isOpenWrapperLeftLevel1})`,
//             transition: transitionConfig,
//           }}
//           className="mobile-slide-left-wrapper-el-z dark:bg-black dark:text-white bg-white fixed top-0 left-0 w-full h-screen z-40 text-black"
//         >
//           <div
//             className="opacity-100 flex flex-row justify-between items-center py-3 px-3"
//           >
//             <div
//               className="flex flex-row items-center"
//             >
//               <RiArrowLeftSLine
//                 onClick={() => localToggle(null, 'close')}
//                 className="text-[30px]"
//               />
//               <h1
//                 className="text-[22px] font-bold uppercase translate-y-[-1px]"
//               >
//                 {
//                   dataKey.key
//                 }
//               </h1>
//             </div>
//             <IoMdClose
//               onClick={() => resetStore(resetStoreDirectionLeft)}
//               className="text-[30px]"
//             />
//           </div>

//           <ul
//             className="flex flex-col gap-5 px-10"
//           >
//             {
//               Array.isArray(dataKey.data) &&
//               dataKey.data.map((i, n) => (
//                 <div
//                   key={n}
//                   onClick={() => localToggle(n, null, 'open', i)}
//                   className="w-full flex flex-row items-center justify-between cursor-pointer"
//                 >
//                   <li
//                     className="text-[18px]"
//                   >
//                     {i}
//                   </li>
//                   {
//                     isLevelChangeAllowed(i) ?
//                       <MdOutlineKeyboardArrowRight
//                         className="text-[26px]"
//                       />
//                       : null
//                   }
//                 </div>
//               ))
//             }
//           </ul>
//         </div>
//       )
//     }

//     const SlideLeftWrapperLevel2 = () => {
//       const setIsOpenWrapperLeftLevel3 = useMobileNavbarStore(state => state.setIsOpenWrapperLeftLevel3)
//       const setDataKeyLevel2 = useMobileNavbarStore(state => state.setDataKeyLevel2)
//       const dataKeyLevel1 = useMobileNavbarStore(state => state.dataKeyLevel1)
//       const isOpenWrapperLeftLevel2 = useMobileNavbarStore(state => state.isOpenWrapperLeftLevel2)
//       const dataKey = useMobileNavbarStore(state => state.dataKey)
//       const datakeyLevel1 = useMobileNavbarStore(state => state.dataKeyLevel1)
//       const setIsOpenWrapperLeftLevel2 = useMobileNavbarStore(state => state.setIsOpenWrapperLeftLevel2)

//       function localToggle(index, typeActionLevel2, typeActionLevel3, targetKey) {
//         if (!isLevelChangeAllowed(targetKey)) return
//         setIsOpenWrapperLeftLevel2(typeActionLevel2)
//         setIsOpenWrapperLeftLevel3(typeActionLevel3)
//         const newDataKey =
//           Object.keys(Object.values(mobileNavData)[dataKey.prevIndexKey][datakeyLevel1.key][dataKeyLevel1.data[index]] || {})
//         const key = dataKeyLevel1.data[index]
//         const prevIndexKey = dataKey.prevIndexKey
//         setDataKeyLevel2(newDataKey, key, prevIndexKey)
//       }

//       return (
//         <div
//           style={{
//             transform: `translateX(${isOpenWrapperLeftLevel2})`,
//             transition: transitionConfig,
//           }}
//           className="mobile-slide-left-wrapper-level2-el-z bg-purple-500¿ bg-white fixed top-0 left-0 w-full h-screen z-40 text-black"
//         >
//           <div
//             className="opacity-100 flex flex-row justify-between items-center py-3 px-3"
//           >
//             <div
//               className="flex flex-row items-center"
//             >
//               <RiArrowLeftSLine
//                 onClick={() => localToggle(null, 'close', null, null)}
//                 className="text-[30px]"
//               />
//               <h1
//                 className="text-[22px] font-bold uppercase translate-y-[-1px]"
//               >
//                 {
//                   dataKeyLevel1.key
//                 }
//               </h1>
//             </div>
//             <IoMdClose
//               onClick={() => resetStore(resetStoreDirectionLeft)}
//               className="text-[30px]"
//             />
//           </div>

//           <ul
//             className="flex flex-col gap-5 px-10"
//           >
//             {
//               Array.isArray(dataKeyLevel1.data) &&
//               dataKeyLevel1.data.map((i, n) => (
//                 <div
//                   onClick={() => localToggle(n, null, 'open', i)}
//                   key={n}
//                   className="w-full flex flex-row items-center justify-between cursor-pointer"
//                 >
//                   <li
//                     className="text-[18px]"
//                   >
//                     {i}
//                   </li>
//                   {
//                     isLevelChangeAllowed(i) ?
//                       <MdOutlineKeyboardArrowRight
//                         className="text-[26px]"
//                       />
//                       : null
//                   }
//                 </div>
//               ))
//             }
//           </ul>
//         </div>
//       )
//     }

//     const SlideLeftWrapperLevel3 = () => {
//       const setIsOpenWrapperLeftLevel3 = useMobileNavbarStore(state => state.setIsOpenWrapperLeftLevel3)
//       const isOpenWrapperLeftLevel3 = useMobileNavbarStore(state => state.isOpenWrapperLeftLevel3)
//       const dataKeyLevel2 = useMobileNavbarStore(state => state.dataKeyLevel2)

//       return (
//         <div
//           style={{
//             transform: `translateX(${isOpenWrapperLeftLevel3})`,
//             transition: transitionConfig,
//           }}
//           className="mobile-slide-left-wrapper-level3-el-z bg-white dark:bg-black dark:text-white fixed top-0 left-0 w-full h-screen z-40 text-black"
//         >
//           <div
//             className="opacity-100 flex flex-row justify-between items-center py-3 px-3"
//           >
//             <div
//               className="flex flex-row items-center"
//             >
//               <RiArrowLeftSLine
//                 onClick={() => setIsOpenWrapperLeftLevel3('close')}
//                 className="text-[30px]"
//               />
//               <h1
//                 className="text-[22px] font-bold uppercase translate-y-[-1px]"
//               >
//                 {
//                   dataKeyLevel2.key
//                 }
//               </h1>
//             </div>
//             <IoMdClose
//               onClick={() => resetStore(resetStoreDirectionLeft)}
//               className="text-[30px]"
//             />
//           </div>

//           <ul
//             className="flex flex-col gap-5 px-10"
//           >
//             {
//               Array.isArray(dataKeyLevel2.data) &&
//               dataKeyLevel2.data.map((i, n) => (
//                 <div
//                   key={n}
//                   className="w-full flex flex-row items-center justify-between cursor-pointer"
//                 >
//                   <li
//                     className="text-[18px]"
//                   >
//                     {i}
//                   </li>
//                   {
//                     isLevelChangeAllowed(i) ?
//                       <MdOutlineKeyboardArrowRight
//                         className="text-[26px]"
//                       />
//                       : null
//                   }
//                 </div>
//               ))
//             }
//           </ul>
//         </div>
//       )
//     }

//     const MenuModal = () => {
//       const isOpenWrapperLeftLevel0 = useMobileNavbarStore(state => state.isOpenWrapperLeftLevel0)
//       const setIsOpenWrapperLeftLevel1 = useMobileNavbarStore(state => state.setIsOpenWrapperLeftLevel1)
//       const setDataKey = useMobileNavbarStore(state => state.setDataKey)

//       const arr = [
//         "My Account",
//         "Exchanges & Returns",
//         "Order Tracker",
//         "adiClub",
//         "Gift Cards",
//         "Store Locator",
//         "Mobile Apps",
//         "FEEDBACK",
//       ]

//       function localToggle(index, type) {
//         const i = sectionNames[index || 0]
//         const dataKey = Object.keys(Object.values(mobileNavData)[index || 0])
//         const key = i === 'Mens' ? 'Men' : i === 'NewAndTrending' ? 'NEW & TRENDING' : i
//         const prevIndexKey = index
//         setDataKey(dataKey, key, prevIndexKey)
//         setIsOpenWrapperLeftLevel1(type)
//       }

//       return (
//         <div
//           ref={containerMenuModalRef}
//           style={{
//             transform: `translateX(${isOpenWrapperLeftLevel0})`,
//             transition: transitionConfig,
//           }}
//           className="mobile-menu-modal-el-z dark:bg-black dark:text-white bg-white fixed top-0 left-0 w-full h-screen z-40 text-black flex flex-col justify-start items-start"
//         >
//           <div
//             className="w-full flex justify-end items-start py-2 border-b border-black/10 dark:border-white/10"
//           >
//             <div
//               className="opacity-100 w-[56%] flex flex-row justify-between items-center"
//             >
//               <SiAdidas
//                 className="text-[50px]"
//               />
//               <div
//                 className="relatv¿e w-[37px] h-[30px]"
//               >
//                 <IoMdClose
//                   onClick={() => resetStore(resetStoreDirectionLeft)}
//                   className="text-[30px]"
//                 />
//               </div>
//             </div>
//           </div>

//           <div
//             className="flex flex-col items-start w-full px-8 my-5 overflow-y-auto"
//           >
//             <ul
//               className="flex flex-col items-start w-full gap-5 pb-5"
//             >
//               {
//                 sectionNames?.map((i, n) => (
//                   <div
//                     key={n}
//                     id={`${sectionNames[n]}Section`}
//                     onClick={() => localToggle(n, 'open')}
//                     className="flex flex-row w-full items-center justify-between cursor-pointer"
//                   >
//                     <li
//                       key={`${i}_${n}`}
//                       className={`text-[22px] uppercase`}
//                     >
//                       {
//                         i === 'Mens' ? 'Men' : i === 'NewAndTrending' ? 'NEW & TRENDING' : i
//                       }
//                     </li>
//                     <IoMdArrowDropright
//                       className="text-[22px]"
//                     />
//                   </div>
//                 ))
//               }
//             </ul>

//             <ul
//               className="flex flex-col gap-5 text-[20px] pt-5 border-t border-black/10 dark:border-white/10 w-full"
//             >
//               {
//                 arr.map((i, n) => (
//                   <li
//                     key={n}
//                   >
//                     {i}
//                   </li>
//                 ))
//               }
//             </ul>
//           </div>
//         </div>
//       )
//     }

//     const SearchModal = () => {
//       const isOpenSearchWrapperRightLevel0 = useMobileNavbarStore(state => state.isOpenSearchWrapperRightLevel0)
//       const setIsOpenSearchWrapperRightLevel0 = useMobileNavbarStore(state => state.setIsOpenSearchWrapperRightLevel0)
//       function localToggle(type) {
//         setIsOpenSearchWrapperRightLevel0(type)
//       }
//       return (
//         <InstantSearch
//           future={{
//             preserveSharedStateOnUnmount: true,
//           }}
//           indexName={indexName}
//           searchClient={searchClient}
//         >
//           <div
//             ref={containerSearchModal}
//             style={{
//               transform: `translateX(${isOpenSearchWrapperRightLevel0})`,
//               transition: transitionConfig,
//             }}
//             className="bg-white dark:bg-black dark:text-white fixed top-0 left-0 flex flex-col w-full h-screen z-40 text-black"
//           >
//             <div
//               className="opacity-100 py-4 w-full bg-gray-300 dark:bg-neutral-700"
//             >
//               <div
//                 className='flex flex-row gap-5 px-4 w-full dark:focus-within:border-white focus-within:border-black focus-within:border-y-2'
//               >
//                 <RiArrowLeftSLine
//                   onClick={() => localToggle('close')}
//                   className="text-[30px]"
//                 />
//                 <MobileSearch />
//               </div>
//             </div>
//             <CustomHits />
//           </div>
//         </InstantSearch>
//       )
//     }

//     return (
//       <>
//         <SlideLeftWrapperLevel3 />
//         <SlideLeftWrapperLevel2 />
//         <SlideLeftWrapper />
//         <MenuModal />
//         <SearchModal />
//         <div
//           className="lg:hidden bg-white dark:bg-black flex justify-center items-center w-full"
//         >
//           <div
//             className="w-[93vw] py-2 h-full flex flex-row gap-x-5 items-center justify-between"
//           >
//             <div
//               className="flex flex-row items-start gap-x-5"
//             >
//               <div
//                 className="opacity-100"
//               >
//                 <IoMenu
//                   onClick={() => setIsOpenWrapperLeftLevel0('open')}
//                   className="text-[30px]"
//                 />
//               </div>

//               <span
//                 className="cursor-pointer relative w-[20px]"
//               >
//                 <span
//                   className="absolute z-30 flex items-start h-full top-[4px] text-[23px]"
//                 >
//                   {
//                     theme === 'dark'
//                       ? <MdDarkMode
//                         onClick={() => cycleTheme('dark')}
//                       />
//                       : theme === 'light'
//                         ? <MdLightMode
//                           onClick={() => cycleTheme('light')}
//                         />
//                         : <MdLightMode
//                           onClick={() => cycleTheme('light')}
//                         />
//                   }
//                 </span>
//               </span>

//             </div>
//             <div>
//               <div
//                 className="opacity-100 transition-opacity duration-300 ease-in-out"
//               >
//                 <SiAdidas
//                   className="text-[50px]"
//                 />
//               </div>
//             </div>
//             <div
//               className="flex flex-row items-center gap-x-5"
//             >
//               <FaUserCircle
//                 className="text-[23px]"
//               />
//               <button
//                 onClick={() => setIsOpenSearchWrapperRightLevel0('open')}
//               >
//                 <MdOutlineSearch
//                   className="text-[30px]"
//                 />
//               </button>
//               <CiShoppingCart
//                 className="text-[28px]"
//               />
//             </div>
//           </div>
//         </div>
//       </>
//     )
//   }

//   return (
//     <>
//       <motion.div
//         ref={containerRef}
//         id="container_navAndadTop"
//         className={classNamesEl2}
//       >
//         <AdTop />
//         <DesktopNav />
//         <MobileNav />
//       </motion.div>
//     </>
//   )
// }

























'use client'

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, useAnimate } from "motion/react"
import qs from 'qs'

import { SiAdidas } from "react-icons/si"
import { CiShoppingCart } from "react-icons/ci"
import { RiArrowLeftSLine } from "react-icons/ri"
import { IoMenu } from "react-icons/io5"
import { IoMdClose, IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io"
import { MdOutlineKeyboardArrowRight, MdDarkMode, MdLightMode } from "react-icons/md"
import { FaUserCircle } from "react-icons/fa"
import { BiWorld } from "react-icons/bi"
import { MdOutlineSearch } from "react-icons/md"

import { InstantSearch } from "react-instantsearch"
import { algoliasearch } from "algoliasearch"

import { useThemeStore } from '../../../../store-theme'
import useQueryStore from "../store/search-store"
import { useMobileNavbarStore } from "./mobile-nav-store"

import { getSearchResults } from "../lib/get-search-results"

import { mobileNavData } from "./mobile-nav-data"
import './client.css'
import { generalNavArr } from './data'

import CustomHits from './mobile-nav/custom-hits'
import MobileSearch from './mobile-nav/mobile-search'
import { HITS_PER_PAGE, resetStoreDirectionLeft } from "../config"

export function removeEmptyOrNull(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, value]) => value !== '' && value !== null)
      .map(([key, value]) => {
        if (typeof value === 'string' && /[A-Z]/.test(value)) {
          return [key.toLowerCase(), value.toLowerCase()]
        }
        return [key, value]
      })
  )
}


export function removeWord(text, word) {
  const regex = new RegExp(word, 'gi')
  return text.replace(regex, '')
}

export function toUrlFormat(text) {
  return text?.split(' ').map(encodeURIComponent).join('+')
}

const searchClient = algoliasearch('ORDMAH8987', '2f51aa0a00f8de9929565a76555c1536')
const indexName = 'adidas-shop'

export default function Client({ data0 }) {
  const containerRef = useRef(null)
  const [_, animate] = useAnimate()
  const { theme, toggleTheme } = useThemeStore();
  let scrollTimeStamp = { prev: { timeStamp: 0, scrollY: 0 }, current: { timeStamp: 0, scrollY: 0 } }

  useEffect(() => {
    const div1_backnavbar = document.getElementById('div1_backnavbar')
    const nav = document.getElementById('nav')
    function fnBacknavbar() {
      const scrollY = window.scrollY
      const heightNav = nav.offsetHeight * 1.5
      if (scrollY > heightNav) {
        if (div1_backnavbar?.classList.contains('hidden')) {
          div1_backnavbar?.classList.remove('hidden')
        }
      } else if (scrollY <= heightNav) {
        if (!(div1_backnavbar?.classList.contains('hidden'))) {
          div1_backnavbar?.classList.add('hidden')
        }
      }
    }

    const translateNavAnimateTransitionConfig =
      { duration: 0.5, delay: 0.08, ease: "easeInOut" }

    async function fnTranslateNav(e) {
      const currentTimeStamp = scrollTimeStamp.current.timeStamp
      const currentScrollY = scrollTimeStamp.current.scrollY
      const prevTimeStamp = scrollTimeStamp.prev.timeStamp
      const prevScrollY = scrollTimeStamp.prev.scrollY

      scrollTimeStamp.prev.timeStamp = currentTimeStamp
      scrollTimeStamp.prev.scrollY = currentScrollY
      scrollTimeStamp.current.timeStamp = e.timeStamp
      scrollTimeStamp.current.scrollY = window.scrollY

      if (currentTimeStamp > prevTimeStamp) {
        if (currentScrollY > prevScrollY && containerRef.current) {
          await animate(containerRef.current, { y: -400 }, translateNavAnimateTransitionConfig)
        } else if (currentScrollY < prevScrollY && containerRef.current) {
          animate(containerRef.current, { y: 0 }, translateNavAnimateTransitionConfig)
        }
      }
    }

    if (div1_backnavbar) {
      window.addEventListener('scroll', () => fnBacknavbar())
    }

    window.addEventListener('scroll', (e) => fnTranslateNav(e))

    return () => {
      window.removeEventListener('scroll', () => fnBacknavbar())
      window.removeEventListener('scroll', (e) => fnTranslateNav(e))
    }
  }, [])

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme)
      document.documentElement.className = theme
    }
  }, [theme])

  const pathname = usePathname().slice(1)

  const classNamesArrDiv2 = {
    "default": "bg-white dark:bg-black flex w-full h-fit py-2 items-center flex-col justify-center group transition-colors duration-300",
  }

  const classNameDataDiv2 = classNamesArrDiv2[pathname] || classNamesArrDiv2['default']

  function AdTop() {
    const [scope, animate] = useAnimate()
    const placeholdersData = ['FREE STANDARD SHIPING WITH ADICLUB', 'UP TO 40% OFF', 'Don´t FORGET DAD´S GIFT']
    const [placeholder, setPlaceholder] = useState(0)

    useEffect(() => {
      const interval = setInterval(() => {
        setPlaceholder(prev => (prev + 1) % placeholdersData.length)
      }, 4000)

      return () => clearInterval(interval)
    }, [])

    return (
      <div
        ref={scope}
        className="w-full h-fit flex justify-center items-center py-2 bg-black text-white dark:bg-white dark:text-black"
      >
        <div
          className="w-fit flex items-center"
        >
          <div
            className={`placeholder__item`}
            id={placeholdersData[placeholder]}
          >
            {
              placeholdersData?.map((i, n) => (
                placeholdersData[n] === placeholdersData[placeholder] ?
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.8, delay: 0.2, }}
                    key={`${n}___${i}__${0}`}
                    className={`dark:text-black/80 text-neutral-100 text-[12px] flex flex-row gap-5 items-center`}
                  >
                    <h1>
                      {placeholdersData[placeholder]}
                    </h1>
                    <IoMdArrowDropdown size={23} className="translate-y-[-1.4px]" />
                  </motion.div>
                  : null
              ))
            }
          </div>
        </div>
      </div>
    )
  }

  function Search() {
    const addResultsStore = useQueryStore(state => state.addResultsStore)
    const setMetadataStore = useQueryStore(state => state.setMeta)
    const setQueryValueClient = useQueryStore(state => state.setQueryValueClient)
    const queryValueClient = useQueryStore(state => state.queryValueClient)
    const queryParams = useQueryStore(state => state.queryParams)
    const inputRef = useRef(null)

    function setQuery(newQuery) {
      setQueryValueClient(newQuery)
    }

    function handleURL() {
      queryParams.query = toUrlFormat(queryValueClient)
      const queryString = qs.stringify(removeEmptyOrNull(queryParams), {
        encode: false,
        addQueryPrefix: true,
        arrayFormat: 'repeat',
      })

      if (queryString) {
        window.history.pushState(null, '', queryString)
      }
    }

    async function fnSubmitSearchBox() {
      const data = await getSearchResults('client', 0, HITS_PER_PAGE, queryValueClient)
      handleURL()

      if (data) {
        const { nbHits, query, page, nbPages, facets, facets_stats } = data
        const objMeta = { nbHits: nbHits, query: query, page: page, nbPages: nbPages, facets: facets, facets_stats: facets_stats }
        setMetadataStore(objMeta)
        addResultsStore(data)
      }
    }

    return (
      <div
        className="relative w-fit"
      >
        <div
          className="relative w-[200px]"
        >
          <form
            className="flex flex-row bg-gray-300 items-center w-full h-7.5 rounded-[3px] focus-within:border-black focus-within:border-2 dark:border-white absolute z-40 left-0 top-0 translate-y-[-3px]"
            action=""
            role="search"
            noValidate
            onSubmit={(event) => {
              event.preventDefault()
              event.stopPropagation()

              if (inputRef.current) {
                inputRef.current.blur()
              }
            }}
            onReset={(event) => {
              event.preventDefault()
              event.stopPropagation()

              setQuery('')

              if (inputRef.current) {
                inputRef.current.focus()
              }
            }}
          >
            <label
              htmlFor="input-client-nav-search"
            >
              <input
                id='input-client-nav-search'
                ref={inputRef}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                placeholder="Search"
                spellCheck={false}
                maxLength={512}
                value={queryValueClient}
                onChange={(event) => {
                  setQuery(event.currentTarget.value)
                }}
                autoFocus
                className="outline-none p-2 w-full placeholder:text-[15px] placeholder:text-black/70"
              />
            </label>
            <button
              onClick={() => fnSubmitSearchBox()}
            >
              <MdOutlineSearch
                className="pr-1"
                size={30}
              />
            </button>
          </form>
        </div>
      </div>
    )
  }

  function getDynamicClassNames() {
    const p = pathname
    if (p === 'us/x') {
      return "flex flex-col z-40 fixed top-0 w-full"
    } else {
      return "flex flex-col z-40 fixed top-0 w-full"
    }
  }

  const classNamesEl2 = getDynamicClassNames()

  const cycleTheme = () => {
    const nextTheme =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    toggleTheme(nextTheme);
  };

  const DesktopNav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [tabs, setTabs] = useState({
      MensSection: false,
      WomenSection: false,
      KidsSection: false,
      SaleSection: false,
      NewAndtrendingSection: false,
    })

    useEffect(() => {
      const object_modal_nav = {
        MensSection: false,
        WomenSection: false,
        KidsSection: false,
        SaleSection: false,
        NewAndtrendingSection: false,
      }

      function modal_nav(e) {
        if (containerRef.current && containerRef.current?.contains(e.target)) return
        setTabs(object_modal_nav)
      }

      window.addEventListener('mouseover', (e) => modal_nav(e))

      return () => {
        window.removeEventListener('mouseover', (e) => modal_nav(e))

      }
    }, [])


    const dataActive = `${Object.entries(tabs).find(i => i[1] === true)?.[0]}_data`
    const subDataActive = `${Object.entries(tabs).find(i => i[1] === true)?.[0]}`
    const excludeKeysData0 = Object.keys(data0 || {}).filter(key => key !== 'id' && key !== 'documentId' && key !== 'locale' && key !== 'createdAt' && key !== 'publishedAt' && key !== 'updatedAt')
    const sectionNamesData = excludeKeysData0.map(i => i + '_data')
    const sectionNames = sectionNamesData?.map(i => removeWord(i, 'Section_data'))
    const arr0 = Object.fromEntries(
      Object.entries(data0 || {}).filter(([key, value]) => excludeKeysData0.includes(key)) || {})
      ?.[subDataActive]

    const arr3 = [
      ['NewAndTrending', 'Shoes', 'Clothing', 'Accesories', 'ShopBySport'],
      ['NewAndTrending', 'Shoes', 'Clothing', 'Accesories', 'ShopByCollection'],
      ['NewAndTrending', 'BoysShoes', 'BoysClothing', 'GirlsShoes', 'GirlsClothing', 'BabiesAndToddlers', 'ShopByAge', 'ShopByColor', 'Accesories', 'ShopBySport'],
      ['FeaturedSale', 'Men', 'Women', 'Kids'],
      ['NewAndTrending', 'Collaborations', 'OurWorld', 'Sports', 'Originals', 'Collections'],
    ]

    const arr2 = Object.keys(tabs).map((i, n) => ({
      [i]: arr3[n]
    }))

    const desiredOrder = arr2
      .filter(i => Object.keys(i)[0] === subDataActive)?.[0]?.[subDataActive]

    const navData = Object.entries(arr0 || {}).sort(
      ([keyA], [keyB]) => {
        const indexA = desiredOrder.indexOf(keyA)
        const indexB = desiredOrder.indexOf(keyB)
        return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB)
      }
    )

    function activateOnly(keyToActivate, type) {
      if (type === 'CLEAR') {
        const newTabs = {
          MensSection: false,
          WomenSection: false,
          KidsSection: false,
          SaleSection: false,
          NewAndtrendingSection: false,
        }
        setTabs(newTabs)
        return
      }
      const newTabs = Object.fromEntries(Object.entries(tabs)
        .map(([key, _]) => [key, key === keyToActivate ? true : false]))
      console.log('newtabs', newTabs)
      if (newTabs) {
        setTabs(newTabs)
      }
    }

    async function mouseEnterFn(e, type) {
      const id = e.target.id
      activateOnly(id, type)
      setIsOpen(!isOpen)
    }

    return (
      <motion.div
        className="lg:flex justify-center items-start w-full flex-col relative hidden"
      >
        <div
          id="nav"
          className={classNameDataDiv2}

        >
          <div
            className="flex flex-row items-end w-[93vw] justify-between relative"
          >
            <div
              className="tab"
            >
              <SiAdidas
                size={58}
              />
            </div>
            <div
              className="flex flex-row items-end w-fit gap-x-40"
            >
              <div
                className="absolute w-full left-0 flex justify-center items-center"
              >
                <div
                  className="flex flex-col w-fit translate-x-[-20px]"
                >
                  <ul
                    className="flex flex-row items-center"
                  >
                    {
                      sectionNames?.map((i, n) => (
                        <li
                          id={`${sectionNames[n]}Section`}
                          onMouseEnter={(e) => mouseEnterFn(e)}
                          key={`${i}_${n}`}
                          className={`${i === 'NewAndTrending' ? 'mr-[250px] lg:mr-[200px] xl:mr-[150px]' : 'pr-6'} cursor-pointer uppercase text-[14px] xl:text-[16px] hover:underline decoration-black dark:decoration-white`}
                        >
                          {
                            i === 'Mens' ? 'Men' : i === 'NewAndTrending' ? 'NEW & TRENDING' : i
                          }
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>

              <div
                className="flex flex-col items-start"
              >
                <div>
                  <ul
                    className="flex flex-row items-center pb-4 py-1 gap-5 text-[12px]"
                  >
                    <li
                      className="hover:underline"
                    >help</li>
                    <li
                      className="hover:underline"
                    >orders and return</li>
                    <li
                      className="hover:underline"
                    >gift cards</li>
                    <li
                      className="hover:underline"
                    >join adiClub</li>
                  </ul>
                </div>
                <div
                  className="flex flex-row gap-x-5"
                >
                  <InstantSearch
                    future={{
                      preserveSharedStateOnUnmount: true,
                    }}
                    indexName={indexName}
                    stalledSearchDelay={500}
                    searchClient={searchClient}
                  >
                    <Search />
                  </InstantSearch>

                  <div
                    className="flex flex-row items-center gap-x-5"
                  >
                    <span
                      className="cursor-pointer relative w-[20px] h-full"
                    >
                      <span
                        className="absolute z-40 flex items-start"
                      >
                        {theme === 'dark'
                          ? <MdDarkMode
                            onClick={() => cycleTheme('light')}
                            size={23}
                          />
                          : theme === 'light'
                            ? <MdLightMode
                              onClick={() => cycleTheme('light')}
                              size={23}
                            />
                            : <MdLightMode
                              onClick={() => cycleTheme('light')}

                              size={23}
                            />
                        }
                      </span>
                    </span>
                    <BiWorld
                      size={22}
                    />
                    <FaUserCircle
                      size={22}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="target2"
          className="relative top-0 w-[100vw]"
        >
          <motion.div
            className="absolute w-full left-0 top-0 flex justify-center z-40"
          >
            <motion.div
              layout
              key={'+asd32'}
              className="flex flex-row flex-wrap gap-3 items-center justify-center bg-white dark:bg-black dark:group-hover:bg-neutral-900¿ w-[100vw] shrink-0 border-b-2 border-white dark:border-b-2 dark:border-black"
            >
              {sectionNames && sectionNames?.map((i, n) => (
                `${Object.entries(tabs || null)?.find(i => i?.[1] === true)?.[0]}_data` === sectionNamesData?.[n] ?
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    exit={{ y: 0, opacity: 0 }}
                    key={`${i}___${n}__${dataActive}`}
                    className="flex flex-col items-start pt-5 justify-center"
                  >

                    <div
                      className={`gap-6 flex-wrap flex flex-row w-full`}
                    >
                      {
                        navData?.map((i, n) => (
                          i[0] === 'NewAndTrending' ?
                            <div
                              key={`${i}__${n}`}
                              className={`flex flex-row pl-4 border-r border-white/40 pr-[120px]`}
                            >
                              <div
                                className="w-full flex flex-col gap-1"
                              >
                                <h1
                                  className="font-bold"
                                >
                                  {i[1].SectionName}
                                </h1>
                                <ul
                                  className="flex flex-col"
                                >
                                  {
                                    i[1]?.list
                                      ? i[1]?.list.map((item, index) => (
                                        <li
                                          key={`${item}_${index}_`}
                                        >{item}</li>
                                      ))
                                      : i[1]?.listOfSections
                                        ? i[1]?.listOfSections.map((item, index) => (
                                          <li
                                            key={`${item}__${index}_`}
                                          >{item}</li>
                                        ))
                                        : i[1]?.list
                                          ? i[1]?.list.map((item, index) => (
                                            <li
                                              key={`${item}___${index}_`}
                                            >{item}</li>
                                          ))
                                          : null
                                  }
                                </ul>
                              </div>
                            </div>
                            :
                            <div
                              key={n}
                              className={`flex flex-row px-5 pb-5`}
                            >
                              <div
                                className="w-full gap-1 flex flex-col"
                              >
                                <h1
                                  className="font-bold"
                                >
                                  {i[1].SectionName}
                                </h1>
                                <ul
                                  className="flex flex-col text-[14px]"
                                >
                                  {
                                    i[1]?.ListOfSections?.map((item, index) => (
                                      <li
                                        key={`${item}__${index}_`}
                                      >{item}</li>
                                    ))
                                  }
                                </ul>
                              </div>
                            </div>
                        ))
                      }
                    </div>
                    <div
                      className="w-full flex justify-center items-center border-t border-white/40 py-4"
                    >
                      <ul
                        className="flex flex-row justify-between w-11/12"
                      >
                        {
                          generalNavArr.find(i => i.name === subDataActive.slice(0, -8) || i.name === subDataActive.slice(0, -7)).list.map((i, index) => (
                            <li
                              key={index}
                            >
                              {i}
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </motion.div>
                  : null
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  const MobileNav = () => {
    const transitionConfig = 'transform 0.6s ease'
    const containerMenuModalRef = useRef(null)
    const containerSearchModal = useRef(null)
    const slideLeftWrapperRef = useRef(null)
    const setIsOpenWrapperLeftLevel0 = useMobileNavbarStore(state => state.setIsOpenWrapperLeftLevel0)
    const resetStore = useMobileNavbarStore(state => state.resetStore)
    const setIsOpenSearchWrapperRightLevel0 = useMobileNavbarStore(state => state.setIsOpenSearchWrapperRightLevel0)

    function isLevelChangeAllowed(targetKey) {
      const dataKeyLevel0 = useMobileNavbarStore.getState().dataKey
      const dataKeyLevel1 = useMobileNavbarStore.getState().dataKeyLevel1
      const dataKeyLevel2 = useMobileNavbarStore.getState().dataKeyLevel2
      const currentLevel = useMobileNavbarStore.getState().currentLevel

      let level
      const level0 = dataKeyLevel0.prevIndexKey
      const level1 = dataKeyLevel1.prevIndexKey
      const keyLevel1 = dataKeyLevel1.key
      const keyLevel2 = dataKeyLevel2.key
      level0 ? level = level0 : level1 ? level = level1 : level = null

      if (currentLevel === 0) {
        const result = Object.values(mobileNavData)[level]?.[targetKey] !== null
        return result
      } else if (currentLevel === 1) {
        const result = Object.values(mobileNavData)[dataKeyLevel0.prevIndexKey][targetKey] !== null
        return result
      } else if (currentLevel === 2) {
        const result = Object.values(mobileNavData)[dataKeyLevel0.prevIndexKey][keyLevel1][targetKey] !== null
        return result
      } else if (currentLevel === 3) {
        const result = Object.values(mobileNavData)[dataKeyLevel0.prevIndexKey][keyLevel1][keyLevel2][targetKey] !== null
        return result
      } else return null
    }

    const SlideLeftWrapper = () => {
      const setIsOpenWrapperLeftLevel1 = useMobileNavbarStore(state => state.setIsOpenWrapperLeftLevel1)
      const isOpenWrapperLeftLevel1 = useMobileNavbarStore(state => state.isOpenWrapperLeftLevel1)
      const dataKey = useMobileNavbarStore(state => state.dataKey)
      const setDataKeyLevel1 = useMobileNavbarStore(state => state.setDataKeyLevel1)
      const setIsOpenWrapperLeftLevel2 = useMobileNavbarStore(state => state.setIsOpenWrapperLeftLevel2)

      function localToggle(index, typeLevel1, typeLevel2, targetKey) {
        if (!isLevelChangeAllowed(targetKey)) return
        setIsOpenWrapperLeftLevel1(typeLevel1)
        setIsOpenWrapperLeftLevel2(typeLevel2)

        const newDataKey = Object.keys(Object.values(mobileNavData)[dataKey.prevIndexKey][dataKey.data[index]] || {})
        const key = dataKey.data[index]
        const prevIndexKey = dataKey.prevIndexKey
        setDataKeyLevel1(newDataKey, key, prevIndexKey)
      }

      return (
        <div
          id="SlideLeftWrapperEl"
          ref={slideLeftWrapperRef}
          style={{
            transform: `translateX(${isOpenWrapperLeftLevel1})`,
            transition: transitionConfig,
          }}
          className="mobile-slide-left-wrapper-el-z dark:bg-black dark:text-white bg-white fixed top-0 left-0 w-full h-screen z-40 text-black"
        >
          <div
            className="opacity-100 flex flex-row justify-between items-center py-3 px-3"
          >
            <div
              className="flex flex-row items-center"
            >
              <RiArrowLeftSLine
                onClick={() => localToggle(null, 'close')}
                className="text-[30px]"
              />
              <h1
                className="text-[22px] font-bold uppercase translate-y-[-1px]"
              >
                {
                  dataKey.key
                }
              </h1>
            </div>
            <IoMdClose
              onClick={() => resetStore(resetStoreDirectionLeft)}
              className="text-[30px]"
            />
          </div>

          <ul
            className="flex flex-col gap-5 px-10"
          >
            {
              Array.isArray(dataKey.data) &&
              dataKey.data.map((i, n) => (
                <div
                  key={n}
                  onClick={() => localToggle(n, null, 'open', i)}
                  className="w-full flex flex-row items-center justify-between cursor-pointer"
                >
                  <li
                    className="text-[18px]"
                  >
                    {i}
                  </li>
                  {
                    isLevelChangeAllowed(i) ?
                      <MdOutlineKeyboardArrowRight
                        className="text-[26px]"
                      />
                      : null
                  }
                </div>
              ))
            }
          </ul>
        </div>
      )
    }

    const SlideLeftWrapperLevel2 = () => {
      const setIsOpenWrapperLeftLevel3 = useMobileNavbarStore(state => state.setIsOpenWrapperLeftLevel3)
      const setDataKeyLevel2 = useMobileNavbarStore(state => state.setDataKeyLevel2)
      const dataKeyLevel1 = useMobileNavbarStore(state => state.dataKeyLevel1)
      const isOpenWrapperLeftLevel2 = useMobileNavbarStore(state => state.isOpenWrapperLeftLevel2)
      const dataKey = useMobileNavbarStore(state => state.dataKey)
      const datakeyLevel1 = useMobileNavbarStore(state => state.dataKeyLevel1)
      const setIsOpenWrapperLeftLevel2 = useMobileNavbarStore(state => state.setIsOpenWrapperLeftLevel2)

      function localToggle(index, typeActionLevel2, typeActionLevel3, targetKey) {
        if (!isLevelChangeAllowed(targetKey)) return
        setIsOpenWrapperLeftLevel2(typeActionLevel2)
        setIsOpenWrapperLeftLevel3(typeActionLevel3)
        const newDataKey =
          Object.keys(Object.values(mobileNavData)[dataKey.prevIndexKey][datakeyLevel1.key][dataKeyLevel1.data[index]] || {})
        const key = dataKeyLevel1.data[index]
        const prevIndexKey = dataKey.prevIndexKey
        setDataKeyLevel2(newDataKey, key, prevIndexKey)
      }

      return (
        <div
          style={{
            transform: `translateX(${isOpenWrapperLeftLevel2})`,
            transition: transitionConfig,
          }}
          className="mobile-slide-left-wrapper-level2-el-z bg-purple-500¿ bg-white fixed top-0 left-0 w-full h-screen z-40 text-black"
        >
          <div
            className="opacity-100 flex flex-row justify-between items-center py-3 px-3"
          >
            <div
              className="flex flex-row items-center"
            >
              <RiArrowLeftSLine
                onClick={() => localToggle(null, 'close', null, null)}
                className="text-[30px]"
              />
              <h1
                className="text-[22px] font-bold uppercase translate-y-[-1px]"
              >
                {
                  dataKeyLevel1.key
                }
              </h1>
            </div>
            <IoMdClose
              onClick={() => resetStore(resetStoreDirectionLeft)}
              className="text-[30px]"
            />
          </div>
          <ul
            className="flex flex-col gap-5 px-10"
          >
            {
              Array.isArray(dataKeyLevel1.data) &&
              dataKeyLevel1.data.map((i, n) => (
                <div
                  onClick={() => localToggle(n, null, 'open', i)}
                  key={n}
                  className="w-full flex flex-row items-center justify-between cursor-pointer"
                >
                  <li
                    className="text-[18px]"
                  >
                    {i}
                  </li>
                  {
                    isLevelChangeAllowed(i) ?
                      <MdOutlineKeyboardArrowRight
                        className="text-[26px]"
                      />
                      : null
                  }
                </div>
              ))
            }
          </ul>
        </div>
      )
    }

    const SlideLeftWrapperLevel3 = () => {
      const setIsOpenWrapperLeftLevel3 = useMobileNavbarStore(state => state.setIsOpenWrapperLeftLevel3)
      const isOpenWrapperLeftLevel3 = useMobileNavbarStore(state => state.isOpenWrapperLeftLevel3)
      const dataKeyLevel2 = useMobileNavbarStore(state => state.dataKeyLevel2)

      return (
        <div
          style={{
            transform: `translateX(${isOpenWrapperLeftLevel3})`,
            transition: transitionConfig,
          }}
          className="mobile-slide-left-wrapper-level3-el-z bg-white dark:bg-black dark:text-white fixed top-0 left-0 w-full h-screen z-40 text-black"
        >
          <div
            className="opacity-100 flex flex-row justify-between items-center py-3 px-3"
          >
            <div
              className="flex flex-row items-center"
            >
              <RiArrowLeftSLine
                onClick={() => setIsOpenWrapperLeftLevel3('close')}
                className="text-[30px]"
              />
              <h1
                className="text-[22px] font-bold uppercase translate-y-[-1px]"
              >
                {
                  dataKeyLevel2.key
                }
              </h1>
            </div>
            <IoMdClose
              onClick={() => resetStore(resetStoreDirectionLeft)}
              className="text-[30px]"
            />
          </div>

          <ul
            className="flex flex-col gap-5 px-10"
          >
            {
              Array.isArray(dataKeyLevel2.data) &&
              dataKeyLevel2.data.map((i, n) => (
                <div
                  key={n}
                  className="w-full flex flex-row items-center justify-between cursor-pointer"
                >
                  <li
                    className="text-[18px]"
                  >
                    {i}
                  </li>
                  {
                    isLevelChangeAllowed(i) ?
                      <MdOutlineKeyboardArrowRight
                        className="text-[26px]"
                      />
                      : null
                  }
                </div>
              ))
            }
          </ul>
        </div>
      )
    }

    const MenuModal = () => {
      const excludeKeysData0 = Object.keys(data0 || {}).filter(key => key !== 'id' && key !== 'documentId' && key !== 'locale' && key !== 'createdAt' && key !== 'publishedAt' && key !== 'updatedAt')
      const sectionNamesData = excludeKeysData0.map(i => i + '_data')
      const sectionNames = sectionNamesData?.map(i => removeWord(i, 'Section_data'))
      const isOpenWrapperLeftLevel0 = useMobileNavbarStore(state => state.isOpenWrapperLeftLevel0)
      const setIsOpenWrapperLeftLevel1 = useMobileNavbarStore(state => state.setIsOpenWrapperLeftLevel1)
      const setDataKey = useMobileNavbarStore(state => state.setDataKey)

      const arr = [
        "My Account",
        "Exchanges & Returns",
        "Order Tracker",
        "adiClub",
        "Gift Cards",
        "Store Locator",
        "Mobile Apps",
        "FEEDBACK",
      ]

      function localToggle(index, type) {
        const i = sectionNames[index || 0]
        const dataKey = Object.keys(Object.values(mobileNavData)[index || 0])
        const key = i === 'Mens' ? 'Men' : i === 'NewAndTrending' ? 'NEW & TRENDING' : i
        const prevIndexKey = index
        setDataKey(dataKey, key, prevIndexKey)
        setIsOpenWrapperLeftLevel1(type)
      }

      return (
        <div
          ref={containerMenuModalRef}
          style={{
            transform: `translateX(${isOpenWrapperLeftLevel0})`,
            transition: transitionConfig,
          }}
          className="mobile-menu-modal-el-z dark:bg-black dark:text-white bg-white fixed top-0 left-0 w-full h-screen z-40 text-black flex flex-col justify-start items-start"
        >
          <div
            className="w-full flex justify-end items-start py-2 border-b border-black/10 dark:border-white/10"
          >
            <div
              className="opacity-100 w-[56%] flex flex-row justify-between items-center"
            >
              <SiAdidas
                className="text-[50px]"
              />
              <div
                className="relatv¿e w-[37px] h-[30px]"
              >
                <IoMdClose
                  onClick={() => resetStore(resetStoreDirectionLeft)}
                  className="text-[30px]"
                />
              </div>
            </div>
          </div>

          <div
            className="flex flex-col items-start w-full px-8 my-5 overflow-y-auto"
          >
            <ul
              className="flex flex-col items-start w-full gap-5 pb-5"
            >
              {
                sectionNames?.map((i, n) => (
                  <div
                    key={n}
                    id={`${sectionNames[n]}Section`}
                    onClick={() => localToggle(n, 'open')}
                    className="flex flex-row w-full items-center justify-between cursor-pointer"
                  >
                    <li
                      key={`${i}_${n}`}
                      className={`text-[22px] uppercase`}
                    >
                      {
                        i === 'Mens' ? 'Men' : i === 'NewAndTrending' ? 'NEW & TRENDING' : i
                      }
                    </li>
                    <IoMdArrowDropright
                      className="text-[22px]"
                    />
                  </div>
                ))
              }
            </ul>

            <ul
              className="flex flex-col gap-5 text-[20px] pt-5 border-t border-black/10 dark:border-white/10 w-full"
            >
              {
                arr.map((i, n) => (
                  <li
                    key={n}
                  >
                    {i}
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      )
    }

    const SearchModal = () => {
      const isOpenSearchWrapperRightLevel0 = useMobileNavbarStore(state => state.isOpenSearchWrapperRightLevel0)
      const setIsOpenSearchWrapperRightLevel0 = useMobileNavbarStore(state => state.setIsOpenSearchWrapperRightLevel0)
      function localToggle(type) {
        setIsOpenSearchWrapperRightLevel0(type)
      }
      return (
        <InstantSearch
          future={{
            preserveSharedStateOnUnmount: true,
          }}
          indexName={indexName}
          searchClient={searchClient}
        >
          <div
            ref={containerSearchModal}
            style={{
              transform: `translateX(${isOpenSearchWrapperRightLevel0})`,
              transition: transitionConfig,
            }}
            className="bg-white dark:bg-black dark:text-white fixed top-0 left-0 flex flex-col w-full h-screen z-40 text-black"
          >
            <div
              className="opacity-100 py-4 w-full bg-gray-300 dark:bg-neutral-700"
            >
              <div
                className='flex flex-row gap-5 px-4 w-full dark:focus-within:border-white focus-within:border-black focus-within:border-y-2'
              >
                <RiArrowLeftSLine
                  onClick={() => localToggle('close')}
                  className="text-[30px]"
                />
                <MobileSearch />
              </div>
            </div>
            <CustomHits />
          </div>
        </InstantSearch>
      )
    }

    return (
      <>
        <SlideLeftWrapperLevel3 />
        <SlideLeftWrapperLevel2 />
        <SlideLeftWrapper />
        <MenuModal />
        <SearchModal />
        <div
          className="lg:hidden bg-white dark:bg-black flex justify-center items-center w-full"
        >
          <div
            className="w-[93vw] py-2 h-full flex flex-row gap-x-5 items-center justify-between"
          >
            <div
              className="flex flex-row items-start gap-x-5"
            >
              <div
                className="opacity-100"
              >
                <IoMenu
                  onClick={() => setIsOpenWrapperLeftLevel0('open')}
                  className="text-[30px]"
                />
              </div>

              <span
                className="cursor-pointer relative w-[20px]"
              >
                <span
                  className="absolute z-30 flex items-start h-full top-[4px] text-[23px]"
                >
                  {
                    theme === 'dark'
                      ? <MdDarkMode
                        onClick={() => cycleTheme('dark')}
                      />
                      : theme === 'light'
                        ? <MdLightMode
                          onClick={() => cycleTheme('light')}
                        />
                        : <MdLightMode
                          onClick={() => cycleTheme('light')}
                        />
                  }
                </span>
              </span>

            </div>
            <div>
              <div
                className="opacity-100 transition-opacity duration-300 ease-in-out"
              >
                <SiAdidas
                  className="text-[50px]"
                />
              </div>
            </div>
            <div
              className="flex flex-row items-center gap-x-5"
            >
              <FaUserCircle
                className="text-[23px]"
              />
              <button
                onClick={() => setIsOpenSearchWrapperRightLevel0('open')}
              >
                <MdOutlineSearch
                  className="text-[30px]"
                />
              </button>
              <CiShoppingCart
                className="text-[28px]"
              />
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <motion.div
        ref={containerRef}
        id="container_navAndadTop"
        className={classNamesEl2}
      >
        <AdTop />
        <DesktopNav />
        <MobileNav />
      </motion.div>
    </>
  )
}






