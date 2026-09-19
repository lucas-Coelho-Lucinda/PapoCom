import { useState } from "react";
import type { Contact } from "./type";
import { Helmet } from "react-helmet-async";

const defaultContacts: Contact[] = [
  {
    id: 1,
    name: "Joana Martins",
    phone: "+55 11 99821-4420",
    status: "active",
  },
  {
    id: 2,
    name: "Rafael Souza",
    phone: "+55 11 98742-1130",
    status: "inactive",
  },
];

export function Contacts() {
  const [contacts] = useState<Contact[]>(defaultContacts);

  return (
    <>
      <Helmet title="Papo Com | Contatos" />
      <section className="flex h-full min-h-0 flex-col bg-background p-4 text-foreground">
        <header className="mb-4">
          <h1 className="text-xl font-bold">Contatos</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie os contatos cadastrados.
          </p>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-border bg-card">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between border-b border-border-soft p-4 last:border-b-0 hover:bg-secondary-hover"
            >
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.phone}</p>
              </div>

              <span
                className={
                  contact.status === "active"
                    ? "rounded-full bg-success-soft px-2 py-1 text-xs font-semibold text-success-strong"
                    : "rounded-full bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground"
                }
              >
                {contact.status === "active" ? "Ativo" : "Inativo"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
