'use client'

import { TResponse } from "@/types"
import { useState } from "react"
import { Api } from "../axios"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { useAuth } from "./use-auth"

export interface postApiDataResponse<TData> {
  isLoading: boolean
  handlePatch: (data: TData) => void
}

export function usePatch<TData>(url: string): postApiDataResponse<TData> {
  const { accessToken } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  const handlePatch = (data: TData) => {
    Api(accessToken)
      .patch<TResponse<TData>>(url, {
        ...data
      })
      .then((response) => {

        toast.success(response.data.message)
      })
      .catch((err: AxiosError) => {
        const apiResponse = err.response?.data as TResponse<null>

        toast.error(apiResponse.message)
      })
      .finally(() => setIsLoading(false))
  }

  return { isLoading, handlePatch }
}

function validateToken(route: string, accessToken?: string): boolean {
  return (accessToken !== undefined && route !== '/auth')
}