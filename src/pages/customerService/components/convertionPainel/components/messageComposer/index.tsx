import { ImagePlus, Paperclip, Send, Smile } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { CardLib } from "../../../../../../components/card";
import { TextareaLib } from "../../../../../../components/textArea";
import { ButtonLib } from "../../../../../../components/button";

export const MessageComposer = ({
  onSend,
}: {
  onSend: (text: string) => void;
}) => {
  const [value, setValue] = useState("");

  function handleSubmit(event: ChangeEvent<HTMLFormElement>): void {
    event.preventDefault();

    const text = value.trim();
    if (!text) return;

    onSend(text);
    setValue("");
  }

  return (
    <CardLib
      padding="md"
      height="fit"
      shadow="sm"
      border="none"
      className="flex flex-col min-w-0"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-row  justify-center items-center gap-5"
      >
        <TextareaLib
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Escreva uma mensagem"
          aria-label="Mensagem"
          className="min-w-0 flex-1"
        />

        <div className="flex items-center gap-5">
          <ButtonLib
            type="button"
            shadow="min"
            colorBackeGround="secondary"
            colorBackeHouverGround="primary"
            textColor="primary"
            textColorHover="secondary"
            aria-label="Adicionar emoji"
            size="none"
            className="w-9 h-9"
          >
            <Smile size={17} />
          </ButtonLib>
          <ButtonLib
            type="button"
            shadow="min"
            size="none"
            className="w-9 h-9"
            colorBackeGround="secondary"
            colorBackeHouverGround="primary"
            textColor="primary"
            textColorHover="secondary"
            aria-label="Adicionar negrito"
          >
            <strong>T</strong>
          </ButtonLib>
          <ButtonLib
            type="button"
            shadow="min"
            size="none"
            className="w-9 h-9"
            colorBackeGround="secondary"
            colorBackeHouverGround="primary"
            textColor="primary"
            textColorHover="secondary"
            aria-label="Anexar arquivo"
          >
            <Paperclip size={17} />
          </ButtonLib>
          <ButtonLib
            type="button"
            shadow="min"
            size="none"
            className="w-9 h-9"
            colorBackeGround="secondary"
            colorBackeHouverGround="primary"
            textColor="primary"
            textColorHover="secondary"
            aria-label="Adicionar imagem"
          >
            <ImagePlus size={17} />
          </ButtonLib>
        </div>

        <ButtonLib
          type="submit"
          shadow="min"
          size="none"
          className="w-10 h-10"
          colorBackeGround="primary"
          colorBackeHouverGround="success"
          textColor="secondary"
          textColorHover="secondary"
          aria-label="Enviar mensagem"
        >
          <Send size={18} />
        </ButtonLib>
      </form>
    </CardLib>
  );
};
