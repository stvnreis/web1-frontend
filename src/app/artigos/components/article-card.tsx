'use client'

import { Article } from "@/types"
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { MouseEvent } from "react"

interface ArticleCardProps {
  data: Article
}

export const ArticleCard = ({data}: ArticleCardProps) => {
  const router = useRouter()

  const redirect = (e: MouseEvent) => {
    e.preventDefault()

    router.push('artigos/' + data.id)

    console.log('oi')
  }

  return <Card className="w-full flex flex-col items-center justify-center">
    <CardBody>
      <label>{data.sinopse}</label>

      <Button onClick={(e) => redirect(e)}>Abrir Artigo</Button>
    </CardBody>
  </Card>
}