import type { ItemCallProps } from "../type";
import { AvatarLib } from "../../../../../../components/avatar";
import { CardLib } from "../../../../../../components/card";
import { Textlib } from "../../../../../../components/text";

export const ItemCall = ({
  isSelected,
  hour,
  name,
  text,
  index,
  selectCall,
}: ItemCallProps) => {

  return (
    <CardLib
      colorBackeGround={isSelected ? "muted" : "default"}
      colorsHouverBackGround="success"
      className="m-0 block h-fit w-full min-w-0 cursor-pointer rounded-none p-0"
      border="none"
      padding="md"
      colorsHouverText="secondary"
      onClick={() => selectCall(index)}
    >
      <div className="m-0 flex w-full min-w-0 flex-row gap-2 p-0">
        <div className="shrink-0">
          <AvatarLib
            shadow="default"
            size="large"
            color={isSelected ? "success" : "muted"}
            border={isSelected ? "primary" : "default"}
            fit="cover"
            photoOrText="TAB"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-start justify-between gap-2">
            <Textlib
              color="none"
              className="min-w-0 flex-1 truncate font-semibold"
              as="h2"
              size="lg"
            >
              {name}
            </Textlib>

            <Textlib
              color="none"
              as="span"
              size="sm"
              className="shrink-0 whitespace-nowrap font-semibold"
            >
              {hour}
            </Textlib>
          </div>

          <Textlib
            color="none"
            as="p"
            size="sm"
            className="w-full min-w-0 truncate"
          >
            {text}
          </Textlib>
        </div>
      </div>
    </CardLib>
  );
};