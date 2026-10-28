import type { ItensTableProps } from "../../../components/table";
import type { ContactNote } from "../../customerService/components/convertionPainel/components/contactInfoPanel/type";
import type { ContactFormValues } from "../type";

export type ContactFormProps = {
    notes: ContactNote[]
    contact: ItensTableProps;
    onCancel: () => void;
    onAddNote: (text: string) => void;
    onSubmit: (values: ContactFormValues) => string | null;
};

export type ContactFormDialogProps = {
    /** `null` = fechado. */
    contact: ItensTableProps | null;
    onClose: () => void;
    /** Retorna a mensagem de erro (ex.: número duplicado) ou `null` se salvou. */
    onSubmit: (id: number, values: ContactFormValues) => string | null;
};