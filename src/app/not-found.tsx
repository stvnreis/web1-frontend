'use client'

import { Button } from "@/components/button/button";
import { Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter()

  return <div className="flex w-full h-screen items-center justify-center">
    <Card>
      <CardBody className="flex flex-col gap-5">
        <label>Oops. Página nao encontrada.</label>

        <Button handleClick={(e) => router.push('/management')} text="Voltar ao inicio" /> 
      </CardBody>
    </Card>
  </div>
}