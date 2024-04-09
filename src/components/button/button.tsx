interface ButtonProps {
  text: string
  handleClick: () => void
  className?: string
}

export const Button = ({text, handleClick, className}: ButtonProps) => {
  return <button 
    onClick={() => handleClick()} 
    className={className ?? 'px-5 py-2 bg-zinc-400 rounded-lg hover:bg-zinc-500'}
    >
    {text}
  </button>
}