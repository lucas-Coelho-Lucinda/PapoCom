
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import {
  colorsBackGround,
  colorsText,
} from "../../styles/colors";

/**
 * ============================================================
 * TRIGGER
 * ============================================================
 */

const selectTriggerVariants = cva(
  [
    "cursor-pointer",
    "inline-flex",
    "items-center",
    "justify-between",
    "rounded-md",
    "font-medium",
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
  }
);

/**
 * ============================================================
 * CONTENT
 * ============================================================
 *
 * O Content utiliza a largura real do Trigger através
 * da variável fornecida pelo Radix:
 *
 * --radix-select-trigger-width
 *
 * Dessa maneira:
 *
 * Trigger small  → Content small
 * Trigger median → Content median
 * Trigger large  → Content large
 */

const selectContentVariants = cva(
  [
    "z-50",
    "mt-1",
    "overflow-hidden",
    "rounded-md",
    "p-1",

    // Mesma largura do Trigger
    "w-[var(--radix-select-trigger-width)]",

    // Permite que o conteúdo tenha altura suficiente
    "max-h-[var(--radix-select-content-available-height)]",
  ].join(" "),
  {
    variants: {
      variant: colorsBackGround,
    },

    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * ============================================================
 * ITEM
 * ============================================================
 *
 * O Item ocupa 100% da largura do Content.
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

    // Garante que o item não diminua
    "box-border",

    // Estados do Radix
    "data-[disabled]:pointer-events-none",
    "data-[disabled]:opacity-50",
  ].join(" "),
  {
    variants: {
      textColor: colorsText,
    },

    defaultVariants: {
      textColor: "default",
    },
  }
);

/**
 * ============================================================
 * TYPES
 * ============================================================
 */

interface SelectProps
  extends Omit<
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
}

/**
 * ============================================================
 * COMPONENT
 * ============================================================
 */

export function SelectLib({
  options,
  placeholder = "Selecione uma opção",

  variant,
  textColor,
  size,

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
          className={colorsText[textColor ?? "default"]}
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
          <Select.Viewport className="w-full">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className={selectItemVariants({
                  textColor,
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
                  className={colorsBackGround[textColor ?? "default"]}
                >
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

