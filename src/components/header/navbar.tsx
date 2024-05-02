'use client'

import { ChevronDown, Home } from 'lucide-react'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar as NextUiNavbar,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { User } from './user/user'

export const Navbar = () => {
  const router = useRouter()

  const icons = {
    chevron: <ChevronDown size={16} />,
  }

  const menu = [
    {
      title: 'Artigos',
      url: '/management/artigos',
    },
    {
      title: 'Usuários',
      url: '/management/usuarios',
    },
  ]

  const handleRouting = (url: string) => {
    router.push(url)
  }

  return (
    <NextUiNavbar className="bg-primary flex items-center">
      <NavbarContent>
        <NavbarItem className="flex h-full items-center">
          <button onClick={() => router.push('/management')}>
            <Home size={20} />
          </button>
        </NavbarItem>
        <Dropdown className="left-0 bg-primary">
          <NavbarItem>
            <DropdownTrigger>
              <Button disableRipple variant="light" endContent={icons.chevron}>
                Gerenciador de artigos
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <NavbarItem>
            <DropdownMenu>
              {menu.map((item) => (
                <DropdownItem
                  key={item.url}
                  onClick={() => handleRouting(item.url)}
                >
                  {item.title}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </NavbarItem>
        </Dropdown>
      </NavbarContent>

      <User />
    </NextUiNavbar>
  )
}