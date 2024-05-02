import { Modal } from "@/components/modal/modal"
import { Article, Author, ExtensaoArquivoEnum, User } from "@/types"
import { Select, SelectItem } from "@nextui-org/react"
import { Input } from "@/components/input/input"
import { Controller, Form, SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { Button } from "@/components/button/button"
import { usePost } from "@/lib/hooks/use-post"
import { TextArea } from "@/components/input/text-area"
import { MouseEvent, useEffect } from "react"
import { usePatch } from "@/lib/hooks/use-patch"
import { EvaluateArticleModal } from "./evaluate-article-modal"
import { useModal } from "@/lib/hooks/use-modal"
import { useAuth } from "@/lib/hooks/use-auth"

interface ArticleModalProps {
  isOpen: boolean,
  handleOpen: (b: boolean) => void
  handleOpenChange: (b: boolean) => void
  artigo?: Article
  autores: Author[]
}

export const SubmitArticleModal = ({
  isOpen, 
  handleOpen, 
  handleOpenChange,
  artigo,
  autores
}: ArticleModalProps) => {

  const {role} = useAuth()

  const {isOpen: isGradeModalOpen, handleOpen: handleOpenGradeModal, handleOpenChange: handleOpenChangeGradeModal} = useModal()

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Article>()
  
  const {handlePost} = usePost<Article>('/articles')
  const {handlePatch} = usePatch<Article>('/articles/' + artigo?.id)

  const onSubmit: SubmitHandler<Article> = (data) => {

    artigo === undefined || artigo?.isPhantom ? handlePost(data) : handlePatch(data)
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "authors"
  });

  console.log(watch('authors'))

  useEffect(() => {
    remove()
    if (artigo) reset(artigo)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artigo, isOpen])

  const addAuthor = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    append({} as User)
  }

  return (
    <Form control={control}>
      <Modal 
        isOpen={isOpen} 
        onOpen={handleOpen} 
        onOpenChange={handleOpenChange}
        type="form"
        submitButton={<Button text="Enviar" handleClick={handleSubmit(onSubmit)} />}
      >
        <Controller 
          name="title"
          control={control}
          render={({field}) => <Input
            type="text" 
            label="Titulo do artigo"
            field={field}
          />} 
        />

        <div className="flex justify-center items-center gap-5">
          <Controller 
            name="file.type"
            control={control}
            render={({field}) => 
              <Select placeholder="Extensao" {...field}>
                <SelectItem 
                  value={ExtensaoArquivoEnum.PDF} 
                  key={ExtensaoArquivoEnum.PDF} 
                >
                  {'Arquivo PDF'}
                </SelectItem>
              </Select>}
          />
          
                  
          <Controller 
            name="file.url"
            control={control}
            render={({field}) => <Input
              type="text" 
              label="Link para o Pdf"
              field={field}
            />}
          />
        </div>

        <Controller 
          name="sinopse"
          control={control}
          render={({field}) => <TextArea label="Resumo do artigo" field={field} />}
        />
        <div className="w-full flex justify-between">
          Autores

          <Button text="Adicionar Autor" handleClick={addAuthor} />
        </div>


        {fields.map((item, index) => {
            return (
              <Controller 
              key={index}
              name={`authors.${index}.id`}
              control={control}
              render={({field}) =>
                <Select {...field} >
                  {autores!.map((user) => {
                    return <SelectItem className="text-black" key={user.id} >{user.name}</SelectItem>
                  })}
                </Select>
              }
            />
          )
        })}

        {artigo && role?.canEvaluate && 
          <Button 
            text="Avaliar artigo" 
            color="success" 
            variant="solid" 
            handleClick={handleOpenGradeModal} 
          />
        }
        
        {artigo && role.canEvaluate && <EvaluateArticleModal
         article={artigo!}  
         handleOpen={handleOpenGradeModal}
         handleOpenChange={handleOpenChangeGradeModal}
         isOpen={isGradeModalOpen}
        />}
      </Modal>
    </Form>
  )
}