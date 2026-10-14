import { ImagePlus, Paperclip, Send, Smile } from "lucide-react";
import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { CardLib } from "../../../../../../components/card";
import { TextareaLib } from "../../../../../../components/textArea";
import { ButtonLib } from "../../../../../../components/button";
import type { MessageComposerProps } from "./type";

export const MessageComposer = ({ onSend }: MessageComposerProps) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    const MAX_TEXTAREA_HEIGHT = 160;

    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
    }
  };

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setValue("");

    const el = textareaRef.current;
    if (el) el.style.height = "auto";
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    handleSend();
  }

  return (
    <CardLib
      padding="md"
      height="fit"
      shadow="sm"
      border="none"
      className="w-full min-w-0 shrink-0"
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-3"
      >
        <div className="min-w-0 basis-full sm:basis-0 sm:flex-1">
          <TextareaLib
            ref={textareaRef}
            value={value}
            rows={1}
            textareaSize="small"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={false}
            placeholder="Digite sua mensagem..."
            aria-label="Mensagem"
          />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ButtonLib
            type="button"
            shadow="xs"
            colorBackeGround="secondary"
            colorBackeHouverGround="primary"
            textColor="primary"
            textColorHover="secondary"
            aria-label="Adicionar emoji"
            size="none"
            className="w-10 h-10"
          >
            <Smile size={17} />
          </ButtonLib>
          <ButtonLib
            type="button"
            shadow="xs"
            size="none"
            className="w-10 h-10"
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
            shadow="xs"
            size="none"
            className="w-10 h-10"
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
            shadow="xs"
            size="none"
            className="w-10 h-10"
            colorBackeGround="secondary"
            colorBackeHouverGround="primary"
            textColor="primary"
            textColorHover="secondary"
            aria-label="Adicionar imagem"
          >
            <ImagePlus size={17} />
          </ButtonLib>
        </div>
        <div className="ml-auto shrink-0 sm:ml-0">
          <ButtonLib
            type="submit"
            shadow="lg"
            size="none"
            className="w-15 h-10"
            colorBackeGround="primary"
            colorBackeHouverGround="success"
            textColor="secondary"
            textColorHover="secondary"
            aria-label="Enviar mensagem"
            disabled={!value.trim()}
          >
            <Send size={18} />
          </ButtonLib>
        </div>
      </form>
    </CardLib>
  );
};
