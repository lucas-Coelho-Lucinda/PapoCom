import { Helmet } from "react-helmet-async";
import type { Queue } from "./type";

const queues: Queue[] = [
  {
    id: 1,
    name: "Suporte técnico",
    waiting: 12,
    agents: 8,
    status: "active",
  },
  {
    id: 2,
    name: "Financeiro",
    waiting: 4,
    agents: 4,
    status: "active",
  },
  {
    id: 3,
    name: "Comercial",
    waiting: 0,
    agents: 2,
    status: "paused",
  },
];

export function Queues() {
  return (
    <>
      <Helmet title="Papo Com | Filas" />
      <section className="flex h-full min-h-0 flex-col bg-background p-4 text-foreground">
        <header className="mb-4">
          <h1 className="text-xl font-bold">Filas</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe as filas de atendimento.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {queues.map((queue) => (
            <article
              key={queue.id}
              className="rounded-lg border border-border bg-card p-4 hover:border-border-strong"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h2 className="font-semibold">{queue.name}</h2>

                <span
                  className={
                    queue.status === "active"
                      ? "rounded-full bg-success-soft px-2 py-1 text-xs font-semibold text-success-strong"
                      : "rounded-full bg-warning-soft px-2 py-1 text-xs font-semibold text-warning-strong"
                  }
                >
                  {queue.status === "active" ? "Ativa" : "Pausada"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md bg-secondary p-3">
                  <p className="text-xs text-muted-foreground">Aguardando</p>
                  <strong className="text-xl">{queue.waiting}</strong>
                </div>

                <div className="rounded-md bg-secondary p-3">
                  <p className="text-xs text-muted-foreground">Agentes</p>
                  <strong className="text-xl">{queue.agents}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
