import { CollpasedContext } from "../../context/collapsed";
import { TabsCall } from "./components/TabsCall";
import { ConversationPanel } from "./components/convertionPainel";

export const CustomerService = () => {
  const { isCollapsed } = CollpasedContext();

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <div
        className={`grid h-full min-h-0 w-full min-w-0 overflow-hidden transition-[grid-template-columns] duration-300 ease-in-out ${
          isCollapsed
            ? "grid-cols-[minmax(0,1.75fr)_minmax(0,3fr)]"
            : "grid-cols-[minmax(0,4fr)_minmax(0,6fr)]"
        }`}
      >
        <div className="min-h-0 min-w-0 overflow-hidden">
          <TabsCall />
        </div>

        <div className="min-h-0 min-w-0 overflow-hidden">
          <ConversationPanel />
        </div>
      </div>
    </div>
  );
};
