import { ArrowLeft, Contact, PhoneOff, UserRound } from "lucide-react";
import { AvatarLib } from "../../../../../../components/avatar";
import { Textlib } from "../../../../../../components/text";
import { ButtonLib } from "../../../../../../components/button";
import { CardLib } from "../../../../../../components/card";

export const ConversationHeader = ({
  onToggleContact,
  onBack,
}: {
  onToggleContact: () => void;
  onBack?: () => void;
}) => {
  return (
    <CardLib
      padding="sm"
      colorBackeGround="default"
      border="none"
      width="full"
      height="none"
      shadow="sm"
      className="@container flex h-20 shrink-0 items-center justify-between gap-3"
    >
      <div className="flex min-w-0 w-full items-center gap-3">
        {onBack && (
          <ButtonLib
            type="button"
            size="small"
            shadow="xs"
            onClick={onBack}
            colorBackeGround="secondary"
            colorBackeHouverGround="primary"
            aria-label="Voltar para a lista de atendimentos"
            className="shrink-0 md:hidden"
          >
            <Textlib
              as="span"
              size="xs"
              color="primary"
              colorHover="secondary"
              className="inline-flex items-center p-3 -m-3"
            >
              <ArrowLeft size={16} strokeWidth={2.4} />
            </Textlib>
          </ButtonLib>
        )}
        <AvatarLib
          size="large"
          shadow="default"
          color="success"
          border="primary"
          textInfo="JP"
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
          aria-label="Atendente: Caio Ribeiro"
          size="small"
          shadow="xs"
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
            <span className="hidden @xl:inline">Caio Ribeiro</span>
          </Textlib>
        </ButtonLib>

        {/* Informações */}
        <ButtonLib
          size="small"
          shadow="xs"
          onClick={onToggleContact}
          aria-label="Informações do contato"
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
            <span className="hidden @xl:inline">Informações do contato</span>
          </Textlib>
        </ButtonLib>

        {/* Encerrar */}
        <ButtonLib
          aria-label="Encerrar atendimento"
          size="small"
          shadow="xs"
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
            <span className="hidden @xl:inline">Encerrar</span>
          </Textlib>
        </ButtonLib>
      </div>
    </CardLib>
  );
};
