import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "../../components/drawer";
import { CardLib } from "../../components/card";
import { MessageCircleCheck } from "lucide-react";
import { Textlib } from "../../components/text";

export const CustomerService = () => {
  const [drawerAberto, setDrawerAberto] = useState(false);

  return (
    <>
      <p>CustomerService</p>

      <button type="button" onClick={() => setDrawerAberto(true)}>
        Abrir painel
      </button>

      <Drawer open={drawerAberto} onOpenChange={setDrawerAberto}>
        <DrawerContent side="left" className="p-6">
          <DrawerTitle className="flex flex-row items-center gap-2">
            <CardLib padding="min" variant="accent">
              <MessageCircleCheck size={24} />
            </CardLib>
            <Textlib as="h1" color="secondary" size="lg">
              Papo Com
            </Textlib>
          </DrawerTitle>

          <p className="mt-4">
            O estado deste Drawer é controlado pelo componente Dashboard.
          </p>

          <DrawerClose asChild>
            <button type="button" className="mt-6 rounded border px-4 py-2">
              Fechar
            </button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </>
  );
};
