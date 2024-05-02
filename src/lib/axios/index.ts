import { TResponse } from "@/types";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const Api = (accessToken?: string) => axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: 'Bearer ' + accessToken
  }
})

export async function getData<TData>(url: string, accessToken?: string) {
  return Api(accessToken)
    .get<TData>(url)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      const apiResponse = err.response?.data as TResponse<null>

      toast.error(apiResponse.message)
    })
}