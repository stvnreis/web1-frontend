'use client'

import { Article, Author, User } from "@/types";
import { ArticleCard } from "./components/article-card";
import { Button } from "@/components/button/button";
import { useFetch } from "@/lib/hooks/use-fetch";
import { useAuth } from "@/lib/hooks/use-auth";
import { useModal } from "@/lib/hooks/use-modal";
import { SubmitArticleModal } from "./components/submit-article-modal";

export default function ArtigosPage() {
  const { role } = useAuth()
  const { data } = useFetch<Article[]>('/articles')
  const {data: users} = useFetch<Author[]>('/authors')

  const { isOpen, handleOpen, handleOpenChange } = useModal()

  return <div className="flex flex-col px-5 pt-5">
    <div className="flex justify-end">
      <Button 
        isHidden={isHidden(role?.canPubilshArticle)} 
        handleClick={() => handleOpen()} 
        text="Criar artigo" 
      />

      <SubmitArticleModal 
        handleOpen={handleOpen} 
        isOpen={isOpen} 
        handleOpenChange={handleOpenChange} 
        autores={users ?? []} 
      />
    </div>

    <div className="mt-5 grid grid-cols-4 gap-5">
      {data?.map((item) => <ArticleCard data={item} key={item.id + item.sinopse} autores={users ?? []} />)}
    </div>
  </div>
}

function isHidden(canPublishArticle?: boolean): boolean {
  return !canPublishArticle ?? false
}