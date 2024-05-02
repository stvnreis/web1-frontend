import { Input as NextUiInput } from "@nextui-org/react"
import { ReactNode } from "react"

interface InputProps {
  type: 'number' | 'text' | 'string' | 'password'
  label?: string
  endContent?: ReactNode
  field
}

export function Input({type, label, endContent, field}: InputProps) {
  return <NextUiInput 
    type={type} 
    variant="faded"
    color="primary"
    className="text-black"
    label={label ?? ''}
    endContent={endContent}
    {...field}
  >
  </NextUiInput>
}