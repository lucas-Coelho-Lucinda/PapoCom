import { useState } from "react";
import { PanelLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Textlib } from "../../components/text";
import { HeaderLib } from "../../components/header";
import { ButtonLib } from "../../components/button";
import { DrawerService } from "./components/drawerService";
import { ListCalls } from "./components/listCalls";

export const CustomerService = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Helmet title="Papo Com | atendimento" />

      <div className="flex min-h-screen">
        <DrawerService isCollapsed={isCollapsed} />

        <div className="flex-1 transition-all duration-300 ease-in-out">
          <HeaderLib
            className={`flex flex-row items-center justify-start gap-2 p-2 border-l-0 border-r-0 ${isCollapsed ? "left-25" : "left-100"}`}
            variant="secondary"
            border="muted"
          >
            <div className="w-12">
              <ButtonLib
                variant="secondary"
                size="small"
                onClick={() => setIsCollapsed((prev) => !prev)}
                className="flex flex-row justify-center items-center hover:bg-accent"
              >
                <PanelLeft size={20} />
              </ButtonLib>
            </div>

            <div className="flex flex-col">
              <Textlib as="h1" className="font-bold" color="default" size="lg">
                Painel de Atendimento
              </Textlib>

              <Textlib as="span" color="primary" size="md">
                Conversas recebidas via WhatsApp, filtradas por fila e status
              </Textlib>
            </div>
          </HeaderLib>
          <ListCalls isCollapsed={isCollapsed} />
        </div>
      </div>
    </>
  );
};
