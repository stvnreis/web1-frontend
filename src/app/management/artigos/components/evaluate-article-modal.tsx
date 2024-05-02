import { Button } from "@/components/button/button"
import { Input } from "@/components/input/input"
import { Modal } from "@/components/modal/modal"
import { useModal } from "@/lib/hooks/use-modal"
import { usePost } from "@/lib/hooks/use-post"
import { Article, Grades } from "@/types"
import { Controller, Form, SubmitHandler, useForm } from "react-hook-form"

interface EvaluateArticleModalProps {
  article: Article
  isOpen: boolean
  handleOpen: () => void
  handleOpenChange: () => void
}

export const EvaluateArticleModal = ({ 
  article,
  isOpen, 
  handleOpen, 
  handleOpenChange,
 }: EvaluateArticleModalProps) => {

  const {handlePost} = usePost<Grades>('/articles/' + article.id + '/evaluate')

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Grades>()

  const onSubmit: SubmitHandler<Grades> = (data) => handlePost(data)

  return (
    <Form control={control}>
      <Modal 
        type="form"
        isOpen={isOpen} 
        onOpen={handleOpen} 
        onOpenChange={handleOpenChange} 
        submitButton={<Button text="Enviar" handleClick={handleSubmit(onSubmit)} />} 
      >
        <Controller
          name="n1"
          control={control}
          render={({field}) => {
            return <Input field={field} type="number" label="Nota 1" />
          }}
        />

        <Controller
          name="n2"
          control={control}
          render={({field}) => {
            return <Input field={field} type="number" label="Nota 2" />
          }}
        />
      </Modal>
    </Form>
  )
}