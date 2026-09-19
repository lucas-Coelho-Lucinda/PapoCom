import * as Tooltip from "@radix-ui/react-tooltip";
import { LogOut, MessageCircleCheck } from "lucide-react";

import { AvatarLib } from "../../../../components/avatar";
import { ButtonLib } from "../../../../components/button";
import { CardLib } from "../../../../components/card";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "../../../../components/drawer";
import { Textlib } from "../../../../components/text";
import {
  TooltipLib,
  TooltipProviderLib,
  TooltipTriggerLib,
} from "../../../../components/tooltip";

import { OptinsService } from "./components/optionsService";
import { CollpasedContext } from "../../../../context/collapsed";

export const DrawerService = () => {

  const { isCollapsed } = CollpasedContext();
  const containerAlignment = isCollapsed
    ? "items-center justify-center"
    : "items-stretch justify-start";

  const contentVisibility = `
    min-w-0
    overflow-hidden
    whitespace-nowrap
    transition-all
    duration-300
    ${
      isCollapsed
        ? "pointer-events-none w-0 opacity-0"
        : "w-auto flex-1 opacity-100"
    }
  `;

  const drawerPadding = isCollapsed ? "px-3 py-6" : "p-6";

  const alignTeste = isCollapsed
    ? "flex-col items-center justify-center gap-5"
    : "flex-row items-center justify-between gap-30";

  return (
    <Drawer open modal={false}>
      <DrawerContent
        side="left"
        collapsed={isCollapsed}
        className={`
          flex
          h-full
          flex-col
          gap-5
          overflow-hidden
          border-primary
          ${drawerPadding}
        `}
      >
        {/* Header */}
        <DrawerTitle
          className="
            flex
            w-full
            flex-row
            items-center
            justify-start
            gap-2
          "
        >
          <CardLib
            padding="sm"
            border="none"
            width="none"
            rounded="md"
            colorBackeGround="success"
            colorsHouverBackGround="none"
            className="
              w-12
              flex
              h-full
              shrink-0
              items-center
              justify-center
            "
          >
            <Textlib
              as="h4"
              size="md"
              color="secondary"
              colorHover="none"
              className="
                flex
                flex-row
                items-center
                gap-2
                font-bold
              "
            >
              <MessageCircleCheck size={isCollapsed ? 18 : 20} />
            </Textlib>
          </CardLib>

          <div className={contentVisibility}>
            <Textlib as="h1" color="secondary" size="lg">
              Papo Com
            </Textlib>
          </div>
        </DrawerTitle>

        {/* Service options */}
        <div className="min-h-0 w-full flex-1">
          <OptinsService />
        </div>

        <hr className="w-full border-t border-success" />
        <div className={`flex ${alignTeste}`}>
          {/* User */}
          <div
            className={`
            flex
            w-full
            flex-row
            items-center
            gap-2
            ${containerAlignment}
          `}
          >
            <TooltipProviderLib>
              <Tooltip.Root>
                <TooltipTriggerLib asChild>
                  <div className="flex shrink-0 items-center justify-center">
                    <AvatarLib
                      isAdmin
                      color="secondary"
                      border="none"
                      shape="square"
                      fit="cover"
                      size="small"
                    />
                  </div>
                </TooltipTriggerLib>

                {isCollapsed && (
                  <TooltipLib side="right" variant="default" className="font-bold">
                    <div className="flex flex-col justify-center">
                      <Textlib as="span" color="none">
                        Usuario: Marina Duarte
                      </Textlib>

                      <hr  className="border-primary" />

                      <Textlib as="span" color="none">
                       Permissão: Administrador
                      </Textlib>
                    </div>
                  </TooltipLib>
                )}
              </Tooltip.Root>
            </TooltipProviderLib>

            <div className={contentVisibility}>
              <div className="flex flex-col">
                <Textlib as="span" color="secondary" size="md">
                  Marina Duarte
                </Textlib>

                <Textlib as="span" color="muted" size="sm">
                  Administrador
                </Textlib>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div
            className={`
            flex
            w-full
            flex-col
            ${containerAlignment}
          `}
          >
            <TooltipProviderLib >
              <Tooltip.Root>
                <TooltipTriggerLib asChild >
                  <ButtonLib
                    colorBackeGround="none"
                    colorBackeHouverGround="error"
                    size="collapsed"
                    className="
                    flex
                    w-min
                    shrink-0
                    flex-row
                    items-center
                    justify-start
                    gap-2
                  "
                  >
                    <Textlib
                      as="span"
                      color="secondary"
                      colorHover="none"
                      size="md"
                      className={`
                      flex
                      flex-row
                      items-center
                      gap-2
                      overflow-hidden
                      whitespace-nowrap
                      transition-all
                      duration-300
                    `}
                    >
                      <LogOut size={isCollapsed ? 18 : 20} />

                      {!isCollapsed && "Sair"}
                    </Textlib>
                  </ButtonLib>
                </TooltipTriggerLib>

                {isCollapsed && <TooltipLib side="right" variant="error" className="font-bold" >Sair</TooltipLib>}
              </Tooltip.Root>
            </TooltipProviderLib>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
