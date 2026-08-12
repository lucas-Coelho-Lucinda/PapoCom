import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { colorsBackGround, colorsText } from "../../styles/colors";

/**
 * ============================================================
 * TRIGGER
 * ============================================================
 */

const selectTriggerVariants = cva(
  [
    "ps-2 pe-2",
    "relative",
    "cursor-pointer",
    "inline-flex",
    "items-center",
    "justify-between",
    "rounded-md",
    "font-medium",
    "border",
    "border-soft",
    "transition-all",
    "duration-200",
    "outline-none",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: colorsBackGround,
      textColor: colorsText,

      size: {
        small: "w-sm h-8",
        median: "w-4xl h-8",
        large: "w-6xl h-16",
      },
    },

    defaultVariants: {
      variant: "default",
      textColor: "default",
      size: "small",
    },
  },
);

/**
 * ============================================================
 * CONTENT
 * ============================================================
 */

const selectContentVariants = cva(
  [
    "z-50",
    "mt-1",
    "overflow-hidden",
    "rounded-md",
    "p-1",

    // Largura igual ao Trigger
    "w-[var(--radix-select-trigger-width)]",

    // Altura disponível
    "max-h-[var(--radix-select-content-available-height)]",

    // Animação de abertura
    "data-[state=open]:animate-[select-content-show_150ms_ease-out]",

    // Animação de fechamento
    "data-[state=closed]:animate-[select-content-hide_100ms_ease-in]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-background",
        info: "bg-info",
        error: "bg-error",
        success: "bg-success",
        warning: "bg-warning",
        primary: "bg-primary",
        secondary: "bg-secondary",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * ============================================================
 * ITEM / OPTION
 * ============================================================
 */

const selectItemVariants = cva(
  [
    "relative",
    "flex",
    "w-full",
    "cursor-pointer",
    "select-none",
    "items-center",
    "gap-2",
    "rounded-sm",
    "py-2",
    "pl-8",
    "pr-2",
    "outline-none",
    "box-border",

    "border",
    "border-soft",

    // Permite a transição entre bg-* e bg-*/80
    "transition-colors",
    "duration-150",

    // Estados do Radix
    "data-[disabled]:pointer-events-none",
    "data-[disabled]:opacity-50",
  ].join(" "),
  {
    variants: {
      // Esta é a parte que vincula variant ao hover da option
      variant: colorsBackGround,

      textColor: colorsText,

      size: {
        small: "h-8",
        median: "h-8",
        large: "h-16",
      },
    },

    defaultVariants: {
      variant: "default",
      textColor: "default",
      size: "small",
    },
  },
);

/**
 * ============================================================
 * TYPES
 * ============================================================
 */

interface SelectProps extends Omit<
  VariantProps<typeof selectTriggerVariants>,
  "textColor"
> {
  options: {
    label: string;
    value: string;
  }[];

  placeholder?: string;

  value?: string;

  defaultValue?: string;

  onValueChange?: (value: string) => void;

  disabled?: boolean;

  className?: string;

  textColor?: keyof typeof colorsText;

  variant?: keyof typeof colorsBackGround;

  size?: "small" | "median" | "large";
}

/**
 * ============================================================
 * COMPONENT
 * ============================================================
 */

type optionsDefineColor =
  | "default"
  | "info"
  | "error"
  | "success"
  | "warning"
  | "primary"
  | "secondary";

const defineColorItem = (option: optionsDefineColor) => {
  switch (option) {
    case "default":
      return "bg-success border rounded-md";

    case "error":
      return "bg-success hover:bg-background border rounded-md";

    default:
      break;
  }
};

export function SelectLib({
  options,
  placeholder = "Selecione uma opção",

  variant = "default",
  textColor = "default",
  size = "small",

  value,
  defaultValue,
  onValueChange,

  disabled,
  className,
}: SelectProps) {
  return (
    <Select.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      {/* ======================================================
          TRIGGER
          ====================================================== */}

      <Select.Trigger
        className={selectTriggerVariants({
          variant,
          textColor,
          size,
          className,
        })}
      >
        <Select.Value
          placeholder={placeholder}
          className={colorsText[textColor]}
        />

        <Select.Icon>
          <ChevronDown className="h-4 w-4 shrink-0" />
        </Select.Icon>
      </Select.Trigger>

      {/* ======================================================
          CONTENT
          ====================================================== */}

      <Select.Portal>
        <Select.Content
          position="popper"
          className={selectContentVariants({
            variant,
          })}
        >
          <Select.Viewport className="flex w-full flex-col gap-1">
            {options.map((option) => (
              <div className={`${defineColorItem(variant)}`} key={option.value}>
                <Select.Item
                  value={option.value}
                  className={selectItemVariants({
                    variant,
                    textColor,
                    size,
                  })}
                >
                  {/* ==================================================
                    INDICATOR
                    ================================================== */}

                  <Select.ItemIndicator className="absolute left-2">
                    <Check className="h-4 w-4" />
                  </Select.ItemIndicator>

                  {/* ==================================================
                    TEXT
                    ================================================== */}

                  <Select.ItemText
                    className={`${colorsText[textColor]} text-center`}
                  >
                    {option.label}
                  </Select.ItemText>
                </Select.Item>
              </div>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

SelectLib.displayName = "SelectLib";
