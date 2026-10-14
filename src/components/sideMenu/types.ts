import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type SideMenuItem = {
  title: string;
  subtitle: string;
  to: string;
  icon: LucideIcon;
  end?: boolean;
};

export type SideMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  items: SideMenuItem[];
  id?: string;
  elementOrText?: ReactNode;
};
