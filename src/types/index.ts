export type Article = {
  id: string 
  sinopse: string
  authorsId: string[]
  grades: {
    evaluatorId: string
    n1: number
    n2: number
    total: number
  }[]
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
  roleId: string
}