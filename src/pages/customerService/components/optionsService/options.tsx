import {
  MessagesSquare,
  Inbox,
  Users,
  SquareUser,
  Smartphone,
} from "lucide-react";
import { Textlib } from "../../../../components/text";
import { CardLib } from "../../../../components/card";
import { ButtonLib } from "../../../../components/button";

export const optinsOperation = [
  {
    conponent: (
      <ButtonLib
        variant="accent"
        size="small"
        className="flex flex-row justify-start items-center gap-5 p-5"
      >
        <MessagesSquare color="#282C30" size={20} />
        <Textlib className="font-bold" as="h4" size="md" color="default">
          Atendimento
        </Textlib>
      </ButtonLib>
    ),
  },
];

export const optionsAdministration = [
  {
    conponent: (
      <ButtonLib
        variant="accent"
        size="small"
        className="flex flex-row justify-start items-center gap-5 p-5"
      >
        <Inbox color="#282C30" size={20} />

        <Textlib className="font-bold" as="h4" size="md" color="default">
          Filas
        </Textlib>
      </ButtonLib>
    ),
  },
  {
    conponent: (
      <ButtonLib
        variant="accent"
        size="small"
        className="flex flex-row justify-start items-center gap-5 p-5"
      >
        <Users color="#282C30" size={20} />

        <Textlib className="font-bold" as="h4" size="md" color="default">
          Usuario
        </Textlib>
      </ButtonLib>
    ),
  },
  {
    conponent: (
      <ButtonLib
        variant="accent"
        size="small"
        className="flex flex-row justify-start items-center gap-5 p-5"
      >
        <SquareUser color="#282C30" size={20} />

        <Textlib className="font-bold" as="h4" size="md" color="default">
          Contatos
        </Textlib>
      </ButtonLib>
    ),
  },
  {
    conponent: (
      <ButtonLib
        variant="accent"
        size="small"
        className="flex flex-row justify-start items-center gap-5 p-5"
      >
        <Smartphone color="#282C30" size={20} />

        <Textlib className="font-bold" as="h4" size="md" color="default">
          Dispositivo
        </Textlib>
      </ButtonLib>
    ),
  },
];
