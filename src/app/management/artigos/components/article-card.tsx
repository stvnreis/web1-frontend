'use client'

import { Article, Author, Role, User } from "@/types"
import { Card, CardBody } from "@nextui-org/react"
import { SubmitArticleModal } from "./submit-article-modal"
import { useModal } from "@/lib/hooks/use-modal"
import { Button } from "@/components/button/button"
import { useDelete } from "@/lib/hooks/use-delete"
import { useAuth } from "@/lib/hooks/use-auth"
import { usePost } from "@/lib/hooks/use-post"

interface ArticleCardProps {
  data: Article
  autores: Author[]
}

export const ArticleCard = ({data, autores}: ArticleCardProps) => {
  const {role} = useAuth()
  const {handleOpen, handleOpenChange, isOpen} = useModal()

  const {handleDelete} = useDelete('/articles/' + data.id)
  const { handlePost } = usePost<Article>('/articles/' + data.id + '/publish')

  const handlePublish = () => {

    handlePost(data)
  }

  return <div>
    <SubmitArticleModal handleOpen={handleOpen} handleOpenChange={handleOpenChange} isOpen={isOpen} artigo={{...data, isPhantom: false}} autores={autores} />
    <Card className="w-full flex flex-col items-center justify-center">
      <CardBody className="gap-10 text-center">
        <label>{data.title}</label>

        <p>{data.gradeMd === null ? 'Artigo ainda não avaliado' : 'Nota Média: '.concat(data.gradeMd.toString())}</p>

        <div className="flex justify-center gap-5">
          <Button text="Abrir Artigo" handleClick={() => handleOpen()}/>
          <Button isHidden={!canDeleteArticle(role)} text="Remover Artigo" handleClick={handleDelete} color="danger" />
        </div>

        <Button isHidden={!canPublishArticle(role)} text="Publicar Artigo" handleClick={handlePublish} color="success" />
      </CardBody>
    </Card>
  </div>
}

function canDeleteArticle(role: Role) {
  
  return role.canDeleteArticlesFromAnyUser || role.canSubmitEditDeleteArticles
}

function canPublishArticle(role: Role) {

  return role.canPubilshArticle
}