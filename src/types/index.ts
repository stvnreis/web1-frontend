export type Article = {
  id: string
  title: string
  sinopse: string
  authors: Author[]
  grades: Grades[]
  file: {
    url: string
    type: string
  }
  gradeMd: number
  isPhantom: boolean
}

export type Grades = {
  evaluatorId: string
  n1: number
  n2: number
  total: number
}

export enum ExtensaoArquivoEnum {
  PDF = 'PDF'
}

export type Role = {
  id: string
  type: 'AUTOR' | 'ADMIN' | 'AVALIADOR'
  name: string
  canSubmitEditDeleteArticles: boolean
  canManageUsers: boolean
  canDeleteArticlesFromAnyUser: boolean
  canSubmitArticleToEvaluation: boolean
  canEvaluate: boolean
  canPubilshArticle: boolean
}

export type User = {
  id: string
  name: string
  email: string
  password?: string
  role: Role
}

export type Author = {
  id: string
  name: string
}

export type TResponse<T> = {
  data: T
  message?: string
}