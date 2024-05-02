'use client'

import { Role, User } from "@/types";
import { UsuarioCard } from "./components/usuario-card";
import { useFetch } from "@/lib/hooks/use-fetch";
import { useAuth } from "@/lib/hooks/use-auth";
import { Button } from "@/components/button/button";
import { useModal } from "@/lib/hooks/use-modal";
import { UsuarioModal } from "./components/usuario-modal";

export default function UsuariosPage() {
  const { role } = useAuth()
  const { data } = useFetch<User[]>('/users')

  const {data: roles} = useFetch<Role[]>('/roles')

  const {handleOpen, handleOpenChange, isOpen} = useModal()

  return <div className="flex flex-col gap-10 px-5">
    {role?.canManageUsers && <>
      <UsuarioModal handleOpen={handleOpen} handleOpenChange={handleOpenChange} isOpen={isOpen} isPhantom={true} roles={roles ?? []} />

      <div className="flex justify-end">
        <Button text="Registrar novo usuário" handleClick={() => handleOpen()} />
      </div>
    </>}

    <div className="grid grid-cols-5 gap-5">
      {data?.map((item) => <UsuarioCard
        roles={roles ?? []}
        key={item.id + item.name} 
        data={item} 
        isHidden={isHidden(role?.canManageUsers)} 
      />)}
    </div>
  </div>
}

function isHidden(canManageUsers?: boolean): boolean {
  return !canManageUsers ?? true
}