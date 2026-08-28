import { Search } from "lucide-react";
import { CardLib } from "../../../../components/card";
import { InputLib } from "../../../../components/Input";
import { SelectLib } from "../../../../components/select";
import type { DrawerServiceProps } from "../drawerService/type";
import { optionsQueue, optionsStatus } from "./selectOptions";
import { ItemCall } from "./components/itemCall";

export const ListCalls = ({ isCollapsed }: DrawerServiceProps) => {
  return (
    <CardLib
      className={`fixed top-0 bottom-0 right-0
        ${isCollapsed ? "left-20 max-w-[32.5rem]" : "left-99 max-w-[25rem]"}
        box-border flex min-w-0 flex-col items-center justify-center
        overflow-hidden border-t-0 rounded-none`}
      variant="default"
      border="muted"
      padding="median"
    >
      <div
        className={`flex fixed top-25 flex-col gap-5 ${isCollapsed ? "w-110" : "w-90"}`}
      >
        <InputLib
          variant="default"
          inputSize="small"
          placeholder="Buscar contato ou número"
          className="w-full min-w-0 max-w-full text-accent"
          leftIcon={<Search size={20} color="#b9c1c7" />}
        />

        <div className="flex w-full min-w-0 gap-5">
          <SelectLib
            variant="default"
            size="small"
            options={optionsQueue}
            className="min-w-0 flex-1 w-full max-w-full"
            defaultValue={optionsQueue[0].value}
          />

          <SelectLib
            variant="default"
            size="small"
            options={optionsStatus}
            className="min-w-0 flex-1 w-full max-w-full"
            defaultValue={optionsStatus[0].value}
          />
        </div>
      </div>
      <div className="fixed top-50  flex flex-col">
        <ItemCall isCollapsed={isCollapsed} />
      </div>
    </CardLib>
  );
};
