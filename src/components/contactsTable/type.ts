export interface Contact  {
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