'use client'

import { useAuth } from '@/lib/hooks/use-auth'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarContent,
} from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'

export const User = () => {
  const { role, user } = useAuth()

  return (
    <NavbarContent as="div" justify="end">
      <Dropdown placement="bottom-end" className='bg-primary'>
        <DropdownTrigger>
          <Avatar as="button" name={user?.name} />
        </DropdownTrigger>

        <DropdownMenu>
          <DropdownItem>
            <p>{user?.email}</p>
            <p>{role?.name}</p>
          </DropdownItem>
          <DropdownItem key="settings">Minhas configurações</DropdownItem>
          <DropdownItem key="logout" onClick={() => signOut()}>
            Sair
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  )
}