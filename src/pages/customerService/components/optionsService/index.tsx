import { Textlib } from "../../../../components/text";
import { optinsOperation, optionsAdministration } from "./options";

export const OptinsService = () => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Textlib as="h4" size="md" color="muted">
          Operação
        </Textlib>
      </div>
      <div className="flex flex-col gap-5">
        {optinsOperation.map((option) => {
          return option?.conponent;
        })}
      </div>
      <div>
        <Textlib as="h4" size="md" color="muted">
          Administração
        </Textlib>
      </div>
      <div className="flex flex-col gap-5">
        {optionsAdministration.map((option) => {
          return option?.conponent;
        })}
      </div>
    </div>
  );
};
