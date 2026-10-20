import { Pencil, Trash2 } from "lucide-react";
import { CheckboxLib } from "../checkBox";
import {
  TooltipLib,
  TooltipProviderLib,
  TooltipTriggerLib,
  Tooltiplib,
} from "../tooltip";
import {
  formatFirstContact,
  formatWhatsAppPhone,
  getInitials,
} from "../../utils";

export interface columnsProps {
  id: number;
  text: string;
  value: string;
}
export type titlesColuns = {
  text: string;
};

export interface TableTargets {
  ids: number[];
  label: string;
}

export interface ItensTableProps {
  id: number;
  columns: columnsProps[];
}

type TableProps = {
  itens: ItensTableProps[];
  titles: titlesColuns[];
  selectedIds: Set<number>;
  onToggleOne: (id: number) => void;
  onEdit: (tableProps: ItensTableProps) => void;
  onDelete: (tableProps: ItensTableProps) => void;
  onTogglePage: (checked: boolean) => void;
  pageSelectionState: boolean | "indeterminate";
};

const iconButton =
  "inline-flex size-8 cursor-pointer items-center justify-center rounded-md " +
  "text-muted-foreground outline-none transition-colors " +
  "hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary";

/*
  Classes compartilhadas entre <th> e <td>.
  Como <tr> usa flex, o alinhamento só funciona se o cabeçalho e as linhas
  usarem exatamente a mesma largura e o mesmo padding em cada coluna.
*/
// Coluna de ações: largura fixa, nunca encolhe.
const actionsCell = "w-40 shrink-0 px-4";
// Colunas de dados: dividem o espaço restante igualmente (basis-0 ignora o conteúdo).
const dataCell = "min-w-0 flex-1 basis-0 px-5 py-3";

function AvatarTable({ name }: { name: string | null }) {
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

function CellContent({ column }: { column: columnsProps }) {
  const isDate = column.text.includes("Data");
  const isPhone = column.text.includes("Telefone");

  const text = isDate
    ? formatFirstContact(column.value)
    : isPhone
      ? formatWhatsAppPhone(column.value)
      : column.value;

  return (
    <div className="flex min-w-0 items-center gap-3">
      {column.text === "Nome" && <AvatarTable name={column.value} />}
      <p className="min-w-0 truncate font-medium text-foreground">{text}</p>
    </div>
  );
}

export function Table({
  itens,
  titles,
  selectedIds,
  pageSelectionState,
  onTogglePage,
  onToggleOne,
  onEdit,
  onDelete,
}: TableProps) {
  return (
    <TooltipProviderLib delayDuration={300}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-176 border-collapse text-sm">
          <thead>
            <tr className="flex w-full items-center border-b border-border-soft text-left text-muted-foreground">
              <th scope="col" className={`${actionsCell} py-3 text-left`}>
                <div className="flex items-center gap-2">
                  <CheckboxLib
                    aria-label="Selecionar todos os contatos desta página"
                    checked={pageSelectionState}
                    onCheckedChange={(value) => onTogglePage(value === true)}
                  />
                  <span className="font-semibold">Ações</span>
                </div>
              </th>
              {titles.map((title) => (
                <th
                  key={title.text}
                  scope="col"
                  className={`${dataCell} text-left font-semibold`}
                >
                  {title.text}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {itens.map((item) => {
              const isSelected = selectedIds.has(item.id);

              return (
                <tr
                  key={item.id}
                  data-state={isSelected ? "selected" : undefined}
                  className={`flex w-full items-center border-b border-border-soft last:border-b-0 hover:bg-secondary-hover ${
                    isSelected ? "bg-secondary-hover" : ""
                  }`}
                >
                  <td className={`${actionsCell} py-2`}>
                    <div className="flex items-center gap-2">
                      <CheckboxLib
                        aria-label={`Selecionar ${item.id}`}
                        checked={isSelected}
                        onCheckedChange={() => onToggleOne(item.id)}
                      />
                      <div className="flex items-center gap-1">
                        <RowAction
                          label={`Editar ${item.id}`}
                          onClick={() => onEdit(item)}
                        >
                          <Pencil className="size-4" aria-hidden="true" />
                        </RowAction>
                        <RowAction
                          label={`Excluir ${item.id}`}
                          onClick={() => onDelete(item)}
                          className="hover:text-error"
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </RowAction>
                      </div>
                    </div>
                  </td>

                  {item.columns.map((column) => (
                    <td key={column.id} className={`${dataCell}`}>
                      <CellContent column={column} />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TooltipProviderLib>
  );
}
