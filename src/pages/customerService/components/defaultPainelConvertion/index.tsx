import { MessageSquareText } from "lucide-react";
import { CardLib } from "../../../../components/card";
import { Textlib } from "../../../../components/text";

export const DefautlPainelConvertion = () => {
  return (
    <CardLib
      padding="md"
      height="full"
      shadow="sm"
      border="default"
      colorBackeGround="none"
      className="flex flex-col justify-center items-center gap-2 bg-linear-to-br from-success/50 from-20% via-secondary via-48% to-success/50 to-90%"
    >
      <CardLib
        padding="md"
        width="fit"
        height="fit"
        shadow="md"
        border="none"
        rounded="xl"
        colorBackeGround="secondary"
      >
        <MessageSquareText size={100} color="#144f44" />
      </CardLib>
      <Textlib as="h1" size="2xl" color="primary">
        Selecione um atendimento para começar
      </Textlib>
      <Textlib
        as="h1"
        className="break-normal text-center w-90"
        size="md"
        color="primary"
      >
        Escolha uma conversa na lista ao lado para visualizar o histórico e
        responder o cliente.
      </Textlib>
    </CardLib>
  );
};
