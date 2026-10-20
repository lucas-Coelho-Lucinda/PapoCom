import { useMemo, useState } from "react";
import { DEFAULT_PAGE_SIZE } from "../../components/table/conts";
import { createContactMatcher, normalizePhone } from "../../utils";
import type { ItensTableProps } from "../../components/table";

export interface Contact {
  id: number;
  /** `null` quando o WhatsApp não informou o nome ("Sem nome"). */
  name: string | null;
  /** Formato internacional, ex.: +5511998812345. */
  phone: string;
  /** Data do primeiro contato em ISO 8601. */
  firstContactAt: string;
};

export type ContactFormValues = {
  name: string;
  phone: string;
};


/**
 * Estado da lista: busca, paginação e seleção.
 *
 * Hoje tudo roda no cliente. Quando ligar na API, a forma do retorno
 * (items / total / page / pageCount) pode ser mantida: basta trocar
 * `filtered`/`items` pelo resultado paginado do servidor.
 */
export function useContactsList(initialContacts: ItensTableProps[]) {
  const [contacts, setContacts] = useState<ItensTableProps[]>(initialContacts);
  const [search, setSearchState] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(DEFAULT_PAGE_SIZE);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    const matches = createContactMatcher(search);
    return contacts.filter(matches);
  }, [contacts, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  // Derivado (e não efeito): excluir o último item da última página
  // volta sozinho para a página anterior, sem render intermediário.
  const currentPage = Math.min(page, pageCount);

  const startIndex = (currentPage - 1) * pageSize;
  const items = filtered.slice(startIndex, startIndex + pageSize);

  const from = filtered.length === 0 ? 0 : startIndex + 1;
  const to = startIndex + items.length;

  /* ------------------------------- busca -------------------------------- */

  const setSearch = (value: string) => {
    setSearchState(value);
    setPage(1);
    // Limpa a seleção: evita excluir sem querer contatos que a nova
    // busca deixou fora da tela.
    setSelectedIds(new Set());
  };

  const setPageSize = (size: number) => {
    setPageSizeState(size);
    setPage(1);
  };

  /* ------------------------------ seleção ------------------------------- */

  const pageIds = items.map((contact) => contact.id);
  const selectedOnPage = pageIds.filter((id) => selectedIds.has(id)).length;

  const pageSelectionState: boolean | "indeterminate" =
    pageIds.length > 0 && selectedOnPage === pageIds.length
      ? true
      : selectedOnPage > 0
        ? "indeterminate"
        : false;

  const toggleOne = (id: number) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  /** Marca/desmarca só os itens da página visível. */
  const togglePage = (checked: boolean) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      pageIds.forEach((id) => (checked ? next.add(id) : next.delete(id)));
      return next;
    });

  /** Seleciona todos os resultados do filtro atual, em todas as páginas. */
  const selectAllFiltered = () =>
    setSelectedIds(new Set(filtered.map((contact) => contact.id)));

  const clearSelection = () => setSelectedIds(new Set());

  /* ------------------------------- ações -------------------------------- */

  const deleteContacts = (ids: number[]) => {
    const toRemove = new Set(ids);
    setContacts((prev) => prev.filter((contact) => !toRemove.has(contact.id)));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      toRemove.forEach((id) => next.delete(id));
      return next;
    });
  };

  /** Retorna a mensagem de erro, ou `null` se salvou. */
  const updateContact = (id: number, values: ContactFormValues) => {
    const phone = normalizePhone(values.phone);
    /*  const duplicated = contacts.some(
       (contact) =>
         contact.id !== id && digitsOnly(contact.text) === digitsOnly(phone),
     );
     if (duplicated) return "Já existe um contato com este número."; */

    const name = values.name.trim();
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? { ...contact, name: name || null, phone }
          : contact,
      ),
    );
    return null;
  };

  return {
    // dados
    items,
    total: contacts.length,
    filteredTotal: filtered.length,
    from,
    to,
    // busca / paginação
    search,
    setSearch,
    page: currentPage,
    pageCount,
    setPage,
    pageSize,
    setPageSize,
    // seleção
    selectedIds,
    selectedCount: selectedIds.size,
    pageSelectionState,
    toggleOne,
    togglePage,
    selectAllFiltered,
    clearSelection,
    // ações
    deleteContacts,
    updateContact,
  };
}
