import { User } from "@/types";
import { Button, Card, CardBody } from "@nextui-org/react";

interface UsuarioCardProps {
  data: User
}

export const UsuarioCard = ({data}: UsuarioCardProps) => {
  return <Card>
    <CardBody className="flex flex-col items-center justify-center gap-5">
      {data.name}

      <Button>Editar Permissões</Button>
    </CardBody>
  </Card>
}