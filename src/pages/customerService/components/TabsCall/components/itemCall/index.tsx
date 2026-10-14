
import type { ItemCallProps } from "./types";
import { AvatarLib } from "../../../../../../components/avatar";
import { CardLib } from "../../../../../../components/card";
import { Textlib } from "../../../../../../components/text";
import { MessageCircleCheck, User } from "lucide-react";


export const ItemCall = ({
  isSelected,
  hour,
  name,
  text,
  id,
  queue,
  user,
  selectCall,
}: ItemCallProps) => {
  return (
    <CardLib
      colorBackeGround={isSelected ? "muted" : "default"}
      colorsHouverBackGround="sendMessage"
      className="block h-fit w-full min-w-0 cursor-pointer rounded-none p-0"
      border="none"
      padding="md"
      colorsHouverText="secondary"
      onClick={() => selectCall(id)}
    >
      <div className="flex w-full h-20 min-w-0 flex-row justify-center items-start gap-2">
        <AvatarLib
          shadow="default"
          size="large"
          color={isSelected ? "success" : "muted"}
          border={isSelected ? "primary" : "none"}
          fit="cover"
          textInfo="t"
          className="shrink-0"
        />

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-start justify-between gap-2">
            <Textlib
              color="primary"
              className="min-w-0 flex-1 truncate font-semibold"
              as="h2"
              size="lg"
            >
              {name}
            </Textlib>

            <Textlib
              color="primary"
              as="span"
              size="sm"
              className="shrink-0 whitespace-nowrap font-semibold"
            >
              {hour}
            </Textlib>
          </div>

          <Textlib
            color="primary"
            as="p"
            size="sm"
            className="w-full min-w-0 truncate"
          >
            {text}
          </Textlib>
          <div className="flex flex-row justify-end items-center gap-5">
            <CardLib
              width="fit"
              height="min"
              rounded="xl"
              shadow="sm"
              padding="none"
              border={isSelected ? "none" : "primary"}
              colorBackeGround={isSelected ? "primary" : "default"}
              colorsHouverBackGround="none"
              className="flex flex-row justify-center items-center gap-1 p-1 mt-2 min-w-0"
            >
              <User
                size={20}
                className="shrink-0"
                color={isSelected ? "#ffff" : "#144F44"}
              />
              <Textlib
                color={isSelected ? "secondary" : "primary"}
                colorHover="none"
                as="span"
                size="sm"
                className="flex-1 min-w-0 truncate"
              >
                {user}
              </Textlib>
            </CardLib>

            <CardLib
              width="fit"
              height="min"
              rounded="xl"
              shadow="sm"
              padding="xs"
              border={isSelected ? "none" : "primary"}
              colorBackeGround={isSelected ? "primary" : "default"}
              className="flex flex-row justify-center items-center gap-1 p-1 mt-2 min-w-0"
            >
              <MessageCircleCheck
                size={18}
                className="shrink-0"
                color={isSelected ? "#ffff" : "#144F44"}
              />

              <Textlib
                color={isSelected ? "secondary" : "primary"}
                as="span"
                size="sm"
                className="flex-1 min-w-0 truncate"
              >
                {queue}
              </Textlib>
            </CardLib>
          </div>
        </div>
      </div>
    </CardLib>
  );
};
