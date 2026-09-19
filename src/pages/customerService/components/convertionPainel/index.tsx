import { useState } from "react";
import type { Message } from "./types";
import { MessageBubble } from "./components/messageBubble";
import { MessageComposer } from "./components/messageComposer";
import { ConversationHeader } from "./components/conversationHeader";
import { ContactInfoPanel } from "./components/contactInfoPanel";
import type { ContactNote } from "./components/contactInfoPanel/type";

const defaultMessages: Message[] = [
  {
    id: 1,
    type: "system",
    author: "Mensagem automática",
    text: "Olá! Você está na fila de Suporte Técnico. Em instantes um atendente assume sua conversa.",
    time: "21:31",
    date: "18/09/2026",
  },
  {
    id: 2,
    type: "received",
    text: "Bom dia, minha internet caiu desde ontem à noite.",
    time: "21:33",
    date: "18/09/2026",
  },
  {
    id: 3,
    type: "sent",
    author: "Caio Ribeiro",
    text: "Bom dia, Joana! Sou o Caio. Já estou verificando o sinal da sua região.",
    time: "21:36",
    date: "18/09/2026",
  },
  {
    id: 4,
    type: "received",
    text: "Obrigada! O modem fica com a luz vermelha piscando.",
    time: "21:44",
    date: "19/09/2026",
  },
  {
    id: 5,
    type: "sent",
    author: "Caio Ribeiro",
    text: "Certo. Vou enviar um reset remoto agora. Pode desligar o aparelho da tomada por 30 segundos?",
    time: "21:52",
    date: "19/09/2026",
  },
];

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

export const ConversationPanel = () => {
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [notes, setNotes] = useState<ContactNote[]>(defaultNotes);
  const [isContactOpen, setIsContactOpen] = useState(false);

  function handleSend(text: string): void {
    const now = new Date();
    const time = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        type: "sent",
        author: "Caio Ribeiro",
        text,
        time,
      },
    ]);
  }

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

  return (
    <div className="relative flex h-full min-h-0 w-full border border-l overflow-hidden bg-[#f4f4ed]">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <ConversationHeader
          onToggleContact={() => setIsContactOpen((current) => !current)}
        />

        <div className="min-h-0 flex-1 shadow-sm overflow-y-auto bg-[radial-gradient(#d8ddd5_0.7px,transparent_0.7px)] [background-size:14px_14px]">
          <div className="flex min-h-full flex-col gap-3 p-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        </div>

        <MessageComposer onSend={handleSend} />
      </div>

      <div className={`h-full min-h-0 ${isContactOpen ? "block animate-slide-in-right" : "hidden"}`}>
        <ContactInfoPanel
          notes={notes}
          onAddNote={handleAddNote}
          onClose={() => setIsContactOpen(false)}
        />
      </div>
    </div>
  );
};
