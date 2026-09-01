import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import {
  colorsBackGround,
  colorsHouverBackGround,
  colorsHouverText,
  colorsText,
} from "../../styles/colors";

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
  "active:translate-y-0.2",
].join(" ");

const buttonVariants = cva(buttonDefaultBehavior, {
  variants: {
    textColor: colorsText,
    textColorHover: colorsHouverText,
    colorBackeGround: colorsBackGround,
    colorBackeHouverGround: colorsHouverBackGround,

    size: {
      none: "",
      small: "w-full h-2 p-3",
      median: "w-full h-7 p-3",
      large: "w-full h-12 p-3",
      extralarge: "w-full h-24 p-3",
      collapsed: "w-12 h-8 p-3",
    },

    shadow: {
      default: "shadow-[0_4px_4px_rgba(0,0,0,0.25)]",
      min: "shadow-[0px_0px_4px_rgba(0,0,0,0.25)]",
      none: "shadow-none",
    },

    align: {
      center: "justify-center",
      between: "justify-between",
    },
  },
  defaultVariants: {
    colorBackeHouverGround: "default",
    textColorHover: "default",
    textColor: "default",
    colorBackeGround: "default",
    size: "small",
    align: "center",
    shadow: "none",
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
      colorBackeGround,
      colorBackeHouverGround,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      textColor,
      shadow,
      textColorHover,
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
          colorBackeGround,
          size,
          align,
          colorBackeHouverGround,
          textColorHover,
          textColor,
          shadow,
          className,
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
