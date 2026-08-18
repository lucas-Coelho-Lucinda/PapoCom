import { AvatarLib } from "../../../../../../components/avatar";
import { CardLib } from "../../../../../../components/card";
import { Textlib } from "../../../../../../components/text";
import type { DrawerServiceProps } from "../../../drawerService/type";

export const ItemCall = ({ isCollapsed }: DrawerServiceProps) => {
  return (
    <div className="flex fle-col justify-center w-fit gap-5">
      <CardLib
        variant="muted"
        className={`${isCollapsed ? "w-130" : "w-100"} border-b-0  flex flex-col justify-center gap-5 rounded-none`}
        border="muted"
        padding="small"
      >
        <div className="flex min-w-0 w-full flex-row items-start justify-start gap-2">
          <div className="shrink-0">
            <AvatarLib size="median" fit="contain" fallback="T" />
          </div>
          <div className="min-w-0 w-full">
            <div className="flex flex-row justify-between">
              <Textlib
                color="default"
                className="w-full truncate font-semibold"
                as="h2"
                size="lg"
              >
                Joana Prado
              </Textlib>
            </div>

            <Textlib
              color="primary"
              as="p"
              size="sm"
              className="w-full min-w-0 truncate"
            >
              Este é um texto muito longo que será cortado quando ultrapassar a
              largura disponível do componente.
            </Textlib>
          </div>
        </div>
      </CardLib>
    </div>
  );
};
