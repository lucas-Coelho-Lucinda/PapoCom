import { CardLib } from "../../../../../../components/card";
import { Textlib } from "../../../../../../components/text";

import type { Message } from "../../types";

export const MessageBubble = ({ message }: { message: Message }) => {
  const isSent =
    message.type === "sent" ||
    message.type === "system";

  const isServiceStatus =
    message.type === "start" ||
    message.type === "system" ||
    message.type === "end";

  return (
    <div className="flex w-full justify-center">
      {isServiceStatus ? (
        <CardLib
          className="w-full px-3 py-2 flex flex-col justify-center items-center"
          colorBackeGround="muted"
          shadow="sm"
          rounded="md"
          padding="sm"
          width="fit"
          height="max"
        >
          <Textlib
            as="span"
            color="message"
            size="xs"
            className="font-medium"
          >
            {message.type === "system" && "Atendimento iniciado"}
            {message.type === "service" && "Atendimento em andamento"}
            {message.type === "end" && "Atendimento finalizado"}
          </Textlib>

          {message.time && (
            <Textlib
              as="span"
              color="primary"
              size="xs"
              className="ml-2"
            >
              {message.time}
            </Textlib>
          )}
        </CardLib>
      ) : (
        <div
          className={`flex w-full ${
            isSent ? "justify-end" : "justify-start"
          }`}
        >
          <CardLib
            className={`max-w-[50%] px-3 py-2.5 ${
              message.type === "received"
                ? "rounded-tr-xl rounded-b-xl"
                : "rounded-tl-xl rounded-b-xl"
            }`}
            colorBackeGround={
              message.type === "received"
                ? "default"
                : "sendMessage"
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

            <Textlib
              as="p"
              color="message"
              size="md"
            >
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