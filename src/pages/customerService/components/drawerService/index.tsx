import { LogOut, MessageCircleCheck } from "lucide-react";
import { OptinsService } from "../optionsService";
import { CardLib } from "../../../../components/card";
import { Textlib } from "../../../../components/text";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "../../../../components/drawer";
import { AvatarLib } from "../../../../components/avatar";
import { ButtonLib } from "../../../../components/button";

export const DrawerService = () => {
  return (
    <Drawer open={true}>
      <DrawerContent side="left" className="flex h-full flex-col gap-5 p-6">
        <DrawerTitle className="flex flex-row items-center gap-2">
          <CardLib padding="min" variant="accent">
            <MessageCircleCheck size={24} />
          </CardLib>

          <Textlib as="h1" color="secondary" size="lg">
            Papo Com
          </Textlib>
        </DrawerTitle>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <OptinsService />
        </div>

        <div className="mt-auto pt-2 flex flex-row gap-2">
          <div>
            <AvatarLib
              decoration="accent"
              shape="circle"
              fit="contain"
              size="median"
            />
          </div>
          <div className="flex flex-col">
            <Textlib as="span" color="secondary" size="md">
              Marina Duarte
            </Textlib>
            <Textlib as="span" color="muted" size="sm">
              Administrador
            </Textlib>
          </div>
        </div>
        <div className="flex flex-col">
          <ButtonLib className="flex flex-row justify-start items-center gap-2 p-2" variant="accent" size="small">
            <LogOut color="#282C30" size={20} />
            <Textlib as="span" color="default" size="md">
              Sair
            </Textlib>
          </ButtonLib>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
