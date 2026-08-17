import { Textlib } from "../../../../components/text";
import { ButtonLib } from "../../../../components/button";
import type { DrawerServiceProps } from "../drawerService/type";
import { optinsOperation, optionsAdministration } from "./options";
import {
  TooltipLib,
  Tooltiplib,
  TooltipProviderLib,
  TooltipTriggerLib,
} from "../../../../components/tooltip";

export const OptinsService = ({ isCollapsed }: DrawerServiceProps) => {
  const renderOption = (option: (typeof optinsOperation)[number]) => {
    const Icon = option.icon;

    return (
      <TooltipProviderLib>
        <Tooltiplib>
          <TooltipTriggerLib asChild>
            <ButtonLib
              key={option.title}
              variant="accent"
              size={isCollapsed ? "collapsed" : "small"}
              className={`
          flex
          flex-row
          items-center
          gap-5
          hover:bg-secondary
          ${isCollapsed ? "justify-center" : "justify-start"}
        `}
            >
              <Icon color="#282C30" size={isCollapsed ? 18 : 20} />

              {isCollapsed && (
                <TooltipLib side="right">
                  <div className="flex flex-col">
                    <Textlib as="span" color="secondary">
                      {option?.title}
                    </Textlib>
                  </div>
                </TooltipLib>
              )}

              {!isCollapsed && (
                <Textlib
                  className="font-bold"
                  as="h4"
                  size="md"
                  color="default"
                >
                  {option?.title}
                </Textlib>
              )}
            </ButtonLib>
          </TooltipTriggerLib>
        </Tooltiplib>
      </TooltipProviderLib>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      {!isCollapsed && (
        <Textlib as="h4" size="md" color="muted">
          Operação
        </Textlib>
      )}

      <div className="flex flex-col gap-5">
        {optinsOperation.map(renderOption)}
      </div>

      {!isCollapsed && (
        <Textlib as="h4" size="md" color="muted">
          Administração
        </Textlib>
      )}

      <div className="flex flex-col gap-5">
        {optionsAdministration.map(renderOption)}
      </div>
    </div>
  );
};
