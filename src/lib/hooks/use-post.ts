'use client'

import { TResponse } from "@/types"
import { useState } from "react"
import { Api } from "../axios"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { useAuth } from "./use-auth"

export interface postApiDataResponse<TData> {
  isLoading: boolean
  handlePost: (data: TData) => void
}

export function usePost<TData>(url: string): postApiDataResponse<TData> {
  const { accessToken } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  const handlePost = (data: TData) => {
    Api(accessToken)
      .post<TResponse<TData>>(url, {
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

  return { isLoading, handlePost }
}

function validateToken(route: string, accessToken?: string): boolean {
  return (accessToken !== undefined && route !== '/auth')
}