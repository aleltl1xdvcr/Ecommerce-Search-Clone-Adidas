'use server'

import Client from "./client"
import { getNavData } from "../../../../lib/getters"

export default async function NavServer() {
  const data = await getNavData()

  return (
    <>
      <Client
        data0={data}
      />
    </>
  )
}