'use client'
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { CiHeart } from "react-icons/ci";

export default function AddToBag({ data }) {
  return (
    <div>
      <div
        className="flex flex-row items-center gap-x-3"
      >
        <div
          className="flex flex-row w-full items-center justify-between border-b border-r border-white/40 p-2 hover:text-neutral-400"
        >
          <button
            className="uppercase text-[16px]"
          >
            Add to bag
          </button>
          <LiaLongArrowAltRightSolid 
            size={30}
          />
        </div>
        <div
          className="border border-white/40 p-2"
        >
          <CiHeart
            size={30}
            className=""
          />
        </div>
      </div>
    </div>
  )
}