'use client'
import { MdOutlineArrowDropDown } from "react-icons/md";

export default function ProductMeta({ data }) {
  return (
    <div
      className="flex flex-col px-20"
    >
     {
        [{ title: 'Reviews (51)', n: '4.7' }, { title: 'Description' }, { title: 'Details' }, { title: 'How to Style' }].map((i, index) => (
        <div
          key={index}
          className="border-y border-white/20 flex flex-row items-center justify-between gap-x-5"
        >
          <div
            className="flex flex-row items-center justify-between py-7"
          >
            <h1
              className="font-bold text-[15px]"
            >
              {i.title}
            </h1>
            <span>
              {i.n}
            </span>
          </div>
            <MdOutlineArrowDropDown
              size={28}
            />
        </div>

      ))
     }
    </div>
  )
}