import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

const tooltipVariants = cva(
  `
    z-50
    overflow-hidden
    rounded-md
    px-3
    py-1.5
    text-sm
    shadow-md
    outline-none
    animate-in
    fade-in-0
    zoom-in-95
    data-[side=top]:slide-in-from-bottom-2
    data-[side=right]:slide-in-from-left-2
    data-[side=bottom]:slide-in-from-top-2
    data-[side=left]:slide-in-from-right-2
  `,
  {
    variants: {
      variant: {
        default: `
          bg-primary
          text-secondary
        `,
        accent: `
          bg-accent
          text-primary
        `,

        error: `
          bg-error
          text-secondary
        `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface TooltipLibProps
  extends
    ComponentProps<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipVariants> {}

// eslint-disable-next-line react-refresh/only-export-components
export const TooltipProviderLib = TooltipPrimitive.Provider;

// eslint-disable-next-line react-refresh/only-export-components
export const Tooltiplib = TooltipPrimitive.Root;

// eslint-disable-next-line react-refresh/only-export-components
export const TooltipTriggerLib = TooltipPrimitive.Trigger;

export const TooltipLib = ({
  className,
  variant,
  sideOffset = 6,
  ...props
}: TooltipLibProps) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={`
          ${tooltipVariants({ variant })}
          ${className ?? ""}
        `}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
};
