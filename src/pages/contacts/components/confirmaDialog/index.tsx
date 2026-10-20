import { useState } from "react";
import { formatWhatsAppPhone, validatePhone } from "../../../../utils";
import { InputLib } from "../../../../components/Input";
import { ButtonLib } from "../../../../components/button";
import { DialogContentLib, DialogLib } from "../../../../components/dialog";
import { ALLOW_PHONE_EDIT } from "../../../../components/table/conts";
import type { ContactFormValues } from "../../type";
import type { ItensTableProps } from "../../../../components/table";

type ContactFormProps = {
  contact: ItensTableProps;
  onCancel: () => void;
  onSubmit: (values: ContactFormValues) => string | null;
};

type ContactFormDialogProps = {
  /** `null` = fechado. */
  contact: ItensTableProps | null;
  onClose: () => void;
  /** Retorna a mensagem de erro (ex.: número duplicado) ou `null` se salvou. */
  onSubmit: (id: number, values: ContactFormValues) => string | null;
};

export function ContactFormDialog({
  contact,
  onClose,
  onSubmit,
}: ContactFormDialogProps) {
  return (
    <DialogLib
      open={contact !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      {contact ? (
        <DialogContentLib
          title="Editar contato"
          description="Atualize o nome ou o número deste contato."
        >
          {/* key: reinicia o formulário ao abrir outro contato */}
          <ContactForm
            key={contact.id}
            contact={contact}
            onCancel={onClose}
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

function ContactForm({ contact, onCancel, onSubmit }: ContactFormProps) {
  const contactName = [
    ...new Set(contact.columns.map((item) => item.value)),
  ][0];
  const contactPhone = formatWhatsAppPhone(
    [...new Set(contact.columns.map((item) => item.value))][1],
  );

  const [name, setName] = useState(contactName ?? "");
  const [phone, setPhone] = useState(contactPhone);
  const [phoneError, setPhoneError] = useState<string | null>(null);

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
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium">
          Nome
        </label>
        <InputLib
          id="contact-name"
          value={name}
          maxLength={80}
          placeholder="Sem nome"
          autoComplete="off"
          onChange={(event) => setName(event.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Deixe em branco para exibir “Sem nome”.
        </p>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-phone" className="text-sm font-medium">
          Número
        </label>
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
      </div>

      <div className="flex justify-end gap-2 pt-2">
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
