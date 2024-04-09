'use client'

import { Api } from "@/axios";
import { Article } from "@/types";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ArticleCard } from "./components/article-card";

export default function ArtigosPage() {
  const [data, setData] = useState<Article[]>([])

  const getData = async () => {
    try{
      const {data} = await Api.get<{data: Article[]}>('articles')

      setData(data.data)
    } catch (err) {
      if(err instanceof AxiosError) console.log(err.response?.data.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return <div className="grid grid-cols-4 gap-5">
    {data.map((item) => <ArticleCard data={item} key={item.id + item.sinopse} />)}
  </div>
}