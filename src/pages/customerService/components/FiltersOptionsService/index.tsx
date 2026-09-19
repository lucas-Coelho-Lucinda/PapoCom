import { Search } from "lucide-react";
import { CardLib } from "../../../../components/card";
import { InputLib } from "../../../../components/Input";
import { SelectLib } from "../../../../components/select";
import { optionsQueue, optionsStatus } from "../TabsCall/selectOptions";
import { CollpasedContext } from "../../../../context/collapsed";

export const FiltersOptionsService = () => {
  const { isCollapsed } = CollpasedContext();

  return (
    <CardLib
      className="flex flex-col justify-center items-center"
      colorBackeGround="default"
      width="full"
      height="min"
      border="none"
      padding="md"
    >
      <div className={`flex flex-col gap-5 ${isCollapsed ? "w-165" : "w-122"}`}>
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
            textColor="primary"
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
    </CardLib>
  );
};
