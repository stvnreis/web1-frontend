import { useDisclosure } from "@nextui-org/react";

export function useModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure()

  return {
    isOpen,
    handleOpen: onOpen,
    handleOpenChange: onOpenChange,
  }
}