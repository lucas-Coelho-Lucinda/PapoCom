import { useRef, useState } from "react";
import type { ConversationPanelProps, Message } from "./types";
import { MessageBubble } from "./components/messageBubble";
import { MessageComposer } from "./components/messageComposer";
import { ConversationHeader } from "./components/conversationHeader";
import {
  ScrollListLib,
  type ScrollListHandle,
} from "../../../../components/scrollList";
import { defaultMessages } from "./conts";
import { DefautlPainelConvertion } from "./components/defaultPainelConvertion";

export const ConversationPanel = ({
  onBack,
  callSelected,
  onToggleContact,
}: ConversationPanelProps) => {
  const idCall = callSelected?.id;
  const nameUser = callSelected?.user ?? "";
  const nameContact = callSelected?.name ?? "";
  const foneContact = callSelected?.fone ?? "";

  const [messages, setMessages] = useState<Message[]>(
    () =>
      defaultMessages.find((element) => element.id === idCall)?.mensagens ?? [],
  );
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
    <>
      {messages.length >= 1 ? (
        <div className="flex h-full min-h-0 flex-col overflow-hidden border border-l bg-[#f4f4ed]">
          <ConversationHeader
            key={idCall}
            nameUser={nameUser}
            nameContact={nameContact}
            foneContact={foneContact}
            onToggleContact={onToggleContact}
            onBack={onBack}
          />

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
                <MessageBubble key={message.id} nameUser={nameUser} message={message} />
              ))}
            </ScrollListLib>
          </div>

          <div className="shrink-0">
            <MessageComposer onSend={handleSend} />
          </div>
        </div>
      ) : (
        <DefautlPainelConvertion />
      )}
    </>
  );
};
