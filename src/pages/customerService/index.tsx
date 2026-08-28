import { useState } from "react";

import { PanelRightOpen } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { Textlib } from "../../components/text";
import { HeaderLib } from "../../components/header";
import { ButtonLib } from "../../components/button";

import { DrawerService } from "./components/drawerService";
import { Panel } from "../Panel";

export const CustomerService = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Helmet title="Papo Com | atendimento" />

      <div className="h-dvh min-h-0 overflow-hidden">
        <DrawerService isCollapsed={isCollapsed} />

        <div
          className={`flex h-full min-h-0 min-w-0 flex-col overflow-hidden pt-18 transition-[margin] duration-300 ease-in-out ${
            isCollapsed ? "ml-20" : "ml-100"
          }`}
        >
          <HeaderLib
            className={`fixed ${
              isCollapsed ? "left-20" : "left-100"
            } right-0 top-0 z-20 flex h-15 items-center gap-2 border-l-0 border-r-0 p-2`}
            variant="secondary"
            border="muted"
          >
            <div className="w-12 shrink-0">
              <ButtonLib
                colorBackeGround="secondary"
                colorBackeHouverGround="primary"
                size="median"
                shadow="none"
                onClick={() => setIsCollapsed((prev) => !prev)}
                className="flex items-center justify-center"
              >
                <Textlib
                  as="span"
                  color="default"
                  colorHover="secondary"
                  size="sm"
                  className="p-3 -m-3"
                >
                  <PanelRightOpen size={20} />
                </Textlib>
              </ButtonLib>
            </div>

            <div className="min-w-0">
              <Textlib
                as="h1"
                className="truncate font-bold"
                color="primary"
                size="lg"
              >
                Painel de Atendimento
              </Textlib>

              <Textlib
                as="span"
                color="primary"
                size="md"
                className="block truncate font-semibold"
              >
                Conversas recebidas via WhatsApp, filtradas por fila e status
              </Textlib>
            </div>
          </HeaderLib>

          <div className="flex min-h-0 flex-1 overflow-hidden">
            <Panel isCollapsed={isCollapsed} />
          </div>
        </div>
      </div>
    </>
  );
};
