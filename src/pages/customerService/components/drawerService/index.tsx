import { OptinsService } from "../optionsService";
import { CardLib } from "../../../../components/card";
import { Textlib } from "../../../../components/text";
import { LogOut, MessageCircleCheck } from "lucide-react";
import { AvatarLib } from "../../../../components/avatar";
import { ButtonLib } from "../../../../components/button";
import {
  Drawer,
  DrawerTitle,
  DrawerContent,
} from "../../../../components/drawer";

import type { DrawerServiceProps } from "./type";

import {
  TooltipLib,
  TooltipProviderLib,
  TooltipTriggerLib,
} from "../../../../components/tooltip";

import { Tooltip } from "@radix-ui/react-tooltip";

export const DrawerService = ({ isCollapsed }: DrawerServiceProps) => {
  return (
    <Drawer open={true} modal={false}>
      <DrawerContent
        side="left"
        collapsed={isCollapsed}
        className="
          flex
          h-full
          flex-col
          gap-5
          overflow-hidden
          p-6
        "
      >
        <DrawerTitle
          className={`
            flex
            flex-row
            items-center
            gap-2
            ${isCollapsed ? "justify-center" : "justify-start"}
          `}
        >
          <CardLib
            padding="min"
            variant="accent"
            className="
              flex
              shrink-0
              w-12
              h-8
              items-center
              justify-center
            "
          >
            <MessageCircleCheck size={20} />
          </CardLib>

          <div
            className={`
              overflow-hidden
              whitespace-nowrap
              transition-all
              duration-300
              ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
            `}
          >
            <Textlib as="h1" color="secondary" size="lg">
              Papo Com
            </Textlib>
          </div>
        </DrawerTitle>

        <div className="min-h-0 flex-1">
          <OptinsService isCollapsed={isCollapsed} />
        </div>

        <div
          className={`
            mt-auto
            flex
            flex-row
            items-center
            gap-2
            ${isCollapsed ? "justify-center" : "justify-start"}
          `}
        >
          <TooltipProviderLib>
            <Tooltip>
              <TooltipTriggerLib asChild>
                <div className="shrink-0">
                  <AvatarLib
                    decoration="accent"
                    shape="circle"
                    fit="contain"
                    size="small"
                  />
                </div>
              </TooltipTriggerLib>

              {isCollapsed && (
                <TooltipLib side="right">
                  <div className="flex flex-col">
                    <Textlib as="span" color="secondary">Marina Duarte</Textlib>
                    <hr />
                    <Textlib as="span" color="secondary">Administrador</Textlib>
                  </div>
                </TooltipLib>
              )}
            </Tooltip>
          </TooltipProviderLib>

          <div
            className={`
              overflow-hidden
              whitespace-nowrap
              transition-all
              duration-300
              ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
            `}
          >
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

        <div className="flex flex-col">
          <TooltipProviderLib>
            <Tooltip>
              <TooltipTriggerLib asChild>
                <ButtonLib
                  className={`
                  flex
                  flex-row
                  items-center
                  gap-2
                  ${isCollapsed ? "justify-center" : "justify-start"}
                `}
                  variant="accent"
                  size={isCollapsed ? "collapsed" : "small"}
                >
                  <LogOut color="#282C30" size={isCollapsed ? 25 : 20} />

                  <Textlib
                    as="span"
                    color="default"
                    size="md"
                    className={`
                    overflow-hidden
                    whitespace-nowrap
                    transition-all
                    duration-300
                    ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
                  `}
                  >
                    Sair
                  </Textlib>
                </ButtonLib>
              </TooltipTriggerLib>

              {isCollapsed && (
                <TooltipLib side="right">Sair</TooltipLib>
              )}
            </Tooltip>
          </TooltipProviderLib>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
