'use client'

import { generalNavArr } from "./data"
import { useThemeStore } from '../../../../store-theme'
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useAnimate } from "motion/react"
import { SiAdidas } from "react-icons/si"
import { CiMenuBurger } from "react-icons/ci"
import { IoMdClose, IoMdArrowDropdown } from "react-icons/io"
import { MdOutlineKeyboardArrowRight, MdDarkMode, MdLightMode, MdArrowRightAlt } from "react-icons/md"
import { FaUserCircle } from "react-icons/fa"
import { FaRegCircleQuestion } from "react-icons/fa6"
import { BiWorld } from "react-icons/bi"
import { Router } from 'next/router'

function removeWord(text, word) {
  const regex = new RegExp(word, 'gi')
  return text.replace(regex, '')
}

export default function Client({ data0 }) {
  const containerRef = useRef(null)
  const [_, animate] = useAnimate()
  const setThemeStore = useThemeStore((state) => state.setThemeStore)
  const THEME_STORE = useThemeStore((state) => state.theme)
  const [isOpen, setIsOpen] = useState(false)
  const [tabs, setTabs] = useState({
    MensSection: false,
    WomenSection: false,
    KidsSection: false,
    SaleSection: false,
    NewAndtrendingSection: false,
  })
 
  const dataActive = `${Object.entries(tabs).find(i => i[1] === true)?.[0]}_data`
  const subDataActive = `${Object.entries(tabs).find(i => i[1] === true)?.[0]}`
  const excludeKeysData0 = Object.keys(data0).filter(key => key !== 'id' && key !== 'documentId' && key !== 'locale' && key !== 'createdAt' && key !== 'publishedAt' && key !== 'updatedAt')
  const sectionNamesData = excludeKeysData0.map(i => i + '_data')
  const sectionNames = sectionNamesData?.map(i => removeWord(i, 'Section_data'))
  const arr0 = Object.fromEntries(
    Object.entries(data0).filter(([key, value]) => excludeKeysData0.includes(key)) || {})
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
      const indexA = desiredOrder.indexOf(keyA);
      const indexB = desiredOrder.indexOf(keyB);
      return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
    }
  )

  let scrollTimeStamp = { prev: { timeStamp: 0, scrollY: 0 }, current: { timeStamp: 0, scrollY: 0 } }

  useEffect(() => {
    const nav = document.getElementById('nav')

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

  useEffect(() => {
    if (THEME_STORE) {
      document.documentElement.setAttribute('data-theme', THEME_STORE);
      document.documentElement.className = THEME_STORE;
    }
  }, [THEME_STORE])

  function activateOnly(keyToActivate) {
    const newTabs = Object.fromEntries(Object.entries(tabs)
      .map(([key, _]) => [key, key === keyToActivate ? true : false]))
    if (newTabs) {
      setTabs(newTabs)
    }
  } 

  async function mouseEnterFn(e) {
    const id = e.target.id
    activateOnly(id)
    setIsOpen(!isOpen);
  }

  const pathname = usePathname().slice(1)

  function getDynamicClassNames() {
    const p = pathname
    if (p === 'us/x') {
      return "flex flex-col w-full py-2 border-b border-white/30"
    } else {
      return null
      return "flex flex-col z-40 fixed top-0 w-full"
    }
  }

  const classNamesEl2 = getDynamicClassNames()

  return (
    <>
      <motion.div
        ref={containerRef}
        id="container_navAndadTop"
        className={classNamesEl2}
      >
          <AdTop />
          <motion.div
            className="flex justify-center items-start w-full flex-col relative"
          >
            <div
              id="nav"
            className='hidden xl:flex w-full h-20 items-center flex-col justify-center dark:bg-neutral-900'

            >
              <div
                className="flex flex-row w-full justify-center items-end h-full"
              >
                <div
                  className="tab absolute left-4 bottom-[-4px]"
                >
                  <SiAdidas
                    size={58}
                  />
                </div>
                <div
                  className="flex flex-col translate-y-[-5px]"
                >
                  <ul
                    className="flex flex-row items-center"
                  >
                    {
                      sectionNames?.map((i, n) => (
                        <li
                          id={`${sectionNames[n]}Section`}
                          onMouseOver={(e) => mouseEnterFn(e)}
                          key={`${i}_${n}`}
                          className="cursor-pointer uppercase text-[16px] px-4.5 hover:underline decoration-black dark:decoration-white decoration-2 underline-offset-[9px]"
                        >
                          {i}
                        </li>
                      ))
                    }
                  </ul>
                </div>
              <div
                className="flex flex-col items-start absolute right-4 top-2"
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
                  <Search />
                  <div
                    className="flex flex-row items-center gap-x-2"
                  >
                    <span
                      className="cursor-pointer"
                      onClick={() => setThemeStore()}
                    >
                      {THEME_STORE === 'dark'
                        ? <MdDarkMode size={23}
                        />
                        : THEME_STORE === 'dark'
                          ? <MdLightMode size={23}
                          />
                          : <MdLightMode size={23}
                          />
                      }
                    </span>
                    <FaRegCircleQuestion
                      size={22}
                    />
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
          <div
            id="target2"
            className="relative top-0 w-[100vw]' w-full"
          >
            <motion.div
              className="absolute w-full left-0 top-0 flex justify-center z-40"
            >
              <motion.div
                layout
                key={'+asd32'}
                className="flex flex-row flex-wrap gap-3 items-center justify-center bg-white dark:bg-black dark:group-hover:bg-neutral-900 w-full shrink-0 border-b-2 border-white dark:border-b-2 dark:border-black"
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
          <AdBelow />
      </motion.div>
    </>
  )
}

function ModalMenu() {
  const container = useRef(null)
  const menu = useRef(null)
  const close = useRef(null)
  const tesla = useRef(null)

  function handleClickModal() {
    const current = container.current
    if (current.classList.contains('opacity-0')) {
      current.classList.remove('opacity-0', 'pointer-events-none')
      current.classList.add('opacity-100')
      menu.current.classList.remove('opacity-100')
      menu.current.classList.add('opacity-0', 'pointer-events-none')
      close.current.classList.remove('opacity-0', 'pointer-events-none')
      close.current.classList.add('opacity-100')
      tesla.current.classList.remove('opacity-100')
      tesla.current.classList.add('opacity-0')

    } 
    else if (current.classList.contains('opacity-100')) {
      current.classList.remove('opacity-100')
      current.classList.add('opacity-0', 'pointer-events-none')
      close.current.classList.remove('opacity-100')
      close.current.classList.add('opacity-0', 'pointer-events-none')
      menu.current.classList.remove('opacity-0', 'pointer-events-none')
      menu.current.classList.add('opacity-100')
      tesla.current.classList.remove('opacity-0')
      tesla.current.classList.add('opacity-100')
  } 
}

  function Modal() {
    return
  return (
    <div
      ref={container}
      className={`opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out fixed z-40 dark:bg-black bg-white top-[48px] h-[85vh] w-full`}
    >
      <div
        className=""
      >
        <ul
          className="text-[18px] px-4 py-7"
        >
          {
            sectionsModalMenu?.map((i, n) => (
              <div
                key={n}
                className="w-full flex flex-row items-center justify-between px-3 py-6"
              >
                <li
                >
                  {i.name}
                </li>
                {
                  i.id === 'shop' || i.id === 'account' || i.id === 'support' 
                  ?
                    null
                  : 
                    <MdOutlineKeyboardArrowRight />
                }
              </div>
          ))
          }
        </ul>
      </div>
    </div>
  )
  }

  return (
    <div
      className="flex flex-col"
    >
      <div
        className='w-full h-12 px-10 items-center flex flex-row justify-between bg-white dark:bg-black group hover:dark:bg-neutral-900 z-40 fixed top-0 left-0 xl:hidden'
      >
        <div
          ref={tesla}
          className="opacity-100 transition-opacity duration-300 ease-in-out"
        >
          <SiAdidas size={28} />
        </div>
        <div
          onClick={() => handleClickModal()}
          className="opacity-0 pointer-events-none absolute right-0 pr-10"
          ref={close}
        >
          <IoMdClose
            size={28}
          />
        </div>
        <div
          className="opacity-100"
          onClick={() => handleClickModal()}
          ref={menu}
        >
          <CiMenuBurger
            size={28}
          />
        </div>
      
      </div>
      <Modal />
    </div>
  )
}


function AdTop() {
  const [scope, animate] = useAnimate()
  const placeholdersData = ['FREE STANDARD SHIPING WITH ADICLUB', 'UP TO 40% OFF', 'Don´t FORGET DAD´S GIFT']
  const [placeholder, setPlaceholder] = useState(0)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder(prev => (prev + 1) % placeholdersData.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={scope}
      className="w-full h-fit flex justify-center items-center py-2 bg-black"
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
                  className={`text-black/80 dark:text-neutral-100 text-[12px] flex flex-row gap-5 items-center`}
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

function AdBelow() {
  return
  return (
    <Link
      href='/x'
      className="relative w-full py-2 pr-10 pl-2 flex flex-row items-center bg-zinc-700"
    >
      <div
        className="w-full flex justify-center text-[13px] text-black dark:text-white"
      >
        <h1>
          Save big on summer essentials with up to 40% off.
        </h1>
      </div>
      <MdArrowRightAlt
        size={40}
      />
    </Link>
  )
}

function Search() {
  return (
    <div>
      <div
        className="w-[200px] h-8 rounded-[3px] dark:border-2 dark:border-white"
      >
        <input
          className="w-full h-full p-2"
          type="text" />
      </div>
    </div>
  )
}