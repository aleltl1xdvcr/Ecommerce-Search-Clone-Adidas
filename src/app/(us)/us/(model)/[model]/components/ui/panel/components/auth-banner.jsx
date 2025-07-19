'use client'

import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import './styles.css'
export default function AuthBanner() {
  return (
    <div
      id="auth-banner-div1"
      className="w-full flex flex-row items-center justify-center py-10 mt-16 ad-color-blue "
    >
     <div
      className="flex lg:flex-row items-center gap-x-8 md:gap-y-0 gap-y-5 w-fit px-10 flex-col"
     >
        <div
          className="text-[23px] font-bold"
        >
          <h1
            className="text-white leading-tight"
          >
            JOIN OUR ADICLUB & GET 15% OFF
          </h1>
        </div>
        <div
          className="w-fit h-fit relative"
        >
          <div
            className="flex flex-row items-center px-3 py-2 gap-x-3 text-[13px] bg-white dark:bg-black font-bold"
          >
            <button
              className="uppercase"
            >
              Sign up for free
            </button>
            <LiaLongArrowAltRightSolid
              size={30}
            />
          </div>

          <div
            className="translate-[5px]  flex flex-row items-center w-full h-full border-[1.8px] border-white absolute top-0"
         />
        </div>
     </div>
    </div>
  )
}