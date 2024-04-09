'use client'

import { Api } from "@/axios";
import { User } from "@/types";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { UsuarioCard } from "./components/usuario-card";

export default function UsuariosPage() {
  const [data, setData] = useState<User[]>()

  const getData = async () => {
    try {
      const {data} = await Api.get<{data: User[]}>('/users')

      setData(data.data)
    } catch (err) {
      if(err instanceof AxiosError) console.log(err.response?.data.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return <div className="w-full grid grid-cols-5">
    {data?.map((item) => <UsuarioCard key={item.id + item.name} data={item} />)}
  </div>
}