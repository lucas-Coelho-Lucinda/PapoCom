import { useState } from "react";
import { ScrollListLib } from "../../../../components/scrollList";
import {
  TabsContentLib,
  TabsLib,
  TabsListLib,
  TabsTriggerLib,
} from "../../../../components/tabs";
import { generateListOfCalls } from "./listOfCalls";
import { ItemCall } from "./components/itemCall";
import { Textlib } from "../../../../components/text";
import { FiltersOptionsService } from "../FiltersOptionsService";
import { Phone, PhoneCall, PhoneIncoming } from "lucide-react";

export function TabsCall() {
  const [listStateCalls, setListStateCalls] = useState(generateListOfCalls(10));

  const selectCall = (indice: number) => {
    setListStateCalls((prev) =>
      prev.map((item, index) => ({
        ...item,
        selected: index === indice,
      })),
    );
  };

  return (
    <TabsLib
      defaultValue="em atendimento"
      variant="default"
      padding="none"
      border="muted"
      className="flex h-full min-h-0 w-full min-w-0 flex-col gap-1 overflow-hidden"
    >
      <TabsListLib
        variant="success"
        className="relative z-10 grid min-h-20 w-full min-w-0 shrink-0 grid-cols-3 grid-flow-col overflow-visible p-1"
      >
        <TabsTriggerLib
          value="encerradas"
          variant="success"
          size="small"
          className="flex flex-row gap-2 min-w-0 overflow-visible px-1"
        >
          <Phone  size={20} color="#ffff" />
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
          <PhoneIncoming  size={20} color="#ffff" />
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

      <FiltersOptionsService />

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
            {listStateCalls.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="m-0 w-full min-w-0 p-0"
              >
                <ItemCall
                  isSelected={item.selected}
                  name={item.name}
                  hour={item.hour}
                  text={item.text}
                  index={index}
                  selectCall={selectCall}
                />

                {index < listStateCalls.length - 1 && (
                  <hr className="m-0 w-full border-0 border-t border-muted/80" />
                )}
              </div>
            ))}
          </div>
        </ScrollListLib>
      </TabsContentLib>

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
