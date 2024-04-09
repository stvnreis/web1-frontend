'use client'

import { Api } from "@/axios";
import { Article } from "@/types";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export default function ArtigoPage({params: {id}}: {params: {id: string}}) {
  const [data, setData] = useState<Article>()

  const getData = async () => {
    try {
      const {data} = await Api.get<{data: Article}>('/articles/' + id)

      setData(data.data)
    } catch (err) {
      if(err instanceof AxiosError) console.log(err.response?.data.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return data && <section className="flex flex-col items-center justify-center w-full">
    <label>Sinopse: {data?.sinopse}</label>
  </section>
}