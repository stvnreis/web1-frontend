'use client'

import { Api } from "@/axios";
import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";
import { User } from "@/types";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function UserPage({params: {id}}: {params: {id: string}}) {
  const router = useRouter()

  const [data, setData] = useState<User>({
    id: '',
    email: '',
    name: '',
    password: '',
    roleId: ''
  } as User)

  const getData = async () => {
    try {
      const {data} = await Api.get<{data: User}>('/users/' + id)

      setData(data.data)
    } catch (err) {
      if(err instanceof AxiosError) console.log(err.response?.data.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const save = async () => {
    const hasId = !(id === 'new')

    const body = data

    try {
      const {data} = hasId ? 
        await Api.patch<{data: User}>('/users/' + id, {
          ...body,
        }) : 
        await Api.post<{data: User}>('/users', {
          ...body
        })

        setData(data.data)

        if(!hasId) router.push(data.data.id)
    } catch (error) {
        if(error instanceof AxiosError) console.log(error.response?.data.message)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setData({...data!, [name]: e.target.value})
  }

  return data && <div className="flex flex-col p-5 w-1/2 gap-10">
    {/* <div className="grid grid-cols-2 gap-3"> */}
      <Input data={data.id} type="text" handleChange={handleChange} dataName="id" />      
      <Input data={data!.name} type="text" handleChange={handleChange} dataName="name" />
      <Input data={data.email} type="text" handleChange={handleChange} dataName="email" />
      <Input data={data.password ?? ''} type="text" handleChange={handleChange} dataName="password" />
      <Input data={data.roleId} type="text" handleChange={handleChange} dataName="roleId" />
    {/* </div> */}
    
    <Button handleClick={save} text="Salvar" />
  </div>
}