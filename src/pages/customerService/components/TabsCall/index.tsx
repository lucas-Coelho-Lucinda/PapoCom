import { useState } from "react";
import { ScrollListLib } from "../../../../components/scrollList";
import {
  TabsContentLib,
  TabsLib,
  TabsListLib,
  TabsTriggerLib,
} from "../../../../components/tabs";

import { Textlib } from "../../../../components/text";
import { generateListOfCalls } from "./listOfCalls";
import { FiltersOptionsService } from "../FiltersOptionsService";
import { Phone, PhoneCall, PhoneIncoming } from "lucide-react";
import { ItemCall } from "./components/itemCall";
import { NotFoundItem } from "./components/notFoundItem";
import type { TabsCallProps } from "./types";
import type { CallSelected } from "../convertionPainel/types";

export function TabsCall({ onSelectCall, setSelectedCall }: TabsCallProps) {
  const ALL_QUEUES = "Todas as filas";
  const ALL_USERS = "Todos os usuarios";
  const [listStateCalls, setListStateCalls] = useState(generateListOfCalls(10));

  const [optionQueue, setOptionQueue] = useState<string | string[]>(ALL_QUEUES);
  const [optionUser, setOptionUser] = useState<string | string[]>(ALL_USERS);
  // Busca por texto: deve continuar string (não faz sentido como lista)
  const [searchCotactNumber, setSearchCotactNumber] = useState("");

  // Fora do componente
  const matchesSelection = (
    selected: string | string[],
    allLabel: string,
    current: string,
  ) => {
    const values = Array.isArray(selected) ? selected : [selected];

    if (values.length === 0 || values.includes(allLabel)) return true;

    return values.includes(current);
  };

  const listDefault = listStateCalls.filter((element) => {
    const matchesQueue = matchesSelection(
      optionQueue,
      ALL_QUEUES,
      element.queue,
    );
    const matchesUser = matchesSelection(optionUser, ALL_USERS, element.user);

    const search = searchCotactNumber.toLowerCase();

    const matchesContact =
      search === "" || element.name.toLowerCase().includes(search);

    const matchesNumber =
      search === "" || element.fone.toLowerCase().includes(search);

    return matchesQueue && matchesUser && (matchesContact || matchesNumber);
  });

  const selectCall = (id: number) => {
    onSelectCall?.();
    const seletedCall = listDefault.find((element) => {
      if (element.id == id) {
        return {
          id: element.id,
          name: element.name,
          user: element.user,
          fone: element.fone,
        };
      }
    }) as CallSelected;

    setSelectedCall(seletedCall);
    setListStateCalls((prev) =>
      prev.map((item) => ({
        ...item,
        selected: item.id === id,
      })),
    );
  };

  return (
    <TabsLib
      defaultValue="em atendimento"
      variant="default"
      padding="none"
      border="muted"
      className="flex h-full min-h-0 w-full min-w-0 flex-col gap-0 overflow-hidden"
    >
      <TabsListLib
        variant="success"
        className="relative z-10 grid min-h-20 w-full min-w-0 shrink-0 grid-cols-3 grid-flow-col overflow-visible shadow-sm"
      >
        <TabsTriggerLib
          value="encerradas"
          variant="success"
          size="small"
          className="flex flex-row gap-2 min-w-0 overflow-visible px-1"
        >
          <Phone size={20} color="#ffff" />
          <Textlib
            color="secondary"
            as="span"
            size="sm"
            className="block min-w-0 truncate font-semibold"
          >
            Encerradas: (1)
          </Textlib>
        </TabsTriggerLib>

        <TabsTriggerLib
          value="em atendimento"
          variant="success"
          size="small"
          className=" flex flex-row gap-2 min-w-0 overflow-visible px-1"
        >
          <PhoneCall size={20} color="#ffff" />
          <Textlib
            color="secondary"
            as="span"
            size="sm"
            className="block min-w-0 truncate"
          >
            Em Atendimento: ({listStateCalls.length})
          </Textlib>
        </TabsTriggerLib>

        <TabsTriggerLib
          value="aguardando"
          variant="success"
          size="small"
          className="flex flex-row gap-2 min-w-0 overflow-visible px-1"
        >
          <PhoneIncoming size={20} color="#ffff" />
          <Textlib
            color="secondary"
            as="span"
            size="sm"
            className="block min-w-0 truncate"
          >
            Aguardando: (2)
          </Textlib>
        </TabsTriggerLib>
      </TabsListLib>

      <FiltersOptionsService
        filterUser={setOptionUser}
        filterQueue={setOptionQueue}
        filterContactNumber={setSearchCotactNumber}
      />

      <TabsContentLib
        value="em atendimento"
        padding="none"
        className="flex flex-col gap-5 min-h-0 min-w-0 flex-1 basis-0 overflow-hidden p-0 data-[state=inactive]:hidden"
      >
        <ScrollListLib
          variant="default"
          border="muted"
          className="min-h-0 w-full flex-1"
        >
          <div className="flex w-full min-w-0 flex-col pb-2">
            {listDefault.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="m-0 w-full min-w-0 p-0"
              >
                <ItemCall
                  key={`${item.name}-${index}`}
                  id={item.id}
                  fone={item.fone}
                  name={item.name}
                  hour={item.hour}
                  text={item.text}
                  user={item.user}
                  queue={item.queue}
                  selectCall={selectCall}
                  isSelected={item.selected}
                />

                {index < listStateCalls.length - 1 && (
                  <hr className="m-0 w-full border-0 border-t border-muted/80" />
                )}
              </div>
            ))}
          </div>
        </ScrollListLib>
      </TabsContentLib>
      {listDefault.length == 0 && <NotFoundItem />}

      <TabsContentLib
        value="aguardando"
        padding="none"
        className="min-h-0 min-w-0 flex-1 basis-0 overflow-auto p-0 data-[state=inactive]:hidden"
      >
        Aguardando
      </TabsContentLib>

      <TabsContentLib
        value="encerradas"
        padding="none"
        className="min-h-0 min-w-0 flex-1 basis-0 overflow-auto p-0 data-[state=inactive]:hidden"
      >
        Atendimento encerrado
      </TabsContentLib>
    </TabsLib>
  );
}
