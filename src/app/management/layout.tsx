import { Navbar } from "@/components/header/navbar"
import { nextAuthOptions } from "@/lib/auth-options"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

export default async function ManagementLayout({children}: {children: ReactNode}) {
  const session = await getServerSession(nextAuthOptions)
  if (!session) {
    redirect('/auth')
  }

  return <>
  <Navbar />
    {children}
  </>
}