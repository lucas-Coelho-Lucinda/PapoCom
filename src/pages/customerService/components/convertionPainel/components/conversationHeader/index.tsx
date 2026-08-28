import { Contact, PhoneOff, UserRound } from "lucide-react";
import { AvatarLib } from "../../../../../../components/avatar";
import { Textlib } from "../../../../../../components/text";
import { ButtonLib } from "../../../../../../components/button";
import { CardLib } from "../../../../../../components/card";

export const ConversationHeader = ({
  onToggleContact,
}: {
  onToggleContact: () => void;
}) => {
  return (
    <CardLib
      padding="sm"
      colorBackeGround="default"
      border="none"
      width="full"
      height="fit"
      shadow="sm"
      className="flex items-center justify-between gap-3"
    >
      <div className="flex min-w-0 w-full items-center gap-3">
        <AvatarLib
          size="large"
          shadow="default"
          color="success"
          border="primary"
          photoOrText="JP"
        />
        <div className="min-w-0 flex flex-col  justify-center items-center">
          <Textlib
            as="h1"
            color="primary"
            size="md"
            className="truncate  font-semibold leading-5"
          >
            Joana Prado
          </Textlib>
          <Textlib
            as="span"
            color="primary"
            className="truncate text-xs font-semibold leading-4"
          >
            +5511998812345
          </Textlib>
        </div>
      </div>

      <div className="flex shrink-0 w-fit items-center gap-2">
        {/* Contato */}
        <ButtonLib
          size="small"
          shadow="min"
          colorBackeGround="secondary"
          colorBackeHouverGround="primary"
        >
          <Textlib
            as="span"
            size="xs"
            color="primary"
            colorHover="secondary"
            className="truncate leading-4 inline-flex items-center gap-1.5 p-3 -m-3"
          >
            <UserRound size={13} strokeWidth={2.4} />
            Caio Ribeiro
          </Textlib>
        </ButtonLib>

        {/* Informações */}
        <ButtonLib
          size="small"
          shadow="min"
          onClick={onToggleContact}
          colorBackeGround="secondary"
          colorBackeHouverGround="primary"
        >
          <Textlib
            as="span"
            size="xs"
            color="primary"
            colorHover="secondary"
            className="truncate leading-4 inline-flex items-center gap-1.5 p-3 -m-3"
          >
            <Contact size={14} strokeWidth={2.4} />
            Informações do contato
          </Textlib>
        </ButtonLib>

        {/* Encerrar */}
        <ButtonLib
          size="small"
          shadow="min"
          colorBackeGround="secondary"
          colorBackeHouverGround="error"
        >
          <Textlib
            as="span"
            size="xs"
            color="primary"
            colorHover="secondary"
            className="truncate leading-4 inline-flex items-center gap-1.5 p-3 -m-3"
          >
            <PhoneOff size={14} strokeWidth={2.4} />
            Encerrar
          </Textlib>
        </ButtonLib>
      </div>
    </CardLib>
  );
};
