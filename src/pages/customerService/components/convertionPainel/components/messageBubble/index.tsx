import { AvatarLib } from "../../../../../../components/avatar";
import { CardLib } from "../../../../../../components/card";
import { Textlib } from "../../../../../../components/text";

import type { Message } from "../../types";

export const MessageBubble = ({ message }: { message: Message }) => {
  const isSent = message.type === "sent" || message.type === "system";

  const isServiceStatus =
    message.type === "start" ||
    message.type === "system" ||
    message.type === "end";

  return (
    <div className="flex w-full justify-center">
      {isServiceStatus ? (
        <CardLib
          width="full"
          height="full"
          rounded="sm"
          shadow="sm"
          padding="sm"
          colorBackeGround="secondary"
          className="flex flex-col justify-between items-center gap-2"
        >
          <Textlib as="h3" size="sm" className="font-semibold" color="primary">
            {message.type === "system" && "Atendimento iniciado"}
            {message.type === "service" && "Atendimento em andamento"}
            {message.type === "end" && "Atendimento finalizado"}
          </Textlib>
          <hr className="w-full border-t border-success" />
          <CardLib
            border="none"
            colorBackeGround="none"
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-1">
              <AvatarLib
                size="min"
                shadow="none"
                color="sendMessage"
                border="none"
                photoOrText="JP"
              />

              <Textlib
                as="span"
                size="xs"
                color="primary"
                className="font-semibold"
              >
               Usuario: Caio Ribeiro
              </Textlib>
            </div>

            <Textlib
              as="span"
              size="xs"
              color="primary"
              className="font-semibold"
            >
              Iniciado em {message.date} ás {message.time}
            </Textlib>
          </CardLib>
        </CardLib>
      ) : (
        <div
          className={`flex w-full ${isSent ? "justify-end" : "justify-start"}`}
        >
          <CardLib
            className={`max-w-[50%] px-3 py-2.5 ${
              message.type === "received"
                ? "rounded-tr-xl rounded-b-xl"
                : "rounded-tl-xl rounded-b-xl"
            }`}
            colorBackeGround={
              message.type === "received" ? "default" : "sendMessage"
            }
            shadow="sm"
            rounded="none"
            padding="6xl"
            width="full"
            height="max"
          >
            {message.author && (
              <Textlib
                as="span"
                color="primary"
                size="sm"
                className="font-semibold"
              >
                {message.author}
              </Textlib>
            )}

            <Textlib as="p" color="message" size="md">
              {message.text}
            </Textlib>

            <Textlib
              as="span"
              color="primary"
              size="xs"
              className="block text-right"
            >
              {message.time}
            </Textlib>
          </CardLib>
        </div>
      )}
    </div>
  );
};
