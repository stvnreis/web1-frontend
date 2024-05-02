import { Button } from '@/components/button/button'
import { Input } from '@/components/input/input'
import { TUserData } from '@/lib/hooks/use-auth'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { Eye, EyeOff } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const LoginCard = () => {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const {
    handleSubmit,
    control,
  } = useForm<TUserData>()

  const onSubmit: SubmitHandler<TUserData> = async (data) =>{
    toast.info('Autenticando...')

    const result = await signIn('credentials', {
      ...data,
      callbackUrl: '/management',
      redirect: false
    })

    if (result?.error) {
      toast.error('Usuário ou senha inválidos')
    }

    if(result?.ok) {
      toast.success('Login realizado com sucesso')
      
      router.push('/management')
    }
  }

  return (
    <form>
      <Card className="w-[500px]">
        <CardHeader>Fazer Login</CardHeader>
        <CardBody className="gap-4">
          <Controller
            name='email'
            control={control}
            render={({field}) => 
              <Input
                field={field}
                label="Email"
                type="text"
              />}
          />
          
          <Controller 
            name='password'
            control={control}
            render={({field}) => 
              <Input
                field={field}
                label="Senha"
                type={isVisible ? 'text' : 'password'}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? <Eye size={22} /> : <EyeOff size={22} />}
                  </button>
                }
              />}
          />
          
        </CardBody>
        <CardFooter className="w-full flex justify-center">
          <Button text="Entrar" handleClick={handleSubmit(onSubmit)} isHidden={false} />
        </CardFooter>
      </Card>
    </form>
  )
}