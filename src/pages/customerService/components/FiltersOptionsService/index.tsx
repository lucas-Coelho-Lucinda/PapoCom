import { ListOrdered, Search, Users } from "lucide-react";
import { CardLib } from "../../../../components/card";
import { InputLib } from "../../../../components/Input";
import { SelectLib } from "../../../../components/select";
import type { FiltersOptionsServiceProps } from "./types";
import { optionsQueue, optionsStatus } from "./const";


export const FiltersOptionsService = ({
  filterQueue,
  filterUser,
  filterContactNumber,
}: FiltersOptionsServiceProps) => {

  return (
    <CardLib
      className="@container flex flex-col justify-center items-center"
      colorBackeGround="secondary"
      width="full"
      height="min"
      border="none"
      padding="md"
    >
      <div className={`flex flex-col gap-5 w-full`}>
        <InputLib
          variant="default"
          inputSize="small"
          placeholder="Buscar contato ou número"
          className="text-accent"
          leftIcon={<Search size={20} color="#b9c1c7" />}
          onChange={(e) => filterContactNumber(e?.target?.value.trim())}
        />

        <div className="flex w-full min-w-0 flex-col gap-3 @xs:flex-row @xs:gap-5">
          <SelectLib
            searchable={true}
            variant="default"
            size="small"
            onValueChange={(valueQueueSelected) =>
              filterQueue(valueQueueSelected)
            }
            searchPlaceholder="Pesquise uma fila..."
            IconDefault={<ListOrdered size={20} />}
            options={optionsQueue}
            textColor="primary"
            className="min-w-0 flex-1 w-full max-w-full"
            defaultValue={optionsQueue[0].value}
          />

          <SelectLib
            searchable={true}
            variant="default"
            size="small"
            textColor="primary"
            onValueChange={(valueUserSelected) => filterUser(valueUserSelected)}
            searchPlaceholder="Pesquise um usuário..."
            IconDefault={<Users size={20} />}
            options={optionsStatus}
            className="min-w-0 flex-1 w-full max-w-full"
            defaultValue={optionsStatus[0].value}
          />
        </div>
      </div>
    </CardLib>
  );
};
