import { MouseEvent } from "react"
import { Button as NextUiButton } from "@nextui-org/react"

interface ButtonProps {
  text: string
  handleClick?: (e: MouseEvent<HTMLButtonElement>) => void
  className?: string
  isHidden?: boolean
  color?: 'default' | 'danger' | 'success'
  variant?: 'flat' | 'solid'
}

export const Button = ({text, handleClick, className, color, variant, isHidden = false}: ButtonProps) => {

  if (isHidden) return <></>

  return <NextUiButton 
    onClick={ handleClick ? (e) => handleClick(e) : (e) => e.preventDefault()}
    className={className ?? 'px-5 py-2'}
    variant={variant ?? "ghost"}
    color={color ?? "primary"}
    type="submit"
  >
    {text}
  </NextUiButton>
}