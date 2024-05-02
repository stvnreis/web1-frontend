'use client'

import { TResponse } from "@/types"
import { useEffect, useState } from "react"
import { Api } from "../axios"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { useAuth } from "./use-auth"

export interface fetchApiDataResponse<TData> {
  data: TData
  isLoading: boolean
}

export function useFetch<TData>(url: string): { data: TData | null | undefined, isLoading: boolean } {
  const { accessToken } = useAuth()
  const [data, setData] = useState<TData>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async (url: string, accessToken?: string) => {
      Api(accessToken)
        .get<TResponse<TData>>(url)
        .then((response) => {
          setData(response.data.data)
        })
        .catch((err: AxiosError) => {
          const apiResponse = err.response?.data as TResponse<null>

          toast.error(apiResponse.message)
        })
        .finally(() => setIsLoading(false))
    }

    fetchData(url, accessToken)
  }, [url, accessToken])

  return { data, isLoading }
}