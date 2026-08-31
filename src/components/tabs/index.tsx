import * as React from "react";


import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cva, type VariantProps } from "class-variance-authority";

import { colorsBackGround, colorsBorder } from "../../styles/colors";

const cn = (
  ...classes: Array<string | undefined | false>
) => classes.filter(Boolean).join(" ");

/* -------------------------------------------------------------------------- */
/*                                    ROOT                                    */
/* -------------------------------------------------------------------------- */

const tabsVariants = cva("w-full min-w-0 min-h-0", {
  variants: {
    variant: {
      ...colorsBackGround,
    },

    border: {
      ...colorsBorder,
    },

    padding: {
      none: "p-0",
      min: "p-1",
      small: "p-4",
      median: "p-6",
      large: "p-8",
    },
  },

  defaultVariants: {
    variant: "default",
    border: "default",
    padding: "large",
  },
});

/* -------------------------------------------------------------------------- */
/*                                    LIST                                    */
/* -------------------------------------------------------------------------- */

const tabsListVariants = cva(
  "w-full min-w-0 shrink-0 items-stretch rounded-none p-0",
  {
    variants: {
      variant: {
        ...colorsBackGround,
      },

      orientation: {
        horizontal: "grid grid-flow-col auto-cols-fr",
        vertical: "flex h-auto flex-col",
      },
    },

    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
    },
  },
);

/* -------------------------------------------------------------------------- */
/*                                   TRIGGER                                  */
/* -------------------------------------------------------------------------- */

const tabsTriggerVariants = cva(
  [
    "inline-flex min-w-0 w-full items-center justify-center whitespace-nowrap",
    "px-2 py-2 text-sm font-medium transition-all",
    "outline-none",
    "focus-visible:ring-2 focus-visible:ring-blue-500",
    "disabled:pointer-events-none disabled:opacity-50",

    /*
     * Estado ativo da tab.
     *
     * O Radix adiciona automaticamente:
     *
     * data-state="active"
     *
     * quando a tab está selecionada.
     */
    "data-[state=active]:bg-primary",
  ],
  {
    variants: {
      variant: {
        ...colorsBackGround,
      },

      size: {
        small: "px-1.5 py-1 text-xs",
        medium: "px-2 py-2 text-xs sm:text-sm",
        large: "px-3 py-3 text-sm sm:text-base",
      },

      /*
       * Define se a tab selecionada terá uma aparência
       * diferenciada.
       */
      focus: {
        true: [
          "data-[state=active]:bg-primary",
          "data-[state=active]:text-primary-foreground",
          "data-[state=active]:shadow-sm",
        ],

        false: [
          "data-[state=active]:bg-transparent",
          "data-[state=active]:text-inherit",
          "data-[state=active]:shadow-none",
        ],
      },
    },

    defaultVariants: {
      variant: "default",
      size: "medium",
      focus: true,
    },
  },
);

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

const tabsContentVariants = cva(
  "min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
  {
    variants: {
      padding: {
        none: "p-0",
        small: "p-2",
        medium: "p-4",
        large: "p-6",
      },
    },

    defaultVariants: {
      padding: "medium",
    },
  },
);

/* -------------------------------------------------------------------------- */
/*                                     ROOT                                   */
/* -------------------------------------------------------------------------- */

export type TabsLibProps =
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> &
  VariantProps<typeof tabsVariants>;

export const TabsLib = ({
  className,
  variant,
  border,
  padding,
  ...props
}: TabsLibProps) => {
  return (
    <TabsPrimitive.Root
      className={cn(
        tabsVariants({
          variant,
          border,
          padding,
        }),
        className,
      )}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*                                     LIST                                   */
/* -------------------------------------------------------------------------- */

export type TabsListLibProps =
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>;

export const TabsListLib = ({
  className,
  variant,
  orientation,
  ...props
}: TabsListLibProps) => {
  return (
    <TabsPrimitive.List
      className={cn(
        tabsListVariants({
          variant,
          orientation,
        }),
        className,
      )}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*                                    TRIGGER                                 */
/* -------------------------------------------------------------------------- */

export type TabsTriggerLibProps =
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants>;

export const TabsTriggerLib = ({
  className,
  variant,
  size,
  focus,
  ...props
}: TabsTriggerLibProps) => {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        tabsTriggerVariants({
          variant,
          size,
          focus,
        }),
        className,
      )}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*                                    CONTENT                                 */
/* -------------------------------------------------------------------------- */

export type TabsContentLibProps =
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> &
  VariantProps<typeof tabsContentVariants>;

export const TabsContentLib = ({
  className,
  padding,
  ...props
}: TabsContentLibProps) => {
  return (
    <TabsPrimitive.Content
      className={cn(
        tabsContentVariants({
          padding,
        }),
        className,
      )}
      {...props}
    />
  );
};

