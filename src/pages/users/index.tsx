import { useState } from "react";
import type { User } from "./type";
import { Helmet } from "react-helmet-async";

const defaultUsers: User[] = [
  {
    id: 1,
    name: "Caio Ribeiro",
    email: "caio@empresa.com",
    role: "Administrador",
    status: "active",
  },
  {
    id: 2,
    name: "Marina Duarte",
    email: "marina@empresa.com",
    role: "Supervisora",
    status: "active",
  },
  {
    id: 3,
    name: "Lucas Mendes",
    email: "lucas@empresa.com",
    role: "Atendente",
    status: "inactive",
  },
];

export function Users() {
  const [users] = useState<User[]>(defaultUsers);

  return (
    <>
      <Helmet title="Papo Com | Usuários" />
      <section className="flex h-full min-h-0 flex-col bg-background p-4 text-foreground">
        <header className="mb-4">
          <h1 className="text-xl font-bold">Usuários</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie os usuários e suas permissões.
          </p>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-border bg-card">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between border-b border-border-soft p-4 last:border-b-0 hover:bg-secondary-hover"
            >
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="mt-1 text-xs text-secondary-foreground">
                  {user.role}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={
                    user.status === "active"
                      ? "rounded-full bg-success-soft px-2 py-1 text-xs font-semibold text-success-strong"
                      : "rounded-full bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground"
                  }
                >
                  {user.status === "active" ? "Ativo" : "Inativo"}
                </span>

                <button className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:border-border-strong hover:bg-secondary-hover">
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
