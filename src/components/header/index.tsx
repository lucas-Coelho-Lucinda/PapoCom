import React from "react";
import {
  colorsBackGround,
  colorsBorder,
  colorsText,
} from "../../styles/colors";
import { cva, type VariantProps } from "class-variance-authority";

const headerDefaultBehavior =
  "fixed top-0  right-0 z-50 h-18 border rounded-b-none rounded-t-none";

const headerVariants = cva(headerDefaultBehavior, {
  variants: {
    variant: colorsBackGround,
    border: colorsBorder,
    textColor: colorsText,
  },
  defaultVariants: {
    border: "none",
    textColor: "default",
    variant: "default",
  },
});

type headerElement = React.ElementRef<"header">;

export interface headerProps
  extends
    React.ComponentPropsWithoutRef<"header">,
    VariantProps<typeof headerVariants> {}

export const HeaderLib = React.forwardRef<headerElement, headerProps>(
  ({ variant, className, border, textColor, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={headerVariants({
          variant,
          className,
          textColor,
          border,
        })}
        {...props}
      >
        {children}
      </header>
    );
  },
);
