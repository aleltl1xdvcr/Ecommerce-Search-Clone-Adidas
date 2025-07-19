'use server'

import { Redis } from "@upstash/redis"
import { cookies } from "next/headers";

export async function getUserId() {
  const cookieStore = cookies();
  const userId = (await cookieStore).get("userId")?.value
  return userId
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export async function setHasSsrInternalMethodExecutedFlag(method: string) {
  const userId = getUserId()
  const key = `user:${userId}:ssrInternalMethodExecutedFlag`
  await redis.set(key, method)
}

export async function deleteHasSsrInternalMethodExecutedFlag() {
  const userId = getUserId()
  const key = `user:${userId}:ssrInternalMethodExecutedFlag`
  await redis.set(key, null)
}

export async function getHasSsrInternalMethodExecutedFlag(): Promise<boolean> {
  const userId = getUserId()
  const key = `user:${userId}:ssrInternalMethodExecutedFlag`
  const result = await redis.get<boolean>(key)
  return result
}
