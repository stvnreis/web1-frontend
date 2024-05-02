
import { Modal } from "@/components/modal/modal"
import { Role } from "@/types"
import { Select, SelectItem } from "@nextui-org/react"
import { Input } from "@/components/input/input"
import { Controller, Form, SubmitHandler, useForm } from "react-hook-form"
import { Button } from "@/components/button/button"
import { usePost } from "@/lib/hooks/use-post"
import { usePatch } from "@/lib/hooks/use-patch"

interface UsuarioModalProps {
  usuario?: TUsuario
  isOpen: boolean,
  handleOpen: (b: boolean) => void
  handleOpenChange: (b: boolean) => void
  roles: Role[]
  isPhantom: boolean
}

export type TUsuario = {
  id: string
  name: string
  email: string
  password: string
  roleId: string
}

export const UsuarioModal = ({
  isOpen, 
  handleOpen, 
  handleOpenChange,
  usuario,
  roles,
  isPhantom,
}: UsuarioModalProps) => {

  const {
    control,
    register,
    handleSubmit,
  } = useForm<TUsuario>({
    defaultValues: isPhantom ? {
      name: '',
      email: '',
      password: '',
      roleId: ''
    } : {
      name: usuario!.name,
      email: usuario!.email,
      password: usuario!.password,
      roleId: usuario!.roleId
    }
  })

  const url = '/users'

  const {handlePost} = usePost<TUsuario>(url)
  const {handlePatch} = usePatch<TUsuario>('/users/' + usuario?.id)

  const onSubmit: SubmitHandler<TUsuario> = (data) => isPhantom ? handlePost(data) : handlePatch(data)

  return (
    <Form action={(data) => alert(JSON.stringify(data))} control={control}>
      <Modal 
        isOpen={isOpen} 
        onOpen={handleOpen} 
        onOpenChange={handleOpenChange}
        type="form"
        submitButton={<Button text="Enviar" handleClick={handleSubmit(onSubmit)} />}
      >

        <Controller 
          name="name"
          control={control}
          render={({field}) => 
            <Input
              type="text" 
              label="Nome"
              field={field}
            />}
        />
        
        <Controller 
          name="email"
          control={control}
          render={({field}) => 

            <Input
              type="text" 
              label="Email"
              field={field}
            />}
        />
        
        <Controller 
          name="password"
          control={control}
          render={({field}) => 
            <Input
              type="text" 
              label="Senha"
              field={field}
            />}
        />

        <Controller 
          name="roleId"
          control={control}
          render={({field}) => 
            <Select placeholder="Função" {...field}>
              {roles.map((role) => <SelectItem className="text-black" key={role.id} value={role.id} >{role.name}</SelectItem>)}
            </Select>
          }
        />
      </Modal>
    </Form>
  )
}