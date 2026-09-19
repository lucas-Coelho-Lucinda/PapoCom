import { FileText, Mail, PanelRightClose, Phone, Plus, X } from "lucide-react";
import { useState, type FormEvent } from "react";

import type { ContactNote } from "./type";

import { ScrollListLib } from "../../../../../../components/scrollList";
import { AvatarLib } from "../../../../../../components/avatar";
import { ButtonLib } from "../../../../../../components/button";
import { Textlib } from "../../../../../../components/text";
import { CollpasedContext } from "../../../../../../context/collapsed";
import { TextareaLib } from "../../../../../../components/textArea";
import { CardLib } from "../../../../../../components/card";

export const ContactInfoPanel = ({
  onClose,
  notes,
  onAddNote,
}: {
  onClose: () => void;
  notes: ContactNote[];
  onAddNote: (text: string) => void;
}) => {
  const { isCollapsed } = CollpasedContext();

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
    <div
      className={`flex h-full min-h-0 ${isCollapsed ? "w-100" : "w-80"} shrink-0 flex-col border-l border-slate-200 bg-white`}
    >
      <div className="flex flex-row  h-20.25 shrink-0 items-center justify-between  border-b border-slate-200 px-2">
        <Textlib as="h2" size="sm" color="default" className="font-semibold">
          Informações do contato
        </Textlib>

        <div>
          <ButtonLib
            onClick={onClose}
            colorBackeGround="none"
            colorBackeHouverGround="primary"
            size="median"
            shadow="none"
            className="mt-2 flex items-center justify-center"
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
        <div className="mt-2 flex w-full min-w-0 flex-col">
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

            <Textlib as="p" size="xs" color="primary" className="font-semibold">
              Cliente desde 01/06/2026, 09:00
            </Textlib>
          </div>

          <div className="space-y-3 border-b border-slate-300 py-4">
            <div className="flex gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-slate-500" />

              <div>
                <Textlib
                  as="p"
                  size="xs"
                  className="uppercase tracking-wide text-slate-500"
                >
                  Telefone
                </Textlib>

                <Textlib
                  as="p"
                  size="xs"
                  className="uppercase tracking-wide text-slate-500"
                >
                  +5511998812345
                </Textlib>
              </div>
            </div>

            <div className="flex gap-2.5">
              <Mail size={16} className="mt-0.5 shrink-0 text-slate-500" />

              <div>
                <Textlib as="p" size="xs" className="text-[11px] uppercase tracking-wide text-slate-500">
                  Meio de contato
                </Textlib>

                <Textlib as="p" size="xs" className="text-slate-500">
                  joana.prado@gmail.com
                </Textlib>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex flex-row items-center gap-2 ">
                <FileText size={17} className="text-slate-600" />

                <Textlib
                  as="h3"
                  size="sm"
                  color="default"
                  className="font-semibold"
                >
                  Anotações
                </Textlib>

                <Textlib
                  as="span"
                  size="xs"
                  color="default"
                  className="rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-600"
                >
                  {notes.length}
                </Textlib>
              </div>

              <ButtonLib
                type="button"
                shadow="none"
                size="median"
                textColor={isAddingNote ? "secondary" : "primary"}
                textColorHover="none"
                colorBackeGround={isAddingNote ? "error" : "muted"}
                colorBackeHouverGround="none"
                onClick={() => setIsAddingNote((current) => !current)}
                leftIcon={isAddingNote ? <X size={12} /> : <Plus size={12} />}
              >
                <Textlib as="span" size="xs" color="none" colorHover="none">
                  {isAddingNote ? "Cancelar" : "Nova anotação"}
                </Textlib>
              </ButtonLib>
            </div>

            {isAddingNote && (
              <CardLib
                padding="md"
                rounded="2xl"
                className="animate-fade-in"
                colorBackeGround="sendMessage"
              >
                <form onSubmit={handleAddNote}>
                  <TextareaLib
                    value={noteText}
                    textareaSize="median"
                    onChange={(event) => setNoteText(event.target.value)}
                    autoFocus
                    placeholder="Escreva uma anotação..."
                    rows={3}
                    className="focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />

                  <ButtonLib
                    shadow="min"
                    size="median"
                    textColor="none"
                    textColorHover="none"
                    colorBackeGround="success"
                    colorBackeHouverGround="none"
                    type="submit"
                    disabled={!noteText.trim()}
                    className="mt-2 inline-flex items-center px-3"
                  >
                    <Textlib as="span" size="xs" color="primary" colorHover="none">
                      Salvar anotação
                    </Textlib>
                  </ButtonLib>
                </form>
              </CardLib>
            )}

            <div className="space-y-3 p-2">
              {notes.map((note) => (
                <CardLib
                  key={note.id}
                  width="full"
                  height="full"
                  rounded="sm"
                  shadow="sm"
                  padding="sm"
                  colorBackeGround="default"
                  className="flex flex-col gap-2"
                >
                  <Textlib as="p" size="sm" color="message">
                    {note.text}
                  </Textlib>
                  <hr className="w-full border-t border-success" />
                  <CardLib
                    border="none"
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-1">
                      <AvatarLib
                        size="min"
                        shadow="none"
                        color="sendMessage"
                        border="none"
                        photoOrText="JP"
                      />

                      <Textlib
                        as="span"
                        size="xs"
                        color="primary"
                        className="font-semibold"
                      >
                        {note.author}
                      </Textlib>
                    </div>

                    <Textlib
                      as="span"
                      size="xs"
                      color="primary"
                      className="font-semibold"
                    >
                      {note.date}
                    </Textlib>
                  </CardLib>
                </CardLib>
              ))}
            </div>
          </div>
        </div>
      </ScrollListLib>
    </div>
  );
};
