import { useLocation, useNavigate } from "react-router-dom";
import { Textlib } from "../../../../../../components/text";
import { ButtonLib } from "../../../../../../components/button";
import {
  TooltipLib,
  Tooltiplib,
  TooltipProviderLib,
  TooltipTriggerLib,
} from "../../../../../../components/tooltip";
import { optinsOperation, optionsAdministration } from "./options";
import { CollpasedContext } from "../../../../../../context/collapsed";

export const OptinsService = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isCollapsed } = CollpasedContext();

  const renderOption = (option: (typeof optinsOperation)[number]) => {
    const Icon = option.icon;

    const isCurrentRoute = pathname === option.path;

    return (
      <TooltipProviderLib>
        <Tooltiplib>
          <TooltipTriggerLib asChild>
            <ButtonLib
              key={option.title}
              onClick={() => navigate(`${option.title}`)}
              colorBackeGround={isCurrentRoute ? "success" : "none"}
              colorBackeHouverGround="none"
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
                <TooltipLib side="right" variant="default" className="font-bold">
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
                  color="secondary"
                  colorHover="none"
                >
                  <Icon size={isCollapsed ? 18 : 20} />
                  {option?.title}
                </Textlib>
              ) : (
                <Icon
                  color={`${isCurrentRoute ? "#ffff" : "#42C070"}`}
                  size={isCollapsed ? 18 : 20}
                />
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
