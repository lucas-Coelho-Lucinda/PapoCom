import type { Contact } from "../components/contactsTable/type";

/** Minúsculas e sem acentos, para busca tolerante ("jose" acha "José"). */
export const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const digitsOnly = (value: string) => value.replace(/\D/g, "");

/**
 * Cria o predicado de busca por nome OU número.
 * - Nome: ignora acentos e maiúsculas.
 * - Número: compara só os dígitos, então "11 99881", "(11) 99881"
 *   e "+5511998" encontram o mesmo contato.
 */
export function createContactMatcher(query: string) {
  const text = normalizeText(query);
  const digits = digitsOnly(query);

  if (!text) return () => true;

  return (contact: Contact) => {
    const nameMatch =
      contact.name !== null && normalizeText(contact.name).includes(text);
    const phoneMatch =
      digits.length > 0 && digitsOnly(contact.phone).includes(digits);
    return nameMatch || phoneMatch;
  };
}

export function getInitials(name: string | null): string {
  if (!name) return "";
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

const pad = (n: number) => String(n).padStart(2, "0");

/** 2026-06-01T09:00:00 -> "01/06/2026, 09:00" (mesmo formato da referência). */
export function formatFirstContact(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}, ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** Remove máscara e garante o "+" inicial. */
export const normalizePhone = (value: string) => `+${digitsOnly(value)}`;

/** E.164 permite de 8 a 15 dígitos; exigimos DDI + DDD, então mínimo 10. */
export function validatePhone(value: string): string | null {
  const digits = digitsOnly(value);
  if (digits.length < 10 || digits.length > 15) {
    return "Informe o número com DDI e DDD. Ex.: +5511998812345";
  }
  return null;
}