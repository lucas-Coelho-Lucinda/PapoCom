import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";

type CheckboxLibProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>;

/**
 * Checkbox baseado no Radix.
 * Aceita `checked={true | false | "indeterminate"}` — o estado
 * "indeterminate" é usado no "selecionar todos" quando só parte
 * dos itens está marcada.
 */
export const CheckboxLib = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxLibProps
>(({ className = "", ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={`
        peer inline-flex size-4 shrink-0 cursor-pointer items-center justify-center
        rounded-[4px] border border-soft bg-card text-secondary shadow-sm
        outline-none transition-all
        focus-visible:ring-2 focus-visible:ring-primary
        disabled:cursor-not-allowed disabled:opacity-50
        data-[state=checked]:border-primary data-[state=checked]:bg-primary
        data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary
        ${className}
      `}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        {props.checked === "indeterminate" ? (
          <Minus className="size-3" strokeWidth={3} aria-hidden="true" />
        ) : (
          <Check className="size-3" strokeWidth={3} aria-hidden="true" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

CheckboxLib.displayName = "CheckboxLib";
