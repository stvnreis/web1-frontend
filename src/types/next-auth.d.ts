import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
    },
    role: {
      id: string
      name: string
      type: string
      canSubmitEditDeleteArticles: boolean
      canManageUsers: boolean
      canDeleteArticlesFromAnyUser: boolean
      canSubmitArticleToEvaluation: boolean
      canEvaluate: boolean
      canPubilshArticle: boolean
    }
    accessToken: string
  }
}