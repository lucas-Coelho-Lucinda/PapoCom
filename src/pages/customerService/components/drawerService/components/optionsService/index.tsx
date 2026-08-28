import { ButtonLib } from "../../../../../../components/button";
import { Textlib } from "../../../../../../components/text";
import {
  TooltipLib,
  Tooltiplib,
  TooltipProviderLib,
  TooltipTriggerLib,
} from "../../../../../../components/tooltip";
import type { DrawerServiceProps } from "../../type";
import { optinsOperation, optionsAdministration } from "./options";

export const OptinsService = ({ isCollapsed }: DrawerServiceProps) => {
  const renderOption = (option: (typeof optinsOperation)[number]) => {
    const Icon = option.icon;

    return (
      
      <TooltipProviderLib>
        <Tooltiplib>
          <TooltipTriggerLib asChild>
            <ButtonLib
              key={option.title}
              colorBackeGround="none"
              colorBackeHouverGround="primary"
              size={isCollapsed ? "collapsed" : "median"}
              className={`
                    flex
                    flex-row
                    items-center
                    gap-5
                    ${isCollapsed ? "justify-center" : "justify-start"}
                  `}
            >
              {isCollapsed && (
                <TooltipLib side="right">
                  <div className="flex flex-col">
                    <Textlib as="span">{option?.title}</Textlib>
                  </div>
                </TooltipLib>
              )}
              

              {!isCollapsed ? (
                <Textlib
                  className="font-bold flex flex-row items-center  gap-2"
                  as="h4"
                  size="md"
                  color="success"
                  colorHover="none"
                >
                  <Icon size={isCollapsed ? 18 : 20} />
                  {option?.title}
                </Textlib>
              ) : (
                <Icon color="#42C070" size={isCollapsed ? 18 : 20} />
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
