import { Textarea as NextUiTextArea } from "@nextui-org/react"

interface TextAreaProps {
  label: string
  field?
}

export const TextArea = ({label, field}: TextAreaProps) => {
  return <NextUiTextArea label={label} color="primary" variant="faded" {...field} /> 
}