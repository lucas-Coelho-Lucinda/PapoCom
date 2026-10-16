import { useState } from "react";
import { TabsCall } from "./components/TabsCall";
import { ConversationPanel } from "./components/convertionPainel";

import type { ContactNote } from "./components/convertionPainel/components/contactInfoPanel/type";
import { ContactInfoPanel } from "./components/convertionPainel/components/contactInfoPanel";
import type { CallSelected } from "./components/convertionPainel/types";

export const CustomerService = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState<CallSelected>(null);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const defaultNotes: ContactNote[] = [
    {
      id: 1,
      text: "Cliente deseja marcar uma visita.",
      author: "Marina Duarte",
      date: "20/08/2026, 12:14",
    },
    {
      id: 2,
      text: "Oi",
      author: "Marina Duarte",
      date: "20/08/2026, 12:13",
    },
    {
      id: 3,
      text: "Oi",
      author: "Marina Duarte",
      date: "20/08/2026, 12:13",
    },
    {
      id: 4,
      text: "Contato preferencial por WhatsApp após as 18h. Não ligar pela manhã.",
      author: "Marina Duarte",
      date: "06/08/2026, 21:10",
    },
    {
      id: 5,
      text: "Cliente já teve duas quedas de sinal no mês. Priorizar visita técnica se repetir.",
      author: "Marina Duarte",
      date: "01/08/2026, 09:40",
    },
    {
      id: 6,
      text: "Cliente já teve duas quedas de sinal no mês. Priorizar visita técnica se repetir.",
      author: "Marina Duarte",
      date: "01/08/2026, 09:40",
    },
    {
      id: 7,
      text: "Cliente já teve duas quedas de sinal no mês. Priorizar visita técnica se repetir.",
      author: "Marina Duarte",
      date: "01/08/2026, 09:40",
    },
    {
      id: 8,
      text: "Cliente já teve duas quedas de sinal no mês. Priorizar visita técnica se repetir.",
      author: "Marina Duarte",
      date: "01/08/2026, 09:40",
    },
  ];
  const [notes, setNotes] = useState<ContactNote[]>(defaultNotes);

  function handleAddNote(text: string): void {
    setNotes((currentNotes) => [
      {
        id: Date.now(),
        text,
        author: "Caio Ribeiro",
        date: new Date().toLocaleString("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        }),
      },
      ...currentNotes,
    ]);
  }

  const gridCols = isContactOpen
    ? "xl:grid-cols-[minmax(0,3fr)_minmax(0,4fr)_minmax(0,2fr)]"
    : "xl:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_minmax(0,0fr)]";

  return (
    <div
      className={`grid h-199 min-h-0 w-full min-w-0 grid-cols-1 grid-rows-[minmax(0,1fr)] overflow-hidden transition-[grid-template-columns] duration-300 ease-in-out md:grid-cols-[minmax(15rem,0.5fr)_minmax(0,1.5fr)] ${gridCols}`}
    >
      {/* Lista de atendimentos: tela cheia no celular, coluna fixa a partir do tablet */}
      <div
        className={`${
          mobileView === "list" ? "block" : "hidden"
        } min-h-0 min-w-0 overflow-hidden md:block`}
      >
        <TabsCall
          onSelectCall={() => setMobileView("chat")}
          setSelectedCall={setSelectedCall}
        />
      </div>

      {/* Conversa: tela cheia no celular, com botão de voltar para a lista */}
      <div
        className={`${
          mobileView === "chat" ? "block" : "hidden"
        } min-h-0 min-w-0 overflow-hidden md:block`}
      >
        <ConversationPanel
          key={selectedCall?.id}
          callSelected={selectedCall}
          onToggleContact={() => setIsContactOpen((v) => !v)}
          onBack={() => setMobileView("list")}
        />
      </div>

      {/* Informações do contato: gaveta sobreposta abaixo de xl, terceira coluna em xl+ */}
      {isContactOpen && (
        <>
          <div
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-black/40 xl:hidden"
            onClick={() => setIsContactOpen(false)}
          />
          <div className="animate-slide-in-right fixed inset-y-0 right-0 z-50 min-h-0 w-[min(22rem,90vw)] min-w-0 overflow-hidden shadow-xl xl:static xl:z-auto xl:w-auto xl:shadow-none">
            <ContactInfoPanel
              onAddNote={handleAddNote}
              onClose={() => setIsContactOpen(false)}
              notes={notes}
            />
          </div>
        </>
      )}
    </div>
  );
};
