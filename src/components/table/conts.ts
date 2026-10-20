export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;
export const DEFAULT_PAGE_SIZE = 10;

/**
 * O número é o que liga o contato ao WhatsApp/conversas. Deixe `false`
 * se, no backend, o histórico de conversas for vinculado pelo telefone.
 */
export const ALLOW_PHONE_EDIT = true;