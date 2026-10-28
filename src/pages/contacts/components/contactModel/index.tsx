import { useState, type FormEvent } from "react";
import { FileText, Plus, UserRound, X } from "lucide-react";
import { Textlib } from "../../../../components/text";
import { InputLib } from "../../../../components/Input";
import { ButtonLib } from "../../../../components/button";
import { ALLOW_PHONE_EDIT } from "../../../../components/table/conts";
import { formatWhatsAppPhone, validatePhone } from "../../../../utils";
import type { ContactFormDialogProps, ContactFormProps } from "../type";
import { DialogContentLib, DialogLib } from "../../../../components/dialog";
import type { ContactNote } from "../../../customerService/components/convertionPainel/components/contactInfoPanel/type";
import { AvatarLib } from "../../../../components/avatar";
import { CardLib } from "../../../../components/card";
import { TextareaLib } from "../../../../components/textArea";
import { ScrollListLib } from "../../../../components/scrollList";

export function ContactModel({
  contact,
  onClose,
  onSubmit,
}: ContactFormDialogProps) {
  const defaultNotes: ContactNote[] = [
    {
      id: 1,
      text: "Cliente deseja marcar uma visita.",
      author: "Marina Duarte",
      date: "20/08/2026, 12:14",
    },
    {
      id: 2,
      text: "Oi",
      author: "Marina Duarte",
      date: "20/08/2026, 12:13",
    },
    {
      id: 3,
      text: "Oi",
      author: "Marina Duarte",
      date: "20/08/2026, 12:13",
    },
    {
      id: 4,
      text: "Contato preferencial por WhatsApp após as 18h. Não ligar pela manhã.",
      author: "Marina Duarte",
      date: "06/08/2026, 21:10",
    },
    {
      id: 5,
      text: "Cliente já teve duas quedas de sinal no mês. Priorizar visita técnica se repetir.",
      author: "Marina Duarte",
      date: "01/08/2026, 09:40",
    },
    {
      id: 6,
      text: "Cliente já teve duas quedas de sinal no mês. Priorizar visita técnica se repetir.",
      author: "Marina Duarte",
      date: "01/08/2026, 09:40",
    },
    {
      id: 7,
      text: "Cliente já teve duas quedas de sinal no mês. Priorizar visita técnica se repetir.",
      author: "Marina Duarte",
      date: "01/08/2026, 09:40",
    },
    {
      id: 8,
      text: "Cliente já teve duas quedas de sinal no mês. Priorizar visita técnica se repetir.",
      author: "Marina Duarte",
      date: "01/08/2026, 09:40",
    },
  ];

  const [notes, setNotes] = useState<ContactNote[]>(defaultNotes);

  function handleAddNote(text: string): void {
    setNotes((currentNotes) => [
      {
        id: Date.now(),
        text,
        author: "Caio Ribeiro",
        date: new Date().toLocaleString("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        }),
      },
      ...currentNotes,
    ]);
  }

  return (
    <DialogLib
      open={contact !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      {contact ? (
        <DialogContentLib
          headerBand
          headerClassName="bg-primary"
          icon={<UserRound className="size-9" aria-hidden="true" />}
          title="Editar contato"
          description="Atualize informações relevantes para seu atendimento."
        >
          {/* key: reinicia o formulário ao abrir outro contato */}
          <ContactForm
            key={contact.id}
            contact={contact}
            onCancel={onClose}
            notes={notes}
            onAddNote={handleAddNote}
            onSubmit={(values) => {
              const error = onSubmit(contact.id, values);
              if (!error) onClose();
              return error;
            }}
          />
        </DialogContentLib>
      ) : null}
    </DialogLib>
  );
}

/** Linha no padrão da referência: rótulo à esquerda, campo à direita, divisória acima. */
function FormRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 border-t border-border px-6 py-4 sm:grid-cols-[60px_1fr] sm:gap-4">
      <Textlib
        as="label"
        size="md"
        color="primary"
        className="pt-2 font-medium"
      >
        {label}
      </Textlib>
      <div className="min-w-0 space-y-1.5">{children}</div>
    </div>
  );
}

function ContactForm({
  contact,
  onCancel,
  onSubmit,
  onAddNote,
  notes,
}: ContactFormProps) {
  const uniqueValues = [...new Set(contact.columns.map((item) => item?.value))];
  const contactName = uniqueValues[0];
  const contactPhone = formatWhatsAppPhone(uniqueValues[1]);

  const [name, setName] = useState(contactName ?? "");
  const [phone, setPhone] = useState(contactPhone);
  const [phoneError, setPhoneError] = useState<string | null>(null);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = ALLOW_PHONE_EDIT ? validatePhone(phone) : null;
    if (validation) {
      setPhoneError(validation);
      return;
    }

    const serverError = onSubmit({ name, phone });
    if (serverError) setPhoneError(serverError);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="h-min-100">
      <FormRow label="Nome">
        <InputLib
          id="contact-name"
          value={name}
          maxLength={80}
          placeholder="Sem nome"
          autoComplete="off"
          onChange={(event) => setName(event.target.value)}
        />
        <Textlib
          as="span"
          size="xs"
          color="primary"
          className="block font-medium"
        >
          Deixe em branco para exibir:{" "}
          <Textlib as="span" size="xs" className="font-bold">
            “Sem nome”.
          </Textlib>
        </Textlib>
      </FormRow>

      <FormRow label="Número">
        <InputLib
          id="contact-phone"
          value={phone}
          inputMode="tel"
          autoComplete="off"
          readOnly={!ALLOW_PHONE_EDIT}
          aria-invalid={phoneError ? true : undefined}
          aria-describedby={phoneError ? "contact-phone-error" : undefined}
          onChange={(event) => {
            setPhone(event.target.value);
            if (phoneError) setPhoneError(null);
          }}
        />
        {phoneError ? (
          <p
            id="contact-phone-error"
            role="alert"
            className="text-xs text-error"
          >
            {phoneError}
          </p>
        ) : null}
      </FormRow>
      <FormRow label="E-mail">
        <InputLib
          id="contact-name"
          value={"joana.prado@gmail.com"}
          maxLength={80}
          placeholder="Sem nome"
          autoComplete="off"
          onChange={(event) => setName(event.target.value)}
        />
      </FormRow>
      <hr />
      <ScrollListLib
        className="px-4 py-4  flex flex-row justify-center items-center"
        variant="default"
        border="none"
        padding="none"
      >
        <div className="w-fit h-80">
          <div className="mb-4 flex items-center justify-between gap-2">
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

            <div>
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
          </div>

          {isAddingNote && (
            <CardLib
              padding="md"
              rounded="2xl"
              height="fit"
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
                  shadow="md"
                  size="median"
                  textColor="none"
                  textColorHover="none"
                  colorBackeGround="success"
                  colorBackeHouverGround="none"
                  type="submit"
                  disabled={!noteText.trim()}
                  className="mt-2 inline-flex items-center px-3"
                >
                  <Textlib
                    as="span"
                    size="xs"
                    color="primary"
                    colorHover="none"
                  >
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
                      textInfo="JP"
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
      </ScrollListLib>

      <div className="flex justify-end gap-2 border-t border-border px-6 py-4">
        <ButtonLib
          type="button"
          size="none"
          shadow="sm"
          colorBackeGround="default"
          textColor="primary"
          colorBackeHouverGround="none"
          textColorHover="none"
          onClick={onCancel}
          className="h-9 border border-border px-4 text-sm"
        >
          Cancelar
        </ButtonLib>
        <ButtonLib
          type="submit"
          size="none"
          colorBackeGround="primary"
          textColor="secondary"
          colorBackeHouverGround="none"
          textColorHover="none"
          className="h-9 px-4 text-sm"
        >
          Salvar
        </ButtonLib>
      </div>
    </form>
  );
}
