'use server'

import { getStrapiData } from "../../../../lib/getters"
import Terrex from "./terrex"

export default async function Page() {
  const data = (await getStrapiData()).data[0]

  console.log('data', data)
  console.log('dynamicSizesData', data.DynamicSizes)
  console.log('modelColorsData', data.ModelColors)
  console.log('sectionTypeData')

  const colorIdData = data.ColorId
  const dynamicSizesData = data.Sizes
  const modelColorsData = data.ModelColors
  const sectionTypeData = data.metadata

  return (
    <Terrex
      data={data}
      dynamicSizesData={dynamicSizesData}
      modelColorsData={modelColorsData}
      sectionTypeData={sectionTypeData}
    />
  )
}