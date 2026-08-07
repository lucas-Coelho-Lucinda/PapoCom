import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { colorsButtonBackGround, colorsButtonsText } from "../../styles/colors";
import { cva, type VariantProps } from "class-variance-authority";

const buttonDefaultBehavior = [
  "cursor-pointer",
  "inline-flex items-center justify-center",
  "rounded-md",
  "font-medium",
  "transition-all duration-200",
  "outline-none",
  "disabled:pointer-events-none",
  "disabled:opacity-50",
  "active:scale-[0.97]",
].join(" ");

const buttonVariants = cva(buttonDefaultBehavior, {
  variants: {
    variant: colorsButtonBackGround,
    textColor: colorsButtonsText,
    size: {
      small: "w-sm h-8",
      median: "w-4xl h-8",
      large: "w-6xl h-16",
    },

    align: {
      center: "justify-center",
      between: "justify-between",
    },
  },
  defaultVariants: {
    textColor: "default",
    variant: "default",
    size: "small",
    align: "center",
  },
});

type ButtonElement = React.ElementRef<"button">;

export interface ButtonProps
  extends
    React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const ButtonLib = React.forwardRef<ButtonElement, ButtonProps>(
  (
    {
      size,
      align,
      variant,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      textColor,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        disabled={disabled}
        className={buttonVariants({
          variant,
          size,
          align,
          textColor,
          className: className,
        })}
        {...props}
      >
        {leftIcon && (
          <span data-slot="icon-left" className="mr-2">
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span data-slot="icon-right" className="ml-2">
            {rightIcon}
          </span>
        )}
      </Comp>
    );
  },
);
