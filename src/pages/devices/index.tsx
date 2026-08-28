import type { Device } from "./types";


const devices: Device[] = [
  {
    id: 1,
    name: "Gateway principal",
    type: "Gateway",
    status: "online",
  },
  {
    id: 2,
    name: "Roteador filial norte",
    type: "Roteador",
    status: "offline",
  },
];

export function Devices() {
  return (
    <section className="flex h-full min-h-0 flex-col bg-background p-4 text-foreground">
      <header className="mb-4">
        <h1 className="text-xl font-bold">Devices</h1>
        <p className="text-sm text-muted-foreground">
          Visualize os dispositivos conectados.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {devices.map((device) => (
          <article
            key={device.id}
            className="rounded-lg border border-border bg-card p-4 transition hover:border-border-strong hover:bg-secondary-hover"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold">{device.name}</h2>
                <p className="text-sm text-muted-foreground">{device.type}</p>
              </div>

              <span
                className={
                  device.status === "online"
                    ? "rounded-full bg-success-soft px-2 py-1 text-xs font-semibold text-success-strong"
                    : "rounded-full bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground"
                }
              >
                {device.status === "online" ? "Online" : "Offline"}
              </span>
            </div>

            <button className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:border-border-strong hover:bg-secondary-hover">
              Ver detalhes
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
