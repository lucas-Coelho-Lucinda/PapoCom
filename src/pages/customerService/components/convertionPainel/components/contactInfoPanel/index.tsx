import { FileText, Mail, PanelRightClose, Phone, Plus, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { ContactNote } from "./type";
import { ScrollListLib } from "../../../../../../components/scrollList";
import { AvatarLib } from "../../../../../../components/avatar";
import { ButtonLib } from "../../../../../../components/button";
import { Textlib } from "../../../../../../components/text";

export const ContactInfoPanel = ({
  onClose,
  notes,
  onAddNote,
}: {
  onClose: () => void;
  notes: ContactNote[];
  onAddNote: (text: string) => void;
}) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteText, setNoteText] = useState("");

  function handleAddNote(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const text = noteText.trim();
    if (!text) return;

    onAddNote(text);
    setNoteText("");
    setIsAddingNote(false);
  }

  return (
    <div className="flex h-full min-h-0 w-100 shrink-0 flex-col border-l border-slate-200 bg-white">
      <div className="flex flex-row  h-[93px] shrink-0 items-center justify-between  border-b border-slate-200 px-2">
        <h2 className="text-sm font-semibold text-slate-800">
          Informações do contato
        </h2>

        <div>
          <ButtonLib
            onClick={onClose}
            colorBackeGround="none"
            colorBackeHouverGround="primary"
            size="median"
            shadow="none"
            className="flex items-center justify-center mt-2"
          >
            <Textlib
              as="span"
              color="none"
              colorHover="secondary"
              size="sm"
              className="p-3 -m-3"
            >
              <PanelRightClose size={20} />
            </Textlib>
          </ButtonLib>
        </div>
      </div>

      <ScrollListLib
        variant="default"
        border="none"
        padding="min"
        className="min-h-0 flex-1 px-4 shadow-sm"
      >
        <div className="flex w-full min-w-0 flex-col mt-2">
          <div className="flex flex-col items-center border-b border-slate-200 pb-4">
            <AvatarLib
              size="extralarge"
              shadow="default"
              color="success"
              border="primary"
              photoOrText="JP"
            />

            <Textlib
              as="h1"
              size="lg"
              color="primary"
              className="mt-3 font-semibold"
            >
              Joana Prado de Almeida
            </Textlib>

            <Textlib as="p" size="xs" color="default" className="font-semibold">
              Cliente desde 01/06/2026, 09:00
            </Textlib>
          </div>

          <div className="space-y-3 border-b border-slate-300 py-4">
            <div className="flex gap-2.5">
              <Phone size={17} className="mt-0.5 shrink-0 text-slate-500" />
              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-500">
                  Telefone
                </p>
                <p className="text-sm text-slate-700">+5511998812345</p>
              </div>
            </div>

            <div className="flex gap-2.5">
              <Mail size={17} className="mt-0.5 shrink-0 text-slate-500" />
              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-500">
                  Meio de contato
                </p>
                <p className="text-sm text-slate-700">joana.prado@gmail.com</p>
                <span className="mt-1 inline-flex rounded-md border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700">
                  E-mail (Gmail)
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileText size={17} className="text-slate-600" />
                <h3 className="text-sm font-semibold text-slate-800">
                  Anotações
                </h3>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-600">
                  {notes.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsAddingNote((current) => !current)}
                className="inline-flex h-7 items-center gap-1 rounded-md border border-emerald-200 px-2 text-[11px] font-medium text-emerald-800 transition hover:bg-emerald-50"
              >
                {isAddingNote ? <X size={13} /> : <Plus size={13} />}
                <span className="hidden sm:inline">
                  {isAddingNote ? "Cancelar" : "Nova anotação"}
                </span>
              </button>
            </div>

            {isAddingNote && (
              <form
                onSubmit={handleAddNote}
                className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3"
              >
                <textarea
                  value={noteText}
                  onChange={(event) => setNoteText(event.target.value)}
                  autoFocus
                  placeholder="Escreva uma anotação..."
                  rows={3}
                  className="w-full resize-none rounded-lg border border-emerald-100 bg-white px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />

                <button
                  type="submit"
                  disabled={!noteText.trim()}
                  className="mt-2 inline-flex h-8 items-center rounded-lg bg-emerald-800 px-3 text-xs font-medium text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Salvar anotação
                </button>
              </form>
            )}

            <div className="space-y-2">
              {notes.map((note) => (
                <article
                  key={note.id}
                  className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <p className="text-sm leading-5 text-slate-700">
                    {note.text}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-2 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-50 text-[9px] text-emerald-800">
                        MD
                      </span>
                      {note.author}
                    </span>
                    <time>{note.date}</time>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </ScrollListLib>
    </div>
  );
};
