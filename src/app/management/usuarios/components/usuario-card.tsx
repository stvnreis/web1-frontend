import { Role, User } from "@/types";
import { Card, CardBody } from "@nextui-org/react";
import { Button } from "@/components/button/button";
import { MouseEvent } from "react";
import { TUsuario, UsuarioModal } from "./usuario-modal";
import { useModal } from "@/lib/hooks/use-modal";
import { useDelete } from "@/lib/hooks/use-delete";

interface UsuarioCardProps {
  data: User
  isHidden: boolean
  roles: Role[]
}

export const UsuarioCard = ({data, isHidden, roles}: UsuarioCardProps) => {
  const { isOpen, handleOpen, handleOpenChange } = useModal()

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    handleOpen()
  }

  const { handleDelete } = useDelete('/users/' + data.id)

  return (
    <div> 
      <Card>
        <CardBody className="flex flex-col items-center justify-center gap-5">
          <label>{data.name}</label>
          <p className="text-xs">{data.email}</p>
          <p>{data.role.name}</p>

        <div className="w-full flex justify-center gap-5">
          <Button 
            isHidden={isHidden} 
            handleClick={onClick} 
            text="Editar" 
          />
          <Button 
            isHidden={isHidden}
            handleClick={handleDelete}
            text="Excluir"
            color="danger"
          />
        </div>
          
        </CardBody>
      </Card>

      <UsuarioModal 
        handleOpen={handleOpen} 
        handleOpenChange={handleOpenChange} 
        isOpen={isOpen} 
        usuario={mapUsuario(data)} 
        roles={roles} 
        isPhantom={data.id === undefined} 
      />
    </div>
  )
}

function mapUsuario(usuario: User): TUsuario {

  return {
    id: usuario.id,
    name: usuario.name,
    email: usuario.email,
    password: usuario.password ?? '',
    roleId: usuario.role.id
  }
}