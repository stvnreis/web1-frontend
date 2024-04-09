import { ChangeEvent } from "react"

interface InputProps {
  type: 'number' | 'text'
  data: string
  dataName: string
  handleChange: (e: ChangeEvent<HTMLInputElement>, name: string) => void
}

export const Input = ({type, data, dataName,handleChange}: InputProps) => {
  return <input 
    type={type} 
    value={data} 
    onChange={(e) => handleChange(e, dataName)} 
    className={"text-black bg-zinc-600 px-5 py-2 rounded-lg"}
  >
  </input>
}