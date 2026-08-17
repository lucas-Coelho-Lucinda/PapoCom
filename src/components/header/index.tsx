import React from "react";
import { colorsBackGround, colorsText } from "../../styles/colors";
import { cva, type VariantProps } from "class-variance-authority";

const headerDefaultBehavior =
  "fixed top-0  right-0 z-50 h-18 border rounded-b-none rounded-t-none";

const headerVariants = cva(headerDefaultBehavior, {
  variants: {
    variant: colorsBackGround,
    textColor: colorsText,
  },
  defaultVariants: {
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
  ({ variant, className, textColor, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={headerVariants({
          variant,
          className,
          textColor,
        })}
        {...props}
      >
        {children}
      </header>
    );
  },
);
