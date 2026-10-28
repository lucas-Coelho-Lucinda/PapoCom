import { useState } from "react";

import { Helmet } from "react-helmet-async";
import { ChevronDown, SearchX, Search, Trash2, UserX, X } from "lucide-react";
import { ConfirmDialog } from "../../components/dialog";
import { ContactModel } from "./components/contactModel";

import { InputLib } from "../../components/Input";

import { SelectLib } from "../../components/select";

import { useContactsList } from "./type";
import { EmptyState } from "../../components/empyState";
import { PaginationLib } from "../../components/pagination";

import { PAGE_SIZE_OPTIONS } from "../../components/table/conts";

import {
  Table,
  type ItensTableProps,
  type TableTargets,
} from "../../components/table";
import { defaultContacts, titlesContacts } from "./conts";
import { CardLib } from "../../components/card";

const plural = (count: number, singular: string, pluralForm: string) =>
  count === 1 ? singular : pluralForm;

const linkButton =
  "cursor-pointer rounded-sm text-sm font-medium text-primary underline-offset-2 " +
  "outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary";

export function Contacts() {
  const list = useContactsList(defaultContacts);

  const [editing, setEditing] = useState<ItensTableProps | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TableTargets | null>(null);

  const hasContacts = list.total > 0;
  const hasResults = list.filteredTotal > 0;
  const isSearching = list.search.trim().length > 0;

  const askDeleteOne = (contact: ItensTableProps) => {
    const contactName = [
      ...new Set(contact.columns.map((item) => item.value)),
    ][0];

    setDeleteTarget({
      ids: [contact.id],
      label: `(${contactName})`,
    });
  };

  const askDeleteSelected = () =>
    setDeleteTarget({
      ids: Array.from(list.selectedIds),
      label: `${list.selectedCount} ${plural(list.selectedCount, "contato", "contatos")}`,
    });

  const confirmDelete = () => {
    if (!deleteTarget) return;
    // Ao integrar com a API: await a chamada aqui, controle `isLoading`
    // no ConfirmDialog e só então atualize a lista.
    list.deleteContacts(deleteTarget.ids);
    setDeleteTarget(null);
  };

  const isBulkDelete = (deleteTarget?.ids.length ?? 0) > 1;

  return (
    <>
      <Helmet title="Papo Com | Contatos" />
      <section className="flex h-fit min-h-0 flex-col gap-4 bg-background py-4 px-4 text-foreground">
        {/* ------------------------------ Busca + total ------------------------------ */}
        <div className="flex  flex-col items-start justify-start gap-3">
          <div className="flex flex-row items-end gap-5">
            <div className="w-full max-w-sm">
              <InputLib
                type="text"
                inputSize="median"
                value={list.search}
                onChange={(event) => list.setSearch(event.target.value)}
                placeholder="Buscar por nome ou número"
                aria-label="Buscar contatos por nome ou número"
                autoComplete="off"
                leftIcon={<Search className="size-4" aria-hidden="true" />}
                rightIcon={
                  isSearching ? (
                    <button
                      type="button"
                      aria-label="Limpar busca"
                      onClick={() => list.setSearch("")}
                      className="cursor-pointer rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <X className="size-4" aria-hidden="true" />
                    </button>
                  ) : undefined
                }
              />
            </div>
            <SelectLib
              className="h-10 w-80"
              size="medium"
              IconDefault={
                <ChevronDown className="size-4" aria-hidden="true" />
              }
              value={String(list.pageSize)}
              onValueChange={(value) => list.setPageSize(Number(value))}
              options={PAGE_SIZE_OPTIONS.map((size) => ({
                value: String(size),
                label: `${size} por página`,
              }))}
            />
          </div>

          <p aria-live="polite" className="text-sm text-primary font-bold">
            Mostrando {list.from}–{list.to} de {list.filteredTotal}{" "}
            {plural(list.filteredTotal, "contato", "contatos")}
          </p>
        </div>

        {/* ------------------------- Barra de seleção em lote ------------------------- */}
        {list.selectedCount > 0 ? (
          <div
            role="region"
            aria-label="Ações em lote"
            className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-border bg-card px-4 py-2"
          >
            <p className="text-sm font-medium" aria-live="polite">
              {list.selectedCount}{" "}
              {plural(list.selectedCount, "selecionado", "selecionados")}
            </p>

            {list.selectedCount < list.filteredTotal ? (
              <button
                type="button"
                onClick={list.selectAllFiltered}
                className={linkButton}
              >
                Selecionar todos os {list.filteredTotal}{" "}
                {isSearching ? "resultados" : "contatos"}
              </button>
            ) : null}

            <button
              type="button"
              onClick={list.clearSelection}
              className={`${linkButton} text-muted-foreground`}
            >
              Limpar seleção
            </button>

            <button
              type="button"
              onClick={askDeleteSelected}
              className="ml-auto inline-flex h-8 cursor-pointer items-center gap-2 rounded-md bg-error px-3 text-sm font-medium text-secondary outline-none transition-all hover:opacity-90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Excluir selecionados
            </button>
          </div>
        ) : null}

        {/* --------------------------------- Tabela --------------------------------- */}
        <div className="min-h-0 flex flex-col  flex-1 overflow-y-auto rounded-lg border border-border bg-card shadow-sm">
          {!hasContacts ? (
            <EmptyState
              icon={<UserX className="size-6" aria-hidden="true" />}
              title="Nenhum contato ainda"
              description="Os números que conversarem com a empresa pelo WhatsApp aparecerão aqui."
            />
          ) : !hasResults ? (
            <EmptyState
              icon={<SearchX className="size-6" aria-hidden="true" />}
              title="Contato não encontrado"
              description={`Nenhum resultado para “${list.search.trim()}”. Confira o nome ou o número e tente novamente.`}
              action={
                <button
                  type="button"
                  onClick={() => list.setSearch("")}
                  className={linkButton}
                >
                  Limpar busca
                </button>
              }
            />
          ) : (
            <Table
              itens={list.items}
              titles={titlesContacts}
              selectedIds={list.selectedIds}
              pageSelectionState={list.pageSelectionState}
              onTogglePage={list.togglePage}
              onToggleOne={list.toggleOne}
              onEdit={setEditing}
              onDelete={askDeleteOne}
            />
          )}

          {/* --------------------------- Rodapé: contagem + paginação --------------------------- */}
          {hasResults ? (
            <CardLib
              padding="sm"
              width="full"
              height="fit"
              colorBackeGround="primary"
              className="flex flex-row items-center justify-end gap-3"
            >
              <PaginationLib
                page={list.page}
                pageCount={list.pageCount}
                onPageChange={list.setPage}
              />
            </CardLib>
          ) : null}
        </div>
      </section>

      {/* --------------------------------- Diálogos --------------------------------- */}
      <ContactModel
        contact={editing}
        onClose={() => setEditing(null)}
        onSubmit={list.updateContact}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        tone="danger"
        title={isBulkDelete ? "Excluir contatos?" : "Excluir contato?"}
        confirmLabel="Excluir"
        description={
          <>
            <strong className="font-semibold text-foreground">
              {deleteTarget?.label}
            </strong>{" "}
            {isBulkDelete ? "serão excluídos" : "será excluído"}. Esta ação não
            pode ser desfeita.
          </>
        }
        onConfirm={confirmDelete}
      />
    </>
  );
}
