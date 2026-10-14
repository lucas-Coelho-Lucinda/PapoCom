import * as React from "react";
import {
  colorsBackGround,
  colorsHouverText,
  colorsText,
} from "../../styles/colors";
import { cva, type VariantProps } from "class-variance-authority";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

/* ================= UTILS ================= */

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ================= CVA ================= */

const dropdownItemVariants = cva(
  [
    "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
    "data-[highlighted]:bg-primary",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ].join(" "),
  {
    variants: {
      colorsText: colorsText,
      colorHover: colorsHouverText,

      inset: {
        true: "pl-8",
        false: "",
      },

      align: {
        start: "justify-start",
        between: "justify-between",
      },
    },

    defaultVariants: {
      colorsText: "default",
      colorHover: "default",
      inset: false,
      align: "start",
    },
  },
);

type DropdownItemVariants = VariantProps<typeof dropdownItemVariants>;

/* ================= ROOT ================= */

export function DropdownMenu(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>,
) {
  return <DropdownMenuPrimitive.Root {...props} />;
}

export function DropdownMenuTrigger(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>,
) {
  return <DropdownMenuPrimitive.Trigger {...props} />;
}

/* ================= CONTENT ================= */

const dropdownContentVariants = cva(
  [
    "z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
    "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
  ].join(" "),
  {
    variants: {
      colorBackeGround: {
        ...colorsBackGround,
      },
    },

    defaultVariants: {
      colorBackeGround: "default",
    },
  },
);

type DropdownContentVariants = VariantProps<typeof dropdownContentVariants>;

export function DropdownMenuContent({
  className,
  sideOffset = 4,
  colorBackeGround,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content> &
  DropdownContentVariants) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cn(dropdownContentVariants({ colorBackeGround }), className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

/* ================= ITEM ================= */

export function DropdownMenuItem({
  className,
  colorsText,
  colorHover,
  inset,
  align,
  leftIcon,
  rightIcon,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> &
  DropdownItemVariants & {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  }) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        dropdownItemVariants({ colorsText, colorHover, inset, align }),
        className,
      )}
      {...props}
    >
      {leftIcon && (
        <span className="flex size-4 items-center justify-center">
          {leftIcon}
        </span>
      )}

      <span className="flex-1">{children}</span>

      {rightIcon && <span className="ml-auto">{rightIcon}</span>}
    </DropdownMenuPrimitive.Item>
  );
}

/* ================= LABEL ================= */

export function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(
        "px-2 py-1.5 text-sm font-medium text-foreground-muted",
        className,
      )}
      {...props}
    />
  );
}

/* ================= SEPARATOR ================= */

export function DropdownMenuSeparator(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>,
) {
  return (
    <DropdownMenuPrimitive.Separator
      className="my-1 h-px bg-border"
      {...props}
    />
  );
}

/* ================= CHECKBOX ================= */

export function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      checked={checked}
      className={cn(
        "relative flex cursor-pointer items-center rounded-sm py-1.5 pl-8 pr-2 text-sm",
        "text-foreground focus:bg-background-light",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4 text-primary" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>

      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

/* ================= RADIO ================= */

export function DropdownMenuRadioGroup(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>,
) {
  return <DropdownMenuPrimitive.RadioGroup {...props} />;
}

export function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={cn(
        "relative flex cursor-pointer items-center rounded-sm py-1.5 pl-8 pr-2 text-sm",
        "text-foreground focus:bg-background-light",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-primary" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>

      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

/* ================= SHORTCUT ================= */

export function DropdownMenuShortcut(props: React.ComponentProps<"span">) {
  return (
    <span
      className="ml-auto text-xs tracking-widest text-foreground-muted"
      {...props}
    />
  );
}

/* ================= SUB MENU ================= */

export function DropdownMenuSub(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>,
) {
  return <DropdownMenuPrimitive.Sub {...props} />;
}

export function DropdownMenuSubTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger>) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className={cn(
        "flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm",
        "text-foreground focus:bg-background-light",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4 text-foreground-muted" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

export function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border",
        "bg-background text-foreground border-border shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

/* ================= HIGH LEVEL ================= */

type DropdownAction = {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  colorsText?: DropdownItemVariants["colorsText"];
  colorHover?: DropdownItemVariants["colorHover"];
  shortcut?: string;
  disabled?: boolean;
};

type ActionDropdownProps = {
  trigger: React.ReactNode;
  actions: DropdownAction[];
};

export function ActionDropdown({ trigger, actions }: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent>
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            colorsText={action.colorsText}
            colorHover={action.colorHover}
            disabled={action.disabled}
            leftIcon={action.icon}
          >
            {action.label}

            {action.shortcut && (
              <DropdownMenuShortcut>{action.shortcut}</DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
