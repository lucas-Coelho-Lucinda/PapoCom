import { MessageSquareText } from "lucide-react";
import { CardLib } from "../../../../components/card";
import { Textlib } from "../../../../components/text";

export const DefautlPainelConvertion = () => {
  return (
    <CardLib
      padding="md"
      height="full"
      shadow="sm"
      border="none"
      colorBackeGround="muted"
      className="flex flex-col justify-center items-center gap-2"
    >
      <CardLib
        padding="md"
        width="fit"
        height="fit"
        shadow="sm"
        border="none"
        rounded="xl"
        colorBackeGround="secondary"
      >
        <MessageSquareText size={100} color="#144f44" />
      </CardLib>
      <Textlib as="h1" size="2xl" color="primary">
        Selecione um atendimento para começar
      </Textlib>
      <Textlib as="h1" className="break-normal text-center w-90" size="md" color="sendMessage">
        Escolha uma conversa na lista ao lado para visualizar o histórico e
        responder o cliente.
      </Textlib>
    </CardLib>
  );
};
