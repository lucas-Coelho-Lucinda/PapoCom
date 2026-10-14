import { useRef, useState } from "react";
import type { ConversationPanelProps, Message } from "./types";
import { MessageBubble } from "./components/messageBubble";
import { MessageComposer } from "./components/messageComposer";
import { ConversationHeader } from "./components/conversationHeader";
import {
  ScrollListLib,
  type ScrollListHandle,
} from "../../../../components/scrollList";

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

export const ConversationPanel = ({
  onToggleContact,
  onBack,
}: ConversationPanelProps) => {
  const [messages, setMessages] = useState<Message[]>(defaultMessages);

  const scrollRef = useRef<ScrollListHandle>(null);

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

    // o envio do próprio usuário sempre força
    scrollRef.current?.scrollToBottom();
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden border border-l bg-[#f4f4ed]">
      <ConversationHeader onToggleContact={onToggleContact} onBack={onBack} />

      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-[radial-gradient(#d8ddd5_0.3px,transparent_0.3px)] bg-size-[14px_14px]">
        <ScrollListLib
          variant="none"
          border="none"
          padding="min"
          ref={scrollRef}
          stickToBottom={true}
          className="flex min-h-full flex-col gap-3 p-4"
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </ScrollListLib>
      </div>

      <div className="shrink-0">
        <MessageComposer onSend={handleSend} />
      </div>
    </div>
  );
};
