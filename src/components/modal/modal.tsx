import { ModalBody, ModalContent, ModalFooter, ModalHeader, Modal as NextUiModal } from "@nextui-org/react"
import { MouseEvent, ReactNode } from "react"
import { Button } from "../button/button"

interface ModalProps {
  isOpen: boolean,
  onOpen: (b: boolean) => void,
  onOpenChange:  (b: boolean) => void,
  children: ReactNode
  type: 'form'
  handleSubmit?: (e: MouseEvent<HTMLButtonElement>) => void
  submitButton?: ReactNode
}

/**
 * 
 * @param ModalProps que possui hooks para abrir e fechar o modal, o tipo de modal (caso seja um modal do tipo form, habilita o botao de enviar e o handler da requisicao)
 * @returns um modal com um corpo que pode ser um formulario e lidar com a requisicao ou apenas informacoes
 */
export const Modal = ({isOpen, onOpen, onOpenChange, children, type, submitButton}: ModalProps) => {

  return <NextUiModal
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    className="pt-10 text-black"
  >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalBody>
            {children}  
          </ModalBody>
          <ModalFooter>
            <Button handleClick={onClose} text="Fechar" color="danger" />

            {submitButton}
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </NextUiModal>
}