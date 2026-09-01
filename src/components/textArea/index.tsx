import { cva, type VariantProps } from "class-variance-authority";

import React from "react";

import { colorsBackGround } from "../../styles/colors";

const textareaVariants = cva(
  `
  w-full rounded-md border border-1 border-soft text-foreground
  placeholder:text-foreground-muted
  focus:outline-none focus:border-emerald-400
  transition-all
  shadow-sm
  resize-y
  `,
  {
    variants: {
      variant: {
        ...colorsBackGround,
      },

      textareaSize: {
        small: "min-h-15 text-sm px-2 py-2",
        median: "min-h-24 text-sm px-3 py-2",
        large: "min-h-32 text-base px-4 py-3",
      },
    },

    defaultVariants: {
      variant: "default",
      textareaSize: "small",
    },
  },
);

type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants>;

export const TextareaLib = ({
  className,
  variant,
  textareaSize,
  ...props
}: TextareaProps) => {
  return (


      <textarea
        className={`
          ${textareaVariants({
            variant,
            textareaSize,
          })}
          ${className ?? ""}
        `}
        {...props}
      />
  );
};

