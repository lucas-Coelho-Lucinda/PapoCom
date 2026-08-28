import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";
import { colorsBackGround } from "../../styles/colors";

const inputVariants = cva(
  `
  w-full rounded-md border border-1 border-soft text-foreground
  placeholder:text-foreground-muted
  focus:outline-none focus:border-primary transition-all
  shadow-sm
  `,
  {
    variants: {
      variant: {
        ...colorsBackGround,
      },
      inputSize: {
        small: "h-8 text-sm px-2",
        median: "h-10 text-sm px-3",
        large: "h-12 text-base px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "median",
    },
  },
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    isPassword?: boolean;
  };

export const InputLib = ({
  className,
  variant,
  inputSize,
  leftIcon,
  rightIcon,
  isPassword,
  type,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative flex items-center">
      {/* Ícone esquerdo */}
      {leftIcon && (
        <div className="absolute left-3 text-black">{leftIcon}</div>
      )}

      <input
        type={inputType}
        className={`
          ${inputVariants({ variant, inputSize })}
          ${leftIcon ? "pl-10" : ""}
          ${rightIcon || isPassword ? "pr-10" : ""}
          ${className ?? ""}
        `}
        {...props}
      />

      {/* Ícone direito / senha */}
      <div className="absolute right-3 flex items-center">
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-black hover:text-black"
          >
            {/* aqui você usa seu ícone */}
            {showPassword ? <EyeClosed /> : <Eye />}
          </button>
        ) : (
          rightIcon
        )}
      </div>
    </div>
  );
};
