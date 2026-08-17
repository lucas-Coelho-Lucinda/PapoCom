import type { ComponentProps } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";

const drawerVariants = cva(
  [
    "fixed",
    "z-50",
    "flex",
    "flex-col",
    "bg-primary",
    "shadow-lg",
    "outline-none",
    "transition-[width,transform]",
    "duration-300",
    "ease-in-out",
    "data-[state=open]:translate-x-0",
    "data-[state=closed]:duration-200",
  ],
  {
    variants: {
      side: {
        right: [
          "inset-y-0",
          "right-0",
          "h-full",
          "w-3/4",
          "border-l",
          "data-[state=closed]:translate-x-full",
        ],

        left: [
          "inset-y-0",
          "left-0",
          "h-full",
          "border-r",
          "data-[state=closed]:-translate-x-full",
        ],

        top: [
          "inset-x-0",
          "top-0",
          "w-full",
          "border-b",
          "data-[state=closed]:-translate-y-full",
        ],

        bottom: [
          "inset-x-0",
          "bottom-0",
          "w-full",
          "border-t",
          "data-[state=closed]:translate-y-full",
        ],
      },

      collapsed: {
        true: "w-25",
        false: "w-100",
      },
    },

    defaultVariants: {
      side: "right",
      collapsed: false,
    },
  },
);
interface DrawerContentProps
  extends
    ComponentProps<typeof Dialog.Content>,
    VariantProps<typeof drawerVariants> {
  isCollapsed?: boolean;
}

const Drawer = Dialog.Root;
const DrawerTrigger = Dialog.Trigger;
const DrawerClose = Dialog.Close;
const DrawerTitle = Dialog.Title;
const DrawerDescription = Dialog.Description;

const DrawerContent = ({
  className,
  side,
  children,
  collapsed,
  ...props
}: DrawerContentProps) => {
  return (
    <Dialog.Portal>
      <Dialog.Content
        className={drawerVariants({
          side,
          collapsed,
          className,
        })}
        {...props}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
};
