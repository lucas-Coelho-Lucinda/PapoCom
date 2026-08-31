import { createContext, useContext, useState, type ReactNode } from "react";

interface BooleanContextProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const BooleanContext = createContext<BooleanContextProps | undefined>(
  undefined
);

export function CollpasedProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <BooleanContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </BooleanContext.Provider>
  );
}

export function CollpasedContext() {
  const context = useContext(BooleanContext);

  if (!context) {
    throw new Error("useBoolean deve ser usado dentro de CollpasedProvider");
  }

  return context;
}