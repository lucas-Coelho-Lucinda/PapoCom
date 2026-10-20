import { Pencil, Trash2 } from "lucide-react";
import { CheckboxLib } from "../../components/checkBox";
import {
  TooltipLib,
  TooltipProviderLib,
  TooltipTriggerLib,
  Tooltiplib,
} from "../../components/tooltip";
import type { Contact } from "./type";
import { formatFirstContact, getInitials } from "../../utils";

type ContactsTableProps = {
  contacts: Contact[];
  selectedIds: Set<number>;
  onToggleOne: (id: number) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  onTogglePage: (checked: boolean) => void;
  pageSelectionState: boolean | "indeterminate";
};

const iconButton =
  "inline-flex size-8 cursor-pointer items-center justify-center rounded-md " +
  "text-muted-foreground outline-none transition-colors " +
  "hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary";

function ContactAvatar({ name }: { name: string | null }) {
  // O AvatarLib tem borda dupla, sombra e tamanhos fixos que não batem com
  // a referência (círculo suave de 32px), então usamos um círculo local
  // com os mesmos tokens de cor do tema.
  return (
    <span
      aria-hidden="true"
      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-success-soft text-[11px] font-semibold text-success-strong"
    >
      {getInitials(name)}
    </span>
  );
}

type RowActionProps = {
  label: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
};

function RowAction({
  label,
  onClick,
  className = "",
  children,
}: RowActionProps) {
  return (
    <Tooltiplib>
      <TooltipTriggerLib asChild>
        <button
          type="button"
          aria-label={label}
          onClick={onClick}
          className={`${iconButton} ${className}`}
        >
          {children}
        </button>
      </TooltipTriggerLib>
      <TooltipLib>{label.split(" ")[0]}</TooltipLib>
    </Tooltiplib>
  );
}

export function ContactsTable({
  contacts,
  selectedIds,
  pageSelectionState,
  onTogglePage,
  onToggleOne,
  onEdit,
  onDelete,
}: ContactsTableProps) {
  return (
    <TooltipProviderLib delayDuration={300}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[44rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-soft text-left text-muted-foreground">
              <th scope="col" className="w-10 py-3 pl-4 pr-12">
                <div className="flex flex-row justify-start items-center gap-2 ">
                  <CheckboxLib
                    aria-label="Selecionar todos os contatos desta página"
                    checked={pageSelectionState}
                    onCheckedChange={(value) => onTogglePage(value === true)}
                  />
                  <p className="font-semibold">Ações</p>
                </div>
              </th>
              <th scope="col" className="px-2 py-3 font-semibold">
                Contato
              </th>
              <th scope="col" className="px-2 py-3 font-semibold">
                Número
              </th>
              <th scope="col" className="px-2 py-3 text-right font-semibold">
                Primeiro contato
              </th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((contact) => {
              const displayName = contact.name ?? "Sem nome";
              const isSelected = selectedIds.has(contact.id);

              return (
                <tr
                  key={contact.id}
                  data-state={isSelected ? "selected" : undefined}
                  className={`border-b border-border-soft last:border-b-0 hover:bg-secondary-hover ${
                    isSelected ? "bg-secondary-hover" : ""
                  }`}
                >
                  <td className="flex flex-row justify-center items-center gap-2 py-3 pl-4 px-2">
                    <CheckboxLib
                      aria-label={`Selecionar ${displayName}`}
                      checked={isSelected}
                      onCheckedChange={() => onToggleOne(contact.id)}
                    />
                    <div className="flex items-center justify-end gap-1">
                      <RowAction
                        label={`Editar ${displayName}`}
                        onClick={() => onEdit(contact)}
                      >
                        <Pencil className="size-4" aria-hidden="true" />
                      </RowAction>
                      <RowAction
                        label={`Excluir ${displayName}`}
                        onClick={() => onDelete(contact)}
                        className="hover:text-error"
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </RowAction>
                    </div>
                  </td>

                  <td className="px-2 py-3">
                    <div className="flex items-center gap-3">
                      <ContactAvatar name={contact.name} />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">
                          {displayName}
                        </p>
                        {contact.name === null ? (
                          <p className="truncate text-xs text-muted-foreground">
                            Nome não informado pelo WhatsApp
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </td>

                  <td className="px-2 py-3 font-mono text-xs text-foreground">
                    {contact.phone}
                  </td>

                  <td className="px-2 py-3 text-right text-muted-foreground">
                    {formatFirstContact(contact.firstContactAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TooltipProviderLib>
  );
}
