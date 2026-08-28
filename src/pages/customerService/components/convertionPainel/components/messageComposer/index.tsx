import { ImagePlus, Paperclip, Send, Smile } from "lucide-react";
import { useState, type ChangeEvent } from "react";

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
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-slate-200 bg-white/95 p-3"
    >
      <div className="flex h-10 min-w-0 flex-1 items-center rounded-lg border border-slate-200 bg-white px-3 shadow-sm transition focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Escreva uma mensagem"
          aria-label="Mensagem"
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />

        <div className="flex items-center gap-0.5 text-slate-500">
          <button
            type="button"
            aria-label="Adicionar emoji"
            className="grid h-7 w-7 place-items-center rounded-md transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            <Smile size={17} />
          </button>
          <button
            type="button"
            aria-label="Formatar texto"
            className="grid h-7 w-7 place-items-center rounded-md text-sm transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            <strong>T</strong>
          </button>
          <button
            type="button"
            aria-label="Anexar arquivo"
            className="grid h-7 w-7 place-items-center rounded-md transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            <Paperclip size={17} />
          </button>
          <button
            type="button"
            aria-label="Adicionar imagem"
            className="grid h-7 w-7 place-items-center rounded-md transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            <ImagePlus size={17} />
          </button>
        </div>
      </div>

      <button
        type="submit"
        aria-label="Enviar mensagem"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-800 text-white shadow-md shadow-emerald-900/20 transition hover:bg-emerald-900 active:scale-[.97]"
      >
        <Send size={18} />
      </button>
    </form>
  );
};
