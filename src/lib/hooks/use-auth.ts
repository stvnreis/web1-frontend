'use client'

import { Role } from "@/types"
import { useSession } from "next-auth/react"

export type TUserData = {
  email: string
  password: string
}

export function useAuth() {
  const { data } = useSession()

  return {
    user: data?.user,
    role: data?.role as Role,
    accessToken: data?.accessToken
  }
}