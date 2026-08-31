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
    "relative",
    "inline-flex",
    "items-center",
    "justify-between",
    "gap-2",

    "cursor-pointer",
    "select-none",

    "rounded-md",
    "border",
    "border-soft",

    "font-medium",

    "outline-none",

    "transition-all",
    "duration-200",

    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "border border-1 border-soft",
    "focus:border-primary",
    "shadow-sm",

    // Impede o conteúdo de estourar o tamanho do Select
    "overflow-hidden",
  ].join(" "),
  {
    variants: {
      variant: colorsBackGround,

      textColor: colorsText,

      size: {
        small: ["h-8", "px-2", "text-sm"].join(" "),

        medium: ["h-8", "px-2", "text-sm"].join(" "),

        large: ["h-16", "px-3", "text-base"].join(" "),
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

    "overflow-hidden",

    "rounded-md",
    "border",
    "border-soft",

    "p-1",

    // Mesma largura do Trigger
    "w-[var(--radix-select-trigger-width)]",

    // Altura máxima disponível
    "max-h-[var(--radix-select-content-available-height)]",

    // Animação de abertura
    "data-[state=open]:animate-[select-content-show_150ms_ease-out]",

    // Animação de fechamento
    "data-[state=closed]:animate-[select-content-hide_100ms_ease-in]",
  ].join(" "),
  {
    variants: {
      variant: {
        ...colorsBackGround,
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * ============================================================
 * VIEWPORT
 * ============================================================
 */

const selectViewportVariants = cva(
  [
    "w-full",
    "flex",
    "flex-col",
    "gap-1",

    "overflow-y-auto",
    "overflow-x-hidden",
  ].join(" "),
);

/**
 * ============================================================
 * ITEM
 * ============================================================
 */

const selectItemVariants = cva(
  [
    "relative",
    "flex",
    "w-full",
    "min-w-0",

    "cursor-pointer",
    "select-none",
    "items-center",

    "rounded-sm",

    "border",
    "border-soft",

    "outline-none",

    "box-border",

    "transition-colors",
    "duration-150",
    "bg-amber-500",

    // Texto não deve estourar
    "overflow-hidden",

    // Estados Radix
    "data-[disabled]:pointer-events-none",
    "data-[disabled]:opacity-50",

    // Hover/focus
    "data-[highlighted]:outline-none",
  ].join(" "),
  {
    variants: {
      variant: {
        ...colorsBackGround,
      },

      textColor: colorsText,

      size: {
        small: ["h-8", "py-1", "pl-8", "pr-2", "text-sm"].join(" "),

        medium: ["h-8", "py-1", "pl-8", "pr-2", "text-sm"].join(" "),

        large: ["h-16", "py-2", "pl-10", "pr-3", "text-base"].join(" "),
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
 * ITEM TEXT
 * ============================================================
 */

const selectItemTextVariants = cva(
  [
    "block",
    "min-w-0",
    "w-full",
    "max-w-full",
    "flex-1",
    "overflow-hidden",
    "text-ellipsis",
    "whitespace-nowrap",
  ].join(" "),
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

  size?: "small" | "medium" | "large";
}

/**
 * ============================================================
 * COMPONENT
 * ============================================================
 */
type optionsDefineColor =
  | "none"
  | "default"
  | "info"
  | "error"
  | "success"
  | "warning"
  | "primary"
  | "secondary"
  | "accent"
  | "muted"
  | "sendMessage";

const defineColorItem = (option: optionsDefineColor) => {
  switch (option) {
    case "default":
      return "hover:bg-success";

    case "secondary":
      return "hover:bg-accent";

    case "error":
      return "hover:bg-accent";

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
  disabled = false,
  className,
}: SelectProps) {
  return (
    <Select.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <Select.Trigger
        className={selectTriggerVariants({
          variant,
          textColor,
          size,
          className,
        })}
      >
        <span className="block min-w-0 flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
          <Select.Value
            placeholder={placeholder}
            className={`block min-w-0 w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap ${colorsText[textColor]}`}
          />
        </span>

        <Select.Icon className="shrink-0">
          <ChevronDown className="h-4 w-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          className={`${selectContentVariants({ variant })} mt-1`}
        >
          <Select.Viewport className={selectViewportVariants()}>
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className={`${selectItemVariants({
                  variant,
                  textColor,
                  size,
                })} ${defineColorItem(variant)}`}
              >
                <Select.ItemIndicator className="absolute left-2 flex items-center">
                  <Check className="h-4 w-4" />
                </Select.ItemIndicator>

                <Select.ItemText className={selectItemTextVariants()}>
                  {option.label}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

SelectLib.displayName = "SelectLib";
