'use client'
import { CiCircleInfo } from "react-icons/ci";

export default function Sizes({ dataSizes }) {
  // const data = dataSizes[0].SelectSizeType.MenAndWomenSizes
  if (dataSizes?.length === 0) return
  const data = dataSizes?.[0]?.ClothingSizes

  function AdSize() {
    return (
      <div
        className="w-full px-5 py-3 flex flex-row justify-center items-start gap-x-2 border text-[14px] border-white/40 my-5"
      >
        <CiCircleInfo 
          className="translate-y-[1px]"
          size={25}
        />
        <h1
        >
          <span
            className="font-bold"
          >True to size.</span> We recommend ordering your usual size.
        </h1>
      </div>
    )
  }

  return (
    <div
      className="flex flex-col items-center justify-justify-center mt-5"
    >
      <div
        className="flex flex-row w-full items-center justify-between mb-5"
      >
        <h1
          className="text-[16px] font-bold"
        >
          Sizes
        </h1>
        <span>
          Size Guide
        </span>
      </div>
      <div
        className="w-full gap-1 grid grid-cols-3"
      >
        {
          data
            ?.map((i, index) => (
              <div
                key={index}
                className="w-full text-[14px] bg-zinc-700/60 hover:bg-black transition-colors duration-100 ease-in-out flex flex-nowrap p-2 justify-center items-center"
              >
                <span>
                  {i}
                </span>
              </div>
            ))
        }
      </div>
      <AdSize />
    </div>
  )
}