'use client'
import { CiCircleInfo, CiDeliveryTruck, CiCreditCard1 } from "react-icons/ci";
import { VscHistory } from "react-icons/vsc";
import Link from 'next/link'

export default function Rest({ data }) {
  return (
    <div>
      <div
        className="flex flex-col items-start my-5 text-[15px]"
      >
        <div
          className=""
        >
          <div
            className="py-5"
          >
            <span>
              From $17.35/month, or 4 payments at 0% interest with Klarna Learn more
            </span>
          </div>
        </div>
        <div
          className="border-t border-white/40"
        >
          <Link
            className="flex flex-row items-center gap-x-2 py-5"
            href={'/x'}
          >
            <VscHistory
              size={21}
            />
            <div
              className="flex flex-col"
            >
              <p>
                Free Prime delivery and easy returns available on select sizes and colors
              </p>
              <span
                className="underline"
              >
                Get delivery dates
              </span>
            </div>
            <CiCircleInfo
              size={25}
            />
          </Link>
        </div>
        <div
          className="border-t border-white/40 w-full"
        >
          <Link
            className="flex flex-row items-center gap-x-2 pt-5"
            href={'/x'}
          >
            <CiDeliveryTruck 
              size={21}
            />
            <span
              className="underline"
            >
              Free standard shipping with adiClub
            </span>
          </Link>
          <Link
            className="flex flex-row items-center gap-x-2"
            href={'/x'}
          >
            <CiCreditCard1 
              size={21}
            />
            <span
              className="underline"
            >
              Free 30 day returns
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}